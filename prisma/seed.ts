import { PrismaClient } from '@prisma/client';
import { BROAD_CATEGORIES } from '../src/data/categories';
import { PRODUCTS_CATALOG } from '../src/data/products';

const prisma = new PrismaClient();

async function main() {
  console.log('[MEHAR Seed] Seeding authentic Indian battery categories & products...');

  // 1. Seed Categories & build slug -> dbId map
  const categoryMap = new Map<string, string>();

  for (let i = 0; i < BROAD_CATEGORIES.length; i++) {
    const cat = BROAD_CATEGORIES[i];
    const savedCat = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        tagline: cat.tagline,
        description: cat.description,
        iconName: cat.iconName,
        displayOrder: i,
        isPlaceholder: false,
        verificationStatus: 'CLIENT_VERIFIED',
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        tagline: cat.tagline,
        description: cat.description,
        iconName: cat.iconName,
        displayOrder: i,
        isPlaceholder: false,
        verificationStatus: 'CLIENT_VERIFIED',
      },
    });
    categoryMap.set(cat.slug, savedCat.id);
    console.log(`✓ Seeded Category: ${cat.name} (DB ID: ${savedCat.id})`);
  }

  // 2. Seed Products using mapped category ID
  for (const prod of PRODUCTS_CATALOG) {
    const dbCategoryId = categoryMap.get(prod.categorySlug) || prod.categoryId;

    const product = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        categoryId: dbCategoryId,
        name: prod.name,
        modelNumber: prod.modelNumber,
        shortDescription: prod.shortDescription,
        applicationTag: prod.applicationTag,
        chemistry: prod.chemistry,
        voltageRange: prod.voltageRange,
        capacityRange: prod.capacityRange,
        energyRange: prod.energyRange,
        cycleLife: prod.cycleLife,
        maxDischargeRate: prod.maxDischargeRate,
        operatingTemp: prod.operatingTemp,
        bmsProtocols: prod.bmsProtocols,
        ipRating: prod.ipRating,
        dimensions: prod.dimensions,
        weight: prod.weight,
        warrantySummary: prod.warrantySummary,
        imageUrl: prod.imageUrl,
        minimumOrderQuantity: prod.minimumOrderQuantity,
        isPublished: true,
        publishStatus: 'VERIFIED',
        isPlaceholder: false,
        verificationStatus: 'CLIENT_VERIFIED',
        placeholderNote: '',
      },
      create: {
        id: prod.id,
        categoryId: dbCategoryId,
        name: prod.name,
        slug: prod.slug,
        modelNumber: prod.modelNumber,
        shortDescription: prod.shortDescription,
        applicationTag: prod.applicationTag,
        chemistry: prod.chemistry,
        voltageRange: prod.voltageRange,
        capacityRange: prod.capacityRange,
        energyRange: prod.energyRange,
        cycleLife: prod.cycleLife,
        maxDischargeRate: prod.maxDischargeRate,
        operatingTemp: prod.operatingTemp,
        bmsProtocols: prod.bmsProtocols,
        ipRating: prod.ipRating,
        dimensions: prod.dimensions,
        weight: prod.weight,
        warrantySummary: prod.warrantySummary,
        imageUrl: prod.imageUrl,
        minimumOrderQuantity: prod.minimumOrderQuantity,
        isPublished: true,
        publishStatus: 'VERIFIED',
        isPlaceholder: false,
        verificationStatus: 'CLIENT_VERIFIED',
        placeholderNote: '',
      },
    });

    console.log(`✓ Seeded Product: ${product.name}`);

    // Seed Specs
    await prisma.productSpec.deleteMany({ where: { productId: product.id } });
    for (let j = 0; j < prod.specifications.length; j++) {
      const spec = prod.specifications[j];
      await prisma.productSpec.create({
        data: {
          productId: product.id,
          groupName: spec.groupName,
          specKey: spec.specKey,
          specValue: spec.specValue,
          isHighlight: !!spec.isHighlight,
          displayOrder: j,
        },
      });
    }
  }

  console.log('[MEHAR Seed] Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('[Error during seeding]:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
