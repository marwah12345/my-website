import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default async function AdminPapers() {
  const papers = await db.paper.findMany({ orderBy: { createdAt: 'desc' } });

  async function createPaper(formData) {
    "use server";
    await db.paper.create({
      data: {
        title: formData.get("title"),
        authors: formData.get("authors"),
        venue: formData.get("venue"),
        type: formData.get("type"),
        doi: formData.get("doi"),
        place: formData.get("place"),
        date: formData.get("date"),
        year: parseInt(formData.get("year")) || new Date().getFullYear(),
        description: formData.get("description"),
        link: formData.get("link"),
      }
    });
    revalidatePath("/admin/papers");
    revalidatePath("/papers");
    revalidatePath("/");
  }

  async function deletePaper(formData) {
    "use server";
    await db.paper.delete({ where: { id: parseInt(formData.get("id")) } });
    revalidatePath("/admin/papers");
    revalidatePath("/papers");
    revalidatePath("/");
  }

  return (
    <div>
      <h2 className="mb-4">Manage Papers</h2>
      
      <div className="card mb-4">
        <h3 className="mb-3">Add New Paper</h3>
        <form action={createPaper}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Type</label>
              <select name="type" className="form-input" required>
                <option value="journal">Journal Paper</option>
                <option value="conference">Conference Paper</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" name="title" className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Authors</label>
              <input type="text" name="authors" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Journal/Conference Name (Venue)</label>
              <input type="text" name="venue" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Date (e.g. Oct 2024)</label>
              <input type="text" name="date" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Year (Fallback for sorting)</label>
              <input type="number" name="year" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">Place / Location</label>
              <input type="text" name="place" className="form-input" />
            </div>
            <div className="form-group">
              <label className="form-label">DOI</label>
              <input type="text" name="doi" className="form-input" />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Link</label>
            <input type="url" name="link" className="form-input" />
          </div>
          <div className="form-group">
            <label className="form-label">Description / Abstract</label>
            <textarea name="description" className="form-textarea"></textarea>
          </div>
          <button type="submit" className="btn btn-primary">Add Paper</button>
        </form>
      </div>

      <div className="card">
        <h3 className="mb-3">Existing Papers</h3>
        <table style={{width: '100%', textAlign: 'left', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '1px solid var(--border)'}}>
              <th style={{padding: '1rem'}}>Title</th>
              <th style={{padding: '1rem'}}>Type</th>
              <th style={{padding: '1rem'}}>Venue</th>
              <th style={{padding: '1rem', width: '100px'}}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {papers.map(paper => (
              <tr key={paper.id} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '1rem'}}>{paper.title}</td>
                <td style={{padding: '1rem', textTransform: 'capitalize'}}>{paper.type}</td>
                <td style={{padding: '1rem'}}>{paper.venue} ({paper.year})</td>
                <td style={{padding: '1rem'}}>
                  <form action={deletePaper}>
                    <input type="hidden" name="id" value={paper.id} />
                    <button type="submit" className="btn btn-danger" style={{padding: '0.3rem 0.6rem', fontSize: '0.8rem'}}>Delete</button>
                  </form>
                </td>
              </tr>
            ))}
            {papers.length === 0 && (
              <tr><td colSpan="3" style={{padding: '1rem', textAlign: 'center'}}>No papers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
