import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { COMPANY_INFO } from '@/data/companyInfo';
import Badge from '@/components/ui/Badge';
import RfqBuilderClient from '@/components/rfq/RfqBuilderClient';

export const metadata: Metadata = {
  title: 'Request for Quotation (RFQ) & Batch Pricing | MEHAR Batteries',
  description:
    'Configure multi-parameter batch quotations for lithium battery packs, custom OEM enclosures, and energy storage systems by Lawad Infrastructure Private Limited (Brand MEHAR).',
};

export default function RfqPage() {
  return (
    <div className="py-12 space-y-12 bg-theme-base text-theme-primary transition-colors duration-200">
      {/* Header */}
      <div className="max-w-6xl xl:max-w-[1360px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-10 rounded-3xl bg-theme-card border border-theme-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-green/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <Badge variant="green">Official B2B Procurement</Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-theme-primary tracking-tight">
              Request for Quotation (RFQ) Builder
            </h1>
            <p className="text-sm text-theme-secondary leading-relaxed">
              Configure multi-parameter batch quotations for battery packs, custom OEM enclosures, and energy storage systems by <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong> under brand <strong className="text-theme-primary">{COMPANY_INFO.brandName}</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Box */}
      <div className="max-w-6xl xl:max-w-[1360px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="bg-theme-card border border-theme-border rounded-3xl p-8 sm:p-10 shadow-xl">
          <Suspense fallback={<div className="p-12 text-center text-xs text-theme-secondary font-mono animate-pulse">Loading RFQ builder...</div>}>
            <RfqBuilderClient />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
