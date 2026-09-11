"use client";

import { useEffect, useState } from "react";

type Cell = { className: string };

export default function GithubGraph() {
  const [cells, setCells] = useState<Cell[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/github-contributions")
      .then((res) => {
        if (!res.ok) throw new Error("bad response");
        return res.json() as Promise<{ levels: number[] }>;
      })
      .then((data) => {
        if (cancelled) return;
        const levels = data.levels ?? [];
        setCells(
          levels.map((level) => {
            const cls =
              level >= 3 ? " gc c3" : level === 2 ? " gc c2" : level === 1 ? " gc c1" : " gc";
            return { className: cls.trim() };
          }),
        );
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (failed) {
    return (
      <p style={{ color: "var(--muted)", fontSize: "0.88rem" }}>
        Could not load the contribution graph. See{" "}
        <a
          href="https://github.com/abhijeetdotexe"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent)" }}
        >
          github.com/abhijeetdotexe
        </a>
        .
      </p>
    );
  }

  if (!cells) {
    return (
      <p className="mono" style={{ color: "var(--faint)", fontSize: "0.7rem" }}>
        loading activity…
      </p>
    );
  }

  return (
    <>
      <div className="gh-grid" role="img" aria-label="GitHub contributions, last 26 weeks">
        {cells.map((cell, idx) => (
          <i key={idx} className={cell.className} style={{ "--d": `${idx * 6}ms` } as React.CSSProperties} />
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
