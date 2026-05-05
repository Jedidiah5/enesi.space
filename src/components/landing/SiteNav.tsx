import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-crt-border bg-crt-bg/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Link href="/" className="font-display text-sm font-bold tracking-[0.25em] text-crt-accent">
          ENESI.SYS
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-4 text-xs uppercase tracking-[0.2em] text-crt-dim md:gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-crt-accent">
              {l.label}
            </a>
          ))}
          <Link
            href="/admin"
            className="rounded border border-crt-border px-2 py-1 text-crt-amber hover:border-crt-accent hover:text-crt-accent"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
