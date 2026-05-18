"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PixelSticker } from "./PixelSticker";

const links = [
  { href: "/#work", label: "Work", id: "work" as const },
  { href: "/about", label: "About", id: "about" as const },
];

type Props = {
  siteName: string;
  active?: "work" | "about";
};

export function AnabolioNav({ siteName, active: activeProp }: Props) {
  const pathname = usePathname();
  const active = activeProp ?? (pathname === "/about" ? "about" : "work");

  return (
    <header className="sticky top-0 z-50 bg-ana-canvas/95 backdrop-blur-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-5 md:px-8">
        <Link href="/" className="flex items-center gap-2.5 justify-self-start">
          <PixelSticker variant="logo" size={28} />
          <span className="text-base font-bold tracking-tight text-ana-ink md:text-lg">{siteName}</span>
        </Link>

        <nav
          className="flex items-center rounded-full border border-ana-line bg-white p-1 shadow-[0_1px_3px_rgba(15,15,20,0.06)]"
          aria-label="Primary"
        >
          {links.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={item.href}
                className={[
                  "rounded-full px-5 py-2 text-sm font-semibold transition",
                  isActive ? "bg-ana-canvas2 text-ana-ink" : "text-ana-muted hover:text-ana-ink",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="w-8 justify-self-end" aria-hidden />
      </div>
    </header>
  );
}
