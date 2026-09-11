import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  extractToc,
  getAllPosts,
  getPost,
  getRelatedPosts,
} from "@/lib/blog";
import { renderMarkdown } from "@/lib/markdown";
import ArticleBody from "@/components/ArticleBody";
import ArticleCover from "@/components/ArticleCover";
import { ArticleTocMobile, ArticleTocSidebar } from "@/components/ArticleToc";
import ArticleJsonLd from "@/components/ArticleJsonLd";
import MagneticBtn from "@/components/MagneticBtn";
import ReadingProgress from "@/components/ReadingProgress";
import PostCard from "@/components/PostCard";
import { SITE } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = `${SITE.url}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.summary,
    keywords: post.keywords,
    authors: [{ name: SITE.name, url: SITE.url }],
    creator: SITE.name,
    category: post.category,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url,
      siteName: SITE.name,
      locale: "en_US",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [SITE.name],
      tags: post.keywords,
      images: [
        {
          url: `/blog/${post.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [`/blog/${post.slug}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const html = renderMarkdown(post.markdown);
  const toc = extractToc(post.markdown);
  const related = getRelatedPosts(post.slug);
  const shareUrl = encodeURIComponent(`${SITE.url}/blog/${post.slug}`);
  const shareText = encodeURIComponent(post.title);

  return (
    <main>
      <ArticleJsonLd post={post} />
      <ReadingProgress />
      <article className="article-page">
        <div className="container article-shell">
          <div className="article-grid">
            <ArticleTocSidebar items={toc} />

            <div className="article-main">
              <header className="article-header">
                <p className="mono article-kicker">
                  <Link href="/blog">writing</Link>
                  <span> · </span>
                  {post.category}
                  <span> · </span>
                  {post.displayDate} · {post.readTime}
                </p>
                <h1 className="article-title">{post.title}</h1>
                <p className="article-summary">{post.summary}</p>
                <div className="article-byline">
                  <div className="article-avatar" aria-hidden="true">
                    AR
                  </div>
                  <div>
                    <div className="article-author">{SITE.name}</div>
                    <div className="article-role">Full-Stack Engineer</div>
                  </div>
                  <div className="article-share">
                    <a
                      href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-chip"
                    >
                      share
                    </a>
                    <a
                      href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="share-chip"
                    >
                      linkedin
                    </a>
                  </div>
                </div>
                <ArticleCover cover={post.cover} title={post.title} />
                <ul className="article-tags" aria-label="Topics">
                  {post.keywords.slice(0, 5).map((keyword) => (
                    <li key={keyword}>{keyword}</li>
                  ))}
                </ul>
              </header>

              <div className="article-body-wrap">
                <ArticleTocMobile items={toc} />
                <ArticleBody html={html} />
                <div className="article-footer">
                  <MagneticBtn href="/blog" className="btn btn-ghost">
                    ← all essays
                  </MagneticBtn>
                  <MagneticBtn href="/contact" className="btn btn-primary">
                    talk about this
                  </MagneticBtn>
                </div>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="related-posts">
              <div className="sec-head" style={{ marginBottom: 24 }}>
                <span className="sec-index mono">next</span>
                <h2 className="sec-title">keep reading</h2>
                <span className="sec-rule" />
              </div>
              <div className="post-card-grid">
                {related.map((item) => (
                  <PostCard key={item.slug} post={item} />
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
