import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { productSchema } from '@/lib/validations/admin';
import { PRODUCTS_CATALOG } from '@/data/products';
import { BROAD_CATEGORIES } from '@/data/categories';

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
        const categoryId = searchParams.get('categoryId');
        const status = searchParams.get('status');
        const search = searchParams.get('search')?.trim();

        const where: Record<string, unknown> = {};
        if (categoryId) where.categoryId = categoryId;
        if (status) {
          where.publishStatus = status;
        } else {
          where.publishStatus = { not: 'ARCHIVED' };
        }

        if (search) {
          where.OR = [
            { name: { contains: search, mode: 'insensitive' } },
            { slug: { contains: search, mode: 'insensitive' } },
            { modelNumber: { contains: search, mode: 'insensitive' } },
            { applicationTag: { contains: search, mode: 'insensitive' } },
          ];
        }

        const products = await prisma.product.findMany({
          where,
          include: {
            category: { select: { id: true, name: true, slug: true } },
            specifications: { orderBy: { displayOrder: 'asc' } },
            images: {
              where: { isArchived: false },
              orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
            },
          },
          orderBy: { updatedAt: 'desc' },
        });

        const categories = await prisma.category.findMany({
          select: { id: true, name: true, slug: true },
          orderBy: { displayOrder: 'asc' },
        });

        if (products.length > 0) {
          return NextResponse.json({ products, categories });
        }
      }
    } catch {
      // Fallback to static catalog if DB offline
    }

    // Fallback to static data
    const fallbackProducts = PRODUCTS_CATALOG.map((p) => {
      const cat = BROAD_CATEGORIES.find((c) => c.id === p.categoryId) || BROAD_CATEGORIES[0];
      return {
        id: p.id,
        categoryId: p.categoryId,
        name: p.name,
        slug: p.slug,
        modelNumber: null,
        shortDescription: p.shortDescription,
        applicationTag: p.applicationTag,
        chemistry: p.chemistry || null,
        voltageRange: p.voltageRange || null,
        capacityRange: p.capacityRange || null,
        energyRange: p.energyRange || null,
        cycleLife: p.cycleLife || null,
        maxDischargeRate: p.maxDischargeRate || null,
        operatingTemp: p.operatingTemp || null,
        bmsProtocols: p.bmsProtocols || null,
        ipRating: p.ipRating || null,
        dimensions: p.dimensions || null,
        weight: p.weight || null,
        warrantySummary: p.warrantySummary || null,
        publishStatus: p.isPlaceholder ? 'PENDING_VERIFICATION' : 'VERIFIED',
        isPublished: !p.isPlaceholder,
        isPlaceholder: p.isPlaceholder,
        tdsFileUrl: p.tdsFileUrl || null,
        category: { id: cat.id, name: cat.name, slug: cat.slug },
        specifications: p.specifications || [],
        updatedAt: new Date().toISOString(),
      };
    });

    const fallbackCategories = BROAD_CATEGORIES.map((c) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
    }));

    return NextResponse.json({ products: fallbackProducts, categories: fallbackCategories });
  } catch (error) {
    console.error('Error fetching admin products:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching the product catalog.' },
      { status: 500 }
    );
  }
}

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
    const parsed = productSchema.safeParse(body);

    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0];
      const fieldPath = firstIssue?.path?.length ? ` (${firstIssue.path.join('.')})` : '';
      return NextResponse.json(
        { error: `${firstIssue?.message || 'Invalid product data format.'}${fieldPath}` },
        { status: 400 }
      );
    }

    const data = parsed.data;

    try {
      if (prisma && process.env.DATABASE_URL) {
        const isVerified = data.publishStatus === 'VERIFIED';
        const isPublished = isVerified && data.isPublished;

        const product = await prisma.product.create({
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
            minimumOrderQuantity: data.minimumOrderQuantity || null,
            publishStatus: data.publishStatus,
            isPublished,
            isPlaceholder: data.isPlaceholder ?? !isVerified,
            verifiedAt: isVerified ? new Date() : null,
            verifiedById: isVerified ? session.user.id : null,
          },
          include: {
            category: true,
            specifications: true,
            images: true,
          },
        });

        await logAdminAudit({
          userId: session.user.id,
          adminEmail: session.user.email,
          action: 'PRODUCT_CREATE',
          entityType: 'Product',
          entityId: product.id,
          metadata: { name: product.name, slug: product.slug },
          request,
        });

        return NextResponse.json({ success: true, product });
      }
    } catch (dbErr) {
      console.warn('Database save failed, returning demo acknowledgement:', dbErr);
    }

    return NextResponse.json({
      success: true,
      product: {
        id: `prod-${Date.now()}`,
        ...data,
      },
    });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the product.' },
      { status: 500 }
    );
  }
}
