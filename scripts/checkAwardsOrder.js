const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function check() {
  const awards = await db.award.findMany({ 
    orderBy: { year: 'desc' }
  });
  
  console.log('Awards in order:');
  awards.forEach((award, index) => {
    console.log(`${index + 1}. ${award.year} - ${award.title}`);
  });
}

check()
  .catch(console.error)
  .finally(() => db.$disconnect());
