import type { MetadataRoute } from "next";
import { SECTIONS } from "../lib/site-data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: { path: string; priority: number; freq?: "monthly" | "weekly" }[] = [
    { path: "", priority: 1 },
    { path: "verticals/security", priority: 0.9 },
    ...SECTIONS.flatMap((s) => [
      { path: s.id, priority: 0.8 },
      ...s.items.map((c) => ({ path: `${s.id}/${c.key}`, priority: 0.7 })),
    ]),
    { path: "about", priority: 0.6 },
    { path: "register", priority: 0.5 },
  ];
  return pages.map((p) => ({
    url: `https://www.workdo.ru/${p.path}`,
    lastModified: now,
    changeFrequency: p.freq ?? "monthly",
    priority: p.priority,
  }));
}