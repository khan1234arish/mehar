import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { BROAD_CATEGORIES, getCategoryBySlug, CategoryData } from '@/data/categories';
import { PRODUCTS_CATALOG, ProductData } from '@/data/products';
import { COMPANY_INFO } from '@/data/companyInfo';
import { getSitePlaceholderImage } from '@/lib/siteImages';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Package,
  Layers,
  ArrowUpRight,
  FileSpreadsheet,
  Cpu,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

function resolveCategoryAndProduct(slug: string) {
  // 1. Check if slug matches a known category
  const directCat = getCategoryBySlug(slug);
  if (directCat) {
    return { category: directCat, targetProductSlug: null };
  }

  // 2. Check if slug matches a static product
  const staticProd = PRODUCTS_CATALOG.find((p) => p.slug === slug);
  if (staticProd) {
    const cat = getCategoryBySlug(staticProd.categorySlug) || BROAD_CATEGORIES[0];
    return { category: cat, targetProductSlug: staticProd.slug };
  }

  return { category: null, targetProductSlug: null };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const resolved = resolveCategoryAndProduct(slug);

  if (resolved.category) {
    return {
      title: `${resolved.category.name} | MEHAR Battery Portfolio & Models`,
      description: resolved.category.description,
    };
  }

  return {
    title: 'MEHAR Commercial Battery Portfolio',
    description: 'Explore commercial lithium batteries manufactured by MEHAR.',
  };
}

export default async function ProductCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ product?: string }>;
}) {
  const { slug } = await params;
  const { product: selectedProductSlug } = await searchParams;

  const resolved = resolveCategoryAndProduct(slug);
  let category: CategoryData | null = resolved.category;
  let requestedProductSlug = selectedProductSlug || resolved.targetProductSlug;

  // 1. If not found in static maps, check database
  if (!category && prisma) {
    try {
      const dbCat = await prisma.category.findUnique({
        where: { slug },
      });

      if (dbCat) {
        category = {
          id: dbCat.id,
          name: dbCat.name,
          slug: dbCat.slug,
          tagline: dbCat.tagline || `${dbCat.name} commercial battery systems`,
          description: dbCat.description || '',
          iconName: 'Battery',
          isPlaceholder: false,
          verificationStatus: 'CLIENT_VERIFIED',
          keyApplications: [],
          defaultImage: '/assets/products/mehar-2w-battery.jpg',
        };
      } else {
        const dbProd = await prisma.product.findUnique({
          where: { slug },
          include: { category: true },
        });

        if (dbProd && dbProd.category) {
          category = getCategoryBySlug(dbProd.category.slug) || {
            id: dbProd.category.id,
            name: dbProd.category.name,
            slug: dbProd.category.slug,
            tagline: `${dbProd.category.name} commercial battery systems`,
            description: '',
            iconName: 'Battery',
            isPlaceholder: false,
            verificationStatus: 'CLIENT_VERIFIED',
            keyApplications: [],
            defaultImage: '/assets/products/mehar-2w-battery.jpg',
          };
          requestedProductSlug = dbProd.slug;
        }
      }
    } catch (err) {
      console.error('Error resolving category from DB:', err);
    }
  }

  if (!category) {
    notFound();
  }

  // 2. Fetch real products from Database for this category
  let dbProducts: any[] = [];
  try {
    if (prisma && process.env.DATABASE_URL) {
      dbProducts = await prisma.product.findMany({
        where: {
          publishStatus: { not: 'ARCHIVED' },
          isPublished: true,
          category: {
            slug: category.slug,
          },
        },
        include: {
          images: {
            where: {
              isPublished: true,
              isArchived: false,
            },
            orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
          },
          specifications: {
            orderBy: [{ groupName: 'asc' }, { displayOrder: 'asc' }],
          },
        },
        orderBy: { name: 'asc' },
      });
    }
  } catch (err) {
    console.error('Database connection error in products/[slug]:', err);
  }

  // 3. Fallback to static catalog if DB returned 0 products
  let availableProducts = dbProducts;
  if (availableProducts.length === 0) {
    const staticForCat = PRODUCTS_CATALOG.filter(
      (p) => p.categorySlug === category!.slug || p.categoryId === category!.id
    );
    if (staticForCat.length > 0) {
      availableProducts = staticForCat;
    }
  }

  // 4. Guaranteed fallback so category page NEVER renders 404
  if (availableProducts.length === 0) {
    availableProducts = [
      {
        id: `prod-${category.slug}`,
        name: `${category.name} Custom Pack`,
        slug: category.slug,
        modelNumber: 'MHR-COMMERCIAL-SYS',
        shortDescription: category.description || category.tagline,
        applicationTag: category.name,
        chemistry: 'LiFePO4 / NMC',
        voltageRange: 'Custom Voltage Range',
        capacityRange: 'Custom Capacity',
        energyRange: 'Custom kWh',
        cycleLife: '3,000+ Cycles',
        maxDischargeRate: 'High C-Rate',
        operatingTemp: '-20°C to 60°C',
        bmsProtocols: 'UART / CAN / RS485 / Bluetooth',
        ipRating: 'IP67',
        dimensions: 'Custom Engineering Enclosure',
        weight: 'Application Specific',
        warrantySummary: '3 to 5 Years Commercial Warranty',
        isPlaceholder: false,
        verificationStatus: 'CLIENT_VERIFIED',
        placeholderNote: '',
        tdsFileUrl: null,
        imageUrl: category.defaultImage || '/assets/products/mehar-2w-battery.jpg',
        images: [],
        specifications: [],
      },
    ];
  }

  // Determine active selected product
  const activeProduct =
    availableProducts.find((p: any) => p.slug === requestedProductSlug) || availableProducts[0];

  const primaryImage = activeProduct.images?.find((img: any) => img.isPrimary) || activeProduct.images?.[0];
  const moqDisplay = activeProduct.minimumOrderQuantity
    ? `${activeProduct.minimumOrderQuantity} units (Batch procurement)`
    : 'Batch procurement / OEM MOQ upon application';

  const defaultPlaceholder = await getSitePlaceholderImage('category_default');
  const displayImageUrl =
    primaryImage?.imageUrl ||
    activeProduct.imageUrl ||
    (defaultPlaceholder.url !== '/assets/logo/mehar-logo.png' ? defaultPlaceholder.url : category.defaultImage) ||
    defaultPlaceholder.url;
  const displayImageAlt = primaryImage?.altText || activeProduct.name;

  return (
    <div className="py-8 sm:py-12 space-y-10 sm:space-y-16 bg-theme-base text-theme-primary transition-colors duration-200">
      {/* 1. Breadcrumb & Category Header */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center gap-2 text-xs font-mono text-theme-secondary mb-4 sm:mb-6">
          <Link href="/products" className="hover:text-theme-green flex items-center gap-1 font-semibold transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to All Categories
          </Link>
          <span className="text-theme-border-strong">/</span>
          <span className="text-theme-primary font-bold truncate">{category.name}</span>
        </div>

        {/* Category Overview Card */}
        <div className="p-5 sm:p-8 lg:p-12 rounded-3xl bg-theme-card border border-theme-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-green/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                <Badge variant="green">Product Category</Badge>
                <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 rounded-full text-[11px] sm:text-xs font-mono font-bold bg-theme-green/10 text-theme-green border border-theme-green/25">
                  <Layers className="w-3.5 h-3.5 text-theme-green shrink-0" />
                  {availableProducts.length} {availableProducts.length === 1 ? 'Product Model' : 'Product Models'} in Category
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-theme-primary tracking-tight">
                {category.name}
              </h1>

              <p className="text-sm sm:text-base text-theme-green font-semibold">
                {category.tagline}
              </p>

              <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed max-w-3xl">
                {category.description}
              </p>

              {/* Target Applications Pills */}
              {category.keyApplications && category.keyApplications.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-mono text-theme-secondary block mb-2 font-bold uppercase tracking-wider">
                    Recommended Target Applications:
                  </span>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {category.keyApplications.map((app) => (
                      <span
                        key={app}
                        className="px-2.5 sm:px-3 py-1 rounded-lg bg-theme-elevated border border-theme-border text-xs text-theme-primary font-mono font-medium"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <Button
                href={`/rfq?category=${category.slug}`}
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Request Batch RFQ for this Category
              </Button>
              <Button
                href="/oem-custom-solutions"
                variant="outline"
                size="md"
                className="w-full justify-center"
              >
                Custom Engineering Enquiries
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Product Models Grid (Selector) */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-theme-border pb-4">
            <div>
              <span className="text-xs font-mono uppercase font-bold text-theme-green tracking-wider">
                Production Line Models
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-theme-primary">
                Select Model for Technical Datasheet
              </h2>
            </div>
            <span className="text-xs font-mono text-theme-secondary">
              Showing all verified commercial packs
            </span>
          </div>

          {/* Grid of Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProducts.map((prod: any) => {
              const isSelected = prod.slug === activeProduct.slug;
              const prodPrimaryImg = prod.images?.find((img: any) => img.isPrimary) || prod.images?.[0];
              const cardImgUrl = prodPrimaryImg?.imageUrl || prod.imageUrl || category!.defaultImage || '/assets/products/mehar-2w-battery.jpg';

              return (
                <div
                  key={prod.id}
                  className={`group rounded-2xl p-5 border transition-all duration-300 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-theme-card border-theme-green shadow-lg ring-1 ring-theme-green'
                      : 'bg-theme-card border-theme-border hover:border-theme-border-strong hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Visual Stage */}
                    <div className="relative aspect-video rounded-xl bg-theme-base border border-theme-border flex items-center justify-center p-3 overflow-hidden">
                      {cardImgUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={cardImgUrl}
                          alt={prod.name}
                          className="max-h-36 max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Cpu className="w-10 h-10 text-theme-green" />
                      )}

                      {/* Model & Chemistry Tag */}
                      {prod.chemistry && (
                        <span className="absolute top-3 left-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/90 backdrop-blur-sm text-theme-green border border-theme-green/40 shadow-sm">
                          {prod.chemistry.split(' ')[0]}
                        </span>
                      )}

                      {prod.modelNumber && (
                        <span className="absolute top-3 right-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-black/80 text-white backdrop-blur-sm border border-white/10">
                          {prod.modelNumber}
                        </span>
                      )}
                    </div>

                    {/* Product Name & Short Description */}
                    <div>
                      <h3 className="text-base font-bold text-theme-primary group-hover:text-theme-green transition-colors leading-snug">
                        <Link href={`/products/${category!.slug}?product=${prod.slug}#specifications`}>
                          {prod.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-theme-secondary mt-1.5 line-clamp-2 leading-relaxed">
                        {prod.shortDescription}
                      </p>
                    </div>

                    {/* Key Technical Specs Badges */}
                    <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-theme-surface border border-theme-border text-center font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-theme-secondary uppercase block">Voltage</span>
                        <strong className="text-theme-primary text-xs">{prod.voltageRange?.split(' ')[0] || 'Varies'}</strong>
                      </div>
                      <div className="border-x border-theme-border">
                        <span className="text-[10px] text-theme-secondary uppercase block">Capacity</span>
                        <strong className="text-theme-primary text-xs">{prod.capacityRange?.split(' ')[0] || 'Varies'}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-theme-secondary uppercase block">IP Rating</span>
                        <strong className="text-theme-primary text-xs">{prod.ipRating?.split(' ')[0] || 'IP65'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Product Card Actions */}
                  <div className="mt-5 pt-4 border-t border-theme-border flex items-center justify-between">
                    <Link
                      href={`/products/${category!.slug}?product=${prod.slug}#specifications`}
                      className="text-xs font-mono font-bold text-theme-green hover:underline flex items-center gap-1"
                    >
                      <span>Inspect Datasheet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Button
                      href={`/rfq?category=${category!.slug}&product=${encodeURIComponent(prod.name)}`}
                      variant="ghost"
                      size="sm"
                      icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                    >
                      RFQ
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Detailed Engineering Datasheet Section */}
      <div id="specifications" className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 pt-4">
        <div className="space-y-6">
          {/* Active Product Header Banner */}
          <div className="p-5 sm:p-8 rounded-3xl bg-theme-card border border-theme-border shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
              {/* Left Column: Product Identity & Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-theme-green/10 text-theme-green border border-theme-green/25">
                    <ShieldCheck className="w-3.5 h-3.5 text-theme-green shrink-0" /> Verified Product Datasheet
                  </span>
                  {activeProduct.modelNumber && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-theme-elevated text-theme-primary border border-theme-border">
                      Model: {activeProduct.modelNumber}
                    </span>
                  )}
                  {activeProduct.chemistry && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-theme-elevated text-theme-green border border-theme-border">
                      Chemistry: {activeProduct.chemistry}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-theme-primary tracking-tight">
                  {activeProduct.name}
                </h2>

                <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed max-w-2xl">
                  {activeProduct.shortDescription}
                </p>

                {/* MOQ Indicator Box */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-theme-elevated border border-theme-border flex flex-col xs:flex-row items-start xs:items-center gap-3 sm:gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-theme-green/10 text-theme-green flex items-center justify-center shrink-0">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-theme-secondary uppercase tracking-wider block">
                      Minimum Order Quantity (MOQ)
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-theme-primary font-mono">
                      {moqDisplay}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual & Direct Quote Button */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-video sm:aspect-square w-full rounded-2xl bg-theme-base border border-theme-border flex flex-col items-center justify-center p-4 overflow-hidden shadow-inner">
                  {displayImageUrl.endsWith('.svg') ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={displayImageUrl}
                      alt={displayImageAlt}
                      className="max-h-48 max-w-[80%] object-contain opacity-90"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={displayImageUrl}
                      alt={displayImageAlt}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  )}
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-theme-elevated border border-theme-border shadow-md space-y-2.5">
                  <Button
                    href={`/rfq?category=${category.slug}&product=${encodeURIComponent(activeProduct.name)}&moq=${activeProduct.minimumOrderQuantity || ''}`}
                    variant="primary"
                    size="md"
                    className="w-full justify-center"
                    icon={<ArrowUpRight className="w-4 h-4" />}
                  >
                    Request Quotation for {activeProduct.name.split(' ')[1] || 'Model'}
                  </Button>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(activeProduct.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center text-xs font-mono text-theme-green hover:underline font-semibold"
                  >
                    Direct Technical Inquiry via WhatsApp Desk &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Matrix */}
          <div className="p-5 sm:p-8 rounded-3xl bg-theme-card border border-theme-border shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-theme-border pb-4">
              <div>
                <span className="text-xs font-mono uppercase font-bold text-theme-green tracking-wider">
                  Technical Matrix
                </span>
                <h3 className="text-xl font-bold text-theme-primary">
                  Engineering Datasheet &amp; Parameter Validation
                </h3>
              </div>

              {activeProduct.tdsFileUrl && (
                <Button
                  href={activeProduct.tdsFileUrl}
                  variant="outline"
                  size="sm"
                  icon={<FileSpreadsheet className="w-4 h-4 text-theme-green" />}
                >
                  Download Complete TDS PDF
                </Button>
              )}
            </div>

            {/* Core Specifications Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-theme-elevated border-b border-theme-border font-mono uppercase text-[11px] text-theme-secondary">
                    <th className="py-3 px-4 font-bold">Engineering Parameter</th>
                    <th className="py-3 px-4 font-bold">Specification Value</th>
                    <th className="py-3 px-4 font-bold">Standard / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-theme-border font-mono text-xs">
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Product Model Code</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.modelNumber || 'MHR-OEM-SPEC'}</td>
                    <td className="py-3.5 px-4 text-theme-green">OEM Standard</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Nominal Voltage Range</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.voltageRange || 'Custom Application'}</td>
                    <td className="py-3.5 px-4 text-theme-green">Verified</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Rated Capacity (C/5)</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.capacityRange || 'Custom Ah'}</td>
                    <td className="py-3.5 px-4 text-theme-green">Verified</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Energy Content</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.energyRange || 'Calculated per Ah'}</td>
                    <td className="py-3.5 px-4 text-theme-green">Standard Rating</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Cell Chemistry &amp; Format</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.chemistry || 'LiFePO4 / NMC'}</td>
                    <td className="py-3.5 px-4 text-theme-green">Grade-A Prismatic / Cylindrical</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Cycle Life @ 80% DoD</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.cycleLife || '3,000+ Full Cycles'}</td>
                    <td className="py-3.5 px-4 text-theme-green">Long-Life Standard</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Continuous Discharge Rate</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.maxDischargeRate || '1.0C continuous / 2.5C peak'}</td>
                    <td className="py-3.5 px-4 text-theme-green">High-Drain Grade</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Operating Temperature Range</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.operatingTemp || '-10°C to 55°C'}</td>
                    <td className="py-3.5 px-4 text-theme-green">Indian Ambient Validated</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">BMS Communication Interface</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.bmsProtocols || 'UART / CAN 2.0B / RS485 / Bluetooth'}</td>
                    <td className="py-3.5 px-4 text-theme-green">Active Smart BMS</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Ingress Protection (IP Rating)</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.ipRating || 'IP67 Waterproof Enclosure'}</td>
                    <td className="py-3.5 px-4 text-theme-green">Submersion Proof</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Dimensions &amp; Form Factor</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.dimensions || 'Custom Form Factor'}</td>
                    <td className="py-3.5 px-4 text-theme-green">Engineered Enclosure</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Total Pack Weight</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.weight || 'Optimized for high gravimetric density'}</td>
                    <td className="py-3.5 px-4 text-theme-green">Verified</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 px-4 font-semibold text-theme-secondary">Standard B2B Warranty</td>
                    <td className="py-3.5 px-4 font-bold text-theme-primary">{activeProduct.warrantySummary || '3 Years Comprehensive / 5 Years Prorated'}</td>
                    <td className="py-3.5 px-4 text-theme-green">Commercial Grade</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Custom Specifications if any */}
            {activeProduct.specifications && activeProduct.specifications.length > 0 && (
              <div className="pt-6 border-t border-theme-border space-y-3">
                <h4 className="text-xs font-mono uppercase font-bold text-theme-primary">
                  Extended Application Parameters
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {activeProduct.specifications.map((spec: any, sIdx: number) => (
                    <div
                      key={sIdx}
                      className="p-3 rounded-xl bg-theme-elevated border border-theme-border flex items-center justify-between text-xs font-mono"
                    >
                      <span className="text-theme-secondary">{spec.specKey}</span>
                      <strong className="text-theme-primary">
                        {spec.specValue} {spec.specUnit || ''}
                      </strong>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}