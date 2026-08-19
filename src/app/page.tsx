import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { BROAD_CATEGORIES } from '@/data/categories';
import { APPLICATION_DOMAINS } from '@/data/applicationDomains';
import { getCompanySettings, getSalesSettings, getContentSettings } from '@/lib/settings';
import { getSitePlaceholderImage } from '@/lib/siteImages';
import Button from '@/components/ui/Button';
import HeroProductCarousel from '@/components/home/HeroProductCarousel';
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  SlidersHorizontal,
  FileSpreadsheet,
  Factory,
  Wrench,
  ShieldCheck,
  Cpu,
  Mail,
  Zap,
  CheckCircle2,
  Layers,
  Thermometer,
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const [
    company,
    sales,
    content,
    heroImageConfig,
    categoryFallback,
    applicationFallback,
    // Category-specific managed images
    imgCat2W,
    imgCat3W,
    imgCatESS,
    imgCatSolar,
    imgCatCells,
    imgCatOEM,
    // App-specific managed images
    appMobility,
    appSolar,
    appUPS,
    appIndustrial,
    appHandling,
    appRobotics,
    appDrones,
    appMedical,
    appTelecom,
    appPowerTools,
    appCleaning,
    appMarine,
    appLawn,
    appAgri,
    appDefense,
    appPortable,
    appSmartHome,
    appSecurity,
    appTestEquip,
  ] = await Promise.all([
    getCompanySettings(),
    getSalesSettings(),
    getContentSettings(),
    getSitePlaceholderImage('homepage_hero'),
    getSitePlaceholderImage('category_fallback'),
    getSitePlaceholderImage('application_fallback'),
    // Category managed images
    getSitePlaceholderImage('homepage_electric_2w'),
    getSitePlaceholderImage('homepage_electric_3w'),
    getSitePlaceholderImage('homepage_ess_inverter'),
    getSitePlaceholderImage('homepage_solar_renewable'),
    getSitePlaceholderImage('homepage_cylindrical_cells'),
    getSitePlaceholderImage('homepage_custom_oem'),
    // App managed images
    getSitePlaceholderImage('app_electric_mobility'),
    getSitePlaceholderImage('app_solar_ess'),
    getSitePlaceholderImage('app_ups_inverter'),
    getSitePlaceholderImage('app_industrial_equipment'),
    getSitePlaceholderImage('app_material_handling'),
    getSitePlaceholderImage('app_robotics_automation'),
    getSitePlaceholderImage('app_drones_uav'),
    getSitePlaceholderImage('app_medical_specialized'),
    getSitePlaceholderImage('app_telecom_infrastructure'),
    getSitePlaceholderImage('app_power_tools'),
    getSitePlaceholderImage('app_cleaning_equipment'),
    getSitePlaceholderImage('app_marine_rv'),
    getSitePlaceholderImage('app_lawn_garden'),
    getSitePlaceholderImage('app_agriculture_equipment'),
    getSitePlaceholderImage('app_defense_tactical'),
    getSitePlaceholderImage('app_portable_power'),
    getSitePlaceholderImage('app_smart_home_iot'),
    getSitePlaceholderImage('app_security_surveillance'),
    getSitePlaceholderImage('app_test_measurement'),
  ]);

  const managedCategoryImages: Record<string, typeof imgCat2W> = {
    'electric-2-wheeler-batteries': imgCat2W,
    'electric-3-wheeler-batteries': imgCat3W,
    'energy-storage-inverter-batteries': imgCatESS,
    'solar-renewable-energy-batteries': imgCatSolar,
    'cylindrical-li-ion-cells': imgCatCells,
    'custom-oem-industrial-batteries': imgCatOEM,
  };

  const managedAppImages: Record<string, typeof appMobility> = {
    'electric-mobility-2w': appMobility,
    'electric-mobility-3w': appMobility,
    'solar-ess': appSolar,
    'ups-inverter': appUPS,
    'industrial-equipment': appIndustrial,
    'material-handling': appHandling,
    'robotics-automation': appRobotics,
    'drones-uav': appDrones,
    'medical-specialized': appMedical,
    'telecom-infrastructure': appTelecom,
    'power-tools': appPowerTools,
    'cleaning-equipment': appCleaning,
    'marine-rv': appMarine,
    'lawn-garden': appLawn,
    'agriculture-equipment': appAgri,
    'defense-tactical': appDefense,
    'portable-power': appPortable,
    'smart-home-iot': appSmartHome,
    'security-surveillance': appSecurity,
    'test-measurement': appTestEquip,
  };

  // Fetch verified product primary images for categories
  let verifiedProductImages: Record<string, { url: string; altText: string }> = {};
  try {
    const productsWithImages = await prisma.product.findMany({
      where: { isPlaceholder: false },
      include: { images: true, category: true },
    });

    for (const prod of productsWithImages) {
      const primary = prod.images.find((img) => img.isPrimary) || prod.images[0];
      if (primary && prod.category) {
        if (!verifiedProductImages[prod.category.slug]) {
          verifiedProductImages[prod.category.slug] = {
            url: primary.imageUrl,
            altText: primary.altText || prod.name,
          };
        }
      }
    }
  } catch {
    // Database fallback gracefully handled
  }

  return (
    <div className="flex flex-col bg-theme-base text-theme-primary">

      {/* ── 1. HERO SECTION ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-theme-base border-b border-theme-border pt-8 pb-12 sm:pt-14 sm:pb-16 lg:pt-18 lg:pb-24 xl:pt-22 xl:pb-28">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-theme-green/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-theme-blue/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">

            {/* Left – headline + CTAs */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-5 sm:space-y-6 lg:space-y-8">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-theme-green/10 border border-theme-green/25 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-theme-green animate-pulse shrink-0" />
                <span className="text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-theme-green">
                  AIS-156 Phase 2 Certified · Prismatic LiFePO4 &amp; NMC
                </span>
              </div>

              {/* Main headline */}
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] 2xl:text-[4.25rem] font-black leading-[1.15] sm:leading-[1.1] tracking-tight text-theme-primary">
                High-Performance Lithium Battery Systems for Indian Commercial Mobility &amp; ESS
              </h1>

              {/* Sub-text */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-theme-secondary max-w-2xl">
                Engineered for harsh ambient temperatures (-10°C to 55°C) and heavy multi-shift duty cycles. Direct B2B supply of A+ Grade Prismatic LiFePO4 packs, microprocessor Smart BMS with UART / CAN / RS485 telemetry, and custom OEM pack manufacturing.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:gap-4 pt-1 sm:pt-2">
                <Button href="/products" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Explore Products
                </Button>
                <Button href="/rfq" variant="secondary" size="lg">
                  Request Batch RFQ
                </Button>
                <Button href="/oem-custom-solutions" variant="outline" size="lg">
                  Custom OEM Solutions
                </Button>
              </div>

              {/* Trust pillars */}
              <div className="flex flex-wrap gap-x-4 sm:gap-x-8 gap-y-2.5 sm:gap-y-3 pt-5 sm:pt-6 border-t border-theme-border text-xs sm:text-sm text-theme-secondary font-mono">
                <span className="flex items-center gap-1.5 sm:gap-2"><ShieldCheck className="w-4 h-4 text-theme-green shrink-0" /> <strong className="text-theme-primary">AIS-156 Phase 2</strong> Compliant</span>
                <span className="flex items-center gap-1.5 sm:gap-2"><Factory className="w-4 h-4 text-theme-blue shrink-0" /> <strong className="text-theme-primary">Laser-Welded</strong> Prismatic Cells</span>
                <span className="flex items-center gap-1.5 sm:gap-2"><Cpu className="w-4 h-4 text-theme-green shrink-0" /> <strong className="text-theme-primary">Smart BMS</strong> CAN / 4G IoT</span>
              </div>
            </div>

            {/* Right – automatic sliding product showcase carousel */}
            <div className="lg:col-span-5 xl:col-span-5">
              <HeroProductCarousel parentCompany={company.parentCompanyName} />
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. PRODUCT CATEGORIES ─────────────────────────────────────────────── */}
      <section className="bg-theme-section border-b border-theme-border py-12 sm:py-16 lg:py-24">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 lg:mb-16">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-theme-green mb-2 sm:mb-3 font-mono">Product Portfolio</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-theme-primary">
                Commercial Lithium Battery Categories
              </h2>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg leading-relaxed text-theme-secondary">
                Designed and manufactured for high-reliability commercial operation. Select a product line to inspect technical specifications or request wholesale volume pricing.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-theme-green hover:text-theme-green-hover whitespace-nowrap shrink-0 transition-colors"
            >
              All Categories <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {BROAD_CATEGORIES.map((cat) => {
              const verifiedImg = verifiedProductImages[cat.slug] || verifiedProductImages[cat.id];
              const specificManaged = managedCategoryImages[cat.slug];

              const categoryImgUrl =
                verifiedImg?.url ||
                specificManaged?.url ||
                cat.defaultImage ||
                categoryFallback.url ||
                '/assets/logo/mehar-logo.png';

              const categoryImgAlt = verifiedImg?.altText || specificManaged?.altText || cat.name;

              return (
                <Link
                  key={cat.id}
                  href={`/products/${cat.slug}`}
                  className="group rounded-3xl border border-theme-border bg-theme-card p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-theme-green/50 shadow-sm hover:shadow-xl flex flex-col justify-between"
                >
                  {/* Category Image Area */}
                  <div className="relative flex h-52 sm:h-60 lg:h-64 items-end justify-between rounded-2xl p-4 sm:p-5 mb-4 bg-theme-base border border-theme-border overflow-hidden group-hover:border-theme-green/40 transition-colors">
                    <Image
                      src={categoryImgUrl}
                      alt={categoryImgAlt}
                      fill
                      className="object-contain p-3 sm:p-5 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="relative z-10 rounded-full bg-theme-card/90 backdrop-blur-md border border-theme-border px-3.5 py-1 text-xs font-semibold text-theme-primary shadow-sm">
                      {cat.keyApplications[0]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-2 sm:p-3 pt-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-theme-primary group-hover:text-theme-green transition-colors">
                        {cat.name}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-theme-secondary line-clamp-3">
                        {cat.description}
                      </p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm sm:text-base font-bold text-theme-green">
                      View category specs <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. ENGINEERING RIGOR & QUALITY PILLARS ─────────────────────────────── */}
      <section className="bg-theme-base border-b border-theme-border py-12 sm:py-16 lg:py-24">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-16">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-theme-green mb-2 sm:mb-3 font-mono">Engineering Standards</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-theme-primary">
              Engineered for High-Ambient Indian Climates.
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg leading-relaxed text-theme-secondary">
              Under brand MEHAR, Lawad Infrastructure Private Limited manufactures battery packs that solve the critical failure points of imported kits: thermal runaway vulnerability, fragile spot welds, and lack of active cell balancing.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
            {[
              {
                icon: Thermometer,
                title: 'Thermal Propagation Resistance',
                desc: 'Compliant with AIS-156 Amendment III Phase 2. Utilizes inter-cell aerogel and ceramic thermal barrier pads to prevent thermal runaway propagation even during extreme short-circuit events.',
              },
              {
                icon: Factory,
                title: 'Fiber Laser-Welded Busbars',
                desc: 'Precision laser-welded solid copper and aluminum busbars eliminate high-contact-resistance screw terminals and wire-bond fatigue, ensuring zero voltage drops during peak acceleration.',
              },
              {
                icon: Cpu,
                title: 'Microprocessor Smart BMS',
                desc: 'Automotive-grade MCU with active cell balancing, 4-point NTC thermistor temperature sensing, dual MOSFET solid-state cutoff, and UART / CAN 2.0B / RS485 telemetry.',
              },
              {
                icon: ShieldCheck,
                title: '100% Automated Cell Grading',
                desc: 'Every single cell undergoes 4-tier automated capacity sorting and AC/DC internal resistance (IR) matching within ±1.5% delta to guarantee uniform pack degradation over 3,000+ cycles.',
              },
            ].map((pillar) => (
              <div key={pillar.title} className="p-6 sm:p-8 rounded-3xl bg-theme-card border border-theme-border shadow-sm hover:border-theme-green/40 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-theme-green/10 border border-theme-green/25 text-theme-green flex items-center justify-center mb-5 shadow-sm">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-theme-primary mb-2.5">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-theme-secondary">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW WE WORK / OEM WORKFLOW ─────────────────────────────────────── */}
      <section className="bg-theme-section border-b border-theme-border py-12 sm:py-16 lg:py-24">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 sm:gap-10 lg:gap-16 items-start">

            {/* Left */}
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-theme-green mb-2 sm:mb-3 font-mono">OEM Engineering Process</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-theme-primary">
                From Custom CAD Concept to Certified Batch Delivery.
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed text-theme-secondary">
                Developing a custom electric vehicle or industrial machine? Submit your dimensional envelope, duty cycle, continuous C-rate, and communication protocol requirements. Our engineering team handles complete 3D packaging, thermal simulation, and prototype fabrication.
              </p>
              <div className="mt-6 sm:mt-8">
                <Button href="/oem-custom-solutions" variant="primary" size="lg" icon={<Factory className="w-4 h-4" />}>
                  Configure Custom OEM Solution
                </Button>
              </div>
            </div>

            {/* Right – numbered steps */}
            <div className="divide-y divide-theme-border border-y border-theme-border">
              {[
                {
                  n: '01',
                  title: 'Operating Profile & Duty Cycle Discovery',
                  desc: 'We analyze your required continuous discharge current, peak torque demands, ambient operating temperatures, and vehicle chassis envelope.',
                },
                {
                  n: '02',
                  title: 'Cell Chemistry & 3D Thermal Simulation',
                  desc: 'Selection of optimal Prismatic LiFePO4 or NMC cells, busbar cross-sectional sizing, and thermal CFD simulation for heat dissipation.',
                },
                {
                  n: '03',
                  title: 'Custom BMS Firmware & Enclosure Fabrication',
                  desc: 'BMS programming (CAN 2.0B / RS485 register mapping) and precision CNC aluminum or IP67 powder-coated steel casing fabrication.',
                },
                {
                  n: '04',
                  title: 'Certification Support & Batch Production',
                  desc: 'Support for ARAI / ICAT AIS-156 Phase 2 homologation testing, followed by serial batch manufacturing with strict quality traceability.',
                },
              ].map((step) => (
                <div key={step.n} className="grid gap-3 sm:gap-4 py-5 sm:py-6 sm:grid-cols-[70px_1fr]">
                  <span className="text-lg font-black text-theme-green font-mono">{step.n}</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-theme-primary">{step.title}</h3>
                    <p className="mt-1 max-w-xl leading-relaxed text-theme-secondary text-sm sm:text-base">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. APPLICATION SECTORS ────────────────────────────────────────────── */}
      <section className="bg-theme-base border-b border-theme-border py-12 sm:py-16 lg:py-24">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          {/* Section header */}
          <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-16">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-theme-blue mb-2 sm:mb-3 font-mono">Industry Domains</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-theme-primary">
              Application-Specific Battery Solutions
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg leading-relaxed text-theme-secondary">
              Tailored energy solutions engineered for specific commercial duty cycles, duty ratings, and environmental conditions.
            </p>
          </div>

          {/* Application grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {APPLICATION_DOMAINS.map((domain) => {
              const specificManaged = managedAppImages[domain.id];
              const domainImgUrl =
                specificManaged?.url ||
                domain.defaultImage ||
                applicationFallback.url ||
                '/assets/logo/mehar-logo.png';

              return (
                <Link
                  key={domain.id}
                  href={`/finder?domain=${domain.id}`}
                  className="group rounded-3xl border border-theme-border bg-theme-card p-5 sm:p-6 hover:border-theme-blue/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-theme-base border border-theme-border p-2 relative overflow-hidden flex items-center justify-center group-hover:border-theme-blue/40 transition-colors">
                        <Image
                          src={domainImgUrl}
                          alt={specificManaged?.altText || domain.name}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-theme-blue bg-theme-blue/10 px-2.5 py-1 rounded-lg border border-theme-blue/25">
                        {domain.operatingTemp.split(' ')[0]}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-theme-primary group-hover:text-theme-blue transition-colors leading-snug">
                      {domain.name}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-theme-secondary mt-2 line-clamp-3">
                      {domain.description}
                    </p>
                    <div className="mt-3 pt-3 border-t border-theme-border/60 text-[11px] font-mono text-theme-secondary">
                      <span className="block text-theme-primary font-semibold">Duty: {domain.dutyCycle}</span>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-theme-blue">
                    Find Model <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. B2B PROCUREMENT TOOLS ──────────────────────────────────────────── */}
      <section className="bg-theme-section border-b border-theme-border py-12 sm:py-16 lg:py-24">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          <div className="max-w-3xl mb-8 sm:mb-12 lg:mb-16">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-theme-green mb-2 sm:mb-3 font-mono">B2B Procurement Suite</p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-theme-primary">
              Engineering Sizing &amp; RFQ Tools.
            </h2>
            <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg leading-relaxed text-theme-secondary">
              Calculate capacity requirements, compare cell chemistry performance, and generate formal RFQs for wholesale procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {[
              { href: '/finder', icon: Search, title: 'Battery Finder', desc: 'Interactive wizard to match application parameters to exact battery models.' },
              { href: '/compare', icon: SlidersHorizontal, title: 'Compare Categories', desc: 'Side-by-side engineering comparison across all battery chemistries.' },
              { href: '/rfq', icon: FileSpreadsheet, title: 'RFQ Builder', desc: 'Official commercial quotation builder for batch wholesale procurement.' },
              { href: '/oem-custom-solutions', icon: Factory, title: 'OEM Configurator', desc: 'Detailed 8-step technical intake for custom pack engineering.' },
              { href: '/tools', icon: Wrench, title: 'Engineering Calculators', desc: 'Sizing tools for battery capacity, C-rate, runtime, and discharge.' },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-theme-card border border-theme-border hover:border-theme-green/50 shadow-sm hover:shadow-xl transition-all duration-300 gap-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-theme-green/10 border border-theme-green/25 text-theme-green flex items-center justify-center shadow-sm">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-theme-primary group-hover:text-theme-green transition-colors">
                      {tool.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-theme-secondary">{tool.desc}</p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-theme-green flex items-center gap-1">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-12 sm:py-16 lg:py-24">
        <div className="rounded-3xl bg-theme-card border border-theme-green/30 px-6 py-10 sm:px-12 sm:py-16 lg:px-16 lg:py-20 shadow-xl relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-theme-green/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 relative z-10">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-theme-green mb-2 sm:mb-3 font-mono">
                Direct B2B Manufacturer Supply
              </p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black tracking-tight text-theme-primary">
                Have a Commercial Battery Requirement?
              </h2>
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg leading-relaxed text-theme-secondary">
                Submit your target voltage, Ah capacity, and fleet volume. Our application engineering team will provide a formal technical proposal and batch commercial quotation within 24 hours.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 shrink-0">
              <Button href="/rfq" variant="primary" size="lg" icon={<ArrowUpRight className="w-4 h-4" />}>
                Start Batch RFQ
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Contact Sales Desk
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
