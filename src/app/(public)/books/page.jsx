import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";

export default async function BooksPage() {
  const books = await db.book.findMany({ orderBy: { year: 'desc' } });

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      {/* Mini-Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
        padding: '6rem 0 4rem',
        color: 'white',
        boxShadow: 'inset 0 -10px 20px -10px rgba(0,0,0,0.5)'
      }}>
        <div className="container text-center">
          <ScrollReveal delay={100}>
            <h1 style={{fontSize: '3rem', margin: '0', textShadow: '0 2px 5px rgba(0,0,0,0.3)', color: 'var(--accent)'}}>Authored Textbooks</h1>
            <p style={{marginTop: '1rem', opacity: 0.9, fontSize: '1.2rem', maxWidth: '600px', margin: '1rem auto 0', color: 'white'}}>
              Extended academic literature and textbook chapters I have written or contributed to.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container" style={{paddingTop: '4rem', paddingBottom: '6rem', flex: 1}}>
        <div className="grid-2">
          {books.map((book, idx) => (
            <ScrollReveal delay={(idx % 2 + 1) * 150} key={book.id}>
              <div className="card" style={{
                position: 'relative', 
                borderTop: '0',
                padding: '0',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                overflow: 'hidden'
              }}>
                <div style={{height: '8px', width: '100%', background: 'var(--accent)'}}></div>
                <div style={{padding: '2.5rem', flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <div style={{
                    display: 'inline-block',
                    color: 'var(--text-secondary)',
                    fontWeight: '600',
                    fontSize: '0.9rem',
                    marginBottom: '1rem',
                  }}>
                    PUBLISHER: <span style={{color: 'var(--primary)'}}>{book.publisher}</span> &bull; {book.year}
                  </div>

                  <h3 style={{fontSize: '1.6rem', color: 'var(--text-primary)', lineHeight: '1.3', marginBottom: '1.5rem'}}>{book.title}</h3>
                  {book.description && <p style={{color: 'var(--text-secondary)', flex: 1, marginBottom: '2rem', fontSize: '1.05rem'}}>{book.description}</p>}
                  
                  {book.link && (
                    <div style={{marginTop: 'auto'}}>
                      <a href={book.link} target="_blank" className="btn btn-secondary w-full text-center" style={{display: 'block'}}>
                        Access Book Details
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
          {books.length === 0 && <p className="text-center w-100">No books found in the database.</p>}
        </div>
      </div>
    </div>
  );
}
