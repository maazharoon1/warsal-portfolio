"use client";

import { CldImage } from "next-cloudinary";
import { AnimatePresence, useInView } from "motion/react";
import type { PortfolioProject } from "@/libs/portfolio";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
const ImagePopup = dynamic(() => import("../ui/ImagePopup"), { ssr: false });
import { useRouter } from "next/navigation";
import styles from "./ProjectCard.module.css";

type Project = PortfolioProject;
const containCategories = new Set(["Emotes", "Overlay", "Banners", "Menu", "Merchandise", "Pitch Deck", "2D Animations"]);
const desktopQuery = "(min-width: 768px)";
const subscribe = (onChange: () => void) => {
  const media = window.matchMedia(desktopQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
};
const desktopSnapshot = () => window.matchMedia(desktopQuery).matches;
const serverSnapshot = () => false;

function ProjectTile({ project, index, onSelect }: { project: Project; index: number; onSelect: () => void }) {
  const entryRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(entryRef, { once: true, amount: 0.08 });
  const [state, setState] = useState<"loading" | "loaded" | "failed">("loading");
  const contain = project.type === "pdf" || containCategories.has(project.filter);
  const CardTag = project.type === "video" ? "a" : "button";

  return (
    <div ref={entryRef} className={styles.entry} data-visible={isVisible}>
      <CardTag
        type={project.type === "video" ? undefined : "button"}
        href={project.type === "video" ? "/video/" + project.id : undefined}
        onClick={project.type === "video" ? undefined : onSelect}
        className={styles.card}
        aria-label={`${project.type === "video" ? "Watch" : "View"} ${project.title.trim()}`}
      >
        <span className={`${styles.preview} relative block aspect-4/5 w-full overflow-hidden rounded-lg md:aspect-square md:rounded-xl`} data-state={state}>
          {state !== "failed" && <>
            <span className={styles.skeleton} aria-hidden="true" />
            <span className={`${styles.art} absolute inset-0`}>
              <CldImage
                src={project.mainImage}
                alt={`${project.title.trim()} ${project.filter.trim()} project`}
                fill
                sizes="(min-width: 1400px) 252px, (min-width: 1280px) calc((100vw - 144px) / 5), (min-width: 1024px) calc((100vw - 124px) / 4), (min-width: 768px) calc((100vw - 72px) / 3), (min-width: 640px) calc((100vw - 60px) / 2), calc((100vw - 42px) / 2)"
                quality="auto"
                format="auto"
                loading="lazy"
                onLoad={() => setState("loaded")}
                onError={() => setState("failed")}
                className={`${styles.cover} ${contain ? "object-contain" : "object-cover"}`}
              />
            </span>
          </>}
          {state === "failed" && <span className={styles.error}>Preview unavailable<br />Open project &#8599;</span>}
          <span className={styles.gradient} aria-hidden="true" />
          <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          <span className={styles.action} aria-hidden="true">{project.type === "video" ? "Watch video" : "View full project"}</span>
        </span>
        <span className={styles.caption}>
          <span className={styles.title}>{project.title.trim()}</span>
          <span className={styles.arrow} aria-hidden="true">
            <svg className={styles.arrowIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
            <svg className={`${styles.arrowIcon} ${styles.arrowCopy}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18 18 6M6 6h12v12" />
            </svg>
          </span>
        </span>
      </CardTag>
    </div>
  );
}

function PortfolioCard({ activeFilter, projects, showAll = false }: { activeFilter: string; projects: PortfolioProject[]; showAll?: boolean }) {
  const router = useRouter();
  const [popupId, setPopupId] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);
  const isDesktop = useSyncExternalStore(subscribe, desktopSnapshot, serverSnapshot);
  const gridRef = useRef<HTMLDivElement>(null);
  const nextFocusIndex = useRef<number | null>(null);
  const filteredProjects = projects.filter((project) => activeFilter === project.filter);
  const visibleProjects = showAll || isDesktop ? filteredProjects : filteredProjects.slice(0, visibleCount);
  const hasMore = !showAll && !isDesktop && visibleCount < filteredProjects.length;

  useEffect(() => {
    if (nextFocusIndex.current === null) return;
    gridRef.current?.querySelectorAll<HTMLButtonElement>("button")[nextFocusIndex.current]?.focus({ preventScroll: true });
    nextFocusIndex.current = null;
  }, [visibleCount]);

  function handleClick(project: Project) {
    if (project.type === "video") {
      router.push(`/video/${project.id}`);
    } else if (project.type === "pdf" && window.innerWidth < 768) {
      window.open(`https://res.cloudinary.com/hcn0f9nu/image/upload/v1786660548/${project.mainImage}.pdf`, "_blank", "noopener,noreferrer");
    } else {
      setPopupId(project.id);
    }
  }

  return (
    <div className="w-full">
      <div ref={gridRef} className={`${styles.grid} grid w-full grid-cols-2 gap-x-2.5 gap-y-6 py-2 sm:gap-x-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5 xl:grid-cols-5`}>
        {visibleProjects.map((project, index) => (
          <ProjectTile key={`${project.id}-${project.mainImage}`} project={project} index={index} onSelect={() => handleClick(project)} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button type="button" className={styles.loadMore} onClick={() => {
            nextFocusIndex.current = visibleProjects.length;
            setVisibleCount((count) => Math.min(count + 4, filteredProjects.length));
          }}>Load More <span aria-hidden="true">&#8595;</span></button>
        </div>
      )}
      <AnimatePresence>
        {popupId && <ImagePopup id={popupId} onClose={() => setPopupId(null)} />}
      </AnimatePresence>
    </div>
  );
}

export default PortfolioCard;
