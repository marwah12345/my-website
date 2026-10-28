const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function update() {
  // Find the PhD education record
  const phd = await db.education.findFirst({
    where: { 
      degree: { contains: 'PhD' }
    }
  });
  
  console.log('Found PhD record:', JSON.stringify(phd, null, 2));
  
  // Update the description
  await db.education.update({
    where: { id: phd.id },
    data: { 
      description: 'Research in computer vision, machine learning and deep learning.'
    }
  });
  
  console.log('Updated PhD description');
}

update()
  .catch(console.error)
  .finally(() => db.$disconnect());
