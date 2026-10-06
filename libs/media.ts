import { getCldImageUrl, getCldVideoUrl } from "next-cloudinary";

const config = { cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "hcn0f9nu" } };
export const videoUrl = (id: string) =>
  getCldVideoUrl({ src: id, format: "mp4", quality: "auto" }, config);
export const posterUrl = (id: string, width = 1200, height = 630) =>
  getCldImageUrl({ src: id, width, height, crop: "fill", format: "jpg", quality: "auto" }, config);
