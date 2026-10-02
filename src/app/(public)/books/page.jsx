import { db } from "@/lib/db";

export default async function BooksPage() {
  const books = await db.book.findMany({ orderBy: { year: 'desc' } });

  const BookRow = ({ book }) => (
    <div style={{
      padding: '1.2rem',
      background: 'white',
      borderLeft: '3px solid var(--accent)',
      borderRadius: '6px',
      border: '1px solid var(--border)',
      boxShadow: '0 2px 6px -2px rgba(0,0,0,0.06)',
      transition: 'all 0.2s ease',
      marginBottom: '0.75rem'
    }}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap'}}>
        <div style={{flex: 1, minWidth: '250px'}}>
          <h3 style={{fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', lineHeight: '1.4'}}>
            {book.link ? (
              <a href={book.link} target="_blank" rel="noopener noreferrer" style={{color: 'var(--primary)', textDecoration: 'none'}}>
                {book.title}
              </a>
            ) : book.title}
          </h3>
          <div style={{fontSize: '0.82rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.4rem'}}>
            {book.publisher}
          </div>
          
          {book.doi && (
            <div style={{marginBottom: '0.4rem'}}>
              <a href={`https://doi.org/${book.doi}`} target="_blank" rel="noopener noreferrer" style={{
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
                DOI: {book.doi}
              </a>
            </div>
          )}
          
          {book.description && (
            <p style={{fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.4rem', lineHeight: '1.6', margin: 0}}>
              {book.description}
            </p>
          )}
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0}}>
          <span style={{fontSize: '0.8rem', color: '#64748b', fontWeight: 500, whiteSpace: 'nowrap'}}>
            {book.year}
          </span>
          {book.link && (
            <a href={book.link} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.35rem 0.7rem',
              background: 'var(--accent)',
              color: 'white',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: 600,
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa'}}>
      {/* Simple Header */}
      <div style={{
        background: 'white',
        padding: '2rem 0 1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <h1 style={{fontSize: '1.8rem', margin: '0', color: 'var(--primary)', fontWeight: 600}}>Authored Textbooks</h1>
        </div>
      </div>

      <div className="container" style={{paddingTop: '2rem', paddingBottom: '3rem', flex: 1, maxWidth: '900px'}}>
        <div style={{display: 'flex', flexDirection: 'column'}}>
          {books.map((book) => (
            <BookRow book={book} key={book.id} />
          ))}
          {books.length === 0 && <p className="text-center" style={{marginTop: '2rem', color: 'var(--text-secondary)'}}>No books found in the database.</p>}
        </div>
      </div>
    </div>
  );
}
