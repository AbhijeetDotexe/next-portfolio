"use client";

import React, { useEffect, useState } from "react";

const CH = "#@/\\<>[]{}=+*^?!";

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export default function ScrambleText({ text, className = "" }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let frame = 0;
    let animId: number;

    const tick = () => {
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const c = text[i];
        out +=
          c === " "
            ? " "
            : frame >= i * 2 + 8
            ? c
            : CH[Math.floor(Math.random() * CH.length)];
      }
      setDisplayText(out);

      if (frame++ < text.length * 2 + 20) {
        animId = requestAnimationFrame(tick);
      } else {
        setDisplayText(text);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [text]);

  return <p className={`kicker mono ${className}`}>{displayText}</p>;
}
