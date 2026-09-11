import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticBtn from "@/components/MagneticBtn";
import SpotlightCard from "@/components/SpotlightCard";
import TerminalCard from "@/components/TerminalCard";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import dynamic from "next/dynamic";
import ISTClock from "@/components/ISTClock";
import WorkCard from "@/components/WorkCard";
import { featuredProjects } from "@/data/projects";
import { getAllPosts } from "@/lib/blog";
import { SITE } from "@/data/site";
import type { CSSProperties } from "react";
import type { Metadata } from "next";

const GithubGraph = dynamic(() => import("@/components/GithubGraph"));
const PostCard = dynamic(() => import("@/components/PostCard"));

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  const featured = featuredProjects();
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <ScrambleText text="full-stack engineer · 2+ years" />
            <h1 className="h1">
              <span className="line">
                <span style={{ "--d": ".1s" } as CSSProperties}>
                  I build <em>resilient</em>
                </span>
              </span>
              <span className="line">
                <span style={{ "--d": ".22s" } as CSSProperties}>
                  backend systems &
                </span>
              </span>
              <span className="line">
                <span style={{ "--d": ".34s" } as CSSProperties}>
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
              <MagneticBtn href="/resume" className="btn btn-ghost">
                résumé
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

      <Marquee />

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
            {featured.map((project) => (
              <WorkCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

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

          <div className="post-card-grid">
            {recentPosts.map((post, idx) => (
              <PostCard key={post.slug} post={post} delay={`${idx * 0.08}s`} />
            ))}
          </div>
        </div>
      </section>

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
                Open to full-stack roles, contract engineering and technical
                advisory. Currently booking Q3 2026.
              </p>
              <div
                className="hero-cta"
                style={{ justifyContent: "center", marginTop: 0 }}
              >
                <MagneticBtn
                  href={`mailto:${SITE.email}`}
                  className="btn btn-primary"
                >
                  {SITE.email}
                </MagneticBtn>
                <MagneticBtn href="/contact" className="btn btn-ghost">
                  more ways →
                </MagneticBtn>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
