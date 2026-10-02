const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function addIcons() {
  // Check experiences
  const experiences = await db.experience.findMany();
  console.log('Experiences:', JSON.stringify(experiences, null, 2));

  // Check books
  const books = await db.book.findMany();
  console.log('\nBooks:', JSON.stringify(books, null, 2));

  // Update experiences with icons based on organization name
  for (const exp of experiences) {
    let iconPath = null;
    if (exp.organization.toLowerCase().includes('aonic')) {
      iconPath = '/uploads/aonic.png';
    } else if (exp.organization.toLowerCase().includes('breakthrough')) {
      iconPath = '/uploads/breakthrough-academy.png';
    } else if (exp.organization.toLowerCase().includes('imas')) {
      iconPath = '/uploads/imas-school.png';
    }

    if (iconPath) {
      await db.experience.update({
        where: { id: exp.id },
        data: { image: iconPath }
      });
      console.log(`Updated ${exp.organization} with icon ${iconPath}`);
    }
  }

  // Update books with icons based on title
  for (const book of books) {
    let iconPath = null;
    if (book.title.toLowerCase().includes('zero-day') || book.title.toLowerCase().includes('federated')) {
      iconPath = '/uploads/book-federated-learning.png';
    } else if (book.title.toLowerCase().includes('heart') || book.title.toLowerCase().includes('disease')) {
      iconPath = '/uploads/book-heart-disease.png';
    }

    if (iconPath) {
      await db.book.update({
        where: { id: book.id },
        data: { coverImage: iconPath }
      });
      console.log(`Updated book "${book.title}" with icon ${iconPath}`);
    }
  }

  console.log('\nDone!');
}

addIcons()
  .catch(console.error)
  .finally(() => db.$disconnect());
