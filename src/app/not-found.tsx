import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Home,
  Search,
  FileSpreadsheet,
  Factory,
  ArrowRight,
  HelpCircle,
} from 'lucide-react';

export const metadata = {
  title: 'Page Not Found (404) | MEHAR B2B Platform',
  description: 'The requested page could not be found on the official MEHAR B2B battery platform.',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 bg-white text-[#0F172A]">
      <div className="max-w-xl w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#059669] mx-auto shadow-sm">
            <HelpCircle className="w-8 h-8" />
          </div>

          <div className="inline-flex items-center gap-2">
            <Badge variant="green">HTTP 404</Badge>
            <span className="text-xs font-mono text-[#64748B] font-semibold">Resource Not Located</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Page Not Found
          </h1>

          <p className="text-xs sm:text-sm text-[#475569] leading-relaxed max-w-md mx-auto">
            The link you followed may be outdated or the requested technical page has moved. You can navigate directly to our primary B2B portals below.
          </p>
        </div>

        {/* Quick Recovery Pathways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <Link
            href="/products"
            className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#059669] hover:bg-[#F0FDF4] transition-all group"
          >
            <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#059669] block">
              Battery Portfolio →
            </span>
            <span className="text-[11px] text-[#64748B] block mt-0.5">
              Browse broad battery categories
            </span>
          </Link>

          <Link
            href="/finder"
            className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#059669] hover:bg-[#F0FDF4] transition-all group"
          >
            <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#059669] block">
              Battery Finder Wizard →
            </span>
            <span className="text-[11px] text-[#64748B] block mt-0.5">
              Scope your application requirements
            </span>
          </Link>

          <Link
            href="/oem-custom-solutions"
            className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#059669] hover:bg-[#F0FDF4] transition-all group"
          >
            <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#059669] block">
              OEM Configurator →
            </span>
            <span className="text-[11px] text-[#64748B] block mt-0.5">
              Submit custom battery pack specs
            </span>
          </Link>

          <Link
            href="/rfq"
            className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#059669] hover:bg-[#F0FDF4] transition-all group"
          >
            <span className="text-xs font-bold text-[#0F172A] group-hover:text-[#059669] block">
              B2B RFQ Builder →
            </span>
            <span className="text-[11px] text-[#64748B] block mt-0.5">
              Request formal commercial quotation
            </span>
          </Link>
        </div>

        <div className="pt-2 flex justify-center">
          <Button
            href="/"
            variant="primary"
            size="md"
            icon={<Home className="w-4 h-4" />}
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
