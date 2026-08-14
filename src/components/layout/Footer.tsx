import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getCompanySettings, getSalesSettings } from '@/lib/settings';
import { BROAD_CATEGORIES } from '@/data/categories';
import {
  ShieldCheck,
  MapPin,
  Building2,
  Mail,
  MessageSquare,
  Search,
  SlidersHorizontal,
  FileSpreadsheet,
  Factory,
  Wrench,
  FileText,
  Layers,
} from 'lucide-react';

export default async function Footer() {
  const [company, sales] = await Promise.all([
    getCompanySettings(),
    getSalesSettings(),
  ]);

  const cleanWhatsapp = (sales.whatsappDesk || '').replace(/[^0-9]/g, '');

  return (
    <footer className="bg-theme-surface text-theme-secondary border-t border-theme-border pt-16 pb-12 transition-colors duration-200">
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 mb-14">
          
          {/* Column 1 & 2: Brand & Corporate Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block" aria-label="MEHAR – The Name You Trust">
              <div className="w-40 sm:w-48 h-20 sm:h-24 relative">
                <Image
                  src="/assets/logo/mehar-logo.png"
                  alt={`${company.brandName} – The Name You Trust`}
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs text-theme-secondary leading-relaxed max-w-sm">
              <strong className="text-theme-primary font-bold">{company.brandName}</strong> is the specialized industrial battery manufacturing and clean energy brand of <strong className="text-theme-primary font-bold">{company.parentCompanyName}</strong>.
              We engineer dependable battery systems and energy solutions for commercial electric mobility, solar ESS, and industrial OEMs.
            </p>

            {/* Corporate Badges */}
            <div className="pt-1 flex flex-wrap items-center gap-2.5 text-xs">
              <span className="px-3 py-1 rounded-lg bg-theme-green/10 border border-theme-green/25 font-mono text-[11px] text-theme-green font-bold flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-theme-green" />
                B2B Manufacturing &amp; Supply
              </span>
              <span className="font-mono text-[11px] text-theme-muted">
                Official OEM &amp; Commercial Desk
              </span>
            </div>

            {/* Plant & Office Locations */}
            <div className="pt-2 space-y-1.5 text-xs text-theme-secondary">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-theme-green shrink-0 mt-0.5" />
                <span>
                  <strong className="text-theme-primary">Registered Office:</strong> {company.registeredOffice}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-theme-green shrink-0 mt-0.5" />
                <span>
                  <strong className="text-theme-primary">Plant Location:</strong> {company.plantLocation}
                </span>
              </div>
              {company.gstin && (
                <div className="font-mono text-[11px] text-theme-muted pl-6">
                  GSTIN: {company.gstin}
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Products & Categories */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-theme-green mb-4 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-theme-green" /> Products &amp; Solutions
            </h4>
            <ul className="space-y-2.5 text-xs text-theme-secondary">
              {BROAD_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/products/${cat.slug}`}
                    className="hover:text-theme-green transition-colors line-clamp-1 font-medium"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-1.5">
                <Link
                  href="/products"
                  className="text-theme-green hover:underline font-bold text-xs flex items-center gap-1"
                >
                  All Battery Categories →
                </Link>
              </li>
              <li>
                <Link
                  href="/applications"
                  className="text-theme-secondary hover:text-theme-green transition-colors font-medium"
                >
                  Application Sectors
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: B2B Procurement */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-theme-green mb-4 flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5 text-theme-green" /> B2B Procurement
            </h4>
            <ul className="space-y-2.5 text-xs text-theme-secondary">
              <li>
                <Link
                  href="/finder"
                  className="hover:text-theme-green transition-colors font-medium flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5 text-theme-green" />
                  Find a Battery Solution
                </Link>
              </li>
              <li>
                <Link
                  href="/compare"
                  className="hover:text-theme-green transition-colors font-medium flex items-center gap-1.5"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-theme-green" />
                  Compare Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/rfq"
                  className="hover:text-theme-green transition-colors font-medium flex items-center gap-1.5"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-theme-green" />
                  Prepare an RFQ
                </Link>
              </li>
              <li>
                <Link
                  href="/tools"
                  className="hover:text-theme-green transition-colors font-medium flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5 text-theme-green" />
                  Engineering Calculators
                </Link>
              </li>
            </ul>

            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-theme-blue mt-6 mb-3 flex items-center gap-1.5">
              <Factory className="w-3.5 h-3.5 text-theme-blue" /> OEM / ODM Engineering
            </h4>
            <ul className="space-y-2 text-xs text-theme-secondary">
              <li>
                <Link
                  href="/oem-custom-solutions"
                  className="hover:text-theme-blue transition-colors font-medium block"
                >
                  Configure an OEM Solution
                </Link>
              </li>
              <li>
                <Link
                  href="/technology"
                  className="text-theme-muted hover:text-theme-green transition-colors font-medium block"
                >
                  Technology &amp; Quality
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Company & Resources */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-theme-green mb-4 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-theme-green" /> Company &amp; Docs
            </h4>
            <ul className="space-y-2.5 text-xs text-theme-secondary">
              <li>
                <Link href="/about" className="hover:text-theme-green transition-colors font-medium">
                  About MEHAR
                </Link>
              </li>
              <li>
                <Link href="/technology" className="hover:text-theme-green transition-colors font-medium">
                  Quality &amp; Standards
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-theme-green transition-colors font-medium flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5 text-theme-green" />
                  Technical Resources
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-theme-muted hover:text-theme-green transition-colors">
                  Commercial Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-theme-muted hover:text-theme-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 6: Contact & Direct Inquiries */}
          <div>
            <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-theme-green mb-4 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-theme-green" /> Direct B2B Contact
            </h4>
            <div className="space-y-3 text-xs text-theme-secondary">
              <div>
                <span className="text-[11px] font-mono text-theme-muted block font-bold">Sales Desk:</span>
                <a
                  href={`mailto:${sales.salesEmail}`}
                  className="text-theme-primary hover:text-theme-green transition-colors font-mono font-semibold break-all"
                >
                  {sales.salesEmail}
                </a>
              </div>

              <div>
                <span className="text-[11px] font-mono text-theme-muted block font-bold">Sales Phone:</span>
                <a
                  href={`tel:${sales.salesPhone}`}
                  className="text-theme-primary hover:text-theme-green transition-colors font-mono font-semibold"
                >
                  {sales.salesPhone}
                </a>
              </div>

              <div>
                <span className="text-[11px] font-mono text-theme-muted block font-bold">Technical Desk:</span>
                <a
                  href={`mailto:${sales.supportEmail}`}
                  className="text-theme-primary hover:text-theme-green transition-colors font-mono font-semibold break-all"
                >
                  {sales.supportEmail}
                </a>
              </div>

              {cleanWhatsapp && (
                <div className="pt-2">
                  <a
                    href={`https://wa.me/${cleanWhatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-theme-green hover:bg-theme-green-hover text-white dark:text-[#0B0F14] font-bold text-xs transition-colors shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    WhatsApp B2B Desk
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-theme-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-theme-muted">
          <div className="text-center md:text-left">
            <p>
              &copy; {new Date().getFullYear()} <strong className="text-theme-primary">{company.brandName}</strong> (A brand of <strong className="text-theme-primary">{company.parentCompanyName}</strong>). All rights reserved.
            </p>
            <p className="text-[11px] text-theme-muted mt-0.5">
              THE NAME YOU TRUST &bull; Industrial battery manufacturing, energy storage integration, and OEM supply.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <Link href="/terms" className="hover:text-theme-green transition-colors">
              Terms &amp; Conditions
            </Link>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-theme-green transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/admin/login" className="text-theme-muted hover:text-theme-green transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
