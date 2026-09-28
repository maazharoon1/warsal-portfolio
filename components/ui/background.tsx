import { cn } from "@/libs/utils";

interface BackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export default function Background({
  className,
  children,
}: BackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden bg-white",
        className
      )}
    >
      <div className="absolute -left-32 top-20 h-125 w-125 rounded-full bg-[#01d2d1]/20 blur-[140px]" />
      <div className="absolute right-0 bottom-0 h-125 w-125 rounded-full bg-[#231f20]/10 blur-[140px]" />
      <div className="absolute left-1/2 top-1/2 h-75 w-75 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#01d2d1]/20 blur-[120px]" />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right,#000 1px,transparent 1px),
            linear-gradient(to bottom,#000 1px,transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {children && (
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      )}
    </div>
  );
}