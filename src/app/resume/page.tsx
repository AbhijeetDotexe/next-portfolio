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
          <h1>{RESUME.name}</h1>
          <p className="resume-title">{RESUME.title}</p>
          <p className="resume-contact">
            <a href={`mailto:${RESUME.email}`}>{RESUME.email}</a>
            {" · "}
            {RESUME.location}
            {" · "}
            <a href={RESUME.links.site}>{RESUME.links.site.replace("https://", "")}</a>
            {" · "}
            <a href={RESUME.links.github}>github</a>
            {" · "}
            <a href={RESUME.links.linkedin}>linkedin</a>
          </p>
        </header>

        <section className="resume-section">
          <h2>Summary</h2>
          <p>{RESUME.summary}</p>
        </section>

        <section className="resume-section">
          <h2>Skills</h2>
          <ul className="resume-skills">
            {RESUME.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </section>

        <section className="resume-section">
          <h2>Experience</h2>
          {RESUME.experience.map((job) => (
            <article key={job.org + job.period} className="resume-job">
              <div className="resume-job-head">
                <h3>{job.role}</h3>
                <span className="mono">{job.period}</span>
              </div>
              <p className="resume-org">{job.org}</p>
              <ul>
                {job.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section className="resume-section">
          <h2>Selected projects</h2>
          <ul className="resume-projects">
            {RESUME.projects.map((project) => (
              <li key={project.name}>
                <a href={project.url}>{project.name}</a>
                <span className="mono">{project.stack}</span>
              </li>
            ))}
          </ul>
          <p className="resume-more">
            Case studies and essays on{" "}
            <Link href="/projects">/projects</Link> and <Link href="/blog">/blog</Link>.
          </p>
        </section>

      </div>
    </main>
  );
}
