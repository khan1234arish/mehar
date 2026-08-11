import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BROAD_CATEGORIES } from '@/data/categories';
import { COMPANY_INFO } from '@/data/companyInfo';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PlaceholderNotice from '@/components/ui/PlaceholderNotice';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Zap,
  BatteryCharging,
  Settings2,
  FileSpreadsheet,
  CheckCircle2,
  Factory,
  ArrowUpRight,
  Truck,
  Bike,
  Sun,
  Home,
  Radio,
  SlidersHorizontal,
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 overflow-hidden border-b border-[#1E293B]">
        {/* Subtle Industrial Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#00F59B]/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-[#00D2FF]/5 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0F172A] border border-[#1E293B] text-xs font-mono text-[#00D2FF]">
                <span className="w-2 h-2 rounded-full bg-[#00F59B] animate-pulse"></span>
                <span>OFFICIAL B2B MANUFACTURING PLATFORM</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                High-Performance <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F59B] via-[#00D2FF] to-white">
                  Battery Systems
                </span>{' '}
                for Next-Gen Mobility & ESS
              </h1>

              <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
                Engineered and manufactured by <strong className="text-white">{COMPANY_INFO.parentCompanyName}</strong> under brand <strong className="text-white">{COMPANY_INFO.brandName}</strong>. Supplying robust, industrial-grade battery solutions for EV OEMs, solar integrators, and B2B distributors.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Button
                  href="/products"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore Product Portfolio
                </Button>

                <Button
                  href="/contact?type=rfq"
                  variant="outline"
                  size="lg"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Request a B2B Quote
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="pt-6 border-t border-[#1E293B]/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#CBD5E1]">
                <div className="flex items-center gap-2 font-mono">
                  <ShieldCheck className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>B2B & OEM Supply</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <Cpu className="w-4 h-4 text-[#00D2FF] shrink-0" />
                  <span>Smart BMS Telemetry</span>
                </div>
                <div className="flex items-center gap-2 font-mono col-span-2 sm:col-span-1">
                  <Factory className="w-4 h-4 text-[#00F59B] shrink-0" />
                  <span>Custom Pack Design</span>
                </div>
              </div>
            </div>

            {/* Right Hero Graphic Card */}
            <div className="lg:col-span-5">
              <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] shadow-2xl shadow-black/80 overflow-hidden">
                {/* Tech Badge */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#1E293B]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#00F59B]"></div>
                    <span className="text-xs font-mono text-white font-bold uppercase tracking-wider">
                      MEHAR Power Architecture
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#131F37] text-[#94A3B8] border border-[#1E293B]">
                    Industrial Grade
                  </span>
                </div>

                {/* Conceptual Battery Pack Graphic Visualization */}
                <div className="space-y-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-[#131F37]/80 border border-[#1E293B] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#00F59B]/10 flex items-center justify-center text-[#00F59B]">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-white font-bold block">Cell Level Engineering</span>
                        <span className="text-[11px] text-[#94A3B8]">Automated Laser Sorting & Sizing</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#00F59B] font-semibold">Active</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#131F37]/80 border border-[#1E293B] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#00D2FF]/10 flex items-center justify-center text-[#00D2FF]">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-white font-bold block">Integrated Smart BMS</span>
                        <span className="text-[11px] text-[#94A3B8]">CAN 2.0B / RS485 / Thermal Guard</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#00D2FF] font-semibold">Protected</span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#131F37]/80 border border-[#1E293B] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-white font-bold block">Enclosure & Ingress</span>
                        <span className="text-[11px] text-[#94A3B8]">Heavy-Duty Shock & Vibration Proof</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-yellow-400 font-semibold">IP Certified</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1E293B] flex items-center justify-between text-xs text-[#94A3B8]">
                  <span>Verification Status:</span>
                  <PlaceholderNotice message="Catalogue in Preparation" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BROAD CATEGORIES PORTFOLIO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Product Architecture"
          badgeVariant="green"
          title="Comprehensive B2B Battery Solutions"
          subtitle="Explore our broad category portfolio engineered for electric mobility, solar energy storage, and industrial equipment."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BROAD_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="bg-[#0F172A] border border-[#1E293B] hover:border-[#00F59B]/40 transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#131F37] border border-[#1E293B] flex items-center justify-center text-[#00F59B] group-hover:scale-105 transition-transform">
                    {cat.iconName === 'Bike' && <Bike className="w-6 h-6" />}
                    {cat.iconName === 'Truck' && <Truck className="w-6 h-6" />}
                    {cat.iconName === 'Home' && <Home className="w-6 h-6" />}
                    {cat.iconName === 'Sun' && <Sun className="w-6 h-6" />}
                    {cat.iconName === 'Zap' && <Zap className="w-6 h-6" />}
                    {cat.iconName === 'Cpu' && <Cpu className="w-6 h-6" />}
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                    Specs Coming Soon
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-[#00F59B] transition-colors mb-2">
                  {cat.name}
                </h3>

                <p className="text-xs text-[#94A3B8] leading-relaxed mb-6">
                  {cat.description}
                </p>
              </div>

              <div>
                {/* Key Applications */}
                <div className="pt-4 border-t border-[#1E293B] mb-5">
                  <span className="text-[11px] font-mono text-[#64748B] block mb-2">
                    Key Applications:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.keyApplications.map((app) => (
                      <span
                        key={app}
                        className="px-2.5 py-1 rounded-md bg-[#131F37] border border-[#1E293B] text-[11px] text-[#CBD5E1]"
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Link */}
                <Link
                  href={`/products/${cat.slug}`}
                  className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-lg bg-[#131F37] border border-[#1E293B] text-xs font-semibold text-white hover:text-[#00F59B] hover:border-[#00F59B]/30 transition-colors"
                >
                  <span>View Category Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OEM / ODM CUSTOM ENGINEERING PROCESS */}
      <section className="bg-[#050914] border-y border-[#1E293B] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="Custom OEM Capabilities"
            badgeVariant="blue"
            title="Custom Pack Engineering & Contract Manufacturing"
            subtitle="From initial application specifications to thermal simulation, smart BMS architecture, and mass production."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              {
                step: '01',
                title: 'Requirement Analysis',
                desc: 'Voltage, target C-rate, dimension envelope, and operational duty cycle scoping.',
              },
              {
                step: '02',
                title: 'Cell & Chemistry Sourcing',
                desc: 'Optimal cell chemistry selection (LiFePO4, NMC) and automated capacity sorting.',
              },
              {
                step: '03',
                title: 'BMS & Telemetry Design',
                desc: 'Tailored BMS programming with CAN, RS485, active balancing, and thermal cutoff.',
              },
              {
                step: '04',
                title: 'Prototyping & Validation',
                desc: 'Sample pack build, vibration, charge-discharge endurance, and temperature validation.',
              },
              {
                step: '05',
                title: 'Mass B2B Production',
                desc: 'Automated laser welding assembly and batch delivery to your manufacturing facility.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 relative overflow-hidden"
              >
                <span className="text-2xl font-extrabold font-mono text-[#00D2FF]/30 block mb-3">
                  {item.step}
                </span>
                <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-[#94A3B8] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button
              href="/contact?type=oem"
              variant="secondary"
              size="md"
              icon={<SlidersHorizontal className="w-4 h-4" />}
            >
              Start an OEM Custom Battery Consultation
            </Button>
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY & QUALITY PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          badge="Engineering & Safety"
          badgeVariant="green"
          title="Technology & BMS Architecture"
          subtitle="Engineered with multi-layered safety mechanisms and robust thermal management."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#00F59B]/10 border border-[#00F59B]/20 flex items-center justify-center text-[#00F59B]">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Cell Chemistry Excellence</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Utilizing stable Lithium Iron Phosphate (LiFePO4) and high-energy NMC cells sorted rigorously for consistent internal resistance and capacity matching.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#00D2FF]/10 border border-[#00D2FF]/20 flex items-center justify-center text-[#00D2FF]">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Smart Telemetry BMS</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Equipped with real-time multi-point temperature sensors, over-voltage/under-voltage protection, short-circuit cutoff, and CANbus/RS485 communication protocols.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#0F172A] border border-[#1E293B] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/20 flex items-center justify-center text-[#10B981]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Automated Assembly</h3>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Precision spot and laser welding, standardized insulation barriers, and heavy-duty structural enclosures designed for high vibration durability.
            </p>
          </div>
        </div>
      </section>

      {/* 5. INDUSTRIES SERVED */}
      <section className="bg-[#050914] border-t border-[#1E293B] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            badge="B2B Applications"
            badgeVariant="blue"
            title="Industries & Use Cases"
            subtitle="Supplying tailored power systems across key mobility and infrastructure sectors."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
            {[
              { label: 'Electric 2-Wheelers', icon: Bike },
              { label: 'E-Rickshaw Fleets', icon: Truck },
              { label: 'Solar & ESS', icon: Sun },
              { label: 'Inverter Backup', icon: Home },
              { label: 'Telecom Towers', icon: Radio },
              { label: 'Custom Industrial', icon: Factory },
            ].map((ind) => (
              <div
                key={ind.label}
                className="p-5 rounded-xl bg-[#0F172A] border border-[#1E293B] hover:border-[#00D2FF]/40 transition-colors flex flex-col items-center justify-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#131F37] flex items-center justify-center text-[#00D2FF]">
                  <ind.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-white">{ind.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. B2B CONVERSION / RFQ CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#0C1528] to-[#050914] border border-[#1E293B] relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <Badge variant="green">B2B Procurement & Supply</Badge>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Discuss Your Battery Supply Requirements?
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl">
              Connect with our technical sales engineers for bulk inquiries, custom OEM battery pack development, or dealership opportunities.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Button
              href="/contact?type=rfq"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Submit RFQ / Inquiry
            </Button>

            <Button
              href="/contact"
              variant="outline"
              size="lg"
            >
              Contact Sales Desk
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
