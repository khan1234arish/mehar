import React from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/data/companyInfo';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  Sliders,
  Thermometer,
  Lock,
  ArrowRight,
} from 'lucide-react';

export const metadata = {
  title: 'Technology & Smart BMS Architecture | MEHAR',
  description: 'Explore the engineering principles, cell chemistries, and Smart BMS telemetry behind MEHAR battery systems by Lawad Infrastructure Private Limited.',
};

export default function TechnologyPage() {
  return (
    <div className="py-12 space-y-20">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] border border-[#1E293B] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <Badge variant="blue">Engineering & Technology</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Technology & Quality Standards
            </h1>
            <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              Under brand <strong className="text-white">{COMPANY_INFO.brandName}</strong>, <strong className="text-white">{COMPANY_INFO.parentCompanyName}</strong> integrates advanced cell chemistry, intelligent multi-point BMS telemetry, and precision assembly to deliver resilient battery packs.
            </p>
          </div>
        </div>
      </div>

      {/* 1. CELL CHEMISTRIES */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Chemistry Selection"
          badgeVariant="green"
          title="Engineered Cell Chemistries"
          subtitle="Selecting the optimal electrochemistry based on application duty cycle, energy density, and thermal profile requirements."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[#00F59B] uppercase block">
                Lithium Iron Phosphate
              </span>
              <h3 className="text-lg font-bold text-white">LiFePO4 (LFP) Technology</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Known for superior thermal and chemical stability, extensive cycle life, and high resistance to thermal runaway. Ideal for heavy-duty commercial E-Rickshaws, Solar ESS, and stationary inverters.
              </p>

              <div className="pt-3 border-t border-[#1E293B] space-y-2 text-xs text-[#CBD5E1]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>High thermal threshold stability</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Exceptional deep-discharge cycle life</span>
                </div>
              </div>
            </div>

            <PlaceholderNotice message="Verified cycle and C-rate charts will be populated upon official client catalogue release." />
          </div>

          <div className="p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-[#00D2FF] uppercase block">
                Nickel Manganese Cobalt
              </span>
              <h3 className="text-lg font-bold text-white">NMC Lithium-Ion Technology</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Offers high gravimetric and volumetric energy density, providing extended range within tight dimensional enclosures. Ideal for personal electric 2-wheelers and high-performance e-motorcycles.
              </p>

              <div className="pt-3 border-t border-[#1E293B] space-y-2 text-xs text-[#CBD5E1]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D2FF] shrink-0" />
                  <span>High energy density per kg</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00D2FF] shrink-0" />
                  <span>Compact form factor for 2W chassis</span>
                </div>
              </div>
            </div>

            <PlaceholderNotice message="Verified energy density data will be populated upon official client catalogue release." />
          </div>

          <div className="p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold text-yellow-400 uppercase block">
                Deep Cycle Lead-Acid
              </span>
              <h3 className="text-lg font-bold text-white">Advanced Tall Tubular</h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Engineered with heavy-duty spine grids and active material formulation to handle prolonged power outages and continuous daily charging cycles for traditional inverter & solar storage.
              </p>

              <div className="pt-3 border-t border-[#1E293B] space-y-2 text-xs text-[#CBD5E1]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Resilient to deep discharge cycles</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
                  <span>Cost-effective long backup storage</span>
                </div>
              </div>
            </div>

            <PlaceholderNotice message="Verified capacity and backup duration tables will be populated upon official catalogue release." />
          </div>
        </div>
      </div>

      {/* 2. SMART BMS ARCHITECTURE */}
      <div className="bg-[#050914] border-y border-[#1E293B] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Intelligent Protection"
            badgeVariant="blue"
            title="Integrated Smart BMS Architecture"
            subtitle="The brain of every MEHAR lithium battery pack, ensuring electrical safety, balanced cell health, and real-time vehicle telemetry."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#00F59B]/10 flex items-center justify-center text-[#00F59B]">
                <Thermometer className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Multi-Point Thermal Guard</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Dedicated NTC thermal sensors placed throughout cell clusters to trigger automatic charge/discharge throttling during temperature extremes.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#00D2FF]/10 flex items-center justify-center text-[#00D2FF]">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Active Cell Balancing</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Precision balancing circuitry ensures uniform cell voltages across the entire series string, maximizing usable capacity and cycle life.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Over-Current & Short Cutoff</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Ultra-fast solid-state MOSFET / Contactor cutoff protecting against external short circuits, over-charging, and deep over-discharge.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#00F59B]/10 flex items-center justify-center text-[#00F59B]">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="text-sm font-bold text-white">Telemetry Communication</h4>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Supports CAN 2.0B, RS485, and Bluetooth IoT protocols for seamless communication with motor controllers, vehicle displays, and cloud portals.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. QUALITY & COMPLIANCE COMMITMENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#0F172A] border border-[#1E293B] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="yellow">Compliance Framework</Badge>
            <h3 className="text-2xl font-bold text-white">
              Commitment to National & International Safety Standards
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              <strong className="text-white">{COMPANY_INFO.parentCompanyName}</strong> designs its battery systems in alignment with Indian automotive and industrial standards. Specific certification numbers and test lab reports will be published in the Resource Center upon formal catalogue release.
            </p>
          </div>

          <Button
            href="/contact?type=technical"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Request Technical Consultation
          </Button>
        </div>
      </div>
    </div>
  );
}
