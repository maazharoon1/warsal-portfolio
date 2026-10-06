import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { siteUrl, siteTitle, siteDescription } from "@/libs/site";
import "./globals.css";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: siteTitle, template: "%s | Warsal" },
  description: siteDescription,
  applicationName: "Warsal Portfolio",
  authors: [{ name: "Warsal", url: siteUrl }],
  creator: "Warsal",
  publisher: "Warsal",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: {
    title: siteTitle, description: siteDescription, siteName: "Warsal Portfolio",
    locale: "en_US", type: "website",
    images: [{ url: "/share-image", width: 1200, height: 630, alt: "Warsal — Graphic Design, Web Development & Animation" }],
  },
  twitter: { card: "summary_large_image", title: siteTitle, description: siteDescription, images: ["/share-image"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={geist.variable + " h-full antialiased"}>
      <body className="flex min-h-full flex-col bg-white text-black">
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
