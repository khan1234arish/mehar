import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth';
import { BROAD_CATEGORIES } from '@/data/categories';
import { PRODUCTS_CATALOG } from '@/data/products';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const session = await verifyAdminSession(request);

    if (!session.authenticated || !session.user) {
      return NextResponse.json(
        { error: session.error || 'Unauthorized access to analytics.' },
        { status: session.statusCode || 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '7d';

    let startDate: Date | undefined;
    const now = new Date();

    if (range === 'today') {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    } else if (range === '7d') {
      startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (range === '30d') {
      startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
    // 'all' leaves startDate undefined

    const dateFilter = startDate ? { gte: startDate } : undefined;

    try {
      if (prisma && process.env.DATABASE_URL) {
        const [
          rfqCount,
          oemCount,
          generalCount,
          downloads,
          rfqItems,
          products,
          categories,
          recentRfqs,
        ] = await Promise.all([
          prisma.rfqRequest.count({
            where: dateFilter ? { createdAt: dateFilter } : undefined,
          }),
          prisma.oemEnquiry.count({
            where: dateFilter ? { createdAt: dateFilter } : undefined,
          }),
          prisma.generalEnquiry.count({
            where: dateFilter ? { createdAt: dateFilter } : undefined,
          }),
          prisma.resourceDownload.findMany({
            where: { isPublished: true, isArchived: false },
            select: { id: true, title: true, category: true, downloadCount: true },
            orderBy: { downloadCount: 'desc' },
          }),
          prisma.rfqItem.findMany({
            where: dateFilter ? { rfqRequest: { createdAt: dateFilter } } : undefined,
            select: {
              categoryName: true,
              productId: true,
              product: { select: { name: true, slug: true, modelNumber: true } },
              quantityTier: true,
            },
          }),
          prisma.product.findMany({
            where: { isPublished: true, publishStatus: 'VERIFIED' },
            select: { id: true, name: true, slug: true, modelNumber: true, category: { select: { name: true, slug: true } } },
          }),
          prisma.category.findMany({
            select: { id: true, name: true, slug: true, _count: { select: { products: { where: { isPublished: true, publishStatus: 'VERIFIED' } } } } },
          }),
          prisma.rfqRequest.findMany({
            where: dateFilter ? { createdAt: dateFilter } : undefined,
            take: 6,
            orderBy: { createdAt: 'desc' },
            select: {
              id: true,
              rfqNumber: true,
              companyName: true,
              businessType: true,
              volumeTier: true,
              projectTimeline: true,
              status: true,
              createdAt: true,
            },
          }),
        ]);

        // Aggregate RFQ count by Category
        const categoryDemandMap: Record<string, number> = {};
        rfqItems.forEach((item) => {
          const cat = item.categoryName || 'General';
          categoryDemandMap[cat] = (categoryDemandMap[cat] || 0) + 1;
        });

        // Top Category List
        const topCategories = categories.map((cat) => ({
          name: cat.name,
          slug: cat.slug,
          productCount: cat._count.products,
          inquiryCount: categoryDemandMap[cat.name] || categoryDemandMap[cat.slug] || 0,
        }));

        // Top Products List
        const topProducts = products.map((prod) => {
          const inquiries = rfqItems.filter((i) => i.productId === prod.id || (i.product && i.product.slug === prod.slug)).length;
          return {
            name: prod.name,
            modelNumber: prod.modelNumber,
            slug: prod.slug,
            categoryName: prod.category.name,
            inquiries,
          };
        }).sort((a, b) => b.inquiries - a.inquiries).slice(0, 8);

        return NextResponse.json({
          range,
          metrics: {
            totalRfqs: rfqCount,
            totalOem: oemCount,
            totalGeneral: generalCount,
            totalLeads: rfqCount + oemCount + generalCount,
            totalDownloads: downloads.reduce((acc, d) => acc + d.downloadCount, 0),
          },
          telemetryStatus: {
            provider: 'Vercel Web Analytics',
            instrumentation: 'RootLayout (@vercel/analytics/react)',
            environment: process.env.NODE_ENV || 'production',
            privacyMode: 'Strict (No Cookies, GDPR Compliant, Zero PII)',
            trackingHooksActive: true,
          },
          topCategories,
          topProducts,
          downloads,
          recentRfqs,
          publicRoutes: [
            { path: '/', label: 'Homepage & Hero', category: 'General' },
            { path: '/products', label: 'All Products Directory', category: 'Catalogue' },
            { path: '/products/electric-2-wheeler-batteries', label: 'Electric 2-Wheeler (E-2W)', category: 'EV Mobility' },
            { path: '/products/electric-3-wheeler-batteries', label: 'Electric 3-Wheeler & E-Rickshaw', category: 'Commercial EV' },
            { path: '/products/energy-storage-inverter-batteries', label: 'ESS & Lithium Inverters', category: 'Energy Storage' },
            { path: '/products/solar-renewable-energy-batteries', label: 'Solar & Renewable Storage', category: 'Solar' },
            { path: '/products/cylindrical-li-ion-cells', label: 'Cylindrical Li-ion Cells', category: 'Battery Cells' },

            { path: '/products/custom-oem-industrial-batteries', label: 'Custom OEM & Industrial', category: 'Industrial & Robotics' },
            { path: '/technology', label: 'Smart BMS & Cell Engineering', category: 'Technology' },
            { path: '/applications', label: 'Industrial Applications', category: 'Solutions' },
            { path: '/oem-custom-solutions', label: 'OEM Pack Configurator', category: 'Custom Engineering' },
            { path: '/finder', label: 'Battery Finder Wizard', category: 'Tools' },
            { path: '/compare', label: 'Specification Comparison Matrix', category: 'Tools' },
            { path: '/rfq', label: 'B2B Quotation Desk', category: 'Procurement' },
            { path: '/contact', label: 'Corporate Contact Desk', category: 'Corporate' },
          ],
        });
      }
    } catch {
      // Fallback if DB is disconnected
    }

    // Static catalogue fallback when offline
    return NextResponse.json({
      range,
      metrics: {
        totalRfqs: 0,
        totalOem: 0,
        totalGeneral: 0,
        totalLeads: 0,
        totalDownloads: 0,
      },
      telemetryStatus: {
        provider: 'Vercel Web Analytics',
        instrumentation: 'RootLayout (@vercel/analytics/react)',
        environment: 'development',
        privacyMode: 'Strict (No Cookies, GDPR Compliant, Zero PII)',
        trackingHooksActive: true,
      },
      topCategories: BROAD_CATEGORIES.map((c) => ({
        name: c.name,
        slug: c.slug,
        productCount: PRODUCTS_CATALOG.filter((p) => p.categorySlug === c.slug).length,
        inquiryCount: 0,
      })),
      topProducts: PRODUCTS_CATALOG.slice(0, 8).map((p) => ({
        name: p.name,
        modelNumber: p.modelNumber || 'MHR-STD',
        slug: p.slug,
        categoryName: p.categorySlug,
        inquiries: 0,
      })),
      downloads: [],
      recentRfqs: [],
      publicRoutes: [
        { path: '/', label: 'Homepage & Hero', category: 'General' },
        { path: '/products', label: 'All Products Directory', category: 'Catalogue' },
        { path: '/products/electric-2-wheeler-batteries', label: 'Electric 2-Wheeler (E-2W)', category: 'EV Mobility' },
        { path: '/products/electric-3-wheeler-batteries', label: 'Electric 3-Wheeler & E-Rickshaw', category: 'Commercial EV' },
        { path: '/products/energy-storage-inverter-batteries', label: 'ESS & Lithium Inverters', category: 'Energy Storage' },
        { path: '/products/solar-renewable-energy-batteries', label: 'Solar & Renewable Storage', category: 'Solar' },
        { path: '/products/cylindrical-li-ion-cells', label: 'Cylindrical Li-ion Cells', category: 'Battery Cells' },

        { path: '/products/custom-oem-industrial-batteries', label: 'Custom OEM & Industrial', category: 'Industrial & Robotics' },
      ],
    });
  } catch (error) {
    console.error('Analytics API error:', error);
    return NextResponse.json(
      { error: 'An error occurred while loading analytics metrics.' },
      { status: 500 }
    );
  }
}
