import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';

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
    const { name, description, isActive } = body;

    if (!prisma) {
      return NextResponse.json({ error: 'Database service unavailable.' }, { status: 503 });
    }

    const category = await prisma.category.update({
      where: { id },
      data: {
        name: name !== undefined ? name : undefined,
        description: description !== undefined ? description : undefined,
        isActive: isActive !== undefined ? isActive : undefined,
      },
    });

    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: 'CATEGORY_UPDATE',
      entityType: 'Category',
      entityId: category.id,
      metadata: { name: category.name, slug: category.slug },
      request,
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the category.' },
      { status: 500 }
    );
  }
}
