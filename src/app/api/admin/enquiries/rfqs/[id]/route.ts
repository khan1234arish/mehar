import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { enquiryStatusSchema } from '@/lib/validations/admin';
import { RfqStatus } from '@prisma/client';

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

    if (!Object.values(RfqStatus).includes(status as RfqStatus)) {
      return NextResponse.json({ error: 'Invalid RFQ status value.' }, { status: 400 });
    }

    if (!prisma) {
      return NextResponse.json({ error: 'Database service unavailable.' }, { status: 503 });
    }

    const rfq = await prisma.rfqRequest.update({
      where: { id },
      data: {
        status: status as RfqStatus,
        internalNotes: internalNotes ?? undefined,
      },
    });

    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: 'RFQ_STATUS_UPDATE',
      entityType: 'RfqRequest',
      entityId: rfq.id,
      metadata: { rfqNumber: rfq.rfqNumber, newStatus: rfq.status },
      request,
    });

    return NextResponse.json({ success: true, rfq });
  } catch (error) {
    console.error('Error updating RFQ status:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the RFQ.' },
      { status: 500 }
    );
  }
}
