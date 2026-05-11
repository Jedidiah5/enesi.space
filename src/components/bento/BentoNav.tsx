import Link from "next/link";

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

type Props = { siteName: string };

export function BentoNav({ siteName }: Props) {
  const short = siteName.split(/\s+/)[0] || siteName;

  return (
    <header className="sticky top-0 z-50 border-b border-bento-line/50 bg-bento-canvas/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 md:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight text-bento-ink">
          {short}
          <span className="text-bento-accent">.</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-bento-muted transition hover:bg-bento-tile hover:text-bento-ink"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/admin"
            className="ml-1 rounded-full border border-bento-line bg-bento-tile px-3 py-1.5 text-xs font-medium text-bento-ink shadow-sm transition hover:border-bento-accent/40 hover:text-bento-accent"
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
