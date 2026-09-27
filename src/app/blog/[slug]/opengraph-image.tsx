import { ImageResponse } from "next/og";
import { getAllPosts, getPost } from "@/lib/blog";
import { SITE } from "@/data/site";

export const alt = "Essay cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? SITE.name;
  const category = post?.category ?? "writing";
  const accent = post?.cover.accent ?? "#d6d2cb";
  const summary = post?.summary ?? SITE.description;
  const shortSummary =
    summary.length > 120 ? `${summary.slice(0, 117)}…` : summary;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: `radial-gradient(circle at 85% 20%, ${accent}33 0%, transparent 42%), radial-gradient(circle at 10% 90%, ${accent}18 0%, transparent 40%), #121212`,
          color: "#eceae6",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: accent,
            }}
          >
            {SITE.name} · writing
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 18,
              color: "#a6a39d",
              border: `1px solid ${accent}`,
              borderRadius: 999,
              padding: "8px 18px",
            }}
          >
            {category}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            maxWidth: 980,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: title.length > 56 ? 46 : 58,
              lineHeight: 1.12,
              fontStyle: "italic",
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#a6a39d",
              lineHeight: 1.4,
            }}
          >
            {shortSummary}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
