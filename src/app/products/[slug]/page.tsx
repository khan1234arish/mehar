import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BROAD_CATEGORIES } from '@/data/categories';
import { PRODUCTS_CATALOG } from '@/data/products';
import { COMPANY_INFO } from '@/data/companyInfo';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  ArrowLeft,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
  CheckCircle2,
  FileSpreadsheet,
  AlertCircle,
  Clock,
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

export default function CategoryDetailPage({ params }: CategoryPageProps) {
  const category = BROAD_CATEGORIES.find((c) => c.slug === params.slug);

  if (!category) {
    notFound();
  }

  const product = PRODUCTS_CATALOG.find((p) => p.categoryId === category.id) || PRODUCTS_CATALOG[0];

  return (
    <div className="py-12 space-y-12">
      {/* Breadcrumb & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-2 text-xs font-mono text-[#94A3B8] mb-6">
          <Link href="/products" className="hover:text-[#00F59B] flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Back to All Categories
          </Link>
          <span>/</span>
          <span className="text-white truncate">{category.name}</span>
        </div>

        {/* Hero Category Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] border border-[#1E293B] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="green">Broad Category</Badge>
                <PlaceholderNotice message="Specs Coming Soon" />
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                {category.name}
              </h1>

              <p className="text-sm sm:text-base text-[#CBD5E1] font-medium">
                {category.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed max-w-2xl">
                {category.description}
              </p>

              {/* Target Applications Pills */}
              <div className="pt-2">
                <span className="text-xs font-mono text-[#64748B] block mb-2 font-semibold">
                  Recommended Target Applications:
                </span>
                <div className="flex flex-wrap gap-2">
                  {category.keyApplications.map((app) => (
                    <span
                      key={app}
                      className="px-3 py-1 rounded-lg bg-[#131F37] border border-[#1E293B] text-xs text-[#CBD5E1]"
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Action Box */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-[#131F37]/80 border border-[#1E293B] space-y-4">
              <span className="text-xs font-mono text-[#00D2FF] font-bold uppercase tracking-wider block">
                B2B Procurement Desk
              </span>
              <p className="text-xs text-[#94A3B8]">
                Request tailored technical datasheets, wholesale batch pricing, or custom OEM pack dimensions.
              </p>

              <Button
                href={`/contact?category=${category.slug}&type=rfq`}
                variant="primary"
                size="md"
                className="w-full justify-center"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Inquire for this Category
              </Button>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}?text=Hello%2C%20I%20am%20inquiring%20about%20${encodeURIComponent(category.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center text-xs font-mono text-[#00F59B] hover:underline"
              >
                Direct WhatsApp Inquiry →
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Engineering Specifications Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#00F59B]" />
              Category Engineering Specifications
            </h2>
            <p className="text-xs text-[#94A3B8] mt-1">
              Standard engineering attributes for this battery classification. Verified numerical data sheets will be populated upon official client catalogue release.
            </p>
          </div>

          {/* Placeholder Banner Notice */}
          <PlaceholderNotice
            variant="banner"
            message="Official MEHAR models, electrical specifications, cycle ratings, and dimensions for this category are currently in preparation. To obtain preliminary engineering drawings or prototype specifications, please contact our technical sales desk."
          />

          {/* Specification Table */}
          <div className="rounded-2xl bg-[#0F172A] border border-[#1E293B] overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#131F37] border-b border-[#1E293B] text-[#94A3B8] font-mono uppercase text-[11px]">
                    <th className="py-3.5 px-6 font-semibold">Specification Parameter</th>
                    <th className="py-3.5 px-6 font-semibold">Classification Group</th>
                    <th className="py-3.5 px-6 font-semibold">Value / Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1E293B] text-[#CBD5E1]">
                  {product.specifications.map((spec, idx) => (
                    <tr key={idx} className="hover:bg-[#131F37]/40 transition-colors">
                      <td className="py-4 px-6 font-semibold text-white">
                        {spec.specKey}
                      </td>
                      <td className="py-4 px-6 font-mono text-[#94A3B8]">
                        {spec.groupName}
                      </td>
                      <td className="py-4 px-6">
                        {spec.specValue === 'Specifications coming soon' ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                            <Clock className="w-3 h-3" /> Specifications coming soon
                          </span>
                        ) : (
                          <span className="text-white font-mono">{spec.specValue}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  <tr className="hover:bg-[#131F37]/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">Nominal Voltage & Capacity Range</td>
                    <td className="py-4 px-6 font-mono text-[#94A3B8]">Electrical</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        <Clock className="w-3 h-3" /> Specifications coming soon
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#131F37]/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">Cycle Life (@ 80% DoD)</td>
                    <td className="py-4 px-6 font-mono text-[#94A3B8]">Durability</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        <Clock className="w-3 h-3" /> Specifications coming soon
                      </span>
                    </td>
                  </tr>
                  <tr className="hover:bg-[#131F37]/40 transition-colors">
                    <td className="py-4 px-6 font-semibold text-white">Ingress Protection & Enclosure</td>
                    <td className="py-4 px-6 font-mono text-[#94A3B8]">Mechanical</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                        <Clock className="w-3 h-3" /> Specifications coming soon
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* OEM Customization CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base font-bold text-white">
              Need custom engineering or specific C-rate parameters?
            </h3>
            <p className="text-xs text-[#94A3B8]">
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
