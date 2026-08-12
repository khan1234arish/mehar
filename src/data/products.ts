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
  modelNumber?: string | null;
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
  imageUrl?: string | null;
  minimumOrderQuantity?: number | null;
  images?: Array<{
    id: string;
    imageUrl: string;
    altText?: string | null;
    isPrimary: boolean;
    isPublished: boolean;
  }>;
  specifications: ProductSpecItem[];
}

export const PRODUCTS_CATALOG: ProductData[] = [
  {
    id: 'prod-e-2w-48-25',
    categoryId: 'cat-e-mobility-2w',
    categorySlug: 'electric-2-wheeler-batteries',
    name: 'MEHAR 48V 25Ah NMC E-Scooter Battery',
    slug: 'mehar-48v-25ah-nmc-e-scooter',
    modelNumber: 'MHR-2W-48025-NMC',
    shortDescription: '48V 25Ah NMC lithium-ion battery pack for electric scooters and urban delivery fleets with integrated Smart BMS.',
    applicationTag: 'Electric Scooters & E-Bikes',
    chemistry: 'NMC (Lithium-ion)',
    voltageRange: '48V',
    capacityRange: '25Ah',
    energyRange: '1,200 Wh',
    cycleLife: '1,200+ cycles @ 80% DOD',
    maxDischargeRate: '30A (Continuous)',
    operatingTemp: '-10°C to 55°C',
    bmsProtocols: 'Integrated Smart BMS (Optional CAN / RS485)',
    ipRating: 'IP65',
    dimensions: 'Configuration dependent',
    weight: 'Application dependent (~9-11 kg)',
    warrantySummary: 'Contact MEHAR sales for commercial fleet warranty terms',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    placeholderNote: '',
    tdsFileUrl: null,
    imageUrl: '/assets/products/mehar-2w-battery.jpg',
    minimumOrderQuantity: 10,
    specifications: [
      { groupName: 'Electrical', specKey: 'Nominal Voltage', specValue: '48', specUnit: 'V', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Rated Capacity', specValue: '25', specUnit: 'Ah', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Calculated Energy', specValue: '1,200', specUnit: 'Wh' },
      { groupName: 'Electrical', specKey: 'Cell Chemistry', specValue: 'NMC (Nickel Manganese Cobalt)' },
      { groupName: 'BMS & Safety', specKey: 'Protection Functions', specValue: 'Over-charge, Over-discharge, Over-current, Short-circuit, Thermal cutoff' },
      { groupName: 'Mechanical', specKey: 'Ingress Protection', specValue: 'IP65' },
      { groupName: 'Operational', specKey: 'Cycle Life', specValue: '1,200+', specUnit: 'cycles @ 80% DOD' },
    ],
  },
  {
    id: 'prod-e-3w-51-86',
    categoryId: 'cat-e-mobility-3w',
    categorySlug: 'electric-3-wheeler-batteries',
    name: 'MEHAR 51.2V 86Ah LFP E-Rickshaw Battery',
    slug: 'mehar-51-2v-86ah-lfp-e-rickshaw',
    modelNumber: 'MEIPLRI51086',
    shortDescription: '51.2V 86Ah Lithium Iron Phosphate (LFP) traction battery pack designed for commercial passenger E-Rickshaws with high thermal stability and integrated BMS.',
    applicationTag: 'Commercial Passenger E-Rickshaws',
    chemistry: 'LiFePO4 (LFP)',
    voltageRange: '51.2V',
    capacityRange: '86Ah',
    energyRange: '4,403 Wh',
    cycleLife: '2,000+ cycles @ 85% DOD',
    maxDischargeRate: '60A (Continuous) / 100A (Peak)',
    operatingTemp: '-10°C to 55°C',
    bmsProtocols: 'Integrated Smart BMS with CAN 2.0B / RS485 Telemetry',
    ipRating: 'IP65',
    dimensions: '645 × 320 × 220 mm',
    weight: '55 kg',
    warrantySummary: 'Contact MEHAR sales for commercial fleet warranty terms',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    placeholderNote: '',
    tdsFileUrl: null,
    imageUrl: '/assets/products/mehar-3w-battery.jpg',
    minimumOrderQuantity: 5,
    specifications: [
      { groupName: 'Electrical', specKey: 'Nominal Voltage', specValue: '51.2', specUnit: 'V', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Rated Capacity', specValue: '86', specUnit: 'Ah', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Calculated Energy', specValue: '4,403', specUnit: 'Wh' },
      { groupName: 'Electrical', specKey: 'Cell Chemistry', specValue: 'LiFePO4 (Lithium Iron Phosphate)' },
      { groupName: 'Electrical', specKey: 'Cell Configuration', specValue: '16S (16 Series Cells)' },
      { groupName: 'BMS & Safety', specKey: 'BMS Protections', specValue: 'Over-charge, Over-discharge, Over-current, Short-circuit, Thermal protection' },
      { groupName: 'Mechanical', specKey: 'Dimensions (L×W×H)', specValue: '645 × 320 × 220', specUnit: 'mm' },
      { groupName: 'Mechanical', specKey: 'Weight', specValue: '55', specUnit: 'kg' },
      { groupName: 'Mechanical', specKey: 'Ingress Protection', specValue: 'IP65' },
    ],
  },
  {
    id: 'prod-ess-12-100',
    categoryId: 'cat-ess-inverter',
    categorySlug: 'energy-storage-inverter-batteries',
    name: 'MEHAR 12.8V 100Ah LiFePO4 Inverter Battery',
    slug: 'mehar-12-8v-100ah-lifepo4-inverter',
    modelNumber: 'MEIPLIV-12100',
    shortDescription: '12.8V 100Ah (1,280 Wh) maintenance-free LiFePO4 deep-cycle battery for residential home inverters and small commercial UPS systems.',
    applicationTag: 'Home Inverters & Office UPS',
    chemistry: 'LiFePO4 (LFP)',
    voltageRange: '12.8V',
    capacityRange: '100Ah',
    energyRange: '1,280 Wh',
    cycleLife: '3,000+ cycles @ 80% DOD',
    maxDischargeRate: '50A (Continuous)',
    operatingTemp: '-10°C to 55°C',
    bmsProtocols: 'Integrated Smart BMS with Multi-Layer Protection',
    ipRating: 'IP54 / Indoor Enclosure',
    dimensions: 'Configuration dependent',
    weight: '~14 kg',
    warrantySummary: 'Contact MEHAR sales for warranty terms',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    placeholderNote: '',
    tdsFileUrl: null,
    imageUrl: '/assets/products/mehar-ess-battery.jpg',
    minimumOrderQuantity: 5,
    specifications: [
      { groupName: 'Electrical', specKey: 'Nominal Voltage', specValue: '12.8', specUnit: 'V', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Rated Capacity', specValue: '100', specUnit: 'Ah', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Calculated Energy', specValue: '1,280', specUnit: 'Wh' },
      { groupName: 'Electrical', specKey: 'Cell Chemistry', specValue: 'LiFePO4' },
      { groupName: 'Operational', specKey: 'Cycle Life', specValue: '3,000+', specUnit: 'cycles @ 80% DOD' },
      { groupName: 'Mechanical', specKey: 'Weight', specValue: '~14', specUnit: 'kg' },
    ],
  },
  {
    id: 'prod-solar-51-100',
    categoryId: 'cat-solar-renewable',
    categorySlug: 'solar-renewable-energy-batteries',
    name: 'MEHAR 51.2V 100Ah Solar ESS Storage Bank',
    slug: 'mehar-51-2v-100ah-solar-ess',
    modelNumber: 'MHR-SOL-51100',
    shortDescription: '51.2V 100Ah (5.12 kWh) rack/wall-mount LiFePO4 solar energy storage battery with MPPT compatibility and RS485/CAN inverter communication.',
    applicationTag: 'Rooftop Solar & Hybrid Inverter ESS',
    chemistry: 'LiFePO4 (LFP)',
    voltageRange: '51.2V',
    capacityRange: '100Ah',
    energyRange: '5,120 Wh',
    cycleLife: '3,000+ cycles @ 80% DOD',
    maxDischargeRate: '50A (Continuous) / 100A (Peak)',
    operatingTemp: '-10°C to 55°C',
    bmsProtocols: 'CAN 2.0B / RS485 / Inverter Protocol Mapping',
    ipRating: 'IP54 / Indoor Wall Mount',
    dimensions: 'Configuration dependent (Standard 19-inch rack / Wall mount)',
    weight: '~50 kg',
    warrantySummary: 'Contact MEHAR sales for warranty terms',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    placeholderNote: '',
    tdsFileUrl: null,
    imageUrl: '/assets/products/mehar-solar-battery.jpg',
    minimumOrderQuantity: 2,
    specifications: [
      { groupName: 'Electrical', specKey: 'Nominal Voltage', specValue: '51.2', specUnit: 'V', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Rated Capacity', specValue: '100', specUnit: 'Ah', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Calculated Energy', specValue: '5,120', specUnit: 'Wh' },
      { groupName: 'Electrical', specKey: 'Cell Chemistry', specValue: 'LiFePO4' },
      { groupName: 'BMS & Safety', specKey: 'Inverter Communication', specValue: 'CAN 2.0B / RS485' },
      { groupName: 'Operational', specKey: 'Cycle Life', specValue: '3,000+', specUnit: 'cycles @ 80% DOD' },
    ],
  },
  {
    id: 'prod-ev-chg-multi',
    categoryId: 'cat-ev-chargers',
    categorySlug: 'ev-chargers-power-electronics',
    name: 'MEHAR Intelligent Multi-Stage Lithium EV Charger (48V / 60V / 72V)',
    slug: 'mehar-intelligent-lithium-ev-charger',
    modelNumber: 'MHR-CHG-EV-MULTI',
    shortDescription: 'Industrial-grade CC/CV intelligent lithium battery charger series with automatic cutoff, reverse-polarity protection, and thermal monitoring for 2W & 3W fleets.',
    applicationTag: 'EV Fleet Depot & Depot Charging',
    chemistry: 'Power Electronics (Intelligent CC/CV Charger)',
    voltageRange: '48V / 60V / 72V Compatible Variants',
    capacityRange: '5A - 20A Charging Current',
    energyRange: null,
    cycleLife: null,
    maxDischargeRate: null,
    operatingTemp: '-10°C to 45°C',
    bmsProtocols: 'Hardware / CANbus Enable Signal',
    ipRating: 'IP54',
    dimensions: 'Configuration dependent',
    weight: 'Application dependent',
    warrantySummary: 'Contact MEHAR sales for warranty terms',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    placeholderNote: '',
    tdsFileUrl: null,
    imageUrl: '/assets/products/mehar-ev-charger.jpg',
    minimumOrderQuantity: 10,
    specifications: [
      { groupName: 'Electrical', specKey: 'Output Voltage Compatibility', specValue: '48V / 60V / 72V (Configurable)', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Charging Profile', specValue: 'CC / CV (Constant Current / Constant Voltage)' },
      { groupName: 'Safety', specKey: 'Protective Features', specValue: 'Over-voltage cutoff, Short-circuit protection, Reverse polarity guard, Thermal sensor' },
    ],
  },
  {
    id: 'prod-custom-flk-48200',
    categoryId: 'cat-custom-oem',
    categorySlug: 'custom-oem-industrial-batteries',
    name: 'MEHAR 48V 200Ah Material Handling Forklift Battery',
    slug: 'mehar-48v-200ah-material-handling-forklift',
    modelNumber: 'MHR-IND-FLK-48200',
    shortDescription: '48V 200Ah heavy-duty traction LiFePO4 battery pack engineered for electric forklifts, reach trucks, and warehouse pallet trucks (BOPT).',
    applicationTag: 'Electric Forklifts & Warehouse BOPT',
    chemistry: 'LiFePO4 (LFP)',
    voltageRange: '48V (51.2V nominal)',
    capacityRange: '200Ah',
    energyRange: '10,240 Wh',
    cycleLife: '3,000+ cycles @ 80% DOD',
    maxDischargeRate: '150A (Continuous) / 250A (Peak)',
    operatingTemp: '-10°C to 55°C',
    bmsProtocols: 'Industrial CANbus / Telemetry Interface',
    ipRating: 'IP65 Heavy Steel Enclosure',
    dimensions: 'Customized per forklift battery bay',
    weight: 'Application dependent (~110-130 kg)',
    warrantySummary: 'Contact MEHAR sales for industrial warranty terms',
    isPlaceholder: false,
    verificationStatus: 'CLIENT_VERIFIED',
    placeholderNote: '',
    tdsFileUrl: null,
    imageUrl: '/assets/products/mehar-forklift-battery.jpg',
    minimumOrderQuantity: 1,
    specifications: [
      { groupName: 'Electrical', specKey: 'Nominal Voltage', specValue: '48', specUnit: 'V', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Rated Capacity', specValue: '200', specUnit: 'Ah', isHighlight: true },
      { groupName: 'Electrical', specKey: 'Calculated Energy', specValue: '10,240', specUnit: 'Wh' },
      { groupName: 'Electrical', specKey: 'Cell Chemistry', specValue: 'LiFePO4' },
      { groupName: 'Operational', specKey: 'Opportunity Charging', specValue: 'Supported (Rapid mid-shift partial recharge)' },
    ],
  },
];

