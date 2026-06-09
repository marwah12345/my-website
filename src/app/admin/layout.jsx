import { verifyAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { headers } from 'next/headers';

export default async function AdminLayout({ children }) {
  const headersList = await headers();
  const pathname = headersList.get('x-invoke-path') || '';
  
  // Login page doesn't need auth check in layout
  const isAuth = await verifyAuth();
  
  // We can't easily get pathname in Server Layout natively without middleware, 
  // but we can check if it's the login page child by a hack or just rely on the pages themselves.
  // Actually, wait, it's better to verify auth inside the pages or a wrapped component.
  // We will pass the isAuth state. 
  
  if (!isAuth) {
    // If not authenticated, we only render children (which is the login page ideally)
    return <>{children}</>;
  }

  return (
    <div className="admin-layout">
      <div className="admin-sidebar">
        <h2 className="mb-4" style={{padding: '0 1.5rem'}}>Admin Panel</h2>
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/papers">Papers & Books</Link>
        <Link href="/admin/education">Education & Certs</Link>
        <Link href="/admin/projects">Projects</Link>
        <Link href="/admin/experience">Experience</Link>
        <Link href="/admin/blog">Blog Posts</Link>
        <Link href="/admin/comments">Comments</Link>
        <Link href="/" style={{marginTop: '2rem', color: 'var(--accent)'}}>&larr; Back to Site</Link>
      </div>
      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}
