import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";

export default async function PapersPage() {
  const papers = await db.paper.findMany({ orderBy: { year: 'desc' } });

  const journalPapers = papers.filter(p => p.type === 'journal');
  const conferencePapers = papers.filter(p => p.type === 'conference');

  // Fallback if none of them have types yet
  const otherPapers = papers.filter(p => p.type !== 'journal' && p.type !== 'conference');

  const PaperCard = ({ pub }) => (
    <div className="card" style={{
      position: 'relative', 
      borderLeft: '4px solid var(--accent)', 
      padding: '2.5rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: '1rem'
    }}>
      <h3 style={{fontSize: '1.4rem', color: 'var(--text-primary)', lineHeight: '1.4', marginBottom: '0'}}>{pub.title}</h3>
      
      {pub.authors && <div style={{fontWeight: '500', color: 'var(--text-secondary)'}}>{pub.authors}</div>}
      
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem 1.5rem',
        alignItems: 'center',
        padding: '0.8rem',
        background: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.9rem',
        color: 'var(--text-secondary)'
      }}>
        {pub.venue && <div><strong>{pub.type === 'journal' ? 'Journal' : 'Conference'}:</strong> {pub.venue}</div>}
        {(pub.date || pub.year) && <div><strong>Date:</strong> {pub.date || pub.year}</div>}
        {pub.place && <div><strong>Location:</strong> {pub.place}</div>}
        {pub.doi && <div><strong>DOI:</strong> {pub.doi}</div>}
      </div>

      {pub.description && <p style={{color: 'var(--text-secondary)', flex: 1, margin: '0'}}>{pub.description}</p>}
      
      {pub.link && (
        <div style={{marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border)'}}>
          <a href={pub.link} target="_blank" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.9rem'
          }}>
            Read Full Article <span style={{fontSize: '1.2rem'}}>&rarr;</span>
          </a>
        </div>
      )}
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

      <div className="container" style={{paddingTop: '4rem', paddingBottom: '6rem', flex: 1}}>
        
        {/* Journal Papers Section */}
        {journalPapers.length > 0 && (
          <div style={{marginBottom: '5rem'}}>
            <ScrollReveal delay={100} styleClass="mb-4" style={{borderBottom: '2px solid var(--border)', paddingBottom: '1rem'}}>
              <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--primary)'}}>Journal Papers</h2>
            </ScrollReveal>
            <div className="grid-2">
              {journalPapers.map((pub, idx) => (
                <ScrollReveal delay={(idx % 2 + 1) * 150} key={pub.id}>
                  <PaperCard pub={pub} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Conference Papers Section */}
        {conferencePapers.length > 0 && (
          <div style={{marginBottom: '5rem'}}>
             <ScrollReveal delay={100} styleClass="mb-4" style={{borderBottom: '2px solid var(--border)', paddingBottom: '1rem'}}>
              <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--primary)'}}>Conference Papers</h2>
            </ScrollReveal>
            <div className="grid-2">
              {conferencePapers.map((pub, idx) => (
                <ScrollReveal delay={(idx % 2 + 1) * 150} key={pub.id}>
                  <PaperCard pub={pub} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Other / Uncategorized Papers Section */}
        {otherPapers.length > 0 && (
          <div>
             <ScrollReveal delay={100} styleClass="mb-4" style={{borderBottom: '2px solid var(--border)', paddingBottom: '1rem'}}>
              <h2 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', color: 'var(--primary)'}}>Other Publications</h2>
            </ScrollReveal>
            <div className="grid-2">
              {otherPapers.map((pub, idx) => (
                <ScrollReveal delay={(idx % 2 + 1) * 150} key={pub.id}>
                  <PaperCard pub={pub} />
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {papers.length === 0 && <p className="text-center w-100" style={{marginTop: '2rem'}}>No publications found.</p>}
      </div>
    </div>
  );
}
