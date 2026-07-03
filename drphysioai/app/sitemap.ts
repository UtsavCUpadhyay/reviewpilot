import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://drphysioai.com";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/ai`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/consultation`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/live-classes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/#pricing`, lastModified: now, priority: 0.7 },
  ];
}
