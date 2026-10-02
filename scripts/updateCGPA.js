const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating CGPA...');

  // Get all education entries
  const educations = await prisma.education.findMany();

  for (const edu of educations) {
    // Check if description contains "3.73" and update it
    if (edu.description && edu.description.includes('3.73')) {
      const updatedDescription = edu.description.replace(/3\.73/g, '3.73 out of 4');
      
      await prisma.education.update({
        where: { id: edu.id },
        data: { description: updatedDescription }
      });
      
      console.log(`Updated education: ${edu.degree}`);
      console.log(`Old: ${edu.description}`);
      console.log(`New: ${updatedDescription}`);
    }
  }

  console.log('CGPA update complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
