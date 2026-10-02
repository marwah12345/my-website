const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function check() {
  const aonic = await db.experience.findMany({ 
    where: { organization: { contains: 'Aonic' } } 
  });
  console.log('Aonic experiences:', JSON.stringify(aonic, null, 2));
  
  // Update to correct path
  if (aonic.length > 0) {
    await db.experience.update({
      where: { id: aonic[0].id },
      data: { image: '/uploads/aonic.png' }
    });
    console.log('Updated Aonic image path');
  }
}

check()
  .catch(console.error)
  .finally(() => db.$disconnect());
