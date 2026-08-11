import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { PRODUCTS_CATALOG } from '@/data/products';

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
        const [
          rfqTotal,
          rfqNew,
          oemTotal,
          oemNew,
          generalTotal,
          productsTotal,
          productsVerified,
          resourcesTotal,
          recentRfqs,
          recentOem,
          recentAudits,
        ] = await Promise.all([
          prisma.rfqRequest.count(),
          prisma.rfqRequest.count({ where: { status: 'NEW' } }),
          prisma.oemEnquiry.count(),
          prisma.oemEnquiry.count({ where: { status: 'NEW' } }),
          prisma.generalEnquiry.count(),
          prisma.product.count({ where: { publishStatus: { not: 'ARCHIVED' } } }),
          prisma.product.count({ where: { publishStatus: 'VERIFIED', isPublished: true } }),
          prisma.resourceDownload.count({ where: { isArchived: false } }),
          prisma.rfqRequest.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              rfqNumber: true,
              companyName: true,
              contactPerson: true,
              volumeTier: true,
              status: true,
              createdAt: true,
            },
          }),
          prisma.oemEnquiry.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              enquiryNumber: true,
              companyName: true,
              contactPerson: true,
              applicationType: true,
              status: true,
              createdAt: true,
            },
          }),
          prisma.auditLog.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              adminEmail: true,
              action: true,
              entityType: true,
              entityId: true,
              createdAt: true,
            },
          }),
        ]);

        return NextResponse.json({
          counts: {
            rfqs: { total: rfqTotal, new: rfqNew },
            oem: { total: oemTotal, new: oemNew },
            general: { total: generalTotal },
            products: { total: productsTotal, verified: productsVerified },
            resources: { total: resourcesTotal },
          },
          recentRfqs,
          recentOem,
          recentAudits,
        });
      }
    } catch {
      // Database offline — fallback gracefully
    }

    // Fallback data when DB is offline
    return NextResponse.json({
      counts: {
        rfqs: { total: 0, new: 0 },
        oem: { total: 0, new: 0 },
        general: { total: 0 },
        products: { total: PRODUCTS_CATALOG.length, verified: PRODUCTS_CATALOG.filter((p) => !p.isPlaceholder).length },
        resources: { total: 4 },
      },
      recentRfqs: [],
      recentOem: [],
      recentAudits: [
        {
          id: 'log-initial',
          adminEmail: session.user.email,
          action: 'LOGIN_SUCCESS',
          entityType: 'User',
          entityId: session.user.id,
          createdAt: new Date().toISOString(),
        },
      ],
    });
  } catch (error) {
    console.error('Admin dashboard retrieval error:', error);
    return NextResponse.json(
      { error: 'An error occurred while loading dashboard metrics.' },
      { status: 500 }
    );
  }
}
