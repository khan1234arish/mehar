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
    <div className="py-12 space-y-12 bg-[#0B0F14] text-[#E6EAF0]">
      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#A3AAB5] mb-6">
          <Link href="/" className="hover:text-[#39D353] flex items-center gap-1 font-semibold transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-[#E6EAF0] font-bold">Terms &amp; Conditions</span>
        </div>

        {/* Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#11161D] border border-[#1E2633] space-y-3 mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A3FF]/10 rounded-full blur-[120px] pointer-events-none" />
          <Badge variant="blue">Commercial &amp; Technical Governance</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E6EAF0] tracking-tight">
            Terms of Commercial &amp; Engineering Use
          </h1>
          <p className="text-sm text-[#A3AAB5] leading-relaxed">
            Effective Date: {new Date().getFullYear()} • Governs all B2B interactions, technical requirement submissions, RFQ generations, and portal access for <strong className="text-[#E6EAF0]">{COMPANY_INFO.brandName}</strong> (a brand of <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong>).
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-xs sm:text-sm text-[#A3AAB5] leading-relaxed">
          <section className="p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
              <Scale className="w-4 h-4 text-[#39D353]" />
              1. Commercial Scope &amp; B2B Engagement
            </h2>
            <p>
              This website is operated by {COMPANY_INFO.parentCompanyName} to provide technical information, requirements scoping tools, and quotation enquiry pathways for commercial battery systems.
            </p>
            <p>
              Submissions through our portal (including RFQs, Battery Finder entries, OEM Configurator forms, and Dealership enquiries) constitute requests for commercial evaluation and do not create binding supply contracts until a formal purchase order, technical specification agreement, and commercial invoice are executed between the parties.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              2. Engineering Evaluation &amp; Requirements Disclaimer
            </h2>
            <p>
              All technical calculators, battery finding tools, and configuration options available on this website are designed for preliminary scoping and requirements gathering.
            </p>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200/90 space-y-1.5 font-medium">
              <p className="text-amber-300 font-bold">Engineering Validation Required:</p>
              <p>
                Customer-entered values represent stated operational requirements. Final battery configuration, cell chemistry selection, BMS telemetry parameters, thermal management, enclosure dimensions, and mechanical safety integration require formal engineering validation and sign-off by Lawad Infrastructure technical engineers.
              </p>
            </div>
          </section>

          <section className="p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#39D353]" />
              3. Intellectual Property &amp; Brand Rights
            </h2>
            <p>
              The brand name <strong className="text-[#E6EAF0]">MEHAR</strong>, associated logos, technical documentation layouts, product architecture frameworks, and proprietary calculation engines are the intellectual property of {COMPANY_INFO.parentCompanyName}.
            </p>
            <p>
              Unauthorized copying, reproduction, decompilation, or commercial redistribution of website content, design systems, or technical tools without prior written consent is strictly prohibited.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#39D353]" />
              4. Catalogue Status &amp; Specifications
            </h2>
            <p>
              Product specifications and verified datasheets are published progressively in accordance with official manufacturing release schedules. Where numerical specifications are pending verification, placeholder notices (&ldquo;Specifications coming soon&rdquo; or &ldquo;Not yet verified&rdquo;) are displayed to ensure strict technical accuracy.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-[#E6EAF0]">5. Governing Law &amp; Commercial Jurisdiction</h2>
            <p>
              These terms and all commercial enquiries originating through this platform shall be governed by and construed in accordance with the laws of India. Any disputes arising out of commercial transactions shall be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
