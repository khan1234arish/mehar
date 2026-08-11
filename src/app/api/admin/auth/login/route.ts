import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyPassword, signAdminToken, ADMIN_COOKIE_NAME, CSRF_COOKIE_NAME } from '@/lib/auth';
import { checkRateLimit, resetRateLimit } from '@/lib/rateLimit';
import { generateCsrfToken } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { loginSchema } from '@/lib/validations/admin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '127.0.0.1';

    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid input format. Please check your credentials.' },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();
    const rateLimitKey = `admin_login:${ip}:${normalizedEmail}`;

    // ── 1. Check Brute-Force Rate Limit ─────────────────────────────────────
    const rateCheck = await checkRateLimit(rateLimitKey, 5, 900);
    if (!rateCheck.allowed) {
      const waitMinutes = Math.ceil((rateCheck.resetTime.getTime() - Date.now()) / 60000);
      return NextResponse.json(
        {
          error: `Too many failed attempts. Account login locked for ${waitMinutes} minute(s) to protect against brute-force attacks.`,
        },
        { status: 429 }
      );
    }

    // Configurable runtime environment admin credentials
    const runtimeAdminEmail = (process.env.INITIAL_ADMIN_EMAIL || '').toLowerCase().trim();
    const runtimeAdminPassword = process.env.INITIAL_ADMIN_PASSWORD;

    let authenticatedUser: {
      id: string;
      email: string;
      name: string;
      role: 'SUPER_ADMIN' | 'SALES_ADMIN';
      mustChangePassword: boolean;
    } | null = null;

    // ── 2. Check Database If Available ──────────────────────────────────────
    try {
      if (prisma && process.env.DATABASE_URL) {
        const dbUser = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        if (dbUser && (dbUser.role === 'SUPER_ADMIN' || dbUser.role === 'SALES_ADMIN')) {
          if (dbUser.status !== 'ACTIVE') {
            return NextResponse.json(
              { error: 'Your admin account is inactive. Please contact system administrator.' },
              { status: 403 }
            );
          }

          const isValid = await verifyPassword(password, dbUser.passwordHash);
          if (isValid) {
            authenticatedUser = {
              id: dbUser.id,
              email: dbUser.email,
              name: dbUser.name,
              role: dbUser.role,
              mustChangePassword: dbUser.mustChangePassword,
            };
          }
        }
      }
    } catch {
      // DB connection offline — proceed to runtime env check
    }

    // ── 3. Runtime Environment Fallback Authentication (Only if explicitly supplied in env) ──
    if (!authenticatedUser && runtimeAdminPassword && runtimeAdminEmail) {
      if (normalizedEmail === runtimeAdminEmail && password === runtimeAdminPassword) {
        authenticatedUser = {
          id: 'local-dev-admin-id',
          email: runtimeAdminEmail,
          name: 'MEHAR Super Admin',
          role: 'SUPER_ADMIN',
          mustChangePassword: false,
        };
      }
    }

    if (!authenticatedUser) {
      return NextResponse.json(
        {
          error: 'Invalid email address or password.',
          remainingAttempts: rateCheck.remainingAttempts,
        },
        { status: 401 }
      );
    }

    // ── 4. On Successful Login ──────────────────────────────────────────────
    await resetRateLimit(rateLimitKey);

    const jwtToken = signAdminToken({
      userId: authenticatedUser.id,
      email: authenticatedUser.email,
      name: authenticatedUser.name,
      role: authenticatedUser.role as any,
      mustChangePassword: authenticatedUser.mustChangePassword,
    });

    const csrfToken = generateCsrfToken(authenticatedUser.id);

    await logAdminAudit({
      userId: authenticatedUser.id,
      adminEmail: authenticatedUser.email,
      action: 'LOGIN_SUCCESS',
      entityType: 'User',
      entityId: authenticatedUser.id,
      request,
    });

    const isProduction = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({
      success: true,
      user: authenticatedUser,
      csrfToken,
      mustChangePassword: authenticatedUser.mustChangePassword,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: jwtToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      path: '/',
      // Omit maxAge/expires so browser treats this strictly as a non-persistent Session Cookie.
      // The session is destroyed immediately upon browser closure.
    });

    response.cookies.set({
      name: CSRF_COOKIE_NAME,
      value: csrfToken,
      httpOnly: false,
      secure: isProduction,
      sameSite: 'strict',
      path: '/',
      // Session Cookie
    });

    return response;
  } catch (error) {
    console.error('Admin login processing error:', error);
    return NextResponse.json(
      { error: 'An internal error occurred during login. Please try again.' },
      { status: 500 }
    );
  }
}
