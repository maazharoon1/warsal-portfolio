"use client"

import {
  useEffect,
  useRef,
  useState,
  type WheelEvent,
} from "react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import PortofolioCard from "./ProjectCard";
import {
  defaultPortfolioCategory,
  getPortfolioCategoryFromHash,
  portfolioCategories,
  type PortfolioCategoryId,
} from "./portfolioCategories";

function getScrollEdges(container: HTMLDivElement) {
  return {
    left: container.scrollLeft > 1,
    right: container.scrollLeft + container.clientWidth < container.scrollWidth - 1,
  };
}

function Portfolio() {
  const router = useRouter();
  const [activeTabId, setActiveTabId] = useState<PortfolioCategoryId>(
    defaultPortfolioCategory.id
  );
  const [scrollEdges, setScrollEdges] = useState({ left: false, right: false });
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const tabRowRef = useRef<HTMLDivElement | null>(null);
  const activeTab =
    portfolioCategories.find((tab) => tab.id === activeTabId) ??
    defaultPortfolioCategory;

  useEffect(() => {
    const syncCategoryFromHash = (shouldScroll: boolean) => {
      const category = getPortfolioCategoryFromHash(window.location.hash);

      if (!category) return;

      setActiveTabId(category.id);

      if (shouldScroll) {
        document.getElementById("portfolio")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    syncCategoryFromHash(true);

    const handleHashChange = () => syncCategoryFromHash(true);
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const container = tabRowRef.current;
    if (!container) return;

    const updateEdges = () => {
      const next = getScrollEdges(container);
      setScrollEdges((current) =>
        current.left === next.left && current.right === next.right ? current : next,
      );
    };

    const observer = new ResizeObserver(updateEdges);
    observer.observe(container);
    if (container.firstElementChild) observer.observe(container.firstElementChild);
    const frame = requestAnimationFrame(updateEdges);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(min-width: 640px)").matches) return;

    const activeButton = tabRefs.current[activeTab.id];
    const container = tabRowRef.current;

    if (!activeButton || !container) return;

    const buttonLeft = activeButton.offsetLeft;
    const buttonWidth = activeButton.offsetWidth;
    const containerWidth = container.clientWidth;
    const desiredLeft = buttonLeft - containerWidth / 2 + buttonWidth / 2;

    container.scrollTo({
      left: Math.max(0, desiredLeft),
      behavior: "smooth",
    });
  }, [activeTab.id]);

  function handleTabClick(categoryId: PortfolioCategoryId) {
    setActiveTabId(categoryId);

    if (window.location.hash === `#${categoryId}`) {
      return;
    }

    router.push(`#${categoryId}`);
  }

  function handleTabWheel(event: WheelEvent<HTMLDivElement>) {
    if (window.matchMedia("(min-width: 640px)").matches) return;

    const container = event.currentTarget;

    if (
      container.scrollWidth <= container.clientWidth ||
      Math.abs(event.deltaX) >= Math.abs(event.deltaY)
    ) {
      return;
    }

    const isScrollingRight = event.deltaY > 0;
    const isAtStart = container.scrollLeft <= 0;
    const isAtEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth - 1;

    if ((isScrollingRight && isAtEnd) || (!isScrollingRight && isAtStart)) {
      return;
    }

    event.preventDefault();
    container.scrollBy({ left: event.deltaY, behavior: "auto" });
  }

  return (
    <section className="relative w-full overflow-hidden">
  

      <div className="mx-auto w-full max-w-350 px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="flex flex-col items-start gap-2"
          initial={{
            opacity: 0,
            y: 35,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {/* Small Label */}
          <motion.div
            className="mb-2 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-[#01d2d1]"
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            <span className="h-px w-7 text-[#01d2d1] bg-[#01d2d1]" />
            Selected Work
          </motion.div>

          <motion.h2
            className="max-w-xl text-2xl leading-tight tracking-tight text-[#01d2d1] sm:text-3xl"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Selected graphic design work
          </motion.h2>

          <motion.p
            className="max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-[15px]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Explore selected branding, logo, packaging, 3D Animations,
            social media, and UI/UX projects by Warsal.
          </motion.p>
        </motion.div>

        {/* Tabs */}
  <motion.div
  className="relative mt-6 w-full overflow-hidden sm:overflow-visible"
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.2 }}
  transition={{ delay: 0.35, duration: 0.35 }}
>
  {/* Tabs */}
  <div
    ref={tabRowRef}
    role="tablist"
    aria-label="Portfolio categories"
    onWheel={handleTabWheel}
    onScroll={(event) => {
      const next = getScrollEdges(event.currentTarget);
      setScrollEdges((current) =>
        current.left === next.left && current.right === next.right ? current : next,
      );
    }}
    className="
      flex
      w-full
      gap-2
      overflow-x-auto
      overscroll-x-contain
      pb-2
      scrollbar-none
      [-ms-overflow-style:none]
      [&::-webkit-scrollbar]:hidden
      snap-x
      snap-mandatory
      sm:overflow-visible
      sm:snap-none
    "
  >
    <div className="flex min-w-max gap-2 px-1 sm:w-full sm:min-w-0 sm:flex-wrap sm:justify-center">
      {portfolioCategories.map((tab) => {
        const isActive = tab.id === activeTab.id;

        return (
          <motion.button
            ref={(node) => {
              tabRefs.current[tab.id] = node;
            }}
            key={tab.id}
            id={`tab-${tab.id}`}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`panel-${tab.id}`}
            onClick={() => handleTabClick(tab.id)}
            className={`
              relative
              shrink-0
              snap-start
              whitespace-nowrap
              overflow-hidden
              rounded-full
              border
              px-4
              py-2
              text-xs
              font-medium
              sm:px-5
              sm:py-2.5
              sm:text-sm

              ${
                isActive
                  ? "border-black text-black"
                  : "border-transparent text-black/50 hover:border-white/10 hover:text-black"
              }
            `}
            whileHover={{
              y: -2,
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.94,
            }}
          >
            {isActive && (
              <motion.span
                layoutId="activePortfolioTab"
                className="
                  absolute
                  inset-0
                  z-0
                  rounded-full
                  border
                  border-white
                  bg-[#01d2d1]/10
                  shadow-[0_0_25px_rgba(168,85,247,0.12)]
                "
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}

            {!isActive && (
              <motion.span
                className="
                  absolute
                  inset-0
                  rounded-full
                  bg-black/5
                "
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            )}

            <span className="relative z-10">
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  </div>

  {/* Scroll indicator */}
  <div className="mt-2 flex justify-center sm:hidden">
    <div className="relative h-0.5 w-20 overflow-hidden rounded-full bg-black/20">
      <motion.div
        className="
          absolute
          left-0
          top-0
          h-full
          w-8
          rounded-full
          bg-[#01d2d1]/70
        "
        animate={{
          x: [0, 48, 0],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  </div>

  {/* Edge fades indicate which direction has more tabs on mobile */}
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute left-0 top-0 z-10 h-[calc(100%-18px)] w-12 bg-linear-to-r from-[#01d2d1]/40 to-transparent transition-opacity duration-200 sm:hidden ${scrollEdges.left ? "opacity-100" : "opacity-0"}`}
  />
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute right-0 top-0 z-10 h-[calc(100%-18px)] w-12 bg-linear-to-l from-[#01d2d1]/40 to-transparent transition-opacity duration-200 sm:hidden ${scrollEdges.right ? "opacity-100" : "opacity-0"}`}
  />
</motion.div>

        {/* Portfolio Cards */}
        <motion.div
          className="mt-5 w-full"
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            delay: 0.5,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
            <motion.div
              key={activeTab.id}
              id={`panel-${activeTab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${activeTab.id}`}
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              transition={{
                duration: 0.35,
              }}
            >
              <PortofolioCard activeFilter={activeTab.projectFilter} />
            </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

export default Portfolio;
