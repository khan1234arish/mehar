import { prisma } from '@/lib/prisma';

export interface SiteImageConfig {
  key: string;
  label: string;
  defaultUrl: string;
  currentUrl: string;
  altText: string;
  description: string;
  isActive: boolean;
}

export const DEFAULT_SITE_IMAGES: Record<string, { label: string; defaultUrl: string; altText: string; description: string }> = {
  product_default: {
    label: 'Default Product Placeholder',
    defaultUrl: '/assets/logo/mehar-symbol.svg',
    altText: 'MEHAR Industrial Battery System',
    description: 'Used when a product has no verified published imagery.',
  },
  category_default: {
    label: 'Product Category Card Placeholder',
    defaultUrl: '/assets/logo/mehar-symbol.svg',
    altText: 'MEHAR Battery Category',
    description: 'Used on broad application and category card listings.',
  },
  application_default: {
    label: 'Application & Industry Placeholder',
    defaultUrl: '/assets/logo/mehar-symbol.svg',
    altText: 'Commercial Application Battery',
    description: 'Used across industrial sector cards (E-Mobility, Solar ESS, Material Handling).',
  },
  resource_default: {
    label: 'Resource & Catalogue Placeholder',
    defaultUrl: '/assets/logo/mehar-symbol.svg',
    altText: 'MEHAR Technical Document',
    description: 'Used as default thumbnail for downloadable catalogues and spec sheets.',
  },
  hero_banner: {
    label: 'Homepage Hero Banner Accent',
    defaultUrl: '/assets/logo/mehar-symbol.svg',
    altText: 'MEHAR Battery Engineering Excellence',
    description: 'Primary hero section visual placeholder.',
  },
};

// In-memory cache with 1-min TTL
let siteImagesCache: { data: Record<string, string>; timestamp: number } | null = null;
const CACHE_TTL = 60 * 1000;

export async function getSitePlaceholderImage(key: string): Promise<{ url: string; altText: string }> {
  const defaultMeta = DEFAULT_SITE_IMAGES[key] || {
    label: key,
    defaultUrl: '/assets/logo/mehar-symbol.svg',
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
      defaultUrl: meta.defaultUrl,
      currentUrl: db?.imageUrl || meta.defaultUrl,
      altText: db?.altText || meta.altText,
      description: db?.description || meta.description,
      isActive: db ? db.isActive : true,
    });
  }

  return results;
}
