import React from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/data/companyInfo';
import Badge from '@/components/ui/Badge';
import { FileText, AlertTriangle, ShieldCheck, Scale, ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Terms & Conditions | MEHAR B2B Platform',
  description: 'Terms and conditions governing B2B quotations, technical evaluations, and commercial usage of the MEHAR battery platform by Lawad Infrastructure Private Limited.',
};

export default function TermsPage() {
  return (
    <div className="py-12 space-y-12 bg-theme-base text-theme-primary transition-colors duration-200">
      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-theme-secondary mb-6">
          <Link href="/" className="hover:text-theme-green flex items-center gap-1 font-semibold transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-theme-primary font-bold">Terms &amp; Conditions</span>
        </div>

        {/* Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-theme-card border border-theme-border space-y-3 mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-blue/10 rounded-full blur-[120px] pointer-events-none" />
          <Badge variant="blue">Commercial &amp; Technical Governance</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight">
            Terms of Commercial &amp; Engineering Use
          </h1>
          <p className="text-sm text-theme-secondary leading-relaxed">
            Effective Date: {new Date().getFullYear()} • Governs all B2B interactions, technical requirement submissions, RFQ generations, and portal access for <strong className="text-theme-primary">{COMPANY_INFO.brandName}</strong> (a brand of <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong>).
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-xs sm:text-sm text-theme-secondary leading-relaxed">
          <section className="p-6 rounded-2xl bg-theme-card border border-theme-border space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-theme-primary flex items-center gap-2">
              <Scale className="w-4 h-4 text-theme-green" />
              1. Commercial Scope &amp; B2B Engagement
            </h2>
            <p>
              This website is operated by {COMPANY_INFO.parentCompanyName} to provide technical information, requirements scoping tools, and quotation enquiry pathways for commercial battery systems.
            </p>
            <p>
              Submissions through our portal (including RFQs, Battery Finder entries, OEM Configurator forms, and Dealership enquiries) constitute requests for commercial evaluation and do not create binding supply contracts until a formal purchase order, technical specification agreement, and commercial invoice are executed between the parties.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-theme-card border border-theme-border space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-theme-primary flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              2. Engineering Evaluation &amp; Requirements Disclaimer
            </h2>
            <p>
              All technical calculators, battery finding tools, and configuration options available on this website are designed for preliminary scoping and requirements gathering.
            </p>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-800 dark:text-amber-200/90 space-y-1.5 font-medium">
              <p>
                <strong>Engineering Confirmation Required:</strong> Final battery cell chemistry selection, cell sizing, BMS safety thresholds, thermal design, and mechanical CAD dimensions require direct technical validation by Lawad Infrastructure engineers. No definitive product model or warranty commitment is assigned until official engineering confirmation.
              </p>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-theme-card border border-theme-border space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-theme-primary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-theme-green" />
              3. Intellectual Property &amp; Trademark Protection
            </h2>
            <p>
              All trademarks, trade names, logos, brand assets, and service marks displayed on this platform—including <strong className="text-theme-primary">{COMPANY_INFO.brandName}</strong> and associated device marks—are the intellectual property of {COMPANY_INFO.parentCompanyName} and protected under Indian and international intellectual property laws.
            </p>
            <p>
              Unauthorized reproduction, re-branding, reverse engineering, or commercial use of our designs, technical specifications, and visual assets without express written authorization is strictly prohibited.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-theme-card border border-theme-border space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-theme-primary flex items-center gap-2">
              <FileText className="w-4 h-4 text-theme-blue" />
              4. Quotations &amp; Commercial Pricing Policy
            </h2>
            <p>
              Quotations generated through this website, RFQ references, or automated estimates are indicative and subject to raw material indexation (lithium carbonate / LFP precursor spot rates), foreign exchange rates, customized BMS firmware requirements, and minimum order quantity (MOQ) commitments agreed upon in writing.
            </p>
            <p>
              Official proforma invoices and purchase orders will specify formal commercial terms, delivery schedules (Ex-Factory / CIF), and testing protocols.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-theme-card border border-theme-border space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-theme-primary flex items-center gap-2">
              <Scale className="w-4 h-4 text-theme-green" />
              5. Governing Law &amp; Jurisdiction
            </h2>
            <p>
              These terms and conditions and all commercial engagements initiated through this website shall be governed by and construed in accordance with the laws of India. Any disputes arising in connection with these terms shall be subject to the exclusive jurisdiction of the competent courts of Haryana / Delhi NCR.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
