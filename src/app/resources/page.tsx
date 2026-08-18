import React from 'react';
import { COMPANY_INFO } from '@/data/companyInfo';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  Clock,
  ArrowRight,
  Mail,
} from 'lucide-react';

export const metadata = {
  title: 'Resource & Download Center | MEHAR Technical Documentation',
  description: 'Access product brochures, technical data sheets, safety guidelines, and OEM intake forms for MEHAR batteries.',
};

export default function ResourcesPage() {
  const resources = [
    {
      id: 'res-master-catalog',
      title: 'MEHAR Master Battery Portfolio Brochure',
      category: 'Product Catalogue',
      format: 'PDF',
      description: 'Comprehensive overview of broad battery categories for electric mobility and stationary energy storage.',
      status: 'In Preparation',
      isReady: false,
    },
    {
      id: 'res-oem-questionnaire',
      title: 'OEM Custom Battery Pack Engineering Questionnaire',
      category: 'Engineering Form',
      format: 'PDF / Form',
      description: 'Technical requirement intake sheet for EV OEMs and ESS integrators to specify voltage, capacity, peak C-rates, and dimensions.',
      status: 'Available via Enquiry',
      isReady: true,
      href: '/contact?type=oem',
    },
    {
      id: 'res-safety-guide',
      title: 'Lithium Battery Storage, Handling & Safety Manual',
      category: 'Safety Manual',
      format: 'PDF',
      description: 'Best practices for safe transportation, warehouse storage, ambient temperature maintenance, and initial charging guidelines.',
      status: 'In Preparation',
      isReady: false,
    },
    {
      id: 'res-tds-compendium',
      title: 'Technical Data Sheets (TDS) Compendium',
      category: 'Technical Specs',
      format: 'PDF',
      description: 'Engineering specification tables, dimensional CAD drawings, and pinout telemetry diagrams.',
      status: 'In Preparation',
      isReady: false,
    },
  ];

  return (
    <div className="py-8 sm:py-12 space-y-10 sm:space-y-16 bg-theme-base text-theme-primary transition-colors duration-200">
      {/* Header */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-5 sm:p-8 lg:p-12 rounded-3xl bg-theme-card border border-theme-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-blue/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-3 sm:space-y-4 relative z-10">
            <Badge variant="blue">Documentation &amp; Assets</Badge>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-theme-primary tracking-tight">
              Resource &amp; Download Center
            </h1>
            <p className="text-xs sm:text-base text-theme-secondary leading-relaxed">
              Access technical documentation, engineering intake questionnaires, and safety guidelines for <strong className="text-theme-primary">{COMPANY_INFO.brandName}</strong> battery solutions by <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong>.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-theme-border relative z-10">
            <PlaceholderNotice
              variant="inline"
              message="Final verified master PDF documents will be attached upon client release of the official catalogue."
            />
          </div>
        </div>
      </div>

      {/* Resources List */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
          {resources.map((res) => (
            <div
              key={res.id}
              className="p-8 rounded-2xl bg-theme-card border border-theme-border hover:border-theme-green/40 transition-all flex flex-col justify-between space-y-6 shadow-xl"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-theme-green font-bold uppercase tracking-wider">
                    {res.category}
                  </span>
                  {res.isReady ? (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-theme-green/10 text-theme-green border border-theme-green/30 font-bold">
                      {res.status}
                    </span>
                  ) : (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-500/10 text-amber-600 dark:text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-500" /> {res.status}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-theme-primary">{res.title}</h3>
                <p className="text-xs text-theme-secondary leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 border-t border-theme-border flex items-center justify-between">
                <span className="text-[11px] font-mono text-theme-muted font-semibold">
                  Format: {res.format}
                </span>

                {res.isReady && res.href ? (
                  <Button href={res.href} variant="primary" size="sm">
                    Open Engineering Intake
                  </Button>
                ) : (
                  <Button
                    href="/contact?type=catalogue"
                    variant="ghost"
                    size="sm"
                    icon={<Mail className="w-3 h-3" />}
                  >
                    Request Early Access
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Direct Contact Banner */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 rounded-2xl bg-theme-card border border-theme-border flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left shadow-xl">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-theme-primary">
              Need specific CAD models, dimensional outlines, or pinout schematics?
            </h3>
            <p className="text-xs text-theme-secondary">
              Our engineering team can provide customized dimensional envelopes under mutual NDA.
            </p>
          </div>

          <Button
            href="/contact?type=technical"
            variant="secondary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Contact Engineering Desk
          </Button>
        </div>
      </div>
    </div>
  );
}
