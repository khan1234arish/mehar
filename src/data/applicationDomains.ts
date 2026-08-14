export interface ApplicationDomain {
  id: string;
  name: string;
  categorySlug: string;
  description: string;
  dutyCycle: string;
  operatingTemp: string;
  recommendedChemistry: string;
  sampleEquipment: string[];
  defaultImage?: string;
}

export const APPLICATION_DOMAINS: ApplicationDomain[] = [
  {
    id: 'electric-mobility-2w',
    name: 'Commercial Electric 2-Wheelers & Delivery Fleets',
    categorySlug: 'electric-2-wheeler-batteries',
    description: 'High-energy-density Prismatic LiFePO4 and Box NMC battery packs certified to AIS-156 Amendment III Phase 2. Designed for 80-140 km daily delivery runs with IP67 waterproofing and fast 2-3 hour turnarounds.',
    dutyCycle: '8 - 14 Hours Daily Multi-Shift Operation',
    operatingTemp: '-10°C to 55°C Ambient',
    recommendedChemistry: 'A+ Grade Prismatic LiFePO4 / High-Density NMC',
    sampleEquipment: ['Commercial Delivery E-Scooters', 'High-Speed Electric Motorcycles', 'Fleet Rental 2-Wheelers', 'Last-Mile Delivery B2B Fleets'],
    defaultImage: '/assets/products/mehar-2w-battery.jpg',
  },
  {
    id: 'electric-mobility-3w',
    name: 'Electric 3-Wheelers & Passenger E-Rickshaws',
    categorySlug: 'electric-3-wheeler-batteries',
    description: 'Rugged 51.2V Prismatic LiFePO4 traction systems enclosed in heavy cold-rolled powder-coated steel. Features digital blue LCD monitors, laser-welded busbars, and 3,000+ cycle life for passenger and cargo transport.',
    dutyCycle: '12 - 16 Hours Continuous Urban Stop-and-Go',
    operatingTemp: '-10°C to 60°C Heavy Ambient',
    recommendedChemistry: 'Grade-A Prismatic LiFePO4 (16S 51.2V 86Ah - 150Ah)',
    sampleEquipment: ['Passenger E-Rickshaws (51.2V 100Ah)', 'L5 Cargo Delivery Loaders (51.2V 130Ah)', 'Electric Auto-Rickshaws', 'Municipal Waste Collection Loaders'],
    defaultImage: '/assets/products/mehar-3w-battery.jpg',
  },
  {
    id: 'ups-inverter',
    name: 'Residential Inverter & Commercial UPS Power Backup',
    categorySlug: 'energy-storage-inverter-batteries',
    description: '100% maintenance-free deep-cycle 12.8V, 25.6V, and 51.2V Prismatic LiFePO4 batteries. Direct drop-in replacement for heavy lead-acid batteries with 3,500+ cycles, zero fumes, and 98% round-trip efficiency.',
    dutyCycle: '24/7 Grid Standby with Instantaneous Sub-10ms Transfer',
    operatingTemp: '0°C to 55°C Indoor/Outdoor',
    recommendedChemistry: 'Prismatic LiFePO4 (4S 12.8V / 8S 25.6V / 16S 51.2V)',
    sampleEquipment: ['Home Sine Wave Inverter Backup', 'Commercial Office UPS Systems', '19" 4U Server Rack Backup Modules', 'Hospital Emergency Power Banks'],
    defaultImage: '/assets/products/mehar-ess-battery.jpg',
  },
  {
    id: 'solar-ess',
    name: 'Solar & Renewable Energy Microgrids (ESS)',
    categorySlug: 'solar-renewable-energy-batteries',
    description: 'Modular high-voltage and low-voltage LiFePO4 energy storage cabinets engineered for off-grid rooftops, hybrid solar installations, and microgrids. Integrated RS485/Modbus RTU protocols for MPPT inverter communication.',
    dutyCycle: 'Daily 100% Deep-Cycle Charge/Discharge (4,500+ Cycles)',
    operatingTemp: '-10°C to 55°C High-Solar Envelopes',
    recommendedChemistry: 'Grade-A Prismatic LiFePO4 (10kWh to 160kWh Modular)',
    sampleEquipment: ['Off-Grid Rooftop Solar Banks', 'Commercial Hybrid Solar Storage Cabinets', 'Industrial Solar Microgrids', 'Telecom Solar BTS Arrays'],
    defaultImage: '/assets/products/mehar-solar-battery.jpg',
  },
  {
    id: 'material-handling',
    name: 'Material Handling Equipment & Electric Forklifts',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'Heavy industrial 24V, 48V, and 80V LiFePO4 traction packs built into custom counterweight steel trays with REMA 320A/160A connectors. Supports rapid opportunity charging for 24/7 multi-shift warehouse operations.',
    dutyCycle: '24/7 Multi-Shift with 1.5-Hour Opportunity Charging',
    operatingTemp: '-20°C (Cold Storage) to 60°C (Factory Floor)',
    recommendedChemistry: 'Heavy-Duty Prismatic LiFePO4 (200Ah to 600Ah)',
    sampleEquipment: ['Counterbalance Electric Forklifts', 'Reach Trucks & Order Pickers', 'Battery Operated Pallet Trucks (BOPT)', 'Electric Tow Tractors'],
    defaultImage: '/assets/products/mehar-forklift-battery.jpg',
  },
  {
    id: 'robotics-automation',
    name: 'Autonomous Guided Vehicles (AGVs) & AMRs',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'Precision CNC-machined IP67 aluminum battery packs designed for automated warehouse robotics, autonomous mobile robots (AMRs), and cleanroom industrial automation with automatic brass docking pins.',
    dutyCycle: 'Continuous Autonomous Docking & Fast High-C Recharging',
    operatingTemp: '-10°C to 55°C',
    recommendedChemistry: 'Prismatic LiFePO4 (24V / 48V 40Ah - 100Ah)',
    sampleEquipment: ['Warehouse Logistics AGVs', 'Autonomous Mobile Robots (AMRs)', 'Industrial Robotic Arm Bases', 'Automated Guided Carts (AGCs)'],
    defaultImage: '/assets/products/mehar-agv-battery.jpg',
  },
  {
    id: 'telecom-infrastructure',
    name: 'Telecom BTS Towers & Network Infrastructure',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'Standard 19-inch 3U rack-mount 48V 100Ah LiFePO4 modules equipped with front 2-pole miniature circuit breakers, dry contacts, and SNMP/RS485 interfaces for remote telecom Network Operations Center (NOC) monitoring.',
    dutyCycle: 'High-Temperature Unstable Grid Float-Service (4,000+ Cycles)',
    operatingTemp: '-10°C to 55°C High-Ambient Outdoor Shelters',
    recommendedChemistry: 'Telecom-Grade Prismatic LiFePO4 (15S / 16S 48V 100Ah)',
    sampleEquipment: ['Telecom Tower BTS Backup Cabinets', 'Optical Fiber Node Power Units', 'Edge Datacenter Rack Banks', 'Rural Micro-Repeater Towers'],
    defaultImage: '/assets/products/mehar-telecom-battery.jpg',
  },
  {
    id: 'drones-uav',
    name: 'Agricultural & Heavy-Payload Survey Drones',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'High-discharge (25C continuous / 50C burst) lithium polymer and high-rate NMC battery systems wrapped in carbon fiber shielding with genuine XT90-S anti-spark connectors for agricultural spraying and defense UAVs.',
    dutyCycle: 'High-Rate 25C Discharge Flight Envelopes',
    operatingTemp: '-10°C to 50°C Aerial Operation',
    recommendedChemistry: 'High-Rate LiPo / High-C NMC (6S, 12S, 14S 16000mAh - 30000mAh)',
    sampleEquipment: ['Agricultural Crop-Spraying Drones (10L - 30L Payload)', 'High-Altitude Survey & Mapping UAVs', 'Heavy-Lift Logistics Cargo Drones', 'Industrial Surveillance Hexacopters'],
    defaultImage: '/assets/products/mehar-drone-battery.jpg',
  },
];
