export interface ProductSpecItem {
  groupName: string;
  specKey: string;
  specValue: string;
  specUnit?: string;
  isHighlight?: boolean;
}

export interface ProductData {
  id: string;
  categoryId: string;
  categorySlug: string;
  name: string;
  slug: string;
  shortDescription: string;
  applicationTag: string;
  chemistry: string | null;
  voltageRange: string | null;
  capacityRange: string | null;
  energyRange: string | null;
  cycleLife: string | null;
  maxDischargeRate: string | null;
  operatingTemp: string | null;
  bmsProtocols: string | null;
  ipRating: string | null;
  dimensions: string | null;
  weight: string | null;
  warrantySummary: string | null;
  isPlaceholder: boolean;
  verificationStatus: 'UNVERIFIED_PLACEHOLDER' | 'PENDING_CLIENT_REVIEW' | 'CLIENT_VERIFIED';
  placeholderNote: string;
  tdsFileUrl: string | null;
  specifications: ProductSpecItem[];
}

export const PLACEHOLDER_NOTE = 'Specifications coming soon. Contact engineering/sales for verified technical parameters.';

export const PRODUCTS_CATALOG: ProductData[] = [
  {
    id: 'prod-e-2w-solution',
    categoryId: 'cat-e-mobility-2w',
    categorySlug: 'electric-2-wheeler-batteries',
    name: 'Electric 2-Wheeler Battery Solutions',
    slug: 'electric-2-wheeler-battery-solutions',
    shortDescription: 'Engineered lithium battery solutions designed for electric scooters, motorcycles, and commercial delivery e-bikes.',
    applicationTag: 'Electric 2-Wheelers',
    chemistry: null,
    voltageRange: null,
    capacityRange: null,
    energyRange: null,
    cycleLife: null,
    maxDischargeRate: null,
    operatingTemp: null,
    bmsProtocols: null,
    ipRating: null,
    dimensions: null,
    weight: null,
    warrantySummary: null,
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    placeholderNote: PLACEHOLDER_NOTE,
    tdsFileUrl: null,
    specifications: [
      { groupName: 'Electrical', specKey: 'Nominal Voltage', specValue: 'Specifications coming soon', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Rated Capacity', specValue: 'Specifications coming soon', isHighlight: true },
      { groupName: 'BMS & Safety', specKey: 'Battery Management System', specValue: 'Integrated Multi-Tier BMS with Telemetry Support' },
      { groupName: 'Mechanical', specKey: 'Casing & Ingress Protection', specValue: 'Specifications coming soon' },
    ],
  },
  {
    id: 'prod-e-3w-solution',
    categoryId: 'cat-e-mobility-3w',
    categorySlug: 'electric-3-wheeler-batteries',
    name: 'Electric 3-Wheeler & E-Rickshaw Battery Solutions',
    slug: 'electric-3-wheeler-e-rickshaw-battery-solutions',
    shortDescription: 'Heavy-duty battery packs engineered for high daily commercial mileage in passenger and cargo three-wheelers.',
    applicationTag: 'Electric 3-Wheelers & E-Rickshaws',
    chemistry: null,
    voltageRange: null,
    capacityRange: null,
    energyRange: null,
    cycleLife: null,
    maxDischargeRate: null,
    operatingTemp: null,
    bmsProtocols: null,
    ipRating: null,
    dimensions: null,
    weight: null,
    warrantySummary: null,
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    placeholderNote: PLACEHOLDER_NOTE,
    tdsFileUrl: null,
    specifications: [
      { groupName: 'Electrical', specKey: 'Nominal Voltage', specValue: 'Specifications coming soon', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Rated Capacity', specValue: 'Specifications coming soon', isHighlight: true },
      { groupName: 'Operational', specKey: 'Application Focus', specValue: 'Commercial E-Rickshaws & L5 Cargo' },
      { groupName: 'Mechanical', specKey: 'Enclosure Material', specValue: 'Heavy-Duty Shock & Vibration Resistant' },
    ],
  },
  {
    id: 'prod-ess-inverter-solution',
    categoryId: 'cat-ess-inverter',
    categorySlug: 'energy-storage-inverter-batteries',
    name: 'Energy Storage & Inverter Battery Solutions',
    slug: 'energy-storage-inverter-battery-solutions',
    shortDescription: 'Deep-cycle backup power and energy storage systems for residential inverters and commercial UPS infrastructure.',
    applicationTag: 'Inverter & ESS Backup',
    chemistry: null,
    voltageRange: null,
    capacityRange: null,
    energyRange: null,
    cycleLife: null,
    maxDischargeRate: null,
    operatingTemp: null,
    bmsProtocols: null,
    ipRating: null,
    dimensions: null,
    weight: null,
    warrantySummary: null,
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    placeholderNote: PLACEHOLDER_NOTE,
    tdsFileUrl: null,
    specifications: [
      { groupName: 'Electrical', specKey: 'System Compatibility', specValue: 'Standard Sine-Wave & Solar Inverters', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Capacity Class', specValue: 'Specifications coming soon', isHighlight: true },
      { groupName: 'Safety', specKey: 'Protective Mechanisms', specValue: 'Over-Charge, Over-Discharge & Thermal Protections' },
    ],
  },
  {
    id: 'prod-solar-renewable-solution',
    categoryId: 'cat-solar-renewable',
    categorySlug: 'solar-renewable-energy-batteries',
    name: 'Solar & Renewable Energy Battery Solutions',
    slug: 'solar-renewable-energy-battery-solutions',
    shortDescription: 'High-cyclic energy storage systems designed for off-grid, hybrid solar installations, and microgrid applications.',
    applicationTag: 'Solar & Renewable Storage',
    chemistry: null,
    voltageRange: null,
    capacityRange: null,
    energyRange: null,
    cycleLife: null,
    maxDischargeRate: null,
    operatingTemp: null,
    bmsProtocols: null,
    ipRating: null,
    dimensions: null,
    weight: null,
    warrantySummary: null,
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    placeholderNote: PLACEHOLDER_NOTE,
    tdsFileUrl: null,
    specifications: [
      { groupName: 'Electrical', specKey: 'Charging Profile Compatibility', specValue: 'Solar MPPT & PWM Controllers', isHighlight: true },
      { groupName: 'Operational', specKey: 'Deep Cycle Performance', specValue: 'Specifications coming soon', isHighlight: true },
    ],
  },
  {
    id: 'prod-ev-chargers-solution',
    categoryId: 'cat-ev-chargers',
    categorySlug: 'ev-chargers-power-electronics',
    name: 'Intelligent EV Chargers & Power Units',
    slug: 'intelligent-ev-chargers-power-units',
    shortDescription: 'Industrial-grade intelligent battery chargers with automated cutoff and multi-stage charging algorithms.',
    applicationTag: 'EV Charging Infrastructure',
    chemistry: null,
    voltageRange: null,
    capacityRange: null,
    energyRange: null,
    cycleLife: null,
    maxDischargeRate: null,
    operatingTemp: null,
    bmsProtocols: null,
    ipRating: null,
    dimensions: null,
    weight: null,
    warrantySummary: null,
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    placeholderNote: PLACEHOLDER_NOTE,
    tdsFileUrl: null,
    specifications: [
      { groupName: 'Electrical', specKey: 'Output Voltage Compatibility', specValue: 'Specifications coming soon', isHighlight: true },
      { groupName: 'Safety', specKey: 'Thermal & Short Circuit Cutoff', specValue: 'Automated Protection Circuitry' },
    ],
  },
  {
    id: 'prod-custom-oem-solution',
    categoryId: 'cat-custom-oem',
    categorySlug: 'custom-oem-industrial-batteries',
    name: 'Custom OEM & Industrial Battery Pack Engineering',
    slug: 'custom-oem-industrial-battery-engineering',
    shortDescription: 'Tailored pack architecture, custom BMS programming, and dedicated contract manufacturing for equipment OEMs.',
    applicationTag: 'Custom OEM & Industrial',
    chemistry: null,
    voltageRange: null,
    capacityRange: null,
    energyRange: null,
    cycleLife: null,
    maxDischargeRate: null,
    operatingTemp: null,
    bmsProtocols: null,
    ipRating: null,
    dimensions: null,
    weight: null,
    warrantySummary: null,
    isPlaceholder: true,
    verificationStatus: 'UNVERIFIED_PLACEHOLDER',
    placeholderNote: PLACEHOLDER_NOTE,
    tdsFileUrl: null,
    specifications: [
      { groupName: 'Engineering', specKey: 'Custom Voltage & Capacity', specValue: 'Engineered to OEM Requirement Specifications', isHighlight: true },
      { groupName: 'Communication', specKey: 'Telemetry Protocols', specValue: 'CAN 2.0B / RS485 / Bluetooth / Custom' },
    ],
  },
];
