"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme") || "light";
    const timer = setTimeout(() => setTheme(currentTheme), 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    root.classList.add("theming");
    const nextTheme = theme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
    setTheme(nextTheme);

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute(
        "content",
        getComputedStyle(root).getPropertyValue("--bg").trim()
      );
    }

    setTimeout(() => {
      root.classList.remove("theming");
    }, 450);
  };

  return (
    <button
      id="themeToggle"
      className="icon-btn"
      aria-label="Toggle theme"
      onClick={toggleTheme}
    >
      <svg
        className="sun"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4" />
      </svg>
      <svg
        className="moon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
    </button>
  );
}
