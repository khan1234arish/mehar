import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BROAD_CATEGORIES } from '@/data/categories';
import { PRODUCTS_CATALOG } from '@/data/products';
import { COMPANY_INFO } from '@/data/companyInfo';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  ArrowLeft,
  ArrowUpRight,
  FileSpreadsheet,
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

        {/* Hero Category Header */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="green">Broad Category</Badge>
                <PlaceholderNotice message="Specs Coming Soon" />
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                {category.name}
              </h1>

              <p className="text-sm sm:text-base text-[#065F46] font-semibold">
                {category.tagline}
              </p>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-2xl">
                {category.description}
              </p>

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

            {/* Quick Action Box */}
            <div className="lg:col-span-4 p-6 rounded-2xl bg-white border border-[#CBD5E1] shadow-sm space-y-4">
              <span className="text-xs font-mono text-[#059669] font-bold uppercase tracking-wider block">
                B2B Procurement Desk
              </span>
              <p className="text-xs text-[#64748B]">
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
                className="block text-center text-xs font-mono text-[#059669] hover:underline font-semibold"
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
            <h2 className="text-xl font-bold text-[#0F172A] flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-[#059669]" />
              Category Engineering Specifications
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Standard engineering attributes for this battery classification. Verified numerical data sheets will be populated upon official client catalogue release.
            </p>
          </div>

          {/* Placeholder Banner Notice */}
          <PlaceholderNotice
            variant="banner"
            message="Official MEHAR models, electrical specifications, cycle ratings, and dimensions for this category are currently in preparation. To obtain preliminary engineering drawings or prototype specifications, please contact our technical sales desk."
          />

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
                  {product.specifications.map((spec, idx) => (
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
                          <span className="text-[#0F172A] font-mono font-medium">{spec.specValue}</span>
                        )}
                      </td>
                    </tr>
                  ))}
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
