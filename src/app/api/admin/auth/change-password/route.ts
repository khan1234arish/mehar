import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  verifyAdminSession,
  verifyPassword,
  hashPassword,
  signAdminToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { changePasswordSchema } from '@/lib/validations/admin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await verifyAdminSession(request);

    if (!session.authenticated || !session.user) {
      return NextResponse.json(
        { error: session.error || 'Unauthorized' },
        { status: session.statusCode || 401 }
      );
    }

    // ── 1. CSRF Token Verification ──────────────────────────────────────────
    const csrfCheck = requireCsrfHeader(request, session.user.id);
    if (!csrfCheck.valid) {
      return NextResponse.json({ error: csrfCheck.error }, { status: 403 });
    }

    const body = await request.json();
    const parsed = changePasswordSchema.safeParse(body);

    if (!parsed.success) {
      const errorMsg = parsed.error.issues[0]?.message || 'Invalid password parameters.';
      return NextResponse.json({ error: errorMsg }, { status: 400 });
    }

    const { currentPassword, newPassword } = parsed.data;

    if (!prisma) {
      return NextResponse.json({ error: 'Database service unavailable.' }, { status: 503 });
    }

    const dbUser = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    if (!dbUser) {
      return NextResponse.json({ error: 'User account not found.' }, { status: 404 });
    }

    // ── 2. Verify Current Password ──────────────────────────────────────────
    const isCurrentValid = await verifyPassword(currentPassword, dbUser.passwordHash);
    if (!isCurrentValid) {
      await logAdminAudit({
        userId: dbUser.id,
        adminEmail: dbUser.email,
        action: 'PASSWORD_CHANGE_FAILED',
        entityType: 'User',
        entityId: dbUser.id,
        metadata: { reason: 'Incorrect current password' },
        request,
      });

      return NextResponse.json(
        { error: 'Current password provided is incorrect.' },
        { status: 400 }
      );
    }

    // ── 3. Hash New Password & Update Database ──────────────────────────────
    const newPasswordHash = await hashPassword(newPassword);

    const updatedUser = await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        passwordHash: newPasswordHash,
        mustChangePassword: false,
        failedLoginAttempts: 0,
        lockedUntil: null,
      },
    });

    // Generate updated JWT with mustChangePassword = false
    const newToken = signAdminToken({
      userId: updatedUser.id,
      email: updatedUser.email,
      name: updatedUser.name,
      role: updatedUser.role,
      mustChangePassword: false,
    });

    await logAdminAudit({
      userId: updatedUser.id,
      adminEmail: updatedUser.email,
      action: 'PASSWORD_CHANGE_SUCCESS',
      entityType: 'User',
      entityId: updatedUser.id,
      request,
    });

    const isProduction = process.env.NODE_ENV === 'production';
    const response = NextResponse.json({
      success: true,
      message: 'Password changed successfully. Your account is now fully secured.',
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: newToken,
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      path: '/',
      // Session Cookie: destroyed upon browser closure
    });

    return response;
  } catch (error) {
    console.error('Password change error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred while updating your password.' },
      { status: 500 }
    );
  }
}
