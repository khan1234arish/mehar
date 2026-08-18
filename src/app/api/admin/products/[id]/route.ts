import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { productSchema } from '@/lib/validations/admin';

export const dynamic = 'force-dynamic';

interface Params {
  params: Promise<{ id: string }>;
}

// ── GET /api/admin/products/[id] ──────────────────────────────────────────────
export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const session = await verifyAdminSession(request);
    if (!session.authenticated || !session.user) {
      return NextResponse.json(
        { error: session.error || 'Unauthorized' },
        { status: session.statusCode || 401 }
      );
    }

    if (!prisma) {
      return NextResponse.json({ error: 'Database service unavailable.' }, { status: 503 });
    }

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        specifications: { orderBy: { displayOrder: 'asc' } },
        images: {
          where: { isArchived: false },
          orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('Error fetching product detail:', error);
    return NextResponse.json(
      { error: 'An error occurred while loading product details.' },
      { status: 500 }
    );
  }
}

// ── PUT /api/admin/products/[id] (Update Product & Specs) ──────────────────────
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
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid product parameters.' },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!prisma) {
      return NextResponse.json({ error: 'Database service unavailable.' }, { status: 503 });
    }

    const existing = await prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    // Slug uniqueness check if changed
    if (data.slug !== existing.slug) {
      const slugConflict = await prisma.product.findUnique({
        where: { slug: data.slug },
      });
      if (slugConflict && slugConflict.id !== id) {
        return NextResponse.json(
          { error: `Slug "${data.slug}" is already in use by another product.` },
          { status: 400 }
        );
      }
    }

    // Strict rule: Product can only be published if publishStatus === 'VERIFIED'
    const isVerified = data.publishStatus === 'VERIFIED';
    const isPublished = isVerified && data.isPublished;
    const currentUserId = session.user.id;

    // Transaction to update product and replace specs
    const updated = await prisma.$transaction(async (tx) => {
      const prod = await tx.product.update({
        where: { id },
        data: {
          name: data.name,
          slug: data.slug,
          categoryId: data.categoryId,
          modelNumber: data.modelNumber || null,
          shortDescription: data.shortDescription,
          applicationTag: data.applicationTag,
          chemistry: data.chemistry || null,
          voltageRange: data.voltageRange || null,
          capacityRange: data.capacityRange || null,
          energyRange: data.energyRange || null,
          cycleLife: data.cycleLife || null,
          maxDischargeRate: data.maxDischargeRate || null,
          operatingTemp: data.operatingTemp || null,
          bmsProtocols: data.bmsProtocols || null,
          ipRating: data.ipRating || null,
          dimensions: data.dimensions || null,
          weight: data.weight || null,
          warrantySummary: data.warrantySummary || null,
          placeholderNote: data.placeholderNote || undefined,
          tdsFileUrl: data.tdsFileUrl || null,
          imageUrl: data.imageUrl || null,
          minimumOrderQuantity: data.minimumOrderQuantity !== undefined ? data.minimumOrderQuantity : existing.minimumOrderQuantity,
          publishStatus: data.publishStatus,
          isPublished,
          isPlaceholder: data.isPlaceholder ?? !isVerified,
          verifiedAt: isVerified && !existing.verifiedAt ? new Date() : existing.verifiedAt,
          verifiedById: isVerified && !existing.verifiedById ? currentUserId : existing.verifiedById,
        },
      });

      // Update specs if provided
      if (data.specifications) {
        await tx.productSpec.deleteMany({ where: { productId: id } });
        if (data.specifications.length > 0) {
          await tx.productSpec.createMany({
            data: data.specifications.map((s, idx) => ({
              productId: id,
              groupName: s.groupName,
              specKey: s.specKey,
              specValue: s.specValue,
              specUnit: s.specUnit || null,
              isHighlight: s.isHighlight || false,
              displayOrder: s.displayOrder ?? idx,
            })),
          });
        }
      }

      return prod;
    });

    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: 'PRODUCT_UPDATE',
      entityType: 'Product',
      entityId: updated.id,
      metadata: {
        name: updated.name,
        publishStatus: updated.publishStatus,
        isPublished: updated.isPublished,
      },
      request,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating the product.' },
      { status: 500 }
    );
  }
}

// ── DELETE /api/admin/products/[id] (Soft-Delete / Archive Only) ──────────────
export async function DELETE(request: Request, { params }: Params) {
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

    if (!prisma) {
      return NextResponse.json({ error: 'Database service unavailable.' }, { status: 503 });
    }

    // Soft-delete: Mark as ARCHIVED, unpublish, and deactivate (no permanent DB deletion)
    const product = await prisma.product.update({
      where: { id },
      data: {
        publishStatus: 'ARCHIVED',
        isPublished: false,
        isActive: false,
      },
    });

    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: 'PRODUCT_ARCHIVED',
      entityType: 'Product',
      entityId: product.id,
      metadata: { name: product.name, slug: product.slug },
      request,
    });

    return NextResponse.json({
      success: true,
      message: `Product "${product.name}" has been archived and removed from public view.`,
    });
  } catch (error) {
    console.error('Error archiving product:', error);
    return NextResponse.json(
      { error: 'An error occurred while archiving the product.' },
      { status: 500 }
    );
  }
}
