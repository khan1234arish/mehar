export interface ProductSpecItem {
  groupName: string;
  specKey: string;
  specValue: string;
  specUnit?: string | null;
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
    "id": "d73baaa2-4d59-451d-a18d-7583a638bc60",
    "categoryId": "7557460f-c5b9-4589-8590-6f9f07f2b3c3",
    "categorySlug": "electric-3-wheeler-batteries",
    "name": "MEHAR 51.2V 86Ah LFP E-Rickshaw Battery",
    "slug": "mehar-51-2v-86ah-lfp-e-rickshaw",
    "modelNumber": "MEIPLRI51086",
    "shortDescription": "51.2V 86Ah Lithium Iron Phosphate (LFP) traction battery pack designed for commercial passenger E-Rickshaws with high thermal stability and integrated BMS.",
    "applicationTag": "Commercial Passenger E-Rickshaws",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "51.2V",
    "capacityRange": "86Ah",
    "energyRange": "4,403 Wh",
    "cycleLife": "2,000+ cycles @ 85% DOD",
    "maxDischargeRate": "60A (Continuous) / 100A (Peak)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Integrated Smart BMS with CAN 2.0B / RS485 Telemetry",
    "ipRating": "IP65",
    "dimensions": "645 × 320 × 220 mm",
    "weight": "55 kg",
    "warrantySummary": "Contact MEHAR sales for commercial fleet warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-3w-battery.jpg",
    "minimumOrderQuantity": 5,
    "images": [
      {
        "id": "eafeee7a-7403-411b-ac01-5d0f8abcf63c",
        "imageUrl": "/assets/products/mehar-3w-battery.jpg",
        "altText": "MEHAR 51.2V 86Ah LFP E-Rickshaw Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "51.2",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "86",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "4,403",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4 (Lithium Iron Phosphate)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Configuration",
        "specValue": "16S (16 Series Cells)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "BMS Protections",
        "specValue": "Over-charge, Over-discharge, Over-current, Short-circuit, Thermal protection",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Communication Interface",
        "specValue": "CAN 2.0B / RS485 / Optional IoT Telematics",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (L×W×H)",
        "specValue": "645 × 320 × 220",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "55",
        "specUnit": "kg",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Enclosure Material",
        "specValue": "Heavy-Duty Powder-Coated Mild Steel (MS)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP65",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Operating Temperature Range",
        "specValue": "-10°C to 55°C",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Recommended Depth of Discharge (DoD)",
        "specValue": "85%",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "fd91aa8e-8f45-4553-b107-01b827936432",
    "categoryId": "7557460f-c5b9-4589-8590-6f9f07f2b3c3",
    "categorySlug": "electric-3-wheeler-batteries",
    "name": "MEHAR 51.2V 100Ah LFP Traction Battery",
    "slug": "mehar-51-2v-100ah-lfp-traction",
    "modelNumber": "MEIPLRI51100",
    "shortDescription": "51.2V 100Ah (5.12 kWh) high-capacity LiFePO4 battery pack for heavy-duty commercial E-Rickshaws and L5 cargo 3-wheelers.",
    "applicationTag": "E-Rickshaws & L5 Cargo 3W",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "51.2V",
    "capacityRange": "100Ah",
    "energyRange": "5,120 Wh",
    "cycleLife": "2,000+ cycles @ 85% DOD",
    "maxDischargeRate": "80A (Continuous) / 120A (Peak)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Smart BMS with CAN 2.0B / RS485",
    "ipRating": "IP65",
    "dimensions": "570 × 400 × 170 mm",
    "weight": "60 kg",
    "warrantySummary": "Contact MEHAR sales for commercial fleet warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-3w-battery.jpg",
    "minimumOrderQuantity": 5,
    "images": [
      {
        "id": "f7e03c17-bfd7-40c1-a584-98d7b517faaa",
        "imageUrl": "/assets/products/mehar-3w-battery.jpg",
        "altText": "MEHAR 51.2V 100Ah LFP Traction Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "51.2",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "100",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "5,120",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Series Configuration",
        "specValue": "16S",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "BMS Architecture",
        "specValue": "Digital Multi-Point Thermal Monitoring & Cell Balancing",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (L×W×H)",
        "specValue": "570 × 400 × 170",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "60",
        "specUnit": "kg",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP65",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "840b54db-60a7-4a1f-a885-9b8dcb91acff",
    "categoryId": "7557460f-c5b9-4589-8590-6f9f07f2b3c3",
    "categorySlug": "electric-3-wheeler-batteries",
    "name": "MEHAR 51.2V 150Ah LFP Heavy-Duty Traction Battery",
    "slug": "mehar-51-2v-150ah-lfp-heavy-duty",
    "modelNumber": "MEILRE51150",
    "shortDescription": "51.2V 150Ah (7.68 kWh) high-capacity LiFePO4 battery pack engineered for L5 commercial electric 3-wheelers and high-mileage delivery loaders.",
    "applicationTag": "L5 Cargo 3-Wheelers & Commercial Loaders",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "51.2V",
    "capacityRange": "150Ah",
    "energyRange": "7,680 Wh",
    "cycleLife": "2,000+ cycles @ 85% DOD",
    "maxDischargeRate": "100A (Continuous) / 150A (Peak)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "CAN 2.0B / RS485 Telemetry",
    "ipRating": "IP65",
    "dimensions": "570 × 400 × 240 mm",
    "weight": "75 kg",
    "warrantySummary": "Contact MEHAR sales for commercial fleet warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-3w-battery.jpg",
    "minimumOrderQuantity": 3,
    "images": [
      {
        "id": "a0181c29-db0b-45c0-9190-59e23167cf7b",
        "imageUrl": "/assets/products/mehar-3w-battery.jpg",
        "altText": "MEHAR 51.2V 150Ah LFP Heavy-Duty Traction Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "51.2",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "150",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "7,680",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (L×W×H)",
        "specValue": "570 × 400 × 240",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "75",
        "specUnit": "kg",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP65",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "5806ac4b-9eab-430c-9af8-9d892e7836f7",
    "categoryId": "7557460f-c5b9-4589-8590-6f9f07f2b3c3",
    "categorySlug": "electric-3-wheeler-batteries",
    "name": "MEHAR 51.2V 200Ah LFP L5 Fleet Battery",
    "slug": "mehar-51-2v-200ah-lfp-fleet",
    "modelNumber": "MEILRE51200",
    "shortDescription": "51.2V 200Ah (10.24 kWh) large-format LiFePO4 battery system designed for full-shift L5 electric delivery fleets and specialized traction equipment.",
    "applicationTag": "Full-Shift L5 Fleet & Traction Logistics",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "51.2V",
    "capacityRange": "200Ah",
    "energyRange": "10,240 Wh",
    "cycleLife": "2,000+ cycles @ 85% DOD",
    "maxDischargeRate": "120A (Continuous) / 200A (Peak)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "CAN 2.0B / RS485 Telemetry",
    "ipRating": "IP65",
    "dimensions": "990 × 400 × 170 mm",
    "weight": "100 kg",
    "warrantySummary": "Contact MEHAR sales for commercial fleet warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-3w-battery.jpg",
    "minimumOrderQuantity": 2,
    "images": [
      {
        "id": "a26993d1-fd11-4ed4-87d7-1ea50e5ce75d",
        "imageUrl": "/assets/products/mehar-3w-battery.jpg",
        "altText": "MEHAR 51.2V 200Ah LFP L5 Fleet Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "51.2",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "200",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "10,240",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (L×W×H)",
        "specValue": "990 × 400 × 170",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "100",
        "specUnit": "kg",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP65",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "3c493f45-529a-4395-b597-2bd3f1e6568b",
    "categoryId": "5a09cbca-4e29-4075-828f-01e942560520",
    "categorySlug": "energy-storage-inverter-batteries",
    "name": "MEHAR 12.8V 100Ah LiFePO4 Inverter Battery",
    "slug": "mehar-12-8v-100ah-lifepo4-inverter",
    "modelNumber": "MEIPLIV-12100",
    "shortDescription": "12.8V 100Ah (1,280 Wh) maintenance-free LiFePO4 deep-cycle battery for residential home inverters and small commercial UPS systems.",
    "applicationTag": "Home Inverters & Office UPS",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "12.8V",
    "capacityRange": "100Ah",
    "energyRange": "1,280 Wh",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "50A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Integrated Smart BMS with Multi-Layer Protection",
    "ipRating": "IP54 / Indoor Enclosure",
    "dimensions": "Configuration dependent",
    "weight": "~14 kg",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-ess-battery.jpg",
    "minimumOrderQuantity": 5,
    "images": [
      {
        "id": "e7ce8e4e-438e-4a7b-92a6-dcfef96038cf",
        "imageUrl": "/assets/products/mehar-ess-battery.jpg",
        "altText": "MEHAR 12.8V 100Ah LiFePO4 Inverter Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "12.8",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "100",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "1,280",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Round-Trip Efficiency",
        "specValue": ">95%",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,000+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "~14",
        "specUnit": "kg",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "5511be25-8289-475d-b98a-2acc08c31f02",
    "categoryId": "9fe572b4-89f3-4b17-a7e7-311e6a39cbe1",
    "categorySlug": "electric-2-wheeler-batteries",
    "name": "MEHAR 36V 15Ah E-Cycle Battery",
    "slug": "mehar-36v-15ah-e-cycle",
    "modelNumber": "MEIPLEC-36022",
    "shortDescription": "36V 15Ah heavy-duty lithium-ion battery pack for commercial delivery and cargo electric cycles.",
    "applicationTag": "Commercial Cargo E-Cycles",
    "chemistry": "Li-ion (Cylindrical)",
    "voltageRange": "36V",
    "capacityRange": "15Ah",
    "energyRange": "792 Wh",
    "cycleLife": "800+ cycles @ 80% DOD",
    "maxDischargeRate": "15A (Discharge)",
    "operatingTemp": "-10°C to 50°C",
    "bmsProtocols": "Integrated Hardware BMS",
    "ipRating": "IP65",
    "dimensions": "361 × 90 × 92 mm",
    "weight": "7 kg",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-2w-battery.jpg",
    "minimumOrderQuantity": 20,
    "images": [
      {
        "id": "7cfa9315-d5ad-4e0a-adfb-ed9c76b40f4f",
        "imageUrl": "/assets/products/mehar-2w-battery.jpg",
        "altText": "MEHAR 36V 15Ah E-Cycle Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "36",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "15",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Battery Energy Rating",
        "specValue": "792",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Charge Cutoff Voltage",
        "specValue": "42",
        "specUnit": "V",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Discharge Cutoff Voltage",
        "specValue": "27.5",
        "specUnit": "V",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Standard Charge Current",
        "specValue": "3",
        "specUnit": "A",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Max Continuous Discharge Current",
        "specValue": "15",
        "specUnit": "A",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (L×W×H)",
        "specValue": "361 × 90 × 92",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "7",
        "specUnit": "kg",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP65",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "3007269a-bed8-4e29-8872-46a3927ea09c",
    "categoryId": "b4288203-ca2c-4ff7-8a4c-15347f5753c9",
    "categorySlug": "solar-renewable-energy-batteries",
    "name": "MEHAR 51.2V 100Ah Solar ESS Storage Bank",
    "slug": "mehar-51-2v-100ah-solar-ess",
    "modelNumber": "MHR-SOL-51100",
    "shortDescription": "51.2V 100Ah (5.12 kWh) rack/wall-mount LiFePO4 solar energy storage battery with MPPT compatibility and RS485/CAN inverter communication.",
    "applicationTag": "Rooftop Solar & Hybrid Inverter ESS",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "51.2V",
    "capacityRange": "100Ah",
    "energyRange": "5,120 Wh",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "50A (Continuous) / 100A (Peak)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "CAN 2.0B / RS485 / Inverter Protocol Mapping",
    "ipRating": "IP54 / Indoor Wall Mount",
    "dimensions": "Configuration dependent (Standard 19-inch rack / Wall mount)",
    "weight": "~50 kg",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-solar-battery.jpg",
    "minimumOrderQuantity": 2,
    "images": [
      {
        "id": "d062bf9a-4183-4ed6-8319-92a7a9d59333",
        "imageUrl": "/assets/products/mehar-solar-battery.jpg",
        "altText": "MEHAR 51.2V 100Ah Solar ESS Storage Bank Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "51.2",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "100",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "5,120",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Inverter Communication",
        "specValue": "CAN 2.0B / RS485 (Compatible with major hybrid inverters)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,000+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "1615436b-f8fe-4f3a-a67b-a5c6ab70473e",
    "categoryId": "b4288203-ca2c-4ff7-8a4c-15347f5753c9",
    "categorySlug": "solar-renewable-energy-batteries",
    "name": "MEHAR 51.2V 200Ah Commercial Solar Storage Bank",
    "slug": "mehar-51-2v-200ah-commercial-solar-ess",
    "modelNumber": "MHR-SOL-51200",
    "shortDescription": "51.2V 200Ah (10.24 kWh) large-format LiFePO4 solar energy storage system for commercial microgrids, industrial rooftop PV, and farm installations.",
    "applicationTag": "Commercial Solar Microgrids & Rooftop PV",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "51.2V",
    "capacityRange": "200Ah",
    "energyRange": "10,240 Wh",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "100A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "CAN 2.0B / RS485 / Modbus",
    "ipRating": "IP54 / Rack Cabinet",
    "dimensions": "Configuration dependent",
    "weight": "~95 kg",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-solar-battery.jpg",
    "minimumOrderQuantity": 1,
    "images": [
      {
        "id": "d00e04db-95ea-4c91-a12b-b3294914a726",
        "imageUrl": "/assets/products/mehar-solar-battery.jpg",
        "altText": "MEHAR 51.2V 200Ah Commercial Solar Storage Bank Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "51.2",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "200",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "10,240",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,000+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "7b77f8af-17a4-41de-929e-683ecc27b93a",
    "categoryId": "f09243b5-e23d-44e9-869b-c24f666c3ea2",
    "categorySlug": "custom-oem-industrial-batteries",
    "name": "MEHAR 48V 200Ah Material Handling Forklift Battery",
    "slug": "mehar-48v-200ah-material-handling-forklift",
    "modelNumber": "MHR-IND-FLK-48200",
    "shortDescription": "48V 200Ah heavy-duty traction LiFePO4 battery pack engineered for electric forklifts, reach trucks, and warehouse pallet trucks (BOPT).",
    "applicationTag": "Electric Forklifts & Warehouse BOPT",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "48V (51.2V nominal)",
    "capacityRange": "200Ah",
    "energyRange": "10,240 Wh",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "150A (Continuous) / 250A (Peak)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Industrial CANbus / Telemetry Interface",
    "ipRating": "IP65 Heavy Steel Enclosure",
    "dimensions": "Customized per forklift battery bay",
    "weight": "Application dependent (~110-130 kg)",
    "warrantySummary": "Contact MEHAR sales for industrial warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-forklift-battery.jpg",
    "minimumOrderQuantity": 1,
    "images": [
      {
        "id": "e2ad878d-0c25-401c-97f5-f8ab2da8d0f6",
        "imageUrl": "/assets/products/mehar-forklift-battery.jpg",
        "altText": "MEHAR 48V 200Ah Material Handling Forklift Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "48",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "200",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "10,240",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Opportunity Charging",
        "specValue": "Supported (Rapid mid-shift partial recharge)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Chassis Casing",
        "specValue": "Heavy-Gauge Steel with Forklift Bay Counterweight",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "286860ca-6847-4c79-8311-6480eaffc38f",
    "categoryId": "f09243b5-e23d-44e9-869b-c24f666c3ea2",
    "categorySlug": "custom-oem-industrial-batteries",
    "name": "MEHAR 24V / 48V AGV & Autonomous Mobile Robot Battery",
    "slug": "mehar-agv-robotics-battery",
    "modelNumber": "MHR-IND-AGV-SERIES",
    "shortDescription": "24V / 48V high-cycle modular lithium pack engineered for automated guided vehicles (AGVs) and warehouse autonomous mobile robots (AMRs) with contact-plate opportunity charging.",
    "applicationTag": "AGVs, AMRs & Industrial Automation",
    "chemistry": "LiFePO4 / NMC",
    "voltageRange": "24V / 48V Variants",
    "capacityRange": "30Ah - 100Ah",
    "energyRange": "720 Wh - 4,800 Wh",
    "cycleLife": "2,000+ to 3,000+ cycles",
    "maxDischargeRate": "Application dependent",
    "operatingTemp": "-10°C to 50°C",
    "bmsProtocols": "CAN 2.0B / RS485 / Modbus",
    "ipRating": "IP54 / IP65",
    "dimensions": "Custom low-profile chassis envelope",
    "weight": "Application dependent",
    "warrantySummary": "Contact MEHAR sales for industrial warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-agv-battery.jpg",
    "minimumOrderQuantity": 2,
    "images": [
      {
        "id": "e4305635-b8ef-471d-91cd-a17f4c077fc5",
        "imageUrl": "/assets/products/mehar-agv-battery.jpg",
        "altText": "MEHAR 24V / 48V AGV & Autonomous Mobile Robot Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "System Voltage",
        "specValue": "24V / 48V Options",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Capacity Range",
        "specValue": "30Ah - 100Ah",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Communication Bus",
        "specValue": "CAN 2.0B / RS485 to AGV Motion Controller",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "97470024-4357-4395-9d3d-2f8dd9427d33",
    "categoryId": "5a09cbca-4e29-4075-828f-01e942560520",
    "categorySlug": "energy-storage-inverter-batteries",
    "name": "MEHAR 25.6V 100Ah LiFePO4 Battery Bank",
    "slug": "mehar-25-6v-100ah-lifepo4-battery",
    "modelNumber": "MHR-ESS-25100",
    "shortDescription": "25.6V 100Ah (2,560 Wh) 8S LiFePO4 battery pack engineered for 24V commercial inverter systems and telecom remote sites.",
    "applicationTag": "24V Commercial Inverter & Telecom",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "25.6V",
    "capacityRange": "100Ah",
    "energyRange": "2,560 Wh",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "50A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Smart BMS with RS485 / CANbus",
    "ipRating": "IP54",
    "dimensions": "Configuration dependent",
    "weight": "~26 kg",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-ess-battery.jpg",
    "minimumOrderQuantity": 3,
    "images": [
      {
        "id": "097a15f0-3f4b-417b-ae7e-efca3670414a",
        "imageUrl": "/assets/products/mehar-ess-battery.jpg",
        "altText": "MEHAR 25.6V 100Ah LiFePO4 Battery Bank Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "25.6",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "100",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "2,560",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,000+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "45acf0fc-ea89-4ada-89d8-b56aa41d927f",
    "categoryId": "5a09cbca-4e29-4075-828f-01e942560520",
    "categorySlug": "energy-storage-inverter-batteries",
    "name": "MEHAR 12.8V 200Ah LiFePO4 Inverter Battery",
    "slug": "mehar-12-8v-200ah-lifepo4-inverter",
    "modelNumber": "MEIPLIV-12200",
    "shortDescription": "12.8V 200Ah (2,560 Wh) heavy-duty deep-cycle LiFePO4 battery pack for continuous commercial power backup and large residential installations.",
    "applicationTag": "Commercial Inverter & UPS Backup",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "12.8V",
    "capacityRange": "200Ah",
    "energyRange": "2,560 Wh",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "100A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Integrated Smart BMS",
    "ipRating": "IP54 / Indoor Enclosure",
    "dimensions": "Configuration dependent",
    "weight": "~26 kg",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-ess-battery.jpg",
    "minimumOrderQuantity": 3,
    "images": [
      {
        "id": "64771cb2-e9e2-4c7f-bf9a-97fea2c81996",
        "imageUrl": "/assets/products/mehar-ess-battery.jpg",
        "altText": "MEHAR 12.8V 200Ah LiFePO4 Inverter Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "12.8",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "200",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "2,560",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,000+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "~26",
        "specUnit": "kg",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "863736d4-6d3b-4409-ab95-0d4283e9d415",
    "categoryId": "3979ab23-6646-4005-9f2e-5841815379bb",
    "categorySlug": "chargers-power-electronics",
    "name": "MEHAR Smart Hybrid Lithium Inverter (12V 1200W)",
    "slug": "mehar-smart-hybrid-inverter-12v-1200w",
    "modelNumber": "MHR-INV-121200",
    "shortDescription": "12V 1200W wall-mountable pure sine wave hybrid lithium inverter with integrated solar and grid charging management.",
    "applicationTag": "Residential Inverter & Solar Backup",
    "chemistry": "Power Electronics (Pure Sine Wave Inverter)",
    "voltageRange": "12V DC Input / 230V AC Output",
    "capacityRange": "1200W Rated Power",
    "energyRange": null,
    "cycleLife": null,
    "maxDischargeRate": null,
    "operatingTemp": "0°C to 50°C",
    "bmsProtocols": "Smart Lithium Charge Controller Integration",
    "ipRating": "IP21 (Indoor Wall Mount)",
    "dimensions": "Wall-mount form factor",
    "weight": "Configuration dependent",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-ev-charger.jpg",
    "minimumOrderQuantity": 5,
    "images": [
      {
        "id": "1d272be1-0de9-47c2-841e-7ab98e1cdc5d",
        "imageUrl": "/assets/products/mehar-ev-charger.jpg",
        "altText": "MEHAR Smart Hybrid Lithium Inverter (12V 1200W) Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "DC Input Voltage",
        "specValue": "12",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Output Power",
        "specValue": "1200",
        "specUnit": "W",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Output Waveform",
        "specValue": "Pure Sine Wave",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Output Voltage",
        "specValue": "230V AC ± 2%",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Charge Technology",
        "specValue": "Multi-Stage Fast Lithium Charging (3-4 hr full recharge)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Mounting Type",
        "specValue": "Wall-Mounted Slim Enclosure",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "3ca562fb-17b4-47dc-b186-d684e38bb0c3",
    "categoryId": "7bcc1a84-f32f-4f38-9f85-eef4a31046fe",
    "categorySlug": "cylindrical-li-ion-cells",
    "name": "MEHAR 21700 3.2V 3500mAh LiFePO4 Cylindrical Cell",
    "slug": "mehar-21700-3-2v-3500mah-lifepo4-cell",
    "modelNumber": "MHR-CELL-21700-3500-LFP",
    "shortDescription": "High-safety 21700 LiFePO4 cylindrical cell delivering 3,500mAh capacity with ultra-high thermal tolerance and 2,500+ deep discharge cycles.",
    "applicationTag": "Commercial ESS & Telecom Backup Systems",
    "chemistry": "LiFePO4 (Lithium Iron Phosphate)",
    "voltageRange": "3.2V (2.5V - 3.65V Operating)",
    "capacityRange": "3,500 mAh (3.5 Ah)",
    "energyRange": "11.2 Wh",
    "cycleLife": "2,500+ cycles @ 80% DOD",
    "maxDischargeRate": "10.5A (3C Continuous)",
    "operatingTemp": "-20°C to 65°C",
    "bmsProtocols": "Welded Module Assembly",
    "ipRating": "Heavy-Wall Steel Canister",
    "dimensions": "21.2 mm (Dia) × 70.3 mm (H)",
    "weight": "~72 g",
    "warrantySummary": "Contact MEHAR sales for bulk cell batch terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-cell-21700-lfp.jpg",
    "minimumOrderQuantity": 100,
    "images": [
      {
        "id": "6764d624-5890-40bf-a12c-db89ada66d06",
        "imageUrl": "/assets/products/mehar-cell-21700-lfp.jpg",
        "altText": "MEHAR 21700 3.2V 3500mAh LiFePO4 Cylindrical Cell Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "3.2",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "3500",
        "specUnit": "mAh",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Nominal Energy",
        "specValue": "11.2",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrochemistry",
        "specKey": "Cathode Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Form Factor",
        "specValue": "21700 Cylindrical",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (Dia × H)",
        "specValue": "21.2 × 70.3",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "2,500+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "97ffd97e-a899-411d-a166-3369344a95b5",
    "categoryId": "7bcc1a84-f32f-4f38-9f85-eef4a31046fe",
    "categorySlug": "cylindrical-li-ion-cells",
    "name": "32700 3.2V 6000mAh LiFePO4 High-Cycle Cell",
    "slug": "mehar-32700-3-2v-6000mah-lifepo4-cell",
    "modelNumber": "MHR-CELL-32700-6000",
    "shortDescription": "Heavy-duty 32700 LiFePO4 cylindrical cell engineered for high thermal stability, deep cycling (2,500+ cycles), and E-Rickshaw/solar bank packaging.",
    "applicationTag": "E-Rickshaws, Solar ESS & Commercial Storage",
    "chemistry": "LiFePO4 (Lithium Iron Phosphate)",
    "voltageRange": "3.2V (2.5V - 3.65V Operating)",
    "capacityRange": "6,000 mAh (6.0 Ah)",
    "energyRange": "19.2 Wh",
    "cycleLife": "2,500+ cycles @ 80% DOD",
    "maxDischargeRate": "18A (3C Continuous) / 30A (5C Peak)",
    "operatingTemp": "-20°C to 65°C",
    "bmsProtocols": "Screw Terminal / Welded Nickel Busbar Assembly",
    "ipRating": "Heavy-Wall Steel Canister with Pressure Relief Vent",
    "dimensions": "32.2 mm (Dia) × 70.5 mm (H)",
    "weight": "~140 g",
    "warrantySummary": "Contact MEHAR sales for bulk cell batch terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-cell-32700-lfp.jpg",
    "minimumOrderQuantity": 50,
    "images": [
      {
        "id": "4dc74fbb-25ab-40a4-a215-3923004d50bd",
        "imageUrl": "/assets/products/mehar-cell-32700-lfp.jpg",
        "altText": "MEHAR 32700 3.2V 6000mAh LiFePO4 High-Cycle Cell Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "3.2",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "6000",
        "specUnit": "mAh",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Nominal Energy",
        "specValue": "19.2",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Max Continuous Discharge",
        "specValue": "18",
        "specUnit": "A (3C)",
        "isHighlight": false
      },
      {
        "groupName": "Electrochemistry",
        "specKey": "Cathode Chemistry",
        "specValue": "LiFePO4 (Lithium Iron Phosphate)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Electrochemistry",
        "specKey": "Internal AC Impedance",
        "specValue": "≤ 15",
        "specUnit": "mΩ (@ 1kHz)",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Form Factor",
        "specValue": "32700 Cylindrical",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (Dia × H)",
        "specValue": "32.2 × 70.5",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "140",
        "specUnit": "g",
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "2,500+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "42eee2cd-af97-44bd-8b0b-9d4637768a81",
    "categoryId": "f09243b5-e23d-44e9-869b-c24f666c3ea2",
    "categorySlug": "custom-oem-industrial-batteries",
    "name": "MEHAR Custom Dimensional OEM Battery Pack",
    "slug": "mehar-custom-dimensional-oem-battery",
    "modelNumber": "MHR-OEM-CUSTOM-BUILD",
    "shortDescription": "Bespoke battery pack development for specialized equipment manufacturers requiring unique voltage, non-standard dimensions, specific communication buses, or harsh environment sealing.",
    "applicationTag": "Custom Equipment OEMs & System Integrators",
    "chemistry": "LiFePO4 / NMC / Advanced Chemistries",
    "voltageRange": "Engineered to OEM Requirement (12V to 400V+)",
    "capacityRange": "Engineered to OEM Requirement (5Ah to 500Ah+)",
    "energyRange": "Application dependent",
    "cycleLife": "Application dependent",
    "maxDischargeRate": "Engineered per Duty Cycle",
    "operatingTemp": "Application dependent",
    "bmsProtocols": "CAN 2.0B / RS485 / Modbus / Bluetooth / Custom",
    "ipRating": "IP65 / IP67 Options",
    "dimensions": "Fabricated to OEM CAD Envelope",
    "weight": "Application dependent",
    "warrantySummary": "Defined in OEM Supply Agreement",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-oem-battery.jpg",
    "minimumOrderQuantity": 1,
    "images": [
      {
        "id": "3aa252e0-2473-452b-be7c-6c36854e7cbf",
        "imageUrl": "/assets/products/mehar-oem-battery.jpg",
        "altText": "MEHAR Custom Dimensional OEM Battery Pack Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Engineering",
        "specKey": "Custom Voltage & Capacity",
        "specValue": "Engineered to OEM Drawing Specifications",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Engineering",
        "specKey": "Enclosure Design",
        "specValue": "Sheet-Metal / CNC Aluminum / Molded ABS",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Communication",
        "specKey": "Telemetry Protocols",
        "specValue": "CAN 2.0B / RS485 / SMBus / Custom Harness",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Quality",
        "specKey": "Testing & Validation",
        "specValue": "100% EOL Automated Cycle Testing & Thermal Verification",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "f7e73f76-66c9-4515-886e-27dd027c239a",
    "categoryId": "9fe572b4-89f3-4b17-a7e7-311e6a39cbe1",
    "categorySlug": "electric-2-wheeler-batteries",
    "name": "MEHAR 48V 25Ah NMC E-Scooter Battery",
    "slug": "mehar-48v-25ah-nmc-e-scooter",
    "modelNumber": "MHR-2W-48025-NMC",
    "shortDescription": "48V 25Ah NMC lithium-ion battery pack for electric scooters and urban delivery fleets with integrated Smart BMS.",
    "applicationTag": "Electric Scooters & E-Bikes",
    "chemistry": "NMC (Lithium-ion)",
    "voltageRange": "48V",
    "capacityRange": "25Ah",
    "energyRange": "1,200 Wh",
    "cycleLife": "1,200+ cycles @ 80% DOD",
    "maxDischargeRate": "30A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Integrated Smart BMS (Optional CAN / RS485)",
    "ipRating": "IP65",
    "dimensions": "Configuration dependent",
    "weight": "Application dependent (~9-11 kg)",
    "warrantySummary": "Contact MEHAR sales for commercial fleet warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-2w-battery.jpg",
    "minimumOrderQuantity": 10,
    "images": [
      {
        "id": "62f72766-e54a-44e6-9e23-d0128ab2e748",
        "imageUrl": "/assets/products/mehar-2w-battery.jpg",
        "altText": "MEHAR 48V 25Ah NMC E-Scooter Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "48",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "25",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "1,200",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "NMC (Nickel Manganese Cobalt)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Protection Functions",
        "specValue": "Over-charge, Over-discharge, Over-current, Short-circuit, Thermal cutoff",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Cell Balancing",
        "specValue": "Passive / Active resistive balancing",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Casing Type",
        "specValue": "MS Powder-Coated / Aluminum Alloy",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP65",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Operating Temperature Range",
        "specValue": "-10°C to 55°C",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "1,200+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "c69b8b84-55c6-4b70-8d14-84b6f348da86",
    "categoryId": "5a09cbca-4e29-4075-828f-01e942560520",
    "categorySlug": "energy-storage-inverter-batteries",
    "name": "MEHAR 12.8V 150Ah LiFePO4 Inverter Battery",
    "slug": "mehar-12-8v-150ah-lifepo4-inverter",
    "modelNumber": "MEIPLIV-12150",
    "shortDescription": "12.8V 150Ah (1,920 Wh) deep-cycle LiFePO4 battery pack for high-backup residential and commercial inverter applications.",
    "applicationTag": "High-Backup Home Inverters",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "12.8V",
    "capacityRange": "150Ah",
    "energyRange": "1,920 Wh",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "75A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Integrated Smart BMS",
    "ipRating": "IP54 / Indoor Enclosure",
    "dimensions": "Configuration dependent",
    "weight": "~20 kg",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-ess-battery.jpg",
    "minimumOrderQuantity": 5,
    "images": [
      {
        "id": "cc926854-71e8-4d9f-8b9e-4312b1b974e5",
        "imageUrl": "/assets/products/mehar-ess-battery.jpg",
        "altText": "MEHAR 12.8V 150Ah LiFePO4 Inverter Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "12.8",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "150",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "1,920",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,000+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "~20",
        "specUnit": "kg",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "0b473143-6e9f-43cf-b396-8d3be6863bb1",
    "categoryId": "7bcc1a84-f32f-4f38-9f85-eef4a31046fe",
    "categorySlug": "cylindrical-li-ion-cells",
    "name": "21700 3.7V 5000mAh NMC High-Energy Cell",
    "slug": "mehar-21700-3-7v-5000mah-nmc-cell",
    "modelNumber": "MHR-CELL-21700-5000",
    "shortDescription": "High-energy 21700 NMC cylindrical lithium-ion cell with exceptional energy density and high continuous current delivery for traction packs.",
    "applicationTag": "EV Traction Packs & Commercial Mobility",
    "chemistry": "NMC (Nickel Manganese Cobalt)",
    "voltageRange": "3.7V (2.75V - 4.2V Operating)",
    "capacityRange": "5,000 mAh (5.0 Ah)",
    "energyRange": "18.5 Wh",
    "cycleLife": "1,000+ cycles @ 80% DOD",
    "maxDischargeRate": "15A (3C Continuous) / 25A (5C Peak)",
    "operatingTemp": "-20°C to 60°C",
    "bmsProtocols": "Module Packaging Integration",
    "ipRating": "Reinforced Steel Casing",
    "dimensions": "21.2 mm (Dia) × 70.3 mm (H)",
    "weight": "~69 g",
    "warrantySummary": "Contact MEHAR sales for bulk cell batch terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-cell-21700-nmc.jpg",
    "minimumOrderQuantity": 100,
    "images": [
      {
        "id": "912d74db-6e6b-44b6-92d0-74129f7b6969",
        "imageUrl": "/assets/products/mehar-cell-21700-nmc.jpg",
        "altText": "MEHAR 21700 3.7V 5000mAh NMC High-Energy Cell Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "3.7",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "5000",
        "specUnit": "mAh",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Nominal Energy",
        "specValue": "18.5",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Max Continuous Discharge",
        "specValue": "15",
        "specUnit": "A (3C)",
        "isHighlight": false
      },
      {
        "groupName": "Electrochemistry",
        "specKey": "Cathode Chemistry",
        "specValue": "NMC",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Form Factor",
        "specValue": "21700 Cylindrical",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (Dia × H)",
        "specValue": "21.2 × 70.3",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "69",
        "specUnit": "g",
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "1,000+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "11fa41f6-2fea-41be-aea9-ca731652825c",
    "categoryId": "7bcc1a84-f32f-4f38-9f85-eef4a31046fe",
    "categorySlug": "cylindrical-li-ion-cells",
    "name": "18650 3.7V 2600mAh NMC Cylindrical Cell",
    "slug": "mehar-18650-3-7v-2600mah-nmc-cell",
    "modelNumber": "MHR-CELL-18650-2600",
    "shortDescription": "Industrial standard 18650 high-density NMC cylindrical lithium-ion cell for modular battery packs, electric 2-wheelers, and portable equipment.",
    "applicationTag": "Electric 2-Wheelers & Modular Battery Packs",
    "chemistry": "NMC (Nickel Manganese Cobalt)",
    "voltageRange": "3.7V (2.75V - 4.2V Operating)",
    "capacityRange": "2,600 mAh (2.6 Ah)",
    "energyRange": "9.62 Wh",
    "cycleLife": "800+ cycles @ 80% DOD",
    "maxDischargeRate": "7.8A (3C Continuous)",
    "operatingTemp": "-20°C to 60°C (Discharge) / 0°C to 45°C (Charge)",
    "bmsProtocols": "Individual Cell / Welded Module Assembly",
    "ipRating": "Standard Steel Canister with Heat-Shrink Sleeve",
    "dimensions": "18.3 mm (Dia) × 65.0 mm (H)",
    "weight": "~46 g",
    "warrantySummary": "Contact MEHAR sales for bulk cell batch terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-cell-18650-nmc.jpg",
    "minimumOrderQuantity": 100,
    "images": [
      {
        "id": "d25d5a0e-0311-4fe2-8eee-a28ed8768801",
        "imageUrl": "/assets/products/mehar-cell-18650-nmc.jpg",
        "altText": "MEHAR 18650 3.7V 2600mAh NMC Cylindrical Cell Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "3.7",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "2600",
        "specUnit": "mAh",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Nominal Energy",
        "specValue": "9.62",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Max Continuous Discharge",
        "specValue": "7.8",
        "specUnit": "A (3C)",
        "isHighlight": false
      },
      {
        "groupName": "Electrochemistry",
        "specKey": "Cathode Chemistry",
        "specValue": "NMC (Nickel Manganese Cobalt)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Electrochemistry",
        "specKey": "Internal AC Impedance",
        "specValue": "≤ 35",
        "specUnit": "mΩ (@ 1kHz)",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Form Factor",
        "specValue": "18650 Cylindrical",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (Dia × H)",
        "specValue": "18.3 × 65.0",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "46",
        "specUnit": "g",
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "800+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "2e5681e2-fd17-4f7c-b6c9-455bfddd677d",
    "categoryId": "7bcc1a84-f32f-4f38-9f85-eef4a31046fe",
    "categorySlug": "cylindrical-li-ion-cells",
    "name": "18650 3.2V 1800mAh LiFePO4 Cylindrical Cell",
    "slug": "mehar-18650-3-2v-1800mah-lifepo4-cell",
    "modelNumber": "MHR-CELL-18650-1800-LFP",
    "shortDescription": "Long-life 18650 LiFePO4 cylindrical cell optimized for solar street lights, emergency lighting, and deep-cycle compact battery systems.",
    "applicationTag": "Solar Street Lighting & Emergency Backup",
    "chemistry": "LiFePO4 (Lithium Iron Phosphate)",
    "voltageRange": "3.2V (2.5V - 3.65V Operating)",
    "capacityRange": "1,800 mAh (1.8 Ah)",
    "energyRange": "5.76 Wh",
    "cycleLife": "2,000+ cycles @ 80% DOD",
    "maxDischargeRate": "5.4A (3C Continuous)",
    "operatingTemp": "-20°C to 60°C",
    "bmsProtocols": "Welded Module Assembly",
    "ipRating": "Standard Steel Canister",
    "dimensions": "18.3 mm (Dia) × 65.0 mm (H)",
    "weight": "~42 g",
    "warrantySummary": "Contact MEHAR sales for bulk cell batch terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-cell-18650-lfp.jpg",
    "minimumOrderQuantity": 100,
    "images": [
      {
        "id": "5768ee5b-9815-45b6-9b95-16a9cb0258c8",
        "imageUrl": "/assets/products/mehar-cell-18650-lfp.jpg",
        "altText": "MEHAR 18650 3.2V 1800mAh LiFePO4 Cylindrical Cell Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "3.2",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "1800",
        "specUnit": "mAh",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Nominal Energy",
        "specValue": "5.76",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrochemistry",
        "specKey": "Cathode Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Form Factor",
        "specValue": "18650 Cylindrical",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (Dia × H)",
        "specValue": "18.3 × 65.0",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "2,000+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "a836765a-a6a4-4bfd-bec1-35a3f790c64f",
    "categoryId": "f09243b5-e23d-44e9-869b-c24f666c3ea2",
    "categorySlug": "custom-oem-industrial-batteries",
    "name": "MEHAR High-Discharge Drone & UAV Battery Pack",
    "slug": "mehar-high-discharge-drone-uav-battery",
    "modelNumber": "MHR-AERO-DRN-SERIES",
    "shortDescription": "High-discharge C-rate lithium battery packs engineered for agricultural spraying drones, survey UAVs, and commercial logistics aerial systems.",
    "applicationTag": "Agricultural & Heavy-Lift UAVs",
    "chemistry": "High-C Li-ion / Solid-State Polymer",
    "voltageRange": "22.2V (6S) to 44.4V (12S / 14S)",
    "capacityRange": "16,000mAh to 30,000mAh",
    "energyRange": "Application dependent",
    "cycleLife": "500+ high-drain cycles",
    "maxDischargeRate": "15C - 25C Continuous / 50C Burst",
    "operatingTemp": "-10°C to 45°C",
    "bmsProtocols": "Smart Fuel Gauge / Drone Telemetry",
    "ipRating": "IP54 Splash-Resistant Casing",
    "dimensions": "Custom aerodynamic envelope",
    "weight": "Application dependent",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-drone-battery.jpg",
    "minimumOrderQuantity": 5,
    "images": [
      {
        "id": "1aaa6177-36bc-4fe3-94f5-15ff936a5b65",
        "imageUrl": "/assets/products/mehar-drone-battery.jpg",
        "altText": "MEHAR High-Discharge Drone & UAV Battery Pack Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Voltage Configuration",
        "specValue": "6S (22.2V) / 12S (44.4V) / 14S",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Discharge C-Rate",
        "specValue": "15C - 25C Continuous",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Operational",
        "specKey": "Application Focus",
        "specValue": "Agricultural Spraying, Heavy-Lift Logistics, Survey UAV",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "2b8fbc2e-499b-40c9-ac25-234adf5216c2",
    "categoryId": "f09243b5-e23d-44e9-869b-c24f666c3ea2",
    "categorySlug": "custom-oem-industrial-batteries",
    "name": "MEHAR 48V 100Ah Telecom BTS Rack Battery",
    "slug": "mehar-48v-100ah-telecom-bts-rack",
    "modelNumber": "MHR-TEL-48100",
    "shortDescription": "48V 100Ah standard 19-inch 3U rack-mountable LiFePO4 battery bank for cellular tower Base Transceiver Stations (BTS) and telecom infrastructure.",
    "applicationTag": "Telecom BTS & Datacenter Edge Racks",
    "chemistry": "LiFePO4 (LFP)",
    "voltageRange": "48V (51.2V nominal)",
    "capacityRange": "100Ah",
    "energyRange": "5,120 Wh",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "50A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "RS485 / RS232 / SNMP Telecom Protocol Support",
    "ipRating": "Standard 19-inch 3U Enclosure",
    "dimensions": "442 × 480 × 133 mm (19-inch 3U)",
    "weight": "~44 kg",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-telecom-battery.jpg",
    "minimumOrderQuantity": 5,
    "images": [
      {
        "id": "27983ed4-503d-412a-826e-6f17b2f4ca5c",
        "imageUrl": "/assets/products/mehar-telecom-battery.jpg",
        "altText": "MEHAR 48V 100Ah Telecom BTS Rack Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "48",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "100",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "5,120",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Form Factor",
        "specValue": "19-inch 3U Rack-Mount Standard",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "754166e8-b767-4d67-90ac-4363de25f4bb",
    "categoryId": "3979ab23-6646-4005-9f2e-5841815379bb",
    "categorySlug": "chargers-power-electronics",
    "name": "MEHAR Smart Hybrid Lithium Inverter (24V 3000W)",
    "slug": "mehar-smart-hybrid-inverter-24v-3000w",
    "modelNumber": "MHR-INV-243000",
    "shortDescription": "24V 3000W pure sine wave hybrid solar inverter designed for medium residential and light commercial solar-grid systems.",
    "applicationTag": "Commercial Inverter & Rooftop Solar",
    "chemistry": "Power Electronics (Hybrid Inverter)",
    "voltageRange": "24V DC Input / 230V AC Output",
    "capacityRange": "3000W Rated Power",
    "energyRange": null,
    "cycleLife": null,
    "maxDischargeRate": null,
    "operatingTemp": "0°C to 50°C",
    "bmsProtocols": "Smart Lithium Charge Integration",
    "ipRating": "IP21 (Indoor Wall Mount)",
    "dimensions": "Wall-mount form factor",
    "weight": "Configuration dependent",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-ev-charger.jpg",
    "minimumOrderQuantity": 3,
    "images": [
      {
        "id": "2e743ae6-ea63-4c34-81f2-695d4e7ec69a",
        "imageUrl": "/assets/products/mehar-ev-charger.jpg",
        "altText": "MEHAR Smart Hybrid Lithium Inverter (24V 3000W) Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "DC Input Voltage",
        "specValue": "24",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Output Power",
        "specValue": "3000",
        "specUnit": "W",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Output Waveform",
        "specValue": "Pure Sine Wave",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Hybrid Capabilities",
        "specValue": "Dual Solar PV & Utility Grid Auto-Switching",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "f9ca8195-d2d5-41a3-8ce1-3e7f32ae43c9",
    "categoryId": "3979ab23-6646-4005-9f2e-5841815379bb",
    "categorySlug": "chargers-power-electronics",
    "name": "MEHAR Smart Hybrid Lithium Inverter (48V 5000W / 6200W)",
    "slug": "mehar-smart-hybrid-inverter-48v-5000w",
    "modelNumber": "MHR-INV-485000",
    "shortDescription": "48V 5000W / 6200W high-power hybrid solar inverter engineered for off-grid commercial facilities, mini-grids, and large solar storage banks.",
    "applicationTag": "High-Power Solar ESS & Commercial Inverter",
    "chemistry": "Power Electronics (Hybrid Inverter)",
    "voltageRange": "48V DC Input / 230V AC Output",
    "capacityRange": "5000W - 6200W",
    "energyRange": null,
    "cycleLife": null,
    "maxDischargeRate": null,
    "operatingTemp": "0°C to 50°C",
    "bmsProtocols": "CAN / RS485 Smart BMS Communication",
    "ipRating": "IP21 (Indoor Wall Mount)",
    "dimensions": "Wall-mount form factor",
    "weight": "Configuration dependent",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-ev-charger.jpg",
    "minimumOrderQuantity": 2,
    "images": [
      {
        "id": "e497fe9e-4e0c-43ea-b054-1a370871ec3e",
        "imageUrl": "/assets/products/mehar-ev-charger.jpg",
        "altText": "MEHAR Smart Hybrid Lithium Inverter (48V 5000W / 6200W) Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "DC Input Voltage",
        "specValue": "48",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Output Power",
        "specValue": "5000W / 6200W",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Output Waveform",
        "specValue": "Pure Sine Wave",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "BMS Interface",
        "specValue": "RS485 / CANbus Direct Communication",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "3cbf6d0a-d7a8-4eaf-ac9b-31c2bd875d88",
    "categoryId": "3979ab23-6646-4005-9f2e-5841815379bb",
    "categorySlug": "chargers-power-electronics",
    "name": "MEHAR Intelligent Multi-Stage Lithium EV Charger (48V / 60V / 72V)",
    "slug": "mehar-intelligent-lithium-ev-charger",
    "modelNumber": "MHR-CHG-EV-MULTI",
    "shortDescription": "Industrial-grade CC/CV intelligent lithium battery charger series with automatic cutoff, reverse-polarity protection, and thermal monitoring for 2W & 3W fleets.",
    "applicationTag": "EV Fleet Depot & Depot Charging",
    "chemistry": "Power Electronics (Intelligent CC/CV Charger)",
    "voltageRange": "48V / 60V / 72V Compatible Variants",
    "capacityRange": "5A - 20A Charging Current",
    "energyRange": null,
    "cycleLife": null,
    "maxDischargeRate": null,
    "operatingTemp": "-10°C to 45°C",
    "bmsProtocols": "Hardware / CANbus Enable Signal",
    "ipRating": "IP54",
    "dimensions": "Configuration dependent",
    "weight": "Application dependent",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-ev-charger.jpg",
    "minimumOrderQuantity": 10,
    "images": [
      {
        "id": "18fc108b-5c10-4679-b1e4-55c9333c97c6",
        "imageUrl": "/assets/products/mehar-ev-charger.jpg",
        "altText": "MEHAR Intelligent Multi-Stage Lithium EV Charger (48V / 60V / 72V) Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Output Voltage Compatibility",
        "specValue": "48V / 60V / 72V (Configurable)",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Charging Profile",
        "specValue": "CC / CV (Constant Current / Constant Voltage)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Safety",
        "specKey": "Protective Features",
        "specValue": "Over-voltage cutoff, Short-circuit protection, Reverse polarity guard, Thermal sensor",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "b6fee315-0367-47b1-af9a-64875c280879",
    "categoryId": "9fe572b4-89f3-4b17-a7e7-311e6a39cbe1",
    "categorySlug": "electric-2-wheeler-batteries",
    "name": "MEHAR 72V 30Ah NMC Performance Battery",
    "slug": "mehar-72v-30ah-nmc-performance",
    "modelNumber": "MHR-2W-72030-NMC",
    "shortDescription": "72V / 74V 30Ah high-voltage NMC pack designed for performance electric motorcycles and delivery fleets requiring extended range.",
    "applicationTag": "Electric Motorcycles & Performance 2W",
    "chemistry": "NMC (Lithium-ion)",
    "voltageRange": "72V (74V nominal)",
    "capacityRange": "30Ah",
    "energyRange": "2,220 Wh",
    "cycleLife": "1,200+ cycles @ 80% DOD",
    "maxDischargeRate": "50A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "CAN 2.0B / RS485 / Bluetooth Telemetry",
    "ipRating": "IP67",
    "dimensions": "Configuration dependent",
    "weight": "Application dependent (~16-18 kg)",
    "warrantySummary": "Contact MEHAR sales for commercial fleet warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-2w-battery.jpg",
    "minimumOrderQuantity": 10,
    "images": [
      {
        "id": "07cc8b91-b4f6-4dbd-914f-77904597b916",
        "imageUrl": "/assets/products/mehar-2w-battery.jpg",
        "altText": "MEHAR 72V 30Ah NMC Performance Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "72",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "30",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "2,220",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "NMC",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Communication Protocols",
        "specValue": "CAN 2.0B / RS485",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP67",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "c3cb558e-4a22-4cfa-b97a-8d53b0d76291",
    "categoryId": "9fe572b4-89f3-4b17-a7e7-311e6a39cbe1",
    "categorySlug": "electric-2-wheeler-batteries",
    "name": "MEHAR 36V 10Ah E-Cycle Battery",
    "slug": "mehar-36v-10ah-e-cycle",
    "modelNumber": "MEIPLEC-36018",
    "shortDescription": "36V 10Ah high-capacity lithium-ion battery pack for extended-range commuter and cargo electric cycles.",
    "applicationTag": "Electric Bicycles & E-Cycles",
    "chemistry": "Li-ion (Cylindrical)",
    "voltageRange": "36V",
    "capacityRange": "10Ah",
    "energyRange": "648 Wh",
    "cycleLife": "800+ cycles @ 80% DOD",
    "maxDischargeRate": "10A (Discharge)",
    "operatingTemp": "-10°C to 50°C",
    "bmsProtocols": "Integrated Hardware BMS",
    "ipRating": "IP65",
    "dimensions": "361 × 90 × 92 mm",
    "weight": "5 kg",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-2w-battery.jpg",
    "minimumOrderQuantity": 20,
    "images": [
      {
        "id": "0471088a-1c77-465f-8a21-b8685fb368b2",
        "imageUrl": "/assets/products/mehar-2w-battery.jpg",
        "altText": "MEHAR 36V 10Ah E-Cycle Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "36",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "10",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Battery Energy Rating",
        "specValue": "648",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Charge Cutoff Voltage",
        "specValue": "42",
        "specUnit": "V",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Discharge Cutoff Voltage",
        "specValue": "27.5",
        "specUnit": "V",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Standard Charge Current",
        "specValue": "3",
        "specUnit": "A",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Max Continuous Discharge Current",
        "specValue": "10",
        "specUnit": "A",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (L×W×H)",
        "specValue": "361 × 90 × 92",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "5",
        "specUnit": "kg",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP65",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-e-3w-51-100-lfp",
    "categoryId": "7557460f-c5b9-4589-8590-6f9f07f2b3c3",
    "categorySlug": "electric-3-wheeler-batteries",
    "name": "MEHAR 51.2V 100Ah Heavy-Duty E-Rickshaw LiFePO4 Battery",
    "slug": "mehar-51-2v-100ah-heavy-duty-e-rickshaw",
    "modelNumber": "MHR-3W-51100-HD",
    "shortDescription": "Heavy-duty 51.2V 100Ah (5.12kWh) Prismatic LiFePO4 traction battery for commercial passenger E-Rickshaws, featuring digital blue LCD SoC display and welded steel protection.",
    "applicationTag": "Commercial Passenger E-Rickshaws",
    "chemistry": "LiFePO4 (Grade-A Prismatic Cells)",
    "voltageRange": "51.2V (Nominal) · 16S Configuration",
    "capacityRange": "100Ah",
    "energyRange": "5,120 Wh (5.12 kWh)",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "100A (Continuous) / 180A (Peak 15s)",
    "operatingTemp": "-10°C to 60°C",
    "bmsProtocols": "Heavy-Duty Smart BMS with Blue LCD SoC Readout & CAN 2.0B / RS485",
    "ipRating": "IP67 Dustproof & Water Resistant",
    "dimensions": "480 x 260 x 260 mm",
    "weight": "44.0 kg",
    "warrantySummary": "3-Year Full Replacement Commercial Warranty / 3,000 Cycles",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-3w-battery.jpg",
    "minimumOrderQuantity": 5,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "51.2",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "100",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Max Continuous Discharge",
        "specValue": "100",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Fast Charging Time",
        "specValue": "2.5 - 3.5 Hours with 30A/40A CC-CV Charger",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Display",
        "specKey": "User Interface",
        "specValue": "Integrated Digital Blue LCD Screen (Voltage, Real-Time %, Fault Alerts)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Safety Standard",
        "specValue": "AIS-156 Phase 2 Compliant with Thermal Propagation Barrier",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Enclosure",
        "specValue": "Heavy-Gauge Cold-Rolled Powder Coated Steel with Welded Dual Side Handles",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Terminals",
        "specValue": "Heavy M8 Brass Lugs with Insulated Rubber Boots",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Expected Daily Range",
        "specValue": "110 - 135 km per charge (passenger load dependent)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,000+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-e-3w-51-130-lfp",
    "categoryId": "7557460f-c5b9-4589-8590-6f9f07f2b3c3",
    "categorySlug": "electric-3-wheeler-batteries",
    "name": "MEHAR 51.2V 130Ah Commercial Cargo Loader Battery",
    "slug": "mehar-51-2v-130ah-cargo-loader-battery",
    "modelNumber": "MHR-3W-51130-CRG",
    "shortDescription": "High-capacity 51.2V 130Ah (6.65kWh) Prismatic LiFePO4 battery pack engineered for L5 cargo 3-wheelers and high-torque delivery loaders.",
    "applicationTag": "L5 Cargo 3-Wheelers & Electric Loaders",
    "chemistry": "LiFePO4 (Grade-A Prismatic Cells)",
    "voltageRange": "51.2V (Nominal)",
    "capacityRange": "130Ah",
    "energyRange": "6,656 Wh (6.65 kWh)",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "120A (Continuous) / 220A (Peak 15s)",
    "operatingTemp": "-10°C to 60°C",
    "bmsProtocols": "Automotive CAN 2.0B + Digital SoC Display",
    "ipRating": "IP67",
    "dimensions": "520 x 280 x 270 mm",
    "weight": "56.0 kg",
    "warrantySummary": "3-Year Commercial Warranty",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-3w-battery.jpg",
    "minimumOrderQuantity": 5,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "51.2",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "130",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Max Continuous Discharge",
        "specValue": "120",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Daily Payload Range",
        "specValue": "140 - 165 km (under 600kg payload)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,000+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-e-3w-51-86-lfp",
    "categoryId": "7557460f-c5b9-4589-8590-6f9f07f2b3c3",
    "categorySlug": "electric-3-wheeler-batteries",
    "name": "MEHAR 51.2V 86Ah Fast-Charging E-Rickshaw Battery",
    "slug": "mehar-51-2v-86ah-fast-charge-e-rickshaw",
    "modelNumber": "MHR-3W-51086-FC",
    "shortDescription": "51.2V 86Ah (4.40kWh) fast-charging Prismatic LiFePO4 battery pack engineered for rapid turnarounds and high daily operational uptime.",
    "applicationTag": "Passenger E-Rickshaws & City Shuttles",
    "chemistry": "LiFePO4 (Grade-A Prismatic Cells)",
    "voltageRange": "51.2V (Nominal)",
    "capacityRange": "86Ah",
    "energyRange": "4,403 Wh (4.40 kWh)",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "90A (Continuous) / 160A (Peak 10s)",
    "operatingTemp": "-10°C to 60°C",
    "bmsProtocols": "Smart BMS with Digital SoC Display",
    "ipRating": "IP67",
    "dimensions": "440 x 250 x 250 mm",
    "weight": "38.5 kg",
    "warrantySummary": "3-Year Commercial Warranty",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-3w-battery.jpg",
    "minimumOrderQuantity": 5,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "51.2",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "86",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Operational",
        "specKey": "Fast Charging Time",
        "specValue": "2.0 - 2.5 Hours",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,000+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-ess-12-105-lfp",
    "categoryId": "5a09cbca-4e29-4075-828f-01e942560520",
    "categorySlug": "energy-storage-inverter-batteries",
    "name": "MEHAR 12.8V 105Ah Smart LiFePO4 Inverter Battery",
    "slug": "mehar-12-8v-105ah-smart-lifepo4-inverter-battery",
    "modelNumber": "MHR-INV-12105-LFP",
    "shortDescription": "12.8V 105Ah (1.34kWh) maintenance-free Prismatic LiFePO4 battery designed as a direct plug-and-play replacement for heavy 150Ah lead-acid inverter batteries.",
    "applicationTag": "Residential Inverter & Power Backup",
    "chemistry": "LiFePO4 (Grade-A Prismatic Cells)",
    "voltageRange": "12.8V (Nominal) · 4S Configuration",
    "capacityRange": "105Ah",
    "energyRange": "1,344 Wh (1.34 kWh)",
    "cycleLife": "3,500+ cycles @ 80% DOD (10+ Year Design Life)",
    "maxDischargeRate": "60A (Continuous)",
    "operatingTemp": "0°C to 55°C",
    "bmsProtocols": "Integrated Smart BMS with Overcharge, Deep Discharge & Short-Circuit Protection",
    "ipRating": "IP54 Indoor Rated / IP65 Casing",
    "dimensions": "330 x 175 x 215 mm",
    "weight": "12.2 kg (70% lighter than lead-acid)",
    "warrantySummary": "5-Year Manufacturer Warranty",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-ess-battery.jpg",
    "minimumOrderQuantity": 5,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "12.8",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "105",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Charging Efficiency",
        "specValue": "98% Coulombic Efficiency (Fast 2-3 hr charge)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,500+",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Maintenance",
        "specValue": "Zero Acid Top-Up, Zero Hazardous Fumes, 100% Sealed",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-ess-25-100-lfp",
    "categoryId": "5a09cbca-4e29-4075-828f-01e942560520",
    "categorySlug": "energy-storage-inverter-batteries",
    "name": "MEHAR 25.6V 100Ah Deep-Cycle LiFePO4 Inverter Battery",
    "slug": "mehar-25-6v-100ah-deep-cycle-inverter-battery",
    "modelNumber": "MHR-INV-25100-LFP",
    "shortDescription": "25.6V 100Ah (2.56kWh) deep-cycle Prismatic LiFePO4 battery pack engineered for 24V commercial inverters and heavy residential backup.",
    "applicationTag": "24V Commercial Inverters & Solar Storage",
    "chemistry": "LiFePO4 (Grade-A Prismatic Cells)",
    "voltageRange": "25.6V (Nominal) · 8S Configuration",
    "capacityRange": "100Ah",
    "energyRange": "2,560 Wh (2.56 kWh)",
    "cycleLife": "3,500+ cycles @ 80% DOD",
    "maxDischargeRate": "80A (Continuous)",
    "operatingTemp": "0°C to 55°C",
    "bmsProtocols": "Smart Microprocessor BMS with LED Status Diagnostics",
    "ipRating": "IP54",
    "dimensions": "420 x 220 x 240 mm",
    "weight": "23.5 kg",
    "warrantySummary": "5-Year Manufacturer Warranty",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-ess-battery.jpg",
    "minimumOrderQuantity": 3,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "25.6",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "100",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,500+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-ess-51-100-rack",
    "categoryId": "5a09cbca-4e29-4075-828f-01e942560520",
    "categorySlug": "energy-storage-inverter-batteries",
    "name": "MEHAR 51.2V 100Ah 19-Inch 4U Server Rack ESS Module",
    "slug": "mehar-51-2v-100ah-19-inch-server-rack-ess",
    "modelNumber": "MHR-ESS-51100-RK",
    "shortDescription": "19-inch 4U server rack-mounted 51.2V 100Ah (5.12kWh) Prismatic LiFePO4 battery module with front DC breaker, multi-LED status matrix, and parallel stacking up to 160kWh (32 units).",
    "applicationTag": "Commercial ESS, Datacenter UPS & Microgrids",
    "chemistry": "LiFePO4 (Grade-A Prismatic Cells)",
    "voltageRange": "51.2V (Nominal) · 16S Configuration",
    "capacityRange": "100Ah",
    "energyRange": "5,120 Wh (5.12 kWh)",
    "cycleLife": "5,000+ cycles @ 80% DOD",
    "maxDischargeRate": "100A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Dual RJ45 RS485 / CAN 2.0B / Modbus RTU with Master-Slave Auto-Addressing",
    "ipRating": "IP20 (19-inch Server Rack Mount)",
    "dimensions": "482.6 (19\") x 440 x 177 (4U) mm",
    "weight": "43.0 kg",
    "warrantySummary": "5-Year Standard Warranty / 10-Year Extended SLA Available",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-ess-battery.jpg",
    "minimumOrderQuantity": 2,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "51.2",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "100",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Parallel Scalability",
        "specValue": "Up to 32 modules in parallel (163.8 kWh total capacity)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Communication",
        "specKey": "Protocols",
        "specValue": "CAN 2.0B, RS485-1, RS485-2, Modbus RTU compatible with Growatt, Deye, Victron, Solis, Sungrow",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Form Factor",
        "specValue": "Standard 19-Inch 4U Rack-Mount Chassis with Heavy Front Grab Handles & DC Circuit Breaker",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "5,000+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-e-2w-48-28-lfp",
    "categoryId": "9fe572b4-89f3-4b17-a7e7-311e6a39cbe1",
    "categorySlug": "electric-2-wheeler-batteries",
    "name": "MEHAR 48V 28Ah Prismatic E-Scooter Battery",
    "slug": "mehar-48v-28ah-prismatic-e-scooter",
    "modelNumber": "MHR-2W-48028-LFP",
    "shortDescription": "48V 28Ah compact Prismatic LiFePO4 battery pack designed for urban commuting e-scooters and delivery e-bikes.",
    "applicationTag": "Urban E-Scooters & Delivery E-Bikes",
    "chemistry": "LiFePO4 (Prismatic Cells)",
    "voltageRange": "48V (Nominal)",
    "capacityRange": "28Ah",
    "energyRange": "1,344 Wh (1.34 kWh)",
    "cycleLife": "2,500+ cycles @ 80% DOD",
    "maxDischargeRate": "35A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Integrated Smart BMS with Bluetooth BLE",
    "ipRating": "IP67",
    "dimensions": "290 x 165 x 180 mm",
    "weight": "11.5 kg",
    "warrantySummary": "3-Year Standard Commercial Warranty",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-2w-battery.jpg",
    "minimumOrderQuantity": 10,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "48",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "28",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Total Energy",
        "specValue": "1,344",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Compliance",
        "specValue": "AIS-156 Phase 2 Ready",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP67",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "2,500+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-cell-cyl-range",
    "categoryId": "7bcc1a84-f32f-4f38-9f85-eef4a31046fe",
    "categorySlug": "cylindrical-li-ion-cells",
    "name": "Grade-A Cylindrical Cell Range (18650, 21700, 32700)",
    "slug": "mehar-grade-a-cylindrical-cell-portfolio",
    "modelNumber": "MHR-CELL-CYL-PORTFOLIO",
    "shortDescription": "Direct factory supply of Tier-1 Cylindrical Lithium-ion (NMC) and LiFePO4 cells in 18650 (2500-3500mAh), 21700 (4000-5000mAh), and 32700 (6000mAh) industrial form factors with matched IR.",
    "applicationTag": "B2B Pack Assemblers, E-Cycles & Power Tools",
    "chemistry": "NMC / LiFePO4",
    "voltageRange": "3.6V / 3.7V (NMC) · 3.2V (LiFePO4)",
    "capacityRange": "2,500mAh to 6,000mAh",
    "energyRange": "9.0 Wh to 19.2 Wh per cell",
    "cycleLife": "1,000 - 2,000 cycles",
    "maxDischargeRate": "3C - 5C Continuous (High-Drain Models)",
    "operatingTemp": "-20°C to 60°C",
    "bmsProtocols": "Raw Cell Supply (BMS External)",
    "ipRating": "Steel Can Insulation Sealed",
    "dimensions": "18x65mm / 21x70mm / 32x70mm",
    "weight": "45g - 145g per cell",
    "warrantySummary": "Factory Grading Certificate & Batch Quality Guarantee",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": null,
    "minimumOrderQuantity": 500,
    "images": [],
    "specifications": [
      {
        "groupName": "Testing",
        "specKey": "Capacity Grading",
        "specValue": "100% Automated Testing with <1.5% Capacity Delta",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Testing",
        "specKey": "Internal Resistance (IR)",
        "specValue": "AC/DC IR Matched within ±1.5 mΩ",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Traceability",
        "specKey": "QR Code",
        "specValue": "Individual Factory Laser Data-Matrix Code on Each Cell",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-cell-prism-range",
    "categoryId": "7bcc1a84-f32f-4f38-9f85-eef4a31046fe",
    "categorySlug": "cylindrical-li-ion-cells",
    "name": "Large-Format Laser Prismatic Cells (3.2V 100Ah - 314Ah)",
    "slug": "mehar-laser-prismatic-lifepo4-cells",
    "modelNumber": "MHR-CELL-PRISM-PORTFOLIO",
    "shortDescription": "A+ Grade Large-Format Laser-Welded Prismatic LiFePO4 cells (3.2V 100Ah, 280Ah, 314Ah) with aluminum cases, explosion-proof safety vents, and laser-weld terminal busbars.",
    "applicationTag": "EV Traction Packs & Utility-Scale ESS",
    "chemistry": "LiFePO4 (Large Prismatic)",
    "voltageRange": "3.2V (Nominal)",
    "capacityRange": "100Ah, 280Ah, 314Ah",
    "energyRange": "320 Wh to 1,004 Wh per cell",
    "cycleLife": "4,000 - 6,000+ cycles @ 80% DOD",
    "maxDischargeRate": "1C - 2C Continuous / 3C Peak",
    "operatingTemp": "-20°C to 55°C",
    "bmsProtocols": "Raw Cell Supply (BMS External)",
    "ipRating": "Laser-Sealed Aluminum Shell",
    "dimensions": "Varies by Ah (e.g. 280Ah: 174 x 72 x 205 mm)",
    "weight": "5.3 kg (280Ah model)",
    "warrantySummary": "Manufacturer Grading Report & Batch Certificate",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": null,
    "minimumOrderQuantity": 16,
    "images": [],
    "specifications": [
      {
        "groupName": "Testing",
        "specKey": "Cell Grade",
        "specValue": "A+ Grade Brand New Prismatic Cells (Zero Second-Life)",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "4,000 - 6,000+ cycles @ 80% DOD",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-oem-forklift-80-400",
    "categoryId": "f09243b5-e23d-44e9-869b-c24f666c3ea2",
    "categorySlug": "custom-oem-industrial-batteries",
    "name": "MEHAR 48V / 80V 400Ah Heavy Forklift LiFePO4 Battery System",
    "slug": "mehar-48v-80v-400ah-forklift-lifepo4-battery",
    "modelNumber": "MHR-MHE-80400-LFP",
    "shortDescription": "Heavy-duty industrial traction LiFePO4 battery system built into heavy steel battery trays with crane lifting eyes, REMA 320A power connector, and 3,000+ cycle life for multi-shift warehouse operations.",
    "applicationTag": "Electric Forklifts & Reach Trucks",
    "chemistry": "LiFePO4 (Grade-A Prismatic Cells)",
    "voltageRange": "48V / 80V (Nominal)",
    "capacityRange": "400Ah (Up to 600Ah available)",
    "energyRange": "19.2 kWh (48V) / 32.0 kWh (80V)",
    "cycleLife": "3,500+ cycles @ 80% DOD",
    "maxDischargeRate": "200A (Continuous) / 400A (Peak)",
    "operatingTemp": "-20°C to 60°C",
    "bmsProtocols": "Industrial CAN 2.0B + REMA 320A Interlock",
    "ipRating": "IP65 Heavy Steel Enclosure",
    "dimensions": "Custom Fabricated to Forklift Battery Compartment (DIN / BS Standards)",
    "weight": "380 - 750 kg (Counterweight integrated as required)",
    "warrantySummary": "5-Year Multi-Shift Industrial Warranty",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-forklift-battery.jpg",
    "minimumOrderQuantity": 1,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "48V / 80V Options",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "400",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Mechanical",
        "specKey": "Power Connector",
        "specValue": "REMA 320A / 160A DIN Heavy Connector with Aux Pilot Pins",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Opportunity Charging",
        "specValue": "Full 100% Charge in 1.5 - 2.0 Hours with Zero Battery Swapping",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,500+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-oem-agv-48-60",
    "categoryId": "f09243b5-e23d-44e9-869b-c24f666c3ea2",
    "categorySlug": "custom-oem-industrial-batteries",
    "name": "MEHAR 24V / 48V 60Ah AGV & Robotics Quick-Docking Battery",
    "slug": "mehar-24v-48v-60ah-agv-robotics-battery",
    "modelNumber": "MHR-AGV-48060-LFP",
    "shortDescription": "Compact CNC-machined IP67 aluminum battery pack designed for Automated Guided Vehicles (AGVs) and AMRs, featuring brass docking guide pins and high-rate opportunity charging.",
    "applicationTag": "AGVs, AMRs & Industrial Robotics",
    "chemistry": "LiFePO4 (Prismatic Cells)",
    "voltageRange": "24V / 48V (Nominal)",
    "capacityRange": "60Ah",
    "energyRange": "1,536 Wh (24V) / 2,880 Wh (48V)",
    "cycleLife": "3,000+ cycles @ 80% DOD",
    "maxDischargeRate": "60A (Continuous) / 120A (Peak)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "CANopen / Modbus / Industrial Multipin Interface",
    "ipRating": "IP67 Ingress Protected",
    "dimensions": "310 x 180 x 200 mm",
    "weight": "18.5 kg",
    "warrantySummary": "3-Year Industrial Warranty",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-agv-battery.jpg",
    "minimumOrderQuantity": 2,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "24V / 48V Options",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "60",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP67 Dust & Waterproof",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "3,000+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-oem-telecom-48-100",
    "categoryId": "f09243b5-e23d-44e9-869b-c24f666c3ea2",
    "categorySlug": "custom-oem-industrial-batteries",
    "name": "MEHAR 48V 100Ah Telecom Tower Backup Module",
    "slug": "mehar-48v-100ah-telecom-tower-backup-module",
    "modelNumber": "MHR-TEL-48100-3U",
    "shortDescription": "19-inch 3U rack-mountable 48V 100Ah LiFePO4 battery pack for telecom BTS towers with SNMP/RS485 remote NOC monitoring and front 2-pole miniature circuit breaker.",
    "applicationTag": "Telecom BTS Towers & Critical Infrastructure",
    "chemistry": "LiFePO4 (Grade-A Prismatic Cells)",
    "voltageRange": "48V (Nominal) · 15S/16S Configuration",
    "capacityRange": "100Ah",
    "energyRange": "4,800 Wh (4.8 kWh)",
    "cycleLife": "4,000+ cycles @ 80% DOD",
    "maxDischargeRate": "50A (Continuous) / 100A (Max)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "RS485, RS232, SNMP, Dry Contacts for Telecom Rectifiers",
    "ipRating": "IP20 / 3U Rack Mount",
    "dimensions": "442 x 420 x 133 (3U) mm",
    "weight": "39.0 kg",
    "warrantySummary": "5-Year Telecom Grade Warranty",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-telecom-battery.jpg",
    "minimumOrderQuantity": 4,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "48",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "100",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "4,000+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-oem-drone-12s-22k",
    "categoryId": "f09243b5-e23d-44e9-869b-c24f666c3ea2",
    "categorySlug": "custom-oem-industrial-batteries",
    "name": "MEHAR 12S 44.4V 22000mAh Agricultural & Survey Drone Battery",
    "slug": "mehar-12s-44-4v-22000mah-drone-battery",
    "modelNumber": "MHR-UAV-12S22K-25C",
    "shortDescription": "Heavy-payload 12S 44.4V 22000mAh high-discharge (25C continuous / 50C burst) lithium polymer pack with carbon fiber wrap and genuine XT90-S anti-spark connector.",
    "applicationTag": "Agricultural Spraying & Heavy Survey Drones",
    "chemistry": "High-Rate Lithium Polymer (LiPo / High-C NMC)",
    "voltageRange": "44.4V (Nominal) · 12S Configuration",
    "capacityRange": "22,000mAh (22Ah)",
    "energyRange": "976.8 Wh",
    "cycleLife": "500+ heavy flight cycles @ 80% DOD",
    "maxDischargeRate": "25C Continuous (550A) / 50C Burst (1100A)",
    "operatingTemp": "-10°C to 50°C",
    "bmsProtocols": "Integrated Balance Circuit & Smart SoC Indicator",
    "ipRating": "Carbon Fiber Protective Shielding",
    "dimensions": "225 x 165 x 90 mm",
    "weight": "5.85 kg",
    "warrantySummary": "6-Month Commercial UAV Flight Warranty",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-drone-battery.jpg",
    "minimumOrderQuantity": 2,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Configuration",
        "specValue": "12S (44.4V Nominal / 50.4V Full)",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Capacity",
        "specValue": "22,000",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Discharge Rating",
        "specValue": "25C Continuous / 50C Burst",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-oem-custom-module",
    "categoryId": "f09243b5-e23d-44e9-869b-c24f666c3ea2",
    "categorySlug": "custom-oem-industrial-batteries",
    "name": "MEHAR Custom OEM Modular Battery Pack Assembly",
    "slug": "mehar-custom-oem-modular-battery-assembly",
    "modelNumber": "MHR-OEM-MODULAR-CUSTOM",
    "shortDescription": "Fully tailored OEM battery pack engineering with CNC aluminum structural frames, laser-welded busbars, custom BMS firmware, and ARAI/ICAT certification support.",
    "applicationTag": "Custom EV OEMs, Defense & Specialty Equipment",
    "chemistry": "Prismatic LiFePO4 / High-Density NMC Options",
    "voltageRange": "Custom 24V to 800V HV Architectures",
    "capacityRange": "Custom 20Ah to 1,000Ah",
    "energyRange": "Tailored to application envelope",
    "cycleLife": "2,500 - 5,000+ cycles (chemistry dependent)",
    "maxDischargeRate": "Application Specific",
    "operatingTemp": "-20°C to 65°C",
    "bmsProtocols": "Automotive CAN 2.0B / CANopen / RS485 / 4G IoT Telemetry",
    "ipRating": "IP67 / IP69K Available",
    "dimensions": "Custom 3D CAD Designed",
    "weight": "Application specific",
    "warrantySummary": "Contractual OEM Supply SLA & Warranty Agreement",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-oem-battery.jpg",
    "minimumOrderQuantity": 1,
    "images": [],
    "specifications": [
      {
        "groupName": "Engineering",
        "specKey": "Development Scope",
        "specValue": "3D CAD, Thermal CFD Simulation, BMS Hardware/Firmware, Prototyping",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Compliance",
        "specKey": "Testing Support",
        "specValue": "ARAI / ICAT Homologation, AIS-156 Phase 2, BIS, UN 38.3 Testing",
        "specUnit": null,
        "isHighlight": true
      }
    ]
  },
  {
    "id": "prod-ev-charger-60-120",
    "categoryId": "f09243b5-e23d-44e9-869b-c24f666c3ea2",
    "categorySlug": "custom-oem-industrial-batteries",
    "name": "MEHAR 60kW / 120kW Dual-Gun Commercial DC Fast EV Charger",
    "slug": "mehar-60kw-120kw-dual-gun-dc-fast-charger",
    "modelNumber": "MHR-EVSE-DC120-DG",
    "shortDescription": "Commercial dual-gun DC Fast EV Charging Station with 7-inch interactive touchscreen, RFID payment reader, dual CCS2 charging guns, and OCPP 1.6J cloud management.",
    "applicationTag": "Commercial EV Charging Hubs & Fleet Depots",
    "chemistry": "High-Frequency Silicon Carbide (SiC) Power Electronics",
    "voltageRange": "Output 200V - 1000V DC High-Voltage Wide Range",
    "capacityRange": "60kW / 120kW Dual-Gun Dynamic Power Sharing",
    "energyRange": "High-Efficiency >95.5%",
    "cycleLife": "Commercial Continuous 24/7 Duty",
    "maxDischargeRate": "Up to 250A per CCS2 Gun",
    "operatingTemp": "-25°C to 55°C Ambient",
    "bmsProtocols": "OCPP 1.6J / 2.0.1, 4G LTE, Ethernet, RFID Card Reader",
    "ipRating": "IP54 Outdoor Weatherproof",
    "dimensions": "800 x 600 x 1750 mm",
    "weight": "240 kg",
    "warrantySummary": "2-Year Commercial Warranty + Comprehensive O&M Support",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": null,
    "minimumOrderQuantity": 1,
    "images": [],
    "specifications": [
      {
        "groupName": "Power & Output",
        "specKey": "Output Power",
        "specValue": "60kW / 120kW with Smart Dynamic Load Balancing",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Charging Interface",
        "specKey": "Connectors",
        "specValue": "Dual CCS2 (Combined Charging System 2) 5-Meter Cables",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Connectivity",
        "specKey": "Cloud Protocol",
        "specValue": "OCPP 1.6J JSON Compliant with All Indian CMS Operators",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "8da589d9-22fd-43c2-90ba-8f20c209f3b0",
    "categoryId": "7557460f-c5b9-4589-8590-6f9f07f2b3c3",
    "categorySlug": "electric-3-wheeler-batteries",
    "name": "MEHAR 48V 100AH FAST-CHARGING E-RICKSHAW BATTERY",
    "slug": "444444444444444444444444",
    "modelNumber": null,
    "shortDescription": ".......................",
    "applicationTag": "Passenger E-Rickshaws & City Shuttles",
    "chemistry": "LFP",
    "voltageRange": "48",
    "capacityRange": "100",
    "energyRange": "4800",
    "cycleLife": "3000+",
    "maxDischargeRate": "1",
    "operatingTemp": null,
    "bmsProtocols": null,
    "ipRating": null,
    "dimensions": null,
    "weight": null,
    "warrantySummary": null,
    "isPlaceholder": false,
    "verificationStatus": "UNVERIFIED_PLACEHOLDER",
    "placeholderNote": "Specifications coming soon. Contact sales for custom engineering requirements.",
    "tdsFileUrl": null,
    "imageUrl": null,
    "minimumOrderQuantity": 10,
    "images": [],
    "specifications": []
  },
  {
    "id": "prod-sol-51-200-cab",
    "categoryId": "b4288203-ca2c-4ff7-8a4c-15347f5753c9",
    "categorySlug": "solar-renewable-energy-batteries",
    "name": "MEHAR 51.2V 200Ah Solar Deep-Cycle Storage Cabinet",
    "slug": "mehar-51-2v-200ah-solar-storage-cabinet",
    "modelNumber": "MHR-SOL-51200-CAB",
    "shortDescription": "10.24kWh floor-standing vertical industrial solar storage cabinet featuring integrated touchscreen LCD monitoring, emergency rotary isolator switch, and high-voltage protection.",
    "applicationTag": "Residential & Commercial Solar Storage",
    "chemistry": "LiFePO4 (Grade-A Prismatic Cells)",
    "voltageRange": "51.2V (Nominal)",
    "capacityRange": "200Ah",
    "energyRange": "10,240 Wh (10.24 kWh)",
    "cycleLife": "4,500+ cycles @ 80% DOD",
    "maxDischargeRate": "150A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "RS485 / CAN / WiFi Cloud Telemetry",
    "ipRating": "IP54 / Outdoor Enclosure Available",
    "dimensions": "600 x 380 x 850 mm",
    "weight": "92.0 kg",
    "warrantySummary": "7-Year Solar Storage Warranty",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-solar-battery.jpg",
    "minimumOrderQuantity": 1,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "51.2",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "200",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "4,500+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "9c2c4eb3-84e4-4997-a46e-ab770087d835",
    "categoryId": "9fe572b4-89f3-4b17-a7e7-311e6a39cbe1",
    "categorySlug": "electric-2-wheeler-batteries",
    "name": "MEHAR 60V 29Ah NMC E-Scooter Battery",
    "slug": "mehar-60v-29ah-nmc-e-scooter",
    "modelNumber": "MHR-2W-60029-NMC",
    "shortDescription": "60V 29Ah high-voltage NMC lithium battery pack for high-speed electric scooters with high continuous discharge capability.",
    "applicationTag": "High-Speed Electric Scooters",
    "chemistry": "NMC (Lithium-ion)",
    "voltageRange": "60V (59.2V nominal)",
    "capacityRange": "29Ah",
    "energyRange": "1,716 Wh",
    "cycleLife": "1,200+ cycles @ 80% DOD",
    "maxDischargeRate": "40A (Continuous)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Smart BMS with optional Bluetooth / CANbus",
    "ipRating": "IP65",
    "dimensions": "Configuration dependent",
    "weight": "Application dependent (~13-15 kg)",
    "warrantySummary": "Contact MEHAR sales for commercial fleet warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-2w-battery.jpg",
    "minimumOrderQuantity": 10,
    "images": [
      {
        "id": "cc94b78b-9855-4fd5-96aa-40674c5b07c1",
        "imageUrl": "/assets/products/mehar-2w-battery.jpg",
        "altText": "MEHAR 60V 29Ah NMC E-Scooter Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "60",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "29",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Calculated Energy",
        "specValue": "1,716",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "NMC (Nickel Manganese Cobalt)",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Protection Functions",
        "specValue": "Over-charge, Over-discharge, Over-current, Short-circuit, Dual NTC thermal probes",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP65",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "1,200+",
        "specUnit": "cycles @ 80% DOD",
        "isHighlight": false
      }
    ]
  },
  {
    "id": "6302b8e1-bac5-46e3-88fb-b198dc0557de",
    "categoryId": "9fe572b4-89f3-4b17-a7e7-311e6a39cbe1",
    "categorySlug": "electric-2-wheeler-batteries",
    "name": "MEHAR 36V 7.5Ah E-Cycle Battery",
    "slug": "mehar-36v-7-5ah-e-cycle",
    "modelNumber": "MEIPLEC-36014",
    "shortDescription": "36V 7.5Ah lightweight lithium-ion bottle / downtube battery pack for electric pedal-assist bicycles.",
    "applicationTag": "Electric Bicycles & E-Cycles",
    "chemistry": "Li-ion (Cylindrical)",
    "voltageRange": "36V",
    "capacityRange": "7.5Ah",
    "energyRange": "504 Wh",
    "cycleLife": "800+ cycles @ 80% DOD",
    "maxDischargeRate": "10A (Discharge)",
    "operatingTemp": "-10°C to 50°C",
    "bmsProtocols": "Integrated Hardware BMS",
    "ipRating": "IP65",
    "dimensions": "361 × 90 × 92 mm",
    "weight": "4 kg",
    "warrantySummary": "Contact MEHAR sales for warranty terms",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-2w-battery.jpg",
    "minimumOrderQuantity": 20,
    "images": [
      {
        "id": "ecc8aedb-ea80-47a3-be8f-9b1c407c125b",
        "imageUrl": "/assets/products/mehar-2w-battery.jpg",
        "altText": "MEHAR 36V 7.5Ah E-Cycle Battery Industrial Lithium Battery",
        "isPrimary": true,
        "isPublished": true
      }
    ],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "36",
        "specUnit": "V",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "7.5",
        "specUnit": "Ah",
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Battery Energy Rating",
        "specValue": "504",
        "specUnit": "Wh",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Charge Cutoff Voltage",
        "specValue": "42",
        "specUnit": "V",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Discharge Cutoff Voltage",
        "specValue": "27.5",
        "specUnit": "V",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Standard Charge Current",
        "specValue": "2",
        "specUnit": "A",
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Max Continuous Discharge Current",
        "specValue": "10",
        "specUnit": "A",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Dimensions (L×W×H)",
        "specValue": "361 × 90 × 92",
        "specUnit": "mm",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Weight",
        "specValue": "4",
        "specUnit": "kg",
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP65",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-e-2w-60-30-lfp",
    "categoryId": "9fe572b4-89f3-4b17-a7e7-311e6a39cbe1",
    "categorySlug": "electric-2-wheeler-batteries",
    "name": "MEHAR 60.8V 30Ah Prismatic LiFePO4 E-Scooter Battery",
    "slug": "mehar-60-8v-30ah-prismatic-lifepo4-e-scooter",
    "modelNumber": "MHR-2W-60030-LFP",
    "shortDescription": "AIS-156 Phase 2 certified 60.8V 30Ah Prismatic LiFePO4 battery pack engineered for commercial delivery e-scooters and high-ambient urban fleets.",
    "applicationTag": "Commercial Delivery E-Scooters",
    "chemistry": "LiFePO4 (Prismatic Cells)",
    "voltageRange": "60.8V (Nominal)",
    "capacityRange": "30Ah",
    "energyRange": "1,824 Wh (1.82 kWh)",
    "cycleLife": "2,500+ cycles @ 80% DOD",
    "maxDischargeRate": "45A (Continuous) / 75A (Peak 10s)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Smart Microprocessor BMS (BLE Bluetooth + CAN 2.0B Telemetry)",
    "ipRating": "IP67 Waterproof & Dustproof",
    "dimensions": "330 x 175 x 195 mm",
    "weight": "14.5 kg",
    "warrantySummary": "3-Year Commercial Fleet Warranty / 60,000 km",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-2w-battery.jpg",
    "minimumOrderQuantity": 10,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "60.8",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "30",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Total Energy",
        "specValue": "1,824",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "A+ Grade Prismatic LiFePO4",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Max Continuous Discharge",
        "specValue": "45",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Compliance Standard",
        "specValue": "AIS-156 Amendment III Phase 2 Certified",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Safety Functions",
        "specValue": "Active Balancing, 4-Point NTC Thermal Cutoff, Dual MOSFET Overcurrent Protection, Inter-Cell Thermal Barrier",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Enclosure Material",
        "specValue": "Extruded Aluminum with Top Handle & Amphenol Quick Disconnect",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP67",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "2,500+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  },
  {
    "id": "prod-e-2w-73-40-nmc",
    "categoryId": "9fe572b4-89f3-4b17-a7e7-311e6a39cbe1",
    "categorySlug": "electric-2-wheeler-batteries",
    "name": "MEHAR 73.6V 40Ah High-Performance E-Motorcycle Battery",
    "slug": "mehar-73-6v-40ah-nmc-e-motorcycle",
    "modelNumber": "MHR-2W-73040-NMC",
    "shortDescription": "73.6V 40Ah high-energy-density box-pack battery module engineered for high-speed electric motorcycles and heavy-load commercial fleets.",
    "applicationTag": "High-Speed Electric Motorcycles",
    "chemistry": "NMC (High-Density Box Module)",
    "voltageRange": "73.6V (Nominal)",
    "capacityRange": "40Ah",
    "energyRange": "2,944 Wh (2.94 kWh)",
    "cycleLife": "1,500+ cycles @ 80% DOD",
    "maxDischargeRate": "60A (Continuous) / 100A (Peak 10s)",
    "operatingTemp": "-10°C to 55°C",
    "bmsProtocols": "Automotive CAN 2.0B + 4G IoT Telemetry Gateway",
    "ipRating": "IP67",
    "dimensions": "360 x 185 x 220 mm",
    "weight": "16.8 kg",
    "warrantySummary": "3-Year Commercial Warranty",
    "isPlaceholder": false,
    "verificationStatus": "CLIENT_VERIFIED",
    "placeholderNote": "",
    "tdsFileUrl": null,
    "imageUrl": "/assets/products/mehar-2w-battery.jpg",
    "minimumOrderQuantity": 5,
    "images": [],
    "specifications": [
      {
        "groupName": "Electrical",
        "specKey": "Nominal Voltage",
        "specValue": "73.6",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Rated Capacity",
        "specValue": "40",
        "specUnit": null,
        "isHighlight": true
      },
      {
        "groupName": "Electrical",
        "specKey": "Total Energy",
        "specValue": "2,944",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Electrical",
        "specKey": "Cell Chemistry",
        "specValue": "High-Density NMC Box Pack",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "BMS & Safety",
        "specKey": "Compliance Standard",
        "specValue": "AIS-156 Phase 2 Certified",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Mechanical",
        "specKey": "Ingress Protection",
        "specValue": "IP67",
        "specUnit": null,
        "isHighlight": false
      },
      {
        "groupName": "Operational",
        "specKey": "Cycle Life",
        "specValue": "1,500+",
        "specUnit": null,
        "isHighlight": false
      }
    ]
  }
];
