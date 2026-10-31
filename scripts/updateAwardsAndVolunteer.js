const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function update() {
  // Delete the two Dean's Awards
  await db.award.deleteMany({
    where: {
      title: {
        contains: "Dean's Award"
      }
    }
  });
  console.log("Deleted Dean's Awards");

  // Get all current awards to update with images
  const awards = await db.award.findMany();
  
  for (const award of awards) {
    let imagePath = null;
    
    if (award.title.includes('2nd Prize') || award.title.includes('Postgraduate Category')) {
      imagePath = '/uploads/award-2nd-prize.jpg';
    } else if (award.title.includes('Young Researcher')) {
      imagePath = '/uploads/award-young-researcher.jpg';
    } else if (award.title.includes('Research Excellence')) {
      imagePath = '/uploads/award-research-excellence.jpeg';
    } else if (award.title.includes('3rd International Article Writing')) {
      imagePath = '/uploads/award-3rd-iawc.jpg';
    }
    
    if (imagePath) {
      await db.award.update({
        where: { id: award.id },
        data: { image: imagePath }
      });
      console.log(`Updated award: ${award.title}`);
    }
  }

  // Update volunteer experiences with images
  const volunteers = await db.experience.findMany({
    where: { type: 'volunteer' }
  });
  
  for (const vol of volunteers) {
    let imagePath = null;
    
    if (vol.organization.includes('Be a Helper') || vol.organization.includes('Koun Awnan')) {
      if (vol.dateRange && vol.dateRange.includes('2024')) {
        imagePath = '/uploads/volunteer-helper-2024.jpg';
      } else if (vol.dateRange && vol.dateRange.includes('2023')) {
        imagePath = '/uploads/volunteer-helper-2023.jpg';
      }
    } else if (vol.organization.includes('UMW') || vol.organization.includes('Mangrove')) {
      imagePath = '/uploads/volunteer-umw-mangrove.jpg';
    }
    
    if (imagePath) {
      await db.experience.update({
        where: { id: vol.id },
        data: { image: imagePath }
      });
      console.log(`Updated volunteer: ${vol.organization}`);
    }
  }
  
  console.log('\nDone!');
}

update()
  .catch(console.error)
  .finally(() => db.$disconnect());
