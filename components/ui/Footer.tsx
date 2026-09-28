

export function Footer() {
  return (
    <footer className="mx-auto max-w-[1600px] px-5 pb-14 sm:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row gap-10 pt-10 justify-between">
        <div className="lg:col-span-6">
          <p className="label-xs text-gray-800">LET&apos;S WORK TOGETHER</p>

          <a
            href="mailto:Support@warsal-portfolio.com"
            className="mt-4 inline-block text-[clamp(1.35rem,3vw,2.5rem)] leading-none tracking-[-0.02em] text-gray-800 transition-colors hover:text-black"
          >
            Support@warsal-portfolio.com
          </a>
        </div>

     

        <div className="label-xs space-y-2 text-gray-800  lg:col-span-3">
          <p>© {new Date().getFullYear()} Warsal</p>

           {/* <span
          className="label-xs inline-flex items-center gap-2 text-gray-800 transition-colors hover:text-black"
         >
            +1 708 303-8353
          </span>
           */}
        </div>
        
          
      </div>

      <div className="mt-16 h-px origin-left bg-border" />

      <div className="sm:mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-gray-800">
        <a href="#home" id="home" className="inline-block">
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}