import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "72px", background: "#10191b", color: "#ffffff", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", color: "#01d2d1", fontSize: 26, letterSpacing: 6 }}>SELECTED WORK</div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", fontSize: 112, fontWeight: 700, letterSpacing: -5 }}>Warsal</div>
        <div style={{ display: "flex", fontSize: 38, color: "#7cdedb", marginTop: 12 }}>Design. Development. Animation.</div>
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #345456", paddingTop: 26, fontSize: 24 }}>Brand identities, websites, and visual stories.</div>
    </div>,
    { width: 1200, height: 630 },
  );
}
