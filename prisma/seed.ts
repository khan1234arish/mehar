import { PrismaClient } from '@prisma/client';
import { BROAD_CATEGORIES } from '../src/data/categories';
import { PRODUCTS_CATALOG } from '../src/data/products';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('[MEHAR Seed] Seeding initial broad categories and placeholder data...');

  // 1. Seed Categories
  for (let i = 0; i < BROAD_CATEGORIES.length; i++) {
    const cat = BROAD_CATEGORIES[i];
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        tagline: cat.tagline,
        description: cat.description,
        iconName: cat.iconName,
        displayOrder: i,
        isPlaceholder: true,
        verificationStatus: 'UNVERIFIED_PLACEHOLDER',
      },
      create: {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        tagline: cat.tagline,
        description: cat.description,
        iconName: cat.iconName,
        displayOrder: i,
        isPlaceholder: true,
        verificationStatus: 'UNVERIFIED_PLACEHOLDER',
      },
    });
    console.log(`✓ Seeded Category: ${cat.name}`);
  }

  // 2. Seed Products
  for (const prod of PRODUCTS_CATALOG) {
    const product = await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {
        categoryId: prod.categoryId,
        name: prod.name,
        shortDescription: prod.shortDescription,
        applicationTag: prod.applicationTag,
        chemistry: prod.chemistry,
        voltageRange: prod.voltageRange,
        capacityRange: prod.capacityRange,
        isPlaceholder: true,
        verificationStatus: 'UNVERIFIED_PLACEHOLDER',
        placeholderNote: prod.placeholderNote,
      },
      create: {
        id: prod.id,
        categoryId: prod.categoryId,
        name: prod.name,
        slug: prod.slug,
        shortDescription: prod.shortDescription,
        applicationTag: prod.applicationTag,
        chemistry: prod.chemistry,
        voltageRange: prod.voltageRange,
        capacityRange: prod.capacityRange,
        isPlaceholder: true,
        verificationStatus: 'UNVERIFIED_PLACEHOLDER',
        placeholderNote: prod.placeholderNote,
      },
    });

    console.log(`✓ Seeded Product Placeholder: ${product.name}`);

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
