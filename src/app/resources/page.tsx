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
    <div className="py-12 space-y-16 bg-white text-[#0F172A]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="max-w-3xl space-y-4">
            <Badge variant="blue">Documentation & Assets</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Resource & Download Center
            </h1>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Access technical documentation, engineering intake questionnaires, and safety guidelines for <strong className="text-[#0F172A]">{COMPANY_INFO.brandName}</strong> battery solutions by <strong className="text-[#0F172A]">{COMPANY_INFO.parentCompanyName}</strong>.
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#E2E8F0]">
            <PlaceholderNotice
              variant="inline"
              message="Final verified master PDF documents will be attached upon client release of the official catalogue."
            />
          </div>
        </div>
      </div>

      {/* Resource Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((res) => (
            <div
              key={res.id}
              className="p-8 rounded-2xl bg-white border border-[#E2E8F0] hover:shadow-md transition-shadow flex flex-col justify-between space-y-6"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#059669] font-bold uppercase">
                    {res.category}
                  </span>
                  {res.isReady ? (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] font-bold">
                      {res.status}
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#FEFCE8] text-[#854D0E] border border-[#FEF08A] font-bold flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#CA8A04]" /> {res.status}
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#0F172A]">{res.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {res.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#64748B] font-semibold">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-[#0F172A]">
              Need specific CAD models, dimensional outlines, or pinout schematics?
            </h3>
            <p className="text-xs text-[#64748B]">
              Our engineering team can provide customized dimensional envelopes under mutual NDA.
            </p>
          </div>

          <Button
            href="/contact?type=technical"
            variant="outline"
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
