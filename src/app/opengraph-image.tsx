import { ImageResponse } from "next/og";

// Rendered once at build time (the site is a static export).
export const dynamic = "force-static";

export const alt = "Youssf Hazem — Product analyst who designs & builds";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f2ec",
          padding: 76,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 30, height: 30, background: "#1b45e0", borderRadius: 7 }} />
          <div style={{ fontSize: 26, letterSpacing: 3, color: "#57555f" }}>
            YOUSSF HAZEM · CAIRO, EGYPT
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 78,
            fontWeight: 800,
            color: "#16151c",
            lineHeight: 1.04,
            letterSpacing: -2,
          }}
        >
          <div style={{ display: "flex" }}>
            I turn
            <span style={{ color: "#1b45e0", margin: "0 20px" }}>data</span>
            into
          </div>
          <div style={{ display: "flex" }}>products people</div>
          <div style={{ display: "flex" }}>actually use.</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 30, color: "#57555f" }}>
            Product analyst who designs &amp; builds
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "#fff",
              background: "#16151c",
              padding: "10px 22px",
              borderRadius: 999,
            }}
          >
            Portfolio
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
