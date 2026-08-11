import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { BROAD_CATEGORIES } from '@/data/categories';
import { PRODUCTS_CATALOG, ProductData } from '@/data/products';
import { COMPANY_INFO } from '@/data/companyInfo';
import { getSitePlaceholderImage } from '@/lib/siteImages';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  ArrowLeft,
  ArrowUpRight,
  FileSpreadsheet,
  Clock,
  Package,
  Layers,
  ShieldCheck,
} from 'lucide-react';

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return BROAD_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export const dynamic = 'force-dynamic';

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const category = BROAD_CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  // 1. Fetch live product from DB if available (checking VERIFIED + isPublished status)
  let dbProduct: any = null;
  let publishedImages: Array<{ id: string; imageUrl: string; altText: string | null; isPrimary: boolean }> = [];

  try {
    if (prisma && process.env.DATABASE_URL) {
      dbProduct = await prisma.product.findFirst({
        where: {
          slug: params.slug,
          publishStatus: 'VERIFIED',
          isPublished: true,
        },
        include: {
          specifications: { orderBy: { displayOrder: 'asc' } },
          images: {
            where: {
              isPublished: true, // Only published images
              isArchived: false,
            },
            orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
          },
        },
      });

      if (dbProduct && dbProduct.images) {
        publishedImages = dbProduct.images;
      }
    }
  } catch {
    // Fallback to static catalog
  }

  // Fallback to static catalog if no verified DB product
  const staticProduct = PRODUCTS_CATALOG.find((p) => p.categorySlug === params.slug || p.categoryId === category.id) || PRODUCTS_CATALOG[0];
  const activeProduct = dbProduct || staticProduct;

  // MOQ Governance (Rule 4: Do NOT invent MOQ values; null shows "Contact MEHAR")
  const moqDisplay = activeProduct.minimumOrderQuantity
    ? `${activeProduct.minimumOrderQuantity} units`
    : 'Contact MEHAR';

  // Image Selection: Primary published image -> Site placeholder -> Default SVG
  const defaultPlaceholder = await getSitePlaceholderImage('product_default');
  const primaryImage = publishedImages.find((img) => img.isPrimary) || publishedImages[0];
  const displayImageUrl = primaryImage?.imageUrl || activeProduct.imageUrl || defaultPlaceholder.url;
  const displayImageAlt = primaryImage?.altText || activeProduct.name;

  return (
    <div className="py-12 space-y-12 bg-white text-[#0F172A]">
      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#64748B] mb-6">
          <Link href="/products" className="hover:text-[#059669] flex items-center gap-1 font-semibold">
            <ArrowLeft className="w-3 h-3" /> Back to All Categories
          </Link>
          <span>/</span>
          <span className="text-[#0F172A] font-bold truncate">{category.name}</span>
        </div>

        {/* Hero Category & Product Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Product & Engineering Details */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="green">B2B Industrial Category</Badge>
                {activeProduct.isPlaceholder ? (
                  <PlaceholderNotice message="Specs Coming Soon" />
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Product
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {activeProduct.name || category.name}
              </h1>

              <p className="text-sm sm:text-base text-[#065F46] font-semibold">
                {category.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-2xl">
                {activeProduct.shortDescription || category.description}
              </p>

              {/* MOQ Indicator Box */}
              <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] inline-flex items-center gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-lg bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#64748B] uppercase tracking-wider block">
                    Minimum Order Quantity (MOQ)
                  </span>
                  <span className="text-sm font-bold text-[#0F172A] font-mono">
                    {moqDisplay}
                  </span>
                </div>
              </div>

              {/* Target Applications Pills */}
              <div className="pt-2">
                <span className="text-xs font-mono text-[#64748B] block mb-2 font-bold uppercase tracking-wider">
                  Recommended Target Applications:
                </span>
                <div className="flex flex-wrap gap-2">
                  {category.keyApplications.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1 rounded-lg bg-white border border-[#CBD5E1] text-xs text-[#334155] font-medium"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Product Image & Procurement Box */}
            <div className="lg:col-span-5 space-y-4">
              {/* Product Visual Display */}
              <div className="relative aspect-video sm:aspect-square w-full rounded-2xl bg-white border border-[#CBD5E1] flex flex-col items-center justify-center p-4 overflow-hidden shadow-sm">
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

                {publishedImages.length > 1 && (
                  <div className="absolute bottom-2 left-2 right-2 flex gap-1.5 overflow-x-auto p-1 bg-black/40 backdrop-blur-sm rounded-lg">
                    {publishedImages.map((img, idx) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={img.id || idx}
                        src={img.imageUrl}
                        alt={img.altText || `View ${idx + 1}`}
                        className={`w-10 h-10 object-cover rounded border ${
                          img.isPrimary ? 'border-[#059669]' : 'border-white/40'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* B2B Procurement Desk */}
              <div className="p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-sm space-y-3">
                <span className="text-xs font-mono text-[#059669] font-bold uppercase tracking-wider block">
                  B2B Procurement Desk
                </span>
                <p className="text-xs text-[#64748B]">
                  Request tailored technical datasheets, wholesale batch pricing, or custom OEM pack dimensions.
                </p>

                <Button
                  href={`/rfq?category=${category.slug}&product=${encodeURIComponent(activeProduct.name)}&moq=${activeProduct.minimumOrderQuantity || ''}`}
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Request Official Quotation (RFQ)
                </Button>

                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(activeProduct.name || category.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center text-xs font-mono text-[#059669] hover:underline font-semibold"
                >
                  Direct WhatsApp Inquiry →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Specifications Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#059669]" />
              Technical & Engineering Specifications
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Standard engineering attributes for this battery classification. Numerical specifications are verified by MEHAR engineering.
            </p>
          </div>

          {activeProduct.isPlaceholder && (
            <PlaceholderNotice
              variant="banner"
              message="Official MEHAR models, electrical specifications, cycle ratings, and dimensions for this category are currently in preparation. To obtain preliminary engineering drawings or prototype specifications, please contact our technical sales desk."
            />
          )}

          {/* Specification Table */}
          <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[#64748B] font-mono uppercase text-[11px]">
                    <th className="py-3.5 px-6 font-bold">Specification Parameter</th>
                    <th className="py-3.5 px-6 font-bold">Classification Group</th>
                    <th className="py-3.5 px-6 font-bold">Value / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0] text-[#334155]">
                  {activeProduct.specifications && activeProduct.specifications.length > 0 ? (
                    activeProduct.specifications.map((spec: any, idx: number) => (
                      <tr key={idx} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-4 px-6 font-semibold text-[#0F172A]">
                          {spec.specKey}
                        </td>
                        <td className="py-4 px-6 font-mono text-[#64748B]">
                          {spec.groupName}
                        </td>
                        <td className="py-4 px-6">
                          {spec.specValue === 'Specifications coming soon' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A] font-semibold">
                              <Clock className="w-3 h-3 text-[#CA8A04]" /> Specifications coming soon
                            </span>
                          ) : (
                            <span className="text-[#0F172A] font-mono font-medium">
                              {spec.specValue} {spec.specUnit || ''}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>
                      <tr className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-4 px-6 font-semibold text-[#0F172A]">Nominal Voltage & Capacity Range</td>
                        <td className="py-4 px-6 font-mono text-[#64748B]">Electrical</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A] font-semibold">
                            <Clock className="w-3 h-3 text-[#CA8A04]" /> Specifications coming soon
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-4 px-6 font-semibold text-[#0F172A]">Cycle Life (@ 80% DoD)</td>
                        <td className="py-4 px-6 font-mono text-[#64748B]">Durability</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A] font-semibold">
                            <Clock className="w-3 h-3 text-[#CA8A04]" /> Specifications coming soon
                          </span>
                        </td>
                      </tr>
                      <tr className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="py-4 px-6 font-semibold text-[#0F172A]">Ingress Protection & Enclosure</td>
                        <td className="py-4 px-6 font-mono text-[#64748B]">Mechanical</td>
                        <td className="py-4 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A] font-semibold">
                            <Clock className="w-3 h-3 text-[#CA8A04]" /> Specifications coming soon
                          </span>
                        </td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* OEM Customization CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-[#0F172A]">
              Need custom engineering or specific C-rate parameters?
            </h3>
            <p className="text-xs text-[#64748B]">
              Our engineering team works directly with EV and energy storage OEMs to develop tailored pack configurations.
            </p>
          </div>

          <Button
            href={`/contact?category=${category.slug}&type=oem`}
            variant="outline"
            size="md"
          >
            Submit Custom Engineering Request
          </Button>
        </div>
      </div>
    </div>
  );
}
