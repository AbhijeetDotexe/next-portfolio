"use client";

import React, { useLayoutEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

function supportsViewTimeline() {
  return typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()");
}

export default function ScrollReveal({
  children,
  className = "",
  delay,
  style = {},
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || supportsViewTimeline()) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveal = () => el.classList.add("in");

    if (reduced) {
      reveal();
      return;
    }

    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      reveal();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const combinedStyle: React.CSSProperties = {
    ...(delay ? ({ "--d": delay } as React.CSSProperties) : {}),
    ...style,
  };

  return (
    <div ref={ref} data-reveal className={className} style={combinedStyle}>
      {children}
    </div>
  );
}
