import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function AdminComments() {
  const comments = await db.comment.findMany({ 
    include: { post: true },
    orderBy: { createdAt: 'desc' } 
  });

  async function toggleComment(formData) {
    "use server";
    const id = parseInt(formData.get("id"));
    const current = await db.comment.findUnique({ where: { id }});
    await db.comment.update({
      where: { id },
      data: { approved: !current.approved }
    });
    revalidatePath("/admin/comments");
    revalidatePath("/blog/[slug]", 'page');
  }

  async function deleteComment(formData) {
    "use server";
    await db.comment.delete({ where: { id: parseInt(formData.get("id")) } });
    revalidatePath("/admin/comments");
    revalidatePath("/blog/[slug]", 'page');
  }

  return (
    <div>
      <h2 className="mb-4">Manage Comments</h2>
      <div className="card">
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '1px solid var(--border)'}}>
              <th style={{padding: '1rem'}}>Author</th>
              <th style={{padding: '1rem'}}>Comment</th>
              <th style={{padding: '1rem'}}>Post</th>
              <th style={{padding: '1rem'}}>Status</th>
              <th style={{padding: '1rem', width: '180px'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map(c => (
              <tr key={c.id} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '1rem'}}>{c.authorName}</td>
                <td style={{padding: '1rem'}}>{c.content}</td>
                <td style={{padding: '1rem'}}>{c.post.title}</td>
                <td style={{padding: '1rem'}}>
                  <span style={{color: c.approved ? 'green' : 'var(--accent)'}}>
                    {c.approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td style={{padding: '1rem', display: 'flex', gap: '0.5rem'}}>
                  <form action={toggleComment}>
                    <input type="hidden" name="id" value={c.id} />
                    <button type="submit" className="btn btn-secondary" style={{padding: '0.3rem 0.6rem', fontSize: '0.8rem'}}>
                      {c.approved ? 'Hide' : 'Approve'}
                    </button>
                  </form>
                  <form action={deleteComment}>
                    <input type="hidden" name="id" value={c.id} />
                     <button type="submit" className="btn btn-danger" style={{padding: '0.3rem 0.6rem', fontSize: '0.8rem'}}>Del</button>
                  </form>
                </td>
              </tr>
            ))}
            {comments.length === 0 && (
              <tr><td colSpan="5" style={{padding: '1rem', textAlign: 'center'}}>No comments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
