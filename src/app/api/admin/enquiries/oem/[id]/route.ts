import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { enquiryStatusSchema } from '@/lib/validations/admin';
import { OemEnquiryStatus } from '@prisma/client';

export const dynamic = 'force-dynamic';

interface Params {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const session = await verifyAdminSession(request);
    if (!session.authenticated || !session.user) {
      return NextResponse.json(
        { error: session.error || 'Unauthorized' },
        { status: session.statusCode || 401 }
      );
    }

    const csrfCheck = requireCsrfHeader(request, session.user.id);
    if (!csrfCheck.valid) {
      return NextResponse.json({ error: csrfCheck.error }, { status: 403 });
    }

    const body = await request.json();
    const parsed = enquiryStatusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid status parameters.' },
        { status: 400 }
      );
    }

    const { status, internalNotes } = parsed.data;

    if (!Object.values(OemEnquiryStatus).includes(status as OemEnquiryStatus)) {
      return NextResponse.json({ error: 'Invalid OEM status value.' }, { status: 400 });
    }

    if (!prisma) {
      return NextResponse.json({ error: 'Database service unavailable.' }, { status: 503 });
    }

    const oem = await prisma.oemEnquiry.update({
      where: { id },
      data: {
        status: status as OemEnquiryStatus,
        internalNotes: internalNotes ?? undefined,
      },
    });

    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: 'OEM_STATUS_UPDATE',
      entityType: 'OemEnquiry',
      entityId: oem.id,
      metadata: { enquiryNumber: oem.enquiryNumber, newStatus: oem.status },
      request,
    });

    return NextResponse.json({ success: true, oem });
  } catch (error) {
    console.error('Error updating OEM enquiry status:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the OEM enquiry.' },
      { status: 500 }
    );
  }
}
