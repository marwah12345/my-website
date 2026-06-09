import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
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
        title: 'Implementation of Lightweight Machine Learning Models for Real-time Text Classification on Resource Constrained Devices',
        venue: 'Journal of Informatics and Web Engineering (JIWE)',
        year: 2025
      },
      {
        title: 'Constructive AI for Educational Content Moderation',
        venue: 'Journal of Informatics and Web Engineering (JIWE)',
        year: 2025
      },
      {
        title: 'Harris’ Hawks Optimization for Enhanced Clustering in Medical Diagnosis',
        venue: 'ICBMC',
        year: 2025
      },
      {
        title: 'Deep Architectural Classification for Heart Disease Prediction',
        venue: 'ICETI',
        year: 2025
      },
      {
        title: 'An Adaptive Model for Unmasking Zero-Day Threats using Federated Learning',
        venue: 'ICETI',
        year: 2025
      },
      {
        title: 'Network Foundations: Communication Protocols and Security Fundamentals',
        venue: 'CRC Press / Taylor & Francis (Book Chapter)',
        year: 2026
      },
      {
        title: 'Post-Quantum Verifiable Federated Learning for Regulatory-Compliant Healthcare AI',
        venue: 'ACISP (Springer LNCS)',
        year: 2026
      }
    ]
  });

  await prisma.experience.createMany({
    data: [
      {
        title: 'PhD Researcher (AI-based Brain MRI Analysis)',
        organization: 'Multimedia University',
        dateRange: '2025 - Present',
        description: 'Developing deep learning and physics-informed models for predicting tissue deterioration in longitudinal MRI scans. Modeling cerebral microbleeds progression using AI-driven approaches.',
        type: 'research'
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
      },
      {
        title: 'Participant',
        organization: '“Be a Helper” (Koun Awnan) community support initiative',
        dateRange: 'Oct 2023',
        type: 'volunteer'
      },
      {
        title: 'Participant',
        organization: 'UMW Mangrove Tree Planting Programme',
        dateRange: 'Nov 2022',
        type: 'volunteer'
      }
    ]
  });

  await prisma.award.createMany({
    data: [
      { title: 'Young Researcher Award', issuer: 'ICETI', year: '2025' },
      { title: 'Research Excellence Award', issuer: 'ICETI', year: '2025' },
      { title: 'Participation in The 3rd International Article Writing Competition', year: '2025' },
      { title: "Dean's Award", issuer: 'Multimedia University/MMU', year: '2023 – 2024' },
      { title: "Dean's Award", issuer: 'Multimedia University/MMU', year: '2022 - 2023' },
      { title: 'Co-founder of first self-printing machine released in MMU', issuer: 'MMU', year: 'Oct 2023' }
    ]
  });

  console.log("Real CV database seeded successfully!");
}

main().catch(e => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
