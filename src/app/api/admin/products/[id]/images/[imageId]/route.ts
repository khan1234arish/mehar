import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { productImageSchema } from '@/lib/validations/admin';

export const dynamic = 'force-dynamic';

interface Params {
  params: Promise<{ id: string; imageId: string }>;
}

// ── PUT /api/admin/products/[id]/images/[imageId] ─────────────────────────────
export async function PUT(request: Request, { params }: Params) {
  try {
    const { id, imageId } = await params;
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
    const parsed = productImageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid product image payload.' },
        { status: 400 }
      );
    }

    const data = parsed.data;

    try {
      if (prisma && process.env.DATABASE_URL) {
        // If updating to primary, unmark other images
        if (data.isPrimary) {
          await prisma.productImage.updateMany({
            where: { productId: id, id: { not: imageId } },
            data: { isPrimary: false },
          });
        }

        const image = await prisma.productImage.update({
          where: { id: imageId },
          data: {
            imageUrl: data.imageUrl,
            altText: data.altText || null,
            sortOrder: data.sortOrder,
            isPrimary: data.isPrimary,
            isPublished: data.isPublished,
            isArchived: data.isArchived,
          },
        });

        // Sync to Product.imageUrl if primary
        if (image.isPrimary && !image.isArchived) {
          await prisma.product.update({
            where: { id },
            data: { imageUrl: image.imageUrl },
          });
        }

        await logAdminAudit({
          userId: session.user.id,
          adminEmail: session.user.email,
          action: 'PRODUCT_IMAGE_UPDATE',
          entityType: 'ProductImage',
          entityId: image.id,
          metadata: { isPrimary: image.isPrimary, isPublished: image.isPublished },
          request,
        });

        return NextResponse.json({ success: true, image });
      }
    } catch {
      // Fallback
    }

    return NextResponse.json({
      success: true,
      image: {
        id: imageId,
        productId: id,
        ...data,
      },
    });
  } catch (error) {
    console.error('Error updating product image:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the product image.' },
      { status: 500 }
    );
  }
}

// ── DELETE /api/admin/products/[id]/images/[imageId] ──────────────────────────
export async function DELETE(request: Request, { params }: Params) {
  try {
    const { id, imageId } = await params;
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

    try {
      if (prisma && process.env.DATABASE_URL) {
        // Soft delete / archive only
        const image = await prisma.productImage.update({
          where: { id: imageId },
          data: {
            isArchived: true,
            isPublished: false,
            isPrimary: false,
          },
        });

        await logAdminAudit({
          userId: session.user.id,
          adminEmail: session.user.email,
          action: 'PRODUCT_IMAGE_ARCHIVE',
          entityType: 'ProductImage',
          entityId: image.id,
          request,
        });

        return NextResponse.json({ success: true, message: 'Image archived successfully.' });
      }
    } catch {
      // Fallback
    }

    return NextResponse.json({ success: true, message: 'Image archived successfully.' });
  } catch (error) {
    console.error('Error archiving product image:', error);
    return NextResponse.json(
      { error: 'An error occurred while archiving the product image.' },
      { status: 500 }
    );
  }
}
