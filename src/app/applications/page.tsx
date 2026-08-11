import React from 'react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/data/companyInfo';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import {
  Bike,
  Truck,
  Sun,
  Home,
  Factory,
  Radio,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

export const metadata = {
  title: 'Applications & Industries Served | MEHAR B2B Solutions',
  description: 'Explore the key industries powered by MEHAR battery systems: Electric 2W, E-Rickshaws, Solar ESS, Inverters, and Industrial Equipment.',
};

export default function ApplicationsPage() {
  const applications = [
    {
      id: 'e-2w',
      title: 'Electric 2-Wheelers & Urban Mobility',
      categorySlug: 'electric-2-wheeler-batteries',
      icon: Bike,
      badge: 'E-Mobility',
      description:
        'Tailored battery packs for personal e-scooters, electric motorcycles, and heavy-duty delivery fleets requiring high energy density and compact dimensions.',
      points: [
        'High continuous C-rate discharge capability for gradient climbs',
        'Thermal dissipation architecture for tropical operating temperatures',
        'CANbus / RS485 telemetry for vehicle instrument cluster integration',
      ],
    },
    {
      id: 'e-3w',
      title: 'Commercial 3-Wheelers & E-Rickshaws',
      categorySlug: 'electric-3-wheeler-batteries',
      icon: Truck,
      badge: 'Commercial Fleet',
      description:
        'Heavy-duty traction packs built for 100+ km daily commercial operations in passenger E-Rickshaws and L5 cargo logistics.',
      points: [
        'Reinforced casing engineered to withstand severe road vibration',
        'Optimized for rapid turnaround and fast-charging cycles',
        'High cyclic life to maximize total cost of ownership (TCO) efficiency',
      ],
    },
    {
      id: 'solar-ess',
      title: 'Solar & Renewable Energy Storage',
      categorySlug: 'solar-renewable-energy-batteries',
      icon: Sun,
      badge: 'Renewables',
      description:
        'Deep-cycle energy storage systems designed to absorb high solar peak generation and deliver steady power during non-solar hours.',
      points: [
        'High charge acceptance from MPPT and solar inverter controllers',
        'Deep depth-of-discharge (DoD) resilience without capacity memory effect',
        'Modular scalable rack designs for residential and commercial microgrids',
      ],
    },
    {
      id: 'inverter-backup',
      title: 'Residential & Commercial Inverter Systems',
      categorySlug: 'energy-storage-inverter-batteries',
      icon: Home,
      badge: 'Backup Power',
      description:
        'Continuous power backup solutions for residential home inverters, retail commercial facilities, and sensitive mission-critical equipment.',
      points: [
        'Seamless compatibility with standard sine wave inverter topologies',
        'Zero-maintenance sealed construction options with intelligent BMS',
        'Fast recharging capability following grid outages',
      ],
    },
    {
      id: 'industrial-traction',
      title: 'Material Handling & Specialized Equipment',
      categorySlug: 'custom-oem-industrial-batteries',
      icon: Factory,
      badge: 'Industrial',
      description:
        'Robust, high-power motive battery solutions for warehouse forklifts, automated guided vehicles (AGVs), and industrial machinery.',
      points: [
        'High peak pulse current delivery for heavy load lifting',
        'Opportunity charging capability to enable multi-shift operations',
        'Custom voltage configurations tailored to machinery drive motors',
      ],
    },
    {
      id: 'telecom',
      title: 'Telecom & Infrastructure Storage',
      categorySlug: 'energy-storage-inverter-batteries',
      icon: Radio,
      badge: 'Infrastructure',
      description:
        'High-reliability standard rack-mounted storage banks designed for remote base transceiver stations (BTS) and utility installations.',
      points: [
        'Standard 19-inch server-rack form factor availability',
        'Remote telemetry reporting for central station monitoring',
        'Stable performance across wide ambient temperature spans',
      ],
    },
  ];

  return (
    <div className="py-12 space-y-16 bg-white text-[#0F172A]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <div className="max-w-3xl space-y-4">
            <Badge variant="green">Target Sectors</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0F172A] tracking-tight">
              Applications & Industries
            </h1>
            <p className="text-sm sm:text-base text-[#475569] leading-relaxed">
              Discover how <strong className="text-[#0F172A]">{COMPANY_INFO.brandName}</strong> battery solutions, manufactured by <strong className="text-[#0F172A]">{COMPANY_INFO.parentCompanyName}</strong>, power key commercial sectors across India.
            </p>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-white border border-[#E2E8F0] hover:border-[#059669] hover:shadow-md transition-all rounded-2xl p-8 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-[#059669]">
                    <app.icon className="w-6 h-6" />
                  </div>
                  <Badge variant="blue">{app.badge}</Badge>
                </div>

                <h3 className="text-xl font-bold text-[#0F172A]">{app.title}</h3>
                <p className="text-xs text-[#64748B] leading-relaxed">
                  {app.description}
                </p>

                <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
                  <span className="text-[11px] font-mono text-[#64748B] block font-bold uppercase tracking-wider">
                    Key Technical Demands:
                  </span>
                  {app.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#334155]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#059669] mt-1.5 shrink-0"></span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E2E8F0] flex items-center justify-between">
                <Link
                  href={`/products/${app.categorySlug}`}
                  className="text-xs font-bold text-[#059669] hover:underline flex items-center gap-1"
                >
                  View Related Category <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Button
                  href={`/contact?application=${app.id}&type=rfq`}
                  variant="ghost"
                  size="sm"
                  icon={<ArrowUpRight className="w-3 h-3" />}
                >
                  Inquire
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
