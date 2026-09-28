"use client";

import { sortProject } from "@/libs/sortProject";
import { CldImage } from "next-cloudinary";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ImageZoom from "./zoomIn";
import CloudinaryPDFViewer from "./CloudinaryPdfViewer";
import PortfolioVideo from "./VideoPlayer";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ImagePopupProps {
  id: string;
  onClose?: () => void;
}

const ImagePopup = ({ id, onClose }: ImagePopupProps) => {
  const router = useRouter()
  const project = sortProject(id);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [activeImage, setActiveImage] = useState(0);
  const [direction, setDirection] = useState(1);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  const images = project
    ? [project.mainImage, ...(project.coverImages || [])]
    : [];

  // Reset active image when another project opens
  useEffect(() => {
    setActiveImage(0);
  }, [id]);

  // ESC + body scroll lock + focus management
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        if (onClose) {
    onClose();
  } else {
    router.back();
  }
      
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setDirection(1);
        setActiveImage((prev) =>
          prev === images.length - 1 ? 0 : prev + 1
        );
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setDirection(-1);
        setActiveImage((prev) =>
          prev === 0 ? images.length - 1 : prev - 1
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [project, onClose, images.length]);

  if (!project) return null;

  const nextImage = () => {
    setDirection(1);

    setActiveImage((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setDirection(-1);

    setActiveImage((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const imageVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 80 : -80,
      scale: 0.96,
      filter: "blur(8px)",
    }),

    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: "blur(0px)",
    },

    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -80 : 80,
      scale: 0.96,
      filter: "blur(8px)",
    }),
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
      tabIndex={-1}
      ref={dialogRef}
      className="
        fixed
        inset-0
        z-100
        flex
        items-center
        justify-center
        bg-white/40
        p-3
        backdrop-blur-2xl
        sm:p-5
        lg:p-8
      "
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      transition={{
        duration: 0.35,
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
        if (onClose) {
    onClose();
  } else {
    router.back();
  }
        }
      }}
    >
      {/* Ambient Glow */}
      <motion.div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          -z-10
          h-125
          w-125
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#01d2d1]/30
          blur-[150px]
        "
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Close Button */}
      <motion.button
        ref={closeButtonRef}
        type="button"
        aria-label="Close project"
        onClick={handleClose}
        className="
          absolute
          right-4
          top-7
          z-120
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-full
          border
          border-white/10
          bg-black/10
          text-xl
          text-black/80
          shadow-xl
          backdrop-blur-xl
          sm:right-6
          sm:top-6
        "
        initial={{
          opacity: 0,
          scale: 0.7,
          rotate: -45,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          rotate: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 0.45,
          type: "spring",
          stiffness: 250,
          damping: 18,
        }}
        whileHover={{
          scale: 1.1,
          rotate: 90,
          backgroundColor: "rgba(168,85,247,0.25)",
          borderColor: "rgba(168,85,247,0.5)",
        }}
        whileTap={{
          scale: 0.9,
        }}
      >
        ×
      </motion.button>

      {/* Main Modal */}
      
      <motion.div
        className="
          relative
          flex
          h-[94vh]
          w-full
          max-w-375
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          
          backdrop-blur-2xl
          shadow-[0_30px_100px_rgba(0,0,0,0.7)]
          lg:h-[88vh]
          lg:flex-row
        "
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.94,
          filter: "blur(10px)",
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
        }}
        exit={{
          opacity: 0,
          y: 25,
          scale: 0.94,
          filter: "blur(10px)",
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        {/* ================= LEFT ================= */}
        
        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          {/* Top Bar */}
          <motion.div
            className="
              flex
              items-center
              justify-between
              border-b
              border-white/10
              px-4
              py-3
              sm:px-6
            "
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-[#01d2d1] shadow-[0_0_12px_4px_rgba(168,85,247,0.5)]" />

              <span className="text-[12px] uppercase tracking-[0.25em] text-black/40">
                {project.filter}
              </span>
            </div>

            <span className="text-xs text-black/40">
              {String(activeImage + 1).padStart(2, "0")}
              <span className="mx-1 text-black/20">/</span>
              {String(images.length).padStart(2, "0")}
            </span>
          </motion.div>

          {/* Image Area */}
          {project.type == "pdf"  ? <>
                <CloudinaryPDFViewer 
        publicId={project.mainImage} 
      />
              </> 
        :  <div className="relative min-h-0 flex-1 overflow-hidden p-3 sm:p-5 lg:p-7">
            <div className="
              relative
              md:h-full
              h-[95%]
              
              w-full
              overflow-hidden
              rounded-xl
              border
              border-[#01d2d1]/20
              bg-white/50
              backdrop-blur-3xl
            ">
              {/* Image */}
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  key={images[activeImage]}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.25,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute inset-0"
                >
                <ImageZoom
  src={images[activeImage]}
  alt={`${project.title} ${activeImage + 1}`}
/>  
                </motion.div>
              </AnimatePresence>

              {/* Image Overlay Gradient */}
              <div className="
                pointer-events-none
                absolute
                inset-0
                bg-linear-to-t
                from-black/20
                via-transparent
                to-black/10
              " />

              {/* Previous */}
              {images.length > 1 && (
                <motion.button
                  type="button"
                  aria-label="Previous image"
                  onClick={previousImage}
                  className="
                    absolute
                    hidden 
                    left-3
                    top-1/2
                    z-20
                    md:flex
                    h-11
                    w-11
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/30
                    text-lg
                    text-white

                    backdrop-blur-xl
                    sm:left-5
                  "
                  whileHover={{
                    x: -3,
                    scale: 1.1,
                    backgroundColor: "#01d2d1",
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                >
                  ←
                </motion.button>
              )}

              {/* Next */}
              {images.length > 1 && (
                <motion.button
                  type="button"
                  aria-label="Next image"
                  onClick={nextImage}
                  className="
                  hidden
                    absolute
                    right-3
                    top-1/2
                    z-20
                    md:flex
                    h-11
                    w-11
                    -translate-y-1/2
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    bg-white/30
                    text-lg
                    text-white
                    backdrop-blur-xl
                    sm:right-5
                  "
                  whileHover={{
                    x: 3,
                    scale: 1.1,
                    backgroundColor: "#01d2d1",
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                >
                  →
                </motion.button>
              )}
            </div>
          </div>
}
          {/* Thumbnails */}
          {images.length > 1 && (
            <motion.div
              className="
                flex
                gap-2
                overflow-x-auto
                border-t
                border-white/10
                px-4
                py-3
                sm:gap-3
                sm:px-6
                sm:py-4
              "
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.4,
              }}
            >
              {images.map((image, index) => (
                <motion.button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() => {
                    setDirection(index > activeImage ? 1 : -1);
                    setActiveImage(index);
                  }}
                  className={`
                    relative
                    h-14
                    w-20
                    shrink-0
                    overflow-hidden
                    rounded-lg
                    border
                    sm:h-16
                    sm:w-24
                    ${
                      activeImage === index
                        ? "border-[#01d2d1] "
                        : "border-white/10 opacity-50 hover:opacity-100"
                    }
                  `}
                  whileHover={{
                    y: -4,
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.95,
                  }}
                >
              
                  <CldImage
                    src={image}
                    alt={`${project.title} thumbnail ${index + 1}`}
                    fill
                    sizes="(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 12vw"
                    quality="auto"
                    format="auto"
                    loading="lazy"
                    className={project.filter === "Banners" ? "object-contain" : "object-cover"}
                  />
              
                  {activeImage === index && (
                    <motion.div
                      layoutId="activeThumbnail"
                      className="absolute inset-0 border-2 border-[#01d2d1] rounded-lg"
                    />
                  )}
                </motion.button>
              ))}

            </motion.div>
          )}
        </div>

        {/* ================= RIGHT ================= */}
       {project.type && (
  project.type === "image" || project.type === "video"
) && (
               <motion.aside
          className={`
            w-full
            shrink-0
            overflow-y-auto
            border-t
            border-white/10
            bg-black/2
            p-5
            sm:p-7
            lg:w-85
            lg:border-l
            lg:border-t-0
            lg:p-8
          `}
          initial={{
            opacity: 0,
            x: 30,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            delay: 0.25,
            duration: 0.5,
          }}
        >
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#01d2d1]">
              Project Information
            </p>

            <h2 className="
              mt-3
              text-2xl
              font-medium
              tracking-tight
              text-black
              sm:text-3xl
            ">
              {project.title}
            </h2>
          </motion.div>

          {/* Description */}
          {project.description && (
            <motion.p
              className="mt-5 text-sm leading-6 text-black/50"
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.45,
              }}
            >
              {project.description}
            </motion.p>
          )}



          {/* Divider */}
          <motion.div
            className="my-7 h-px bg-black/10"
            initial={{
              scaleX: 0,
              transformOrigin: "left",
            }}
            animate={{
              scaleX: 1,
            }}
            transition={{
              delay: 0.5,
              duration: 0.5,
            }}
          />

          {/* Details */}
         {project.type && project.type == "video" ?    
            <div className="mt-3  text-sm text-black/50">
  If the video isn't playing,{" "} 
  <div>
  <Link
    href={`https://res.cloudinary.com/hcn0f9nu/video/upload/v1786745203/${project.video}.mp4`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#01d2d1] underline underline-offset-4 hover:text-[#01d2d1]"
  >
    click here to watch it
  </Link>
 </div>
  .
</div> :
          <div className="space-y-6 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.55 }}
            >
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/30">
                Category
              </p>

              <p className="mt-2 text-sm text-black">
                {project.filter}
              </p>
            </motion.div>

          </div>
}

          {/* Bottom Hint */}
     
        </motion.aside>
)}
      </motion.div>

    </motion.div>
  );
};

export default ImagePopup;
