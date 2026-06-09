import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

export default async function AdminDashboard() {
  const isAuth = await verifyAuth();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const counts = {
    papers: await db.paper.count(),
    books: await db.book.count(),
    projects: await db.project.count(),
    blogs: await db.blogPost.count(),
    comments: await db.comment.count({ where: { approved: false } }) // pending comments
  };

  return (
    <div>
      <h1 className="mb-4">Dashboard Overview</h1>
      <div className="grid-3 mb-4">
        <div className="card text-center">
          <h3>Papers</h3>
          <p style={{fontSize: '2rem', color: 'var(--primary)', fontWeight: 'bold'}}>{counts.papers}</p>
        </div>
        <div className="card text-center">
          <h3>Books</h3>
          <p style={{fontSize: '2rem', color: 'var(--primary)', fontWeight: 'bold'}}>{counts.books}</p>
        </div>
        <div className="card text-center">
          <h3>Projects</h3>
          <p style={{fontSize: '2rem', color: 'var(--primary)', fontWeight: 'bold'}}>{counts.projects}</p>
        </div>
        <div className="card text-center">
          <h3>Blog Posts</h3>
          <p style={{fontSize: '2rem', color: 'var(--primary)', fontWeight: 'bold'}}>{counts.blogs}</p>
        </div>
        <div className="card text-center" style={{borderColor: counts.comments > 0 ? 'var(--accent)' : ''}}>
          <h3>Pending Comments</h3>
          <p style={{fontSize: '2rem', color: 'var(--accent)', fontWeight: 'bold'}}>{counts.comments}</p>
        </div>
      </div>
      
      <div className="card">
        <h3>Welcome to your Admin Panel</h3>
        <p className="text-secondary mt-2">
          Use the sidebar to navigate and manage your portfolio content. Changes you make here will be immediately reflected on the live public pages.
        </p>
      </div>
    </div>
  );
}
