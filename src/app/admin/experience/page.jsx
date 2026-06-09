import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminExperience() {
  const isAuth = await verifyAuth();
  if (!isAuth) redirect("/admin/login");

  const experiences = await db.experience.findMany({ orderBy: { id: 'asc' } });

  async function createExperience(formData) {
    "use server";
    await db.experience.create({
      data: {
        title: formData.get("title"),
        organization: formData.get("organization"),
        dateRange: formData.get("dateRange") || null,
        description: formData.get("description") || null,
        type: formData.get("type") || "work",
        image: formData.get("image") || null,
      }
    });
    revalidatePath("/admin/experience");
    revalidatePath("/experience");
    revalidatePath("/");
  }

  async function deleteExperience(formData) {
    "use server";
    await db.experience.delete({ where: { id: parseInt(formData.get("id")) } });
    revalidatePath("/admin/experience");
    revalidatePath("/experience");
    revalidatePath("/");
  }

  async function updateImage(formData) {
    "use server";
    await db.experience.update({
      where: { id: parseInt(formData.get("id")) },
      data: { image: formData.get("image") || null },
    });
    revalidatePath("/admin/experience");
    revalidatePath("/experience");
    revalidatePath("/");
  }

  return (
    <div>
      <h2 className="mb-4">Manage Experience</h2>

      {/* Add New */}
      <div className="card mb-4">
        <h3 className="mb-3">Add New Experience</h3>
        <form action={createExperience}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Job Title *</label>
              <input type="text" name="title" className="form-input" required placeholder="e.g. Research Assistant" />
            </div>
            <div className="form-group">
              <label className="form-label">Organization *</label>
              <input type="text" name="organization" className="form-input" required placeholder="e.g. Multimedia University" />
            </div>
            <div className="form-group">
              <label className="form-label">Date Range</label>
              <input type="text" name="dateRange" className="form-input" placeholder="e.g. Jan 2023 – Present" />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select name="type" className="form-input">
                <option value="work">Industry / Work</option>
                <option value="research">Research</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Description</label>
              <textarea name="description" className="form-textarea" rows={3} placeholder="Describe your role and key contributions..." />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">
                Workplace Photo Path
                <span style={{ fontWeight: 400, color: 'var(--text-secondary)', marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                  (upload to public/uploads/ first, then paste path e.g. /uploads/workplace.jpg)
                </span>
              </label>
              <input type="text" name="image" className="form-input" placeholder="/uploads/workplace.jpg" />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
            ➕ Add Experience
          </button>
        </form>
      </div>

      {/* Existing */}
      <div className="card">
        <h3 className="mb-3">Existing Experiences ({experiences.length})</h3>
        {experiences.length === 0 ? (
          <p className="text-secondary" style={{ textAlign: 'center', padding: '2rem' }}>No experiences yet. Add one above.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {experiences.map(exp => (
              <div key={exp.id} style={{
                display: 'flex',
                gap: '1.25rem',
                alignItems: 'flex-start',
                padding: '1.25rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                background: 'var(--bg-secondary)',
              }}>
                {/* Thumbnail */}
                <div style={{
                  width: '100px',
                  height: '75px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: 'linear-gradient(135deg,#0f172a,#1e3a8a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {exp.image
                    // eslint-disable-next-line @next/next/no-img-element
                    ? <img src={exp.image} alt={exp.organization} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', textAlign: 'center', padding: '0.25rem' }}>No photo yet</span>
                  }
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--primary)', display: 'block' }}>{exp.title}</strong>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{exp.organization}</span>
                  {exp.dateRange && <span style={{ fontSize: '0.8rem', color: 'var(--accent)', marginLeft: '0.5rem' }}>{exp.dateRange}</span>}
                  {exp.description && (
                    <p style={{ fontSize: '0.83rem', color: 'var(--text-secondary)', margin: '0.4rem 0 0', lineHeight: 1.5, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {exp.description}
                    </p>
                  )}

                  {/* Quick photo update */}
                  <form action={updateImage} style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', alignItems: 'center' }}>
                    <input type="hidden" name="id" value={exp.id} />
                    <input
                      type="text"
                      name="image"
                      defaultValue={exp.image || ''}
                      className="form-input"
                      placeholder="/uploads/photo.jpg"
                      style={{ fontSize: '0.82rem', padding: '0.35rem 0.6rem', flex: 1 }}
                    />
                    <button type="submit" className="btn btn-secondary" style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                      Update Photo
                    </button>
                  </form>
                </div>

                {/* Delete */}
                <form action={deleteExperience} style={{ flexShrink: 0 }}>
                  <input type="hidden" name="id" value={exp.id} />
                  <button
                    type="submit"
                    className="btn btn-danger"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                  >
                    Delete
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
