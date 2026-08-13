import React from 'react';
import Image from 'next/image';
import { COMPANY_INFO } from '@/data/companyInfo';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getSitePlaceholderImage } from '@/lib/siteImages';
import {
  Cpu,
  Layers,
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
    <div className="py-12 space-y-20 bg-[#0B0F14] text-[#E6EAF0]">
      {/* Header Banner */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11161D] border border-[#1E2633] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#39D353]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <Badge variant="green">Engineering &amp; Technology</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#E6EAF0] tracking-tight">
              Battery Cell Technology &amp; Architecture
            </h1>
            <p className="text-sm sm:text-base text-[#A3AAB5] leading-relaxed">
              Under brand <strong className="text-[#E6EAF0]">{COMPANY_INFO.brandName}</strong>, <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong> integrates premium cylindrical and prismatic lithium-ion cells, rigid modular packaging, and intelligent multi-point BMS telemetry to deliver dependable battery systems for commercial applications.
            </p>
          </div>
        </div>
      </div>

      {/* ── 1. CELL-TO-PACK MODULAR ARCHITECTURE PROGRESSION ─────────────────── */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
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
              className="p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] shadow-sm relative space-y-3 hover:border-[#39D353]/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-black text-[#39D353] bg-[#39D353]/10 px-2 py-0.5 rounded border border-[#39D353]/25">
                  STEP {item.step}
                </span>
                <item.icon className="w-5 h-5 text-[#39D353]" />
              </div>
              <h3 className="text-base font-bold text-[#E6EAF0]">{item.title}</h3>
              <p className="text-xs leading-6 text-[#A3AAB5]">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* ── 2. DEDICATED CELL & MODULAR TECHNOLOGY CARDS ───────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Cylindrical Cells */}
          <div className="rounded-3xl border border-[#1E2633] bg-[#11161D] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#39D353]/50 transition-all duration-300">
            <div className="space-y-6">
              {/* Visual Container */}
              <div className="relative h-64 rounded-2xl bg-[#0B0F14] border border-[#1E2633] overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={imgCylindrical.url}
                  alt={imgCylindrical.altText}
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 text-[10px] font-mono font-bold bg-[#11161D]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#39D353]/30 text-[#39D353]">
                  Li-Ion Cylindrical
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-[#39D353] uppercase block mb-1">
                  Configurable Pack Formats
                </span>
                <h3 className="text-2xl font-bold text-[#E6EAF0]">
                  Cylindrical Li-Ion Cells &amp; Formats
                </h3>
                <p className="text-xs sm:text-sm text-[#A3AAB5] leading-relaxed mt-2">
                  Common cylindrical Li-ion formats (including 18650, 21700, and 32700 cells) utilized in configurable battery-pack architectures. Engineered with steel can housing, integrated safety vents, and uniform radial geometry for electric 2-wheelers, portable systems, and high-drain applications.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#1E2633] text-xs text-[#E6EAF0]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39D353] shrink-0" />
                  <span>Standard 18650, 21700, and 32700 cylindrical formats for modular integration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39D353] shrink-0" />
                  <span>High continuous and peak discharge C-rate capability</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#39D353] shrink-0" />
                  <span>Individual cell insulation rings and precision nickel spot-welded arrays</span>
                </div>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-[#1E2633] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#A3AAB5]">Independently Managed in Admin</span>
              <Button href="/products/cylindrical-li-ion-cells" variant="ghost" size="sm" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                Explore Cylindrical Cells
              </Button>
            </div>
          </div>

          {/* Card 2: Prismatic Cells */}
          <div className="rounded-3xl border border-[#1E2633] bg-[#11161D] p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-[#00A3FF]/50 transition-all duration-300">
            <div className="space-y-6">
              {/* Visual Container */}
              <div className="relative h-64 rounded-2xl bg-[#0B0F14] border border-[#1E2633] overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={imgPrismatic.url}
                  alt={imgPrismatic.altText}
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 text-[10px] font-mono font-bold bg-[#11161D]/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#00A3FF]/30 text-[#00A3FF]">
                  LiFePO4 / NMC Prismatic
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-[#00A3FF] uppercase block mb-1">
                  Large Format &amp; Heavy-Duty Cycling
                </span>
                <h3 className="text-2xl font-bold text-[#E6EAF0]">
                  Prismatic Large-Format Cell Technology
                </h3>
                <p className="text-xs sm:text-sm text-[#A3AAB5] leading-relaxed mt-2">
                  Enclosed in laser-welded aluminum cases with dual polar terminal studs and top explosion-proof safety valves. Prismatic packaging offers high volumetric packaging efficiency for commercial 3-wheelers, heavy forklifts, and stationary solar energy storage banks.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-[#1E2633] text-xs text-[#E6EAF0]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3FF] shrink-0" />
                  <span>Space-efficient rectangular stacking with maximum active material volume</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3FF] shrink-0" />
                  <span>Laser-welded busbars for vibration-resistant traction applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#00A3FF] shrink-0" />
                  <span>Robust chemical and thermal stability for tropical climate operations</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1E2633] flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#A3AAB5]">Independently Managed in Admin</span>
              <Button href="/products/electric-3-wheeler-batteries" variant="ghost" size="sm" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                Explore 3W &amp; ESS Systems
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. MODULAR PACK ENCLOSURE & BMS SECTION ──────────────────────────── */}
      <div className="bg-[#0D1117] border-y border-[#1E2633] py-20 sm:py-28">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-16">
          <SectionHeading
            badge="Intelligent Control & Housing"
            badgeVariant="blue"
            title="Modular Packaging & Smart BMS Telemetry"
            subtitle="How MEHAR protects and governs battery cells through structural reinforcement and precision digital monitoring."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Visual 3: Exploded Architecture / BMS */}
            <div className="relative h-80 rounded-3xl bg-[#0B0F14] border border-[#1E2633] p-6 shadow-xl overflow-hidden flex items-center justify-center">
              <Image
                src={imgBMS.url}
                alt={imgBMS.altText}
                fill
                className="object-contain p-4 hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-4 right-4 text-[10px] font-mono font-bold bg-[#11161D]/90 text-[#39D353] border border-[#39D353]/30 px-3 py-1 rounded-md">
                Smart BMS &amp; Pack Exploded View
              </span>
            </div>

            {/* BMS Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-[#39D353] uppercase tracking-wider block">
                  Intelligent Protection Layer
                </span>
                <h3 className="text-3xl font-black text-[#E6EAF0]">
                  Integrated Smart BMS Architecture
                </h3>
                <p className="text-sm text-[#A3AAB5] leading-relaxed">
                  The digital brain of every MEHAR lithium system ensures electrical safety, active cell balancing, and continuous vehicle telemetry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#161C24] border border-[#1E2633] space-y-2 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#39D353]/10 flex items-center justify-center text-[#39D353]">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#E6EAF0]">Multi-Point Thermal Guard</h4>
                  <p className="text-[11px] text-[#A3AAB5] leading-relaxed">
                    NTC thermal probes distributed across cell clusters to regulate charge/discharge thresholds.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#161C24] border border-[#1E2633] space-y-2 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#00A3FF]/10 flex items-center justify-center text-[#00A3FF]">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#E6EAF0]">Active Cell Balancing</h4>
                  <p className="text-[11px] text-[#A3AAB5] leading-relaxed">
                    Maintains equalized cell voltages across the series string to preserve capacity and life.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#161C24] border border-[#1E2633] space-y-2 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#E6EAF0]">Solid-State Protection</h4>
                  <p className="text-[11px] text-[#A3AAB5] leading-relaxed">
                    Sub-millisecond cutoff against short circuits, over-current surges, and deep over-discharge.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#161C24] border border-[#1E2633] space-y-2 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-[#39D353]/10 flex items-center justify-center text-[#39D353]">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-[#E6EAF0]">CAN / RS485 Telemetry</h4>
                  <p className="text-[11px] text-[#A3AAB5] leading-relaxed">
                    Full integration with vehicle clusters, motor controllers, and IoT cloud telematics.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. QUALITY & COMPLIANCE COMMITMENT ───────────────────────────────── */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11161D] border border-[#1E2633] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="yellow">Compliance Framework</Badge>
            <h3 className="text-2xl font-bold text-[#E6EAF0]">
              Commitment to National &amp; International Safety Standards
            </h3>
            <p className="text-xs sm:text-sm text-[#A3AAB5] leading-relaxed">
              <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong> designs and fabricates its battery systems in alignment with Indian automotive and industrial standards. Specific certification numbers and test lab reports will be attached upon official catalogue release.
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
