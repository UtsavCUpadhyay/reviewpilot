import type { MetadataRoute } from "next";
import { conditions } from "@/lib/conditions";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.drphysioai.com";
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/ai`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/consultation`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/conditions`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...conditions.map((c) => ({
      url: `${base}/conditions/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${base}/physiotherapists`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/find-program`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/live-classes`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/exercises`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/posture-check`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/refer`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/glossary`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/reviews`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...blogPosts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: `${base}/#pricing`, lastModified: now, priority: 0.7 },
    { url: `${base}/about`, lastModified: now, priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, priority: 0.3 },
    { url: `${base}/refund-policy`, lastModified: now, priority: 0.3 },
    { url: `${base}/medical-disclaimer`, lastModified: now, priority: 0.3 },
    { url: `${base}/cookie-policy`, lastModified: now, priority: 0.3 },
  ];
}
