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
      id: 'inverters-ups',
      title: 'Home & Commercial Inverters / UPS',
      categorySlug: 'energy-storage-inverter-batteries',
      icon: Home,
      badge: 'Backup Power',
      image: imgInverter.url,
      altText: imgInverter.altText,
      description:
        'Maintenance-free lithium backup batteries engineered to replace heavy lead-acid systems with 3x longer life and fast recharge.',
      points: [
        'Fast recharging capability to handle frequent grid load-shedding cycles',
        'Zero acid fumes, zero water top-ups, and 70% floor footprint reduction',
        'Wide compatibility with standard hybrid and pure sine wave inverters',
      ],
    },
    {
      id: 'material-handling',
      title: 'Material Handling & Industrial Forklifts',
      categorySlug: 'custom-oem-industrial-batteries',
      icon: Factory,
      badge: 'Industrial Logistics',
      image: imgMaterialHandling.url,
      altText: imgMaterialHandling.altText,
      description:
        'Continuous multi-shift traction power for electric forklifts, pallet trucks, stackers, and automated airport ground support equipment.',
      points: [
        'Opportunity charging allows rapid top-up during operator tea breaks',
        'Eliminates dedicated battery swap rooms and acid handling risks',
        'Integrated BMS communication with equipment motor controllers',
      ],
    },
    {
      id: 'telecom',
      title: 'Telecom Towers & Base Stations',
      categorySlug: 'custom-oem-industrial-batteries',
      icon: Radio,
      badge: 'Telecom Infrastructure',
      image: imgTelecom.url,
      altText: imgTelecom.altText,
      description:
        'High-reliability standard 48V / 51.2V rack-mounted battery banks designed for remote, off-grid, and edge telecom installations.',
      points: [
        'Standard 19-inch rack-mount chassis for standard telecom server cabinets',
        'Remote monitoring via SNMP and dry contact alarm outputs',
        'Stable electrochemical performance in extreme ambient heat up to 55°C',
      ],
    },
    {
      id: 'robotics',
      title: 'AGVs, AMRs & Factory Robotics',
      categorySlug: 'custom-oem-industrial-batteries',
      icon: Bot,
      badge: 'Automation',
      image: imgRobotics.url,
      altText: imgRobotics.altText,
      description:
        'High-density, rapid-charging battery packs powering autonomous mobile robots, automated guided vehicles, and warehouse sorting systems.',
      points: [
        'Ultra-compact form factors engineered for low-profile chassis cavities',
        'Supports high-current automated opportunity charging contact pads',
        'Precision SoC reporting over CANopen / Modbus for automated docking',
      ],
    },
    {
      id: 'drones',
      title: 'Agricultural & Commercial UAVs / Drones',
      categorySlug: 'custom-oem-industrial-batteries',
      icon: Plane,
      badge: 'Aerospace',
      image: imgDrones.url,
      altText: imgDrones.altText,
      description:
        'High-discharge-rate lightweight lithium battery packs designed to maximize flight payload capacity and airborne endurance.',
      points: [
        'Optimized energy-to-weight ratio for extended flight duration',
        'High continuous burst C-rates for stable hover in turbulent winds',
        'Intelligent BMS with cell-level temperature tracking and telemetry',
      ],
    },
    {
      id: 'medical',
      title: 'Medical Carts & Portable Healthcare Devices',
      categorySlug: 'custom-oem-industrial-batteries',
      icon: HeartPulse,
      badge: 'Healthcare',
      image: imgMedical.url,
      altText: imgMedical.altText,
      description:
        'Safety-certified, dependable backup packs for hospital mobile workstations, mobile diagnostic imaging, and emergency life-support apparatus.',
      points: [
        'Strict multi-redundant safety BMS protection circuitry',
        'Zero electromagnetic interference with sensitive clinical diagnostic gear',
        'Long standby shelf life with ultra-low self-discharge rates',
      ],
    },
  ];

  return (
    <div className="py-12 space-y-16 bg-theme-base text-theme-primary transition-colors duration-200">
      {/* Header */}
      <div className="max-w-[1440px] 2xl:max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="p-8 sm:p-12 rounded-3xl bg-theme-card border border-theme-border shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-theme-blue/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <Badge variant="blue">Target Sectors</Badge>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-theme-primary tracking-tight">
              Applications &amp; Industries
            </h1>
            <p className="text-sm sm:text-base text-theme-secondary leading-relaxed">
              Discover how <strong className="text-theme-primary">{COMPANY_INFO.brandName}</strong> battery solutions, manufactured by <strong className="text-theme-primary">{COMPANY_INFO.parentCompanyName}</strong>, power key commercial sectors across India. Every sector visual is independently configurable from the Admin CMS.
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
              className="bg-theme-card border border-theme-border hover:border-theme-blue/50 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl p-7 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Visual Header Box */}
                <div className="relative aspect-[4/3] rounded-2xl bg-theme-base border border-theme-border overflow-hidden group-hover:border-theme-blue/40 transition-colors">
                  <Image
                    src={app.image}
                    alt={app.altText || app.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge variant="blue">{app.badge}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-theme-blue/10 border border-theme-blue/25 flex items-center justify-center text-theme-blue shrink-0">
                    <app.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-theme-primary leading-snug">{app.title}</h3>
                </div>
                <p className="text-xs text-theme-secondary leading-relaxed">
                  {app.description}
                </p>

                <div className="pt-3 border-t border-theme-border space-y-2">
                  <span className="text-[11px] font-mono text-theme-secondary block font-bold uppercase tracking-wider">
                    Key Technical Demands:
                  </span>
                  {app.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-theme-primary">
                      <span className="w-1.5 h-1.5 rounded-full bg-theme-green mt-1.5 shrink-0"></span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-theme-border flex items-center justify-between">
                <Link
                  href={`/products/${app.categorySlug}`}
                  className="text-xs font-bold text-theme-blue hover:underline flex items-center gap-1"
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
