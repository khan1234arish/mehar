import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { getHeroCarouselProductIds, setHeroCarouselProductIds } from '@/lib/heroCarousel';

export const dynamic = 'force-dynamic';

// ── GET /api/admin/hero-carousel ───────────────────────────────────────────────
export async function GET(request: Request) {
  try {
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

    const [featuredProductIds, allProducts] = await Promise.all([
      getHeroCarouselProductIds(),
      prisma.product.findMany({
        where: {
          publishStatus: { not: 'ARCHIVED' },
        },
        select: {
          id: true,
          name: true,
          slug: true,
          modelNumber: true,
          applicationTag: true,
          voltageRange: true,
          capacityRange: true,
          chemistry: true,
          energyRange: true,
          imageUrl: true,
          isPublished: true,
          publishStatus: true,
          category: { select: { id: true, name: true, slug: true } },
          images: {
            where: { isArchived: false, isPublished: true },
            orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
            take: 1,
            select: { imageUrl: true, altText: true },
          },
        },
        orderBy: [{ isPublished: 'desc' }, { updatedAt: 'desc' }],
      }),
    ]);

    const formattedProducts = allProducts.map((p) => {
      const primaryImg = p.images?.[0]?.imageUrl || p.imageUrl || '/assets/products/mehar-2w-battery.jpg';
      const isFeatured = featuredProductIds.includes(p.id);
      const featuredOrder = isFeatured ? featuredProductIds.indexOf(p.id) : 999;

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        modelNumber: p.modelNumber,
        category: p.category?.name || p.applicationTag,
        categorySlug: p.category?.slug,
        specs: [p.voltageRange, p.capacityRange, p.chemistry].filter(Boolean).join(' · '),
        imageUrl: primaryImg,
        isPublished: p.isPublished,
        publishStatus: p.publishStatus,
        isFeatured,
        featuredOrder,
      };
    });

    return NextResponse.json({
      featuredProductIds,
      products: formattedProducts,
    });
  } catch (error) {
    console.error('Error loading hero carousel settings:', error);
    return NextResponse.json(
      { error: 'An error occurred while loading hero carousel settings.' },
      { status: 500 }
    );
  }
}

// ── PUT /api/admin/hero-carousel ───────────────────────────────────────────────
export async function PUT(request: Request) {
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
    const { productIds } = body;

    if (!Array.isArray(productIds)) {
      return NextResponse.json({ error: 'productIds must be an array of strings.' }, { status: 400 });
    }

    const success = await setHeroCarouselProductIds(productIds);
    if (!success) {
      return NextResponse.json({ error: 'Failed to update hero carousel products.' }, { status: 500 });
    }

    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: 'UPDATE_HERO_CAROUSEL_PRODUCTS',
      entityType: 'SystemSetting',
      entityId: 'hero_carousel_products',
      metadata: { count: productIds.length, productIds },
    });

    return NextResponse.json({
      success: true,
      message: 'Home screen hero carousel products updated successfully.',
      featuredProductIds: productIds,
    });
  } catch (error) {
    console.error('Error saving hero carousel settings:', error);
    return NextResponse.json(
      { error: 'An error occurred while saving hero carousel settings.' },
      { status: 500 }
    );
  }
}
