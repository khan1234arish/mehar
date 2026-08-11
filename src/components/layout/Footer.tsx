import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BROAD_CATEGORIES } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import { Mail, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E2E8F0] text-[#0F172A] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-14">
          {/* Brand & Corporate Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="w-52 h-14 relative">
              <Image
                src="/assets/logo/mehar-logo.svg"
                alt="MEHAR - Lawad Infrastructure Private Limited"
                fill
                className="object-contain object-left"
              />
            </div>

            <p className="text-xs text-[#475569] leading-relaxed max-w-sm">
              <strong className="text-[#0F172A] font-bold">{COMPANY_INFO.brandName}</strong> is the specialized battery manufacturing and energy storage brand of <strong className="text-[#0F172A] font-bold">{COMPANY_INFO.parentCompanyName}</strong>.
              We engineer industrial-grade battery systems for original equipment manufacturers (OEMs), solar integrators, and commercial distributors.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#64748B]">
              <span className="px-2.5 py-1 rounded bg-[#ECFDF5] border border-[#A7F3D0] font-mono text-[11px] text-[#065F46] font-bold">
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
            </ul>
          </div>

          {/* Applications & Tech */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#059669] mb-4">
              Applications & Tech
            </h4>
            <ul className="space-y-2.5 text-xs text-[#475569]">
              <li>
                <Link href="/applications" className="hover:text-[#059669] transition-colors font-medium">
                  Electric 2-Wheelers & E-Bikes
                </Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-[#059669] transition-colors font-medium">
                  Commercial 3-Wheelers & E-Rickshaw
                </Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-[#059669] transition-colors font-medium">
                  Solar & Renewable Storage
                </Link>
              </li>
              <li>
                <Link href="/applications" className="hover:text-[#059669] transition-colors font-medium">
                  Inverter & Backup UPS
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-[#059669] transition-colors font-medium">
                  Cell Chemistries (LFP & NMC)
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-[#059669] transition-colors font-medium">
                  Smart BMS Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate & Sales Desk */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[#059669] mb-4">
              B2B Sales & Corporate
            </h4>
            <ul className="space-y-3 text-xs text-[#475569]">
              <li>
                <Link href="/about" className="hover:text-[#059669] transition-colors font-medium">
                  About Lawad Infrastructure
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-[#059669] transition-colors font-medium">
                  Resource & Download Center
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#059669] transition-colors font-medium">
                  Corporate Contact & Enquiry
                </Link>
              </li>
              <li className="pt-2">
                <a
                  href={`mailto:${COMPANY_INFO.salesEmail}`}
                  className="flex items-center gap-2 text-[#0F172A] hover:text-[#059669] transition-colors font-mono font-bold"
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
                  className="flex items-center gap-2 text-[#059669] hover:text-[#047857] transition-colors font-mono font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Business Desk</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Corporate Legal Strip */}
        <div className="pt-8 border-t border-[#E2E8F0] flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-[#64748B]">
          <div>
            <p>
              © {new Date().getFullYear()} <span className="text-[#0F172A] font-semibold">{COMPANY_INFO.brandName}</span> • A unit of <span className="text-[#0F172A] font-semibold">{COMPANY_INFO.parentCompanyName}</span>. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6 font-mono text-[11px]">
            <span>B2B Industrial Platform</span>
            <span>•</span>
            <span className="text-[#0F172A] font-medium">Wholesale & OEM Direct</span>
            <span>•</span>
            <Link href="/contact" className="text-[#059669] hover:underline font-bold">
              Request Quotation
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
