import { db } from "@/lib/db";

export default async function PapersPage() {
  const papers = await db.paper.findMany({ orderBy: { year: 'desc' } });

  const journalPapers = papers.filter(p => p.type === 'journal');
  const conferencePapers = papers.filter(p => p.type === 'conference');
  const otherPapers = papers.filter(p => p.type !== 'journal' && p.type !== 'conference');

  const PaperRow = ({ pub }) => (
    <div style={{
      padding: '1.2rem',
      background: 'white',
      borderRadius: '6px',
      border: '1px solid var(--border)',
      borderLeft: '3px solid var(--primary)',
      boxShadow: '0 2px 6px -2px rgba(0,0,0,0.06)',
      transition: 'all 0.2s ease',
      marginBottom: '0.75rem'
    }}>
      <div style={{display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem'}}>
        <div style={{flex: '1', minWidth: '300px'}}>
          <h3 style={{fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: '1.4', marginBottom: '0.4rem', fontWeight: 600}}>
            {pub.link ? (
              <a href={pub.link} target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)', textDecoration: 'none'}}>
                {pub.title}
              </a>
            ) : pub.title}
          </h3>
          
          {pub.authors && <div style={{fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.4rem', fontStyle: 'italic'}}>{pub.authors}</div>}
          
          <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.6rem', fontSize: '0.8rem', color: 'var(--text-secondary)'}}>
            {pub.venue && <span style={{fontWeight: 600, color: 'var(--primary)'}}>{pub.venue}</span>}
            {pub.year && <span style={{color: '#64748b', fontSize: '0.75rem'}}>• {pub.year}</span>}
            {pub.place && <span>• {pub.place}</span>}
          </div>

          {pub.doi && (
            <div style={{marginTop: '0.5rem'}}>
              <a href={`https://doi.org/${pub.doi}`} target="_blank" rel="noopener noreferrer" style={{
                fontSize: '0.75rem',
                color: 'var(--accent)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                fontWeight: 500
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                DOI: {pub.doi}
              </a>
            </div>
          )}

          {pub.description && <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.6rem', lineHeight: '1.6', margin: '0.6rem 0 0 0'}}>{pub.description}</p>}
        </div>

        {pub.link && (
          <a href={pub.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.4rem 0.8rem',
            fontSize: '0.75rem',
            whiteSpace: 'nowrap',
            alignSelf: 'flex-start'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa'}}>
      {/* Simple Header */}
      <div style={{
        background: 'white',
        padding: '2rem 0 1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <h1 style={{fontSize: '1.8rem', margin: '0', color: 'var(--primary)', fontWeight: 600}}>Published Papers</h1>
        </div>
      </div>

      <div className="container" style={{paddingTop: '2rem', paddingBottom: '3rem', flex: 1, maxWidth: '900px'}}>
        
        {/* Journal Papers Section */}
        {journalPapers.length > 0 && (
          <div style={{marginBottom: '2.5rem'}}>
            <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '1rem', paddingBottom: '0.4rem', borderBottom: '2px solid var(--primary)'}}>Journal Papers</h2>
            {journalPapers.map((pub) => (
              <PaperRow pub={pub} key={pub.id} />
            ))}
          </div>
        )}

        {/* Conference Papers Section */}
        {conferencePapers.length > 0 && (
          <div style={{marginBottom: '2.5rem'}}>
            <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '1rem', paddingBottom: '0.4rem', borderBottom: '2px solid var(--primary)'}}>Conference Papers</h2>
            {conferencePapers.map((pub) => (
              <PaperRow pub={pub} key={pub.id} />
            ))}
          </div>
        )}

        {/* Other / Uncategorized Papers Section */}
        {otherPapers.length > 0 && (
          <div>
            <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: 'var(--primary)', marginBottom: '1rem', paddingBottom: '0.4rem', borderBottom: '2px solid var(--primary)'}}>Other Publications</h2>
            {otherPapers.map((pub) => (
              <PaperRow pub={pub} key={pub.id} />
            ))}
          </div>
        )}

        {papers.length === 0 && <p className="text-center w-100" style={{marginTop: '2rem'}}>No publications found.</p>}
      </div>
    </div>
  );
}
