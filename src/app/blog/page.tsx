import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";
import PostCard from "@/components/PostCard";
import BlogSubscribe from "@/components/BlogSubscribe";
import BlogIndexJsonLd from "@/components/BlogIndexJsonLd";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on queues, invoice extraction, self-hosted functions, replayable workers, and production observability.",
  keywords: [
    "software architecture",
    "AWS SQS",
    "serverless",
    "document AI",
    "observability",
    "Node.js",
  ],
  alternates: { canonical: "/blog" },
  openGraph: {
    title: `Writing · ${SITE.name}`,
    description:
      "Architecture notes from systems that ship — ingest vs process, model output vs facts, workers that survive retries.",
    url: `${SITE.url}/blog`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Writing · ${SITE.name}`,
    description:
      "Architecture notes from systems that ship — ingest vs process, model output vs facts, workers that survive retries.",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main>
      <BlogIndexJsonLd />
      <section className="hero" style={{ paddingBottom: "32px" }}>
        <div className="container">
          <ScrambleText text="writing · 2025 — 2026" />
          <h1 className="h1">
            <span className="line">
              <span style={{ "--d": ".1s" } as CSSProperties}>
                Thinking
              </span>
            </span>
            <span className="line">
              <span style={{ "--d": ".22s" } as CSSProperties}>
                out <em>loud</em>.
              </span>
            </span>
          </h1>
          <ScrollReveal>
            <p className="lead">
              Architecture notes from systems I actually ship — ingest vs
              process, model output vs facts, and workers that survive retries.
            </p>
          </ScrollReveal>
          <p
            className="mono"
            style={{ marginTop: "20px", color: "var(--faint)", fontSize: ".75rem" }}
          >
            <Link href="/feed.xml" style={{ color: "var(--accent)" }}>
              RSS feed
            </Link>
            {" · "}
            {posts.length} essays
          </p>
        </div>
      </section>

      <section style={{ paddingTop: "8px", paddingBottom: "24px" }}>
        <div className="container">
          {featured && (
            <div className="post-card-grid featured-grid">
              <PostCard post={featured} featured />
            </div>
          )}

          <div className="post-card-grid" style={{ marginTop: "28px" }}>
            {rest.map((post, idx) => (
              <PostCard key={post.slug} post={post} delay={`${idx * 0.05}s`} />
            ))}
          </div>

          <ScrollReveal>
            <SpotlightCard style={{ padding: "44px", marginTop: "56px" }}>
              <p className="kicker mono">new essays</p>
              <h2 className="sec-title" style={{ margin: "14px 0 8px" }}>
                A note when I publish.{" "}
                <em style={{ color: "var(--accent)" }}>No drip campaign.</em>
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: ".92rem",
                  marginBottom: "26px",
                }}
              >
                This sends your address to me — the same inbox as{" "}
                <a href={`mailto:${SITE.email}`} style={{ color: "var(--accent)" }}>
                  {SITE.email}
                </a>
                . I won&apos;t sell it. You can also use the RSS feed.
              </p>
              <BlogSubscribe />
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
