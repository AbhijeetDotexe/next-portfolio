"use client";

import React, { useRef } from "react";
import Link from "next/link";

interface MagneticBtnProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
}

export default function MagneticBtn({
  children,
  className = "",
  href,
  onClick,
  type = "button",
  target,
  rel,
  style,
}: MagneticBtnProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) return;

    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.18;
    const y = (e.clientY - r.top - r.height / 2) * 0.3;
    ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = "";
    }
  };

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto");
    if (isExternal) {
      return (
        <span
          ref={ref}
          style={{ display: "inline-flex", ...style }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <a
            href={href}
            className={className}
            onClick={onClick}
            target={target}
            rel={rel}
          >
            {children}
          </a>
        </span>
      );
    }
    return (
      <span
        ref={ref}
        style={{ display: "inline-flex", ...style }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={href} className={className} onClick={onClick}>
          {children}
        </Link>
      </span>
    );
  }

  return (
    <span
      ref={ref}
      style={{ display: "inline-flex", ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <button type={type} className={className} onClick={onClick}>
        {children}
      </button>
    </span>
  );
}
