import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { COMPANY_INFO } from '@/data/companyInfo';
import { getWhatsAppUrl, getCleanWhatsAppDigits } from '@/lib/whatsapp';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import ContactFormClient from '@/components/contact/ContactFormClient';
import {
  Building2,
  MapPin,
  MessageSquare,
  FileSpreadsheet,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact B2B Sales & Engineering Desk | MEHAR Batteries',
  description:
    'Contact Lawad Infrastructure Private Limited (Brand MEHAR) for commercial battery procurement, custom OEM packs, wholesale pricing, and technical engineering consultations.',
};

export default function ContactPage() {
  const hasValidWhatsApp = !!getCleanWhatsAppDigits(COMPANY_INFO.whatsappDesk);
  const whatsappUrl = getWhatsAppUrl(
    'Hello, I am contacting MEHAR regarding B2B battery procurement.',
    COMPANY_INFO.whatsappDesk
  );

  return (
    <div className="py-12 space-y-16 bg-theme-base text-theme-primary transition-colors duration-200">
      {/* Header Banner */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-theme-card border border-theme-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-green/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <Badge variant="green">B2B Commercial &amp; OEM Desk</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-theme-primary tracking-tight">
              Contact &amp; Business Enquiry
            </h1>
            <p className="text-sm sm:text-base text-theme-secondary leading-relaxed">
              Connect directly with the commercial and engineering team at <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong> for brand <strong className="text-theme-primary">{COMPANY_INFO.brandName}</strong> battery procurement, custom OEM pack design, or regional distribution partnerships.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Form + Corporate Details */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-theme-card border border-theme-border rounded-3xl p-8 sm:p-10 shadow-xl">
            <div className="mb-8">
              <h2 className="text-xl font-bold text-theme-primary flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-theme-green" />
                B2B Quotation &amp; Enquiry Form
              </h2>
              <p className="text-xs text-theme-secondary mt-1">
                Please complete your company and requirement details. Our commercial sales desk will respond within 24 business hours.
              </p>
            </div>

            <Suspense fallback={<div className="p-8 text-center text-xs text-theme-secondary font-mono animate-pulse">Loading enquiry form...</div>}>
              <ContactFormClient />
            </Suspense>
          </div>

          {/* Right Column: Corporate & Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Sales Card */}
            <div className="p-8 rounded-3xl bg-theme-card border border-theme-border space-y-6 shadow-xl">
              <h3 className="text-base font-bold text-theme-primary flex items-center gap-2">
                <Building2 className="w-5 h-5 text-theme-green" />
                Direct B2B Sales Desk
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-theme-elevated border border-theme-border space-y-1">
                  <span className="text-theme-secondary font-mono text-[10px] uppercase font-bold block">
                    Official Sales Email
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.salesEmail}`}
                    className="text-theme-primary font-mono font-bold hover:text-theme-green transition-colors block"
                  >
                    {COMPANY_INFO.salesEmail}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-theme-elevated border border-theme-border space-y-1">
                  <span className="text-theme-secondary font-mono text-[10px] uppercase font-bold block">
                    General Corporate Email
                  </span>
                  <a
                    href={`mailto:${COMPANY_INFO.supportEmail}`}
                    className="text-theme-primary font-mono font-bold hover:text-theme-green transition-colors block"
                  >
                    {COMPANY_INFO.supportEmail}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-theme-elevated border border-theme-border space-y-2">
                  <span className="text-theme-secondary font-mono text-[10px] uppercase font-bold block">
                    Instant WhatsApp Sales Connect
                  </span>
                  <a
                    href={whatsappUrl}
                    target={hasValidWhatsApp ? '_blank' : undefined}
                    rel={hasValidWhatsApp ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold text-theme-green hover:underline"
                  >
                    <MessageSquare className="w-4 h-4" /> Connect with Sales Desk
                  </a>
                </div>
              </div>
            </div>

            {/* Corporate Location Details */}
            <div className="p-8 rounded-3xl bg-theme-card border border-theme-border space-y-5 shadow-xl">
              <h3 className="text-base font-bold text-theme-primary flex items-center gap-2">
                <MapPin className="w-5 h-5 text-theme-green" />
                Corporate &amp; Facility Locations
              </h3>

              <div className="space-y-4 text-xs font-mono text-theme-primary">
                <div className="space-y-1">
                  <span className="text-theme-primary font-bold block">Registered Corporate Office:</span>
                  <p className="text-theme-secondary">{COMPANY_INFO.registeredOffice}</p>
                </div>

                <div className="space-y-1">
                  <span className="text-theme-primary font-bold block">Manufacturing &amp; Assembly Unit:</span>
                  <p className="text-theme-secondary">{COMPANY_INFO.plantLocation}</p>
                </div>
              </div>

              <PlaceholderNotice message="Exact facility addresses and location map will be embedded upon receipt of verified client corporate records." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
