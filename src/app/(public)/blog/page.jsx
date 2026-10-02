import Link from "next/link";
import { db } from "@/lib/db";

export default async function BlogParamsPage() {
  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#fafafa'}}>
      {/* Simple Header */}
      <div style={{
        background: 'white',
        padding: '2rem 0 1.5rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <h1 style={{fontSize: '1.8rem', margin: '0', color: 'var(--primary)', fontWeight: 600}}>Blog</h1>
        </div>
      </div>

      <div className="container" style={{paddingTop: '2rem', paddingBottom: '3rem', flex: 1, maxWidth: '1100px'}}>
        {posts.length === 0 ? (
          <p className="text-center text-secondary">No blog posts found.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1rem'
          }}>
            {posts.map((post) => (
              <div key={post.id} style={{
                background: 'white',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 6px -2px rgba(0,0,0,0.06)',
                overflow: 'hidden',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {post.image && (
                  <div style={{
                    width: '100%',
                    height: '180px',
                    background: `url(${post.image}) no-repeat center center / cover`
                  }}></div>
                )}
                
                <div style={{padding: '1.2rem', flex: 1, display: 'flex', flexDirection: 'column'}}>
                  <div style={{color: 'var(--accent)', fontWeight: 600, fontSize: '0.75rem', letterSpacing: '0.5px', marginBottom: '0.5rem'}}>
                    {new Date(post.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <Link href={`/blog/${post.slug}`} style={{color: 'var(--text-primary)', textDecoration: 'none'}}>
                    <h2 style={{
                      fontSize: '1.1rem', 
                      fontWeight: 600,
                      lineHeight: 1.3, 
                      marginBottom: '0.75rem',
                      color: 'var(--primary)'
                    }}>
                      {post.title}
                    </h2>
                  </Link>
                  <div style={{color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem', flex: 1}}>
                    {post.content.substring(0, 120)}...
                  </div>
                  <div>
                    <Link href={`/blog/${post.slug}`} style={{
                      color: 'var(--primary)',
                      fontWeight: 600,
                      fontSize: '0.85rem',
                      textDecoration: 'none'
                    }}>Read More →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
