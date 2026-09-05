"use client";

import React, { useState } from "react";
import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticBtn from "@/components/MagneticBtn";
import SpotlightCard from "@/components/SpotlightCard";
import TerminalCard from "@/components/TerminalCard";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import GithubGraph from "@/components/GithubGraph";
import ISTClock from "@/components/ISTClock";
import BlogModal, { BlogPost } from "@/components/BlogModal";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function Home() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <ScrambleText text="full-stack engineer · 2+ years" />
            <h1 className="h1">
              <span className="line">
                <span style={{ "--d": ".1s" } as React.CSSProperties}>
                  I build <em>resilient</em>
                </span>
              </span>
              <span className="line">
                <span style={{ "--d": ".22s" } as React.CSSProperties}>
                  backend systems &
                </span>
              </span>
              <span className="line">
                <span style={{ "--d": ".34s" } as React.CSSProperties}>
                  <em>delightful</em> frontends.
                </span>
              </span>
            </h1>
            <ScrollReveal>
              <p className="lead">
                Currently architecting AI-powered invoice automation and an
                open-source serverless platform — with Node.js, React,
                TypeScript and AWS.
              </p>
            </ScrollReveal>
            <ScrollReveal delay=".12s" className="hero-cta">
              <MagneticBtn href="/projects" className="btn btn-primary">
                view selected work
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </MagneticBtn>
              <MagneticBtn href="/contact" className="btn btn-ghost">
                get in touch
              </MagneticBtn>
            </ScrollReveal>
            <ScrollReveal delay=".24s" className="hero-meta mono">
              <span className="status">
                <i></i>open to opportunities
              </span>
              <span>·</span>
              <span>
                <ISTClock /> ist
              </span>
            </ScrollReveal>
          </div>

          <ScrollReveal delay=".3s" className="hero-visual">
            <TerminalCard />
            <div className="card float-badge">
              <span className="num">99.9%</span>
              <span className="lbl">
                uptime across
                <br />
                production systems
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee />

      {/* METRICS */}
      <section>
        <div className="container">
          <ScrollReveal className="metrics-grid">
            <div className="metric">
              <span className="metric-num">
                <Counter end={2} suffix="+" />
              </span>
              <p>years shipping</p>
            </div>
            <div className="metric">
              <span className="metric-num">
                <Counter end={12} />
              </span>
              <p>production apps</p>
            </div>
            <div className="metric">
              <span className="metric-num">
                <Counter end={99.9} decimals={1} suffix="%" />
              </span>
              <p>uptime maintained</p>
            </div>
            <div className="metric">
              <span className="metric-num">
                <Counter end={200} prefix="<" />
              </span>
              <p>ms cold starts</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section>
        <div className="container">
          <ScrollReveal className="sec-head">
            <span className="sec-index mono">01</span>
            <h2 className="sec-title">selected work</h2>
            <span className="sec-rule"></span>
            <Link href="/projects" className="sec-link mono">
              all projects →
            </Link>
          </ScrollReveal>

          <div className="work-stack">
            <a
              href="https://invoicegen.abhijeetrana.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <ScrollReveal>
                <SpotlightCard className="work-card">
                  <div className="work-grid">
                    <div className="work-body">
                      <div className="tags">
                        <span className="tag hot">production</span>
                        <span className="tag">mern</span>
                        <span className="tag">ai / ml</span>
                      </div>
                      <h3>AI Invoice Generator & Management</h3>
                      <p>
                        End-to-end platform that extracts invoices from email &
                        PDF via GPT-4 with OCR fallback, automates reminders, and
                        surfaces business insights.
                      </p>
                      <div className="stack-line">
                        <b>Node.js</b> · <b>React</b> · <b>MongoDB</b> ·{" "}
                        <b>AWS Lambda</b> · <b>SQS</b> · <b>OpenAI</b>
                      </div>
                      <div className="stat-row">
                        <div className="stat">
                          <div className="v">10k+</div>
                          <div className="k">invoices / month</div>
                        </div>
                        <div className="stat">
                          <div className="v">99.9%</div>
                          <div className="k">uptime</div>
                        </div>
                        <div className="stat">
                          <div className="v">−67%</div>
                          <div className="k">manual effort</div>
                        </div>
                      </div>
                      <div className="work-links">
                        <span className="btn btn-primary btn-sm">
                          live demo{" "}
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
                        <span className="btn btn-ghost btn-sm">source</span>
                      </div>
                    </div>
                    <div className="work-media">
                      <span className="glyph">AI</span>
                      <span className="file">invoice.gen — 2024</span>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            </a>

            <a
              href="https://serverless.abhijeetrana.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <ScrollReveal>
                <SpotlightCard className="work-card">
                  <div className="work-grid">
                    <div className="work-body">
                      <div className="tags">
                        <span className="tag hot">open source</span>
                        <span className="tag">serverless</span>
                        <span className="tag">infra</span>
                      </div>
                      <h3>ServerlessFlow — AWS Lambda alternative</h3>
                      <p>
                        Self-hosted FaaS platform on OpenWhisk + Docker. Custom
                        runtimes, container pooling with pre-warming, auto-scaling
                        to 100+ concurrent functions.
                      </p>
                      <div className="stack-line">
                        <b>OpenWhisk</b> · <b>Docker</b> · <b>Kubernetes</b> ·{" "}
                        <b>Go</b> · <b>Prometheus</b>
                      </div>
                      <div className="stat-row">
                        <div className="stat">
                          <div className="v">&lt;200ms</div>
                          <div className="k">cold start</div>
                        </div>
                        <div className="stat">
                          <div className="v">100+</div>
                          <div className="k">concurrency</div>
                        </div>
                        <div className="stat">
                          <div className="v">85%</div>
                          <div className="k">container reuse</div>
                        </div>
                      </div>
                      <div className="work-links">
                        <span className="btn btn-primary btn-sm">
                          try deploying{" "}
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
                        <span className="btn btn-ghost btn-sm">source</span>
                      </div>
                    </div>
                    <div className="work-media">
                      <span className="glyph">λ</span>
                      <span className="file">serverless.flow — 2024</span>
                    </div>
                  </div>
                </SpotlightCard>
              </ScrollReveal>
            </a>
          </div>
        </div>
      </section>

      {/* NOW */}
      <section>
        <div className="container">
          <ScrollReveal className="sec-head">
            <span className="sec-index mono">02</span>
            <h2 className="sec-title">right now</h2>
            <span className="sec-rule"></span>
          </ScrollReveal>
          <div className="now-grid">
            <ScrollReveal>
              <SpotlightCard className="now-col">
                <h4>
                  <i></i>building
                </h4>
                <ul>
                  <li>Scaling AI Invoice Gen past 10k invoices/month</li>
                  <li>ServerlessFlow v2 — custom runtimes & edge deploys</li>
                  <li>Writing on event-driven Node.js architectures</li>
                  <li>Exploring Rust for edge compute runtimes</li>
                </ul>
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay=".1s">
              <SpotlightCard className="now-col">
                <h4>
                  <i></i>shipping activity
                </h4>
                <GithubGraph />
              </SpotlightCard>
            </ScrollReveal>

            <ScrollReveal delay=".2s">
              <SpotlightCard className="now-col">
                <h4>
                  <i></i>beyond code
                </h4>
                <ul>
                  <li>
                    <strong>Reading</strong> — Designing Data-Intensive
                    Applications
                  </li>
                  <li>
                    <strong>Studying</strong> — distributed consensus & CRDTs
                  </li>
                  <li>
                    <strong>Based</strong> — remote, open to relocation
                  </li>
                  <li>
                    <strong>Fuel</strong> — chai, mostly
                  </li>
                </ul>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WRITING */}
      <section>
        <div className="container">
          <ScrollReveal className="sec-head">
            <span className="sec-index mono">03</span>
            <h2 className="sec-title">recent writing</h2>
            <span className="sec-rule"></span>
            <Link href="/blog" className="sec-link mono">
              all essays →
            </Link>
          </ScrollReveal>

          {BLOG_POSTS.slice(0, 3).map((post, idx) => (
            <ScrollReveal key={post.slug} delay={`${idx * 0.08}s`}>
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
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="container">
          <ScrollReveal>
            <div className="card cta-card">
              <p className="kicker mono" style={{ justifyContent: "center" }}>
                let&apos;s talk
              </p>
              <h2>
                Building something that
                <br />
                <em>needs to scale</em>?
              </h2>
              <p>
                Open to senior full-stack roles, contract engineering and technical
                advisory. Currently booking Q3 2026.
              </p>
              <div
                className="hero-cta"
                style={{ justifyContent: "center", marginTop: 0 }}
              >
                <MagneticBtn
                  href="mailto:abhijeet4rana@gmail.com"
                  className="btn btn-primary"
                >
                  abhijeet4rana@gmail.com
                </MagneticBtn>
                <MagneticBtn href="/contact" className="btn btn-ghost">
                  more ways →
                </MagneticBtn>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Blog Article Modal */}
      <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </main>
  );
}
