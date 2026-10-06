import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolioCategories } from "@/components/section/portfolioCategories";
import PortfolioCard from "@/components/section/ProjectCard";
import WebDevGrid from "@/components/section/WebDevGrid";
import Background from "@/components/ui/background";
import { Footer } from "@/components/ui/Footer";
import { getPortfolioProjects } from "@/libs/portfolio-data";
import { categoryDescriptions } from "@/libs/category-copy";
import { absoluteUrl, jsonLd } from "@/libs/site";

interface Props { params: Promise<{ category: string }> }
export const dynamicParams = false;
export function generateStaticParams() { return portfolioCategories.map((category) => ({ category: category.id })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category: id } = await params;
  const category = portfolioCategories.find((item) => item.id === id);
  if (!category) return { title: "Collection not found", robots: { index: false } };
  const title = category.label + " Portfolio";
  const description = categoryDescriptions[id];
  const url = "/work/" + id;
  return {
    title, description, alternates: { canonical: url },
    openGraph: { title: title + " | Warsal", description, url, type: "website", siteName: "Warsal Portfolio", images: [{ url: "/share-image", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: title + " | Warsal", description, images: ["/share-image"] },
  };
}

export default async function Collection({ params }: Props) {
  const { category: id } = await params;
  const category = portfolioCategories.find((item) => item.id === id);
  if (!category) notFound();
  const projects = getPortfolioProjects(category.projectFilter);
  const path = "/work/" + id;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "CollectionPage", "@id": absoluteUrl(path), url: absoluteUrl(path), name: category.label + " Portfolio", description: categoryDescriptions[id], isPartOf: { "@id": absoluteUrl("/#website") } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Portfolio", item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: category.label, item: absoluteUrl(path) },
      ] },
    ],
  };
  return (
    <div className="relative min-h-screen bg-white">
      <Background />
      <main id="main-content" tabIndex={-1} className="relative z-10 mx-auto max-w-350 px-4 py-10 sm:px-6 lg:px-8">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
        <nav aria-label="Breadcrumb" className="mb-10 flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:underline">Warsal</Link><span aria-hidden="true">/</span><span aria-current="page">{category.label}</span>
        </nav>
        <header className="mb-8 max-w-3xl">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">{category.label} Portfolio</h1>
          <p className="mt-5 text-base leading-relaxed text-gray-600">{categoryDescriptions[id]}</p>
          <Link href={"/#" + id} className="mt-5 inline-flex min-h-11 items-center text-sm text-[#007a79] underline underline-offset-4">Explore all portfolio categories</Link>
        </header>
        {id === "webdev" ? <WebDevGrid projects={projects} /> : <PortfolioCard projects={projects} activeFilter={category.projectFilter} showAll />}
      </main>
      <div className="relative z-10"><Footer /></div>
    </div>
  );
}
