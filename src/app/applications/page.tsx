import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { COMPANY_INFO } from '@/data/companyInfo';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { getSitePlaceholderImage } from '@/lib/siteImages';
import {
  Bike,
  Truck,
  Sun,
  Home,
  Factory,
  Radio,
  Bot,
  Plane,
  HeartPulse,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';

export const metadata = {
  title: 'Applications & Industries Served | MEHAR B2B Solutions',
  description: 'Explore the key industries powered by MEHAR battery systems: Electric 2W, E-Rickshaws, Solar ESS, Inverters, Robotics, Drones, and Industrial Equipment.',
};

export const dynamic = 'force-dynamic';

export default async function ApplicationsPage() {
  const [
    imgMobility2W,
    imgMobility3W,
    imgSolar,
    imgInverter,
    imgMaterialHandling,
    imgTelecom,
    imgRobotics,
    imgDrones,
    imgMedical,
  ] = await Promise.all([
    getSitePlaceholderImage('app_electric_mobility'),
    getSitePlaceholderImage('homepage_electric_3w'),
    getSitePlaceholderImage('app_solar_ess'),
    getSitePlaceholderImage('app_ups_inverter'),
    getSitePlaceholderImage('app_material_handling'),
    getSitePlaceholderImage('app_telecom_infrastructure'),
    getSitePlaceholderImage('app_robotics_automation'),
    getSitePlaceholderImage('app_drones_uav'),
    getSitePlaceholderImage('app_medical_specialized'),
  ]);

  const applications = [
    {
      id: 'e-2w',
      title: 'Electric 2-Wheelers & Urban Mobility',
      categorySlug: 'electric-2-wheeler-batteries',
      icon: Bike,
      badge: 'E-Mobility',
      image: imgMobility2W.url,
      altText: imgMobility2W.altText,
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
      image: imgMobility3W.url,
      altText: imgMobility3W.altText,
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
      image: imgSolar.url,
      altText: imgSolar.altText,
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
      image: imgInverter.url,
      altText: imgInverter.altText,
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
      image: imgMaterialHandling.url,
      altText: imgMaterialHandling.altText,
      description:
        'Robust, high-power motive battery solutions for warehouse forklifts, automated guided vehicles (AGVs), and industrial machinery.',
      points: [
        'High peak pulse current delivery for heavy load lifting',
        'Opportunity charging capability to enable multi-shift operations',
        'Custom voltage configurations tailored to machinery drive motors',
      ],
    },
    {
      id: 'robotics-agv',
      title: 'Robotics, AGVs & Autonomous Mobile Units',
      categorySlug: 'custom-oem-industrial-batteries',
      icon: Bot,
      badge: 'Automation',
      image: imgRobotics.url,
      altText: imgRobotics.altText,
      description:
        'Compact, high-drain modular packs engineered for warehouse robots, sorting automation, and industrial automated guided vehicles.',
      points: [
        'Rapid contact-plate docking charge capability',
        'Low profile dimensions for slim automated chassis integration',
        'Isolated communication bus for motor drive protection',
      ],
    },
    {
      id: 'drones-uav',
      title: 'Drones & Unmanned Aerial Systems',
      categorySlug: 'custom-oem-industrial-batteries',
      icon: Plane,
      badge: 'Aerospace',
      image: imgDrones.url,
      altText: imgDrones.altText,
      description:
        'Ultra-lightweight high-discharge lithium packs built for commercial agriculture sprayers, mapping drones, and aerial delivery systems.',
      points: [
        'Optimized gravimetric energy density to extend flight endurance',
        'High burst pulse current for takeoff and payload maneuvers',
        'Integrated cell voltage telemetry and temperature monitoring',
      ],
    },
    {
      id: 'telecom',
      title: 'Telecom & Infrastructure Storage',
      categorySlug: 'energy-storage-inverter-batteries',
      icon: Radio,
      badge: 'Infrastructure',
      image: imgTelecom.url,
      altText: imgTelecom.altText,
      description:
        'High-reliability standard rack-mounted storage banks designed for remote base transceiver stations (BTS) and utility installations.',
      points: [
        'Standard 19-inch server-rack form factor availability',
        'Remote telemetry reporting for central station monitoring',
        'Stable performance across wide ambient temperature spans',
      ],
    },
    {
      id: 'medical-devices',
      title: 'Medical & Mobile Healthcare Equipment',
      categorySlug: 'custom-oem-industrial-batteries',
      icon: HeartPulse,
      badge: 'Medical',
      image: imgMedical.url,
      altText: imgMedical.altText,
      description:
        'Mission-critical backup and mobile power packs for hospital equipment, mobile diagnostic carts, and emergency medical tools.',
      points: [
        'Redundant safety cutoff and fail-safe BMS protection',
        'Clean DC output with minimal harmonic distortion',
        'Sealed hygienic casings for clinical sterilization environments',
      ],
    },
  ];

  return (
    <div className="py-12 space-y-16 bg-[#0B0F14] text-[#E6EAF0]">
      {/* Header */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#11161D] border border-[#1E2633] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00A3FF]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <Badge variant="blue">Target Sectors</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#E6EAF0] tracking-tight">
              Applications &amp; Industries
            </h1>
            <p className="text-sm sm:text-base text-[#A3AAB5] leading-relaxed">
              Discover how <strong className="text-[#E6EAF0]">{COMPANY_INFO.brandName}</strong> battery solutions, manufactured by <strong className="text-[#E6EAF0]">{COMPANY_INFO.parentCompanyName}</strong>, power key commercial sectors across India. Every sector visual is independently configurable from the Admin CMS.
            </p>
          </div>
        </div>
      </div>

      {/* Applications Grid */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-[#11161D] border border-[#1E2633] hover:border-[#00A3FF]/50 hover:shadow-[0_0_25px_rgba(0,163,255,0.12)] transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Visual Header Box */}
                <div className="relative h-48 rounded-xl bg-[#0B0F14] border border-[#1E2633] overflow-hidden flex items-center justify-center p-3 group-hover:border-[#00A3FF]/40 transition-colors">
                  <Image
                    src={app.image}
                    alt={app.altText || app.title}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="blue">{app.badge}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-[#00A3FF]/10 border border-[#00A3FF]/25 flex items-center justify-center text-[#00A3FF] shrink-0">
                    <app.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-[#E6EAF0] leading-snug">{app.title}</h3>
                </div>
                <p className="text-xs text-[#A3AAB5] leading-relaxed">
                  {app.description}
                </p>

                <div className="pt-3 border-t border-[#1E2633] space-y-2">
                  <span className="text-[11px] font-mono text-[#A3AAB5] block font-bold uppercase tracking-wider">
                    Key Technical Demands:
                  </span>
                  {app.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#E6EAF0]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39D353] mt-1.5 shrink-0"></span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-[#1E2633] flex items-center justify-between">
                <Link
                  href={`/products/${app.categorySlug}`}
                  className="text-xs font-bold text-[#00A3FF] hover:underline flex items-center gap-1"
                >
                  View Category <ArrowRight className="w-3.5 h-3.5" />
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
