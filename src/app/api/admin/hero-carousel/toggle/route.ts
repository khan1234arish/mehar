import { NextResponse } from 'next/server';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { toggleHeroCarouselProductId } from '@/lib/heroCarousel';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
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
    const { productId } = body;

    if (!productId || typeof productId !== 'string') {
      return NextResponse.json({ error: 'Valid productId is required.' }, { status: 400 });
    }

    const result = await toggleHeroCarouselProductId(productId);

    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: result.isFeatured ? 'ADD_HERO_CAROUSEL_PRODUCT' : 'REMOVE_HERO_CAROUSEL_PRODUCT',
      entityType: 'Product',
      entityId: productId,
      metadata: { isFeatured: result.isFeatured, allIds: result.allIds },
    });

    return NextResponse.json({
      success: true,
      productId,
      isFeatured: result.isFeatured,
      featuredProductIds: result.allIds,
      message: result.isFeatured
        ? 'Product added to Home Screen Hero Carousel.'
        : 'Product removed from Home Screen Hero Carousel.',
    });
  } catch (error) {
    console.error('Error toggling hero carousel product:', error);
    return NextResponse.json(
      { error: 'An error occurred while updating hero carousel status.' },
      { status: 500 }
    );
  }
}
