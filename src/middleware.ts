import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_COOKIE_NAME = 'mehar_admin_session';

// Simple edge-safe JWT payload decoder (full signature and DB verification executed in API routes)
function parseJwtPayload(token: string): { userId?: string; role?: string; mustChangePassword?: boolean; exp?: number } | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // ── 1. Protect Admin Web Routes (/admin/*) ──────────────────────────────────
  if (pathname.startsWith('/admin')) {
    // Allow login page without active session
    if (pathname === '/admin/login') {
      const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
      if (token) {
        const payload = parseJwtPayload(token);
        // If already logged in and token is valid, redirect to dashboard
        if (payload && payload.exp && payload.exp * 1000 > Date.now()) {
          if (payload.mustChangePassword) {
            return NextResponse.redirect(new URL('/admin/change-password', request.url));
          }
          return NextResponse.redirect(new URL('/admin', request.url));
        }
      }
      return NextResponse.next();
    }

    // All other /admin routes require active session
    const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const payload = parseJwtPayload(token);
    if (!payload || !payload.exp || payload.exp * 1000 <= Date.now()) {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const res = NextResponse.redirect(loginUrl);
      res.cookies.delete(ADMIN_COOKIE_NAME);
      return res;
    }

    // Role check: Only SUPER_ADMIN and SALES_ADMIN allowed
    if (payload.role !== 'SUPER_ADMIN' && payload.role !== 'SALES_ADMIN') {
      const loginUrl = new URL('/admin/login', request.url);
      loginUrl.searchParams.set('error', 'unauthorized_role');
      return NextResponse.redirect(loginUrl);
    }

    // If forced password change is active, lock out all routes except /admin/change-password
    if (payload.mustChangePassword && pathname !== '/admin/change-password') {
      return NextResponse.redirect(new URL('/admin/change-password', request.url));
    }

    return NextResponse.next();
  }

  // ── 2. Protect Admin API Routes (/api/admin/*) ──────────────────────────────
  if (pathname.startsWith('/api/admin')) {
    // Allow public admin login endpoint
    if (pathname === '/api/admin/auth/login') {
      return NextResponse.next();
    }

    const token =
      request.cookies.get(ADMIN_COOKIE_NAME)?.value ||
      request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');

    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required. No session token provided.' },
        { status: 401 }
      );
    }

    const payload = parseJwtPayload(token);
    if (!payload || !payload.exp || payload.exp * 1000 <= Date.now()) {
      return NextResponse.json(
        { error: 'Session expired or invalid. Please log in again.' },
        { status: 401 }
      );
    }

    // If password change is required, reject other API calls until changed
    if (
      payload.mustChangePassword &&
      pathname !== '/api/admin/auth/change-password' &&
      pathname !== '/api/admin/auth/logout' &&
      pathname !== '/api/admin/auth/me'
    ) {
      return NextResponse.json(
        { error: 'Password change required before accessing administrative endpoints.' },
        { status: 403 }
      );
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
