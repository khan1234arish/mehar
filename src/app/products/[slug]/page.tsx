import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BROAD_CATEGORIES } from '@/data/categories';
import { PRODUCTS_CATALOG } from '@/data/products';
import { COMPANY_INFO } from '@/data/companyInfo';
import { getSitePlaceholderImage } from '@/lib/siteImages';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  FileSpreadsheet,
  Package,
  Layers,
  ShieldCheck,
  Cpu,
} from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams?: {
    product?: string;
  };
}

export function generateStaticParams() {
  return BROAD_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export const dynamic = 'force-dynamic';

export default async function CategoryDetailPage({ params, searchParams }: CategoryPageProps) {
  const category = BROAD_CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  // 1. Fetch live products from DB under this category
  let dbProducts: any[] = [];

  try {
    if (prisma && process.env.DATABASE_URL) {
      dbProducts = await prisma.product.findMany({
        where: {
          category: { slug: params.slug },
          publishStatus: 'VERIFIED',
          isPublished: true,
        },
        include: {
          specifications: { orderBy: { displayOrder: 'asc' } },
          images: {
            where: {
              isPublished: true,
              isArchived: false,
            },
            orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
          },
        },
        orderBy: { createdAt: 'asc' },
      });
    }
  } catch {
    // Fallback to static catalog
  }

  // Fallback to static catalog if no DB products
  const categoryFallbackProducts = PRODUCTS_CATALOG.filter(
    (p) => p.categorySlug === params.slug || p.categoryId === category.id
  );

  const availableProducts = dbProducts.length > 0 ? dbProducts : (categoryFallbackProducts.length > 0 ? categoryFallbackProducts : [PRODUCTS_CATALOG[0]]);

  // Select active product by searchParams or first available
  const requestedProductSlug = searchParams?.product;
  const activeProduct = (requestedProductSlug && availableProducts.find((p: any) => p.slug === requestedProductSlug)) || availableProducts[0];

  const publishedImages: Array<{ id: string; imageUrl: string; altText: string | null; isPrimary: boolean }> =
    activeProduct.images && activeProduct.images.length > 0 ? activeProduct.images : [];

  // MOQ Governance (Rule 4: Do NOT invent MOQ values; null shows "Contact MEHAR")
  const moqDisplay = activeProduct.minimumOrderQuantity
    ? `${activeProduct.minimumOrderQuantity} units`
    : 'Contact MEHAR';

  // Image Selection Priority: Primary published image -> Custom Admin placeholder -> Category visual -> Default fallback
  const defaultPlaceholder = await getSitePlaceholderImage('product_default');
  const primaryImage = publishedImages.find((img) => img.isPrimary) || publishedImages[0];
  const displayImageUrl =
    primaryImage?.imageUrl ||
    activeProduct.imageUrl ||
    (defaultPlaceholder.url !== '/assets/logo/mehar-logo.png' ? defaultPlaceholder.url : category.defaultImage) ||
    defaultPlaceholder.url;
  const displayImageAlt = primaryImage?.altText || activeProduct.name;

  return (
    <div className="py-12 space-y-16 bg-[#0B0F14] text-[#E6EAF0]">
      {/* 1. Breadcrumb & Category Header */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center gap-2 text-xs font-mono text-[#A3AAB5] mb-6">
          <Link href="/products" className="hover:text-[#39D353] flex items-center gap-1 font-semibold transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to All Categories
          </Link>
          <span className="text-[#1E2633]">/</span>
          <span className="text-[#E6EAF0] font-bold truncate">{category.name}</span>
        </div>

        {/* Category Overview Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11161D] border border-[#1E2633] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#39D353]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="green">Product Category</Badge>
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-[#39D353]/10 text-[#39D353] border border-[#39D353]/25">
                  <Layers className="w-3.5 h-3.5 text-[#39D353]" />
                  {availableProducts.length} {availableProducts.length === 1 ? 'Product Model' : 'Product Models'} in Category
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#E6EAF0] tracking-tight">
                {category.name}
              </h1>

              <p className="text-sm sm:text-base text-[#39D353] font-semibold">
                {category.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#A3AAB5] leading-relaxed max-w-3xl">
                {category.description}
              </p>

              {/* Target Applications Pills */}
              <div className="pt-2">
                <span className="text-xs font-mono text-[#A3AAB5] block mb-2 font-bold uppercase tracking-wider">
                  Recommended Target Applications:
                </span>
                <div className="flex flex-wrap gap-2">
                  {category.keyApplications.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1 rounded-lg bg-[#161C24] border border-[#1E2633] text-xs text-[#E6EAF0] font-mono font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0D1117] border border-[#1E2633] shadow-lg space-y-3">
              <span className="text-xs font-mono text-[#39D353] font-bold uppercase tracking-wider block">
                Category Procurement Desk
              </span>
              <p className="text-xs text-[#A3AAB5] leading-relaxed">
                Explore individual model specifications below, or submit batch procurement parameters directly to our technical desk.
              </p>

              <Button
                href={`/rfq?category=${category.slug}`}
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Request Category RFQ
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Individual Products Grid (Catalogue View) */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-[#1E2633]">
            <div>
              <h2 className="text-xl font-bold text-[#E6EAF0] flex items-center gap-2">
                <Package className="w-5 h-5 text-[#39D353]" />
                Available Models &amp; Configurations ({availableProducts.length})
              </h2>
              <p className="text-xs text-[#A3AAB5] mt-0.5">
                Click any model to inspect full engineering specifications, cell chemistry, and dimensional data below.
              </p>
            </div>

            <span className="text-xs font-mono text-[#A3AAB5]">
              Active Selection: <strong className="text-[#39D353] font-bold">{activeProduct.name}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableProducts.map((prod: any) => {
              const isSelected = prod.slug === activeProduct.slug;
              const prodImg = prod.imageUrl || displayImageUrl;

              return (
                <div
                  key={prod.slug}
                  className={`bg-[#11161D] rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between group ${
                    isSelected
                      ? 'border-[#39D353] shadow-[0_0_25px_rgba(57,211,83,0.15)] ring-1 ring-[#39D353] bg-[#161C24]'
                      : 'border-[#1E2633] hover:border-[#39D353]/50 hover:shadow-md'
                  }`}
                >
                  <div className="space-y-4">
                    {/* Visual Container */}
                    <div className="relative h-44 rounded-xl bg-[#0B0F14] border border-[#1E2633] overflow-hidden flex items-center justify-center p-3 group-hover:border-[#39D353]/40 transition-colors">
                      {prodImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={prodImg}
                          alt={prod.name}
                          className="max-h-36 max-w-[85%] object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <Cpu className="w-10 h-10 text-[#39D353]" />
                      )}

                      {/* Model & Chemistry Tag */}
                      {prod.chemistry && (
                        <span className="absolute top-3 left-3 text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#11161D]/90 backdrop-blur-sm text-[#39D353] border border-[#39D353]/30">
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
                      <h3 className="text-base font-bold text-[#E6EAF0] group-hover:text-[#39D353] transition-colors leading-snug">
                        <Link href={`/products/${category.slug}?product=${prod.slug}#specifications`}>
                          {prod.name}
                        </Link>
                      </h3>
                      <p className="text-xs text-[#A3AAB5] mt-1.5 line-clamp-2 leading-relaxed">
                        {prod.shortDescription}
                      </p>
                    </div>

                    {/* Key Technical Specs Badges */}
                    <div className="grid grid-cols-3 gap-2 py-2 px-3 rounded-xl bg-[#0D1117] border border-[#1E2633] text-center font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-[#A3AAB5] uppercase block">Voltage</span>
                        <strong className="text-[#E6EAF0] text-xs">{prod.voltageRange?.split(' ')[0] || 'Varies'}</strong>
                      </div>
                      <div className="border-x border-[#1E2633]">
                        <span className="text-[10px] text-[#A3AAB5] uppercase block">Capacity</span>
                        <strong className="text-[#E6EAF0] text-xs">{prod.capacityRange?.split(' ')[0] || 'Custom'}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#A3AAB5] uppercase block">Energy</span>
                        <strong className="text-[#39D353] text-xs">{prod.energyRange?.split(' ')[0] || 'TDS'}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Product Card Actions */}
                  <div className="pt-4 mt-4 border-t border-[#1E2633] flex items-center justify-between gap-2">
                    <Link
                      href={`/products/${category.slug}?product=${prod.slug}#specifications`}
                      className={`flex-1 inline-flex items-center justify-center gap-1 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                        isSelected
                          ? 'bg-[#39D353] text-[#0B0F14] shadow-[0_0_12px_rgba(57,211,83,0.25)]'
                          : 'bg-[#161C24] text-[#E6EAF0] border border-[#1E2633] hover:bg-[#39D353] hover:text-[#0B0F14] hover:border-[#39D353]'
                      }`}
                    >
                      <span>{isSelected ? 'Viewing Specs' : 'View Specs'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/rfq?category=${category.slug}&product=${encodeURIComponent(prod.name)}&moq=${prod.minimumOrderQuantity || ''}`}
                      className="inline-flex items-center justify-center p-2 rounded-xl bg-[#39D353]/10 border border-[#39D353]/25 text-[#39D353] hover:bg-[#39D353] hover:text-[#0B0F14] transition-all text-xs font-bold"
                      title="Request quote for this specific model"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
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
          <div className="p-8 rounded-3xl bg-[#11161D] border border-[#1E2633] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Product Identity & Details */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#39D353]/10 text-[#39D353] border border-[#39D353]/25">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#39D353]" /> Verified Product Datasheet
                  </span>
                  {activeProduct.modelNumber && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-[#161C24] text-[#E6EAF0] border border-[#1E2633]">
                      Model: {activeProduct.modelNumber}
                    </span>
                  )}
                  {activeProduct.chemistry && (
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-[#161C24] text-[#39D353] border border-[#1E2633]">
                      Chemistry: {activeProduct.chemistry}
                    </span>
                  )}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E6EAF0] tracking-tight">
                  {activeProduct.name}
                </h2>

                <p className="text-xs sm:text-sm text-[#A3AAB5] leading-relaxed max-w-2xl">
                  {activeProduct.shortDescription}
                </p>

                {/* MOQ Indicator Box */}
                <div className="p-4 rounded-xl bg-[#161C24] border border-[#1E2633] inline-flex items-center gap-4 shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-[#39D353]/10 text-[#39D353] flex items-center justify-center">
                    <Package className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-[#A3AAB5] uppercase tracking-wider block">
                      Minimum Order Quantity (MOQ)
                    </span>
                    <span className="text-sm font-bold text-[#E6EAF0] font-mono">
                      {moqDisplay}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual & Direct Quote Button */}
              <div className="lg:col-span-5 space-y-4">
                <div className="relative aspect-video sm:aspect-square w-full rounded-2xl bg-[#0B0F14] border border-[#1E2633] flex flex-col items-center justify-center p-4 overflow-hidden shadow-inner">
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
                      className="w-full h-full object-cover rounded-xl"
                    />
                  )}
                </div>

                <div className="p-5 rounded-2xl bg-[#161C24] border border-[#1E2633] shadow-md space-y-2.5">
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
                    className="block text-center text-xs font-mono text-[#39D353] hover:underline font-semibold"
                  >
                    Direct WhatsApp Inquiry Desk →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-[#E6EAF0] flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-[#39D353]" />
                Technical &amp; Engineering Specifications Matrix
              </h3>
              <p className="text-xs text-[#A3AAB5] mt-0.5">
                Numerical specifications for {activeProduct.name} verified by MEHAR engineering.
              </p>
            </div>

            <div className="rounded-2xl bg-[#11161D] border border-[#1E2633] overflow-hidden shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#0D1117] border-b border-[#1E2633] text-[#A3AAB5] font-mono uppercase text-[11px]">
                      <th className="py-3.5 px-6 font-bold">Specification Parameter</th>
                      <th className="py-3.5 px-6 font-bold">Classification Group</th>
                      <th className="py-3.5 px-6 font-bold">Value / Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1E2633] text-[#E6EAF0]">
                    {activeProduct.specifications && activeProduct.specifications.length > 0 ? (
                      activeProduct.specifications.map((spec: any, idx: number) => (
                        <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                          <td className="py-4 px-6 font-semibold text-[#E6EAF0]">
                            {spec.specKey}
                          </td>
                          <td className="py-4 px-6 font-mono text-[#A3AAB5]">
                            {spec.groupName}
                          </td>
                          <td className="py-4 px-6 font-mono font-medium text-[#39D353]">
                            {spec.specValue} {spec.specUnit || ''}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <>
                        <tr className="hover:bg-white/[0.03] transition-colors">
                          <td className="py-4 px-6 font-semibold text-[#E6EAF0]">Nominal Voltage</td>
                          <td className="py-4 px-6 font-mono text-[#A3AAB5]">Electrical</td>
                          <td className="py-4 px-6 font-mono font-medium text-[#39D353]">{activeProduct.voltageRange || 'Configuration dependent'}</td>
                        </tr>
                        <tr className="hover:bg-white/[0.03] transition-colors">
                          <td className="py-4 px-6 font-semibold text-[#E6EAF0]">Rated Capacity</td>
                          <td className="py-4 px-6 font-mono text-[#A3AAB5]">Electrical</td>
                          <td className="py-4 px-6 font-mono font-medium text-[#39D353]">{activeProduct.capacityRange || 'Available on request'}</td>
                        </tr>
                        <tr className="hover:bg-white/[0.03] transition-colors">
                          <td className="py-4 px-6 font-semibold text-[#E6EAF0]">Cell Chemistry</td>
                          <td className="py-4 px-6 font-mono text-[#A3AAB5]">Electrochemistry</td>
                          <td className="py-4 px-6 font-mono font-medium text-[#39D353]">{activeProduct.chemistry || 'LiFePO4 / NMC'}</td>
                        </tr>
                        <tr className="hover:bg-white/[0.03] transition-colors">
                          <td className="py-4 px-6 font-semibold text-[#E6EAF0]">Cycle Life (@ 80% DoD)</td>
                          <td className="py-4 px-6 font-mono text-[#A3AAB5]">Durability</td>
                          <td className="py-4 px-6 font-mono font-medium text-[#39D353]">{activeProduct.cycleLife || '2,000+ cycles'}</td>
                        </tr>
                        <tr className="hover:bg-white/[0.03] transition-colors">
                          <td className="py-4 px-6 font-semibold text-[#E6EAF0]">Ingress Protection</td>
                          <td className="py-4 px-6 font-mono text-[#A3AAB5]">Mechanical</td>
                          <td className="py-4 px-6 font-mono font-medium text-[#39D353]">{activeProduct.ipRating || 'IP65'}</td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. OEM Customization CTA */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 rounded-2xl bg-[#11161D] border border-[#1E2633] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-[#E6EAF0]">
              Need custom engineering or specific C-rate parameters?
            </h3>
            <p className="text-xs text-[#A3AAB5]">
              Our engineering team works directly with EV and energy storage OEMs to develop tailored pack configurations.
            </p>
          </div>

          <Button
            href={`/oem-custom-solutions`}
            variant="secondary"
            size="md"
          >
            Submit Custom Engineering Request
          </Button>
        </div>
      </div>
    </div>
  );
}
