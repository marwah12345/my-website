const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up duplicate papers...');

  // Get all papers with this title
  const papers = await prisma.paper.findMany({
    where: {
      title: {
        contains: 'Implementation of Lightweight Machine Learning Models'
      }
    }
  });

  console.log(`Found ${papers.length} papers with this title`);

  // Keep only the one with a link and DOI, delete the rest
  for (const paper of papers) {
    if (!paper.link || !paper.doi) {
      await prisma.paper.delete({ where: { id: paper.id } });
      console.log(`Deleted paper without link/DOI: ID ${paper.id}`);
    } else {
      console.log(`Keeping paper with link: ID ${paper.id}`);
    }
  }

  console.log('Cleanup complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
