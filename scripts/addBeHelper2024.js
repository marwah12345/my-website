const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function add() {
  // Add the 2024 Be a Helper volunteer
  const volunteer = await db.experience.create({
    data: {
      title: 'Participant',
      organization: '"Be a Helper" (Koun Awnan) community support initiative',
      dateRange: 'Oct 2024',
      type: 'volunteer',
      image: '/uploads/volunteer-helper-2024.jpg'
    }
  });
  
  console.log('Added 2024 Be a Helper volunteer:', JSON.stringify(volunteer, null, 2));
}

add()
  .catch(console.error)
  .finally(() => db.$disconnect());
