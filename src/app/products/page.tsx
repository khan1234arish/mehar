import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { BROAD_CATEGORIES } from '@/data/categories';
import { PRODUCTS_CATALOG } from '@/data/products';
import { COMPANY_INFO } from '@/data/companyInfo';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Bike,
  Truck,
  Home,
  Sun,
  Zap,
  Cpu,
  ArrowRight,
  ArrowUpRight,
  Layers,
} from 'lucide-react';

export const metadata = {
  title: 'Battery Products & Solutions Catalogue | MEHAR B2B',
  description: 'Explore the broad battery solutions portfolio by MEHAR (Lawad Infrastructure Private Limited) for electric vehicles, energy storage, solar, and custom OEM.',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // Query live product counts per category from DB
  const categoryCounts: Record<string, number> = {};

  try {
    if (prisma && process.env.DATABASE_URL) {
      const categoriesWithCount = await prisma.category.findMany({
        select: {
          slug: true,
          _count: {
            select: {
              products: {
                where: {
                  publishStatus: 'VERIFIED',
                  isPublished: true,
                },
              },
            },
          },
        },
      });

      categoriesWithCount.forEach((cat) => {
        categoryCounts[cat.slug] = cat._count.products;
      });
    }
  } catch (err) {
    console.error('Error fetching category product counts:', err);
  }

  // Fallback to static catalog if DB count is not available
  BROAD_CATEGORIES.forEach((cat) => {
    if (categoryCounts[cat.slug] === undefined) {
      categoryCounts[cat.slug] = PRODUCTS_CATALOG.filter(
        (p) => p.categorySlug === cat.slug || p.categoryId === cat.id
      ).length;
    }
  });

  const totalProducts = Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);

  return (
    <div className="py-12 space-y-16 bg-white text-[#0F172A]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="green">B2B Product Portfolio</Badge>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                <Layers className="w-3.5 h-3.5 text-[#059669]" />
                {totalProducts} Verified Models Across 6 Categories
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Product Categories &amp; Catalogue
            </h1>

            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Select a category below to explore specific battery models, technical datasheets, and engineering specifications manufactured by <strong className="text-[#0F172A]">{COMPANY_INFO.parentCompanyName}</strong> under brand <strong className="text-[#0F172A]">{COMPANY_INFO.brandName}</strong>.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <span className="text-xs text-[#475569] font-mono">
              Click any category card below to view all individual products and datasheets inside it.
            </span>

            <Button
              href="/rfq"
              variant="primary"
              size="sm"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Request Custom Batch Quote (RFQ)
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BROAD_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.slug] || 0;

            return (
              <div
                key={cat.id}
                className="bg-white border border-[#E2E8F0] hover:border-[#059669] hover:shadow-lg transition-all duration-200 rounded-2xl p-7 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Category Visual Box */}
                  <Link href={`/products/${cat.slug}`} className="block">
                    <div className="relative h-48 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-5 overflow-hidden flex items-center justify-center p-3 group-hover:border-[#A7F3D0] transition-colors cursor-pointer">
                      {cat.defaultImage ? (
                        <Image
                          src={cat.defaultImage}
                          alt={cat.name}
                          fill
                          className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-xl bg-white border border-[#E2E8F0] flex items-center justify-center text-[#059669]">
                          <Cpu className="w-7 h-7" />
                        </div>
                      )}

                      {/* Top Right: Real Product Count Badge */}
                      <span className="absolute top-3 right-3 text-xs font-mono font-bold px-3 py-1 rounded-full bg-white/95 backdrop-blur-sm text-[#065F46] border border-[#A7F3D0] shadow-2xs">
                        {count} {count === 1 ? 'Product' : 'Products'}
                      </span>
                    </div>
                  </Link>

                  {/* Title & Product Count Indicator */}
                  <div className="mb-2">
                    <span className="text-[11px] font-mono uppercase tracking-wider font-bold text-[#059669] block mb-1">
                      Product Category • {count} {count === 1 ? 'Model' : 'Models'}
                    </span>
                    <h2 className="text-xl font-bold text-[#0F172A] group-hover:text-[#059669] transition-colors">
                      <Link href={`/products/${cat.slug}`} className="hover:underline">
                        {cat.name}
                      </Link>
                    </h2>
                  </div>

                  <p className="text-xs text-[#065F46] font-semibold mb-2 leading-relaxed">
                    {cat.tagline}
                  </p>

                  <p className="text-xs text-[#64748B] leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div>
                  {/* Key Applications */}
                  <div className="pt-4 border-t border-[#E2E8F0] mb-6">
                    <span className="text-[11px] font-mono text-[#64748B] block mb-2 font-bold uppercase tracking-wider">
                      Target Applications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.keyApplications.map((app) => (
                        <span
                          key={app}
                          className="px-2.5 py-1 rounded-md bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] text-[#334155] font-medium"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions - Explicit Full-Card Explore CTA */}
                  <div className="space-y-2">
                    <Link
                      href={`/products/${cat.slug}`}
                      className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#CBD5E1] text-xs font-bold text-[#0F172A] group-hover:bg-[#059669] group-hover:text-white group-hover:border-[#059669] transition-all shadow-2xs"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>Explore Category</span>
                        <span className="font-mono text-[11px] opacity-80">({count} {count === 1 ? 'Product' : 'Products'})</span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center justify-between text-[11px] font-mono px-1">
                      <Link
                        href={`/products/${cat.slug}`}
                        className="text-[#059669] hover:underline font-semibold flex items-center gap-0.5"
                      >
                        View Product List →
                      </Link>

                      <Link
                        href={`/rfq?category=${cat.slug}`}
                        className="text-[#64748B] hover:text-[#0F172A] font-semibold"
                      >
                        Direct RFQ
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* OEM Custom Note Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#0F172A] flex items-center justify-center md:justify-start gap-2">
              <Cpu className="w-4 h-4 text-[#059669]" />
              Need a Custom Voltage, Capacity or Enclosure Factor?
            </h3>
            <p className="text-xs text-[#64748B]">
              We collaborate directly with equipment engineers to design and fabricate application-specific battery packs.
            </p>
          </div>

          <Button
            href="/oem-custom-solutions"
            variant="outline"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Submit Custom OEM Requirements
          </Button>
        </div>
      </div>
    </div>
  );
}

