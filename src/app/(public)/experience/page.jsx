import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";

export default async function ExperiencePage() {
  const experiences = await db.experience.findMany({ orderBy: { id: 'asc' } });
  
  const research = experiences.filter(e => e.type === 'research');
  const work = experiences.filter(e => e.type === 'work');

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      {/* Mini-Hero */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: '6rem 0 4rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <ScrollReveal delay={100}>
            <h1 style={{fontSize: '3rem', margin: '0', color: 'var(--primary)'}}>Professional Timeline</h1>
            <p style={{marginTop: '1rem', fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto 0', color: 'var(--text-secondary)'}}>
              A chronological history of my clinical AI research involvements and full-stack software development roles.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container" style={{paddingTop: '6rem', paddingBottom: '6rem', flex: 1, maxWidth: '900px'}}>
        
        {/* RESEARCH EXPERIENCE TIMELINE */}
        <ScrollReveal delay={150}>
           <h2 style={{borderLeft: '4px solid var(--accent)', paddingLeft: '1rem', marginBottom: '3rem', fontSize: '2rem'}}>Research Experience</h2>
        </ScrollReveal>
        <div style={{display: 'flex', flexDirection: 'column', gap: '3rem', marginLeft: '1rem', marginBottom: '6rem'}}>
          {research.map((exp, idx) => (
            <ScrollReveal delay={idx * 150 + 200} key={exp.id}>
              <div style={{
                 position: 'relative',
                 paddingLeft: '3rem',
                 borderLeft: '2px solid var(--accent)',
                 paddingBottom: idx === research.length - 1 ? '0' : '2rem'
              }}>
                <div style={{
                  position: 'absolute', left: '-8px', top: '4px', width: '14px', height: '14px',
                  borderRadius: '50%', background: 'var(--bg-primary)', border: '4px solid var(--accent)'
                }}></div>
                <div style={{fontWeight: '700', color: 'var(--accent)', letterSpacing: '1px', marginBottom: '0.5rem', fontSize: '0.9rem'}}>{exp.dateRange || 'Ongoing'}</div>
                <h3 style={{fontSize: '1.6rem', marginBottom: '0.3rem', color: 'var(--text-primary)'}}>{exp.title}</h3>
                <div style={{fontFamily: 'var(--font-serif)', color: 'var(--primary)', fontSize: '1.15rem', marginBottom: '1rem'}}>{exp.organization}</div>
                <p style={{fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)'}}>{exp.description}</p>
              </div>
            </ScrollReveal>
          ))}
          {research.length === 0 && <p>No research experience found.</p>}
        </div>

        {/* WORK EXPERIENCE TIMELINE */}
        <ScrollReveal delay={150}>
           <h2 style={{borderLeft: '4px solid var(--primary)', paddingLeft: '1rem', marginBottom: '3rem', fontSize: '2rem'}}>Work Experience</h2>
        </ScrollReveal>
        <div style={{display: 'flex', flexDirection: 'column', gap: '3rem', marginLeft: '1rem'}}>
          {work.map((exp, idx) => (
            <ScrollReveal delay={idx * 150 + 200} key={exp.id}>
              <div style={{
                 position: 'relative',
                 paddingLeft: '3rem',
                 borderLeft: '2px solid var(--primary)',
                 paddingBottom: idx === work.length - 1 ? '0' : '2rem'
              }}>
                <div style={{
                  position: 'absolute', left: '-8px', top: '4px', width: '14px', height: '14px',
                  borderRadius: '50%', background: 'var(--bg-primary)', border: '4px solid var(--primary)'
                }}></div>
                <div style={{fontWeight: '700', color: 'var(--primary)', letterSpacing: '1px', marginBottom: '0.5rem', fontSize: '0.9rem'}}>{exp.dateRange || 'Ongoing'}</div>
                <h3 style={{fontSize: '1.6rem', marginBottom: '0.3rem', color: 'var(--text-primary)'}}>{exp.title}</h3>
                <div style={{fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)', fontSize: '1.15rem', marginBottom: '1rem'}}>{exp.organization}</div>
                <p style={{fontSize: '1.05rem', lineHeight: '1.7', color: 'var(--text-secondary)'}}>{exp.description}</p>
              </div>
            </ScrollReveal>
          ))}
          {work.length === 0 && <p>No work experience found.</p>}
        </div>

      </div>
    </div>
  );
}
