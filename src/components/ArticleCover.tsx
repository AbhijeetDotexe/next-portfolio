import type { CSSProperties, ReactNode } from "react";
import type { BlogCover } from "@/content/blog";

const motifs: Record<BlogCover["motif"], ReactNode> = {
  queue: (
    <svg viewBox="0 0 520 280" className="cover-art" aria-hidden="true">
      <rect x="40" y="90" width="110" height="70" rx="14" />
      <rect x="190" y="90" width="110" height="70" rx="14" />
      <rect x="340" y="60" width="140" height="160" rx="18" />
      <path d="M150 125h40M300 125h40" />
    </svg>
  ),
  vision: (
    <svg viewBox="0 0 520 280" className="cover-art" aria-hidden="true">
      <circle cx="160" cy="140" r="58" />
      <circle cx="160" cy="140" r="22" />
      <rect x="280" y="70" width="180" height="140" rx="18" />
      <path d="M218 140h62" />
    </svg>
  ),
  pool: (
    <svg viewBox="0 0 520 280" className="cover-art" aria-hidden="true">
      <rect x="50" y="70" width="70" height="100" rx="12" />
      <rect x="140" y="70" width="70" height="100" rx="12" />
      <rect x="230" y="70" width="70" height="100" rx="12" />
      <rect x="340" y="90" width="140" height="80" rx="16" />
      <path d="M300 130h40" />
    </svg>
  ),
  ledger: (
    <svg viewBox="0 0 520 280" className="cover-art" aria-hidden="true">
      <rect x="60" y="60" width="120" height="160" rx="14" />
      <rect x="210" y="60" width="120" height="160" rx="14" />
      <rect x="360" y="60" width="120" height="160" rx="14" />
      <path d="M180 140h30M330 140h30" />
    </svg>
  ),
  signals: (
    <svg viewBox="0 0 520 280" className="cover-art" aria-hidden="true">
      <rect x="50" y="70" width="90" height="140" rx="14" />
      <rect x="160" y="70" width="90" height="140" rx="14" />
      <rect x="270" y="70" width="90" height="140" rx="14" />
      <rect x="380" y="70" width="90" height="140" rx="14" />
    </svg>
  ),
  mern: (
    <svg viewBox="0 0 520 280" className="cover-art" aria-hidden="true">
      <rect x="50" y="55" width="420" height="44" rx="12" />
      <rect x="50" y="115" width="420" height="44" rx="12" />
      <rect x="50" y="175" width="420" height="44" rx="12" />
      <circle cx="460" cy="140" r="28" />
      <path d="M442 140h36M460 122v36" />
    </svg>
  ),
};

export default function ArticleCover({
  cover,
  title,
}: {
  cover: BlogCover;
  title: string;
}) {
  return (
    <div
      className="article-cover"
      style={{ "--cover-accent": cover.accent } as CSSProperties}
      role="img"
      aria-label={`Cover illustration for ${title}`}
    >
      <div className="article-cover-glow" />
      <div className="article-cover-grid" />
      {motifs[cover.motif]}
      <span className="article-cover-label mono">{cover.label}</span>
    </div>
  );
}
