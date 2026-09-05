"use client";

import React, { useEffect } from "react";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  summary: string;
  content: React.ReactNode;
}

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogModal({ post, onClose }: BlogModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (post) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.65)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        animation: "fadeIn 0.25s ease-out forwards",
      }}
    >
      <div
        className="modal-content card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "760px",
          maxHeight: "88vh",
          overflowY: "auto",
          background: "var(--bg-elevated, var(--bg))",
          border: "1px solid var(--border-strong)",
          borderRadius: "20px",
          padding: "36px",
          position: "relative",
          boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
          animation: "popIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        }}
      >
        {/* Sticky Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text)",
            cursor: "pointer",
            display: "grid",
            placeItems: "center",
            fontSize: "1.2rem",
            transition: "transform 0.2s ease, background 0.2s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "12px",
            }}
          >
            <span
              className="tag hot"
              style={{ fontSize: ".72rem", padding: "3px 10px" }}
            >
              {post.category}
            </span>
            <span className="mono" style={{ fontSize: ".8rem", color: "var(--muted)" }}>
              {post.date} · {post.readTime}
            </span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "2.2rem",
              lineHeight: 1.25,
              fontWeight: 400,
              color: "var(--text)",
              marginBottom: "16px",
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              paddingTop: "16px",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "var(--accent-soft)",
                color: "var(--accent)",
                display: "grid",
                placeItems: "center",
                fontWeight: 600,
                fontSize: ".85rem",
                fontFamily: "var(--font-mono)",
              }}
            >
              AR
            </div>
            <div>
              <div style={{ fontSize: ".9rem", fontWeight: 600, color: "var(--text)" }}>
                Abhijeet Rana
              </div>
              <div style={{ fontSize: ".78rem", color: "var(--muted)" }}>
                Full-Stack Engineer
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div
          className="article-body"
          style={{
            color: "var(--text)",
            fontSize: "1rem",
            lineHeight: 1.8,
          }}
        >
          {post.content}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            marginTop: "40px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="mono" style={{ fontSize: ".78rem", color: "var(--muted)" }}>
            Thanks for reading!
          </span>
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm"
            style={{ borderRadius: "999px" }}
          >
            close article →
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .article-body h2 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin: 28px 0 14px;
          color: var(--text);
        }
        .article-body p {
          margin-bottom: 18px;
          color: var(--muted);
        }
        .article-body blockquote {
          border-left: 3px solid var(--accent);
          padding-left: 18px;
          margin: 24px 0;
          font-style: italic;
          color: var(--text);
          background: var(--surface);
          padding: 16px 20px;
          border-radius: 0 12px 12px 0;
        }
        .article-body pre {
          background: var(--surface);
          border: 1px solid var(--border);
          padding: 18px;
          border-radius: 12px;
          font-family: var(--font-mono);
          font-size: .85rem;
          overflow-x: auto;
          margin: 20px 0;
        }
        .article-body ul {
          margin: 16px 0 20px 24px;
          color: var(--muted);
        }
        .article-body li {
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
}
