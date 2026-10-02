const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Updating papers and books...');

  // Add the new book chapters one by one
  try {
    await prisma.book.create({
      data: {
        title: 'Deep Architectural Classification for Heart Disease Prediction',
        publisher: 'Springer (Book Chapter)',
        year: 2023,
        doi: '10.1007/978-3-032-22426-2_3',
        link: 'https://doi.org/10.1007/978-3-032-22426-2_3'
      }
    });
    console.log('Added book chapter 1');
  } catch (e) {
    console.log('Book chapter 1 already exists or error:', e.message);
  }

  try {
    await prisma.book.create({
      data: {
        title: 'An Adaptive Model for Unmasking Zero-Day Threats Using Federated Learning',
        publisher: 'Springer (Book Chapter)',
        year: 2023,
        doi: '10.1007/978-3-032-22426-2_2',
        link: 'https://doi.org/10.1007/978-3-032-22426-2_2'
      }
    });
    console.log('Added book chapter 2');
  } catch (e) {
    console.log('Book chapter 2 already exists or error:', e.message);
  }

  // Add the new paper
  try {
    await prisma.paper.create({
      data: {
        title: 'Implementation of Lightweight Machine Learning Models for Real-time Text Classification on Resource-Constrained Devices',
        type: 'journal',
        year: 2025,
        doi: '10.33093/jiwe.2025.4.3.7',
        link: 'https://doi.org/10.33093/jiwe.2025.4.3.7'
      }
    });
    console.log('Added paper');
  } catch (e) {
    console.log('Paper already exists or error:', e.message);
  }

  // Delete the unwanted book
  const deleted = await prisma.book.deleteMany({
    where: {
      title: {
        contains: 'Communication Protocols and Security Fundamentals'
      }
    }
  });
  console.log(`Deleted ${deleted.count} book(s)`);

  // Add the new project
  try {
    await prisma.project.create({
      data: {
        title: 'MRI-Slice-Blur-Detector',
        description: 'A machine learning tool for detecting blur in MRI slice images',
        video: '/uploads/MRI-Slice-Blur-Detector.mp4',
        githubLink: 'https://github.com/MarwahZaidMohammedAl-Helali/MRI-Slice-Blur-Detector',
        link: 'https://github.com/MarwahZaidMohammedAl-Helali/MRI-Slice-Blur-Detector'
      }
    });
    console.log('Added project');
  } catch (e) {
    console.log('Project already exists or error:', e.message);
  }

  console.log('Database updated successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
