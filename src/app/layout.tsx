import type { Metadata } from "next";
import { Bricolage_Grotesque, Merriweather, Playfair_Display, Space_Mono } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/content/get-content";

const fontMasthead = Playfair_Display({
  subsets: ["latin"],
  weight: "900",
  variable: "--font-masthead",
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

const fontSectionHeader = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "800",
  variable: "--font-section-header",
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
      className={`${fontMasthead.variable} ${fontBodyMain.variable} ${fontLabelMono.variable} ${fontSectionHeader.variable}`}
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
