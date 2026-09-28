export const portfolioCategories = [

  { id: "logodesign", label: "Logo Design", projectFilter: "Logo Design" },
  
  {
    id: "editorials",
    label: "Editorials",
    projectFilter: "Editorials",
    aliases: ["editorials"],
  },
  {
    id: "stationery",
    label: "Stationery",
    projectFilter: "stationery",
    aliases: ["stationery"],
  },
  {
    id: "socialmediapost",
    label: "Social Media Post",
    projectFilter: "socialmediapost",
    aliases: ["socialmediapost"],
  },
  { id: "banners", label: "Banners", projectFilter: "Banners" },
  { id: "menu", label: "Menu", projectFilter: "Menu" },
  { id: "merchandise", label: "Merchandise", projectFilter: "Merchandise" },
  { id: "packaging", label: "Packaging", projectFilter: "Packaging" },
  {
    id: "flyernbrochures",
    label: "Flyers & Brochures",
    projectFilter: "Flyers & Brochures",
    aliases: ["flyersandbrochures"],
  },
  {
    id: "brandguidlines",
    label: "Brand Guidelines",
    projectFilter: "Brand Guidelines",
    aliases: ["brandguidelines"],
  },
  { id: "pitchdeck", label: "Pitch Deck", projectFilter: "Pitch Deck" },
  { id: "motiongraphics", label: "3D Animations", projectFilter: "3D Animations" },
  { id: "2danimations", label: "2D Animations", projectFilter: "2D Animations" },
  {
    id: "uiuxdesign",
    label: "UI/UX Design",
    projectFilter: "UI/UX Design",
    aliases: ["uiux"],
  },
  {
    id: "emotes",
    label: "Emotes",
    projectFilter: "Emotes",
    aliases: ["uiemotesux"],
  },
  {
    id: "overlay",
    label: "Overlay",
    projectFilter: "Overlay",
    aliases: ["overlay"],
  },
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];
export type PortfolioCategoryId = PortfolioCategory["id"];

export const defaultPortfolioCategory = portfolioCategories[0];

const categoriesByHash = new Map<string, PortfolioCategory>();

for (const category of portfolioCategories) {
  categoriesByHash.set(category.id, category);

  if ("aliases" in category) {
    for (const alias of category.aliases) {
      categoriesByHash.set(alias, category);
    }
  }
}

export function getPortfolioCategoryFromHash(hash: string) {
  const normalizedHash = hash.replace(/^#/, "").toLowerCase();

  if (normalizedHash === "portfolio") {
    return defaultPortfolioCategory;
  }

  return categoriesByHash.get(normalizedHash);
}
