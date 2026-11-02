const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function add() {
  // Add the Research Integrity certificate as an award
  const cert = await db.award.create({
    data: {
      title: 'Research Integrity & Publication Ethics',
      issuer: 'Nature Masterclasses',
      year: '2026',
      image: '/uploads/cert-research-integrity.png'
    }
  });
  
  console.log('Added Research Integrity certificate:', JSON.stringify(cert, null, 2));
}

add()
  .catch(console.error)
  .finally(() => db.$disconnect());
