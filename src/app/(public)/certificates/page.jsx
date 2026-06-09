import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

export default async function CertificatesPage() {
  const awards = await db.award.findMany({ orderBy: { year: 'desc' } });
  
  const academicCerts = await db.certificate.findMany({ where: { type: 'academic' }, orderBy: { year: 'desc' } });
  const communityCerts = await db.certificate.findMany({ where: { type: 'community' }, orderBy: { year: 'desc' } });
  
  const volunteers = await db.experience.findMany({ where: { type: 'volunteer' }, orderBy: { id: 'asc' } });

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      {/* Mini-Hero */}
      <div style={{
        background: 'linear-gradient(135deg, var(--accent) 0%, #d97706 100%)',
        padding: '6rem 0 4rem',
        color: 'white',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <ScrollReveal delay={100}>
            <h1 style={{fontSize: '3rem', margin: '0', textShadow: '0 2px 4px rgba(0,0,0,0.2)'}}>Honours & Impact</h1>
            <p style={{marginTop: '1rem', fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto 0', textShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>
              A collection of my formal academic awards, significant certifications, and community service participations.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container" style={{paddingTop: '6rem', paddingBottom: '6rem', flex: 1}}>
        <div className="grid-2" style={{gap: '4rem'}}>
          
          {/* AWARDS COLUMN */}
          <div>
            <ScrollReveal delay={100}>
              <h2 className="mb-4" style={{color: 'var(--primary)', borderBottom: '2px solid var(--accent)', paddingBottom: '0.8rem', display: 'inline-block'}}>Honours & Awards</h2>
            </ScrollReveal>
            <div className="grid-1 gap-4">
              {awards.map((award, idx) => (
                <ScrollReveal delay={idx * 150 + 200} key={award.id}>
                  <div className="card flex items-center gap-4" style={{
                    padding: '1.5rem',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)',
                    borderLeft: '4px solid var(--accent)'
                  }}>
                    <div style={{width: '70px', height: '70px', position: 'relative', borderRadius: '50%', overflow: 'hidden', flexShrink: 0, boxShadow: '0 4px 6px rgba(0,0,0,0.1)'}}>
                       <Image src="/uploads/award.png" alt="Award medal placeholder" fill style={{objectFit: 'cover'}} />
                    </div>
                    <div>
                      <h4 style={{fontSize: '1.3rem', marginBottom: '0.2rem', color: 'var(--text-primary)'}}>{award.title}</h4>
                      <p className="text-secondary font-bold" style={{fontSize: '0.95rem'}}>{award.issuer && `${award.issuer} • `}<span style={{color: 'var(--primary)'}}>{award.year}</span></p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
              {awards.length === 0 && <p>No awards found.</p>}
            </div>
          </div>

          {/* VOLUNTEER COLUMN */}
          <div>
            <ScrollReveal delay={100}>
              <h2 className="mb-4" style={{color: 'var(--primary)', borderBottom: '2px solid var(--primary)', paddingBottom: '0.8rem', display: 'inline-block'}}>Volunteer & Community</h2>
            </ScrollReveal>
            <div className="grid-1 gap-4">
              {volunteers.map((vol, idx) => (
                <ScrollReveal delay={idx * 150 + 200} key={vol.id}>
                  <div className="card" style={{
                    padding: '1.5rem',
                    borderLeft: '4px solid var(--primary)',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
                  }}>
                    <div style={{color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.85rem', marginBottom: '0.3rem'}}>{vol.dateRange}</div>
                    <h3 style={{fontSize: '1.25rem', marginBottom: '0.2rem'}}>{vol.title}</h3>
                    <h4 className="text-secondary" style={{fontWeight: 500, fontFamily: 'var(--font-serif)'}}>{vol.organization}</h4>
                  </div>
                </ScrollReveal>
              ))}
              {volunteers.length === 0 && <p>No community work found.</p>}
            </div>
          </div>
          
        </div>

        {/* FORMAL CERTS SECTION */}
        <div style={{marginTop: '6rem', paddingTop: '4rem', borderTop: '1px solid var(--border)'}}>
           <ScrollReveal delay={100} styleClass="text-center mb-4">
              <h2 className="mb-4" style={{color: 'var(--primary)'}}>Formal Certificates</h2>
           </ScrollReveal>
           <div className="grid-2" style={{gap: '3rem'}}>
              <div>
                <ScrollReveal delay={200}><h3 className="mb-3 text-center" style={{fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)'}}>Academic Certificates</h3></ScrollReveal>
                <div className="grid-1 gap-3">
                  {academicCerts.map((cert, idx) => (
                    <ScrollReveal delay={idx * 150 + 300} key={cert.id}>
                      <div className="card" style={{padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                        <div style={{fontSize: '2rem'}}>📜</div>
                        <div>
                          <h4 style={{fontSize: '1.1rem'}}>{cert.name}</h4>
                          <p className="text-secondary text-sm">{cert.issuer} &bull; {cert.year}</p>
                        </div>
                      </div>
                    </ScrollReveal>
                  ))}
                  {academicCerts.length === 0 && <p className="text-light text-center">No academic certificates listed.</p>}
                </div>
              </div>
              
              <div>
                <ScrollReveal delay={200}><h3 className="mb-3 text-center" style={{fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)'}}>Community Certificates</h3></ScrollReveal>
                <div className="grid-1 gap-3">
                  {communityCerts.map((cert, idx) => (
                    <ScrollReveal delay={idx * 150 + 300} key={cert.id}>
                      <div className="card" style={{padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
                         <div style={{fontSize: '2rem'}}>🤝</div>
                         <div>
                          <h4 style={{fontSize: '1.1rem'}}>{cert.name}</h4>
                          <p className="text-secondary text-sm">{cert.issuer} &bull; {cert.year}</p>
                         </div>
                      </div>
                    </ScrollReveal>
                  ))}
                  {communityCerts.length === 0 && <p className="text-light text-center">No community certificates listed.</p>}
                </div>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}
