import React from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/data/companyInfo';
import Badge from '@/components/ui/Badge';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy | MEHAR B2B Battery Platform',
  description: 'Privacy policy and commercial data handling practices for MEHAR (Lawad Infrastructure Private Limited) B2B battery platform.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 space-y-12 bg-theme-base text-theme-primary transition-colors duration-200">
      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-theme-secondary mb-6">
          <Link href="/" className="hover:text-theme-green flex items-center gap-1 font-semibold transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-theme-primary font-bold">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-theme-card border border-theme-border space-y-3 mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-green/10 rounded-full blur-[120px] pointer-events-none" />
          <Badge variant="green">Corporate Data Governance</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight">
            Privacy Policy &amp; Commercial Data Governance
          </h1>
          <p className="text-sm text-theme-secondary leading-relaxed">
            Effective Date: {new Date().getFullYear()} • Applicable to all commercial enquiries, RFQs, OEM technical intakes, and dealer applications submitted to <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong> for brand <strong className="text-theme-primary">{COMPANY_INFO.brandName}</strong>.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-xs sm:text-sm text-theme-secondary leading-relaxed">
          <section className="p-6 rounded-2xl bg-theme-card border border-theme-border space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-theme-primary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-theme-green" />
              1. B2B Commercial Scope &amp; Purpose
            </h2>
            <p>
              MEHAR is strictly a business-to-business (B2B) battery manufacturing and engineering platform operated by {COMPANY_INFO.parentCompanyName}. We do not operate consumer retail e-commerce or process consumer credit card transactions.
            </p>
            <p>
              Information collected through our official portal—including Requests for Quotation (RFQ), Battery Requirements Finder, OEM Engineering Configurator, Dealer Inquiries, and Contact Forms—is used exclusively for evaluating technical feasibility, preparing commercial quotations, and facilitating corporate sales communications.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-theme-card border border-theme-border space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-theme-primary flex items-center gap-2">
              <Eye className="w-4 h-4 text-theme-green" />
              2. Information We Collect
            </h2>
            <p>When you interact with our B2B tools or submit commercial enquiries, we collect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-theme-secondary">
              <li><strong className="text-theme-primary">Business Identification:</strong> Company name, registered business address, city, state, country, GSTIN (optional), and corporate website.</li>
              <li><strong className="text-theme-primary">Contact Information:</strong> Full name, official business email, and phone/mobile number.</li>
              <li><strong className="text-theme-primary">Engineering Requirements:</strong> Operating voltages, target Ah/kWh capacity, dimensional constraints, peak/continuous discharge currents, cell chemistry preferences, and custom casing specifications.</li>
              <li><strong className="text-theme-primary">Commercial Scope:</strong> Expected batch volume tier, target delivery timeline, and application sector.</li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-theme-card border border-theme-border space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-theme-primary flex items-center gap-2">
              <Lock className="w-4 h-4 text-theme-green" />
              3. Protection of Technical &amp; Proprietary Information
            </h2>
            <p>
              We treat all customer equipment specifications, mechanical drawings, CAD outlines, and custom battery requirements submitted via our platform as proprietary and strictly confidential.
            </p>
            <p>
              {COMPANY_INFO.parentCompanyName} routinely enters into bilateral Non-Disclosure Agreements (NDAs) with commercial vehicle OEMs, robotics manufacturers, and ESS integrators prior to final engineering drawing exchange.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-theme-card border border-theme-border space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-theme-primary flex items-center gap-2">
              <FileText className="w-4 h-4 text-theme-green" />
              4. Data Retention &amp; Third-Party Non-Disclosure
            </h2>
            <p>
              We do not sell, rent, or trade your corporate information or RFQ specifications to third-party advertisers. Information is retained solely in our secure administrative database for quotation tracking, warranty service records, and commercial relationship management.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-theme-card border border-theme-border space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-theme-primary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-theme-green" />
              5. Contact Regarding Data Privacy
            </h2>
            <p>
              For questions regarding our commercial data handling practices or to update your company contact information, please reach out to our corporate desk:
            </p>
            <div className="p-4 rounded-xl bg-theme-elevated border border-theme-border font-mono text-xs space-y-1">
              <p><strong className="text-theme-primary">Corporate Desk:</strong> {COMPANY_INFO.supportEmail}</p>
              <p><strong className="text-theme-primary">Sales Email:</strong> {COMPANY_INFO.salesEmail}</p>
              <p><strong className="text-theme-primary">Parent Entity:</strong> {COMPANY_INFO.parentCompanyName}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
