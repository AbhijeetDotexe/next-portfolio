import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import ArticleCover from "@/components/ArticleCover";
import type { BlogListItem } from "@/lib/blog";

export default function PostCard({
  post,
  delay,
  featured,
}: {
  post: BlogListItem;
  delay?: string;
  featured?: boolean;
}) {
  return (
    <ScrollReveal delay={delay} className={featured ? "post-card featured" : "post-card"}>
      <Link href={`/blog/${post.slug}`} className="post-card-link">
        <ArticleCover cover={post.cover} title={post.title} />
        <div className="post-card-body">
          <span className="post-card-meta mono">
            {post.category} · {post.displayDate} · {post.readTime}
          </span>
          <h3>{post.title}</h3>
          <p>{post.summary}</p>
          <span className="post-card-cta mono">read essay →</span>
        </div>
      </Link>
    </ScrollReveal>
  );
}
