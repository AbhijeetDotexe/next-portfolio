import { SITE } from "@/data/site";
import { getAllPosts } from "@/lib/blog";

export default function BlogIndexJsonLd() {
  const posts = getAllPosts();
  const data = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE.name} — writing`,
    url: `${SITE.url}/blog`,
    description:
      "Architecture notes on queues, document AI, serverless pools, and production observability.",
    author: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE.url}/blog/${post.slug}`,
      datePublished: post.date,
      description: post.summary,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
