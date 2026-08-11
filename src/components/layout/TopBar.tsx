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
    <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[11px] text-[#475569] px-4 sm:px-6 py-2 font-medium">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
        {/* Parent Company & Trust Marker */}
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 text-[#334155]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
            A Unit of <strong className="text-[#0F172A] font-semibold">{company.parentCompanyName}</strong>
          </span>
          <span className="hidden sm:inline-block text-[#CBD5E1]">|</span>
          <span className="hidden sm:inline-block text-[#64748B] font-mono">
            {content.topBarText || 'B2B Manufacturing & Supply'}
          </span>
        </div>

        {/* Quick B2B Contacts */}
        <div className="flex items-center gap-4 sm:gap-6 font-mono text-[11px]">
          <a
            href={`mailto:${sales.salesEmail}`}
            className="flex items-center gap-1.5 text-[#334155] hover:text-[#059669] transition-colors"
          >
            <Mail className="w-3.5 h-3.5 text-[#059669]" />
            <span className="hidden xs:inline">Sales:</span> {sales.salesEmail}
          </a>

          <a
            href={`https://wa.me/${cleanWhatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[#059669] hover:text-[#047857] transition-colors font-semibold"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp B2B Desk</span>
          </a>
        </div>
      </div>
    </div>
  );
}
