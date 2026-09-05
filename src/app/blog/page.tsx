"use client";

import React, { useState } from "react";
import ScrambleText from "@/components/ScrambleText";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";
import MagneticBtn from "@/components/MagneticBtn";
import BlogModal, { BlogPost } from "@/components/BlogModal";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmail("");
      setTimeout(() => {
        setSubscribed(false);
      }, 3000);
    }, 600);
  };

  return (
    <main>
      <section className="hero" style={{ paddingBottom: "48px" }}>
        <div className="container">
          <ScrambleText text="writing · 2023 — 2026" />
          <h1 className="h1">
            <span className="line">
              <span style={{ "--d": ".1s" } as React.CSSProperties}>
                Thinking
              </span>
            </span>
            <span className="line">
              <span style={{ "--d": ".22s" } as React.CSSProperties}>
                out <em>loud</em>.
              </span>
            </span>
          </h1>
          <ScrollReveal>
            <p className="lead">
              Essays on the systems I build — architecture decisions, debugging
              war stories, and the craft of shipping production software.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section style={{ paddingTop: "24px" }}>
        <div className="container">
          {BLOG_POSTS.map((post, idx) => (
            <ScrollReveal key={post.slug} delay={`${idx * 0.05}s`}>
              <div
                className="post-row"
                onClick={() => setSelectedPost(post)}
                style={{ cursor: "pointer" }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedPost(post);
                  }
                }}
              >
                <span className="date">
                  {post.date} · {post.readTime}
                </span>
                <div>
                  <h3>{post.title}</h3>
                  <p>{post.summary}</p>
                </div>
                <span className="arrow">↗</span>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal>
            <SpotlightCard style={{ padding: "44px", marginTop: "56px" }}>
              <p className="kicker mono">newsletter</p>
              <h2 className="sec-title" style={{ margin: "14px 0 8px" }}>
                One essay a month. <em style={{ color: "var(--accent)" }}>No noise.</em>
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: ".92rem",
                  marginBottom: "26px",
                }}
              >
                No spam, no tracking. Unsubscribe with one click.
              </p>
              <form
                onSubmit={handleSubscribe}
                style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  style={{
                    flex: 1,
                    minWidth: "220px",
                    padding: "14px 18px",
                    borderRadius: "999px",
                    background: "var(--surface)",
                    border: "1px solid var(--border-strong)",
                    color: "var(--text)",
                    font: "inherit",
                    fontSize: ".9rem",
                  }}
                />
                <MagneticBtn type="submit" className="btn btn-primary">
                  {subscribed
                    ? "✓ subscribed"
                    : submitting
                    ? "subscribing..."
                    : "subscribe"}
                </MagneticBtn>
              </form>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </section>

      {/* Article Modal */}
      <BlogModal
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </main>
  );
}
