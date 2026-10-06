"use client";

import { useState } from "react";
import { posterUrl, videoUrl } from "@/libs/media";

interface PortfolioVideoProps { id: string; mainImage: string; title?: string; }

export default function PortfolioVideo({ id, mainImage, title = "Warsal project video" }: PortfolioVideoProps) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      <video key={id} controls playsInline preload="none" poster={posterUrl(mainImage, 1280, 720)} aria-label={title} className="h-full w-full object-contain" onError={() => setFailed(true)}>
        <source src={videoUrl(id)} type="video/mp4" onError={() => setFailed(true)} />
        Your browser does not support HTML video.
      </video>
      {failed && <p role="alert" className="absolute inset-x-0 top-0 bg-black/85 p-3 text-center text-sm text-white">Video could not load. Use the direct video link.</p>}
    </div>
  );
}
