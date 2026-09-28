import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.warsal-portfolio.com"),

  title: {
    default: "Warsal | Graphic Design Portfolio",
    template: "%s | Warsal",
  },

  description:
    "Warsal's graphic design portfolio featuring brand identity, logo design, packaging, 3D Animations,2D Animations, social media, and UI/UX work.",

  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },

  applicationName: "Warsal Portfolio",

  keywords: [
    "graphic designer",
    "brand identity",
    "portfolio",
    "logo design",
    "packaging design",
    "social media design",
    "3D Animations",
    "2D Animations",
  ],
  authors: [{ name: "Warsal" }],
  creator: "Warsal",
  publisher: "Warsal",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Warsal | Graphic Design Portfolio",
    description:
      "Explore Warsal's branding, packaging, 3D Animations, and digital design work.",
    url: "https://www.warsal-portfolio.com/",
    siteName: "Warsal Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/Hero2.png",
        alt: "Warsal graphic design portfolio logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Warsal | Graphic Design Portfolio",
    description:
      "Brand identity, packaging, 3D Animations, social media, and UI/UX work by Warsal.",
    images: ["/Hero2.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="flex min-h-full flex-col bg-[#0a0a0f] text-black"
      >
        {children}
      </body>
    </html>
  );
}
