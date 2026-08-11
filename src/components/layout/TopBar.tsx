import React from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/data/companyInfo';
import { ShieldCheck, Mail, Phone, MessageSquare } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-[#050914] border-b border-[#1E293B]/80 text-[11px] text-[#94A3B8] px-4 sm:px-6 py-2">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Parent Company & Trust Marker */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-medium text-[#CBD5E1]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00F59B]" />
            A Unit of <strong className="text-white font-semibold">{COMPANY_INFO.parentCompanyName}</strong>
          </span>
          <span className="hidden sm:inline-block text-[#334155]">|</span>
          <span className="hidden sm:inline-block text-[#64748B] font-mono">B2B Manufacturing & Supply</span>
        </div>

        {/* Quick B2B Contacts */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-[11px]">
          <a
            href={`mailto:${COMPANY_INFO.salesEmail}`}
            className="flex items-center gap-1.5 hover:text-[#00F59B] transition-colors"
          >
            <Mail className="w-3 h-3 text-[#00D2FF]" />
            <span className="hidden xs:inline">Sales:</span> {COMPANY_INFO.salesEmail}
          </a>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappDesk.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#00F59B] hover:text-[#00D887] transition-colors"
          >
            <MessageSquare className="w-3 h-3" />
            <span>WhatsApp B2B Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
