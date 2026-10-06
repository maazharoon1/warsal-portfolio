import Image from "next/image";
import Header from "../ui/header";

export default function Hero() {
  return (
    <div className="relative overflow-hidden md:max-h-screen">
      <Header />
      <div className="relative z-10">
        <div className="relative mx-auto mb-10 mt-30 flex max-w-[95%] flex-col sm:max-w-none md:mb-0 md:mt-0 md:min-h-[calc(100svh-100px)] md:max-w-7xl md:justify-center xl:mx-none">
          <div className="hero-copy relative z-20 ml-5 w-full max-w-3xl space-y-7 sm:space-y-8">
            <div className="space-y-4 sm:space-y-5">
              <h1 className="text-5xl font-medium tracking-tight text-black md:text-6xl lg:text-7xl">
                <span className="block">Warsal</span>
                <span className="block font-thin text-[#008d8c]">Portfolio</span>
              </h1>
              <p className="mr-auto max-w-11/12 text-base leading-relaxed text-gray-600 md:mx-0 md:max-w-lg md:text-xl">
                Graphic design, web development, and animation for your brand. Explore our logos, brand identities, websites, and visual stories.
              </p>
            </div>
          </div>
          <div aria-hidden="true" className="hero-art pointer-events-none absolute inset-x-1 -top-18 bottom-0 z-0 hidden min-h-screen w-full opacity-60 md:left-auto md:right-0 md:block lg:w-1/2">
            <Image src="/heroImage.jpeg" alt="" fill sizes="(max-width: 767px) 1px, (max-width: 1023px) 100vw, 50vw" loading="eager" fetchPriority="high" quality={75} className="object-cover object-center" />
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute right-[15%] top-[25%] z-0 h-72 w-72 rounded-full bg-[#681e99]/5 blur-[100px]" />
        </div>
      </div>
    </div>
  );
}
