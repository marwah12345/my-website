import { db } from "@/lib/db";
import Image from "next/image";

export default async function VolunteerPage() {
  const volunteers = await db.experience.findMany({ 
    where: { type: 'volunteer' },
    orderBy: { id: 'desc' }
  });

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa'}}>
      {/* Header */}
      <div style={{
        background: 'white',
        padding: '2rem 0 1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <h1 style={{fontSize: '1.8rem', margin: '0', color: 'var(--primary)', fontWeight: 600}}>Volunteer Activities</h1>
        </div>
      </div>

      <div className="container" style={{paddingTop: '2rem', paddingBottom: '3rem', flex: 1, maxWidth: '1100px'}}>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem'}}>
          {volunteers.map((vol) => (
            <div key={vol.id} style={{
              padding: '1.5rem',
              background: 'white',
              borderRadius: '8px',
              border: '1px solid var(--border)',
              boxShadow: '0 2px 8px -2px rgba(0,0,0,0.08)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'all 0.2s ease'
            }}>
              {vol.image && (
                <div style={{
                  width: '120px',
                  height: '120px',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#f8fafc',
                  borderRadius: '8px',
                  padding: '1rem',
                  border: '1px solid var(--border)'
                }}>
                  <Image 
                    src={vol.image} 
                    alt={vol.organization}
                    width={120}
                    height={120}
                    style={{width: '100%', height: '100%', objectFit: 'contain'}}
                    unoptimized
                  />
                </div>
              )}
              <div style={{fontSize: '0.75rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.5px', marginBottom: '0.5rem'}}>
                {vol.dateRange}
              </div>
              <h3 style={{fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: '1.4'}}>
                {vol.title}
              </h3>
              <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)', fontStyle: 'italic'}}>
                {vol.organization}
              </div>
              {vol.description && (
                <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.75rem', lineHeight: '1.6'}}>
                  {vol.description}
                </p>
              )}
            </div>
          ))}
        </div>
        
        {volunteers.length === 0 && (
          <p className="text-center" style={{marginTop: '2rem', color: 'var(--text-secondary)'}}>
            No volunteer activities found.
          </p>
        )}
      </div>
    </div>
  );
}
