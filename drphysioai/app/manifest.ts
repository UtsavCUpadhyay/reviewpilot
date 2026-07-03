import type { MetadataRoute } from "next";

// PWA manifest so DrPhysioAI installs to the home screen (Flutter/PWA ready).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DrPhysioAI — Your Personal AI Physiotherapist",
    short_name: "DrPhysioAI",
    description:
      "India's AI-powered physiotherapy learning & consultation platform.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1c",
    theme_color: "#0fbfb4",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
