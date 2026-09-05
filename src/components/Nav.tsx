"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    const nextState = !menuOpen;
    setMenuOpen(nextState);
    document.body.style.overflow = nextState ? "hidden" : "";
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <nav className="nav-inner">
          <Link href="/" className="logo" onClick={closeMenu}>
            abhijeet rana<span className="dot">.</span>
          </Link>
          <div className="nav-links">
            <Link href="/" className={isActive("/") ? "active" : ""}>
              index
            </Link>
            <Link href="/projects" className={isActive("/projects") ? "active" : ""}>
              projects
            </Link>
            <Link href="/blog" className={isActive("/blog") ? "active" : ""}>
              writing
            </Link>
            <Link href="/contact" className={isActive("/contact") ? "active" : ""}>
              contact
            </Link>
          </div>
          <div className="nav-actions">
            <ThemeToggle />
            <Link href="/contact" className="btn btn-primary btn-sm">
              let&apos;s talk
            </Link>
            <button
              id="menuBtn"
              className={`icon-btn menu-btn ${menuOpen ? "open" : ""}`}
              aria-label="Menu"
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </nav>
      </header>

      <div className={`mobile-menu ${menuOpen ? "open" : ""}`} id="mobileMenu">
        <Link
          href="/"
          className={isActive("/") ? "active" : ""}
          onClick={closeMenu}
        >
          index<em>.</em>
        </Link>
        <Link
          href="/projects"
          className={isActive("/projects") ? "active" : ""}
          onClick={closeMenu}
        >
          projects<em>.</em>
        </Link>
        <Link
          href="/blog"
          className={isActive("/blog") ? "active" : ""}
          onClick={closeMenu}
        >
          writing<em>.</em>
        </Link>
        <Link
          href="/contact"
          className={isActive("/contact") ? "active" : ""}
          onClick={closeMenu}
        >
          contact<em>.</em>
        </Link>
      </div>
    </>
  );
}
