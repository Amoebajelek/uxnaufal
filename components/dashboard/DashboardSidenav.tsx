"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard, FolderOpen, Settings,
  LogOut, ExternalLink, Sun, Moon, Menu, X, ShieldCheck,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard",           label: "Dashboard",  icon: LayoutDashboard, exact: true  },
  { href: "/dashboard/portfolio", label: "Portofolio", icon: FolderOpen,       exact: false },
  { href: "/dashboard/settings",  label: "Pengaturan", icon: Settings,         exact: false },
];

export function DashboardSidenav() {
  const pathname  = usePathname();
  const router    = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const [username, setUsername]   = useState("admin");
  const [mounted,  setMounted]    = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    fetch("/api/admin/password")
      .then((r) => r.json())
      .then((d) => { if (d.username) setUsername(d.username); })
      .catch(() => {});
  }, []);

  // Close mobile nav on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/dashboard/login");
    router.refresh();
  }

  const isDark    = resolvedTheme === "dark";
  const initials  = username.slice(0, 2).toUpperCase();

  // ── Sidebar content (shared between desktop & mobile drawer) ────────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-5 flex items-center justify-between">
        <Link href="/dashboard" className="font-display font-extrabold text-lg tracking-tight" style={{ color: "var(--text-primary)" }}>
          ux<span style={{ color: "var(--accent)" }}>naufal</span>
          <span className="ml-2 text-xs font-normal opacity-40">dashboard</span>
        </Link>
        {/* Close button (mobile only) */}
        <button
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-1 rounded-lg transition-opacity hover:opacity-70"
          style={{ color: "var(--text-muted)" }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 pb-4 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor: active ? "var(--accent-bg)" : "transparent",
                color: active ? "var(--accent)" : "var(--text-secondary)",
                border: active ? "1px solid var(--accent-border)" : "1px solid transparent",
              }}
            >
              <item.icon size={15} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div
        className="px-3 py-3 space-y-1 mt-auto"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {/* View site */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
          style={{ color: "var(--text-muted)" }}
        >
          <ExternalLink size={15} />
          Lihat Site
        </a>

        {/* Light / Dark toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{ color: "var(--text-secondary)" }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
            {isDark ? "Mode Terang" : "Mode Gelap"}
          </button>
        )}

        {/* User card + logout */}
        <div
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl mt-1"
          style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
        >
          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
            style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
          >
            {initials}
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>{username}</div>
            <div className="flex items-center gap-1">
              <ShieldCheck size={9} style={{ color: "var(--accent)" }} />
              <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Administrator</span>
            </div>
          </div>
          {/* Logout */}
          <button
            onClick={handleLogout}
            title="Keluar"
            className="p-1.5 rounded-lg transition-all hover:opacity-70 shrink-0"
            style={{ color: "#ef4444" }}
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop fixed sidebar ── */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 w-60 z-40"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderRight: "1px solid var(--border)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile: topbar + drawer ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg-secondary) 95%, transparent)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link href="/dashboard" className="font-display font-extrabold text-base tracking-tight" style={{ color: "var(--text-primary)" }}>
          ux<span style={{ color: "var(--accent)" }}>naufal</span>
          <span className="ml-2 text-xs font-normal opacity-40">dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          {/* Theme toggle on mobile topbar */}
          {mounted && (
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="p-2 rounded-xl transition-all hover:opacity-70"
              style={{ color: "var(--text-secondary)" }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          )}
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl transition-all hover:opacity-70"
            style={{ color: "var(--text-secondary)" }}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* ── Mobile drawer overlay ── */}
      {mobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <aside
            className="md:hidden fixed left-0 top-0 bottom-0 w-72 z-50 flex flex-col"
            style={{
              backgroundColor: "var(--bg-secondary)",
              borderRight: "1px solid var(--border)",
            }}
          >
            <SidebarContent />
          </aside>
        </>
      )}
    </>
  );
}
