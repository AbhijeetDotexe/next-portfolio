import type { Metadata } from "next";
import Link from "next/link";
import ScrambleText from "@/components/ScrambleText";
import ScrollReveal from "@/components/ScrollReveal";
import SpotlightCard from "@/components/SpotlightCard";
import ISTClock from "@/components/ISTClock";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Open to full-stack roles, contract engineering, and technical advisory. Replies within 24 hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <ScrambleText text="contact · replies within 24h" />
            <h1 className="h1">
              <span className="line">
                <span style={{ "--d": ".1s" } as React.CSSProperties}>
                  Let&apos;s build
                </span>
              </span>
              <span className="line">
                <span style={{ "--d": ".22s" } as React.CSSProperties}>
                  something that
                </span>
              </span>
              <span className="line">
                <span style={{ "--d": ".34s" } as React.CSSProperties}>
                  <em>matters</em>.
                </span>
              </span>
            </h1>
            <ScrollReveal>
              <p className="lead">
                Open to full-stack roles, contract engineering and technical
                advisory. Remote-first, open to relocation (US / EU / UK).
              </p>
            </ScrollReveal>

            <ScrollReveal style={{ marginTop: "40px" }}>
              <a href={`mailto:${SITE.email}`} className="card contact-card">
                <span className="ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" />
                  </svg>
                </span>
                <span>
                  <span className="k">email</span>
                  <br />
                  <span className="v">{SITE.email}</span>
                </span>
                <span className="go">→</span>
              </a>
              <a
                href={SITE.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card contact-card"
              >
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45z" />
                  </svg>
                </span>
                <span>
                  <span className="k">linkedin</span>
                  <br />
                  <span className="v">/in/abhijeetrana</span>
                </span>
                <span className="go">↗</span>
              </a>
              <Link href="/resume" className="card contact-card">
                <span className="ic">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
                  </svg>
                </span>
                <span>
                  <span className="k">résumé</span>
                  <br />
                  <span className="v">print or save PDF</span>
                </span>
                <span className="go">→</span>
              </Link>
              <a
                href={SITE.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="card contact-card"
              >
                <span className="ic">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.65.5.5 5.66.5 12.02c0 5.09 3.29 9.41 7.86 10.94.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.35-3.87-1.35-.52-1.34-1.27-1.69-1.27-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.13 1.18a10.8 10.8 0 0 1 5.7 0c2.16-1.49 3.12-1.18 3.12-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.39-5.25 5.67.41.35.77 1.05.77 2.12 0 1.53-.01 2.75-.01 3.13 0 .31.21.68.8.56 4.56-1.53 7.84-5.85 7.84-10.93C23.5 5.66 18.35.5 12 .5Z" />
                  </svg>
                </span>
                <span>
                  <span className="k">github</span>
                  <br />
                  <span className="v">@{SITE.githubUser}</span>
                </span>
                <span className="go">↗</span>
              </a>
            </ScrollReveal>

            <ScrollReveal delay=".15s" className="hero-meta mono">
              <span className="status">
                <i></i>open to opportunities
              </span>
              <span>·</span>
              <span>
                <ISTClock /> ist
              </span>
            </ScrollReveal>
          </div>

          <ScrollReveal delay=".15s">
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>

      <section>
        <div className="container">
          <ScrollReveal className="sec-head">
            <span className="sec-index mono">02</span>
            <h2 className="sec-title">what I&apos;m looking for</h2>
            <span className="sec-rule"></span>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px",
            }}
          >
            <ScrollReveal>
              <SpotlightCard style={{ padding: "32px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                  }}
                >
                  impactful work
                </h3>
                <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.7 }}>
                  Systems that scale, solve real problems, and ship to real users. Not
                  feature factories.
                </p>
              </SpotlightCard>
            </ScrollReveal>
            <ScrollReveal delay=".08s">
              <SpotlightCard style={{ padding: "32px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                  }}
                >
                  strong teams
                </h3>
                <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.7 }}>
                  Engineering cultures that value craft, psychological safety, and
                  thoughtful technical leadership.
                </p>
              </SpotlightCard>
            </ScrollReveal>
            <ScrollReveal delay=".16s">
              <SpotlightCard style={{ padding: "32px" }}>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.5rem",
                    marginBottom: "10px",
                  }}
                >
                  remote or relocation
                </h3>
                <p style={{ color: "var(--muted)", fontSize: ".88rem", lineHeight: 1.7 }}>
                  Happy to work remotely or relocate for the right opportunity. Flexible
                  on timezone overlap.
                </p>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
