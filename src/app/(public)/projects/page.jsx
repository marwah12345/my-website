import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects | Dr. Marwah Al-Helali",
  description: "A showcase of AI, deep learning, and software development projects by Dr. Marwah Al-Helali.",
};

export default async function ProjectsPage() {
  const projects = await db.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)',
        padding: '5rem 0 3rem',
        color: 'white',
        boxShadow: 'inset 0 -10px 20px -10px rgba(0,0,0,0.5)'
      }}>
        <div className="container text-center">
          <ScrollReveal delay={100}>
            <h1 style={{fontSize: '2.5rem', margin: '0', textShadow: '0 2px 5px rgba(0,0,0,0.3)'}}>Projects</h1>
            <p style={{marginTop: '1rem', opacity: 0.9, fontSize: '1.1rem', maxWidth: '700px', margin: '1rem auto 0'}}>
              A comprehensive showcase of my AI research tools, deep learning systems, and software development work — from prototype to deployment
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container" style={{ paddingBottom: '5rem', paddingTop: '3rem', flex: 1 }}>
        {projects.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'var(--bg-secondary)',
            borderRadius: '12px',
            border: '1px solid var(--border)'
          }}>
            <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🚀</div>
            <h3 style={{fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '0.5rem'}}>No projects yet</h3>
            <p style={{color: 'var(--text-secondary)'}}>Projects will appear here once added from the admin panel.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem'
          }}>
            {projects.map((proj, idx) => (
              <ScrollReveal delay={(idx % 3) * 100 + 100} key={proj.id}>
                <ProjectCard project={proj} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
