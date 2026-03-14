"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, FolderOpen, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/portfolio", label: "Portofolio", icon: FolderOpen, exact: false },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-10"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg) 92%, transparent)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto w-full flex items-center gap-6">
        {/* Logo */}
        <Link
          href="/admin"
          className="font-display font-extrabold text-base tracking-tight mr-4"
          style={{ color: "var(--text-primary)" }}
        >
          ux<span style={{ color: "var(--accent)" }}>naufal</span>
          <span className="ml-2 text-xs font-normal opacity-50">cms</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1 flex-1">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
                style={{
                  backgroundColor: active ? "var(--accent-bg)" : "transparent",
                  color: active ? "var(--accent)" : "var(--text-muted)",
                  border: active ? "1px solid var(--accent-border)" : "1px solid transparent",
                }}
              >
                <item.icon size={13} />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* View site + logout */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs transition-opacity hover:opacity-70"
            style={{ color: "var(--text-muted)" }}
          >
            Lihat Site →
          </Link>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:opacity-80"
            style={{
              backgroundColor: "rgba(239,68,68,0.08)",
              color: "#ef4444",
              border: "1px solid rgba(239,68,68,0.15)",
            }}
          >
            <LogOut size={12} />
            Keluar
          </button>
        </div>
      </div>
    </nav>
  );
}
