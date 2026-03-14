import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="px-6 md:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm"
      style={{
        borderTop: "1px solid var(--border)",
        color: "var(--text-muted)",
      }}
    >
      <Link
        href="/"
        className="font-display font-extrabold text-base tracking-tight"
        style={{ color: "var(--text-primary)" }}
      >
        ux<span style={{ color: "var(--accent)" }}>naufal</span>
      </Link>

      <span className="text-xs">
        ©{new Date().getFullYear()} Naufal Abdussyakur · All rights reserved.
      </span>

      <div className="flex items-center gap-6">
        {[
          { label: "LinkedIn", href: "https://www.linkedin.com/in/naufalabdussyakur/" },
          { label: "Instagram", href: "https://www.instagram.com/uxnaufal" },
          { label: "TikTok", href: "https://www.tiktok.com/@uxnaufal" },
        ].map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs transition-opacity hover:opacity-100"
            style={{ color: "var(--text-muted)" }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
