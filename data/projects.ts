export type ProjectCategory =
  | "Logo Design"
  | "Editorials"
  | "stationery"
  | "Banners"
  | "Social Media Post" 
  | "Menu"
  | "Merchandise"
  | "Packaging"
  | "Flyers & Brochures"
  | "Brand Guidelines"
  | "Pitch Deck"
  | "UI/UX Design"
  | "3D Animations"
  | "2D Animations"
  | "Emotes "
  | "OverLay"

  ;

export interface Project {
  id: string;
  title: string;
  filter: ProjectCategory;
  type: "image" | "video";
  description: string;
  mainImage: string;
  coverImages: string[];
  color?: string;
}

export const projectCategories: ProjectCategory[] = [
  "Logo Design",
  "Editorials",
  "stationery",
  "Banners",
  "Social Media Post",
  "Menu",
  "Merchandise",
  "Packaging",
  "Flyers & Brochures",
  "Brand Guidelines",
  "Pitch Deck",
  "UI/UX Design",
  "3D Animations",
  "2D Animations",
  "Emotes ",
  "OverLay"
];

export const projects: Project[] = [];
