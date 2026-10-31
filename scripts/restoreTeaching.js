const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function restore() {
  // Add back the teaching experience
  const teaching = await db.experience.create({
    data: {
      title: 'Computer Science Teacher',
      organization: 'IMAS International School (Putrajaya)',
      dateRange: 'May 2025 - April 2026',
      type: 'research',
      image: '/uploads/imas-school.png'
    }
  });
  
  console.log('Restored teaching experience:', JSON.stringify(teaching, null, 2));
}

restore()
  .catch(console.error)
  .finally(() => db.$disconnect());
