"use client";

import React, { useEffect, useRef } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

export default function ScrollReveal({
  children,
  className = "",
  delay,
  style = {},
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
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
