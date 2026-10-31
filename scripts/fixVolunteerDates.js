const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function fix() {
  const volunteers = await db.experience.findMany({
    where: { type: 'volunteer' }
  });
  
  console.log('Current volunteers:', JSON.stringify(volunteers, null, 2));
  
  // Update each volunteer with proper ID ordering based on date
  // We want: Oct 2024, Oct 2023, Nov 2022
  
  for (const vol of volunteers) {
    let newId = null;
    
    if (vol.dateRange && vol.dateRange.includes('2024')) {
      newId = 1; // Most recent
    } else if (vol.dateRange && vol.dateRange.includes('2023')) {
      newId = 2;
    } else if (vol.dateRange && vol.dateRange.includes('2022')) {
      newId = 3; // Oldest
    }
    
    console.log(`${vol.organization} (${vol.dateRange}) - sort order: ${newId}`);
  }
}

fix()
  .catch(console.error)
  .finally(() => db.$disconnect());
