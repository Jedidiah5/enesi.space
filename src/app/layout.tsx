import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { getSiteContent } from "@/lib/content/get-content";

const fontBento = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-bento",
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
    <html lang="en" className={fontBento.variable}>
      <body className="min-h-dvh font-bento antialiased">{children}</body>
    </html>
  );
}