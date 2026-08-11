import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { resourceSchema } from '@/lib/validations/admin';

export const dynamic = 'force-dynamic';

interface Params {
  params: { id: string };
}

export async function PUT(request: Request, { params }: Params) {
  try {
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
    const parsed = resourceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid resource data.' },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!prisma) {
      return NextResponse.json({ error: 'Database service unavailable.' }, { status: 503 });
    }

    const resource = await prisma.resourceDownload.update({
      where: { id: params.id },
      data: {
        title: data.title,
        category: data.category,
        description: data.description || null,
        fileUrl: data.fileUrl,
        fileType: data.fileType,
        fileSize: data.fileSize || null,
        isGated: data.isGated,
        isPlaceholder: data.isPlaceholder,
        isPublished: data.isPublished,
      },
    });

    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: 'RESOURCE_UPDATE',
      entityType: 'ResourceDownload',
      entityId: resource.id,
      metadata: { title: resource.title, isPublished: resource.isPublished },
      request,
    });

    return NextResponse.json({ success: true, resource });
  } catch (error) {
    console.error('Error updating resource:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the resource.' },
      { status: 500 }
    );
  }
}

// Archive-only delete
export async function DELETE(request: Request, { params }: Params) {
  try {
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

    if (!prisma) {
      return NextResponse.json({ error: 'Database service unavailable.' }, { status: 503 });
    }

    const resource = await prisma.resourceDownload.update({
      where: { id: params.id },
      data: {
        isArchived: true,
        isPublished: false,
      },
    });

    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: 'RESOURCE_ARCHIVED',
      entityType: 'ResourceDownload',
      entityId: resource.id,
      request,
    });

    return NextResponse.json({ success: true, message: 'Resource archived successfully.' });
  } catch (error) {
    console.error('Error archiving resource:', error);
    return NextResponse.json(
      { error: 'An error occurred while archiving the resource.' },
      { status: 500 }
    );
  }
}
