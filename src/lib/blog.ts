import { BLOG_POSTS, type BlogPost } from "@/content/blog";
import { formatPostDate, readingTime, slugifyHeading } from "@/lib/markdown";

export type BlogListItem = BlogPost & {
  readTime: string;
  displayDate: string;
  wordCount: number;
};

export type TocItem = { id: string; text: string };

export function getAllPosts(): BlogListItem[] {
  return [...BLOG_POSTS]
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((post) => {
      const words = post.markdown.trim().split(/\s+/).filter(Boolean).length;
      return {
        ...post,
        wordCount: words,
        readTime: readingTime(post.markdown),
        displayDate: formatPostDate(post.date),
      };
    });
}

export function getPost(slug: string): BlogListItem | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 2): BlogListItem[] {
  const current = getPost(slug);
  if (!current) return getAllPosts().slice(0, limit);

  return getAllPosts()
    .filter((post) => post.slug !== slug)
    .sort((a, b) => {
      const aScore = a.category === current.category ? 1 : 0;
      const bScore = b.category === current.category ? 1 : 0;
      if (aScore !== bScore) return bScore - aScore;
      return b.date.localeCompare(a.date);
    })
    .slice(0, limit);
}

export function extractToc(markdown: string): TocItem[] {
  const items: TocItem[] = [];
  for (const line of markdown.split("\n")) {
    const match = /^##\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const text = match[1].replace(/[*_`]/g, "").trim();
    items.push({ id: slugifyHeading(text), text });
  }
  return items;
}
