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
  ShieldCheck,
  Factory,
  Radio,
  Gauge,
} from 'lucide-react';

export const metadata = {
  title: 'Battery Technology, Prismatic LFP Engineering & Smart BMS | MEHAR',
  description: 'Explore the engineering principles, AIS-156 Phase 2 compliance, A+ Grade Prismatic LiFePO4 cells, fiber laser-welded busbars, and microprocessor Smart BMS telemetry behind MEHAR battery systems.',
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
    <div className="py-8 sm:py-12 space-y-10 sm:space-y-16 bg-theme-base text-theme-primary transition-colors duration-200">
      
      {/* ── 1. HEADER BANNER ───────────────────────────────────────────────── */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-5 sm:p-8 lg:p-12 rounded-3xl bg-theme-card border border-theme-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-green/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-3 sm:space-y-4 relative z-10">
            <Badge variant="green">Engineering &amp; Manufacturing Rigor</Badge>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-theme-primary tracking-tight">
              Battery Cell Technology &amp; Smart BMS Architecture
            </h1>
            <p className="text-xs sm:text-base text-theme-secondary leading-relaxed">
              Under brand <strong className="text-theme-primary">{COMPANY_INFO.brandName}</strong>, <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong> engineers heavy-duty battery systems specifically for extreme Indian operating environments (-10°C to 55°C). We combine A+ Grade Laser-Welded Prismatic LiFePO4 cells, inter-cell thermal propagation barriers, and microprocessor-governed Smart BMS telemetry to deliver uncompromised safety and cycle life.
            </p>
          </div>
        </div>
      </div>

      {/* ── 2. CELL-TO-PACK MANUFACTURING PROGRESSION ───────────────────────── */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <SectionHeading
          badge="Automated Production"
          badgeVariant="green"
          title="From Graded Electrochemistry to Certified Commercial Packs"
          subtitle="A structured, automated manufacturing pipeline ensuring zero thermal propagation and uniform pack longevity across 3,000+ deep cycles."
        />

        {/* 4-Step Architecture Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              step: '01',
              title: '4-Tier Cell Grading & IR Matching',
              desc: '100% of incoming cells undergo automated capacity sorting and AC/DC internal resistance (IR) matching within ±1.5% delta to eliminate premature cell drift.',
              icon: Zap,
            },
            {
              step: '02',
              title: 'Fiber Laser-Welded Busbars',
              desc: 'High-precision automated laser welding fuses solid copper and aluminum busbars directly onto terminal studs, eliminating high contact resistance and screw loosening.',
              icon: Factory,
            },
            {
              step: '03',
              title: 'Thermal Propagation Barrier',
              desc: 'Inter-cell aerogel and ceramic-silicone insulation pads isolate every cell, preventing thermal runaway cascading per AIS-156 Amendment III Phase 2 standards.',
              icon: Layers,
            },
            {
              step: '04',
              title: 'Smart BMS & EOL Validation',
              desc: 'Integrated microprocessor BMS calibration, CAN/RS485 firmware flash, and 100% automated End-of-Line (EOL) full-cycle charge/discharge validation.',
              icon: Cpu,
            },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-theme-card border border-theme-border shadow-sm relative space-y-3 hover:border-theme-green/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-black text-theme-green bg-theme-green/10 px-2.5 py-0.5 rounded border border-theme-green/25">
                    STAGE {item.step}
                  </span>
                  <item.icon className="w-5 h-5 text-theme-green" />
                </div>
                <h3 className="text-base font-bold text-theme-primary">{item.title}</h3>
                <p className="text-xs leading-5 text-theme-secondary mt-2">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── 3. PRISMATIC VS CYLINDRICAL FORM FACTORS ──────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Card 1: Prismatic Cells (Core EV / ESS Focus) */}
          <div className="rounded-3xl border border-theme-border bg-theme-card p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-theme-green/50 transition-all duration-300">
            <div className="space-y-6">
              <div className="relative h-64 rounded-2xl bg-theme-base border border-theme-border overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={imgPrismatic.url}
                  alt="MEHAR Large-Format Laser Prismatic Cells"
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 text-[10px] font-mono font-bold bg-theme-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-theme-green/30 text-theme-green">
                  Primary Technology (EV &amp; ESS)
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-theme-green uppercase block mb-1">
                  Commercial Traction &amp; Storage Architecture
                </span>
                <h3 className="text-2xl font-bold text-theme-primary">
                  Large-Format Prismatic LiFePO4 Cells
                </h3>
                <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed mt-2">
                  Prismatic cells are the engineering benchmark for Indian commercial EVs (E-Rickshaws, 2W fleets, Forklifts) and stationary ESS. Housed in laser-welded aluminum shells with integrated explosion-proof safety vents, they provide high volumetric efficiency, superior heat dissipation through flat aluminum faces, and up to 90% fewer electrical interconnects than cylindrical arrays.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-theme-border text-xs text-theme-primary">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-green shrink-0" />
                  <span>3,000 to 5,000+ deep cycles @ 80% DoD with minimal capacity fade</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-green shrink-0" />
                  <span>Laser-welded copper/aluminum busbars eliminate vibration fatigue</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-green shrink-0" />
                  <span>High thermal stability threshold (&gt;270°C) suited for Indian summers</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-theme-border flex items-center justify-between">
              <span className="text-[11px] font-mono text-theme-muted">AIS-156 Phase 2 Certified</span>
              <Button href="/products/electric-3-wheeler-batteries" variant="ghost" size="sm" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                View E-Rickshaw &amp; ESS Packs
              </Button>
            </div>
          </div>

          {/* Card 2: Cylindrical Cells (Supply & Specialized Use) */}
          <div className="rounded-3xl border border-theme-border bg-theme-card p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:border-theme-blue/50 transition-all duration-300">
            <div className="space-y-6">
              <div className="relative h-64 rounded-2xl bg-theme-base border border-theme-border overflow-hidden flex items-center justify-center p-4">
                <Image
                  src={imgCylindrical.url}
                  alt="MEHAR Cylindrical Lithium-Ion Cells"
                  fill
                  className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-4 right-4 text-[10px] font-mono font-bold bg-theme-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-theme-blue/30 text-theme-blue">
                  Raw Cell Supply (18650 / 21700 / 32700)
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-theme-blue uppercase block mb-1">
                  Component Supply &amp; Specialized Packs
                </span>
                <h3 className="text-2xl font-bold text-theme-primary">
                  Cylindrical Li-Ion Cells (18650, 21700, 32700)
                </h3>
                <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed mt-2">
                  Direct factory supply of Grade-A cylindrical cells for specialized B2B battery pack assemblers, light e-cycles, power tools, and portable industrial instruments. High discharge rate capability (3C–5C continuous) with individual steel can explosion-proof CID pressure valves.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-theme-border text-xs text-theme-primary">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-blue shrink-0" />
                  <span>100% automated capacity sorting and AC/DC IR matching</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-blue shrink-0" />
                  <span>High energy density (up to 240 Wh/kg) in standard formats</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-theme-blue shrink-0" />
                  <span>QR code laser-etched data matrix for batch traceability</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-theme-border flex items-center justify-between">
              <span className="text-[11px] font-mono text-theme-muted">Direct Factory Batch Supply</span>
              <Button href="/products/cylindrical-li-ion-cells" variant="ghost" size="sm" icon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                Explore Cell Portfolio
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* ── 4. SMART BMS ARCHITECTURE & IOT TELEMETRY ────────────────────────── */}
      <div className="bg-theme-section border-y border-theme-border py-20 sm:py-28">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 space-y-16">
          <SectionHeading
            badge="Intelligent Governance"
            badgeVariant="blue"
            title="Microprocessor Smart BMS Architecture &amp; IoT Telemetry"
            subtitle="How MEHAR protects, monitors, and optimizes battery performance in real-time through hardware-level fail-safes and cloud connectivity."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual: Exploded BMS Architecture */}
            <div className="relative h-96 rounded-3xl bg-theme-base border border-theme-border p-6 shadow-xl overflow-hidden flex items-center justify-center">
              <Image
                src={imgBMS.url}
                alt="MEHAR Smart BMS & Pack Exploded View"
                fill
                className="object-contain p-4 hover:scale-105 transition-transform duration-500"
              />
              <span className="absolute bottom-4 right-4 text-[10px] font-mono font-bold bg-theme-card/90 text-theme-green border border-theme-green/30 px-3 py-1 rounded-md">
                Smart BMS Exploded Engineering View
              </span>
            </div>

            {/* BMS Technical Features */}
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-mono font-bold text-theme-green uppercase tracking-wider block">
                  AIS-156 Phase 2 Compliant Governance
                </span>
                <h3 className="text-3xl font-black text-theme-primary">
                  Multi-Tier Hardware Protection &amp; Telematics
                </h3>
                <p className="text-sm text-theme-secondary leading-relaxed">
                  Every MEHAR battery pack features a dedicated microprocessor-based Smart BMS equipped with multi-stage solid-state switching, real-time SoC/SoH algorithms, and cloud fleet telemetry.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-xl bg-theme-elevated border border-theme-border space-y-2 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-theme-green/10 flex items-center justify-center text-theme-green">
                    <Thermometer className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-theme-primary">4-Point NTC Thermal Guard</h4>
                  <p className="text-[11px] text-theme-secondary leading-relaxed">
                    Multiple thermal thermistors monitoring cell clusters and power MOSFETs with automatic charge/discharge cutoff at &gt;55°C and sub-zero protection.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-theme-elevated border border-theme-border space-y-2 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-theme-blue/10 flex items-center justify-center text-theme-blue">
                    <Activity className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-theme-primary">Active Cell Balancing</h4>
                  <p className="text-[11px] text-theme-secondary leading-relaxed">
                    Microprocessor-driven active charge redistribution equalizes cell voltages during operation, preventing premature pack shutdown and extending service life.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-theme-elevated border border-theme-border space-y-2 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-theme-primary">Dual Solid-State Power MOSFETs</h4>
                  <p className="text-[11px] text-theme-secondary leading-relaxed">
                    Sub-millisecond short-circuit and overcurrent disconnect with zero contact arcing, backed by redundant hardware hardware comparator circuits.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-theme-elevated border border-theme-border space-y-2 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-theme-green/10 flex items-center justify-center text-theme-green">
                    <Radio className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-bold text-theme-primary">UART / CAN 2.0B / RS485 &amp; 4G IoT</h4>
                  <p className="text-[11px] text-theme-secondary leading-relaxed">
                    Full telemetry integration with vehicle speedometers, motor controllers, and 4G cloud fleet dashboards for GPS tracking, geo-fencing, and remote diagnosis.
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ── 5. REGULATORY STANDARDS & TESTING PROTOCOLS ──────────────────────── */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-theme-card border border-theme-border flex flex-col lg:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="yellow">Compliance &amp; Quality Assurance</Badge>
            <h3 className="text-2xl font-bold text-theme-primary">
              Full Alignment with Indian Automotive &amp; Industrial Standards
            </h3>
            <p className="text-xs sm:text-sm text-theme-secondary leading-relaxed">
              <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong> designs, tests, and manufactures MEHAR battery packs in strict accordance with <strong className="text-theme-primary">AIS-156 Amendment III Phase 2</strong>, <strong className="text-theme-primary">AIS-038 Rev 2</strong>, <strong className="text-theme-primary">BIS IS 16046 (Part 2:2018)</strong>, and <strong className="text-theme-primary">UN 38.3</strong> transport safety requirements.
            </p>
          </div>

          <Button
            href="/contact?type=technical"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Request Engineering Consultation
          </Button>
        </div>
      </div>

    </div>
  );
}
