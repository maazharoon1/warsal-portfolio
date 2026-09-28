import Hero from "@/components/section/hero";
import Portfolio from "@/components/section/portfolio";
import Background from "@/components/ui/background";
import { Footer } from "@/components/ui/Footer";
import Seperator from "@/components/ui/Seperator";
import { ProjectObject } from "@/libs/projectVariable";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://www.warsal-portfolio.com/#person",
      name: "Warsal",
      url: "https://www.warsal-portfolio.com/",
      knowsAbout: [
        "Brand identity",
        "Logo design",
        "Packaging design",
        "3D Animations",
        "2D Animations",
        "UI/UX design",
        "Emotes",
        "OverLay"
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://www.warsal-portfolio.com/#website",
      url: "https://www.warsal-portfolio.com/",
      name: "Warsal Graphic Design Portfolio",
      publisher: { "@id": "https://www.warsal-portfolio.com/#person" },
    },
    {
      "@type": "WebPage",
      "@id": "https://www.warsal-portfolio.com/#webpage",
      url: "https://www.warsal-portfolio.com/",
      name: "Warsal Graphic Design Portfolio",
      isPartOf: { "@id": "https://www.warsal-portfolio.com/#website" },
      about: { "@id": "https://www.warsal-portfolio.com/#person" },
      mainEntity: {
        "@type": "ItemList",
        numberOfItems: ProjectObject.length,
        itemListElement: ProjectObject.map((project, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: project.title.trim(),
          description: project.description?.trim() ?? "",
        })),
      },
    },
  ],
};

export default function Home() {
  return (
    <div className="relative z-0 min-h-screen overflow-x-hidden bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Background />

      <div className="relative z-10 ">
        <section id="home" className="mb-20 md:mb-10">
          <Hero />
        </section>

        <Seperator className="mb-10 md:-mt-20 " />

        <section id="portfolio">
          <Portfolio />
        </section>

        <Seperator className="mt-15" />

        <Footer />
      </div>
    </div>
  );
}
