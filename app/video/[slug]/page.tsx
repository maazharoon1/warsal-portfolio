import Background from "@/components/ui/background";
import PortfolioVideo from "@/components/ui/VideoPlayer";
import { ProjectObject } from "@/libs/projectVariable";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const baseUrl = "https://www.warsal-portfolio.com";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return ProjectObject.filter((project) => project.type === "video").map(
    (project) => ({ slug: project.id })
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = ProjectObject.find(
    (item) => item.id.toLowerCase() === slug.toLowerCase() && item.type === "video"
  );

  if (!project) {
    return { title: "Video Not Found" };
  }

  return {
    title: project.title.trim(),
    description: project.description?.trim() ?? "",
    alternates: { canonical: `/video/${project.id}` },
    openGraph: {
      title: project.title.trim(),
      description: project.description?.trim() ?? "",
      url: `${baseUrl}/video/${project.id}`,
      type: "video.other",
      images: [{ url: "/Hero2.png", alt: `${project.title.trim()} project preview` }],
    },
  };
}

const Video = async ({ params }: PageProps) => {
  const { slug } = await params;

  const project = ProjectObject.find(
    (item) => item.id.toLowerCase() === slug.toLowerCase() && item.type === "video"
  );

  if (!project) {
    notFound();
  }

  return (
    <>
      <Background />

      {/* Local, scoped keyframes — no config or global CSS changes needed */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-container { animation: fadeSlideUp 0.7s cubic-bezier(0.16, 0.8, 0.3, 1) both; }
        .animate-video { animation: fadeIn 0.9s ease-out 0.15s both; }
        .animate-info { animation: fadeSlideUp 0.7s cubic-bezier(0.16, 0.8, 0.3, 1) 0.3s both; }
      `}</style>

      <div className="relative min-h-screen overflow-x-hidden">
        <Link
          href="/"
          className="
            group
            fixed
            left-4
            top-4
            z-50
            inline-flex
            items-center
            gap-1.5
            rounded-full
            border
            border-white/10
            bg-white/40
            px-4
            py-2.5
            text-xs
            sm:text-sm
            text-black/90
            backdrop-blur-xl
            shadow-lg
            shadow-black/20
            transition-all
            duration-300
            hover:bg-white/10
            hover:border-white/20
            hover:-translate-y-0.5
            active:scale-95
            sm:left-6
            sm:top-6
          "
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-0.5">
            ←
          </span>
          Back
        </Link>

        <div
          className="
            animate-container
            relative
            z-10
            mx-auto
            w-[92%]
            sm:w-[90%]
            md:w-[92%]
            max-w-350
            px-4
            py-20
            sm:px-6
            sm:py-24
            md:py-28
          "
        >
          <div
            className="
              flex
              flex-col
              md:flex-row
              gap-6
              md:gap-8
              rounded-2xl
              md:rounded-3xl
              border
              border-white/10
              bg-white/30
              backdrop-blur-2xl
              shadow-2xl
              shadow-black/40
              p-4
              sm:p-6
              md:p-8
            "
          >
            {/* Video */}
            <div className="animate-video w-full  
                   aspect-video
                   md:flex-2">

              <div
                className="
                  relative
                  w-full
                  aspect-video
                  overflow-hidden
                  rounded-xl
                  md:rounded-2xl
                  border
                  border-white/10
                  bg-white/60
                  shadow-lg
                  shadow-black/30
                "
              >
                <PortfolioVideo
                  id={project.video ? project.video : project.id}
                  mainImage={project.mainImage}
                />
              </div>
            </div>

            {/* Info */}
            <div
              className="
                animate-info
                w-full
                md:flex-1
                flex
                flex-col
                justify-center
                gap-3
                px-1
                py-2
                md:py-0
              "
            >
              <span className="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-black/40">
                Project
              </span>
              <h1
                className="
                  font-semibold
                  text-black
                  leading-[1.1]
                  tracking-tight
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  lg:text-[2.75rem]
                "
              >
                {project.title}
              </h1>
              <div className="mt-2 h-px w-12 text-black" />
              <span className="text-background"> {project.description}
</span>
                  <div className="mt-3 text-sm text-black/50">
                  If the video isn&apos;t playing,{" "} 
  <Link
    href={`https://res.cloudinary.com/hcn0f9nu/video/upload/v1786745203/${project.video}.mp4`}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#01d2d1] block sm:inline underline underline-offset-4 hover:text-[#01d2d1]"
  >
    click here to watch it
  </Link>
 </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Video;