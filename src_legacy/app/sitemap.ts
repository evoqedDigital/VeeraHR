import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://veerahr.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts().map((p) => ({
    url: `${base}/${p.slug}/`,
    lastModified: new Date(p.date),
  }));

  return [
    { url: base + "/", lastModified: new Date() },
    { url: `${base}/privacy-policy/`, lastModified: new Date("2025-02-22") },
    { url: `${base}/terms-of-service`, lastModified: new Date("2025-02-22") },
    { url: `${base}/legal-information/`, lastModified: new Date("2025-02-22") },
    ...posts,
  ];
}
