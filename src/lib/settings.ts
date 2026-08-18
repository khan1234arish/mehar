import { prisma } from '@/lib/prisma';
import { COMPANY_INFO } from '@/data/companyInfo';

export interface CompanySettingsData {
  brandName: string;
  parentCompanyName: string;
  industry: string;
  registeredOffice: string;
  plantLocation: string;
  cin?: string | null;
  gstin?: string | null;
  website?: string | null;
  socialLinkedIn?: string | null;
  socialTwitter?: string | null;
}

export interface SalesSettingsData {
  salesEmail: string;
  supportEmail: string;
  engineeringEmail?: string | null;
  salesPhone: string;
  whatsappDesk: string;
  engineeringWhatsapp?: string | null;
  callbackPhone?: string | null;
}

export interface ContentSettingsData {
  heroHeadline: string;
  heroSubheadline: string;
  topBarText?: string | null;
  footerDisclaimer?: string | null;
}

// In-memory cache for ultra-fast server response
let settingsCache: {
  company?: { data: CompanySettingsData; timestamp: number };
  sales?: { data: SalesSettingsData; timestamp: number };
  content?: { data: ContentSettingsData; timestamp: number };
} = {};

const CACHE_TTL_MS = 60 * 1000; // 1 minute

export async function getCompanySettings(): Promise<CompanySettingsData> {
  const now = Date.now();
  if (settingsCache.company && now - settingsCache.company.timestamp < CACHE_TTL_MS) {
    return settingsCache.company.data;
  }

  const defaultData: CompanySettingsData = {
    brandName: COMPANY_INFO.brandName,
    parentCompanyName: COMPANY_INFO.parentCompanyName,
    industry: COMPANY_INFO.industry,
    registeredOffice: COMPANY_INFO.registeredOffice,
    plantLocation: COMPANY_INFO.plantLocation,
    cin: COMPANY_INFO.cin,
    gstin: COMPANY_INFO.gstin,
    website: 'https://www.meharbatteries.com',
    socialLinkedIn: null,
    socialTwitter: null,
  };

  try {
    if (prisma && process.env.DATABASE_URL) {
      const record = await prisma.systemSetting.findUnique({
        where: { key: 'company_settings' },
      });
      if (record) {
        const parsed = JSON.parse(record.value) as CompanySettingsData;
        const merged = { ...defaultData, ...parsed };
        settingsCache.company = { data: merged, timestamp: now };
        return merged;
      }
    }
  } catch {
    // Database uninitialized or offline — fallback gracefully to verified defaults
  }

  return defaultData;
}

export async function getSalesSettings(): Promise<SalesSettingsData> {
  const now = Date.now();
  if (settingsCache.sales && now - settingsCache.sales.timestamp < CACHE_TTL_MS) {
    return settingsCache.sales.data;
  }

  const defaultData: SalesSettingsData = {
    salesEmail: COMPANY_INFO.salesEmail,
    supportEmail: COMPANY_INFO.supportEmail,
    engineeringEmail: 'engineering@meharbatteries.com',
    salesPhone: COMPANY_INFO.salesPhone,
    whatsappDesk: COMPANY_INFO.whatsappDesk,
    engineeringWhatsapp: COMPANY_INFO.whatsappDesk,
    callbackPhone: COMPANY_INFO.salesPhone,
  };

  try {
    if (prisma && process.env.DATABASE_URL) {
      const record = await prisma.systemSetting.findUnique({
        where: { key: 'sales_settings' },
      });
      if (record) {
        const parsed = JSON.parse(record.value) as SalesSettingsData;
        const merged = { ...defaultData, ...parsed };
        settingsCache.sales = { data: merged, timestamp: now };
        return merged;
      }
    }
  } catch {
    // Database uninitialized or offline — fallback gracefully to verified defaults
  }

  return defaultData;
}

export async function getContentSettings(): Promise<ContentSettingsData> {
  const now = Date.now();
  if (settingsCache.content && now - settingsCache.content.timestamp < CACHE_TTL_MS) {
    return settingsCache.content.data;
  }

  const defaultData: ContentSettingsData = {
    heroHeadline: 'High-Performance Battery Systems for Next-Gen Mobility & ESS',
    heroSubheadline: `Engineered and manufactured by ${COMPANY_INFO.parentCompanyName} under brand ${COMPANY_INFO.brandName}. Supplying robust, industrial-grade battery solutions for EV OEMs, solar integrators, and B2B distributors.`,
    topBarText: `A Unit of ${COMPANY_INFO.parentCompanyName} | B2B Manufacturing & Supply`,
    footerDisclaimer: `Strictly B2B Wholesale & OEM Direct. No consumer retail inquiries.`,
  };

  try {
    if (prisma && process.env.DATABASE_URL) {
      const record = await prisma.systemSetting.findUnique({
        where: { key: 'content_settings' },
      });
      if (record) {
        const parsed = JSON.parse(record.value) as ContentSettingsData;
        const merged = { ...defaultData, ...parsed };
        settingsCache.content = { data: merged, timestamp: now };
        return merged;
      }
    }
  } catch {
    // Database uninitialized or offline — fallback gracefully to verified defaults
  }

  return defaultData;
}

export async function saveSystemSetting(
  key: string,
  value: Record<string, unknown>,
  updatedBy: string
): Promise<void> {
  if (!prisma) throw new Error('Database service unavailable.');

  await prisma.systemSetting.upsert({
    where: { key },
    create: {
      key,
      value: JSON.stringify(value),
      updatedBy,
    },
    update: {
      value: JSON.stringify(value),
      updatedBy,
    },
  });

  // Invalidate cache
  if (key === 'company_settings') delete settingsCache.company;
  if (key === 'sales_settings') delete settingsCache.sales;
  if (key === 'content_settings') delete settingsCache.content;
}
