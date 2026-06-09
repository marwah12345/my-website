import Image from "next/image";
import Link from "next/link";
import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";
import AutoSlideshow from "@/components/AutoSlideshow";
import "./home.css";

export default async function Home() {
  const education = await db.education.findMany({ orderBy: { yearStart: 'desc' } });
  
  // Fetch latest 2 of everything else for highlighting
  const experiences = await db.experience.findMany({ take: 2, orderBy: { id: 'asc' } }); 
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
            <h1 className="hero-title">Marwah Zaid</h1>
            <h2 className="hero-subtitle">PhD Researcher in AI & Medical Imaging</h2>
            <p className="mb-4 text-secondary" style={{fontSize: '1.05rem', lineHeight: '1.8'}}>
              I am a PhD Researcher at Multimedia University, specializing in brain MRI analysis and predictive modeling. 
              My research focuses on developing deep learning and physics-informed models to predict tissue deterioration 
              and model cerebral microbleeds, aiming to generate clinically meaningful insights beyond traditional detection systems.
            </p>
            <p className="mb-4 text-secondary" style={{fontSize: '1.05rem', lineHeight: '1.8'}}>
              I hold a First-Class Honours degree in Computer Science (CGPA 3.73) and have published multiple works in machine 
              learning and medical AI. I am particularly interested in translating advanced AI methods into real-world clinical applications.
            </p>
            <div className="flex gap-4 items-center mt-6">
              <a href="#about" className="btn btn-primary" style={{padding: '0.8rem 1.5rem'}}>Discover My Journey ↓</a>
            </div>
            <div className="flex gap-4 mt-6" style={{flexWrap: 'wrap'}}>
              <a href="https://scholar.google.com/citations?user=hlIQz8IAAAAJ&hl=en" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="Google Scholar" style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--primary)', transition: 'all 0.3s'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z"/><path d="M12 3a9 9 0 0 0-9 9h18a9 9 0 0 0-9-9Z"/><path d="M12 3v18"/><path d="M3 12h18"/></svg>
              </a>
              <a href="https://orcid.org/0009-0002-3079-0106" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="ORCID" style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--primary)', transition: 'all 0.3s'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 9v6"/><path d="M11 9v6h3.5a3 3 0 0 0 0-6H11z"/></svg>
              </a>
              <a href="https://www.researchgate.net/profile/Marwah-Al-Helali?ev=hdr_xprf" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="ResearchGate" style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--primary)', transition: 'all 0.3s'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="social-icon-link" aria-label="LinkedIn" style={{display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-secondary)', color: 'var(--primary)', transition: 'all 0.3s'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={300} styleClass="hero-image-wrapper mx-auto">
            <Image 
              src="/uploads/profile.png" 
              alt="Marwah Zaid" 
              width={400} 
              height={400} 
              className="hero-image"
              priority
            />
          </ScrollReveal>
        </div>
      </section>

      {/* FULL STATIC EDUCATION SECTION AS VERTICAL TIMELINE */}
      <section className="section" id="about" style={{paddingTop: '6rem', paddingBottom: '6rem'}}>
        <div className="container">
          <ScrollReveal delay={100} styleClass="text-center mb-4">
            <h2 className="section-title mb-k" style={{display: 'inline-block'}}>Education</h2>
          </ScrollReveal>
          
          <div className="mt-4" style={{maxWidth: '1000px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem'}}>
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
                    paddingLeft: '3rem', 
                    paddingBottom: index === education.length - 1 ? '0' : '4rem',
                    borderLeft: index === education.length - 1 ? '3px solid transparent' : '3px solid var(--border)'
                  }}>
                    {/* Timeline Node */}
                    <div style={{
                      position: 'absolute',
                      left: '-10.5px',
                      top: '5px',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      boxShadow: '0 0 0 4px white, 0 0 0 6px var(--border)'
                    }}></div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'flex-start' }}>
                      {/* Academic Content */}
                      <div style={{ flex: '1', minWidth: '280px' }}>
                        <div style={{color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.4rem', letterSpacing: '1px', fontSize: '0.95rem'}}>{ed.yearStart} - {ed.yearEnd || 'Present'}</div>
                        <h3 className="mb-2" style={{fontSize: '1.4rem', color: 'var(--text-primary)', lineHeight: 1.3}}>{ed.degree}</h3>
                        <div style={{fontFamily: 'var(--font-serif)', color: 'var(--text-secondary)', fontSize: '1.1rem'}} className="mb-3">
                          {ed.institution}
                        </div>
                        <p style={{lineHeight: '1.7', fontSize: '1rem', color: 'var(--text-secondary)'}}>{ed.description}</p>
                      </div>

                      {/* Compact Image Slideshow Thumbnail */}
                      <div style={{
                        flex: '0 0 320px', 
                        height: '240px', 
                        position: 'relative', 
                        borderRadius: 'var(--radius-lg)', 
                        overflow: 'hidden', 
                        boxShadow: '0 12px 30px -10px rgba(0,0,0,0.2)',
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

      {/* RECENT EXPERIENCE SECTION */}
      <section className="section section-alt" style={{paddingTop: '6rem', paddingBottom: '6rem'}}>
        <div className="container">
          <ScrollReveal delay={100} styleClass="flex justify-between items-end mb-4" style={{borderBottom: '1px solid var(--border)', paddingBottom: '1rem'}}>
            <div>
              <h2 className="mb-1" style={{fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--primary)'}}>Recent Experience</h2>
              <p className="text-secondary">Professional and research roles driving innovation in AI.</p>
            </div>
            <Link href="/experience" className="btn btn-secondary" style={{marginBottom: '0.5rem'}}>View Timeline &rarr;</Link>
          </ScrollReveal>
          
          <div className="grid-2 mt-4" style={{gap: '2rem'}}>
            {experiences.map((exp, idx) => (
              <ScrollReveal delay={(idx + 1) * 150} key={exp.id}>
                <div className="card" style={{padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%'}}>
                  <div className="flex justify-between items-start mb-3">
                    <h3 style={{fontSize: '1.4rem', color: 'var(--primary)'}}>{exp.title}</h3>
                    <span style={{background: 'rgba(30, 58, 138, 0.1)', color: 'var(--primary)', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '600'}}>
                      {exp.dateRange}
                    </span>
                  </div>
                  <div className="text-secondary mb-3 font-bold">{exp.organization}</div>
                  {exp.description && <p style={{lineHeight: '1.6', flex: 1}}>{exp.description}</p>}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT PUBLICATIONS SECTION */}
      <section className="section" style={{paddingTop: '6rem', paddingBottom: '6rem'}}>
        <div className="container">
          <ScrollReveal delay={100} styleClass="flex justify-between items-end mb-4" style={{borderBottom: '1px solid var(--border)', paddingBottom: '1rem'}}>
            <div>
              <h2 className="mb-1" style={{fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--primary)'}}>Latest Publications</h2>
              <p className="text-secondary">Key academic contributions to peer-reviewed journals and conferences.</p>
            </div>
            <Link href="/papers" className="btn btn-secondary" style={{marginBottom: '0.5rem'}}>Read All Papers &rarr;</Link>
          </ScrollReveal>
          
          <div className="grid-2 mt-4" style={{gap: '2rem'}}>
            {papers.map((pub, idx) => (
              <ScrollReveal delay={(idx + 1) * 150} key={pub.id}>
                <div className="card" style={{padding: 0}}>
                  <div style={{height: '250px', position: 'relative', overflow: 'hidden'}}>
                    {/* Applying the generated placeholder image and a glass overlay */}
                    <Image src="/uploads/mri.png" alt="Publication cover" fill style={{objectFit: 'cover'}} />
                    <div style={{position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.6)'}}></div>
                    <div style={{position: 'absolute', bottom: '1rem', left: '1.5rem', right: '1.5rem'}}>
                      <h3 style={{color: 'white', fontSize: '1.3rem', lineHeight: '1.4', textShadow: '0 2px 5px rgba(0,0,0,0.5)'}}>{pub.title}</h3>
                    </div>
                  </div>
                  <div style={{padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column'}}>
                    <div className="text-secondary font-bold mb-2">
                      {pub.venue} &bull; <span style={{color: 'var(--accent)'}}>{pub.date || pub.year}</span>
                    </div>
                    {pub.authors && <div style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontStyle: 'italic'}}>{pub.authors}</div>}
                    {pub.doi && <div style={{fontSize: '0.85rem', color: 'var(--text-secondary)'}}>DOI: <a href={pub.link || `#`} target="_blank" style={{color: 'var(--primary)'}}>{pub.doi}</a></div>}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT AWARDS SECTION */}
      <section className="section section-alt" style={{paddingTop: '6rem', paddingBottom: '6rem'}}>
        <div className="container">
          <ScrollReveal delay={100} styleClass="flex justify-between items-end mb-4" style={{borderBottom: '1px solid var(--border)', paddingBottom: '1rem'}}>
            <div>
              <h2 className="mb-1" style={{fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--primary)'}}>Honours & Awards</h2>
              <p className="text-secondary">Recognition for academic and research excellence.</p>
            </div>
            <Link href="/certificates" className="btn btn-secondary" style={{marginBottom: '0.5rem'}}>View Certificates &rarr;</Link>
          </ScrollReveal>
          
          <div className="grid-2 mt-4" style={{gap: '2rem', maxWidth: '900px', margin: '0 auto'}}>
            {awards.map((award, idx) => (
              <ScrollReveal delay={(idx + 1) * 150} key={award.id}>
                <div className="card flex items-center gap-4" style={{padding: '1.5rem'}}>
                  <div style={{width: '60px', height: '60px', position: 'relative', borderRadius: '50%', overflow: 'hidden', flexShrink: 0}}>
                     <Image src="/uploads/award.png" alt="Award medal placeholder" fill style={{objectFit: 'cover'}} />
                  </div>
                  <div>
                    <h4 style={{fontSize: '1.2rem', marginBottom: '0.2rem', color: 'var(--primary)'}}>{award.title}</h4>
                    <p className="text-secondary" style={{fontSize: '0.95rem'}}>{award.issuer && `${award.issuer} • `}{award.year}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT PROJECTS / BOOKS SECTION */}
      <section className="section" style={{paddingTop: '6rem', paddingBottom: '8rem'}}>
        <div className="container">
          <ScrollReveal delay={100} styleClass="text-center mb-4">
            <h2 className="mb-1" style={{fontFamily: 'var(--font-serif)', fontSize: '2.5rem', color: 'var(--primary)'}}>Projects & Literature</h2>
            <p className="text-secondary" style={{maxWidth: '600px', margin: '0 auto 3rem'}}>
              A glance at my technical research tools, application development, and authorship.
            </p>
          </ScrollReveal>
          
          <div className="grid-2 mt-4" style={{gap: '3rem'}}>
            {/* Project Column */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 style={{fontSize: '1.5rem'}}>Latest Projects</h3>
                <Link href="/projects" className="text-primary text-sm font-bold">View All &rarr;</Link>
              </div>
              <div className="grid-1 gap-4">
                {projects.map((proj, idx) => (
                  <ScrollReveal delay={(idx + 1) * 150} key={proj.id}>
                     <div className="card" style={{padding: 0, overflow: 'hidden'}}>
                         <div style={{height: '150px', position: 'relative', background: 'linear-gradient(135deg,#1e3a8a,#0f172a)'}}>
                             {proj.image
                               ? <Image src={proj.image} alt={proj.title} fill style={{objectFit: 'cover'}} />
                               : <Image src="/uploads/code.png" alt="Project placeholder" fill style={{objectFit: 'cover'}} />
                             }
                             <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8), transparent)'}}></div>
                         </div>
                         <div style={{padding: '1.5rem'}}>
                            <h4 style={{fontSize: '1.2rem', color: 'var(--primary)'}}>{proj.title}</h4>
                            {proj.description && <p className="mt-2 text-secondary" style={{fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>{proj.description}</p>}
                            <div style={{display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap'}}>
                              {proj.githubLink && (
                                <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'0.35rem',background:'#0f172a',color:'white',padding:'0.4rem 0.85rem',borderRadius:'6px',fontSize:'0.8rem',fontWeight:600,textDecoration:'none'}}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
                                  GitHub
                                </a>
                              )}
                              {proj.youtubeLink && (
                                <a href={proj.youtubeLink} target="_blank" rel="noopener noreferrer" style={{display:'inline-flex',alignItems:'center',gap:'0.35rem',background:'#ff0000',color:'white',padding:'0.4rem 0.85rem',borderRadius:'6px',fontSize:'0.8rem',fontWeight:600,textDecoration:'none'}}>
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                  YouTube
                                </a>
                              )}
                            </div>
                         </div>
                     </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Books Column */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 style={{fontSize: '1.5rem'}}>Authored Text</h3>
                <Link href="/books" className="text-primary text-sm font-bold">View All &rarr;</Link>
              </div>
              <div className="grid-1 gap-4">
                {books.map((book, idx) => (
                  <ScrollReveal delay={(idx + 1) * 150} key={book.id}>
                    <div className="card" style={{padding: '1.5rem', borderLeft: '4px solid var(--accent)'}}>
                      <h4 style={{fontSize: '1.2rem', color: 'var(--primary)'}}>{book.title}</h4>
                      <p className="text-secondary font-bold mt-1">{book.publisher && `${book.publisher} • `}{book.year}</p>
                      {book.description && <p className="mt-2 text-secondary" style={{fontSize: '0.95rem'}}>{book.description}</p>}
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
