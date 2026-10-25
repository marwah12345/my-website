const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

async function addProject() {
  const newProject = await db.project.create({
    data: {
      title: 'PACR: Prevalence-Adaptive Conformal Rule-Out for Diabetic Retinopathy Screening',
      description: 'A conformal prediction framework for diabetic retinopathy screening that adapts to prevalence changes, providing reliable rule-out decisions while maintaining calibrated uncertainty quantification.',
      video: '/uploads/pacr-diabetic-retinopathy.mp4'
    }
  });
  
  console.log('Added PACR project:', JSON.stringify(newProject, null, 2));
}

addProject()
  .catch(console.error)
  .finally(() => db.$disconnect());
