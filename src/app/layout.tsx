import type { Metadata } from "next";
import "./globals.css";
import { getSiteContent } from "@/lib/content/get-content";

export async function generateMetadata(): Promise<Metadata> {
  const c = await getSiteContent();
  return {
    title: c.meta.title,
    description: c.meta.description,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh font-win text-w95-ink">{children}</body>
    </html>
  );
}
