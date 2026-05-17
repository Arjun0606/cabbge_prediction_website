import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/posts";

const SITE = "https://cabbge.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed: MetadataRoute.Sitemap = [
    { url: SITE,                lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE}/blog`,      lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${SITE}/privacy`,   lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE}/terms`,     lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];
  const posts: MetadataRoute.Sitemap = POSTS.map((p) => ({
    url: `${SITE}/blog/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.publishedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));
  return [...fixed, ...posts];
}
