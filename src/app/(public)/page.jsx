import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";
import AutoSlideshow from "@/components/AutoSlideshow";
import "./home.css";

export default async function Home() {
  const education = await db.education.findMany({ orderBy: { yearStart: 'desc' } });
  
  // Fetch latest 2 of everything for highlighting
  const industryExperiences = await db.experience.findMany({ take: 2, where: { type: 'work' }, orderBy: { id: 'desc' } }); 
  const academicExperiences = await db.experience.findMany({ take: 2, where: { type: 'research' }, orderBy: { id: 'desc' } });
  const papers = await db.paper.findMany({ take: 2, orderBy: { year: 'desc' } });
  const books = await db.book.findMany({ take: 2, orderBy: { year: 'desc' } });
  const projects = await db.project.findMany({ take: 2, orderBy: { createdAt: 'desc' } });
  const awards = await db.award.findMany({ take: 2, orderBy: { year: 'desc' } });

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container flex items-center gap-4" style={{flexWrap: 'wrap-reverse'}}>
          <ScrollReveal delay={100} styleClass="hero-content">
            <h1 className="hero-title">Dr. Marwah Al-Helali</h1>
            <h2 className="hero-subtitle">PhD Researcher in AI & Medical Imaging</h2>
            <div className="social-links mt-6">

              {/* Email */}
              <a href="mailto:marwahalhelali@gmail.com" className="social-pill" aria-label="Email" style={{'--pill-color': '#EA4335'}}>
                <span className="social-pill-icon" style={{background: 'rgba(234,67,53,0.18)', color: '#EA4335'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </span>
                <span className="social-pill-label">Email</span>
              </a>

              {/* LinkedIn */}
              <a href="https://www.linkedin.com/in/marwah-al-helali-a3bb05243/" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="LinkedIn" style={{'--pill-color': '#0A66C2'}}>
                <span className="social-pill-icon" style={{background: 'rgba(10,102,194,0.18)', color: '#0A66C2'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>
                  </svg>
                </span>
                <span className="social-pill-label">LinkedIn</span>
              </a>

              {/* Google Scholar */}
              <a href="https://scholar.google.com/citations?user=hlIQz8IAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Google Scholar" style={{'--pill-color': '#4285F4'}}>
                <span className="social-pill-icon" style={{background: 'rgba(66,133,244,0.18)', color: '#4285F4'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 10a8 8 0 0 1 7.162 3.44L24 9.5z"/>
                  </svg>
                </span>
                <span className="social-pill-label">Google Scholar</span>
              </a>

              {/* ORCID */}
              <a href="https://orcid.org/0009-0002-3079-0106" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="ORCID" style={{'--pill-color': '#A6CE39'}}>
                <span className="social-pill-icon" style={{background: 'rgba(166,206,57,0.18)', color: '#A6CE39'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947-.947-.431-.947-.947.422-.947.947-.947zm-.684 3.559h1.369v9.863H6.685V7.937zm3.56 0h3.69c3.521 0 5.36 2.544 5.36 4.928 0 2.434-1.839 4.935-5.36 4.935h-3.69V7.937zm1.369 1.247v7.369h2.227c2.546 0 4.003-1.731 4.003-3.683 0-1.952-1.457-3.686-4.003-3.686H11.614z"/>
                  </svg>
                </span>
                <span className="social-pill-label">ORCID</span>
              </a>

              {/* ResearchGate */}
              <a href="https://www.researchgate.net/profile/Marwah-Al-Helali?ev=hdr_xprf" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="ResearchGate" style={{'--pill-color': '#00CCBB'}}>
                <span className="social-pill-icon" style={{background: 'rgba(0,204,187,0.18)', color: '#00CCBB'}}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.073 16.27H8.445V7.732h2.482v8.537zm-1.241-9.701a1.44 1.44 0 1 1 0-2.88 1.44 1.44 0 0 1 0 2.88zm10.314 9.701h-2.48v-4.155c0-.991-.018-2.267-1.382-2.267-1.383 0-1.595 1.08-1.595 2.195v4.227h-2.478V7.732h2.38v1.165h.033c.331-.628 1.14-1.29 2.347-1.29 2.51 0 2.975 1.653 2.975 3.803v4.86z"/>
                  </svg>
                </span>
                <span className="social-pill-label">ResearchGate</span>
              </a>

            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={300} styleClass="hero-image-wrapper mx-auto">
            <Image 
              src="/uploads/profile.jpeg" 
              alt="Dr. Marwah Al-Helali" 
              width={400} 
              height={400} 
              className="hero-image"
              priority
            />
          </ScrollReveal>
        </div>
      </section>

      {/* FULL STATIC EDUCATION SECTION AS VERTICAL TIMELINE */}
      <section className="section" id="about" style={{paddingTop: '2rem', paddingBottom: '2rem'}}>
        <div className="container">
          <ScrollReveal delay={100} styleClass="text-center mb-4">
            <h2 className="section-title mb-k" style={{display: 'inline-block', fontSize: '1.5rem'}}>Education</h2>
          </ScrollReveal>
          
          <div className="mt-4" style={{maxWidth: '950px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem'}}>
            {education.map((ed, index) => {
              // Determine Photos based on degree matching
              let photos = [];
              if (ed.degree.toLowerCase().includes("bachelor")) {
                photos = ["/Photo/Me 1.JPG", "/Photo/Me 2.JPG", "/Photo/Me 3.jpg"];
              } else if (ed.degree.toLowerCase().includes("phd") || ed.degree.toLowerCase().includes("philosophy")) {
                photos = ["/Photo/MMU 1.jpg", "/Photo/MMU 2.png", "/Photo/MMU 3.png"];
              }

              return (
                <ScrollReveal delay={200} key={ed.id}>
                  <div style={{ 
                    position: 'relative', 
                    paddingLeft: '2rem', 
                    paddingBottom: index === education.length - 1 ? '0' : '2rem',
                    borderLeft: index === education.length - 1 ? '2px solid transparent' : '2px solid var(--border)'
                  }}>
                    {/* Timeline Node */}
                    <div style={{
                      position: 'absolute',
                      left: '-9px',
                      top: '3px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      boxShadow: '0 0 0 3px white, 0 0 0 5px var(--border)'
                    }}></div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', alignItems: 'flex-start' }}>
                      {/* Academic Content */}
                      <div style={{ flex: '1', minWidth: '260px' }}>
                        <div style={{color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.25rem', letterSpacing: '0.5px', fontSize: '0.75rem'}}>{ed.yearStart} - {ed.yearEnd || 'Present'}</div>
                        <h3 className="mb-2" style={{fontSize: '1.1rem', color: 'var(--text-primary)', lineHeight: 1.3}}>{ed.degree}</h3>
                        <div style={{fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)', fontSize: '0.95rem'}} className="mb-3">
                          {ed.institution}
                        </div>
                        <p style={{lineHeight: '1.6', fontSize: '0.88rem', color: 'var(--text-secondary)'}}>{ed.description}</p>
                      </div>

                      {/* Compact Image Slideshow Thumbnail */}
                      <div style={{
                        flex: '0 0 240px', 
                        height: '170px', 
                        position: 'relative', 
                        borderRadius: 'var(--radius-lg)', 
                        overflow: 'hidden', 
                        boxShadow: '0 8px 20px -8px rgba(0,0,0,0.2)',
                        border: '1px solid var(--border)'
                      }}>
                        {photos.length > 0 ? (
                          <AutoSlideshow images={photos} height="100%" borderRadius="var(--radius-lg)" interval={4000} />
                        ) : (
                          <div style={{width: '100%', height: '100%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                              <span className="text-secondary text-xs">No Photos</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* COMBINED LATEST HIGHLIGHTS SECTION - All Categories */}
      <section className="section" style={{paddingTop: '2.5rem', paddingBottom: '3rem', background: 'var(--bg-secondary)'}}>
        <div className="container" style={{maxWidth: '900px'}}>
          <ScrollReveal delay={100} styleClass="text-center mb-4">
            <h2 className="mb-1" style={{fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary)'}}>Latest Highlights</h2>
            <p className="text-secondary" style={{fontSize: '0.85rem', marginBottom: '2.5rem'}}>
              Recent experience, publications, awards, projects, and literature
            </p>
          </ScrollReveal>

          {/* Industry Experience */}
          <div style={{marginBottom: '2rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', borderBottom: '2px solid #1e3a8a', paddingBottom: '0.5rem'}}>
              <h3 style={{fontSize: '1.1rem', fontWeight: 700, color: '#1e3a8a', margin: 0}}>Industry Experience</h3>
              <Link href="/experience" style={{fontSize: '0.8rem', fontWeight: 600, color: '#1e3a8a'}}>View All →</Link>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {industryExperiences.map((exp, idx) => (
                <ScrollReveal delay={(idx + 1) * 100} key={exp.id}>
                  <div style={{padding: '1rem', background: 'white', borderRadius: 'var(--radius)', borderLeft: '3px solid #1e3a8a', transition: 'transform 0.2s ease'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem', flexWrap: 'wrap', gap: '0.5rem'}}>
                      <h4 style={{fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: '1.3', margin: 0}}>{exp.title}</h4>
                      <span style={{fontSize: '0.72rem', fontWeight: 600, color: '#1e3a8a', whiteSpace: 'nowrap'}}>{exp.dateRange}</span>
                    </div>
                    <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.4rem'}}>{exp.organization}</div>
                    {exp.description && (
                      <p style={{fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0}}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Academic Experience */}
          <div style={{marginBottom: '2rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', borderBottom: '2px solid #7c3aed', paddingBottom: '0.5rem'}}>
              <h3 style={{fontSize: '1.1rem', fontWeight: 700, color: '#7c3aed', margin: 0}}>Academic Experience</h3>
              <Link href="/experience" style={{fontSize: '0.8rem', fontWeight: 600, color: '#7c3aed'}}>View All →</Link>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {academicExperiences.map((exp, idx) => (
                <ScrollReveal delay={(idx + 1) * 100} key={exp.id}>
                  <div style={{padding: '1rem', background: 'white', borderRadius: 'var(--radius)', borderLeft: '3px solid #7c3aed', transition: 'transform 0.2s ease'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.3rem', flexWrap: 'wrap', gap: '0.5rem'}}>
                      <h4 style={{fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: '1.3', margin: 0}}>{exp.title}</h4>
                      <span style={{fontSize: '0.72rem', fontWeight: 600, color: '#7c3aed', whiteSpace: 'nowrap'}}>{exp.dateRange}</span>
                    </div>
                    <div style={{fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.4rem'}}>{exp.organization}</div>
                    {exp.description && (
                      <p style={{fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0}}>
                        {exp.description}
                      </p>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Publications */}
          <div style={{marginBottom: '2rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem'}}>
              <h3 style={{fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', margin: 0}}>Publications</h3>
              <Link href="/papers" style={{fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)'}}>View All →</Link>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {papers.map((pub, idx) => (
                <ScrollReveal delay={(idx + 1) * 100} key={pub.id}>
                  <div style={{padding: '1rem', background: 'white', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--primary)', transition: 'transform 0.2s ease'}}>
                    <h4 style={{fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', lineHeight: '1.4'}}>{pub.title}</h4>
                    <div style={{fontSize: '0.78rem', color: 'var(--text-secondary)'}}>
                      <span style={{fontWeight: 600}}>{pub.venue}</span>
                      {pub.year && <span> • {pub.year}</span>}
                      {pub.authors && <span style={{display: 'block', fontStyle: 'italic', marginTop: '0.2rem'}}>{pub.authors}</span>}
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div style={{marginBottom: '2rem'}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem'}}>
              <h3 style={{fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)', margin: 0}}>Awards & Honors</h3>
              <Link href="/certificates" style={{fontSize: '0.8rem', fontWeight: 600, color: 'var(--accent)'}}>View All →</Link>
            </div>
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
              {awards.map((award, idx) => (
                <ScrollReveal delay={(idx + 1) * 100} key={award.id}>
                  <div style={{padding: '1rem', background: 'white', borderRadius: 'var(--radius)', borderTop: '3px solid var(--accent)', transition: 'transform 0.2s ease'}}>
                    <h4 style={{fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem', lineHeight: '1.3'}}>{award.title}</h4>
                    <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0}}>
                      {award.issuer && <span>{award.issuer}</span>}
                      {award.year && <span> • {award.year}</span>}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Projects & Books Side by Side */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem'}}>
            
            {/* Projects */}
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', borderBottom: '2px solid #1e3a8a', paddingBottom: '0.5rem'}}>
                <h3 style={{fontSize: '1.1rem', fontWeight: 700, color: '#1e3a8a', margin: 0}}>Projects</h3>
                <Link href="/projects" style={{fontSize: '0.8rem', fontWeight: 600, color: '#1e3a8a'}}>View All →</Link>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {projects.map((proj, idx) => (
                  <ScrollReveal delay={(idx + 1) * 100} key={proj.id}>
                    <div style={{padding: '1rem', background: 'white', borderRadius: 'var(--radius)', borderLeft: '3px solid #1e3a8a', transition: 'transform 0.2s ease'}}>
                      <h4 style={{fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem', lineHeight: '1.3'}}>{proj.title}</h4>
                      {proj.description && (
                        <p style={{fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                          {proj.description}
                        </p>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Books */}
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '1rem', borderBottom: '2px solid #047857', paddingBottom: '0.5rem'}}>
                <h3 style={{fontSize: '1.1rem', fontWeight: 700, color: '#047857', margin: 0}}>Books</h3>
                <Link href="/books" style={{fontSize: '0.8rem', fontWeight: 600, color: '#047857'}}>View All →</Link>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {books.map((book, idx) => (
                  <ScrollReveal delay={(idx + 1) * 100} key={book.id}>
                    <div style={{padding: '1rem', background: 'white', borderRadius: 'var(--radius)', borderLeft: '3px solid #047857', transition: 'transform 0.2s ease'}}>
                      <h4 style={{fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.3rem', lineHeight: '1.3'}}>{book.title}</h4>
                      <p style={{fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '0.3rem'}}>
                        {book.publisher && `${book.publisher} • `}{book.year}
                      </p>
                      {book.description && (
                        <p style={{fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: '1.5', margin: 0}}>
                          {book.description}
                        </p>
                      )}
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
