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

    let productsTotal = PRODUCTS_CATALOG.length;
    let productsVerified = PRODUCTS_CATALOG.filter((p) => !p.isPlaceholder).length;
    let rfqTotal = 0;
    let rfqNew = 0;
    let oemTotal = 0;
    let oemNew = 0;
    let generalTotal = 0;
    let resourcesTotal = 4;
    let recentRfqs: any[] = [];
    let recentOem: any[] = [];
    let recentAudits: any[] = [];

    if (prisma && process.env.DATABASE_URL) {
      try {
        const [
          pTotal,
          pVer,
          rTotal,
          rNew,
          oTotal,
          oNew,
          gTotal,
          resTotal,
        ] = await Promise.allSettled([
          prisma.product.count({ where: { publishStatus: { not: 'ARCHIVED' } } }),
          prisma.product.count({ where: { publishStatus: 'VERIFIED', isPublished: true } }),
          prisma.rfqRequest.count(),
          prisma.rfqRequest.count({ where: { status: 'NEW' } }),
          prisma.oemEnquiry.count(),
          prisma.oemEnquiry.count({ where: { status: 'NEW' } }),
          prisma.generalEnquiry.count(),
          prisma.resourceDownload.count({ where: { isArchived: false } }),
        ]);

        if (pTotal.status === 'fulfilled') productsTotal = pTotal.value;
        if (pVer.status === 'fulfilled') productsVerified = pVer.value;
        if (rTotal.status === 'fulfilled') rfqTotal = rTotal.value;
        if (rNew.status === 'fulfilled') rfqNew = rNew.value;
        if (oTotal.status === 'fulfilled') oemTotal = oTotal.value;
        if (oNew.status === 'fulfilled') oemNew = oNew.value;
        if (gTotal.status === 'fulfilled') generalTotal = gTotal.value;
        if (resTotal.status === 'fulfilled') resourcesTotal = resTotal.value;

        const [rfqsRes, oemRes, auditsRes] = await Promise.allSettled([
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

        if (rfqsRes.status === 'fulfilled') recentRfqs = rfqsRes.value;
        if (oemRes.status === 'fulfilled') recentOem = oemRes.value;
        if (auditsRes.status === 'fulfilled') recentAudits = auditsRes.value;
      } catch (err) {
        console.error('Error querying dashboard data from DB:', err);
      }
    }

    if (recentAudits.length === 0) {
      recentAudits = [
        {
          id: 'log-initial',
          adminEmail: session.user.email,
          action: 'LOGIN_SUCCESS',
          entityType: 'User',
          entityId: session.user.id,
          createdAt: new Date().toISOString(),
        },
      ];
    }

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
  } catch (error) {
    console.error('Admin dashboard retrieval error:', error);
    return NextResponse.json(
      { error: 'An error occurred while loading dashboard metrics.' },
      { status: 500 }
    );
  }
}
