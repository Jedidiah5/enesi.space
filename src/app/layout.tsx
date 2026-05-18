import type { Metadata } from "next";
import { Manrope, Rubik_Bubbles } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/content/get-content";

const fontBody = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const fontDisplay = Rubik_Bubbles({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
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
    <html lang="en" className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body className="min-h-dvh font-body antialiased">{children}</body>
    </html>
  );
}