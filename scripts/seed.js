import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.book.deleteMany({});
  await prisma.award.deleteMany({});
  await prisma.experience.deleteMany({});
  await prisma.paper.deleteMany({});
  await prisma.education.deleteMany({});

  await prisma.education.createMany({
    data: [
      {
        degree: 'Doctor of Philosophy (PhD) in Computing',
        institution: 'Multimedia University, Malaysia',
        yearStart: '2025',
        yearEnd: 'Present',
        description: 'Specializing in brain MRI analysis and predictive modeling.'
      },
      {
        degree: 'Bachelor of Computer Science (Software Engineering)',
        institution: 'Multimedia University, Malaysia',
        yearStart: '2022',
        yearEnd: '2025',
        description: 'First Class Honours, CGPA: 3.73'
      }
    ]
  });

  await prisma.paper.createMany({
    data: [
      {
        title: 'Deep Architectural Classification for Heart Disease Prediction',
        venue: 'Information Systems Engineering and Management, Springer',
        year: 2026
      },
      {
        title: 'An Adaptive Model for Unmasking Zero-Day Threats Using Federated Learning',
        venue: 'Information Systems Engineering and Management, Springer',
        year: 2026
      },
      {
        title: 'Implementation of Lightweight Machine Learning Models for Real-time Text Classification on Resource-Constrained Devices',
        venue: 'Journal of Informatics and Web Engineering (JIWE)',
        year: 2025
      }
    ]
  });

  await prisma.book.createMany({
    data: [
      {
        title: 'Network Foundations: Communication Protocols and Security Fundamentals',
        publisher: 'CRC Press / Taylor & Francis',
        year: 2026,
        description: 'Book Chapter'
      }
    ]
  });

  await prisma.experience.createMany({
    data: [
      {
        title: 'Computer Science Teacher',
        organization: 'IMAS International School (Putrajaya)',
        dateRange: 'May 2025 - April 2026',
        description: '',
        type: 'work'
      },
      {
        title: 'Backend Developer',
        organization: 'Aonic - Subang Jaya HQ',
        dateRange: 'July 2024 - Oct 2024',
        type: 'work'
      },
      {
        title: 'Full Stack Developer',
        organization: 'Breakthrough Academy',
        dateRange: 'Nov 2023 - Feb 2024',
        type: 'work'
      }
    ]
  });

  await prisma.award.createMany({
    data: [
      { 
        title: '2nd Prize, Postgraduate Category', 
        issuer: '4th International Article Writing Competition (IAWC 2026), MMU Press', 
        year: '2026' 
      },
      { 
        title: 'Young Researcher Award', 
        issuer: 'ICETI', 
        year: '2025' 
      },
      { 
        title: 'Research Excellence Award', 
        issuer: 'ICETI', 
        year: '2025' 
      },
      { 
        title: 'Participation in The 3rd International Article Writing Competition', 
        issuer: '', 
        year: '2025' 
      },
      { 
        title: "Dean's Award", 
        issuer: 'Multimedia University/MMU', 
        year: '2023 – 2024' 
      },
      { 
        title: "Dean's Award", 
        issuer: 'Multimedia University/MMU', 
        year: '2022 - 2023' 
      }
    ]
  });

  console.log("Database seeded successfully!");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
