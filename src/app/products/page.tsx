import React from 'react';
import Link from 'next/link';
import { BROAD_CATEGORIES } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
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
  FileSpreadsheet,
  HelpCircle,
} from 'lucide-react';

export const metadata = {
  title: 'Battery Products & Solutions | MEHAR B2B Catalog',
  description: 'Explore the broad battery solutions portfolio by MEHAR (Lawad Infrastructure Private Limited) for electric vehicles, energy storage, solar, and custom OEM.',
};

export default function ProductsPage() {
  return (
    <div className="py-12 space-y-16">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] border border-[#1E293B] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[#00F59B]/10 text-[#00F59B] border border-[#00F59B]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B]"></span>
              B2B Battery Portfolio
            </span>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Broad Battery Categories
            </h1>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Engineered by <strong className="text-white">{COMPANY_INFO.parentCompanyName}</strong> for commercial fleets, equipment OEMs, and energy integrators. Select a category below to explore application suitability or submit a custom project specification.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1E293B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <PlaceholderNotice
              message="Specifications coming soon. Official verified data sheets will be attached upon client catalogue release."
              variant="inline"
            />

            <Button
              href="/contact?type=rfq"
              variant="primary"
              size="sm"
              icon={<ArrowUpRight className="w-4 h-4" />}
            >
              Request Custom Batch Quote
            </Button>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BROAD_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#0F172A] border border-[#1E293B] hover:border-[#00F59B]/40 transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between group shadow-lg shadow-black/40"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-[#131F37] border border-[#1E293B] flex items-center justify-center text-[#00F59B] group-hover:scale-105 transition-transform">
                    {cat.iconName === 'Bike' && <Bike className="w-7 h-7" />}
                    {cat.iconName === 'Truck' && <Truck className="w-7 h-7" />}
                    {cat.iconName === 'Home' && <Home className="w-7 h-7" />}
                    {cat.iconName === 'Sun' && <Sun className="w-7 h-7" />}
                    {cat.iconName === 'Zap' && <Zap className="w-7 h-7" />}
                    {cat.iconName === 'Cpu' && <Cpu className="w-7 h-7" />}
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    Specs Coming Soon
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white group-hover:text-[#00F59B] transition-colors mb-2.5">
                  {cat.name}
                </h2>

                <p className="text-xs text-[#CBD5E1] font-medium mb-3">
                  {cat.tagline}
                </p>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div>
                {/* Key Applications */}
                <div className="pt-4 border-t border-[#1E293B] mb-6">
                  <span className="text-[11px] font-mono text-[#64748B] block mb-2 font-semibold">
                    Target Applications:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.keyApplications.map((app) => (
                      <span
                        key={app}
                        className="px-2.5 py-1 rounded-md bg-[#131F37] border border-[#1E293B] text-[11px] text-[#94A3B8]"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href={`/products/${cat.slug}`}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#131F37] border border-[#1E293B] text-xs font-semibold text-white hover:text-[#00F59B] hover:border-[#00F59B]/30 transition-colors"
                  >
                    <span>View Category</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>

                  <Link
                    href={`/contact?category=${cat.slug}&type=rfq`}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-[#00F59B]/10 border border-[#00F59B]/30 text-xs font-semibold text-[#00F59B] hover:bg-[#00F59B] hover:text-[#04070F] transition-all"
                  >
                    <span>Inquire</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* OEM Custom Note Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-2xl bg-[#050914] border border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Cpu className="w-4 h-4 text-[#00D2FF]" />
              Need a Custom Voltage, Capacity or Enclosure Factor?
            </h3>
            <p className="text-xs text-[#94A3B8]">
              We collaborate directly with equipment engineers to design and fabricate application-specific battery packs.
            </p>
          </div>

          <Button
            href="/contact?type=oem"
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
