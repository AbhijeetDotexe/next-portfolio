import type { Metadata } from "next";
import Link from "next/link";
import MagneticBtn from "@/components/MagneticBtn";
import PrintButton from "@/components/PrintButton";
import { RESUME } from "@/data/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description: `${RESUME.title} — ${RESUME.summary.slice(0, 140)}…`,
  alternates: { canonical: "/resume" },
  robots: { index: true, follow: true },
};

export default function ResumePage() {
  return (
    <main className="resume-page">
      <div className="container resume-wrap">
        <div className="resume-actions no-print">
          <MagneticBtn href="/contact" className="btn btn-primary btn-sm">
            contact me
          </MagneticBtn>
          <PrintButton>print / save PDF</PrintButton>
        </div>

        <header className="resume-header">
          <div className="resume-badge no-print">
            <span className="live-dot" />
            <span>Open to Senior & Full-Stack Opportunities</span>
          </div>
          <h1>{RESUME.name}</h1>
          <p className="resume-title">
            {RESUME.title} <span className="resume-sub-title">· {RESUME.subtitle}</span>
          </p>
          <div className="resume-contact">
            <a href={`mailto:${RESUME.email}`}>{RESUME.email}</a>
            <span className="sep">·</span>
            <span>{RESUME.location}</span>
            <span className="sep">·</span>
            <a href={RESUME.links.site} target="_blank" rel="noopener noreferrer">
              {RESUME.links.site.replace("https://", "")}
            </a>
            <span className="sep">·</span>
            <a href={RESUME.links.github} target="_blank" rel="noopener noreferrer">
              github
            </a>
            <span className="sep">·</span>
            <a href={RESUME.links.linkedin} target="_blank" rel="noopener noreferrer">
              linkedin
            </a>
          </div>
        </header>

        <section className="resume-section">
          <h2>Summary</h2>
          <p className="resume-summary-text">{RESUME.summary}</p>
        </section>

        <section className="resume-section">
          <h2>Core Competencies & Technical Skills</h2>
          <div className="resume-skills-grid">
            {RESUME.skillCategories.map((group) => (
              <div key={group.category} className="resume-skill-group">
                <div className="resume-skill-cat mono">{group.category}</div>
                <div className="resume-skill-tags">
                  {group.items.map((skill) => (
                    <span key={skill} className="resume-skill-pill">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>Work Experience</h2>
          <div className="resume-jobs-stack">
            {RESUME.experience.map((job) => (
              <article key={job.org + job.period} className="resume-job">
                <div className="resume-job-head">
                  <div>
                    <h3 className="resume-job-role">{job.role}</h3>
                    <div className="resume-org-line">
                      <span className="resume-org">{job.org}</span>
                      {job.location && (
                        <span className="resume-loc mono"> · {job.location}</span>
                      )}
                    </div>
                  </div>
                  <span className="mono resume-job-period">{job.period}</span>
                </div>
                {job.tagline && <p className="resume-tagline">{job.tagline}</p>}
                <ul className="resume-bullets">
                  {job.highlights.map((item, idx) => {
                    const [head, ...rest] = item.split(": ");
                    return (
                      <li key={idx}>
                        {rest.length > 0 ? (
                          <>
                            <strong className="resume-bullet-head">{head}:</strong>{" "}
                            {rest.join(": ")}
                          </>
                        ) : (
                          item
                        )}
                      </li>
                    );
                  })}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-section">
          <h2>Selected Production Projects</h2>
          <div className="resume-projects-grid">
            {RESUME.projects.map((project) => (
              <div key={project.name} className="resume-project-card">
                <div className="resume-project-head">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="resume-project-link"
                  >
                    {project.name} <span className="arrow">↗</span>
                  </a>
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="resume-project-gh mono"
                    >
                      source ↗
                    </a>
                  )}
                </div>
                <p className="resume-project-desc">{project.description}</p>
                <div className="resume-project-stack mono">{project.stack}</div>
              </div>
            ))}
          </div>
          <p className="resume-more no-print">
            In-depth architectural case studies on{" "}
            <Link href="/projects">/projects</Link> and technical essays on{" "}
            <Link href="/blog">/blog</Link>.
          </p>
        </section>
      </div>
    </main>
  );
}
