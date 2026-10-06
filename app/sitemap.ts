import type { MetadataRoute } from "next";
import { ProjectObject } from "@/libs/projectVariable";
import { portfolioCategories } from "@/components/section/portfolioCategories";
import { absoluteUrl } from "@/libs/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    ...portfolioCategories.map((category) => ({ url: absoluteUrl("/work/" + category.id), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...ProjectObject.filter((project) => project.type === "video").map((project) => ({
      url: absoluteUrl("/video/" + project.id), changeFrequency: "monthly" as const, priority: 0.7,
    })),
  ];
}
