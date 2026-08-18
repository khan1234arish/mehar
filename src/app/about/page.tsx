import React from 'react';
import { COMPANY_INFO } from '@/data/companyInfo';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Building2,
  Factory,
  Recycle,
  Layers,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Thermometer,
  Award,
} from 'lucide-react';

export const metadata = {
  title: 'About Lawad Infrastructure & MEHAR Battery Systems',
  description: 'Learn about Lawad Infrastructure Private Limited and brand MEHAR - our B2B manufacturing capabilities, AIS-156 Phase 2 compliance, and clean mobility mission.',
};

export default function AboutPage() {
  return (
    <div className="py-8 sm:py-12 space-y-10 sm:space-y-16 bg-theme-base text-theme-primary transition-colors duration-200">
      
      {/* ── 1. HERO BANNER ─────────────────────────────────────────────────── */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-5 sm:p-8 lg:p-12 rounded-3xl bg-theme-card border border-theme-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-green/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-3 sm:space-y-4 relative z-10">
            <Badge variant="blue">Corporate Profile</Badge>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-theme-primary tracking-tight">
              About MEHAR &amp; Lawad Infrastructure
            </h1>

            <p className="text-xs sm:text-base text-theme-secondary leading-relaxed">
              <strong className="text-theme-primary">{COMPANY_INFO.brandName}</strong> is the specialized industrial battery and clean energy storage brand of <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong>. We engineer high-durability Prismatic LiFePO4 and advanced lithium power systems built to withstand the demands of commercial electric mobility, solar microgrids, and industrial material handling across India.
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. VISION & CORPORATE IDENTITY ─────────────────────────────────── */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <SectionHeading
              badge="Vision & Mission"
              badgeVariant="green"
              title="Powering Indian Commercial Mobility & Distributed Clean Storage"
              align="left"
            />

            <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
              India’s transition to commercial electric mobility and decentralized solar storage demands robust battery technology that performs under high ambient heat, frequent rapid charging, and rough road vibrations. Under brand MEHAR, <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong> focuses strictly on B2B engineering — providing electric vehicle OEMs, commercial fleet operators, and solar system integrators with certified, thermally resilient battery solutions.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Strict B2B Manufacturing Focus: Serving EV OEMs, commercial fleet aggregators, and solar distributors',
                'Comprehensive Product Architecture: Electric 2W, 3W / E-Rickshaws, Solar ESS, Forklifts, and Fast DC Chargers',
                'Full AIS-156 Amendment III Phase 2 & BIS IS 16046 Compliance Engineering',
                'End-to-End In-House Custom OEM Prototyping, 3D CAD Packaging & Thermal Simulation',
                'Direct Factory Batch Supply with Standardized Commercial SLAs and Fleet Warranties',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-theme-primary">
                  <CheckCircle2 className="w-4 h-4 text-theme-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-5 sm:p-8 rounded-3xl bg-theme-card border border-theme-border space-y-5 sm:space-y-6 shadow-xl">
            <h3 className="text-base font-bold text-theme-primary flex items-center gap-2">
              <Building2 className="w-5 h-5 text-theme-green" />
              Corporate Information Overview
            </h3>

            <div className="space-y-3 font-mono text-xs text-theme-primary">
              <div className="p-3 sm:p-3.5 rounded-xl bg-theme-elevated border border-theme-border">
                <span className="text-theme-secondary block text-[10px] uppercase font-bold">Parent Legal Entity</span>
                <span className="text-theme-primary font-bold text-sm">{COMPANY_INFO.parentCompanyName}</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-theme-elevated border border-theme-border">
                <span className="text-theme-secondary block text-[10px] uppercase font-bold">Brand Identification</span>
                <span className="text-theme-green font-bold text-sm">{COMPANY_INFO.brandName} (The Name You Trust)</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-theme-elevated border border-theme-border">
                <span className="text-theme-secondary block text-[10px] uppercase font-bold">Industry Domain</span>
                <span className="text-theme-primary font-medium">{COMPANY_INFO.industry}</span>
              </div>

              <div className="p-3 sm:p-3.5 rounded-xl bg-theme-elevated border border-theme-border">
                <span className="text-theme-secondary block text-[10px] uppercase font-bold">Core Capabilities</span>
                <span className="text-theme-primary font-medium">B2B Lithium Battery Pack Assembly, Laser Welding, Smart BMS Integration &amp; OEM Supply</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ── 3. MANUFACTURING RIGOR & QUALITY PHILOSOPHY ──────────────────────── */}
      <div className="bg-theme-section border-y border-theme-border py-12 sm:py-16">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <SectionHeading
            badge="Quality Assurance"
            badgeVariant="blue"
            title="Manufacturing &amp; Testing Rigor"
            subtitle="Our manufacturing pipeline prioritizes cell grading consistency, fiber laser welding, and active multi-point thermal protection."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-7 rounded-3xl bg-theme-card border border-theme-border space-y-4 shadow-sm hover:border-theme-green/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-theme-green/10 border border-theme-green/25 flex items-center justify-center text-theme-green">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-theme-primary">Automated Cell Sorting &amp; IR Matching</h3>
              <p className="text-xs text-theme-secondary leading-relaxed">
                Every incoming Grade-A prismatic and cylindrical cell is sorted for capacity, open-circuit voltage (OCV), and internal resistance (AC/DC IR within ±1.5%) to eliminate cell-level drift and maximize pack lifespan.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-theme-card border border-theme-border space-y-4 shadow-sm hover:border-theme-blue/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-theme-blue/10 border border-theme-blue/25 flex items-center justify-center text-theme-blue">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-theme-primary">Fiber Laser Welding &amp; Structural Enclosures</h3>
              <p className="text-xs text-theme-secondary leading-relaxed">
                Automated high-speed fiber laser welding bonds heavy copper and aluminum busbars directly to terminal studs, delivering vibration-proof, low-resistance electrical connections for rough Indian roads.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-theme-card border border-theme-border space-y-4 shadow-sm hover:border-theme-green/40 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-theme-green/10 border border-theme-green/25 flex items-center justify-center text-theme-green">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-theme-primary">100% Computerized EOL Verification</h3>
              <p className="text-xs text-theme-secondary leading-relaxed">
                100% of manufactured battery packs undergo automated End-of-Line (EOL) full-cycle charge/discharge testing, Hi-Pot insulation validation, and BMS telemetry sensor calibration before factory dispatch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. ENVIRONMENTAL STEWARDSHIP & CIRCULAR LIFECYCLE ───────────────── */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-theme-card border border-theme-border flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <div className="w-10 h-10 rounded-lg bg-theme-green/10 flex items-center justify-center text-theme-green">
              <Recycle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-theme-primary">
              Environmental Responsibility &amp; EPR Compliance
            </h3>
            <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
              <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong> is committed to sustainable battery lifecycle management, Extended Producer Responsibility (EPR) compliance, and authorized secondary-life repurposing and recycling partnerships to ensure zero environmental contamination.
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
