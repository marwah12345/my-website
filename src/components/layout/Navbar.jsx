"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import "./navbar.css";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="navbar-header">
      <div className="container flex items-center justify-between navbar-container">
        <Link href="/" className="logo" onClick={closeMenu}>
          Dr. Marwah
        </Link>
        
        {/* Hamburger Button */}
        <button 
          type="button"
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav id="primary-navigation" className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link href="/" className={pathname === "/" ? "active" : ""} onClick={closeMenu}>
            Home
          </Link>
          <Link href="/papers" className={pathname.startsWith("/papers") ? "active" : ""} onClick={closeMenu}>
            Papers
          </Link>
          <Link href="/books" className={pathname.startsWith("/books") ? "active" : ""} onClick={closeMenu}>
            Books
          </Link>
          <Link href="/projects" className={pathname.startsWith("/projects") ? "active" : ""} onClick={closeMenu}>
            Projects
          </Link>
          <Link href="/experience" className={pathname.startsWith("/experience") ? "active" : ""} onClick={closeMenu}>
            Experience
          </Link>
          <Link href="/certificates" className={pathname.startsWith("/certificates") ? "active" : ""} onClick={closeMenu}>
            Certificates
          </Link>
          <Link href="/blog" className={pathname.startsWith("/blog") ? "active" : ""} onClick={closeMenu}>
            Blog
          </Link>
        </nav>
      </div>
    </header>
  );
}
