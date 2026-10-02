const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Fixing data...');

  // Update years for the book chapters
  await prisma.book.updateMany({
    where: {
      title: 'Deep Architectural Classification for Heart Disease Prediction'
    },
    data: {
      year: 2026
    }
  });
  console.log('Updated book chapter 1 year to 2026');

  await prisma.book.updateMany({
    where: {
      title: 'An Adaptive Model for Unmasking Zero-Day Threats Using Federated Learning'
    },
    data: {
      year: 2026
    }
  });
  console.log('Updated book chapter 2 year to 2026');

  // Delete all papers except the one we want
  const allPapers = await prisma.paper.findMany();
  for (const paper of allPapers) {
    if (!paper.title.includes('Implementation of Lightweight Machine Learning Models')) {
      await prisma.paper.delete({ where: { id: paper.id } });
      console.log(`Deleted paper: ${paper.title}`);
    }
  }

  console.log('Database fixed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
