import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { BROAD_CATEGORIES } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Layers,
  ArrowRight,
  ArrowUpRight,
  Cpu,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'B2B Product Catalogue & Specifications | MEHAR Batteries',
  description:
    'Browse MEHAR commercial lithium battery product categories, models, technical datasheets, and engineering specifications for electric mobility, solar storage, and industrial equipment.',
};

export default async function ProductsCataloguePage() {
  // Fetch real product count per category
  let publishedProducts: Array<{ categoryId: string | null; category?: { slug: string } | null }> = [];
  try {
    if (prisma && process.env.DATABASE_URL) {
      publishedProducts = await prisma.product.findMany({
        where: {
          publishStatus: 'VERIFIED',
          isPublished: true,
        },
        select: {
          categoryId: true,
          category: {
            select: { slug: true },
          },
        },
      });
    }
  } catch {
    // If DB is offline, fall back to empty list
  }

  // Count products per category slug
  const categoryCounts: Record<string, number> = {};
  publishedProducts.forEach((p) => {
    const slug = p.category?.slug;
    if (slug) {
      categoryCounts[slug] = (categoryCounts[slug] || 0) + 1;
    }
  });

  const totalProducts = Object.values(categoryCounts).reduce((acc, count) => acc + count, 0);

  return (
    <div className="py-12 space-y-16 bg-[#0B0F14] text-[#E6EAF0]">
      {/* Header Banner */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-12 lg:p-14 rounded-3xl bg-[#11161D] border border-[#1E2633] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#39D353]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="green">B2B Product Portfolio</Badge>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-[#39D353]/10 text-[#39D353] border border-[#39D353]/25 shadow-[0_0_10px_rgba(57,211,83,0.1)]">
                <Layers className="w-3.5 h-3.5 text-[#39D353]" />
                {totalProducts} Verified Models Across {BROAD_CATEGORIES.length} Categories
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#E6EAF0] tracking-tight">
              Product Categories &amp; Catalogue
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#A3AAB5] leading-relaxed">
              Select a category below to explore specific battery models, technical datasheets, and engineering specifications manufactured by <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong> under brand <strong className="text-[#E6EAF0]">{COMPANY_INFO.brandName}</strong>.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1E2633] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm relative z-10">
            <span className="text-xs sm:text-sm text-[#A3AAB5] font-mono">
              Click any category card below to view all individual products and datasheets inside it.
            </span>

            <Button
              href="/rfq"
              variant="primary"
              size="md"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Request Custom Batch Quote (RFQ)
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {BROAD_CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.slug] || 0;

            return (
              <div
                key={cat.id}
                className="bg-[#11161D] border border-[#1E2633] hover:border-[#39D353]/50 hover:shadow-[0_0_25px_rgba(57,211,83,0.12)] transition-all duration-300 rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative"
              >
                <div>
                  {/* Category Visual Box */}
                  <Link href={`/products/${cat.slug}`} className="block">
                    <div className="relative h-56 sm:h-64 rounded-2xl bg-[#0B0F14] border border-[#1E2633] mb-6 overflow-hidden flex items-center justify-center p-4 group-hover:border-[#39D353]/40 transition-colors cursor-pointer">
                      {cat.defaultImage ? (
                        <Image
                          src={cat.defaultImage}
                          alt={cat.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-[#11161D] border border-[#1E2633] flex items-center justify-center text-[#39D353]">
                          <Cpu className="w-8 h-8" />
                        </div>
                      )}

                      {/* Top Right: Real Product Count Badge */}
                      <span className="absolute top-3.5 right-3.5 text-xs font-mono font-bold px-3 py-1 rounded-full bg-[#11161D]/90 backdrop-blur-md text-[#39D353] border border-[#39D353]/30 shadow-md">
                        {count} {count === 1 ? 'Product' : 'Products'}
                      </span>
                    </div>
                  </Link>

                  {/* Title & Product Count Indicator */}
                  <div className="mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#39D353] block mb-1">
                      Product Category • {count} {count === 1 ? 'Model' : 'Models'}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-bold text-[#E6EAF0] group-hover:text-[#39D353] transition-colors">
                      <Link href={`/products/${cat.slug}`} className="hover:underline">
                        {cat.name}
                      </Link>
                    </h2>
                  </div>

                  <p className="text-xs sm:text-sm text-[#39D353] font-semibold mb-2 leading-relaxed">
                    {cat.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#A3AAB5] leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div>
                  {/* Key Applications */}
                  <div className="pt-4 border-t border-[#1E2633] mb-6">
                    <span className="text-xs font-mono text-[#A3AAB5] block mb-2 font-bold uppercase tracking-wider">
                      Target Applications:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.keyApplications.map((app) => (
                        <span
                          key={app}
                          className="px-2.5 py-1 rounded-lg bg-[#161C24] border border-[#1E2633] text-xs text-[#A3AAB5] font-medium font-mono"
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
                      className="w-full inline-flex items-center justify-between px-4 py-3 rounded-xl bg-[#161C24] border border-[#1E2633] text-xs sm:text-sm font-bold text-[#E6EAF0] group-hover:bg-[#39D353] group-hover:text-[#0B0F14] group-hover:border-[#39D353] transition-all shadow-sm"
                    >
                      <span className="flex items-center gap-1.5">
                        <span>Explore Category</span>
                        <span className="font-mono text-xs opacity-80">({count} {count === 1 ? 'Product' : 'Products'})</span>
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <div className="flex items-center justify-between text-xs font-mono px-1">
                      <Link
                        href={`/products/${cat.slug}`}
                        className="text-[#39D353] hover:underline font-semibold flex items-center gap-0.5"
                      >
                        View Product List →
                      </Link>

                      <Link
                        href={`/rfq?category=${cat.slug}`}
                        className="text-[#A3AAB5] hover:text-[#E6EAF0] font-semibold"
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
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-[#11161D] border border-[#1E2633] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl">
          <div className="space-y-1 max-w-2xl">
            <h3 className="text-lg font-bold text-[#E6EAF0] flex items-center justify-center md:justify-start gap-2">
              <Cpu className="w-5 h-5 text-[#39D353]" />
              Need a Custom Voltage, Capacity or Enclosure Factor?
            </h3>
            <p className="text-xs sm:text-sm text-[#A3AAB5] leading-relaxed">
              We collaborate directly with equipment engineers to design and fabricate application-specific battery packs.
            </p>
          </div>

          <Button
            href="/oem-custom-solutions"
            variant="secondary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Submit Custom OEM Requirements
          </Button>
        </div>
      </div>
    </div>
  );
}
