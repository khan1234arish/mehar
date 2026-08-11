import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { OemEnquiryStatus } from '@prisma/client';

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
        const status = searchParams.get('status') as OemEnquiryStatus | null;
        const search = searchParams.get('search')?.trim();

        const where: Record<string, unknown> = {};
        if (status && Object.values(OemEnquiryStatus).includes(status)) {
          where.status = status;
        }

        if (search) {
          where.OR = [
            { enquiryNumber: { contains: search, mode: 'insensitive' } },
            { companyName: { contains: search, mode: 'insensitive' } },
            { contactPerson: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
            { applicationType: { contains: search, mode: 'insensitive' } },
          ];
        }

        const oemEnquiries = await prisma.oemEnquiry.findMany({
          where,
          orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({ oemEnquiries });
      }
    } catch {
      // Fallback
    }

    return NextResponse.json({ oemEnquiries: [] });
  } catch (error) {
    console.error('Error fetching admin OEM enquiries:', error);
    return NextResponse.json(
      { error: 'An error occurred while loading OEM enquiries.' },
      { status: 500 }
    );
  }
}
