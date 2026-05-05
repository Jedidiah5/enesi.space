import Link from "next/link";

const fake = ["File", "Edit", "View", "Help"] as const;

const links = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Win95MenuBar() {
  return (
    <div className="flex flex-wrap items-center gap-0 border-b border-w95-shadow bg-w95-face px-1 py-0.5 text-[13px] shadow-[0_1px_0_#fff]">
      {fake.map((m) => (
        <span
          key={m}
          className="cursor-default px-2 py-0.5 hover:bg-w95-navy hover:text-white"
          tabIndex={-1}
        >
          <span className="underline">{m[0]}</span>
          {m.slice(1)}
        </span>
      ))}
      <span className="mx-1 text-w95-shadow">|</span>
      <nav className="flex flex-wrap items-center gap-1">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="cursor-default px-2 py-0.5 text-w95-link hover:bg-w95-navy hover:text-white hover:no-underline"
          >
            {l.label}
          </a>
        ))}
        <Link
          href="/admin"
          className="cursor-default px-2 py-0.5 text-w95-link hover:bg-w95-navy hover:text-white hover:no-underline"
        >
          Admin
        </Link>
      </nav>
    </div>
  );
}
