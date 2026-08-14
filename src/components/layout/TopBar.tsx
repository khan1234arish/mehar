import React from 'react';
import { getCompanySettings, getSalesSettings, getContentSettings } from '@/lib/settings';
import { ShieldCheck, Mail, MessageSquare } from 'lucide-react';

export default async function TopBar() {
  const [company, sales, content] = await Promise.all([
    getCompanySettings(),
    getSalesSettings(),
    getContentSettings(),
  ]);

  const cleanWhatsapp = sales.whatsappDesk.replace(/[^0-9]/g, '');

  return (
    <div className="topbar-wrapper bg-[#070A0E] border-b border-[#1E2633] text-[11px] text-[#A3AAB5] py-2 font-medium">
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Parent Company & Trust Marker */}
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 text-[#E6EAF0]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#39D353]" />
            <span>A Unit of <strong className="font-semibold text-white">{company.parentCompanyName}</strong></span>
          </span>
          <span className="hidden sm:inline-block text-[#2A3649]">|</span>
          <span className="hidden sm:inline-block text-[#64748B] font-mono">
            {content.topBarText || 'B2B Manufacturing & Supply'}
          </span>
        </div>

        {/* Quick B2B Contacts */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-[11px]">
          <a
            href={`mailto:${sales.salesEmail}`}
            className="flex items-center gap-1.5 text-[#A3AAB5] hover:text-[#39D353] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#39D353]" />
            <span className="hidden xs:inline text-[#64748B]">Sales:</span> {sales.salesEmail}
          </a>

          <a
            href={`https://wa.me/${cleanWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#39D353] hover:text-[#2ec547] transition-colors font-semibold"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp B2B Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
