import type { MetadataRoute } from "next";
import { articles } from "@/lib/content";
import { siteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/penulisan", "/siri-koleksi", "/arkib"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/penulisan/${article.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7
  }));

  return [...staticRoutes, ...articleRoutes];
}
