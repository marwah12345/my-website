import { db } from "@/lib/db";
import Image from "next/image";

export default async function CertificatesPage() {
  const awards = await db.award.findMany({ orderBy: { year: 'desc' } });
  const volunteers = await db.experience.findMany({ where: { type: 'volunteer' }, orderBy: { id: 'asc' } });

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa'}}>
      {/* Simple Header */}
      <div style={{
        background: 'white',
        padding: '2rem 0 1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <h1 style={{fontSize: '1.8rem', margin: '0', color: 'var(--primary)', fontWeight: 600}}>Honours & Impact</h1>
        </div>
      </div>

      <div className="container" style={{paddingTop: '2rem', paddingBottom: '3rem', flex: 1, maxWidth: '1100px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem'}}>
          
          {/* AWARDS COLUMN */}
          <div>
            <h2 className="mb-4" style={{color: 'var(--primary)', borderBottom: '2px solid var(--accent)', paddingBottom: '0.6rem', fontSize: '1.3rem', fontWeight: 600}}>Honours & Awards</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              {awards.map((award) => (
                <div key={award.id} style={{
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  boxShadow: '0 2px 6px -2px rgba(0,0,0,0.06)',
                  borderLeft: '3px solid var(--accent)'
                }}>
                  <h4 style={{fontSize: '0.95rem', marginBottom: '0.4rem', color: 'var(--text-primary)', fontWeight: 600}}>{award.title}</h4>
                  <p className="text-secondary font-bold" style={{fontSize: '0.82rem', margin: 0}}>
                    {award.issuer && `${award.issuer} • `}<span style={{color: 'var(--primary)'}}>{award.year}</span>
                  </p>
                </div>
              ))}
              {awards.length === 0 && <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>No awards found.</p>}
            </div>
          </div>

          {/* VOLUNTEER COLUMN */}
          <div>
            <h2 className="mb-4" style={{color: 'var(--primary)', borderBottom: '2px solid var(--primary)', paddingBottom: '0.6rem', fontSize: '1.3rem', fontWeight: 600}}>Volunteer & Community</h2>
            <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
              {volunteers.map((vol) => (
                <div key={vol.id} style={{
                  padding: '1rem',
                  background: 'white',
                  borderRadius: '6px',
                  border: '1px solid var(--border)',
                  borderLeft: '3px solid var(--primary)',
                  boxShadow: '0 2px 6px -2px rgba(0,0,0,0.06)'
                }}>
                  <div style={{color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.75rem', marginBottom: '0.3rem'}}>{vol.dateRange}</div>
                  <h3 style={{fontSize: '0.95rem', marginBottom: '0.2rem', fontWeight: 600}}>{vol.title}</h3>
                  <h4 className="text-secondary" style={{fontWeight: 500, fontFamily: 'var(--font-serif)', fontSize: '0.85rem', margin: 0}}>{vol.organization}</h4>
                </div>
              ))}
              {volunteers.length === 0 && <p style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>No community work found.</p>}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
