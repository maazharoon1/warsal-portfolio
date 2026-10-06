import Link from "next/link";
import { portfolioCategories } from "@/components/section/portfolioCategories";

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1600px] px-5 pb-14 text-gray-800 sm:px-8 lg:px-12">
      <div className="flex flex-col justify-between gap-10 pt-10 md:flex-row">
        <div>
          <p className="text-xs tracking-widest">LET&apos;S WORK TOGETHER</p>
          <a href="mailto:Support@warsal-portfolio.com" className="mt-4 inline-block break-all text-[clamp(1.2rem,3vw,2.5rem)] leading-tight tracking-[-0.02em] transition-colors hover:text-[#008d8c]">Support@warsal-portfolio.com</a>
        </div>
        <p className="text-sm">&copy; {new Date().getFullYear()} Warsal</p>
      </div>
      <nav aria-label="Explore portfolio collections" className="mt-10 flex flex-wrap gap-x-5 gap-y-3 border-t border-gray-200 pt-6">
        {portfolioCategories.map((category) => <Link key={category.id} href={"/work/" + category.id} prefetch={false} className="text-xs leading-relaxed transition-colors hover:text-[#008d8c] hover:underline">{category.label}</Link>)}
      </nav>
      <div className="mt-8 text-[10px] uppercase tracking-[0.2em]">
        <Link href="/#home" className="inline-flex min-h-11 items-center">&#8593; Back to top</Link>
      </div>
    </footer>
  );
}
