import { SITE } from "@/data/site";
import type { BlogListItem } from "@/lib/blog";

export default function ArticleJsonLd({ post }: { post: BlogListItem }) {
  const url = `${SITE.url}/blog/${post.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.summary,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        wordCount: post.wordCount,
        keywords: post.keywords.join(", "),
        inLanguage: "en",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: [`${url}/opengraph-image`],
        author: {
          "@type": "Person",
          name: SITE.name,
          url: SITE.url,
          sameAs: [SITE.githubUrl, SITE.linkedinUrl],
        },
        publisher: {
          "@type": "Person",
          name: SITE.name,
          url: SITE.url,
        },
        articleSection: post.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Writing",
            item: `${SITE.url}/blog`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: post.title,
            item: url,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
