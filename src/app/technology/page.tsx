import React from 'react';
import Image from 'next/image';
import { COMPANY_INFO } from '@/data/companyInfo';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import { getSitePlaceholderImage } from '@/lib/siteImages';
import {
  Cpu,
  Layers,
  ShieldCheck,
  CheckCircle2,
  Thermometer,
  Activity,
  Lock,
  ArrowRight,
  ArrowUpRight,
  Boxes,
  Zap,
} from 'lucide-react';

export const metadata = {
  title: 'Battery Cell Technology & Smart BMS Architecture | MEHAR',
  description: 'Explore the engineering principles, cell chemistries, cylindrical and prismatic Li-ion cells, modular packaging, and Smart BMS telemetry behind MEHAR battery systems.',
};

export const dynamic = 'force-dynamic';

export default async function TechnologyPage() {
  const [
    imgCylindrical,
    imgPrismatic,
    imgModules,
    imgBMS,
  ] = await Promise.all([
    getSitePlaceholderImage('technology_cylindrical_cells'),
    getSitePlaceholderImage('technology_prismatic_cells'),
    getSitePlaceholderImage('technology_battery_modules'),
    getSitePlaceholderImage('technology_bms_architecture'),
  ]);

  return (
    <div className="py-12 space-y-20 bg-white text-[#0F172A]">
      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="max-w-3xl space-y-4">
            <Badge variant="green">Engineering &amp; Technology</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Battery Cell Technology &amp; Architecture
            </h1>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Under brand <strong className="text-[#0F172A]">{COMPANY_INFO.brandName}</strong>, <strong className="text-[#0F172A]">{COMPANY_INFO.parentCompanyName}</strong> integrates premium cylindrical and prismatic lithium-ion cells, rigid modular packaging, and intelligent multi-point BMS telemetry to deliver dependable battery systems for commercial applications.
            </p>
          </div>
        </div>
      </div>

      {/* ── 1. CELL-TO-PACK MODULAR ARCHITECTURE PROGRESSION ─────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Manufacturing Architecture"
          badgeVariant="green"
          title="From High-Grade Cells to Complete Energy Systems"
          subtitle="A structured engineering methodology transforming individual electrochemistry into robust, vibration-resistant commercial battery packs."
        />

        {/* 4-Step Architecture Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              step: '01',
              title: 'Individual Cells',
              desc: 'High-precision cylindrical and prismatic lithium cells selected for uniform internal resistance and thermal stability.',
              icon: Zap,
            },
            {
              step: '02',
              title: 'Cell Grouping & Busbars',
              desc: 'Precision spot-welded and laser-joined nickel/copper busbars ensuring low-resistance high-current conduction.',
              icon: Boxes,
            },
            {
              step: '03',
              title: 'Modular Structural Frame',
              desc: 'Extruded aluminum enclosures with compression end-plates and integrated thermal dissipation channels.',
              icon: Layers,
            },
            {
              step: '04',
              title: 'Smart BMS & Final Pack',
              desc: 'Multi-sensor digital BMS governance, vehicle telemetry harness, and ingress-protected outer casing.',
              icon: Cpu,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm relative space-y-3 hover:border-[#059669] transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                  STEP {item.step}
                </span>
                <item.icon className="w-5 h-5 text-[#059669]" />
              </div>
              <h3 className="text-base font-bold text-[#0F172A]">{item.title}</h3>
              <p className="text-xs leading-6 text-[#64748B]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ── 2. DEDICATED CELL & MODULAR TECHNOLOGY CARDS ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Cylindrical Cells */}
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#059669] transition-all">
            <div className="space-y-6">
              {/* Visual Container */}
              <div className="relative h-64 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={imgCylindrical.url}
                  alt={imgCylindrical.altText}
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 text-[10px] font-mono font-bold bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#CBD5E1] text-[#065F46]">
                  Li-Ion Cylindrical
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-[#059669] uppercase block mb-1">
                  High Energy Density &amp; High Discharge
                </span>
                <h3 className="text-2xl font-bold text-[#0F172A]">
                  Cylindrical Lithium-Ion Cell Technology
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-2">
                  Engineered with steel can housing, integrated pressure relief seals, and uniform cylindrical geometry. Ideal for electric 2-wheelers, high-drain power tools, and compact mobile applications requiring agile form factors and rapid thermal dissipation.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#E2E8F0] text-xs text-[#334155]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span>High continuous and peak discharge C-rate capability</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span>Individual cell insulation rings and precision nickel spot-welding</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#059669] shrink-0" />
                  <span>Effective natural heat dissipation between radial cell gaps</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#64748B]">Independently Managed in Admin</span>
              <Button href="/products/electric-2-wheeler-batteries" variant="ghost" size="sm" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                Explore 2W Systems
              </Button>
            </div>
          </div>

          {/* Card 2: Prismatic Cells */}
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#059669] transition-all">
            <div className="space-y-6">
              {/* Visual Container */}
              <div className="relative h-64 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={imgPrismatic.url}
                  alt={imgPrismatic.altText}
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 text-[10px] font-mono font-bold bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#CBD5E1] text-[#065F46]">
                  LiFePO4 / NMC Prismatic
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-[#0284C7] uppercase block mb-1">
                  Large Format &amp; Heavy-Duty Cycling
                </span>
                <h3 className="text-2xl font-bold text-[#0F172A]">
                  Prismatic Large-Format Cell Technology
                </h3>
                <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mt-2">
                  Enclosed in laser-welded aluminum cases with dual polar terminal studs and top explosion-proof safety valves. Prismatic packaging offers high volumetric packaging efficiency for commercial 3-wheelers, heavy forklifts, and stationary solar energy storage banks.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#E2E8F0] text-xs text-[#334155]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                  <span>Space-efficient rectangular stacking with maximum active material volume</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                  <span>Laser-welded busbars for vibration-resistant traction applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0284C7] shrink-0" />
                  <span>Robust chemical and thermal stability for tropical climate operations</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#64748B]">Independently Managed in Admin</span>
              <Button href="/products/electric-3-wheeler-batteries" variant="ghost" size="sm" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                Explore 3W &amp; ESS Systems
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. MODULAR PACK ENCLOSURE & BMS SECTION ──────────────────────────── */}
      <div className="bg-[#F8FAFC] border-y border-[#E2E8F0] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
          <SectionHeading
            badge="Intelligent Control & Housing"
            badgeVariant="blue"
            title="Modular Packaging & Smart BMS Telemetry"
            subtitle="How MEHAR protects and governs battery cells through structural reinforcement and precision digital monitoring."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual 3: Exploded Architecture / BMS */}
            <div className="relative h-80 rounded-3xl bg-white border border-[#E2E8F0] p-6 shadow-sm overflow-hidden flex items-center justify-center">
              <Image
                src={imgBMS.url}
                alt={imgBMS.altText}
                fill
                className="object-contain p-4 hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-4 right-4 text-[10px] font-mono font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0] px-3 py-1 rounded-md">
                Smart BMS &amp; Pack Exploded View
              </span>
            </div>

            {/* BMS Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#059669] uppercase tracking-wider block">
                  Intelligent Protection Layer
                </span>
                <h3 className="text-3xl font-black text-[#0F172A]">
                  Integrated Smart BMS Architecture
                </h3>
                <p className="text-sm text-[#475569] leading-relaxed">
                  The digital brain of every MEHAR lithium system ensures electrical safety, active cell balancing, and continuous vehicle telemetry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#059669]">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Multi-Point Thermal Guard</h4>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    NTC thermal probes distributed across cell clusters to regulate charge/discharge thresholds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#F0F9FF] flex items-center justify-center text-[#0284C7]">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Active Cell Balancing</h4>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    Maintains equalized cell voltages across the series string to preserve capacity and life.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#FEFCE8] flex items-center justify-center text-[#854D0E]">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0F172A]">Solid-State Protection</h4>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    Sub-millisecond cutoff against short circuits, over-current surges, and deep over-discharge.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] space-y-2 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-[#ECFDF5] flex items-center justify-center text-[#059669]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#0F172A]">CAN / RS485 Telemetry</h4>
                  <p className="text-[11px] text-[#64748B] leading-relaxed">
                    Full integration with vehicle clusters, motor controllers, and IoT cloud telematics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. QUALITY & COMPLIANCE COMMITMENT ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="yellow">Compliance Framework</Badge>
            <h3 className="text-2xl font-bold text-[#0F172A]">
              Commitment to National &amp; International Safety Standards
            </h3>
            <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
              <strong className="text-[#0F172A]">{COMPANY_INFO.parentCompanyName}</strong> designs and fabricates its battery systems in alignment with Indian automotive and industrial standards. Specific certification numbers and test lab reports will be attached upon official catalogue release.
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
