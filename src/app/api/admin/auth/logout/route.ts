import { NextResponse } from 'next/server';
import { verifyAdminSession, ADMIN_COOKIE_NAME, CSRF_COOKIE_NAME } from '@/lib/auth';
import { logAdminAudit } from '@/lib/audit';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const session = await verifyAdminSession(request);

    if (session.authenticated && session.user) {
      await logAdminAudit({
        userId: session.user.id,
        adminEmail: session.user.email,
        action: 'LOGOUT',
        entityType: 'User',
        entityId: session.user.id,
        request,
      });
    }

    const response = NextResponse.json({ success: true, message: 'Logged out successfully.' });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: '',
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    });

    response.cookies.set({
      name: CSRF_COOKIE_NAME,
      value: '',
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    const response = NextResponse.json({ success: true });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: '',
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    });

    response.cookies.set({
      name: CSRF_COOKIE_NAME,
      value: '',
      path: '/',
      maxAge: 0,
      expires: new Date(0),
    });

    return response;
  }
}
