const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function update() {
  // Add new paper
  const newPaper = await db.paper.create({
    data: {
      title: 'A Web-Based Multi-Modal AI Framework for Intelligent Content Moderation with Constructive Feedback',
      doi: '10.33093/jiwe.2026.5.3.10',
      link: 'https://doi.org/10.33093/jiwe.2026.5.3.10',
      year: 2026,
      type: 'journal'
    }
  });
  
  console.log('Added new paper:', JSON.stringify(newPaper, null, 2));
  
  // Delete all teaching experience (type = 'research')
  const deleted = await db.experience.deleteMany({
    where: { type: 'research' }
  });
  
  console.log(`Deleted ${deleted.count} teaching experience records`);
}

update()
  .catch(console.error)
  .finally(() => db.$disconnect());
