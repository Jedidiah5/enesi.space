type Social = { label: string; href: string };

type Props = {
  socials: Social[];
  email?: string;
  className?: string;
};

function IconSmile() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="9" cy="10" r="1" fill="currentColor" />
      <circle cx="15" cy="10" r="1" fill="currentColor" />
      <path d="M8 14c1.2 1.5 2.5 2 4 2s2.8-.5 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconLinkedIn() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M6.5 8.5h3v9h-3v-9zm1.5-4.5a1.75 1.75 0 110 3.5 1.75 1.75 0 010-3.5zM10 8.5h2.9v1.2h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.6v4.74h-3.1v-4.2c0-1-.02-2.28-1.39-2.28-1.4 0-1.61 1.1-1.61 2.22v4.26H10V8.5z" />
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IconGitHub() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.32 6.84 9.67.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.62-3.37-1.36-3.37-1.36-.45-1.17-1.12-1.48-1.12-1.48-.92-.64.07-.63.07-.63 1.02.07 1.55 1.07 1.55 1.07.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.32.1-2.74 0 0 .84-.27 2.75 1.02A9.3 9.3 0 0112 6.84c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.42.2 2.48.1 2.74.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.8 0 .27.18.59.69.49A10.03 10.03 0 0022 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function iconFor(label: string) {
  const l = label.toLowerCase();
  if (l.includes("linkedin")) return IconLinkedIn;
  if (l.includes("instagram")) return IconInstagram;
  if (l.includes("github")) return IconGitHub;
  return null;
}

export function SocialIcons({ socials, email, className = "" }: Props) {
  const withHref = socials.filter((s) => s.href);

  return (
    <div className={`flex items-center gap-4 text-ana-ink/50 ${className}`.trim()}>
      {email ? (
        <a href={`mailto:${email}`} className="transition hover:text-ana-ink" aria-label="Email">
          <IconSmile />
        </a>
      ) : (
        <span className="text-ana-ink/40" aria-hidden>
          <IconSmile />
        </span>
      )}
      {withHref.map((s) => {
        const Icon = iconFor(s.label);
        return (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-ana-ink"
            aria-label={s.label}
          >
            {Icon ? <Icon /> : <span className="text-xs font-semibold">{s.label}</span>}
          </a>
        );
      })}
    </div>
  );
}
