import { cn } from "@/libs/utils";

interface BackgroundProps { className?: string; children?: React.ReactNode; }

export default function Background({ className, children }: BackgroundProps) {
  return (
    <div className={cn("pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white", className)}>
      <div aria-hidden="true" className="absolute inset-0" style={{ backgroundImage: "radial-gradient(ellipse at 0% 25%, #01d2d122, transparent 55%), radial-gradient(ellipse at 100% 100%, #231f2014, transparent 55%), radial-gradient(ellipse at 50% 50%, #01d2d115, transparent 40%)" }} />
      <div aria-hidden="true" className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)", backgroundSize: "60px 60px" }} />
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  );
}
