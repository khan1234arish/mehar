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

const CATEGORY_IMAGE_KEY_MAP: Record<string, string> = {
  'electric-2-wheeler-batteries': 'homepage_electric_2w',
  'electric-3-wheeler-batteries': 'homepage_electric_3w',
  'energy-storage-inverter-batteries': 'homepage_ess_inverter',
  'solar-renewable-energy-batteries': 'homepage_solar_renewable',
  'ev-chargers-power-units': 'homepage_ev_chargers',
  'custom-oem-industrial-batteries': 'homepage_custom_oem',
};

const APPLICATION_IMAGE_KEY_MAP: Record<string, string> = {
  'electric-mobility': 'app_electric_mobility',
  'solar-renewable-energy': 'app_solar_ess',
  'ups-inverter-backup': 'app_ups_inverter',
  'industrial-machinery-equipment': 'app_industrial_equipment',
  'material-handling-forklifts': 'app_material_handling',
  'robotics-automation-agv': 'app_robotics_automation',
  'drones-uav-aerospace': 'app_drones_uav',
  'medical-healthcare-devices': 'app_medical_specialized',
  'telecom-infrastructure': 'app_telecom_infrastructure',
  'marine-defense-specialized': 'app_marine_rv',
};

export default async function HomePage() {
  const [
    company,
    sales,
    content,
    heroImageConfig,
    categoryFallback,
    productFallback,
    applicationFallback,
    // Category-specific managed images
    imgCat2W,
    imgCat3W,
    imgCatESS,
    imgCatSolar,
    imgCatChargers,
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
    getSitePlaceholderImage('product_default'),
    getSitePlaceholderImage('application_default'),
    getSitePlaceholderImage('homepage_electric_2w'),
    getSitePlaceholderImage('homepage_electric_3w'),
    getSitePlaceholderImage('homepage_ess_inverter'),
    getSitePlaceholderImage('homepage_solar_renewable'),
    getSitePlaceholderImage('homepage_ev_chargers'),
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
    'ev-chargers-power-units': imgCatChargers,
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
    <div className="bg-white text-[#0F172A]">

      {/* ── 1. HERO ───────────────────────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E2E8F0] pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">

            {/* Left – headline + CTAs (58% desktop width) */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-6">

              {/* Eyebrow */}
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#059669]">
                Battery systems for a moving world
              </p>

              {/* Main headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-4xl xl:text-5xl font-black leading-[1.12] tracking-tight text-[#0F172A]">
                {content.heroHeadline || 'High-Performance Battery Systems for Next-Gen Mobility & ESS'}
              </h1>

              {/* Sub-text */}
              <p className="text-base sm:text-lg leading-relaxed text-[#475569] max-w-xl">
                {content.heroSubheadline || 'Battery systems and energy solutions for business applications.'}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-1">
                <Button href="/products" variant="primary" size="md" icon={<ArrowRight className="w-4 h-4" />}>
                  Explore Products
                </Button>
                <Button href="/rfq" variant="secondary" size="md">
                  Request a Quote
                </Button>
                <Button href="/contact" variant="outline" size="md">
                  Talk to Our Team
                </Button>
              </div>

              {/* Trust pillars */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-4 border-t border-[#E2E8F0] text-xs sm:text-sm text-[#475569]">
                <span><strong className="text-[#0F172A] font-bold">B2B</strong> Supply</span>
                <span><strong className="text-[#0F172A] font-bold">OEM</strong> Support</span>
                <span><strong className="text-[#0F172A] font-bold">Custom</strong> Engineering</span>
              </div>
            </div>

            {/* Right – product showcase card with Independently Managed Hero Visual (42% desktop width) */}
            <div className="lg:col-span-5 xl:col-span-5">
              <div className="rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 sm:p-3 shadow-sm">
                <div className="flex flex-col justify-between min-h-[340px] sm:min-h-[380px] rounded-2xl bg-white border border-[#E2E8F0] p-5 sm:p-6 space-y-4">
                  {/* Card header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center">
                        <BatteryCharging className="w-4 h-4 text-[#059669]" />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold text-[#059669] block">MEHAR Battery Systems</span>
                        <span className="text-[11px] text-[#64748B]">{company.parentCompanyName}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                      B2B Only
                    </span>
                  </div>

                  {/* Hero Image Area */}
                  <div className="flex-1 rounded-2xl bg-[#F0FDF4]/40 border border-[#DCFCE7] flex items-center justify-center p-4 min-h-[180px] sm:min-h-[200px] h-48 sm:h-52 relative overflow-hidden">
                    <Image
                      src={heroImageConfig.url}
                      alt={heroImageConfig.altText || 'MEHAR Battery Engineering Excellence'}
                      fill
                      priority
                      className="object-contain p-2 hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Card footer pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {['EV Traction', 'Solar ESS', 'UPS & Industrial', 'Custom OEM'].map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] text-[11px] font-medium text-[#334155]"
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

      {/* ── 2. PRODUCT CATEGORIES (Independently Configurable Cards) ───────────── */}
      <section className="bg-white border-b border-[#E2E8F0] py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#059669] mb-3">What we make</p>
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black tracking-tight text-[#0F172A]">
                Industrial Battery Categories
              </h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#475569]">
                Organised around commercial applications. Select a category to explore engineering attributes or submit project specifications.
              </p>
            </div>
            <Link
              href="/products"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-[#059669] hover:text-[#047857] whitespace-nowrap shrink-0 transition-colors"
            >
              All Categories <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Category grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BROAD_CATEGORIES.map((cat) => {
              const verifiedImg = verifiedProductImages[cat.slug] || verifiedProductImages[cat.id];
              const specificManaged = managedCategoryImages[cat.slug];

              // Priority: Verified Product DB Image -> Specific Managed Category Image -> Category Default Asset -> Safe Fallback
              const categoryImgUrl =
                verifiedImg?.url ||
                specificManaged?.url ||
                cat.defaultImage ||
                categoryFallback.url ||
                '/assets/logo/mehar-symbol.svg';

              const categoryImgAlt = verifiedImg?.altText || specificManaged?.altText || cat.name;

              return (
                <Link
                  key={cat.id}
                  href={`/products/${cat.slug}`}
                  className="group rounded-3xl border border-[#E2E8F0] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#059669] hover:shadow-lg flex flex-col justify-between"
                >
                  {/* Category Image Area */}
                  <div className="relative flex h-48 sm:h-52 items-end justify-between rounded-2xl p-4 mb-2 bg-[#F8FAFC] border border-[#E2E8F0] overflow-hidden group-hover:border-[#A7F3D0] transition-colors">
                    <Image
                      src={categoryImgUrl}
                      alt={categoryImgAlt}
                      fill
                      className="object-contain p-3 sm:p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="relative z-10 rounded-full bg-white/95 backdrop-blur-sm border border-[#E2E8F0] px-3 py-1 text-xs font-semibold text-[#334155] shadow-sm">
                      {cat.keyApplications[0]}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-2 sm:p-3 pt-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] group-hover:text-[#059669] transition-colors">
                        {cat.name}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-[#475569] line-clamp-3">
                        {cat.description}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#059669]">
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
      <section className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-14">

            {/* Left */}
            <div>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#059669] mb-3">How we work</p>
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black tracking-tight text-[#0F172A]">
                Straightforward from first conversation to delivery.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#475569]">
                Need a non-standard form factor, specific voltage configuration, or dedicated communication protocol? Submit your exact project engineering constraints through our structured intake.
              </p>
              <div className="mt-6">
                <Button href="/oem-custom-solutions" variant="primary" size="md" icon={<Factory className="w-4 h-4" />}>
                  Configure Custom OEM Solution
                </Button>
              </div>
            </div>

            {/* Right – numbered steps */}
            <div className="divide-y divide-[#E2E8F0] border-y border-[#E2E8F0]">
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
                <div key={step.n} className="grid gap-3 py-5 sm:grid-cols-[60px_1fr]">
                  <span className="text-sm font-black text-[#059669]">{step.n}</span>
                  <div>
                    <h3 className="text-lg font-bold text-[#0F172A]">{step.title}</h3>
                    <p className="mt-1.5 max-w-lg leading-6 text-[#475569] text-sm">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. APPLICATION SECTORS (Independently Configurable Sector Visuals) ── */}
      <section className="bg-white border-b border-[#E2E8F0] py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="max-w-2xl mb-10">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#059669] mb-3">Industries we serve</p>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black tracking-tight text-[#0F172A]">
              Application-Focused Battery Solutions
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#475569]">
              Each sector is supported through our structured engineering intake and Battery Finder wizard.
            </p>
          </div>

          {/* Application grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {APPLICATION_DOMAINS.map((domain) => {
              const specificManaged = managedAppImages[domain.id];
              // Priority: Specific Application Image -> Domain Default Asset -> Generic Application Fallback
              const domainImgUrl =
                specificManaged?.url ||
                domain.defaultImage ||
                applicationFallback.url ||
                '/assets/logo/mehar-symbol.svg';

              return (
                <Link
                  key={domain.id}
                  href={`/finder?domain=${domain.id}`}
                  className="group rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5 hover:border-[#059669] hover:shadow-md transition-all flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-11 h-11 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-1.5 relative overflow-hidden flex items-center justify-center group-hover:border-[#A7F3D0] transition-colors">
                        <Image
                          src={domainImgUrl}
                          alt={specificManaged?.altText || domain.name}
                          fill
                          className="object-contain p-1 group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#059669] bg-[#ECFDF5] px-2 py-0.5 rounded border border-[#A7F3D0]">
                        Finder
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#059669] transition-colors leading-snug">
                      {domain.name}
                    </h3>
                    <p className="text-xs leading-5 text-[#475569] mt-1.5 line-clamp-2">
                      {domain.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-[#059669]">
                    Find a solution <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. WHY MEHAR ─────────────────────────────────────────────────────── */}
      <section className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-10">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#059669] mb-3">Why partner with us</p>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black tracking-tight text-[#0F172A]">
              Engineering-first approach to battery supply.
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#475569]">
              We prioritise engineering rigour, application-focused requirements capture, and verified B2B commercial reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
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
              <div key={card.title} className="p-6 sm:p-7 rounded-2xl bg-white border border-[#E2E8F0] shadow-sm">
                <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-4">
                  <card.icon className="w-5 h-5" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#0F172A] mb-2">{card.title}</h3>
                <p className="text-sm leading-6 text-[#475569]">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. B2B PROCUREMENT TOOLS ──────────────────────────────────────────── */}
      <section className="bg-white border-b border-[#E2E8F0] py-14 sm:py-18 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="max-w-2xl mb-10">
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#059669] mb-3">Procurement suite</p>
            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black tracking-tight text-[#0F172A]">
              B2B engineering &amp; sizing tools.
            </h2>
            <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#475569]">
              Discover our interactive tools to streamline technical scoping and wholesale procurement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
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
                className="group flex flex-col justify-between p-5 sm:p-6 rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#059669] hover:shadow-md transition-all gap-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center">
                    <tool.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#0F172A] group-hover:text-[#059669] transition-colors">
                      {tool.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm leading-5 text-[#475569]">{tool.desc}</p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#059669] flex items-center gap-1">
                  Open <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-18 lg:py-20">
        <div className="rounded-3xl bg-[#ECFDF5] border border-[#A7F3D0] px-8 py-10 sm:px-12 sm:py-14 lg:px-16 lg:py-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#065F46] mb-3">
                Let&apos;s build the right system
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-4xl font-black tracking-tight text-[#0F172A]">
                Have a battery requirement?
              </h2>
              <p className="mt-3 text-base sm:text-lg leading-relaxed text-[#334155]">
                Share your application and target specifications. Our team will help you find the clearest next step.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shrink-0">
              <Button href="/rfq" variant="primary" size="md" icon={<ArrowUpRight className="w-4 h-4" />}>
                Start an Enquiry (RFQ)
              </Button>
              <Button href="/contact" variant="secondary" size="md">
                Contact Sales Desk
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
