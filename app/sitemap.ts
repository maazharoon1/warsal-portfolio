import type { MetadataRoute } from "next";
import { ProjectObject } from "@/libs/projectVariable";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.warsal-portfolio.com";

  const pages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date("2026-08-27"),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  const videoPages = ProjectObject.filter((project) => project.type === "video").map(
    (project) => ({
      url: `${baseUrl}/video/${project.id}`,
      lastModified: new Date("2026-08-27"),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })
  );

  return [...pages, ...videoPages];
}
