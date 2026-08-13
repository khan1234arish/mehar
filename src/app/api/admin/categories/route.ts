import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
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
        const categories = await prisma.category.findMany({
          include: {
            _count: {
              select: { products: true },
            },
          },
          orderBy: { displayOrder: 'asc' },
        });

        if (categories.length > 0) {
          return NextResponse.json({ categories });
        }
      }
    } catch {
      // Fallback
    }

    const fallbackCategories = BROAD_CATEGORIES.map((c, idx) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      isPlaceholder: c.isPlaceholder,
      verificationStatus: c.verificationStatus,
      displayOrder: idx,
      isActive: true,
      _count: { products: 0 },
    }));

    return NextResponse.json({ categories: fallbackCategories });
  } catch (error) {
    console.error('Error fetching admin categories:', error);
    return NextResponse.json(
      { error: 'An error occurred while fetching categories.' },
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
    const { name, slug, description, isActive } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Category name and slug are required.' },
        { status: 400 }
      );
    }

    if (!prisma) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        slug,
        description: description || '',
        isActive: isActive ?? true,
        verificationStatus: 'CLIENT_VERIFIED',
      },
    });

    await logAdminAudit({
      userId: session.user.id,
      adminEmail: session.user.email,
      action: 'CATEGORY_CREATE',
      entityType: 'Category',
      entityId: category.id,
      metadata: { name: category.name, slug: category.slug },
      request,
    });

    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { error: 'An error occurred while creating the category.' },
      { status: 500 }
    );
  }
}
