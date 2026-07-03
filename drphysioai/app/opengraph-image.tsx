import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "DrPhysioAI — Your Personal AI Physiotherapist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Branded social preview image (Open Graph + Twitter). */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0d9488 0%, #2563eb 50%, #7c3aed 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: 24,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 52,
            }}
          >
            🩺
          </div>
          <div style={{ fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>DrPhysioAI</div>
        </div>

        <div
          style={{
            marginTop: 48,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -2,
            maxWidth: 900,
          }}
        >
          Your Personal AI Physiotherapist
        </div>

        <div style={{ marginTop: 28, fontSize: 34, opacity: 0.92, maxWidth: 940 }}>
          Learn. Recover. Move better. — India&apos;s AI physiotherapy platform.
        </div>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            gap: 28,
            fontSize: 26,
            opacity: 0.9,
          }}
        >
          <span>AI study tutor</span>
          <span>·</span>
          <span>Online consultations</span>
          <span>·</span>
          <span>Live classes</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
