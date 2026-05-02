import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const alt = site.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0b0b10 0%, #1a120b 55%, #3a1c0b 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
          }}
        >
          Search Modifiers
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "rgba(148, 163, 184, 0.95)",
            maxWidth: 720,
            lineHeight: 1.4,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 20,
            color: "#fb923c",
            fontWeight: 600,
          }}
        >
          SEO · Paid Media · ORM · Web
        </div>
      </div>
    ),
    { ...size }
  );
}
