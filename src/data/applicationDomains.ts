export interface ApplicationDomain {
  id: string;
  name: string;
  categorySlug: string;
  description: string;
  sampleEquipment: string[];
}

export const APPLICATION_DOMAINS: ApplicationDomain[] = [
  {
    id: 'electric-mobility',
    name: 'Electric Mobility (2W / 3W / Light EV)',
    categorySlug: 'electric-2-wheeler-batteries',
    description: 'Electric scooters, motorcycles, e-rickshaws, and light electric passenger vehicles.',
    sampleEquipment: ['Electric Scooter (E2W)', 'Electric Motorcycle', 'E-Rickshaw (Passenger)', 'Cargo 3W (L5)', 'Light EV / Golf Cart'],
  },
  {
    id: 'solar-ess',
    name: 'Solar & Renewable Energy Storage (ESS)',
    categorySlug: 'solar-renewable-energy-batteries',
    description: 'Off-grid and hybrid solar installations, commercial microgrids, and energy backup.',
    sampleEquipment: ['Off-Grid Solar Rooftop', 'Hybrid Solar Inverter Bank', 'Commercial Solar ESS', 'Solar Street Lighting Bank'],
  },
  {
    id: 'ups-inverter',
    name: 'UPS & Inverter Power Backup',
    categorySlug: 'energy-storage-inverter-batteries',
    description: 'Residential home inverters, commercial office backup UPS, and sensitive electronics.',
    sampleEquipment: ['Home Inverter Backup', 'Commercial Office UPS', 'Industrial Online UPS', 'Emergency Backup Bank'],
  },
  {
    id: 'industrial-equipment',
    name: 'Industrial Equipment & Machinery',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'Heavy machinery, factory equipment, and portable industrial power units.',
    sampleEquipment: ['Hydraulic Lift Units', 'Industrial Testing Equipment', 'Portable Generator Replacement', 'Factory Floor Machinery'],
  },
  {
    id: 'material-handling',
    name: 'Material Handling & Forklifts',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'Electric forklifts, pallet trucks, order pickers, and warehouse traction units.',
    sampleEquipment: ['Electric Forklift', 'Electric Pallet Truck (BOPT)', 'Reach Truck', 'Electric Tow Tractor'],
  },
  {
    id: 'robotics-automation',
    name: 'Robotics & Autonomous Guided Vehicles (AGVs)',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'Automated warehouse AGVs, autonomous mobile robots (AMRs), and robotic arms.',
    sampleEquipment: ['Warehouse AGV', 'Autonomous Mobile Robot (AMR)', 'Industrial Robotic Arm Base', 'Inspection Rover'],
  },
  {
    id: 'drones-uav',
    name: 'Drones & Unmanned Aerial Vehicles (UAVs)',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'Agricultural spraying drones, mapping UAVs, and commercial logistics aerial systems.',
    sampleEquipment: ['Agricultural Spraying Drone', 'Survey & Mapping UAV', 'Surveillance Drone', 'Heavy-Lift Cargo Drone'],
  },
  {
    id: 'medical-specialized',
    name: 'Medical & Specialized Equipment',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'Portable diagnostic equipment, motorized hospital beds, and mobile surgical carts.',
    sampleEquipment: ['Mobile Medical Cart', 'Portable Ultrasound Device', 'Electric Hospital Bed / Chair', 'Defibrillator Backup Unit'],
  },
  {
    id: 'telecom-infrastructure',
    name: 'Telecom & Network Infrastructure',
    categorySlug: 'energy-storage-inverter-batteries',
    description: 'Base transceiver stations (BTS), cell tower backup, and datacenter edge racks.',
    sampleEquipment: ['Telecom Tower BTS Backup', 'Fiber Node Power Unit', 'Edge Datacenter Rack Bank', 'Rural Repeater Station'],
  },
  {
    id: 'power-tools',
    name: 'Heavy Duty Power Tools & Outdoor Equipment',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'High-discharge portable battery packs for commercial construction and landscaping tools.',
    sampleEquipment: ['Commercial Cordless Saw/Drill Pack', 'Lawn Mower / Trimmer Battery', 'Concrete Finishing Tool', 'Hydraulic Crimper Tool'],
  },
  {
    id: 'cleaning-equipment',
    name: 'Commercial Cleaning Equipment',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'Floor scrubbers, commercial sweepers, and industrial vacuum machines.',
    sampleEquipment: ['Ride-On Floor Scrubber', 'Walk-Behind Floor Sweeper', 'Industrial Vacuum Unit', 'Commercial Pressure Cleaner'],
  },
  {
    id: 'marine-rv',
    name: 'Marine, Boat & RV Auxiliary Systems',
    categorySlug: 'solar-renewable-energy-batteries',
    description: 'Electric trolling motors, auxiliary marine house batteries, and campervan storage.',
    sampleEquipment: ['Electric Trolling Motor', 'Campervan / RV House Battery', 'Yacht Auxiliary Power Bank', 'Electric Small Boat Drive'],
  },
  {
    id: 'consumer-electronics',
    name: 'Commercial & OEM Consumer Electronics',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'High-capacity power banks, portable outdoor power stations, and POS terminals.',
    sampleEquipment: ['Portable Power Station (PPS)', 'Handheld POS Terminal', 'High-Capacity Field Power Bank', 'Mobile Tracking Device'],
  },
  {
    id: 'educational-robotics',
    name: 'Toys, RC & Educational Robotics',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'STEM robotics kits, RC models, and specialized educational vehicle platforms.',
    sampleEquipment: ['STEM Competition Robot', 'RC Industrial Model', 'Educational Mobility Kit', 'Prototyping Test Bed'],
  },
  {
    id: 'custom-oem',
    name: 'Custom OEM / Custom Dimensional Pack',
    categorySlug: 'custom-oem-industrial-batteries',
    description: 'Application-specific engineering with unique form factor, voltage, or communication demands.',
    sampleEquipment: ['Custom Form Factor Project', 'Specialized Prototype Build', 'Retrofit Energy Storage Bank', 'Proprietary OEM Chassis Unit'],
  },
];
