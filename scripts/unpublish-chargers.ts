import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('[MEHAR Database Update] Unpublishing Chargers & Power Electronics from public display...');

  // 1. Find and deactivate all charger-related categories
  const chargerSlugs = ['chargers-power-electronics', 'ev-chargers-power-electronics', 'ev-chargers'];
  
  const deactivatedCats = await prisma.category.updateMany({
    where: {
      slug: { in: chargerSlugs },
    },
    data: {
      isActive: false,
    },
  });
  console.log(`✓ Marked ${deactivatedCats.count} charger categories as isActive: false`);

  // 2. Mark all products belonging to charger categories as unpublished
  const chargerCategories = await prisma.category.findMany({
    where: { slug: { in: chargerSlugs } },
    select: { id: true },
  });
  const chargerCatIds = chargerCategories.map((c) => c.id);

  const updatedByCat = await prisma.product.updateMany({
    where: { categoryId: { in: chargerCatIds } },
    data: {
      isPublished: false,
      publishStatus: 'DRAFT',
      isActive: false,
    },
  });
  console.log(`✓ Updated ${updatedByCat.count} products by categoryId to isPublished: false (DRAFT)`);

  // 3. Also unpublish any products with charger model numbers
  const chargerModelNumbers = ['MHR-INV-121200', 'MHR-INV-243000', 'MHR-INV-485000', 'MHR-CHG-EV-MULTI'];
  const directUpdated = await prisma.product.updateMany({
    where: { modelNumber: { in: chargerModelNumbers } },
    data: {
      isPublished: false,
      publishStatus: 'DRAFT',
      isActive: false,
    },
  });
  console.log(`✓ Ensured ${directUpdated.count} matching charger models are unpublished.`);

  // 4. Confirm active, published categories & counts
  const activeCategories = await prisma.category.findMany({
    where: { isActive: true },
    select: {
      name: true,
      slug: true,
      _count: {
        select: {
          products: {
            where: {
              publishStatus: 'VERIFIED',
              isPublished: true,
              isActive: true,
            },
          },
        },
      },
    },
    orderBy: { displayOrder: 'asc' },
  });

  console.log('\n========================================');
  console.log('ACTIVE PUBLIC CATEGORIES & PRODUCT COUNTS:');
  console.log('========================================');
  let totalPublicProducts = 0;
  activeCategories.forEach((cat, idx) => {
    console.log(`  ${idx + 1}. ${cat.name} (${cat.slug}) -> ${cat._count.products} public products`);
    totalPublicProducts += cat._count.products;
  });
  console.log('----------------------------------------');
  console.log(`Total Public Categories: ${activeCategories.length}`);
  console.log(`Total Public Products:   ${totalPublicProducts}`);
  console.log('========================================\n');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
