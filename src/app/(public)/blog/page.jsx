import Link from "next/link";
import { db } from "@/lib/db";
import ScrollReveal from "@/components/ScrollReveal";

export default async function BlogParamsPage() {
  const posts = await db.blogPost.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div style={{minHeight: '100vh', display: 'flex', flexDirection: 'column'}}>
      {/* Magazine Header */}
      <div style={{
        background: 'white',
        padding: '6rem 0 3rem',
        borderBottom: '1px solid var(--border)'
      }}>
        <div className="container text-center">
          <ScrollReveal delay={100}>
            <h1 style={{fontSize: '4rem', margin: '0', color: 'var(--primary)', fontFamily: 'var(--font-serif)', letterSpacing: '-1px'}}>The Record.</h1>
            <p style={{marginTop: '1rem', fontSize: '1.2rem', maxWidth: '600px', margin: '0.5rem auto 0', color: 'var(--text-secondary)'}}>
              Thoughts, articles, and updates on AI medical research.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container" style={{paddingTop: '5rem', paddingBottom: '6rem', flex: 1}}>
        {posts.length === 0 ? (
          <p className="text-center text-secondary">No blog posts found.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '3rem'
          }}>
            {posts.map((post, index) => (
              <ScrollReveal delay={(index % 3) * 150 + 100} key={post.id} styleClass={index === 0 ? "featured-post" : ""}>
                <div style={{
                  gridColumn: index === 0 ? '1 / -1' : 'auto',
                  display: 'flex',
                  flexDirection: index === 0 ? 'row' : 'column',
                  gap: index === 0 ? '3rem' : '1.5rem',
                  paddingBottom: '2rem',
                  borderBottom: '1px solid var(--border)',
                  height: '100%'
                }} className={index === 0 ? "featured-wrapper" : ""}>
                  
                  {index === 0 && post.image && (
                    <div style={{flex: '0 0 50%', minHeight: '350px', background: `url(${post.image}) no-repeat center center / cover`, borderRadius: 'var(--radius)'}}></div>
                  )}

                  <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <div style={{color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.5rem'}}>
                      {new Date(post.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <Link href={`/blog/${post.slug}`} style={{color: 'var(--text-primary)'}}>
                      <h2 style={{
                        fontSize: index === 0 ? '2.8rem' : '1.6rem', 
                        fontFamily: 'var(--font-serif)', 
                        lineHeight: 1.2, 
                        marginBottom: '1rem',
                        transition: 'color 0.2s ease'
                      }} className="hover:text-primary">
                        {post.title}
                      </h2>
                    </Link>
                    <div style={{color: 'var(--text-secondary)', fontSize: index === 0 ? '1.15rem' : '1rem', lineHeight: 1.6, marginBottom: '1.5rem'}}>
                      {post.content.substring(0, index === 0 ? 300 : 120)}...
                    </div>
                    <div style={{marginTop: 'auto'}}>
                      <Link href={`/blog/${post.slug}`} style={{fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.9rem'}}>Read Story &rarr;</Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
