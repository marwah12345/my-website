import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";

export default async function ExperiencePage() {
  const experiences = await db.experience.findMany({ orderBy: { id: 'asc' } });
  
  const research = experiences.filter(e => e.type === 'research');
  const work = experiences.filter(e => e.type === 'work');

  const ExperienceCard = ({ exp, color = 'var(--accent)' }) => (
    <div style={{
      padding: '1.25rem',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid var(--border)',
      borderLeft: `4px solid ${color}`,
      boxShadow: '0 2px 8px -2px rgba(0,0,0,0.08)',
      transition: 'all 0.2s ease',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 8px 16px -4px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 2px 8px -2px rgba(0,0,0,0.08)';
    }}>
      <div style={{fontSize: '0.75rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.5px', marginBottom: '0.5rem'}}>
        {exp.dateRange || 'Ongoing'}
      </div>
      <h3 style={{fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', lineHeight: '1.3'}}>
        {exp.title}
      </h3>
      <div style={{fontSize: '0.9rem', color: color, fontWeight: 600, marginBottom: '0.75rem'}}>
        {exp.organization}
      </div>
      {exp.description && (
        <p style={{fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-secondary)', margin: 0, flex: 1}}>
          {exp.description}
        </p>
      )}
    </div>
  );

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      {/* Mini-Hero */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '5rem 0 3rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <ScrollReveal delay={100}>
            <h1 style={{fontSize: '2.5rem', margin: '0', color: 'var(--primary)'}}>Professional Timeline</h1>
            <p style={{marginTop: '1rem', fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto 0', color: 'var(--text-secondary)'}}>
              A chronological history of my clinical AI research and full-stack software development roles
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem', flex: 1, maxWidth: '1200px'}}>
        
        {/* RESEARCH EXPERIENCE */}
        {research.length > 0 && (
          <div style={{marginBottom: '4rem'}}>
            <ScrollReveal delay={100}>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                color: 'var(--primary)',
                marginBottom: '1.5rem',
                paddingLeft: '1rem',
                borderLeft: '4px solid var(--accent)'
              }}>Research Experience</h2>
            </ScrollReveal>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem'}}>
              {research.map((exp, idx) => (
                <ScrollReveal delay={idx * 100 + 150} key={exp.id}>
                  <ExperienceCard exp={exp} color="var(--accent)" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {work.length > 0 && (
          <div>
            <ScrollReveal delay={100}>
              <h2 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.8rem',
                color: 'var(--primary)',
                marginBottom: '1.5rem',
                paddingLeft: '1rem',
                borderLeft: '4px solid var(--primary)'
              }}>Work Experience</h2>
            </ScrollReveal>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem'}}>
              {work.map((exp, idx) => (
                <ScrollReveal delay={idx * 100 + 150} key={exp.id}>
                  <ExperienceCard exp={exp} color="var(--primary)" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {experiences.length === 0 && (
          <p className="text-center" style={{marginTop: '2rem', color: 'var(--text-secondary)'}}>
            No experience found.
          </p>
        )}
      </div>
    </div>
  );
}
