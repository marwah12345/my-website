import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";

export default async function PapersPage() {
  const papers = await db.paper.findMany({ orderBy: { year: 'desc' } });

  const journalPapers = papers.filter(p => p.type === 'journal');
  const conferencePapers = papers.filter(p => p.type === 'conference');
  const otherPapers = papers.filter(p => p.type !== 'journal' && p.type !== 'conference');

  const PaperRow = ({ pub }) => (
    <div style={{
      padding: '1.5rem',
      background: 'white',
      borderRadius: '8px',
      border: '1px solid var(--border)',
      borderLeft: '4px solid var(--primary)',
      boxShadow: '0 2px 6px -2px rgba(0,0,0,0.06)',
      transition: 'all 0.2s ease',
      marginBottom: '1rem'
    }}>
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem'}}>
        <div style={{flex: '1', minWidth: '300px'}}>
          <h3 style={{fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: '1.4', marginBottom: '0.5rem', fontWeight: 600}}>
            {pub.link ? (
              <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)', textDecoration: 'none', borderBottom: '2px solid transparent', transition: 'border-color 0.2s'}}>
                {pub.title}
              </a>
            ) : pub.title}
          </h3>
          
          {pub.authors && <div style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontStyle: 'italic'}}>{pub.authors}</div>}
          
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)'}}>
            {pub.venue && <span style={{fontWeight: 600, color: 'var(--primary)'}}>{pub.venue}</span>}
            {pub.year && <span style={{color: '#64748b', fontSize: '0.8rem'}}>• {pub.year}</span>}
            {pub.place && <span>• {pub.place}</span>}
            {pub.doi && <span>• DOI: {pub.doi}</span>}
          </div>

          {pub.description && <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.6', margin: '0.75rem 0 0 0'}}>{pub.description}</p>}
        </div>

        {pub.link && (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            fontSize: '0.85rem',
            whiteSpace: 'nowrap',
            alignSelf: 'flex-start'
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
            View Paper
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      {/* Mini-Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #1e40af 100%)',
        padding: '6rem 0 4rem',
        color: 'white',
        boxShadow: 'inset 0 -10px 20px -10px rgba(0,0,0,0.5)'
      }}>
        <div className="container text-center">
          <ScrollReveal delay={100}>
            <h1 style={{fontSize: '3rem', margin: '0', textShadow: '0 2px 5px rgba(0,0,0,0.3)'}}>Published Papers</h1>
            <p style={{marginTop: '1rem', opacity: 0.9, fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto 0'}}>
              A curated collection of my academic research, technical papers, and contributions to medical AI literature.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container" style={{paddingTop: '4rem', paddingBottom: '6rem', flex: 1, maxWidth: '900px'}}>
        
        {/* Journal Papers Section */}
        {journalPapers.length > 0 && (
          <div style={{marginBottom: '4rem'}}>
            <ScrollReveal delay={100} styleClass="mb-4">
              <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1.5rem', borderBottom: '3px solid var(--primary)', paddingBottom: '0.5rem'}}>Journal Papers</h2>
            </ScrollReveal>
            {journalPapers.map((pub, idx) => (
              <ScrollReveal delay={idx * 100 + 150} key={pub.id}>
                <PaperRow pub={pub} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Conference Papers Section */}
        {conferencePapers.length > 0 && (
          <div style={{marginBottom: '4rem'}}>
             <ScrollReveal delay={100} styleClass="mb-4">
              <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1.5rem', borderBottom: '3px solid var(--primary)', paddingBottom: '0.5rem'}}>Conference Papers</h2>
            </ScrollReveal>
            {conferencePapers.map((pub, idx) => (
              <ScrollReveal delay={idx * 100 + 150} key={pub.id}>
                <PaperRow pub={pub} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Other / Uncategorized Papers Section */}
        {otherPapers.length > 0 && (
          <div>
             <ScrollReveal delay={100} styleClass="mb-4">
              <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '1.5rem', borderBottom: '3px solid var(--primary)', paddingBottom: '0.5rem'}}>Other Publications</h2>
            </ScrollReveal>
            {otherPapers.map((pub, idx) => (
              <ScrollReveal delay={idx * 100 + 150} key={pub.id}>
                <PaperRow pub={pub} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {papers.length === 0 && <p className="text-center w-100" style={{marginTop: '2rem'}}>No publications found.</p>}
      </div>
    </div>
  );
}
