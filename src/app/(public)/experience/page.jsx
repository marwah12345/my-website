import { db } from "@/lib/db";
import Image from "next/image";

export default async function ExperiencePage() {
  const experiences = await db.experience.findMany({ orderBy: { id: 'asc' } });
  
  const research = experiences.filter(e => e.type === 'research');
  const work = experiences.filter(e => e.type === 'work');

  // Map organization names to image paths
  const getImagePath = (organization) => {
    const imageMap = {
      'Aonic': '/uploads/Aonic.png',
      'Breakthrough Academy': '/uploads/Breakthrough Academy.png',
      'IMAS International School': '/uploads/IMAS International School.png'
    };
    return imageMap[organization] || null;
  };

  const ExperienceCard = ({ exp, color = 'var(--accent)' }) => {
    const imagePath = getImagePath(exp.organization);
    
    return (
      <div style={{
        padding: '1rem',
        background: 'white',
        borderRadius: '6px',
        border: '1px solid var(--border)',
        borderLeft: `3px solid ${color}`,
        boxShadow: '0 2px 6px -2px rgba(0,0,0,0.06)',
        transition: 'all 0.2s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {imagePath && (
          <div style={{marginBottom: '0.75rem', width: '100%', height: '120px', position: 'relative', borderRadius: '4px', overflow: 'hidden'}}>
            <Image 
              src={imagePath}
              alt={exp.organization}
              fill
              style={{objectFit: 'cover'}}
            />
          </div>
        )}
        <div style={{fontSize: '0.7rem', fontWeight: 600, color: '#64748b', letterSpacing: '0.3px', marginBottom: '0.4rem'}}>
          {exp.dateRange || 'Ongoing'}
        </div>
        <h3 style={{fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem', lineHeight: '1.3'}}>
          {exp.title}
        </h3>
        <div style={{fontSize: '0.82rem', color: color, fontWeight: 600, marginBottom: '0.6rem'}}>
          {exp.organization}
        </div>
        {exp.description && (
          <p style={{fontSize: '0.85rem', lineHeight: '1.6', color: 'var(--text-secondary)', margin: 0, flex: 1}}>
            {exp.description}
          </p>
        )}
      </div>
    );
  };

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa'}}>
      {/* Simple Header */}
      <div style={{
        background: 'white',
        padding: '2rem 0 1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <h1 style={{fontSize: '1.8rem', margin: '0', color: 'var(--primary)', fontWeight: 600}}>Professional Experience</h1>
        </div>
      </div>

      <div className="container" style={{paddingTop: '2rem', paddingBottom: '3rem', flex: 1, maxWidth: '1100px'}}>
        
        {/* TEACHING EXPERIENCE */}
        {research.length > 0 && (
          <div style={{marginBottom: '2.5rem'}}>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.3rem',
              color: 'var(--primary)',
              marginBottom: '1rem',
              paddingLeft: '0.75rem',
              borderLeft: '3px solid var(--accent)'
            }}>Teaching Experience</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem'}}>
              {research.map((exp) => (
                <ExperienceCard exp={exp} color="var(--accent)" key={exp.id} />
              ))}
            </div>
          </div>
        )}

        {/* WORK EXPERIENCE */}
        {work.length > 0 && (
          <div>
            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.3rem',
              color: 'var(--primary)',
              marginBottom: '1rem',
              paddingLeft: '0.75rem',
              borderLeft: '3px solid var(--primary)'
            }}>Work Experience</h2>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem'}}>
              {work.map((exp) => (
                <ExperienceCard exp={exp} color="var(--primary)" key={exp.id} />
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
