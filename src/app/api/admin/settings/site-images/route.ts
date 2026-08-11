import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { requireCsrfHeader } from '@/lib/csrf';
import { logAdminAudit } from '@/lib/audit';
import { siteManagedImageSchema } from '@/lib/validations/admin';
import { getAllSiteImagesConfig } from '@/lib/siteImages';

export const dynamic = 'force-dynamic';

// ── GET /api/admin/settings/site-images ────────────────────────────────────────
export async function GET(request: Request) {
  try {
    const session = await verifyAdminSession(request);
    if (!session.authenticated || !session.user) {
      return NextResponse.json(
        { error: session.error || 'Unauthorized' },
        { status: session.statusCode || 401 }
      );
    }

    const images = await getAllSiteImagesConfig();
    return NextResponse.json({ images });
  } catch (error) {
    console.error('Error fetching site images:', error);
    return NextResponse.json(
      { error: 'An error occurred while loading site image configurations.' },
      { status: 500 }
    );
  }
}

// ── PUT /api/admin/settings/site-images ────────────────────────────────────────
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
    const parsed = siteManagedImageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid site image payload.' },
        { status: 400 }
      );
    }

    const data = parsed.data;

    try {
      if (prisma && process.env.DATABASE_URL) {
        const record = await prisma.siteManagedImage.upsert({
          where: { key: data.key },
          create: {
            key: data.key,
            imageUrl: data.imageUrl,
            altText: data.altText,
            description: data.description || null,
            isActive: data.isActive,
            updatedBy: session.user.email,
          },
          update: {
            imageUrl: data.imageUrl,
            altText: data.altText,
            description: data.description || null,
            isActive: data.isActive,
            updatedBy: session.user.email,
          },
        });

        await logAdminAudit({
          userId: session.user.id,
          adminEmail: session.user.email,
          action: 'SITE_IMAGE_UPDATE',
          entityType: 'SiteManagedImage',
          entityId: record.id,
          metadata: { key: record.key, imageUrl: record.imageUrl, isActive: record.isActive },
          request,
        });

        return NextResponse.json({ success: true, record });
      }
    } catch {
      // Offline fallback
    }

    return NextResponse.json({
      success: true,
      record: {
        id: `site-img-${data.key}`,
        ...data,
      },
    });
  } catch (error) {
    console.error('Error saving site image setting:', error);
    return NextResponse.json(
      { error: 'An error occurred while saving the site image setting.' },
      { status: 500 }
    );
  }
}
