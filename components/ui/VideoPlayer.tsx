"use client";

import { CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";

interface PortfolioVideoProps {
  id: string;
  mainImage: string;
}

export default function PortfolioVideo({
  id,
  mainImage,
}: PortfolioVideoProps) {
  return (
    <div className="flex ">
      <div
        className="
          relative
          aspect-video
          w-full
          rounded-xl
          "
      >
        <CldVideoPlayer
          id={id}
          src={id}
          poster={mainImage}
         
          className="h-full w-full object-contain"
          colors={{
            base: "#01d2d1",
            accent: "#01d2d1",
          }}
          transformation={{
            videoCodec: "auto",
            quality: "auto",
          }}
        />
      </div>
    </div>
    
  );
}

