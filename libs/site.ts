export const siteUrl = new URL(process.env.SITE_URL || "https://www.warsal-portfolio.com").origin;
export const siteTitle = "Warsal | Graphic Design, Web Development & Animation";
export const siteDescription = "Explore Warsal's logo design, branding, packaging, web development, and 2D and 3D animation portfolio. Get in touch to discuss your next project.";
export const absoluteUrl = (path = "/") => new URL(path, siteUrl).toString();
export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, "\\u003c");
export const shortDescription = (value?: string) => {
  const text = (value || siteDescription).replace(/\s+/g, " ").trim();
  return text.length <= 160 ? text : text.slice(0, 157).replace(/\s+\S*$/, "") + "...";
};
