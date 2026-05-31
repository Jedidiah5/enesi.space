"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "#opinion", label: "BIO", icon: "person", active: true },
  { href: "#works", label: "WORK", icon: "folder_open" },
  { href: "#stack", label: "STACK", icon: "terminal" },
  { href: "#pitch", label: "PITCH", icon: "campaign" },
] as const;

function NavIcon({ name }: { name: string }) {
  return <span className="material-symbols-outlined text-xl leading-none">{name}</span>;
}

export function Sidebar({ email }: { email: string }) {
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash || "#opinion");
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <aside className="fixed left-0 top-[80px] z-40 hidden h-[calc(100vh-80px)] w-64 flex-col border-r-2 border-dashed border-outline bg-surface-container-high p-6 lg:flex">
      <div className="mb-8">
        <div className="font-masthead text-[32px] leading-tight text-primary">EDITORIAL BOARD</div>
        <p className="font-label-mono text-xs opacity-60">Vol. {new Date().getFullYear()} Issue 01</p>
      </div>

      <nav className="flex grow flex-col gap-2">
        {links.map((item) => {
          const isActive = hash === item.href || (hash === "" && item.href === "#opinion");
          return (
            <a
              key={item.href}
              href={item.href}
              className={[
                "flex items-center gap-3 p-4 font-label-mono transition-all active:scale-95",
                isActive
                  ? "border-l-4 border-primary bg-secondary-container font-bold text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-container-highest",
              ].join(" ")}
            >
              <NavIcon name={item.icon} />
              {item.label}
            </a>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <a
          href={`mailto:${email}`}
          className="bg-primary p-4 text-center font-bold text-on-primary transition-all hover:bg-on-surface hover:text-on-primary"
        >
          SEND TIP
        </a>
        <Link href="/admin" className="font-label-mono text-[10px] uppercase text-on-surface-variant">
          <span className="material-symbols-outlined align-middle text-sm">history</span> ADMIN
        </Link>
      </div>
    </aside>
  );
}
