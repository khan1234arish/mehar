import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import { BROAD_CATEGORIES } from '@/data/categories';
import { APPLICATION_DOMAINS } from '@/data/applicationDomains';
import { getCompanySettings, getSalesSettings, getContentSettings } from '@/lib/settings';
import { getSitePlaceholderImage } from '@/lib/siteImages';
import Button from '@/components/ui/Button';
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
  BatteryCharging,
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
    // Application-specific managed images
    imgAppMobility,
    imgAppSolar,
    imgAppUPS,
    imgAppMachinery,
    imgAppForklift,
    imgAppRobotics,
    imgAppDrone,
    imgAppMedical,
    imgAppTelecom,
    imgAppMarine,
  ] = await Promise.all([
    getCompanySettings(),
    getSalesSettings(),
    getContentSettings(),
    getSitePlaceholderImage('homepage_hero'),
    getSitePlaceholderImage('category_default'),
    getSitePlaceholderImage('application_default'),
    getSitePlaceholderImage('homepage_electric_2w'),
    getSitePlaceholderImage('homepage_electric_3w'),
    getSitePlaceholderImage('homepage_ess_inverter'),
    getSitePlaceholderImage('homepage_solar_renewable'),
    getSitePlaceholderImage('homepage_cylindrical_cells'),
    getSitePlaceholderImage('homepage_custom_oem'),
    getSitePlaceholderImage('app_electric_mobility'),
    getSitePlaceholderImage('app_solar_ess'),
    getSitePlaceholderImage('app_ups_inverter'),
    getSitePlaceholderImage('app_industrial_equipment'),
    getSitePlaceholderImage('app_material_handling'),
    getSitePlaceholderImage('app_robotics_automation'),
    getSitePlaceholderImage('app_drones_uav'),
    getSitePlaceholderImage('app_medical_specialized'),
    getSitePlaceholderImage('app_telecom_infrastructure'),
    getSitePlaceholderImage('app_marine_rv'),
  ]);

  const managedCategoryImages: Record<string, { url: string; altText: string }> = {
    'electric-2-wheeler-batteries': imgCat2W,
    'electric-3-wheeler-batteries': imgCat3W,
    'energy-storage-inverter-batteries': imgCatESS,
    'solar-renewable-energy-batteries': imgCatSolar,
    'cylindrical-li-ion-cells': imgCatCells,
    'custom-oem-industrial-batteries': imgCatOEM,
  };

  const managedAppImages: Record<string, { url: string; altText: string }> = {
    'electric-mobility': imgAppMobility,
    'solar-renewable-energy': imgAppSolar,
    'ups-inverter-backup': imgAppUPS,
    'industrial-machinery-equipment': imgAppMachinery,
    'material-handling-forklifts': imgAppForklift,
    'robotics-automation-agv': imgAppRobotics,
    'drones-uav-aerospace': imgAppDrone,
    'medical-healthcare-devices': imgAppMedical,
    'telecom-infrastructure': imgAppTelecom,
    'marine-defense-specialized': imgAppMarine,
  };

  // Fetch verified product primary images if any exist in the database
  const verifiedProductImages: Record<string, { url: string; altText: string }> = {};
  try {
    if (prisma && process.env.DATABASE_URL) {
      const dbProducts = await prisma.product.findMany({
        where: {
          publishStatus: 'VERIFIED',
          isPublished: true,
        },
        include: {
          category: true,
          images: {
            where: {
              isPublished: true,
              isArchived: false,
            },
            orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
          },
        },
      });

      for (const prod of dbProducts) {
        const primaryImg = prod.images.find((img) => img.isPrimary) || prod.images[0];
        if (primaryImg && primaryImg.imageUrl) {
          if (prod.category?.slug) {
            verifiedProductImages[prod.category.slug] = {
              url: primaryImg.imageUrl,
              altText: primaryImg.altText || prod.name,
            };
          }
          if (prod.categoryId) {
            verifiedProductImages[prod.categoryId] = {
              url: primaryImg.imageUrl,
              altText: primaryImg.altText || prod.name,
            };
          }
        }
      }
    }
  } catch {
    // Gracefully fallback
  }

  return (
    <div className="bg-[#0B0F14] text-[#E6EAF0]">

      {/* ── 1. HERO ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0B0F14] border-b border-[#1E2633] pt-10 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-28 xl:pt-24 xl:pb-32">
        {/* Subtle Ambient Glows */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-[#39D353]/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#00A3FF]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">

            {/* Left – headline + CTAs */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6 lg:space-y-8">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#39D353]/10 border border-[#39D353]/25 shadow-[0_0_15px_rgba(57,211,83,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#39D353] animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#39D353]">
                  Battery systems for a moving world
                </span>
              </div>

              {/* Main headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] 2xl:text-[4.25rem] font-black leading-[1.1] tracking-tight text-[#E6EAF0]">
                {content.heroHeadline || 'High-Performance Battery Systems for Next-Gen Mobility & ESS'}
              </h1>

              {/* Sub-text */}
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-[#A3AAB5] max-w-2xl">
                {content.heroSubheadline || 'Engineering-grade lithium battery packs and power integration for mobility, energy storage, and industrial OEMs.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                <Button href="/products" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                  Explore Products
                </Button>
                <Button href="/rfq" variant="secondary" size="lg">
                  Request a Quote
                </Button>
                <Button href="/contact" variant="outline" size="lg">
                  Talk to Our Team
                </Button>
              </div>

              {/* Trust pillars */}
              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-6 border-t border-[#1E2633] text-xs sm:text-sm text-[#A3AAB5] font-mono">
                <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-[#39D353]" /> <strong className="text-[#E6EAF0]">B2B</strong> Direct Supply</span>
                <span className="flex items-center gap-2"><Factory className="w-4 h-4 text-[#00A3FF]" /> <strong className="text-[#E6EAF0]">OEM</strong> Engineering</span>
                <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-[#39D353]" /> <strong className="text-[#E6EAF0]">Custom</strong> Packs</span>
              </div>
            </div>

            {/* Right – product showcase card */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="rounded-3xl bg-[#11161D] border border-[#1E2633] p-4 sm:p-5 lg:p-6 shadow-2xl shadow-black/80 hover:border-[#39D353]/40 transition-all duration-300">
                <div className="flex flex-col justify-between min-h-[380px] sm:min-h-[440px] lg:min-h-[480px] rounded-2xl bg-[#0D1117] border border-[#1E2633] p-5 sm:p-6 lg:p-7 space-y-5">
                  {/* Card header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#39D353]/10 border border-[#39D353]/25 flex items-center justify-center">
                        <BatteryCharging className="w-5 h-5 text-[#39D353]" />
                      </div>
                      <div>
                        <span className="text-sm font-mono font-bold text-[#39D353] block">MEHAR Battery Systems</span>
                        <span className="text-xs text-[#A3AAB5]">{company.parentCompanyName}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-bold bg-[#39D353]/10 text-[#39D353] border border-[#39D353]/25">
                      B2B Only
                    </span>
                  </div>

                  {/* Hero Image Area */}
                  <div className="flex-1 rounded-2xl bg-[#0B0F14] border border-[#1E2633] flex items-center justify-center p-4 sm:p-6 min-h-[220px] sm:min-h-[260px] lg:min-h-[300px] h-60 sm:h-72 lg:h-80 relative overflow-hidden group">
                    <Image
                      src={heroImageConfig.url}
                      alt={heroImageConfig.altText || 'MEHAR Battery Engineering Excellence'}
                      fill
                      priority
                      className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card footer pills */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {['EV Traction', 'Solar ESS', 'UPS & Industrial', 'Custom OEM'].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-lg bg-[#161C24] border border-[#1E2633] text-xs font-mono text-[#A3AAB5]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. PRODUCT CATEGORIES ─────────────────────────────────────────────── */}
      <section className="bg-[#0D1117] border-b border-[#1E2633] py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#39D353] mb-3 font-mono">Portfolio</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E6EAF0]">
                Industrial Battery Categories
              </h2>
              <p className="mt-3 text-base sm:text-lg lg:text-xl leading-relaxed text-[#A3AAB5]">
                Organised around commercial applications. Select a category to explore engineering attributes or submit project specifications.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm sm:text-base font-bold text-[#39D353] hover:text-[#2ec547] whitespace-nowrap shrink-0 transition-colors"
            >
              All Categories <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
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
                  className="group rounded-3xl border border-[#1E2633] bg-[#11161D] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#39D353]/50 hover:shadow-[0_0_25px_rgba(57,211,83,0.12)] flex flex-col justify-between"
                >
                  {/* Category Image Area */}
                  <div className="relative flex h-52 sm:h-60 lg:h-64 items-end justify-between rounded-2xl p-4 sm:p-5 mb-4 bg-[#0B0F14] border border-[#1E2633] overflow-hidden group-hover:border-[#39D353]/40 transition-colors">
                    <Image
                      src={categoryImgUrl}
                      alt={categoryImgAlt}
                      fill
                      className="object-contain p-3 sm:p-5 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="relative z-10 rounded-full bg-[#11161D]/90 backdrop-blur-md border border-[#1E2633] px-3.5 py-1 text-xs font-semibold text-[#E6EAF0] shadow-md">
                      {cat.keyApplications[0]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-2 sm:p-3 pt-2 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#E6EAF0] group-hover:text-[#39D353] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="mt-2 text-sm sm:text-base leading-relaxed text-[#A3AAB5] line-clamp-3">
                        {cat.description}
                      </p>
                    </div>
                    <span className="mt-5 inline-flex items-center gap-1 text-sm sm:text-base font-bold text-[#39D353]">
                      View category <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. HOW WE WORK / OEM ENGINEERING ─────────────────────────────────── */}
      <section className="bg-[#0B0F14] border-b border-[#1E2633] py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">

            {/* Left */}
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#39D353] mb-3 font-mono">How we work</p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E6EAF0]">
                Straightforward from first conversation to delivery.
              </h2>
              <p className="mt-4 text-base sm:text-lg leading-relaxed text-[#A3AAB5]">
                Need a non-standard form factor, specific voltage configuration, or dedicated communication protocol? Submit your exact project engineering constraints through our structured intake.
              </p>
              <div className="mt-8">
                <Button href="/oem-custom-solutions" variant="primary" size="lg" icon={<Factory className="w-4 h-4" />}>
                  Configure Custom OEM Solution
                </Button>
              </div>
            </div>

            {/* Right – numbered steps */}
            <div className="divide-y divide-[#1E2633] border-y border-[#1E2633]">
              {[
                {
                  n: '01',
                  title: 'Requirements Capture',
                  desc: 'Submit mechanical envelope, electrical parameters, BMS requirements, and target timeline via our structured intake.',
                },
                {
                  n: '02',
                  title: 'Engineering Feasibility Review',
                  desc: 'Our team reviews thermal dissipation, cell chemistry selection, and BMS architecture for your duty cycle.',
                },
                {
                  n: '03',
                  title: 'Prototype & Batch Quotation',
                  desc: 'Receive commercial batch pricing, MOQ parameters, and a sample delivery schedule for your requirement.',
                },
                {
                  n: '04',
                  title: 'Flexible OEM / ODM Options',
                  desc: 'Choose a catalogue system or build a tailored battery pack with custom casing, IP ratings, and branding.',
                },
              ].map((step) => (
                <div key={step.n} className="grid gap-4 py-6 sm:grid-cols-[70px_1fr]">
                  <span className="text-lg font-black text-[#39D353] font-mono">{step.n}</span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#E6EAF0]">{step.title}</h3>
                    <p className="mt-1.5 max-w-xl leading-relaxed text-[#A3AAB5] text-sm sm:text-base">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. APPLICATION SECTORS ────────────────────────────────────────────── */}
      <section className="bg-[#0D1117] border-b border-[#1E2633] py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          {/* Section header */}
          <div className="max-w-3xl mb-12 lg:mb-16">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#00A3FF] mb-3 font-mono">Industries we serve</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E6EAF0]">
              Application-Focused Battery Solutions
            </h2>
            <p className="mt-3 text-base sm:text-lg lg:text-xl leading-relaxed text-[#A3AAB5]">
              Each sector is supported through our structured engineering intake and Battery Finder wizard.
            </p>
          </div>

          {/* Application grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 xl:gap-6">
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
                  className="group rounded-2xl border border-[#1E2633] bg-[#11161D] p-5 hover:border-[#00A3FF]/50 hover:shadow-[0_0_20px_rgba(0,163,255,0.12)] transition-all duration-300 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-14 h-14 rounded-xl bg-[#0B0F14] border border-[#1E2633] p-1.5 relative overflow-hidden flex items-center justify-center group-hover:border-[#00A3FF]/40 transition-colors">
                        <Image
                          src={domainImgUrl}
                          alt={specificManaged?.altText || domain.name}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00A3FF] bg-[#00A3FF]/10 px-2 py-0.5 rounded border border-[#00A3FF]/25">
                        Finder
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-[#E6EAF0] group-hover:text-[#00A3FF] transition-colors leading-snug">
                      {domain.name}
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-[#A3AAB5] mt-1.5 line-clamp-2">
                      {domain.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-[#00A3FF]">
                    Find a solution <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. WHY MEHAR ─────────────────────────────────────────────────────── */}
      <section className="bg-[#0B0F14] border-b border-[#1E2633] py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          <div className="max-w-3xl mb-12 lg:mb-16">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#39D353] mb-3 font-mono">Why partner with us</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E6EAF0]">
              Engineering-first approach to battery supply.
            </h2>
            <p className="mt-3 text-base sm:text-lg lg:text-xl leading-relaxed text-[#A3AAB5]">
              We prioritise engineering rigour, application-focused requirements capture, and verified B2B commercial reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
            {[
              {
                icon: Cpu,
                title: 'Battery Engineering Support',
                desc: 'Direct engagement with application engineers to size voltage, continuous/peak discharge C-rates, and cell chemistry suited for your duty cycle.',
              },
              {
                icon: SlidersHorizontal,
                title: 'Requirements Capture Wizard',
                desc: 'Interactive Battery Finder and 8-step OEM configurator allow technical buyers to specify dimensional envelopes, thermal parameters, and BMS protocols.',
              },
              {
                icon: Factory,
                title: 'OEM / ODM Customisation',
                desc: 'Tailored battery pack manufacturing with custom sheet-metal casings, ingress ratings, wiring harnesses, and brand integration.',
              },
              {
                icon: FileSpreadsheet,
                title: 'Structured B2B RFQ Process',
                desc: 'Generate official quotation reference IDs with transparent volume tiers, delivery schedules, and technical requirement logs.',
              },
              {
                icon: ShieldCheck,
                title: 'Engineering Assessment',
                desc: 'Every OEM custom intake is reviewed by electrical and mechanical specialists before commercial batch quotations are released.',
              },
              {
                icon: Mail,
                title: 'Direct Technical Enquiry Desk',
                desc: 'Dedicated commercial sales email, technical engineering support, and verified WhatsApp intake for wholesale procurement managers.',
              },
            ].map((card) => (
              <div key={card.title} className="p-6 sm:p-8 rounded-3xl bg-[#11161D] border border-[#1E2633] shadow-xl hover:border-[#39D353]/40 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#39D353]/10 border border-[#39D353]/25 text-[#39D353] flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(57,211,83,0.15)]">
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#E6EAF0] mb-2.5">{card.title}</h3>
                <p className="text-sm sm:text-base leading-relaxed text-[#A3AAB5]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. B2B PROCUREMENT TOOLS ──────────────────────────────────────────── */}
      <section className="bg-[#0D1117] border-b border-[#1E2633] py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">

          <div className="max-w-3xl mb-12 lg:mb-16">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#39D353] mb-3 font-mono">Procurement suite</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E6EAF0]">
              B2B engineering &amp; sizing tools.
            </h2>
            <p className="mt-3 text-base sm:text-lg lg:text-xl leading-relaxed text-[#A3AAB5]">
              Discover our interactive tools to streamline technical scoping and wholesale procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {[
              { href: '/finder', icon: Search, title: 'Battery Finder', desc: 'Interactive wizard to match application parameters to battery models.' },
              { href: '/compare', icon: SlidersHorizontal, title: 'Compare Categories', desc: 'Side-by-side engineering comparison across all battery types.' },
              { href: '/rfq', icon: FileSpreadsheet, title: 'RFQ Builder', desc: 'Official commercial quotation builder for batch wholesale procurement.' },
              { href: '/oem-custom-solutions', icon: Factory, title: 'OEM Configurator', desc: 'Detailed 8-step technical intake for custom pack engineering.' },
              { href: '/tools', icon: Wrench, title: 'Engineering Calculators', desc: 'Sizing tools for battery capacity, C-rate, runtime, and power.' },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col justify-between p-6 rounded-2xl bg-[#11161D] border border-[#1E2633] hover:border-[#39D353]/50 hover:shadow-[0_0_20px_rgba(57,211,83,0.12)] transition-all duration-300 gap-4"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-[#39D353]/10 border border-[#39D353]/25 text-[#39D353] flex items-center justify-center shadow-[0_0_12px_rgba(57,211,83,0.1)]">
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#E6EAF0] group-hover:text-[#39D353] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#A3AAB5]">{tool.desc}</p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#39D353] flex items-center gap-1">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-16 sm:py-20 lg:py-28">
        <div className="rounded-3xl bg-gradient-to-br from-[#11161D] to-[#161C24] border border-[#39D353]/30 px-8 py-12 sm:px-12 sm:py-16 lg:px-16 lg:py-20 shadow-[0_0_40px_rgba(57,211,83,0.08)] relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#39D353]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative z-10">
            <div className="max-w-3xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#39D353] mb-3 font-mono">
                Let&apos;s build the right system
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#E6EAF0]">
                Have a battery requirement?
              </h2>
              <p className="mt-3 text-base sm:text-lg lg:text-xl leading-relaxed text-[#A3AAB5]">
                Share your application and target specifications. Our team will help you find the clearest next step.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shrink-0">
              <Button href="/rfq" variant="primary" size="lg" icon={<ArrowUpRight className="w-4 h-4" />}>
                Start an Enquiry (RFQ)
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
