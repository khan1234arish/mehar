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
  defaultImage?: string;
}

export const BROAD_CATEGORIES: CategoryData[] = [
  {
    id: 'cat-e-mobility-2w',
    name: 'Electric 2-Wheeler Batteries',
    slug: 'electric-2-wheeler-batteries',
    tagline: 'High-density NMC and Li-ion battery systems for electric scooters, motorcycles, and e-cycles',
    description: 'Engineered for personal mobility, commercial delivery e-bikes, and e-cycles. Utilizes high-energy-density NMC and Li-ion chemistry with integrated multi-tier BMS for thermal safety, over-current protection, and consistent C-rate discharge.',
    iconName: 'Bike',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['Electric Scooters', 'Electric Motorcycles', 'Delivery & Fleet E-Bikes', 'Electric Cycles (E-Cycles)'],
    defaultImage: '/assets/products/mehar-2w-battery.jpg',
  },
  {
    id: 'cat-e-mobility-3w',
    name: 'Electric 3-Wheeler & E-Rickshaw Batteries',
    slug: 'electric-3-wheeler-batteries',
    tagline: 'Heavy-duty Lithium Iron Phosphate (LiFePO4) traction packs for passenger and cargo 3-wheelers',
    description: 'Heavy-duty traction battery systems engineered for commercial passenger E-Rickshaws, L5 cargo loaders, and last-mile electric delivery vehicles. High cycle life (up to 3,000+ cycles), rugged vibration-resistant enclosures, and CAN/RS485 telemetry integration.',
    iconName: 'Truck',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['Passenger E-Rickshaws', 'L5 Cargo 3-Wheelers', 'Electric Loaders', 'Last-Mile Fleet Vehicles'],
    defaultImage: '/assets/products/mehar-3w-battery.jpg',
  },
  {
    id: 'cat-ess-inverter',
    name: 'Energy Storage Systems (ESS) & Inverter Batteries',
    slug: 'energy-storage-inverter-batteries',
    tagline: 'Maintenance-free deep-cycle LiFePO4 batteries for home inverters, commercial UPS, and backup power',
    description: 'Advanced LiFePO4 energy storage systems designed as maintenance-free, long-life replacements for conventional lead-acid inverter batteries. Fast charging, high round-trip efficiency (>95%), and seamless compatibility with pure sine wave inverters.',
    iconName: 'Home',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['Residential Home Inverters', 'Commercial Office UPS', 'Industrial Backup Power', '19-Inch Server Rack Storage'],
    defaultImage: '/assets/products/mehar-ess-battery.jpg',
  },
  {
    id: 'cat-solar-renewable',
    name: 'Solar & Renewable Energy Batteries',
    slug: 'solar-renewable-energy-batteries',
    tagline: 'Deep-cycle LiFePO4 energy storage systems for off-grid, hybrid solar, and microgrid applications',
    description: 'High-cyclic lithium energy storage solutions optimized for solar PV charging profiles. High charge acceptance from MPPT/solar charge controllers, 80%+ Depth of Discharge (DoD) capability, and robust performance in high ambient temperatures.',
    iconName: 'Sun',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['Off-Grid Solar Rooftop', 'Hybrid Solar Energy Storage', 'Solar Microgrids & Mini-Grids', 'Solar Street Lighting Systems'],
    defaultImage: '/assets/products/mehar-solar-battery.jpg',
  },
  {
    id: 'cat-ev-chargers',
    name: 'EV Chargers & Power Electronics',
    slug: 'ev-chargers-power-electronics',
    tagline: 'Intelligent multi-stage CC/CV lithium battery chargers and hybrid solar-grid power units',
    description: 'Dedicated power electronics including intelligent CC/CV lithium chargers with automated cutoff, thermal monitoring, and reverse-polarity protection, alongside smart hybrid lithium inverters (12V to 48V, 1200W to 6200W) designed for wall-mount installations.',
    iconName: 'Zap',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['EV Fleet Depot Charging', 'Stationary Battery Charging', 'Hybrid Solar-Grid Inverters', 'Commercial Inverter Units'],
    defaultImage: '/assets/products/mehar-ev-charger.jpg',
  },
  {
    id: 'cat-custom-oem',
    name: 'Custom OEM & Industrial Battery Solutions',
    slug: 'custom-oem-industrial-batteries',
    tagline: 'Application-specific pack engineering, custom sheet-metal enclosures, and contract manufacturing',
    description: 'Tailored lithium battery pack development for material handling equipment, automated guided vehicles (AGVs), drones/UAVs, telecom towers, medical carts, and custom equipment manufacturers. Sized to exact voltage, dimensional envelope, and communication requirements.',
    iconName: 'Cpu',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['Electric Forklifts & Pallet Trucks (BOPT)', 'Automated Guided Vehicles (AGVs & AMRs)', 'Drones & Unmanned Aerial Vehicles', 'Telecom BTS Infrastructure', 'Medical & Diagnostic Equipment', 'Custom Dimensional OEM Packs'],
    defaultImage: '/assets/products/mehar-oem-battery.jpg',
  },
];

