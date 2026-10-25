const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function update() {
  // Find the PACR project
  const pacr = await db.project.findFirst({
    where: { title: { contains: 'PACR' } }
  });
  
  console.log('Found PACR project:', pacr.id);
  
  // Update with GitHub link
  await db.project.update({
    where: { id: pacr.id },
    data: { githubLink: 'https://github.com/MarwahZaidMohammedAl-Helali/pacr-dr-screening' }
  });
  
  console.log('Updated PACR project with GitHub link');
}

update()
  .catch(console.error)
  .finally(() => db.$disconnect());
