import { ProjectObject, WEB_DEV_IMAGE_REVISION } from "./projectVariable";
import type { PortfolioProject } from "./portfolio";

// Only card fields cross the server/client boundary. Full galleries load when opened.
export function getPortfolioProjects(filter?: string): PortfolioProject[] {
  return ProjectObject.filter((project) => !filter || project.filter === filter).map((project) => ({
    id: project.id,
    title: project.title.trim(),
    filter: project.filter,
    type: project.type,
    mainImage: project.mainImage,
    ...(project.liveUrl ? { liveUrl: project.liveUrl } : {}),
    ...(project.filter === "Web Dev" ? { imageRevision: WEB_DEV_IMAGE_REVISION } : {}),
  }));
}
