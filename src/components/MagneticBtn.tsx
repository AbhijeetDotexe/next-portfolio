"use client";

import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) return;

    let frame = 0;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let originX = 0;
    let originY = 0;
    let width = 0;
    let height = 0;

    const tick = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      el.style.transform = `translate3d(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - currentX) > 0.08 || Math.abs(targetY - currentY) > 0.08) {
        frame = requestAnimationFrame(tick);
      } else {
        frame = 0;
        if (targetX === 0 && targetY === 0) el.style.transform = "";
      }
    };

    const start = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const measure = () => {
      const rect = el.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      originX = rect.left + currentX * -1 + width / 2;
      originY = rect.top + currentY * -1 + height / 2;
    };

    const onEnter = () => {
      currentX = 0;
      currentY = 0;
      el.style.transform = "";
      const rect = el.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      originX = rect.left + width / 2;
      originY = rect.top + height / 2;
    };

    const onMove = (event: PointerEvent) => {
      if (!width) measure();
      targetX = (event.clientX - originX) * 0.16;
      targetY = (event.clientY - originY) * 0.22;
      start();
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      start();
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const wrapStyle: React.CSSProperties = { display: "inline-flex", ...style };

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto");
    if (isExternal) {
      return (
        <span ref={ref} style={wrapStyle}>
          <a href={href} className={className} onClick={onClick} target={target} rel={rel}>
            {children}
          </a>
        </span>
      );
    }
    return (
      <span ref={ref} style={wrapStyle}>
        <Link href={href} className={className} onClick={onClick}>
          {children}
        </Link>
      </span>
    );
  }

  return (
    <span ref={ref} style={wrapStyle}>
      <button type={type} className={className} onClick={onClick}>
        {children}
      </button>
    </span>
  );
}
