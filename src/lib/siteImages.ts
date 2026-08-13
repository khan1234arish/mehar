import { prisma } from '@/lib/prisma';

export interface SiteImageConfig {
  key: string;
  label: string;
  section: 'homepage' | 'technology' | 'applications' | 'placeholders';
  defaultUrl: string;
  currentUrl: string;
  altText: string;
  description: string;
  isActive: boolean;
}

export interface DefaultSiteImageMeta {
  label: string;
  section: 'homepage' | 'technology' | 'applications' | 'placeholders';
  defaultUrl: string;
  altText: string;
  description: string;
}

export const DEFAULT_SITE_IMAGES: Record<string, DefaultSiteImageMeta> = {
  // ── 1. HOMEPAGE VISUALS (Photorealistic Studio Photography) ────────────────
  homepage_hero: {
    label: 'Homepage Hero Showcase Visual',
    section: 'homepage',
    defaultUrl: '/assets/products/mehar-2w-battery.jpg',
    altText: 'MEHAR Commercial Industrial Battery Product Photography',
    description: 'Primary product showcase card photograph on the homepage hero section.',
  },
  homepage_electric_2w: {
    label: 'Homepage Category: Electric 2-Wheeler',
    section: 'homepage',
    defaultUrl: '/assets/products/mehar-2w-battery.jpg',
    altText: 'MEHAR Electric 2-Wheeler Lithium Battery Pack',
    description: 'Product category photograph for electric 2-wheelers, scooters, and motorcycles.',
  },
  homepage_electric_3w: {
    label: 'Homepage Category: Electric 3-Wheeler & E-Rickshaw',
    section: 'homepage',
    defaultUrl: '/assets/products/mehar-3w-battery.jpg',
    altText: 'MEHAR Commercial 3-Wheeler Heavy-Duty Traction Battery',
    description: 'Product category photograph for passenger e-rickshaws and cargo 3-wheelers.',
  },
  homepage_ess_inverter: {
    label: 'Homepage Category: ESS & Inverter Storage',
    section: 'homepage',
    defaultUrl: '/assets/products/mehar-ess-battery.jpg',
    altText: 'MEHAR Energy Storage System (ESS) & Inverter Battery',
    description: 'Product category photograph for residential inverters and commercial UPS storage.',
  },
  homepage_solar_renewable: {
    label: 'Homepage Category: Solar & Renewable Energy',
    section: 'homepage',
    defaultUrl: '/assets/products/mehar-solar-battery.jpg',
    altText: 'MEHAR Solar Renewable Deep-Cycle Storage Battery',
    description: 'Product category photograph for off-grid and hybrid solar installations.',
  },
  homepage_cylindrical_cells: {
    label: 'Homepage Category: Cylindrical Li-ion Cells',
    section: 'homepage',
    defaultUrl: '/assets/products/mehar-cylindrical-cells.jpg',
    altText: 'MEHAR Cylindrical Lithium-Ion Cells in 18650, 21700, and 32700 Formats',
    description: 'Product category photograph for cylindrical Li-ion cells across 18650, 21700, and 32700 formats.',
  },

  homepage_custom_oem: {
    label: 'Homepage Category: Custom OEM & Industrial',
    section: 'homepage',
    defaultUrl: '/assets/products/mehar-oem-battery.jpg',
    altText: 'MEHAR Modular Custom OEM Industrial Battery Solution',
    description: 'Product category photograph for custom OEM packs, robotics, and industrial machinery.',
  },

  // ── 2. TECHNOLOGY & BATTERY CELL VISUALS ───────────────────────────────────
  technology_cylindrical_cells: {
    label: 'Technology: Cylindrical Li-Ion Cells (18650, 21700, 32700 Formats)',
    section: 'technology',
    defaultUrl: '/assets/products/mehar-cylindrical-cells.jpg',
    altText: 'MEHAR Cylindrical Lithium-Ion Cells in 18650, 21700, and 32700 Formats',
    description: 'Studio product photograph showing multiple cylindrical Li-ion cell formats with metallic casing and insulation.',
  },

  technology_prismatic_cells: {
    label: 'Technology: Prismatic LiFePO4 / NMC Cells',
    section: 'technology',
    defaultUrl: '/assets/products/mehar-prismatic-cells.jpg',
    altText: 'MEHAR Large-Format Laser-Welded Prismatic Lithium Cells',
    description: 'Studio photograph of large-format blue prismatic cells with aluminum covers and heavy busbars.',
  },
  technology_battery_modules: {
    label: 'Technology: Modular Cell Packaging & Architecture',
    section: 'technology',
    defaultUrl: '/assets/products/mehar-oem-battery.jpg',
    altText: 'MEHAR Modular Battery Pack Aluminum Frame Assembly',
    description: 'Visual for modular pack design, aluminum thermal dissipation frames, and cell compression.',
  },
  technology_bms_architecture: {
    label: 'Technology: Smart BMS & Digital Control Board',
    section: 'technology',
    defaultUrl: '/assets/products/mehar-exploded-battery.jpg',
    altText: 'MEHAR Intelligent BMS Controller Board and Telemetry Hardware',
    description: 'Visual for smart battery management systems, thermal sensors, and CANbus telemetry.',
  },

  // ── 3. APPLICATION & SECTOR VISUALS ────────────────────────────────────────
  app_electric_mobility: {
    label: 'Application: Electric Mobility (2W / 3W / Light EV)',
    section: 'applications',
    defaultUrl: '/assets/products/mehar-2w-battery.jpg',
    altText: 'MEHAR E-Mobility Battery Pack Solutions',
    description: 'Sector photograph for electric scooters, motorcycles, and delivery fleets.',
  },
  app_solar_ess: {
    label: 'Application: Solar & Renewable Energy Storage',
    section: 'applications',
    defaultUrl: '/assets/products/mehar-solar-battery.jpg',
    altText: 'MEHAR Solar Energy Storage Solutions',
    description: 'Sector photograph for off-grid rooftops, solar inverters, and commercial microgrids.',
  },
  app_ups_inverter: {
    label: 'Application: UPS & Inverter Power Backup',
    section: 'applications',
    defaultUrl: '/assets/products/mehar-ess-battery.jpg',
    altText: 'MEHAR Commercial UPS and Inverter Backup Solutions',
    description: 'Sector photograph for office power backup, datacenter UPS, and residential storage.',
  },
  app_industrial_equipment: {
    label: 'Application: Industrial Machinery & Equipment',
    section: 'applications',
    defaultUrl: '/assets/products/mehar-oem-battery.jpg',
    altText: 'MEHAR Industrial Power Supply and Machine Battery Units',
    description: 'Sector photograph for heavy machinery, hydraulic systems, and portable equipment.',
  },
  app_material_handling: {
    label: 'Application: Material Handling & Electric Forklifts',
    section: 'applications',
    defaultUrl: '/assets/products/mehar-forklift-battery.jpg',
    altText: 'MEHAR Motive Traction Forklift Battery System',
    description: 'Sector photograph for warehouse forklifts, pallet trucks, and order pickers.',
  },
  app_robotics_automation: {
    label: 'Application: Robotics & AGVs / AMRs',
    section: 'applications',
    defaultUrl: '/assets/products/mehar-agv-battery.jpg',
    altText: 'MEHAR Compact Robotics and AGV Battery Modules',
    description: 'Sector photograph for automated warehouse robots and autonomous mobile units.',
  },
  app_drones_uav: {
    label: 'Application: Drones & Unmanned Aerial Vehicles',
    section: 'applications',
    defaultUrl: '/assets/products/mehar-drone-battery.jpg',
    altText: 'MEHAR Lightweight High-Discharge UAV Drone Battery Pack',
    description: 'Sector photograph for agricultural spraying drones and commercial logistics aerial systems.',
  },
  app_medical_specialized: {
    label: 'Application: Medical & Mobile Healthcare Equipment',
    section: 'applications',
    defaultUrl: '/assets/products/mehar-oem-battery.jpg',
    altText: 'MEHAR Medical Mobile Cart Battery Systems',
    description: 'Sector photograph for diagnostic carts, hospital beds, and portable medical units.',
  },
  app_telecom_infrastructure: {
    label: 'Application: Telecom & Network Infrastructure',
    section: 'applications',
    defaultUrl: '/assets/products/mehar-telecom-battery.jpg',
    altText: 'MEHAR 19-Inch Rack Telecom Tower Power Backup Unit',
    description: 'Sector photograph for base transceiver stations (BTS) and datacenter edge racks.',
  },
  app_marine_rv: {
    label: 'Application: Marine, Boat & RV Auxiliary Power',
    section: 'applications',
    defaultUrl: '/assets/products/mehar-solar-battery.jpg',
    altText: 'MEHAR Marine and Auxiliary Storage Battery Banks',
    description: 'Sector photograph for boat trolling motors, yachts, and campervan house storage.',
  },

  // ── 4. GLOBAL SYSTEM PLACEHOLDERS & FALLBACKS ──────────────────────────────
  product_default: {
    label: 'Global Default Product Placeholder',
    section: 'placeholders',
    defaultUrl: '/assets/products/mehar-2w-battery.jpg',
    altText: 'MEHAR Industrial Battery System',
    description: 'Global fallback used when a product has no verified image and no category visual.',
  },
  category_default: {
    label: 'Global Default Category Placeholder',
    section: 'placeholders',
    defaultUrl: '/assets/products/mehar-oem-battery.jpg',
    altText: 'MEHAR Battery Category',
    description: 'Global fallback used on broad application and category card listings.',
  },
  application_default: {
    label: 'Global Default Application Placeholder',
    section: 'placeholders',
    defaultUrl: '/assets/products/mehar-oem-battery.jpg',
    altText: 'Commercial Application Battery',
    description: 'Global fallback used across industrial sector cards.',
  },
  resource_default: {
    label: 'Resource & Catalogue Placeholder',
    section: 'placeholders',
    defaultUrl: '/assets/logo/mehar-logo.png',
    altText: 'MEHAR Technical Document',
    description: 'Thumbnail for downloadable catalogues and specification sheets.',
  },
  hero_banner: {
    label: 'Legacy Hero Banner Accent (Alias)',
    section: 'placeholders',
    defaultUrl: '/assets/products/mehar-2w-battery.jpg',
    altText: 'MEHAR Battery Engineering Excellence',
    description: 'Legacy key mapped to homepage hero visual.',
  },
};

export async function getSitePlaceholderImage(key: string): Promise<{ url: string; altText: string }> {
  const defaultMeta = DEFAULT_SITE_IMAGES[key] || {
    label: key,
    section: 'placeholders',
    defaultUrl: '/assets/logo/mehar-logo.png',
    altText: 'MEHAR Battery Systems',
    description: '',
  };

  try {
    if (prisma && process.env.DATABASE_URL) {
      const record = await prisma.siteManagedImage.findUnique({
        where: { key },
      });
      if (record && record.isActive && record.imageUrl) {
        return {
          url: record.imageUrl,
          altText: record.altText || defaultMeta.altText,
        };
      }
    }
  } catch {
    // Fallback to verified safe defaults
  }

  return {
    url: defaultMeta.defaultUrl,
    altText: defaultMeta.altText,
  };
}

export async function getAllSiteImagesConfig(): Promise<SiteImageConfig[]> {
  const keys = Object.keys(DEFAULT_SITE_IMAGES);
  const results: SiteImageConfig[] = [];

  let dbRecords: Record<string, { imageUrl: string; altText: string; description: string | null; isActive: boolean }> = {};

  try {
    if (prisma && process.env.DATABASE_URL) {
      const records = await prisma.siteManagedImage.findMany();
      for (const r of records) {
        dbRecords[r.key] = {
          imageUrl: r.imageUrl,
          altText: r.altText,
          description: r.description,
          isActive: r.isActive,
        };
      }
    }
  } catch {
    // Offline fallback
  }

  for (const key of keys) {
    const meta = DEFAULT_SITE_IMAGES[key];
    const db = dbRecords[key];

    results.push({
      key,
      label: meta.label,
      section: meta.section,
      defaultUrl: meta.defaultUrl,
      currentUrl: db?.imageUrl || meta.defaultUrl,
      altText: db?.altText || meta.altText,
      description: db?.description || meta.description,
      isActive: db ? db.isActive : true,
    });
  }

  return results;
}
