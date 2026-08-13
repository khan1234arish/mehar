import React from 'react';
import { COMPANY_INFO } from '@/data/companyInfo';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  Building2,
  Factory,
  Recycle,
  Layers,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'About Us & Infrastructure | MEHAR (Lawad Infrastructure)',
  description: 'Learn about MEHAR and Lawad Infrastructure Private Limited - our battery manufacturing capabilities, quality assurance, and mission.',
};

export default function AboutPage() {
  return (
    <div className="py-12 space-y-20 bg-[#0B0F14] text-[#E6EAF0]">
      {/* Header Banner */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11161D] border border-[#1E2633] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#39D353]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <Badge variant="blue">Corporate Profile</Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#E6EAF0] tracking-tight">
              About MEHAR &amp; Lawad Infrastructure
            </h1>

            <p className="text-sm sm:text-base text-[#A3AAB5] leading-relaxed">
              <strong className="text-[#E6EAF0]">{COMPANY_INFO.brandName}</strong> is the specialized industrial battery brand of <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong>. We are committed to engineering clean, reliable, and high-performance energy storage and traction battery systems for India’s evolving electric mobility and energy landscape.
            </p>
          </div>
        </div>
      </div>

      {/* Brand & Corporate Story */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              badge="Vision & Commitment"
              badgeVariant="green"
              title="Powering Next-Gen Industrial Storage & Clean Mobility"
              align="left"
            />

            <p className="text-xs sm:text-sm text-[#A3AAB5] leading-relaxed">
              As commercial transport and distributed solar infrastructure accelerate, the demand for high-reliability, thermally stable battery systems has never been more critical. Under brand MEHAR, <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong> focuses on providing robust, B2B-engineered energy solutions tailored specifically for the rigorous operating conditions of commercial fleets and grid-tied systems.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Strict B2B focus: Serving EV OEMs, fleet aggregators, and system integrators',
                'Comprehensive category coverage across 2-Wheelers, 3-Wheelers, Solar & Inverter ESS',
                'In-house engineering for custom battery pack form factors and Smart BMS communication',
                'Adherence to rigorous thermal and mechanical safety validation standards',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#E6EAF0]">
                  <CheckCircle2 className="w-4 h-4 text-[#39D353] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-[#E6EAF0] flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#39D353]" />
              Corporate Information Overview
            </h3>

            <div className="space-y-4 font-mono text-xs text-[#E6EAF0]">
              <div className="p-3.5 rounded-xl bg-[#161C24] border border-[#1E2633]">
                <span className="text-[#A3AAB5] block text-[10px] uppercase font-bold">Parent Legal Entity</span>
                <span className="text-[#E6EAF0] font-bold text-sm">{COMPANY_INFO.parentCompanyName}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161C24] border border-[#1E2633]">
                <span className="text-[#A3AAB5] block text-[10px] uppercase font-bold">Brand Identification</span>
                <span className="text-[#39D353] font-bold text-sm">{COMPANY_INFO.brandName}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161C24] border border-[#1E2633]">
                <span className="text-[#A3AAB5] block text-[10px] uppercase font-bold">Industry Domain</span>
                <span className="text-[#E6EAF0] font-medium">{COMPANY_INFO.industry}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161C24] border border-[#1E2633]">
                <span className="text-[#A3AAB5] block text-[10px] uppercase font-bold">Operational Model</span>
                <span className="text-[#E6EAF0] font-medium">B2B Manufacturing, OEM Supply &amp; Distribution</span>
              </div>
            </div>

            <PlaceholderNotice message="Verified plant addresses, production figures, and regulatory filings will be updated in accordance with verified client documentation." />
          </div>
        </div>
      </div>

      {/* Manufacturing & Engineering Workflow */}
      <div className="bg-[#0D1117] border-y border-[#1E2633] py-16">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeading
            badge="Quality Assurance"
            badgeVariant="blue"
            title="Manufacturing & Quality Philosophy"
            subtitle="Our assembly approach prioritizes cell grading consistency, robust structural enclosures, and active thermal protection."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-4 shadow-sm hover:border-[#39D353]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#39D353]/10 border border-[#39D353]/25 flex items-center justify-center text-[#39D353]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#E6EAF0]">Automated Cell Sorting</h3>
              <p className="text-xs text-[#A3AAB5] leading-relaxed">
                Every incoming cell is matched for internal resistance, voltage uniformity, and capacity rating to prevent cell-level imbalance and maximize battery cycle life.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-4 shadow-sm hover:border-[#00A3FF]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/25 flex items-center justify-center text-[#00A3FF]">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#E6EAF0]">Precision Assembly &amp; Welding</h3>
              <p className="text-xs text-[#A3AAB5] leading-relaxed">
                Utilizing low-heat automated precision welding to maintain low connection resistance and secure inter-cell busbars against road vibration.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#11161D] border border-[#1E2633] space-y-4 shadow-sm hover:border-[#39D353]/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#39D353]/10 border border-[#39D353]/25 flex items-center justify-center text-[#39D353]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#E6EAF0]">End-of-Line Verification</h3>
              <p className="text-xs text-[#A3AAB5] leading-relaxed">
                100% of manufactured packs undergo full computer-controlled charge and discharge cycle verification to validate BMS cutoff thresholds and communication integrity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Stewardship */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11161D] border border-[#1E2633] flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <div className="w-10 h-10 rounded-lg bg-[#39D353]/10 flex items-center justify-center text-[#39D353]">
              <Recycle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-[#E6EAF0]">
              Environmental Responsibility &amp; Circular Economy
            </h3>
            <p className="text-xs sm:text-sm text-[#A3AAB5] leading-relaxed">
              <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong> advocates for sustainable battery lifecycle management. We support responsible material recycling partnerships, extended producer responsibility (EPR) compliance, and efficient thermal designs that extend overall operational lifespan.
            </p>
          </div>

          <Button
            href="/contact"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Connect With Our Team
          </Button>
        </div>
      </div>
    </div>
  );
}
