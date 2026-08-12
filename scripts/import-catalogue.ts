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

  let totalProducts = 0;
  let totalSpecs = 0;

  for (let cIdx = 0; cIdx < catalogueData.categories.length; cIdx++) {
    const cat = catalogueData.categories[cIdx];
    const category = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {
        name: cat.name,
        description: cat.description,
        isPlaceholder: false,
        verificationStatus: 'CLIENT_VERIFIED',
        displayOrder: cIdx,
        isActive: true,
      },
      create: {
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        isPlaceholder: false,
        verificationStatus: 'CLIENT_VERIFIED',
        displayOrder: cIdx,
        isActive: true,
      },
    });

    console.log(`✓ Category [${cIdx + 1}/${catalogueData.categories.length}]: ${category.name} (${category.slug})`);

    if (cat.products && Array.isArray(cat.products)) {
      for (const prod of cat.products) {
        totalProducts++;
        const product = await prisma.product.upsert({
          where: { slug: prod.slug },
          update: {
            categoryId: category.id,
            name: prod.name,
            modelNumber: prod.modelNumber || null,
            shortDescription: prod.shortDescription,
            applicationTag: prod.applicationTag,
            chemistry: prod.chemistry || null,
            voltageRange: prod.voltageRange || null,
            capacityRange: prod.capacityRange || null,
            energyRange: prod.energyRange || null,
            cycleLife: prod.cycleLife || null,
            maxDischargeRate: prod.maxDischargeRate || null,
            operatingTemp: prod.operatingTemp || null,
            bmsProtocols: prod.bmsProtocols || null,
            ipRating: prod.ipRating || null,
            dimensions: prod.dimensions || null,
            weight: prod.weight || null,
            warrantySummary: prod.warrantySummary || null,
            imageUrl: prod.imageUrl || null,
            minimumOrderQuantity: prod.minimumOrderQuantity || null,
            isPlaceholder: false,
            verificationStatus: 'CLIENT_VERIFIED',
            publishStatus: 'VERIFIED',
            isPublished: true,
            placeholderNote: '',
            isActive: true,
          },
          create: {
            categoryId: category.id,
            name: prod.name,
            slug: prod.slug,
            modelNumber: prod.modelNumber || null,
            shortDescription: prod.shortDescription,
            applicationTag: prod.applicationTag,
            chemistry: prod.chemistry || null,
            voltageRange: prod.voltageRange || null,
            capacityRange: prod.capacityRange || null,
            energyRange: prod.energyRange || null,
            cycleLife: prod.cycleLife || null,
            maxDischargeRate: prod.maxDischargeRate || null,
            operatingTemp: prod.operatingTemp || null,
            bmsProtocols: prod.bmsProtocols || null,
            ipRating: prod.ipRating || null,
            dimensions: prod.dimensions || null,
            weight: prod.weight || null,
            warrantySummary: prod.warrantySummary || null,
            imageUrl: prod.imageUrl || null,
            minimumOrderQuantity: prod.minimumOrderQuantity || null,
            isPlaceholder: false,
            verificationStatus: 'CLIENT_VERIFIED',
            publishStatus: 'VERIFIED',
            isPublished: true,
            placeholderNote: '',
            isActive: true,
          },
        });

        console.log(`  ✓ Product: ${product.name} [${product.modelNumber || 'Standard'}]`);

        // Create primary ProductImage record if imageUrl exists
        if (prod.imageUrl) {
          const existingImages = await prisma.productImage.findMany({
            where: { productId: product.id },
          });

          if (existingImages.length === 0) {
            await prisma.productImage.create({
              data: {
                productId: product.id,
                imageUrl: prod.imageUrl,
                altText: `${product.name} Industrial Lithium Battery`,
                isPrimary: true,
                isPublished: true,
                sortOrder: 0,
              },
            });
          }
        }

        if (prod.specifications && Array.isArray(prod.specifications)) {
          // Delete old specs and re-insert verified specs
          await prisma.productSpec.deleteMany({ where: { productId: product.id } });
          for (let i = 0; i < prod.specifications.length; i++) {
            totalSpecs++;
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

  console.log(`\n========================================`);
  console.log(`[MEHAR Importer Summary]`);
  console.log(`Categories: ${catalogueData.categories.length}`);
  console.log(`Products:   ${totalProducts}`);
  console.log(`Specs:      ${totalSpecs}`);
  console.log(`Status:     CLIENT_VERIFIED & PUBLISHED (VERIFIED)`);
  console.log(`========================================\n`);
}

main()
  .catch((e) => {
    console.error('[Error during catalogue import]:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

