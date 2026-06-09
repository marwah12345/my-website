"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "./navbar.css";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar-header">
      <div className="container flex items-center justify-between navbar-container">
        <Link href="/" className="logo">
          Dr. Researcher
        </Link>
        <nav className="nav-links">
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link href="/papers" className={pathname.startsWith("/papers") ? "active" : ""}>
            Papers
          </Link>
          <Link href="/books" className={pathname.startsWith("/books") ? "active" : ""}>
            Books
          </Link>
          <Link href="/projects" className={pathname.startsWith("/projects") ? "active" : ""}>
            Projects
          </Link>
          <Link href="/experience" className={pathname.startsWith("/experience") ? "active" : ""}>
            Experience
          </Link>
          <Link href="/certificates" className={pathname.startsWith("/certificates") ? "active" : ""}>
            Certificates
          </Link>
          <Link href="/blog" className={pathname.startsWith("/blog") ? "active" : ""}>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
