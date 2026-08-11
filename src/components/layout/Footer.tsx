import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BROAD_CATEGORIES } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import {
  Mail,
  MessageSquare,
  Search,
  SlidersHorizontal,
  FileSpreadsheet,
  Factory,
  Wrench,
  ShieldCheck,
  Building2,
  FileText,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E2E8F0] text-[#0F172A] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand & Corporate Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="w-48 sm:w-52 h-12 sm:h-14 relative">
              <Image
                src="/assets/logo/mehar-logo.svg"
                alt="MEHAR - Lawad Infrastructure Private Limited"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-xs text-[#475569] leading-relaxed max-w-sm">
              <strong className="text-[#0F172A] font-bold">{COMPANY_INFO.brandName}</strong> is the specialized industrial battery manufacturing and energy storage brand of <strong className="text-[#0F172A] font-bold">{COMPANY_INFO.parentCompanyName}</strong>.
              We engineer robust battery systems for original equipment manufacturers (OEMs), solar integrators, and commercial distributors.
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-[#64748B]">
              <span className="px-2.5 py-1 rounded bg-[#ECFDF5] border border-[#A7F3D0] font-mono text-[11px] text-[#065F46] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                B2B Manufacturing Only
              </span>
              <span className="font-mono text-[11px] text-[#64748B]">Zero Consumer Retail</span>
            </div>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#059669] mb-4">
              Battery Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-[#475569]">
              {BROAD_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="hover:text-[#059669] transition-colors line-clamp-1 font-medium"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/products"
                  className="text-[#059669] hover:underline font-semibold text-[11px] flex items-center gap-1"
                >
                  All Categories Portfolio →
                </Link>
              </li>
            </ul>
          </div>

          {/* B2B Procurement & Engineering Tools */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#059669] mb-4">
              B2B Tools &amp; Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-[#475569]">
              <li>
                <Link href="/oem-custom-solutions" className="hover:text-[#059669] transition-colors font-medium flex items-center gap-1.5">
                  <Factory className="w-3.5 h-3.5 text-[#059669]" />
                  OEM / ODM Configurator
                </Link>
              </li>
              <li>
                <Link href="/rfq" className="hover:text-[#059669] transition-colors font-medium flex items-center gap-1.5">
                  <FileSpreadsheet className="w-3.5 h-3.5 text-[#059669]" />
                  B2B RFQ Builder
                </Link>
              </li>
              <li>
                <Link href="/finder" className="hover:text-[#059669] transition-colors font-medium flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-[#059669]" />
                  Battery Finder Wizard
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#059669] transition-colors font-medium flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#059669]" />
                  Category Comparison
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-[#059669] transition-colors font-medium flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#059669]" />
                  Engineering Calculators
                </Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-[#059669] transition-colors font-medium">
                  Applications &amp; Solutions
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-[#059669] transition-colors font-medium">
                  Technology &amp; Quality
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate & Sales Desk */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#059669] mb-4">
              Corporate &amp; Sales Desk
            </h4>
            <ul className="space-y-2.5 text-xs text-[#475569]">
              <li>
                <Link href="/about" className="hover:text-[#059669] transition-colors font-medium flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#059669]" />
                  About Lawad Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#059669] transition-colors font-medium flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-[#059669]" />
                  Resource &amp; Download Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#059669] transition-colors font-medium">
                  Contact &amp; Enquiries
                </Link>
              </li>
              <li>
                <Link href="/contact?type=dealer" className="hover:text-[#059669] transition-colors font-medium">
                  Dealership &amp; Distribution
                </Link>
              </li>
              <li className="pt-2 border-t border-[#E2E8F0]">
                <a
                  href={`mailto:${COMPANY_INFO.salesEmail}`}
                  className="flex items-center gap-2 text-[#0F172A] hover:text-[#059669] transition-colors font-mono font-bold text-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-[#059669]" />
                  <span>{COMPANY_INFO.salesEmail}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#059669] hover:text-[#047857] transition-colors font-mono font-bold text-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Business Desk</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Legal & Compliance Strip */}
        <div className="pt-6 border-t border-[#E2E8F0] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#64748B]">
          <div>
            <p>
              © {new Date().getFullYear()} <span className="text-[#0F172A] font-semibold">{COMPANY_INFO.brandName}</span> • A unit of <span className="text-[#0F172A] font-semibold">{COMPANY_INFO.parentCompanyName}</span>. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-[11px]">
            <Link href="/privacy" className="hover:text-[#059669] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#059669] transition-colors">
              Terms of Use
            </Link>
            <span>•</span>
            <Link href="/rfq" className="text-[#059669] hover:underline font-bold">
              Submit RFQ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
