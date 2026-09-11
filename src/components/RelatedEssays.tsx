import Link from "next/link";
import { getPost } from "@/lib/blog";

export default function RelatedEssays({ slugs }: { slugs: string[] }) {
  const posts = slugs.map((slug) => getPost(slug)).filter(Boolean);

  if (posts.length === 0) return null;

  return (
    <section className="related-essays">
      <p className="mono article-kicker">related reading</p>
      <div className="related-essay-list">
        {posts.map((post) => (
          <Link key={post!.slug} href={`/blog/${post!.slug}`} className="related-essay-card">
            <span className="related-essay-meta mono">
              {post!.category} · {post!.readTime}
            </span>
            <span className="related-essay-title">{post!.title}</span>
            <span className="related-essay-arrow">↗</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
