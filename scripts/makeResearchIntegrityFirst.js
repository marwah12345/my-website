const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function fix() {
  // Find the Research Integrity award first
  const award = await db.award.findFirst({
    where: { 
      title: 'Research Integrity & Publication Ethics'
    }
  });
  
  if (!award) {
    console.log('Award not found');
    return;
  }
  
  // Update it to have the latest creation date
  await db.award.update({
    where: { id: award.id },
    data: {
      createdAt: new Date()
    }
  });
  
  console.log('Updated Research Integrity to be the most recent');
  
  // Show new order
  const awards = await db.award.findMany({ 
    orderBy: [
      { year: 'desc' },
      { createdAt: 'desc' }
    ]
  });
  
  console.log('\nNew order:');
  awards.forEach((award, index) => {
    console.log(`${index + 1}. ${award.year} - ${award.title}`);
  });
}

fix()
  .catch(console.error)
  .finally(() => db.$disconnect());
