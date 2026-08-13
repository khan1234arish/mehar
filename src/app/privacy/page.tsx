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
    <div className="py-12 space-y-12 bg-[#0B0F14] text-[#E6EAF0]">
      <div className="max-w-5xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#A3AAB5] mb-6">
          <Link href="/" className="hover:text-[#39D353] flex items-center gap-1 font-semibold transition-colors">
            <ArrowLeft className="w-3 h-3" /> Back to Home
          </Link>
          <span>/</span>
          <span className="text-[#E6EAF0] font-bold">Privacy Policy</span>
        </div>

        {/* Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#11161D] border border-[#1E2633] space-y-3 mb-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#39D353]/10 rounded-full blur-[120px] pointer-events-none" />
          <Badge variant="green">Corporate Data Governance</Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#E6EAF0] tracking-tight">
            Privacy Policy &amp; Commercial Data Governance
          </h1>
          <p className="text-sm text-[#A3AAB5] leading-relaxed">
            Effective Date: {new Date().getFullYear()} • Applicable to all commercial enquiries, RFQs, OEM technical intakes, and dealer applications submitted to <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong> for brand <strong className="text-[#E6EAF0]">{COMPANY_INFO.brandName}</strong>.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-xs sm:text-sm text-[#A3AAB5] leading-relaxed">
          <section className="p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#39D353]" />
              1. B2B Commercial Scope &amp; Purpose
            </h2>
            <p>
              MEHAR is strictly a business-to-business (B2B) battery manufacturing and engineering platform operated by {COMPANY_INFO.parentCompanyName}. We do not operate consumer retail e-commerce or process consumer credit card transactions.
            </p>
            <p>
              Information collected through our official portal—including Requests for Quotation (RFQ), Battery Requirements Finder, OEM Engineering Configurator, Dealer Inquiries, and Contact Forms—is used exclusively for evaluating technical feasibility, preparing commercial quotations, and facilitating corporate sales communications.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#39D353]" />
              2. Information We Collect
            </h2>
            <p>When you interact with our B2B tools or submit commercial enquiries, we collect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#A3AAB5]">
              <li><strong className="text-[#E6EAF0]">Business Identification:</strong> Company name, registered business address, city, state, country, GSTIN (optional), and corporate website.</li>
              <li><strong className="text-[#E6EAF0]">Contact Information:</strong> Full name, official business email, and phone/mobile number.</li>
              <li><strong className="text-[#E6EAF0]">Technical Requirements:</strong> Target voltage, capacity, continuous/peak current, dimensional envelope, BMS telemetry preferences, chemistry preferences, and operating environment constraints.</li>
              <li><strong className="text-[#E6EAF0]">Commercial Scope:</strong> Estimated batch size, prototype requirements, annual production volumes, and delivery timelines.</li>
              <li><strong className="text-[#E6EAF0]">Engineering Document Metadata:</strong> File name, file type, and file size for CAD drawings, datasheets, or technical specification attachments.</li>
            </ul>
          </section>

          <section className="p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#39D353]" />
              3. Protection of Technical &amp; Engineering Documents
            </h2>
            <p>
              Engineering files (such as CAD drawings, schematics, and mechanical specifications) shared via the OEM Configurator or RFQ builder are treated as confidential technical submissions. They are accessible only by authorized engineering and commercial personnel for quotation and feasibility evaluation.
            </p>
            <p>
              Uploaded technical documents are never indexed publicly or made available for public download. For projects requiring formal non-disclosure agreements (NDAs), our engineering team executes mutual NDAs prior to detailed design discussions.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#39D353]" />
              4. Data Retention &amp; Third-Party Disclosure
            </h2>
            <p>
              We do not sell, rent, or lease commercial contact lists or technical project records to third-party marketing companies. Project requirements are retained solely for maintaining quotation history, warranty tracking upon production, and continuing customer engineering support.
            </p>
          </section>

          <section className="p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-3 shadow-lg">
            <h2 className="text-base font-bold text-[#E6EAF0]">5. Contact for Privacy Enquiries</h2>
            <p>
              If you have any questions regarding our commercial data handling practices or wish to update your corporate contact records, please contact our compliance desk:
            </p>
            <div className="pt-2 font-mono text-xs text-[#E6EAF0] space-y-1">
              <p><strong>{COMPANY_INFO.parentCompanyName}</strong></p>
              <p>Email: <a href={`mailto:${COMPANY_INFO.supportEmail}`} className="text-[#39D353] hover:underline">{COMPANY_INFO.supportEmail}</a></p>
              <p>Corporate Desk: <a href={`mailto:${COMPANY_INFO.salesEmail}`} className="text-[#39D353] hover:underline">{COMPANY_INFO.salesEmail}</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
