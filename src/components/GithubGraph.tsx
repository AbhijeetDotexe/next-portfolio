"use client";

import React, { useEffect, useState } from "react";

interface Cell {
  className: string;
  delay: string;
}

export default function GithubGraph() {
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    const list: Cell[] = [];
    for (let i = 0; i < 26 * 7; i++) {
      const r = Math.random();
      const level = r > 0.86 ? " c3" : r > 0.68 ? " c2" : r > 0.45 ? " c1" : "";
      list.push({
        className: `gc${level}`,
        delay: `${i * 6}ms`,
      });
    }
    const timer = setTimeout(() => setCells(list), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="gh-grid">
        {cells.map((cell, idx) => (
          <i
            key={idx}
            className={cell.className}
            style={{ "--d": cell.delay } as React.CSSProperties}
          />
        ))}
      </div>
      <div className="legend">
        less <i className="gc"></i>
        <i className="gc c1"></i>
        <i className="gc c2"></i>
        <i className="gc c3"></i> more · last 26 weeks
      </div>
    </>
  );
}
