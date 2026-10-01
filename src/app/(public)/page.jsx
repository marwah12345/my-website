import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";
import AutoSlideshow from "@/components/AutoSlideshow";
import ExpSlideshow from "@/components/ExpSlideshow";
import "./home.css";

export default async function Home() {
  const education = await db.education.findMany({ orderBy: { yearStart: 'desc' } });
  
  // Fetch latest 2 of everything else for highlighting
  const experiences = await db.experience.findMany({ take: 2, where: { type: 'work' }, orderBy: { id: 'asc' } }); 
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
            <h1 className="hero-title">Dr. Marwah Zaid</h1>
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
              alt="Dr. Marwah Zaid" 
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

      {/* INDUSTRY EXPERIENCE SECTION */}
      <section className="exp-section" id="experience">
        <div className="container">

          {/* Section header */}
          <ScrollReveal delay={100} styleClass="exp-section-header">
            <div className="exp-header-left">
              <div className="exp-eyebrow">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                Latest Industry Work
              </div>
              <h2 className="exp-section-title">Industry Experience</h2>
            </div>
            <Link href="/experience" className="exp-view-btn">
              View Full Experience
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </ScrollReveal>

          {/* Cards — vertical with big image on top */}
          <div className="exp-cards">
            {experiences.map((exp, idx) => {
              // Aonic gets a multi-photo slideshow
              const aonicPhotos = [
                '/uploads/aonic-3.jpg',
                '/uploads/aonic-4.png',
              ];
              const isAonic = exp.organization.toLowerCase().includes('aonic');

              return (
                <ScrollReveal delay={(idx + 1) * 150} key={exp.id}>
                  <div className="exp-card">
                    <div className="exp-card-image" style={{position: 'relative'}}>
                      {isAonic ? (
                        <ExpSlideshow images={aonicPhotos} interval={3500} />
                      ) : exp.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={exp.image}
                          alt={exp.organization}
                          style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover'}}
                        />
                      ) : (
                        <div className="exp-card-image-placeholder">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg>
                        </div>
                      )}
                      <div className="exp-card-image-overlay" />
                    </div>
                    <div className="exp-card-body">
                      <span className="exp-card-badge">{exp.dateRange}</span>
                      <div className="exp-card-org">{exp.organization}</div>
                      <h3 className="exp-card-title">{exp.title}</h3>
                      {exp.description && <p className="exp-card-desc">{exp.description}</p>}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* COMBINED HIGHLIGHTS SECTION - All Latest Content */}
      <section className="section" style={{paddingTop: '2.5rem', paddingBottom: '3rem'}}>
        <div className="container">
          <ScrollReveal delay={100} styleClass="text-center mb-4">
            <h2 className="mb-1" style={{fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--primary)'}}>Latest Highlights</h2>
            <p className="text-secondary" style={{maxWidth: '600px', margin: '0 auto 2rem', fontSize: '0.85rem'}}>
              Recent publications, awards, projects, and literature.
            </p>
          </ScrollReveal>

          {/* Publications */}
          <div style={{marginBottom: '2.5rem'}}>
            <div className="flex justify-between items-center mb-3" style={{borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem'}}>
              <h3 style={{fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom'}}>
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
                </svg>
                Publications
              </h3>
              <Link href="/papers" className="text-primary" style={{fontSize: '0.8rem', fontWeight: 600}}>View All ({papers.length > 2 ? 'More' : papers.length}) →</Link>
            </div>
            <div className="grid-2" style={{gap: '1rem'}}>
              {papers.map((pub, idx) => (
                <ScrollReveal delay={(idx + 1) * 100} key={pub.id}>
                  <div className="card" style={{padding: 0}}>
                    <div style={{height: '120px', position: 'relative', overflow: 'hidden'}}>
                      <Image src="/uploads/mri.png" alt="Publication cover" fill style={{objectFit: 'cover'}} />
                      <div style={{position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.5)'}}></div>
                      <div style={{position: 'absolute', bottom: '0.6rem', left: '0.8rem', right: '0.8rem'}}>
                        <h4 style={{color: 'white', fontSize: '0.85rem', lineHeight: '1.3', textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>{pub.title}</h4>
                      </div>
                    </div>
                    <div style={{padding: '0.9rem'}}>
                      <div className="text-secondary font-bold" style={{fontSize: '0.7rem'}}>
                        {pub.venue} • <span style={{color: 'var(--accent)'}}>{pub.date || pub.year}</span>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Awards */}
          <div style={{marginBottom: '2.5rem'}}>
            <div className="flex justify-between items-center mb-3" style={{borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem'}}>
              <h3 style={{fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom'}}>
                  <circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
                </svg>
                Awards & Honors
              </h3>
              <Link href="/certificates" className="text-primary" style={{fontSize: '0.8rem', fontWeight: 600}}>View All →</Link>
            </div>
            <div className="grid-2" style={{gap: '1rem'}}>
              {awards.map((award, idx) => (
                <ScrollReveal delay={(idx + 1) * 100} key={award.id}>
                  <div className="card flex items-center gap-3" style={{padding: '0.9rem'}}>
                    <div style={{width: '40px', height: '40px', position: 'relative', borderRadius: '50%', overflow: 'hidden', flexShrink: 0}}>
                      <Image src="/uploads/award.png" alt="Award" fill style={{objectFit: 'cover'}} />
                    </div>
                    <div>
                      <h4 style={{fontSize: '0.88rem', marginBottom: '0.1rem', color: 'var(--primary)', fontWeight: 600, lineHeight: '1.3'}}>{award.title}</h4>
                      <p className="text-secondary" style={{fontSize: '0.72rem'}}>{award.issuer && `${award.issuer} • `}{award.year}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Projects & Books Combined */}
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem'}}>
            
            {/* Projects */}
            <div>
              <div className="flex justify-between items-center mb-3" style={{borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem'}}>
                <h3 style={{fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom'}}>
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                  </svg>
                  Projects
                </h3>
                <Link href="/projects" className="text-primary" style={{fontSize: '0.8rem', fontWeight: 600}}>View All →</Link>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {projects.map((proj, idx) => (
                  <ScrollReveal delay={(idx + 1) * 100} key={proj.id}>
                    <div className="card" style={{padding: 0, overflow: 'hidden'}}>
                      <div style={{height: '90px', position: 'relative', background: 'linear-gradient(135deg,#1e3a8a,#0f172a)'}}>
                        {proj.image
                          ? <Image src={proj.image} alt={proj.title} fill style={{objectFit: 'cover'}} />
                          : <Image src="/uploads/code.png" alt="Project" fill style={{objectFit: 'cover'}} />
                        }
                        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)'}}></div>
                      </div>
                      <div style={{padding: '0.9rem'}}>
                        <h4 style={{fontSize: '0.88rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.3rem'}}>{proj.title}</h4>
                        {proj.description && <p className="text-secondary" style={{fontSize: '0.75rem', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{proj.description}</p>}
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Books */}
            <div>
              <div className="flex justify-between items-center mb-3" style={{borderBottom: '1px solid var(--border)', paddingBottom: '0.8rem'}}>
                <h3 style={{fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{display: 'inline', marginRight: '0.5rem', verticalAlign: 'text-bottom'}}>
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                  Books
                </h3>
                <Link href="/books" className="text-primary" style={{fontSize: '0.8rem', fontWeight: 600}}>View All →</Link>
              </div>
              <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                {books.map((book, idx) => (
                  <ScrollReveal delay={(idx + 1) * 100} key={book.id}>
                    <div className="card" style={{padding: '0.9rem', borderLeft: '3px solid var(--accent)'}}>
                      <h4 style={{fontSize: '0.88rem', color: 'var(--primary)', fontWeight: 600, lineHeight: '1.3', marginBottom: '0.2rem'}}>{book.title}</h4>
                      <p className="text-secondary font-bold" style={{fontSize: '0.72rem'}}>{book.publisher && `${book.publisher} • `}{book.year}</p>
                      {book.description && <p className="text-secondary" style={{fontSize: '0.75rem', lineHeight: '1.4', marginTop: '0.4rem'}}>{book.description}</p>}
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
