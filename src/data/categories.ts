export interface CategoryData {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  iconName: string;
  isPlaceholder: boolean;
  verificationStatus: 'UNVERIFIED_PLACEHOLDER' | 'PENDING_CLIENT_REVIEW' | 'CLIENT_VERIFIED';
  keyApplications: string[];
}

export const BROAD_CATEGORIES: CategoryData[] = [
  {
    id: 'cat-e-mobility-2w',
    name: 'Electric 2-Wheeler Batteries',
    slug: 'electric-2-wheeler-batteries',
    tagline: 'High-density battery systems for electric scooters, motorcycles, and e-bikes',
    description: 'Engineered for urban and commercial electric two-wheelers with advanced thermal management, high discharge stability, and multi-tier BMS protection.',
    iconName: 'Bike',
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    keyApplications: ['Electric Scooters', 'Electric Motorcycles', 'Delivery & Fleet E-Bikes'],
  },
  {
    id: 'cat-e-mobility-3w',
    name: 'Electric 3-Wheeler & E-Rickshaw Batteries',
    slug: 'electric-3-wheeler-batteries',
    tagline: 'Heavy-duty traction power for commercial passenger and cargo 3-wheelers',
    description: 'Designed for rigorous daily duty cycles, commercial mileage demands, and rapid turnaround in passenger E-Rickshaws and L5 cargo fleets.',
    iconName: 'Truck',
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    keyApplications: ['Passenger E-Rickshaws', 'L5 Cargo 3-Wheelers', 'Last-Mile Delivery Vehicles'],
  },
  {
    id: 'cat-ess-inverter',
    name: 'Energy Storage Systems (ESS) & Inverter Batteries',
    slug: 'energy-storage-inverter-batteries',
    tagline: 'Reliable power backup and storage for residential, commercial, and UPS installations',
    description: 'Advanced energy storage systems providing continuous backup power, deep cycle capability, and seamless inverter compatibility.',
    iconName: 'Home',
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    keyApplications: ['Residential Inverters', 'Commercial UPS Systems', 'Server & Telecom Rack Storage'],
  },
  {
    id: 'cat-solar-renewable',
    name: 'Solar & Renewable Energy Batteries',
    slug: 'solar-renewable-energy-batteries',
    tagline: 'Deep-cycle energy storage solutions for off-grid and hybrid solar installations',
    description: 'Optimized for solar charging profiles with high charge acceptance, deep discharge resilience, and long-term cyclic durability.',
    iconName: 'Sun',
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    keyApplications: ['Off-Grid Solar PV', 'Hybrid Solar Energy Storage', 'Microgrids & Rural Electrification'],
  },
  {
    id: 'cat-ev-chargers',
    name: 'EV Chargers & Power Electronics',
    slug: 'ev-chargers-power-electronics',
    tagline: 'Smart charging infrastructure for EV fleets and industrial power systems',
    description: 'Intelligent multi-stage battery chargers featuring automated cutoff, temperature monitoring, and high conversion efficiency.',
    iconName: 'Zap',
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    keyApplications: ['Fleet Depot Charging', 'Commercial Fast Charging', 'Battery Swapping Stations'],
  },
  {
    id: 'cat-custom-oem',
    name: 'Custom OEM & Industrial Battery Solutions',
    slug: 'custom-oem-industrial-batteries',
    tagline: 'Tailored pack engineering, BMS development, and contract manufacturing',
    description: 'End-to-end custom battery pack development for specialized original equipment manufacturers, industrial robotics, material handling, and telecom.',
    iconName: 'Cpu',
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    keyApplications: ['Material Handling & Forklifts', 'Automated Guided Vehicles (AGVs)', 'Telecom Infrastructure', 'Custom OEM Equipment'],
  },
];
