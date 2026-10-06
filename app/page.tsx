import type { Metadata } from "next";
import Hero from "@/components/section/hero";
import Portfolio from "@/components/section/portfolio";
import Background from "@/components/ui/background";
import { Footer } from "@/components/ui/Footer";
import Seperator from "@/components/ui/Seperator";
import { getPortfolioProjects } from "@/libs/portfolio-data";
import { absoluteUrl, jsonLd, siteTitle, siteDescription } from "@/libs/site";

export const metadata: Metadata = { alternates: { canonical: "/" }, openGraph: { title: siteTitle, description: siteDescription, url: "/", type: "website", siteName: "Warsal Portfolio", images: [{ url: "/share-image", width: 1200, height: 630 }] } };

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person", "@id": absoluteUrl("/#person"), name: "Warsal", url: absoluteUrl(),
      knowsAbout: ["Graphic design", "Brand identity", "Logo design", "Packaging design", "Web development", "2D animation", "3D animation"],
    },
    {
      "@type": "WebSite", "@id": absoluteUrl("/#website"), name: "Warsal Portfolio", url: absoluteUrl(),
      publisher: { "@id": absoluteUrl("/#person") },
    },
    {
      "@type": "CollectionPage", "@id": absoluteUrl("/#webpage"), name: siteTitle, description: siteDescription,
      url: absoluteUrl(), isPartOf: { "@id": absoluteUrl("/#website") }, about: { "@id": absoluteUrl("/#person") },
    },
  ],
};

export default function Home() {
  return (
    <div className="relative z-0 min-h-screen overflow-x-hidden bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <Background />
      <div className="relative z-10">
        <main id="main-content" tabIndex={-1}>
          <section id="home" className="mb-20 md:mb-10"><Hero /></section>
          <Seperator className="mb-10 md:-mt-20" />
          <section id="portfolio" className="scroll-mt-6"><Portfolio projects={getPortfolioProjects()} /></section>
          <Seperator className="mt-15" />
        </main>
        <Footer />
      </div>
    </div>
  );
}
