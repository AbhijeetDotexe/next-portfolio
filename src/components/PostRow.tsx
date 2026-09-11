import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import type { BlogListItem } from "@/lib/blog";

export default function PostRow({
  post,
  delay,
}: {
  post: BlogListItem;
  delay?: string;
}) {
  return (
    <ScrollReveal delay={delay}>
      <Link href={`/blog/${post.slug}`} className="post-row">
        <span className="date">
          {post.displayDate} · {post.readTime}
        </span>
        <div>
          <h3>{post.title}</h3>
          <p>{post.summary}</p>
        </div>
        <span className="arrow">↗</span>
      </Link>
    </ScrollReveal>
  );
}
