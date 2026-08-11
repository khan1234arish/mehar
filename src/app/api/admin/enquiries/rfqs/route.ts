import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { RfqStatus } from '@prisma/client';

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
        const status = searchParams.get('status') as RfqStatus | null;
        const search = searchParams.get('search')?.trim();

        const where: Record<string, unknown> = {};
        if (status && Object.values(RfqStatus).includes(status)) {
          where.status = status;
        }

        if (search) {
          where.OR = [
            { rfqNumber: { contains: search, mode: 'insensitive' } },
            { companyName: { contains: search, mode: 'insensitive' } },
            { contactPerson: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ];
        }

        const rfqs = await prisma.rfqRequest.findMany({
          where,
          include: {
            assignedTo: { select: { id: true, name: true, email: true } },
            items: true,
          },
          orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ rfqs });
      }
    } catch {
      // Fallback
    }

    return NextResponse.json({ rfqs: [] });
  } catch (error) {
    console.error('Error fetching admin RFQs:', error);
    return NextResponse.json(
      { error: 'An error occurred while loading RFQ enquiries.' },
      { status: 500 }
    );
  }
}
