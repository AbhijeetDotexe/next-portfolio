import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const alt = `${SITE.name} — Full Stack Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#121212",
          color: "#eceae6",
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4, textTransform: "uppercase", color: "#d6d2cb" }}>
          {SITE.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 64, lineHeight: 1.1, fontStyle: "italic" }}>
            Resilient backends. Delightful frontends.
          </div>
          <div style={{ fontSize: 28, color: "#a6a39d" }}>{SITE.url.replace("https://", "")}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
