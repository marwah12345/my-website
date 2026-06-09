import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminProjects() {
  const isAuth = await verifyAuth();
  if (!isAuth) redirect("/admin/login");

  const projects = await db.project.findMany({ orderBy: { createdAt: 'desc' } });

  async function createProject(formData) {
    "use server";
    await db.project.create({
      data: {
        title: formData.get("title"),
        description: formData.get("description") || null,
        image: formData.get("image") || null,
        githubLink: formData.get("githubLink") || null,
        youtubeLink: formData.get("youtubeLink") || null,
        link: formData.get("link") || null,
      }
    });
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
  }

  async function deleteProject(formData) {
    "use server";
    await db.project.delete({ where: { id: parseInt(formData.get("id")) } });
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
  }

  return (
    <div>
      <h2 className="mb-4">Manage Projects</h2>

      {/* Add New Project Form */}
      <div className="card mb-4">
        <h3 className="mb-3">Add New Project</h3>
        <form action={createProject}>
          <div className="grid-2">
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Project Title *</label>
              <input type="text" name="title" className="form-input" required placeholder="e.g. MRI Blur Detector" />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Description</label>
              <textarea name="description" className="form-textarea" rows={4} placeholder="Describe what this project does, the tech used, and its impact..." />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">
                Project Image Path
                <span style={{ fontWeight: 400, color: 'var(--text-secondary)', marginLeft: '0.5rem', fontSize: '0.85rem' }}>
                  (e.g. /uploads/my-project.png — upload the file to public/uploads/ first)
                </span>
              </label>
              <input
                type="text"
                name="image"
                className="form-input"
                placeholder="/uploads/project-name.png"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }}>
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub Link
              </label>
              <input type="url" name="githubLink" className="form-input" placeholder="https://github.com/username/repo" />
            </div>

            <div className="form-group">
              <label className="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="red" style={{ marginRight: '0.4rem', verticalAlign: 'middle' }}>
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube Link
              </label>
              <input type="url" name="youtubeLink" className="form-input" placeholder="https://youtube.com/watch?v=..." />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <label className="form-label">Other / Demo Link (optional)</label>
              <input type="url" name="link" className="form-input" placeholder="https://demo-site.com" />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: '0.5rem' }}>
            ➕ Add Project
          </button>
        </form>
      </div>

      {/* Existing Projects */}
      <div className="card">
        <h3 className="mb-3">Existing Projects ({projects.length})</h3>
        {projects.length === 0 ? (
          <p className="text-secondary" style={{ textAlign: 'center', padding: '2rem' }}>No projects yet. Add one above.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start',
                padding: '1rem',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                background: 'var(--bg-secondary)',
              }}>
                {/* Thumbnail */}
                <div style={{
                  width: '80px',
                  height: '60px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: 'linear-gradient(135deg,#1e3a8a,#0f172a)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {proj.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>No img</span>
                  )}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <strong style={{ fontSize: '1rem', color: 'var(--primary)', display: 'block' }}>{proj.title}</strong>
                  {proj.description && (
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0.25rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {proj.description}
                    </p>
                  )}
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
                    {proj.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#0f172a', fontWeight: 600 }}>
                        🔗 GitHub
                      </a>
                    )}
                    {proj.youtubeLink && (
                      <a href={proj.youtubeLink} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: '#ff0000', fontWeight: 600 }}>
                        ▶ YouTube
                      </a>
                    )}
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>
                        🌐 Demo
                      </a>
                    )}
                  </div>
                </div>

                {/* Delete */}
                <form action={deleteProject} style={{ flexShrink: 0 }}>
                  <input type="hidden" name="id" value={proj.id} />
                  <button
                    type="submit"
                    className="btn btn-danger"
                    style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                    onClick={(e) => { if (!confirm('Delete this project?')) e.preventDefault(); }}
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
