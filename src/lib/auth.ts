import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { Role } from '@prisma/client';

export const ADMIN_COOKIE_NAME = 'mehar_admin_session';
export const CSRF_COOKIE_NAME = 'mehar_admin_csrf';

const JWT_SECRET = process.env.JWT_SECRET || 'mehar_b2b_jwt_secret_change_in_production_min32chars';
const TOKEN_EXPIRY = '12h';

export interface AdminJwtPayload {
  userId: string;
  email: string;
  name: string;
  role: Role;
  mustChangePassword: boolean;
}

export interface SessionVerificationResult {
  authenticated: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    role: Role;
    mustChangePassword: boolean;
    lastLoginAt: Date | null;
  };
  error?: string;
  statusCode?: number;
}

// ─── Cryptographic Password Hashing ──────────────────────────────────────────
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// ─── JWT Token Management ───────────────────────────────────────────────────
export function signAdminToken(payload: AdminJwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: TOKEN_EXPIRY,
    algorithm: 'HS256',
  });
}

export function verifyAdminToken(token: string): AdminJwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] }) as AdminJwtPayload;
  } catch {
    return null;
  }
}

// ─── Cookie Utilities ────────────────────────────────────────────────────────
export function getCookieToken(request?: Request): string | null {
  if (request) {
    const cookieHeader = request.headers.get('cookie') || '';
    const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${ADMIN_COOKIE_NAME}=([^;]+)`));
    if (match) return decodeURIComponent(match[1]);

    // Also accept Bearer token
    const authHeader = request.headers.get('authorization') || '';
    if (authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7).trim();
    }
  }

  try {
    const cookieStore = cookies();
    const c = cookieStore.get(ADMIN_COOKIE_NAME);
    return c?.value || null;
  } catch {
    return null;
  }
}

// ─── Server-Side Authorization Validator ─────────────────────────────────────
export async function verifyAdminSession(
  request?: Request,
  allowedRoles: Role[] = [Role.SUPER_ADMIN, Role.SALES_ADMIN]
): Promise<SessionVerificationResult> {
  const token = getCookieToken(request);

  if (!token) {
    return {
      authenticated: false,
      error: 'Authentication required. No active session token found.',
      statusCode: 401,
    };
  }

  const decoded = verifyAdminToken(token);
  if (!decoded || !decoded.userId) {
    return {
      authenticated: false,
      error: 'Invalid or expired session token. Please log in again.',
      statusCode: 401,
    };
  }

  // If local fallback session ID
  if (decoded.userId.startsWith('local-dev-')) {
    return {
      authenticated: true,
      user: {
        id: decoded.userId,
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        mustChangePassword: decoded.mustChangePassword,
        lastLoginAt: new Date(),
      },
    };
  }

  // Database verification: Ensure user exists in DB if online
  try {
    if (prisma && process.env.DATABASE_URL) {
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          status: true,
          mustChangePassword: true,
          lastLoginAt: true,
          lockedUntil: true,
        },
      });

      if (user) {
        if (user.status !== 'ACTIVE') {
          return {
            authenticated: false,
            error: 'Admin account has been suspended or is pending verification.',
            statusCode: 403,
          };
        }

        if (user.lockedUntil && user.lockedUntil > new Date()) {
          return {
            authenticated: false,
            error: 'Account temporarily locked due to excessive failed attempts.',
            statusCode: 423,
          };
        }

        if (!allowedRoles.includes(user.role)) {
          return {
            authenticated: false,
            error: 'Access forbidden. You do not have permission for this resource.',
            statusCode: 403,
          };
        }

        return {
          authenticated: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            mustChangePassword: user.mustChangePassword,
            lastLoginAt: user.lastLoginAt,
          },
        };
      }
    }
  } catch {
    // Database connection offline — allow valid cryptographically signed JWT token
  }

  // Fallback to decoded payload if JWT signature was valid
  return {
    authenticated: true,
    user: {
      id: decoded.userId,
      email: decoded.email,
      name: decoded.name,
      role: decoded.role,
      mustChangePassword: decoded.mustChangePassword,
      lastLoginAt: new Date(),
    },
  };
}
