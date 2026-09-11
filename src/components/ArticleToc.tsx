import type { TocItem } from "@/lib/blog";

function TocLinks({ items }: { items: TocItem[] }) {
  return (
    <>
      {items.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`}>{item.text}</a>
        </li>
      ))}
    </>
  );
}

export function ArticleTocSidebar({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav className="article-toc" aria-label="On this page">
      <p className="mono article-toc-label">on this page</p>
      <ol>
        <TocLinks items={items} />
      </ol>
    </nav>
  );
}

export function ArticleTocMobile({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <details className="article-toc-mobile">
      <summary>on this page</summary>
      <ol>
        <TocLinks items={items} />
      </ol>
    </details>
  );
}
