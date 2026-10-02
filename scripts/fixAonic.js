const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function fix() {
  const aonic = await db.experience.findFirst({ 
    where: { organization: { contains: 'Aonic' } } 
  });
  
  console.log('Current Aonic record:', JSON.stringify(aonic, null, 2));
  
  // Try using one of the existing working aonic images
  await db.experience.update({
    where: { id: aonic.id },
    data: { image: '/uploads/aonic-4.png' }
  });
  
  console.log('Updated to use aonic-4.png');
}

fix()
  .catch(console.error)
  .finally(() => db.$disconnect());
