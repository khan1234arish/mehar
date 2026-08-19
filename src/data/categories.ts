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
    tagline: 'AIS-156 Phase 2 certified Prismatic LiFePO4 and High-Density NMC battery packs for electric scooters, delivery fleets, and high-speed motorcycles',
    description: 'Engineered specifically for extreme Indian ambient temperatures (-10°C to 55°C) and heavy daily commercial duty cycles. Built with A+ Grade Prismatic LiFePO4 cells and high-density NMC modules, featuring laser-welded busbars, inter-cell thermal barrier sheets, microprocessor Smart BMS with UART / CAN / RS485 telemetry, and IP67 waterproof aluminum enclosures.',
    iconName: 'Bike',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['Commercial Delivery E-Scooters', 'High-Speed Electric Motorcycles', 'Fleet Rental 2-Wheelers', 'Last-Mile Delivery B2B Fleets'],
    defaultImage: '/assets/products/mehar-2w-battery.jpg',
  },
  {
    id: 'cat-e-mobility-3w',
    name: 'Electric 3-Wheeler & E-Rickshaw Batteries',
    slug: 'electric-3-wheeler-batteries',
    tagline: 'Heavy-duty 51.2V Prismatic LiFePO4 commercial traction batteries delivering 3,000+ cycles, fast charging, and rugged steel protection',
    description: 'Purpose-built for commercial passenger E-Rickshaws, L5 cargo loaders, and high-torque electric auto-rickshaws across India. Utilizes heavy-gauge steel enclosures with vibration damping, digital blue LCD State-of-Charge (SoC) monitors, heavy brass M8/M10 terminal lugs, and active cell balancing designed to withstand 120km+ daily commercial operations.',
    iconName: 'Truck',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['Passenger E-Rickshaws (51.2V 86Ah - 100Ah)', 'L5 High-Torque Cargo 3-Wheelers (51.2V 130Ah - 150Ah)', 'Electric Delivery Loaders', 'Commercial Urban Fleet Fleets'],
    defaultImage: '/assets/products/mehar-3w-battery.jpg',
  },
  {
    id: 'cat-ess-inverter',
    name: 'Energy Storage Systems (ESS) & Inverter Batteries',
    slug: 'energy-storage-inverter-batteries',
    tagline: '12.8V to 51.2V deep-cycle Prismatic LiFePO4 batteries with 3,500+ cycles, 100% maintenance-free operation, and 19-inch rack scalability',
    description: 'Zero-maintenance, ultra-long-life Prismatic LiFePO4 battery systems engineered to replace conventional lead-acid batteries in home inverters, commercial UPS systems, and telecom stations. Features 98% round-trip coulombic efficiency, 2-hour fast charging capability, built-in DC circuit breaker isolators, and seamless pure sine wave inverter communication.',
    iconName: 'Home',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['Residential Inverter Power Backup (12.8V / 25.6V)', 'Commercial Office UPS Systems', '19-Inch 4U Server Rack Modules (51.2V 100Ah)', 'Modular Energy Storage Systems up to 160kWh'],
    defaultImage: '/assets/products/mehar-ess-battery.jpg',
  },
  {
    id: 'cat-solar-renewable',
    name: 'Solar & Renewable Energy Batteries',
    slug: 'solar-renewable-energy-batteries',
    tagline: 'High-cyclic Prismatic LiFePO4 solar storage units engineered for off-grid rooftops, hybrid solar inverters, and commercial microgrids',
    description: 'High-capacity solar energy storage systems optimized for high-temperature solar PV charge profiles. Capable of daily 80% to 90% Depth of Discharge (DoD) over 4,000+ cycles, with integrated RS485/Modbus RTU protocols for hybrid solar inverters, MPPT solar controllers, and automated high-voltage disconnect switches.',
    iconName: 'Sun',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['Off-Grid Rooftop Solar Systems', 'Hybrid Solar Energy Storage Cabinets', 'Rural & Industrial Solar Microgrids', 'Commercial Solar Streetlighting Arrays'],
    defaultImage: '/assets/products/mehar-solar-battery.jpg',
  },
  {
    id: 'cat-cylindrical-cells',
    name: 'Cylindrical & Prismatic Lithium Cells',
    slug: 'cylindrical-li-ion-cells',
    tagline: 'Direct factory supply of Grade-A Cylindrical (18650, 21700, 32700) and Large Laser Prismatic (3.2V 100Ah - 314Ah) cells for B2B integrators',
    description: '100% factory-tested, QR-code traceable Grade-A lithium cells with matched internal resistance (IR within ±1.5%) and verified capacity. Providing cylindrical formats (18650, 21700, 32700) for portable equipment and e-cycles, alongside heavy laser-welded prismatic cells (3.2V 100Ah, 280Ah, 314Ah) for modular pack assemblers.',
    iconName: 'Zap',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['B2B Battery Pack Assemblers & OEMs', 'Electric Cycles & Light Mobility', 'Portable Power Equipment & Testing Labs', 'High-Capacity Modular ESS Projects'],
    defaultImage: '/assets/products/mehar-cylindrical-cells.jpg',
  },
  {
    id: 'cat-custom-oem',
    name: 'Custom OEM & Industrial Battery Solutions',
    slug: 'custom-oem-industrial-batteries',
    tagline: 'Application-specific engineering: Electric Forklifts (REMA), AGVs/Robotics (IP67), Telecom Towers (48V), Drones, and Custom Sheet-Metal Packs',
    description: 'End-to-end custom battery engineering for industrial equipment manufacturers and specialized vehicle OEMs. Sized to exact dimensional envelopes and duty cycles, featuring custom CNC aluminum and powder-coated steel enclosures, integrated thermal management, automotive-grade CAN 2.0B / RS485 telemetry, and ARAI/ICAT certification testing support.',
    iconName: 'Cpu',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    keyApplications: ['Electric Forklifts & Pallet Trucks (24V/48V/80V REMA)', 'Automated Guided Vehicles (AGVs & AMRs)', 'Telecom Tower Backup Infrastructure (48V 100Ah)', 'Heavy-Payload Agricultural & Survey Drones (6S - 14S)', 'Custom Dimensional OEM Pack Prototyping'],
    defaultImage: '/assets/products/mehar-oem-battery.jpg',
  },
];

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return BROAD_CATEGORIES.find((c) => c.slug === slug);
}
