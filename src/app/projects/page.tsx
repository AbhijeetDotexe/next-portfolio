import type { Metadata } from "next";
import ScrambleText from "@/components/ScrambleText";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectFilter from "@/components/ProjectFilter";
import MagneticBtn from "@/components/MagneticBtn";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Case studies of production systems: AI invoice automation, serverless FaaS, and the rest of the archive.",
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  return (
    <main>
      <section className="hero" style={{ paddingBottom: "48px" }}>
        <div className="container">
          <ScrambleText text="selected work · 2022 — 2026" />
          <h1 className="h1">
            <span className="line">
              <span style={{ "--d": ".1s" } as React.CSSProperties}>
                Production systems,
              </span>
            </span>
            <span className="line">
              <span style={{ "--d": ".22s" } as React.CSSProperties}>
                <em>shipped</em> & measured.
              </span>
            </span>
          </h1>
          <ScrollReveal>
            <p className="lead">
              Every project below runs in production. Problem → solution →
              measurable outcome, with the architecture decisions that mattered.
            </p>
          </ScrollReveal>

          <ProjectFilter />
        </div>
      </section>

      <section>
        <div className="container">
          <ScrollReveal>
            <div className="card cta-card">
              <p className="kicker mono" style={{ justifyContent: "center" }}>
                next
              </p>
              <h2>
                Need a system like <em>these</em>?
              </h2>
              <p>
                Tell me what you&apos;re building — I&apos;ll tell you honestly whether I
                can help.
              </p>
              <div
                className="hero-cta"
                style={{ justifyContent: "center", marginTop: 0 }}
              >
                <MagneticBtn href="/contact" className="btn btn-primary">
                  start a conversation
                </MagneticBtn>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
