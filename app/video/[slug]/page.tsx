import type { Metadata } from "next";
import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import Background from "@/components/ui/background";
import PortfolioVideo from "@/components/ui/VideoPlayer";
import { Footer } from "@/components/ui/Footer";
import { ProjectObject } from "@/libs/projectVariable";
import { portfolioCategories } from "@/components/section/portfolioCategories";
import { absoluteUrl, jsonLd, shortDescription } from "@/libs/site";
import { posterUrl, videoUrl } from "@/libs/media";

interface PageProps { params: Promise<{ slug: string }> }
const findVideo = (slug: string) => ProjectObject.find((project) => project.type === "video" && project.id.toLowerCase() === slug.toLowerCase());

export function generateStaticParams() {
  return ProjectObject.filter((project) => project.type === "video").map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = findVideo(slug);
  if (!project) return { title: "Video not found", robots: { index: false, follow: false } };
  const title = project.title.trim();
  const description = shortDescription(project.description);
  const path = "/video/" + project.id;
  const image = posterUrl(project.mainImage);
  return {
    title, description, alternates: { canonical: path },
    openGraph: { title: title + " | Warsal", description, url: absoluteUrl(path), type: "video.other", siteName: "Warsal Portfolio", images: [{ url: image, width: 1200, height: 630, alt: title + " animation preview" }] },
    twitter: { card: "summary_large_image", title: title + " | Warsal", description, images: [image] },
  };
}

export default async function Video({ params }: PageProps) {
  const { slug } = await params;
  const project = findVideo(slug);
  if (!project) notFound();
  if (slug !== project.id) permanentRedirect("/video/" + project.id);
  const category = portfolioCategories.find((item) => item.projectFilter === project.filter);
  const categoryPath = category ? "/work/" + category.id : "/";
  const mediaId = project.video || project.id;
  const title = project.title.trim();
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork", "@id": absoluteUrl("/video/" + project.id),
        name: title, description: project.description?.trim(), url: absoluteUrl("/video/" + project.id),
        image: posterUrl(project.mainImage), creator: { "@type": "Person", name: "Warsal", url: absoluteUrl("/") },
      },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Portfolio", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: category?.label || "Work", item: absoluteUrl(categoryPath) },
        { "@type": "ListItem", position: 3, name: title, item: absoluteUrl("/video/" + project.id) },
      ] },
    ],
  };
  return (
    <div className="relative min-h-screen bg-white">
      <Background />
      <main id="main-content" tabIndex={-1} className="relative z-10 mx-auto max-w-350 px-4 py-10 sm:px-6 lg:px-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:underline">Warsal</Link><span aria-hidden="true">/</span>
          <Link href={categoryPath} className="hover:underline">{category?.label || "Projects"}</Link><span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <article className="grid items-start gap-7 rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-lg sm:p-6 lg:grid-cols-[minmax(0,2fr)_minmax(260px,1fr)] lg:gap-10 lg:p-8">
          <PortfolioVideo key={mediaId} id={mediaId} mainImage={project.mainImage} title={title} />
          <div className="flex flex-col gap-5">
            <p className="text-xs uppercase tracking-widest text-[#007a79]">{project.filter}</p>
            <h1 className="text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
            <p className="text-base leading-relaxed text-gray-600">{project.description}</p>
            <a href={videoUrl(mediaId)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-sm text-[#007a79] underline underline-offset-4">Open video directly &#8599;</a>
          </div>
        </article>
      </main>
      <div className="relative z-10"><Footer /></div>
    </div>
  );
}
