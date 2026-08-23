import { prisma } from '@/lib/prisma';

export interface HeroSlideItem {
  id: string;
  productId?: string;
  name: string;
  category: string;
  specs: string;
  imageUrl: string;
  href: string;
  tag: string;
}

const SETTING_KEY = 'hero_carousel_products';

// Default product slugs to feature if no custom admin selection is configured yet
const DEFAULT_FEATURED_SLUGS = [
  'mehar-60-8v-30ah-prismatic-lifepo4-e-scooter',
  'mehar-51-2v-100ah-heavy-duty-e-rickshaw',
  'mehar-12-8v-105ah-smart-lifepo4-inverter-battery',
  'mehar-51-2v-200ah-solar-storage-cabinet',
  'mehar-48v-80v-400ah-forklift-lifepo4-battery',
  'mehar-24v-48v-60ah-agv-robotics-battery',
  'mehar-custom-oem-modular-battery-assembly',
  'mehar-grade-a-cylindrical-cell-portfolio',
];

export async function getHeroCarouselProductIds(): Promise<string[]> {
  try {
    if (!prisma) return [];
    const setting = await prisma.systemSetting.findUnique({
      where: { key: SETTING_KEY },
    });
    if (setting && setting.value) {
      const parsed = JSON.parse(setting.value);
      if (Array.isArray(parsed.productIds)) {
        return parsed.productIds;
      }
    }
  } catch (err) {
    console.error('Error fetching hero carousel product IDs:', err);
  }
  return [];
}

let carouselCache: { data: HeroSlideItem[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 30 * 1000; // 30 seconds

export function clearHeroCarouselCache() {
  carouselCache = null;
}

export async function setHeroCarouselProductIds(productIds: string[]): Promise<boolean> {
  try {
    if (!prisma) return false;
    clearHeroCarouselCache();
    await prisma.systemSetting.upsert({
      where: { key: SETTING_KEY },
      update: {
        value: JSON.stringify({ productIds, updatedAt: new Date().toISOString() }),
        updatedAt: new Date(),
      },
      create: {
        key: SETTING_KEY,
        value: JSON.stringify({ productIds, updatedAt: new Date().toISOString() }),
      },
    });
    return true;
  } catch (err) {
    console.error('Error saving hero carousel product IDs:', err);
    return false;
  }
}

export async function toggleHeroCarouselProductId(productId: string): Promise<{ isFeatured: boolean; allIds: string[] }> {
  clearHeroCarouselCache();
  const currentIds = await getHeroCarouselProductIds();
  const exists = currentIds.includes(productId);
  let newIds: string[];
  if (exists) {
    newIds = currentIds.filter((id) => id !== productId);
  } else {
    newIds = [...currentIds, productId];
  }
  await setHeroCarouselProductIds(newIds);
  return { isFeatured: !exists, allIds: newIds };
}

export async function getHeroCarouselSlides(): Promise<HeroSlideItem[]> {
  const now = Date.now();
  if (carouselCache && now - carouselCache.timestamp < CACHE_TTL_MS) {
    return carouselCache.data;
  }

  try {
    if (!prisma) return getFallbackSlides();

    const selectedIds = await getHeroCarouselProductIds();

    let products: any[] = [];

    if (selectedIds.length > 0) {
      // Fetch only the admin-selected products that are published & active
      const fetched = await prisma.product.findMany({
        where: {
          id: { in: selectedIds },
          isPublished: true,
          isActive: true,
          publishStatus: { not: 'ARCHIVED' },
        },
        include: {
          category: { select: { name: true, slug: true } },
          images: {
            where: { isArchived: false, isPublished: true },
            orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
          },
        },
      });

      // Preserve the admin's exact custom ordering
      products = selectedIds
        .map((id) => fetched.find((p) => p.id === id))
        .filter(Boolean);
    }

    // If no custom selection or none found, load verified active products
    if (products.length === 0) {
      const activeProducts = await prisma.product.findMany({
        where: {
          isPublished: true,
          isActive: true,
          publishStatus: { not: 'ARCHIVED' },
        },
        include: {
          category: { select: { name: true, slug: true } },
          images: {
            where: { isArchived: false, isPublished: true },
            orderBy: [{ isPrimary: 'desc' }, { sortOrder: 'asc' }],
          },
        },
        take: 12,
      });

      // Order by default featured slugs if available
      products = activeProducts.sort((a, b) => {
        const aIndex = DEFAULT_FEATURED_SLUGS.indexOf(a.slug);
        const bIndex = DEFAULT_FEATURED_SLUGS.indexOf(b.slug);
        if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
        if (aIndex !== -1) return -1;
        if (bIndex !== -1) return 1;
        return 0;
      });
    }

    if (products.length > 0) {
      const mappedSlides: HeroSlideItem[] = products.map((p) => {
        const primaryImg = p.images?.find((i: any) => i.isPrimary) || p.images?.[0];
        const imgUrl = primaryImg?.imageUrl || p.imageUrl || '/assets/products/mehar-2w-battery.jpg';

        const specsList = [
          p.voltageRange,
          p.capacityRange,
          p.chemistry,
          p.energyRange,
        ].filter(Boolean);

        const specsText = specsList.length > 0 ? specsList.join(' · ') : 'High-Performance Lithium Battery System';

        return {
          id: p.id,
          productId: p.id,
          name: p.name,
          category: p.category?.name || p.applicationTag,
          specs: specsText,
          imageUrl: imgUrl,
          href: `/products/${p.category?.slug || 'products'}?product=${p.slug}#specifications`,
          tag: p.applicationTag || p.category?.name || 'EV Traction',
        };
      });

      carouselCache = { data: mappedSlides, timestamp: now };
      return mappedSlides;
    }
  } catch (err) {
    console.error('Error constructing hero carousel slides:', err);
  }

  const fallback = getFallbackSlides();
  carouselCache = { data: fallback, timestamp: now };
  return fallback;
}

function getFallbackSlides(): HeroSlideItem[] {
  return [
    {
      id: '2w',
      name: 'MEHAR 48V 30Ah Two-Wheeler / E-Scooter Battery',
      category: 'Commercial Delivery & Urban 2-Wheeler',
      specs: '48V · 30Ah · LiFePO4 / NMC · 13s1p · 20A Discharge',
      imageUrl: '/assets/products/mehar-2w-battery.jpg',
      href: '/products/electric-2-wheeler-batteries',
      tag: '2W E-Scooter',
    },
    {
      id: '3w',
      name: 'MEHAR 51.2V 100Ah E-Rickshaw Heavy Battery',
      category: 'Heavy-Duty 3-Wheeler Commercial Traction',
      specs: '51.2V · 100Ah · LiFePO4 · 16s1p · 60A Discharge',
      imageUrl: '/assets/products/mehar-3w-battery.jpg',
      href: '/products/electric-3-wheeler-batteries',
      tag: 'E-Rickshaw 3W',
    },
    {
      id: 'ess',
      name: 'MEHAR 48V 100Ah Inverter Lithium Battery',
      category: 'Commercial & Residential Inverter Backup',
      specs: '48V · 100Ah · LiFePO4 · 15s1p · 60A Discharge',
      imageUrl: '/assets/products/mehar-ess-battery.jpg',
      href: '/products/energy-storage-inverter-batteries',
      tag: 'Inverter ESS',
    },
    {
      id: 'solar',
      name: 'MEHAR 12.8V 54Ah Solar / UPS Lithium Battery',
      category: 'Solar & Renewable Energy Storage',
      specs: '12.8V · 54Ah · LiFePO4 · 4s1p · 27A Discharge',
      imageUrl: '/assets/products/mehar-solar-battery.jpg',
      href: '/products/solar-renewable-energy-batteries',
      tag: 'Solar / UPS',
    },
    {
      id: 'forklift',
      name: 'MEHAR 48V / 80V 400Ah Forklift LiFePO4 System',
      category: 'Material Handling Industrial Tray',
      specs: '48V / 80V · 400Ah · REMA 320A · Heavy Steel',
      imageUrl: '/assets/products/mehar-forklift-battery.jpg',
      href: '/products/custom-oem-industrial-batteries',
      tag: 'Industrial Motive',
    },
    {
      id: 'agv',
      name: 'MEHAR 24V / 48V 60Ah AGV Robotics Pack',
      category: 'Automated Guided Vehicles & AMRs',
      specs: '24V / 48V · 60Ah · Quick-Dock · IP67',
      imageUrl: '/assets/products/mehar-agv-battery.jpg',
      href: '/products/custom-oem-industrial-batteries',
      tag: 'AGV Robotics',
    },
    {
      id: 'oem',
      name: 'MEHAR Custom OEM Modular Pack Assembly',
      category: 'Precision Engineered Pack Module',
      specs: 'Custom Voltage & Ah · CNC Alloy · CAN BMS',
      imageUrl: '/assets/products/mehar-oem-battery.jpg',
      href: '/oem-custom-solutions',
      tag: 'Custom OEM',
    },
    {
      id: 'cells',
      name: 'MEHAR Grade-A Cells (Prismatic & Cylindrical)',
      category: 'Tier-1 Direct Factory Supply',
      specs: '3.2V 100-314Ah Prismatic · 18650 / 21700 / 32700',
      imageUrl: '/assets/products/mehar-cylindrical-cells.jpg',
      href: '/products/cylindrical-li-ion-cells',
      tag: 'Tier-1 Cells',
    },
  ];
}
