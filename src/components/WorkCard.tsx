"use client";

import Link from "next/link";
import SpotlightCard from "@/components/SpotlightCard";
import ScrollReveal from "@/components/ScrollReveal";
import type { Project } from "@/data/projects";
import ProjectPreview from "@/components/ProjectPreview";

function ExternalIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7m-8 0h8v8" />
    </svg>
  );
}

export default function WorkCard({
  project,
  delay,
  detail = false,
}: {
  project: Project;
  delay?: string;
  detail?: boolean;
}) {
  return (
    <ScrollReveal delay={delay}>
      <SpotlightCard className="work-card pop">
        <div className="work-grid">
          <div className="work-body">
            <div className="tags">
              {project.tagBadges.map((badge) => (
                <span
                  key={badge.text}
                  className={`tag ${badge.hot ? "hot" : ""}`}
                >
                  {badge.text}
                </span>
              ))}
            </div>
            <h3>{project.title}</h3>
            {detail && project.problem ? (
              <>
                <p>
                  <strong style={{ color: "var(--text)" }}>Problem</strong> —{" "}
                  {project.problem}
                </p>
                {project.solution && (
                  <p style={{ marginTop: "10px" }}>
                    <strong style={{ color: "var(--text)" }}>Solution</strong> —{" "}
                    {project.solution}
                  </p>
                )}
              </>
            ) : (
              <p>{project.description}</p>
            )}
            <div className="stack-line">
              {project.stack.split(" · ").map((tech, i, arr) => (
                <span key={tech}>
                  <b>{tech}</b>
                  {i < arr.length - 1 ? " · " : ""}
                </span>
              ))}
            </div>
            {project.stats && (
              <div className="stat-row">
                {project.stats.map((stat) => (
                  <div key={stat.k} className="stat">
                    <div className="v">{stat.v}</div>
                    <div className="k">{stat.k}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="work-links">
              {project.caseStudy && (
                <Link
                  href={`/projects/${project.slug}`}
                  className="btn btn-primary btn-sm"
                >
                  case study
                </Link>
              )}
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn btn-sm ${project.caseStudy ? "btn-ghost" : "btn-primary"}`}
              >
                {project.demoBtnText} <ExternalIcon />
              </a>
              {project.sourceUrl && (
                <a
                  href={project.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                >
                  source
                </a>
              )}
            </div>
          </div>
          <div className="work-media">
            {project.preview ? (
              <ProjectPreview kind={project.preview} />
            ) : (
              <span className="glyph">{project.glyph}</span>
            )}
            <span className="file">{project.fileLabel}</span>
          </div>
        </div>
      </SpotlightCard>
    </ScrollReveal>
  );
}
