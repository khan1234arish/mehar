import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { generateCsrfToken } from '@/lib/csrf';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await verifyAdminSession(request);

    if (!session.authenticated || !session.user) {
      return NextResponse.json(
        { error: session.error || 'Unauthorized' },
        { status: session.statusCode || 401 }
      );
    }

    const csrfToken = generateCsrfToken(session.user.id);

    return NextResponse.json({
      authenticated: true,
      user: session.user,
      csrfToken,
    });
  } catch (error) {
    console.error('Session retrieval error:', error);
    return NextResponse.json(
      { error: 'An error occurred while verifying your session.' },
      { status: 500 }
    );
  }
}
