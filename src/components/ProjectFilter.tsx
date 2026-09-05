"use client";

import React, { useState } from "react";
import SpotlightCard from "./SpotlightCard";
import ScrollReveal from "./ScrollReveal";

interface ProjectItem {
  id: string;
  title: string;
  href: string;
  tags: string[];
  tagBadges: Array<{ text: string; hot?: boolean }>;
  problem?: string;
  solution?: string;
  description?: string;
  stack: string;
  stats?: Array<{ v: string; k: string }>;
  glyph: string;
  fileLabel: string;
  demoBtnText?: string;
  sourceUrl?: string;
}

const projectsData: ProjectItem[] = [
  {
    id: "invoice-gen",
    title: "AI Invoice Generator & Management",
    href: "https://invoicegen.abhijeetrana.com",
    tags: ["fullstack", "backend", "ai"],
    tagBadges: [
      { text: "production", hot: true },
      { text: "2024" },
      { text: "mern" },
      { text: "ai / ml" },
    ],
    problem:
      "finance teams losing 12+ hrs/week to manual invoice processing; off-the-shelf OCR below 60% accuracy.",
    solution:
      "hybrid pipeline: GPT-4 Vision extraction → Tesseract fallback → deterministic validation. SQS + Lambda for burst handling.",
    description:
      "End-to-end platform that extracts invoices from email & PDF via GPT-4 with OCR fallback, automates reminders, and surfaces business insights.",
    stack: "Node.js · React · MongoDB · AWS Lambda · SQS · OpenAI",
    stats: [
      { v: "10k+", k: "invoices / month" },
      { v: "99.9%", k: "uptime" },
      { v: "−67%", k: "manual effort" },
    ],
    glyph: "AI",
    fileLabel: "invoice.gen — 2024",
    demoBtnText: "live demo",
    sourceUrl: "https://github.com/AbhijeetDotexe/FrontendInvoice",
  },
  {
    id: "serverless-flow",
    title: "ServerlessFlow — AWS Lambda alternative",
    href: "https://serverless.abhijeetrana.com",
    tags: ["backend", "infra", "oss"],
    tagBadges: [
      { text: "open source", hot: true },
      { text: "2024" },
      { text: "serverless" },
      { text: "infra" },
    ],
    problem:
      "vendor lock-in and opaque pricing in commercial serverless; teams needed self-hosted, predictable-cost FaaS.",
    solution:
      "OpenWhisk orchestrator + container pool with pre-warming; scheduler prioritizes reuse over creation; cgroup-isolated execution.",
    description:
      "Self-hosted FaaS platform on OpenWhisk + Docker. Custom runtimes, container pooling with pre-warming, auto-scaling to 100+ concurrent functions.",
    stack: "OpenWhisk · Docker · Kubernetes · Go · Prometheus",
    stats: [
      { v: "<200ms", k: "cold start" },
      { v: "100+", k: "concurrency" },
      { v: "85%", k: "container reuse" },
    ],
    glyph: "λ",
    fileLabel: "serverless.flow — 2024",
    demoBtnText: "try deploying",
    sourceUrl: "https://github.com/AbhijeetDotexe/frontendServerless",
  },
  {
    id: "github-archive",
    title: "Everything else lives on GitHub",
    href: "https://github.com/abhijeetdotexe",
    tags: ["fullstack", "backend", "ai", "infra", "oss"],
    tagBadges: [{ text: "more" }, { text: "experiments" }, { text: "oss" }],
    description:
      "CLI tools, infrastructure scripts, OSS contributions, and experiments in Rust & edge compute. The archive tells the fuller story.",
    stack: "Rust · Go · Python · TypeScript · Docker",
    glyph: "∞",
    fileLabel: "the archive",
    demoBtnText: "github.com/abhijeetdotexe",
  },
];

const categories = [
  { id: "all", label: "all" },
  { id: "fullstack", label: "full-stack" },
  { id: "backend", label: "backend" },
  { id: "ai", label: "ai / ml" },
  { id: "infra", label: "infra" },
  { id: "oss", label: "open source" },
];

export default function ProjectFilter() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = projectsData.filter(
    (p) => activeFilter === "all" || p.tags.includes(activeFilter)
  );

  return (
    <>
      <ScrollReveal className="chips" style={{ marginTop: "36px" }}>
        {categories.map((c) => (
          <button
            key={c.id}
            className={`chip ${activeFilter === c.id ? "active" : ""}`}
            onClick={() => setActiveFilter(c.id)}
          >
            {c.label}
          </button>
        ))}
      </ScrollReveal>

      <section style={{ paddingTop: "24px" }}>
        <div className="container work-stack">
          {filteredProjects.map((p, idx) => (
            <a
              key={p.id}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <ScrollReveal delay={`${idx * 0.1}s`}>
                <SpotlightCard className="work-card pop">
                  <div className="work-grid">
                    <div className="work-body">
                      <div className="tags">
                        {p.tagBadges.map((tb, i) => (
                          <span
                            key={i}
                            className={`tag ${tb.hot ? "hot" : ""}`}
                          >
                            {tb.text}
                          </span>
                        ))}
                      </div>
                      <h3>{p.title}</h3>
                      {p.problem && (
                        <p>
                          <strong style={{ color: "var(--text)" }}>Problem</strong>{" "}
                          — {p.problem}
                        </p>
                      )}
                      {p.solution && (
                        <p style={{ marginTop: "10px" }}>
                          <strong style={{ color: "var(--text)" }}>Solution</strong>{" "}
                          — {p.solution}
                        </p>
                      )}
                      {!p.problem && p.description && <p>{p.description}</p>}
                      <div className="stack-line">
                        {p.stack.split(" · ").map((tech, i, arr) => (
                          <React.Fragment key={i}>
                            <b>{tech}</b>
                            {i < arr.length - 1 ? " · " : ""}
                          </React.Fragment>
                        ))}
                      </div>
                      {p.stats && (
                        <div className="stat-row">
                          {p.stats.map((st, i) => (
                            <div key={i} className="stat">
                              <div className="v">{st.v}</div>
                              <div className="k">{st.k}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="work-links">
                        <span className="btn btn-primary btn-sm">
                          {p.demoBtnText || "live demo"}{" "}
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          >
                            <path d="M7 17 17 7m-8 0h8v8" />
                          </svg>
                        </span>
                        {p.sourceUrl && (
                          <span
                            className="btn btn-ghost btn-sm"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open(p.sourceUrl, "_blank");
                            }}
                          >
                            source
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="work-media">
                      <span className="glyph">{p.glyph}</span>
                      <span className="file">{p.fileLabel}</span>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
