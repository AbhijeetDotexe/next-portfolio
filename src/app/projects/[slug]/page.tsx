import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProject, PROJECTS } from "@/data/projects";
import { renderMarkdown } from "@/lib/markdown";
import { PROJECT_ESSAYS } from "@/lib/relations";
import ArticleBody from "@/components/ArticleBody";
import RelatedEssays from "@/components/RelatedEssays";
import MagneticBtn from "@/components/MagneticBtn";
import { SITE } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams() {
  return PROJECTS.filter((project) => project.caseStudy).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) return {};

  const url = `${SITE.url}/projects/${project.slug}`;

  return {
    title: `${project.title} — case study`,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — case study`,
      description: project.description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — case study`,
      description: project.description,
    },
  };
}

export default async function ProjectCaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();

  const html = renderMarkdown(project.caseStudy);
  const relatedEssays = PROJECT_ESSAYS[slug] ?? [];

  return (
    <main>
      <article className="article-page">
        <div className="container article-shell">
          <header className="article-header">
            <p className="mono article-kicker">
              <Link href="/projects">projects</Link>
              <span> · </span>
              case study
            </p>
            <h1 className="article-title">{project.title}</h1>
            <p className="article-summary">{project.description}</p>
            {project.stats && (
              <div className="stat-row" style={{ margin: "8px 0 4px" }}>
                {project.stats.map((stat) => (
                  <div key={stat.k} className="stat">
                    <div className="v">{stat.v}</div>
                    <div className="k">{stat.k}</div>
                  </div>
                ))}
              </div>
            )}
            <p className="mono" style={{ fontSize: "0.75rem", color: "var(--faint)", marginTop: 16 }}>
              {project.stack}
            </p>
          </header>

          <div className="article-wrap" style={{ margin: "0 auto" }}>
            <ArticleBody html={html} />
            <div className="article-footer">
              <MagneticBtn
                href={project.liveUrl}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {project.demoBtnText}
              </MagneticBtn>
              {project.sourceUrl && (
                <MagneticBtn
                  href={project.sourceUrl}
                  className="btn btn-ghost"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  source
                </MagneticBtn>
              )}
              <MagneticBtn href={`mailto:${SITE.email}`} className="btn btn-ghost">
                ask about this
              </MagneticBtn>
            </div>
          </div>

          <RelatedEssays slugs={relatedEssays} />
        </div>
      </article>
    </main>
  );
}
