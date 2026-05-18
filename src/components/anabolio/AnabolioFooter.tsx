import Link from "next/link";

type Props = {
  name: string;
  roleLine?: string;
  note?: string;
  disclaimer?: string;
  socials: { label: string; href: string }[];
};

export function AnabolioFooter({ name, roleLine, note, disclaimer, socials }: Props) {
  const socialWithHref = socials.filter((s) => s.href);

  return (
    <footer className="border-t border-ana-line/50 bg-ana-canvas2/50 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="font-display text-2xl text-ana-ink md:text-3xl">{name}</p>
            {roleLine ? <p className="mt-1 text-sm font-semibold text-ana-muted">{roleLine}</p> : null}
            {note ? <p className="mt-6 max-w-md text-sm leading-relaxed text-ana-muted">{note}</p> : null}
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="#about" className="text-sm font-semibold text-ana-ink/80 hover:text-ana-accent">
              About
            </Link>
            {socialWithHref.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-ana-ink/80 hover:text-ana-accent"
              >
                {s.label}
              </a>
            ))}
            <Link href="/admin" className="text-sm font-medium text-ana-muted/70 hover:text-ana-muted">
              Admin
            </Link>
          </nav>
        </div>

        {disclaimer ? (
          <p className="mt-12 max-w-2xl text-xs leading-relaxed text-ana-muted/80">
            <span className="font-bold text-ana-ink">Disclaimer!</span> {disclaimer}
          </p>
        ) : null}

        <p className="mt-8 text-center text-xs text-ana-muted/60">© {new Date().getFullYear()} {name}</p>
      </div>
    </footer>
  );
}
