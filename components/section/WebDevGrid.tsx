"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { getCldImageUrl } from "next-cloudinary";
import type { PortfolioProject } from "@/libs/portfolio";
import styles from "./WebDevGrid.module.css";
import motionStyles from "./ProjectCard.module.css";

const sizes = "(min-width: 1400px) 316px, (min-width: 1280px) calc((100vw - 136px) / 4), (min-width: 1024px) calc((100vw - 88px) / 2), (min-width: 640px) calc((100vw - 72px) / 2), calc(100vw - 32px)";
const imageUrl = (src: string, width: number, version?: number) =>
  getCldImageUrl({ src, width, version, crop: "limit", format: "auto", quality: "auto" });

function WebsiteCard({ project, index }: { project: PortfolioProject; index: number }) {
  const entryRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLSpanElement>(null);
  const visible = useInView(entryRef, { once: true, amount: 0.08 });
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");

  useEffect(() => {
    const viewport = viewportRef.current;
    const image = viewport?.querySelector("img");
    if (!viewport || !image) return;
    const measure = () => {
      const overflow = Math.max(0, image.offsetHeight - viewport.clientHeight);
      viewport.style.setProperty("--preview-offset", `-${overflow}px`);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(image);
    image.addEventListener("load", measure);
    measure();
    return () => {
      observer.disconnect();
      image.removeEventListener("load", measure);
    };
  }, []);

  return (
    <div ref={entryRef} className={`${motionStyles.entry} ${styles.entry}`} data-visible={visible}>
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.card}
        aria-label={`Visit ${project.title} website (opens in a new tab)`}
      >
        <span ref={viewportRef} className={styles.window} data-state={state}>
          {state !== "failed" && <>
            <span className={motionStyles.skeleton} aria-hidden="true" />
            <span className={motionStyles.art}>
              {/* Cloudinary optimizes responsive images; natural height supports full-page scrolling. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl(project.mainImage, 640, project.imageRevision)}
                srcSet={[320, 480, 640, 960, 1280].map((width) => `${imageUrl(project.mainImage, width, project.imageRevision)} ${width}w`).join(", ")}
                sizes={sizes}
                alt={`${project.title} website preview`}
                loading="lazy"
                decoding="async"
                onLoad={() => setState("loaded")}
                onError={() => setState("failed")}
                className={styles.cover}
              />
            </span>
          </>}
          {state === "failed" && (
            <span className={styles.placeholder}>
              <span className={styles.number}>Website {String(index + 1).padStart(2, "0")}</span>
              <span className={styles.title}>{project.title}</span>
              <span className={styles.visit}>Visit website <span aria-hidden="true">&#8599;</span></span>
            </span>
          )}
        </span>
      </a>
    </div>
  );
}

export default function WebDevGrid({ projects }: { projects: PortfolioProject[] }) {
  return (
    <div className={styles.grid}>
      {projects.map((project, index) => <WebsiteCard key={`${project.id}-${project.mainImage}-${project.imageRevision}`} project={project} index={index} />)}
    </div>
  );
}
