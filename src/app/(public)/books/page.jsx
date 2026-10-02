import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";

export default async function BooksPage() {
  const books = await db.book.findMany({ orderBy: { year: 'desc' } });

  const BookRow = ({ book }) => (
    <div style={{
      padding: '1.5rem',
      background: 'white',
      borderLeft: '3px solid var(--accent)',
      borderRadius: '6px',
      boxShadow: '0 2px 8px -2px rgba(0,0,0,0.1)',
      transition: 'all 0.2s ease',
      cursor: book.link ? 'pointer' : 'default'
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap'}}>
        <div style={{flex: 1, minWidth: '250px'}}>
          <h3 style={{fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: '1.4'}}>
            {book.link ? (
              <a href={book.link} target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)', textDecoration: 'none'}}>
                {book.title}
              </a>
            ) : book.title}
          </h3>
          <div style={{fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem'}}>
            {book.publisher}
          </div>
          {book.description && (
            <p style={{fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem', lineHeight: '1.6'}}>
              {book.description}
            </p>
          )}
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0}}>
          <span style={{fontSize: '0.85rem', color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap'}}>
            {book.year}
          </span>
          {book.link && (
            <a href={book.link} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.4rem 0.8rem',
              background: 'var(--accent)',
              color: 'white',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              View Book
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      {/* Mini-Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
        padding: '5rem 0 3rem',
        color: 'white',
        boxShadow: 'inset 0 -10px 20px -10px rgba(0,0,0,0.5)'
      }}>
        <div className="container text-center">
          <ScrollReveal delay={100}>
            <h1 style={{fontSize: '2.5rem', margin: '0', textShadow: '0 2px 5px rgba(0,0,0,0.3)', color: 'var(--accent)'}}>Authored Textbooks</h1>
            <p style={{marginTop: '1rem', opacity: 0.9, fontSize: '1.1rem', maxWidth: '600px', margin: '1rem auto 0', color: 'white'}}>
              Extended academic literature and textbook chapters I have written or contributed to
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container" style={{paddingTop: '3rem', paddingBottom: '5rem', flex: 1, maxWidth: '1100px'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
          {books.map((book, idx) => (
            <ScrollReveal delay={idx * 80 + 100} key={book.id}>
              <BookRow book={book} />
            </ScrollReveal>
          ))}
          {books.length === 0 && <p className="text-center" style={{marginTop: '2rem', color: 'var(--text-secondary)'}}>No books found in the database.</p>}
        </div>
      </div>
    </div>
  );
}
