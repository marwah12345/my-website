import { db } from "@/lib/db";
import ProjectCard from "@/components/ProjectCard";

export const metadata = {
  title: "Projects | Dr. Marwah Al-Helali",
  description: "A showcase of AI, deep learning, and software development projects by Dr. Marwah Al-Helali.",
};

export default async function ProjectsPage() {
  const projects = await db.project.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa'}}>
      {/* Simple Header */}
      <div style={{
        background: 'white',
        padding: '2rem 0 1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <h1 style={{fontSize: '1.8rem', margin: '0', color: 'var(--primary)', fontWeight: 600}}>Projects</h1>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="container" style={{ paddingBottom: '3rem', paddingTop: '2rem', flex: 1, maxWidth: '1100px' }}>
        {projects.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            background: 'white',
            borderRadius: '8px',
            border: '1px solid var(--border)'
          }}>
            <div style={{fontSize: '2.5rem', marginBottom: '0.75rem'}}>🚀</div>
            <h3 style={{fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '0.4rem'}}>No projects yet</h3>
            <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>Projects will appear here once added from the admin panel.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1rem'
          }}>
            {projects.map((proj) => (
              <ProjectCard project={proj} key={proj.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
