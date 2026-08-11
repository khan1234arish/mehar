import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();

async function main() {
  const filePathArg = process.argv[2] || path.join(__dirname, '../src/data/mehar_catalogue_template.json');
  const fullPath = path.resolve(filePathArg);

  console.log(`[MEHAR Importer] Reading catalogue data from: ${fullPath}`);

  if (!fs.existsSync(fullPath)) {
    console.error(`[Error] File not found: ${fullPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(fullPath, 'utf-8');
  const catalogueData = JSON.parse(rawData);

  if (!catalogueData.categories || !Array.isArray(catalogueData.categories)) {
    console.error('[Error] Invalid catalogue schema. "categories" array is required.');
    process.exit(1);
  }

  console.log(`[MEHAR Importer] Processing ${catalogueData.categories.length} categories...`);

  for (const cat of catalogueData.categories) {
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        isPlaceholder: false,
        verificationStatus: 'CLIENT_VERIFIED',
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        isPlaceholder: false,
        verificationStatus: 'CLIENT_VERIFIED',
      },
    });

    console.log(`✓ Category processed: ${category.name} (${category.slug})`);

    if (cat.products && Array.isArray(cat.products)) {
      for (const prod of cat.products) {
        const product = await prisma.product.upsert({
          where: { slug: prod.slug },
          update: {
            categoryId: category.id,
            name: prod.name,
            shortDescription: prod.shortDescription,
            applicationTag: prod.applicationTag,
            chemistry: prod.chemistry || null,
            voltageRange: prod.voltageRange || null,
            capacityRange: prod.capacityRange || null,
            energyRange: prod.energyRange || null,
            cycleLife: prod.cycleLife || null,
            bmsProtocols: prod.bmsProtocols || null,
            ipRating: prod.ipRating || null,
            dimensions: prod.dimensions || null,
            weight: prod.weight || null,
            warrantySummary: prod.warrantySummary || null,
            isPlaceholder: false,
            verificationStatus: 'CLIENT_VERIFIED',
            placeholderNote: '',
          },
          create: {
            categoryId: category.id,
            name: prod.name,
            slug: prod.slug,
            shortDescription: prod.shortDescription,
            applicationTag: prod.applicationTag,
            chemistry: prod.chemistry || null,
            voltageRange: prod.voltageRange || null,
            capacityRange: prod.capacityRange || null,
            energyRange: prod.energyRange || null,
            cycleLife: prod.cycleLife || null,
            bmsProtocols: prod.bmsProtocols || null,
            ipRating: prod.ipRating || null,
            dimensions: prod.dimensions || null,
            weight: prod.weight || null,
            warrantySummary: prod.warrantySummary || null,
            isPlaceholder: false,
            verificationStatus: 'CLIENT_VERIFIED',
            placeholderNote: '',
          },
        });

        console.log(`  ✓ Verified Product added/updated: ${product.name}`);

        if (prod.specifications && Array.isArray(prod.specifications)) {
          // Delete old specs and re-insert verified specs
          await prisma.productSpec.deleteMany({ where: { productId: product.id } });
          for (let i = 0; i < prod.specifications.length; i++) {
            const spec = prod.specifications[i];
            await prisma.productSpec.create({
              data: {
                productId: product.id,
                groupName: spec.groupName || 'General',
                specKey: spec.specKey,
                specValue: spec.specValue,
                specUnit: spec.specUnit || null,
                isHighlight: !!spec.isHighlight,
                displayOrder: i,
              },
            });
          }
        }
      }
    }
  }

  console.log('[MEHAR Importer] Verified catalogue import completed successfully!');
}

main()
  .catch((e) => {
    console.error('[Error during catalogue import]:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
