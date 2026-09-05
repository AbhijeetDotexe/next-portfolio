"use client";

import React, { useEffect, useRef, useState } from "react";

interface CounterProps {
  end: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function Counter({
  end,
  decimals,
  prefix = "",
  suffix = "",
  className = "",
}: CounterProps) {
  const [val, setVal] = useState<string>("0");
  const ref = useRef<HTMLSpanElement>(null);

  const dec =
    decimals !== undefined
      ? decimals
      : end.toString().includes(".")
      ? 1
      : 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);

          if (reduced) {
            setVal(end.toFixed(dec));
            return;
          }

          const t0 = performance.now();
          const step = (t: number) => {
            const p = Math.min(1, (t - t0) / 1500);
            const ease = 1 - Math.pow(1 - p, 3);
            setVal((end * ease).toFixed(dec));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, dec]);

  return (
    <span ref={ref} className={className}>
      {prefix && <b>{prefix}</b>}
      {val}
      {suffix && <b>{suffix}</b>}
    </span>
  );
}
