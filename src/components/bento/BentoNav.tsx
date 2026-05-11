"use client";

import type { CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const ACCENT = "#c45c3e";

const links: { href: string; label: string; id: string }[] = [
  { href: "/", label: "Home", id: "home" },
  { href: "#projects", label: "Works", id: "works" },
  { href: "#about", label: "About", id: "about" },
  { href: "#services", label: "Services", id: "services" },
  { href: "#contact", label: "Contact", id: "contact" },
];

type Props = {
  siteName: string;
  /** Primary pill button (e.g. Hire Me) */
  ctaLabel?: string;
};

function normalizeHash() {
  if (typeof window === "undefined") return "";
  const h = window.location.hash;
  return h || "";
}

function activeId(pathname: string, hash: string): string {
  if (pathname !== "/") return "";
  const h = hash || "";
  if (h === "" || h === "#") return "home";
  if (h === "#projects") return "works";
  if (h === "#about") return "about";
  if (h === "#services") return "services";
  if (h === "#contact") return "contact";
  return "";
}

export function BentoNav({ siteName, ctaLabel = "Hire Me" }: Props) {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  const syncHash = useCallback(() => {
    setHash(normalizeHash());
  }, []);

  useEffect(() => {
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [syncHash]);

  const brand = (siteName.split(/\s+/)[0] || siteName).toUpperCase();
  const current = activeId(pathname, hash);

  return (
    <header className="sticky top-0 z-50 flex justify-center px-4 pb-2 pt-4 md:px-6 md:pt-5">
      <div
        className="liquid-nav flex w-full max-w-4xl items-center gap-3 rounded-full border border-white/[0.12] px-4 py-2.5 backdrop-blur-2xl md:gap-5 md:px-6 md:py-3"
        style={
          {
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.06) 100%)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(0,0,0,0.2)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          } as CSSProperties
        }
      >
        <Link
          href="/"
          className="shrink-0 text-sm font-bold tracking-[0.12em] transition hover:opacity-90"
          style={{ color: ACCENT }}
        >
          {brand}
        </Link>

        <nav className="flex min-w-0 flex-1 items-center justify-center gap-1 overflow-x-auto sm:gap-2 md:gap-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {links.map((item) => {
            const isActive = current === item.id;
            const isHome = item.id === "home";
            const className = [
              "relative shrink-0 whitespace-nowrap px-2 py-1 text-sm font-medium transition md:px-2.5",
              isActive ? "" : "text-zinc-400 hover:text-zinc-200",
            ].join(" ");

            const style = isActive ? ({ color: ACCENT } as const) : undefined;

            const underline = isActive ? (
              <span
                className="pointer-events-none absolute inset-x-1.5 -bottom-0.5 h-0.5 rounded-full md:inset-x-2"
                style={{ backgroundColor: ACCENT }}
                aria-hidden
              />
            ) : null;

            return isHome ? (
              <Link
                key={item.id}
                href="/"
                className={className}
                style={style}
                onClick={(e) => {
                  if (pathname === "/" && typeof window !== "undefined" && window.location.hash) {
                    e.preventDefault();
                    window.history.pushState(null, "", "/");
                    setHash("");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
              >
                {item.label}
                {underline}
              </Link>
            ) : (
              <a key={item.id} href={item.href} className={className} style={style}>
                {item.label}
                {underline}
              </a>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-2 md:gap-3">
          <Link
            href="/admin"
            className="hidden rounded-full px-2 py-1 text-[11px] font-medium text-zinc-500 transition hover:text-zinc-300 sm:inline"
          >
            Admin
          </Link>
          <a
            href="#contact"
            className="rounded-full px-4 py-2 text-xs font-bold tracking-tight text-white shadow-md transition hover:brightness-110 sm:text-sm"
            style={{ backgroundColor: ACCENT }}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
