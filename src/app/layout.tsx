import type { Metadata } from "next";
import localFont from "next/font/local";
import { Merriweather, Space_Mono } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/content/get-content";

/** Large display type — Fibre Vintage from src/font */
const fontDisplay = localFont({
  src: [
    { path: "../font/FibreVintage.woff2", weight: "700", style: "normal" },
    { path: "../font/FibreVintage.woff", weight: "700", style: "normal" },
    { path: "../font/FibreVintage.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

const fontBodyMain = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-body-main",
  display: "swap",
});

const fontLabelMono = Space_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-label-mono",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteContent();
  return {
    title: c.meta.title,
    description: c.meta.description,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBodyMain.variable} ${fontLabelMono.variable}`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
