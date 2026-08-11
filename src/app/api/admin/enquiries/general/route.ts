import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';

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

    try {
      if (prisma && process.env.DATABASE_URL) {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search')?.trim();

        const where: Record<string, unknown> = {};
        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { companyName: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
            { subject: { contains: search, mode: 'insensitive' } },
          ];
        }

        const enquiries = await prisma.generalEnquiry.findMany({
          where,
          orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ enquiries });
      }
    } catch {
      // Fallback
    }

    return NextResponse.json({ enquiries: [] });
  } catch (error) {
    console.error('Error fetching general enquiries:', error);
    return NextResponse.json(
      { error: 'An error occurred while loading general enquiries.' },
      { status: 500 }
    );
  }
}
