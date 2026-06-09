import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import CommentForm from "@/components/CommentForm";
import ScrollReveal from "@/components/ScrollReveal";

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  
  const post = await db.blogPost.findUnique({
    where: { slug },
    include: {
      comments: {
        where: { approved: true },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div style={{minHeight: '100vh', background: 'white'}}>
      {/* Blog Article Layout Header */}
      <div style={{paddingTop: '6rem', paddingBottom: '3rem'}}>
        <div style={{maxWidth: '800px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center'}}>
           <ScrollReveal delay={100}>
              <div style={{color: 'var(--accent)', fontWeight: 'bold', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '1.5rem'}}>
                Article
              </div>
              <h1 style={{fontSize: '3.5rem', fontFamily: 'var(--font-serif)', lineHeight: 1.1, color: 'var(--text-primary)', marginBottom: '1.5rem'}}>
                {post.title}
              </h1>
              <div style={{color: 'var(--text-secondary)', fontSize: '1.1rem', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem'}}>
                <span>Marwah Zaid</span>
                <span style={{color: 'var(--border)'}}>|</span>
                <span>{new Date(post.createdAt).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
           </ScrollReveal>
        </div>
      </div>

      {post.image && (
        <ScrollReveal delay={200}>
          <div style={{maxWidth: '1000px', margin: '0 auto 4rem', padding: '0 1.5rem'}}>
            <img src={post.image} alt={post.title} style={{width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', borderRadius: 'var(--radius-lg)'}} />
          </div>
        </ScrollReveal>
      )}

      {/* Article Content */}
      <div style={{maxWidth: '750px', margin: '0 auto', padding: '0 1.5rem'}}>
         <ScrollReveal delay={100}>
            <div style={{fontFamily: 'var(--font-serif)', fontSize: '1.15rem', lineHeight: '2', color: 'var(--text-primary)', wordBreak: 'break-word'}} className="blog-content">
              {post.content.split('\n').map((paragraph, idx) => (
                 <p key={idx} style={{marginBottom: '1.5rem'}}>{paragraph}</p>
              ))}
            </div>
            
            {post.video && (
              <div style={{marginTop: '4rem'}}>
                <h3 className="mb-4 text-center">Attached Video</h3>
                <video src={post.video} controls style={{width: '100%', borderRadius: 'var(--radius)'}}></video>
              </div>
            )}
         </ScrollReveal>
      </div>

      <div style={{maxWidth: '750px', margin: '6rem auto', padding: '0 1.5rem'}}>
         <hr style={{border: 0, height: '1px', background: 'var(--border)', marginBottom: '4rem'}} />
         
         <ScrollReveal delay={100}>
            <h2 className="mb-4" style={{fontFamily: 'var(--font-sans)', fontSize: '1.5rem'}}>Comments ({post.comments.length})</h2>
            
            {post.comments.length > 0 ? (
              <div className="grid-1 gap-4 mb-4">
                {post.comments.map((comment) => (
                  <div key={comment.id} style={{padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius)', borderLeft: '3px solid var(--border)'}}>
                     <div className="flex justify-between items-center mb-2">
                        <strong style={{color: 'var(--primary)'}}>{comment.authorName}</strong>
                        <small className="text-secondary">{new Date(comment.createdAt).toLocaleDateString()}</small>
                     </div>
                     <p style={{lineHeight: 1.6}}>{comment.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary mb-4 italic">Be the first to comment!</p>
            )}

            <div style={{marginTop: '3rem', padding: '2rem', background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', boxShadow: '0 10px 30px -15px rgba(0,0,0,0.1)'}}>
               <h3 className="mb-3" style={{fontFamily: 'var(--font-sans)', fontSize: '1.2rem'}}>Leave a Reply</h3>
               <CommentForm postId={post.id} />
            </div>
         </ScrollReveal>
      </div>
    </div>
  );
}
