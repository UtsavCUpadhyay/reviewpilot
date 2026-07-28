import type { MetadataRoute } from "next";

// PWA manifest so DrPhysioAI installs to the home screen (Flutter/PWA ready).
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DrPhysioAI — Clinical AI for Physiotherapists",
    short_name: "DrPhysioAI",
    description:
      "The AI-powered clinical operating system for physiotherapists.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0f1c",
    theme_color: "#0fbfb4",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
