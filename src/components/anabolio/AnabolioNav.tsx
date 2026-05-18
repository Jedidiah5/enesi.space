"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { PixelSticker } from "./PixelSticker";

type NavLink = { href: string; label: string; id: string };

const links: NavLink[] = [
  { href: "#work", label: "Work", id: "work" },
  { href: "#about", label: "About", id: "about" },
];

type Props = {
  siteName: string;
};

function activeFromHash(hash: string): string {
  if (hash === "#about") return "about";
  return "work";
}

export function AnabolioNav({ siteName }: Props) {
  const [active, setActive] = useState("work");

  const sync = useCallback(() => {
    if (typeof window === "undefined") return;
    setActive(activeFromHash(window.location.hash));
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [sync]);

  return (
    <header className="sticky top-0 z-50 bg-ana-canvas/95 backdrop-blur-sm">
      <motion className="mx-auto grid max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-5 py-5 md:px-8">
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
              <a
                key={item.id}
                href={item.href}
                onClick={() => setActive(item.id)}
                className={[
                  "rounded-full px-5 py-2 text-sm font-semibold transition",
                  isActive ? "bg-ana-canvas2 text-ana-ink" : "text-ana-muted hover:text-ana-ink",
                ].join(" ")}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="justify-self-end w-8" aria-hidden />
      </motion>
    </header>
  );
}

function motion({ className, children }: { className?: string; children: React.ReactNode }) {
  return <motion className={className}>{children}</motion>;
}
