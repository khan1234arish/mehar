import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { COMPANY_INFO } from '@/data/companyInfo';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  ShieldCheck,
  Building2,
  Factory,
  Cpu,
  Recycle,
  Layers,
  Award,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';

export const metadata = {
  title: 'About Us & Infrastructure | MEHAR (Lawad Infrastructure)',
  description: 'Learn about MEHAR and Lawad Infrastructure Private Limited - our battery manufacturing capabilities, quality assurance, and mission.',
};

export default function AboutPage() {
  return (
    <div className="py-12 space-y-20">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] border border-[#1E293B] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <Badge variant="blue">Corporate Profile</Badge>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              About MEHAR & Lawad Infrastructure
            </h1>

            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              <strong className="text-white">{COMPANY_INFO.brandName}</strong> is the specialized industrial battery brand of <strong className="text-white">{COMPANY_INFO.parentCompanyName}</strong>. We are committed to engineering clean, reliable, and high-performance energy storage and traction battery systems for India’s evolving electric mobility and energy landscape.
            </p>
          </div>
        </div>
      </div>

      {/* Brand & Corporate Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <SectionHeading
              badge="Vision & Commitment"
              badgeVariant="green"
              title="Powering Next-Gen Industrial Storage & Clean Mobility"
              align="left"
            />

            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              As commercial transport and distributed solar infrastructure accelerate, the demand for high-reliability, thermally stable battery systems has never been more critical. Under brand MEHAR, <strong className="text-white">{COMPANY_INFO.parentCompanyName}</strong> focuses on providing robust, B2B-engineered energy solutions tailored specifically for the rigorous operating conditions of commercial fleets and grid-tied systems.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Strict B2B focus: Serving EV OEMs, fleet aggregators, and system integrators',
                'Comprehensive category coverage across 2-Wheelers, 3-Wheelers, Solar & Inverter ESS',
                'In-house engineering for custom battery pack form factors and Smart BMS communication',
                'Adherence to rigorous thermal and mechanical safety validation standards',
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#00D2FF]" />
              Corporate Information Overview
            </h3>

            <div className="space-y-4 font-mono text-xs text-[#94A3B8]">
              <div className="p-3.5 rounded-lg bg-[#131F37] border border-[#1E293B]">
                <span className="text-[#64748B] block text-[10px] uppercase">Parent Legal Entity</span>
                <span className="text-white font-bold text-sm">{COMPANY_INFO.parentCompanyName}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#131F37] border border-[#1E293B]">
                <span className="text-[#64748B] block text-[10px] uppercase">Brand Identification</span>
                <span className="text-[#00F59B] font-bold text-sm">{COMPANY_INFO.brandName}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#131F37] border border-[#1E293B]">
                <span className="text-[#64748B] block text-[10px] uppercase">Industry Domain</span>
                <span className="text-white font-medium">{COMPANY_INFO.industry}</span>
              </div>

              <div className="p-3.5 rounded-lg bg-[#131F37] border border-[#1E293B]">
                <span className="text-[#64748B] block text-[10px] uppercase">Operational Model</span>
                <span className="text-white font-medium">B2B Manufacturing, OEM Supply & Distribution</span>
              </div>
            </div>

            <PlaceholderNotice message="Verified plant addresses, production figures, and regulatory filings will be updated in accordance with verified client documentation." />
          </div>
        </div>
      </div>

      {/* Manufacturing & Engineering Workflow */}
      <div className="bg-[#050914] border-y border-[#1E293B] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Quality Assurance"
            badgeVariant="blue"
            title="Manufacturing & Quality Philosophy"
            subtitle="Our assembly approach prioritizes cell grading consistency, robust structural enclosures, and active thermal protection."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-7 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00F59B]/10 border border-[#00F59B]/20 flex items-center justify-center text-[#00F59B]">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Automated Cell Sorting</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Every incoming cell is matched for internal resistance, voltage uniformity, and capacity rating to prevent cell-level imbalance and maximize battery cycle life.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#00D2FF]/10 border border-[#00D2FF]/20 flex items-center justify-center text-[#00D2FF]">
                <Factory className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Precision Assembly & Welding</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Utilizing low-heat automated laser and precision spot welding to maintain low connection resistance and secure inter-cell busbars against road vibration.
              </p>
            </div>

            <div className="p-7 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">End-of-Line Verification</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                100% of manufactured packs undergo full computer-controlled charge and discharge cycle verification to validate BMS cutoff thresholds and communication integrity.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Environmental Stewardship */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] border border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <div className="w-10 h-10 rounded-lg bg-[#00F59B]/10 flex items-center justify-center text-[#00F59B]">
              <Recycle className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Environmental Responsibility & Circular Economy
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              <strong className="text-white">{COMPANY_INFO.parentCompanyName}</strong> advocates for sustainable battery lifecycle management. We support responsible material recycling partnerships, extended producer responsibility (EPR) compliance, and efficient thermal designs that extend overall operational lifespan.
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
