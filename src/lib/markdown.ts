import { marked, Renderer } from "marked";
import type { Tokens } from "marked";
import { slugifyHeading } from "./slug";

marked.setOptions({ gfm: true, breaks: false });

const renderer = new Renderer();
renderer.heading = function (this: Renderer, { tokens, depth }: Tokens.Heading) {
  const text = this.parser.parseInline(tokens);
  if (depth === 2) {
    const id = slugifyHeading(stripTags(text));
    return `<h2 id="${id}"><a class="heading-anchor" href="#${id}">${text}</a></h2>\n`;
  }
  return `<h${depth}>${text}</h${depth}>\n`;
};

marked.use({ renderer });

export function renderMarkdown(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}

export function readingTime(markdown: string): string {
  const plain = markdown
    .replace(/<[^>]+>/g, " ")
    .replace(/```[\s\S]*?```/g, " ")
    .trim();
  const words = plain.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

export function formatPostDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export { slugifyHeading } from "./slug";

function stripTags(value: string): string {
  return value.replace(/<[^>]+>/g, "").trim();
}
