"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  LayoutDashboard, FolderOpen, Settings,
  LogOut, ExternalLink, Sun, Moon, Menu, X, ShieldCheck,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { LangToggle } from "@/components/LangToggle";
import { useLang } from "@/components/LanguageContext";

const NAV_ITEM_DEFS = [
  { href: "/dashboard",           labelKey: "dash.nav.dashboard",  icon: LayoutDashboard, exact: true  },
  { href: "/dashboard/portfolio", labelKey: "dash.nav.portfolio",  icon: FolderOpen,       exact: false },
  { href: "/dashboard/settings",  labelKey: "dash.nav.settings",   icon: Settings,         exact: false },
];

interface Props {
  collapsed:  boolean;
  onToggle:   () => void;
}

export function DashboardSidenav({ collapsed, onToggle }: Props) {
  const pathname  = usePathname();
  const router    = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const { t } = useLang();

  const [username,   setUsername]   = useState("admin");
  const [mounted,    setMounted]    = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    fetch("/api/admin/password")
      .then((r) => r.json())
      .then((d) => { if (d.username) setUsername(d.username); })
      .catch(() => {});
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/dashboard/login");
    router.refresh();
  }

  const isDark   = resolvedTheme === "dark";
  const initials = username.slice(0, 2).toUpperCase();

  /* ── Tooltip wrapper (shows label next to icon when collapsed) ─────────── */
  function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
    return (
      <div className="relative group/tip">
        {children}
        {collapsed && (
          <div
            className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3
                        px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap
                        opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150 z-[9999]"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border:          "1px solid var(--border)",
              color:           "var(--text-primary)",
              boxShadow:       "0 4px 12px rgba(0,0,0,.2)",
            }}
          >
            {label}
          </div>
        )}
      </div>
    );
  }

  /* ── Shared sidebar body ───────────────────────────────────────────────── */
  const SidebarContent = ({ inDrawer = false }: { inDrawer?: boolean }) => (
    <div className="flex flex-col h-full overflow-hidden">

      {/* ── Header: logo + toggle ── */}
      <div
        className="h-14 flex items-center shrink-0 px-3"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        {collapsed && !inDrawer ? (
          /* Collapsed: show only avatar / initials as "logo" */
          <div className="flex items-center justify-center w-full">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
              style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
            >
              {initials}
            </div>
          </div>
        ) : (
          /* Expanded: full logo */
          <Link
            href="/dashboard"
            className="font-display font-extrabold text-base tracking-tight flex-1 min-w-0"
            style={{ color: "var(--text-primary)" }}
          >
            ux<span style={{ color: "var(--accent)" }}>naufal</span>
            <span className="ml-2 text-xs font-normal opacity-40">dashboard</span>
          </Link>
        )}

        {/* Close (mobile drawer) */}
        {inDrawer && (
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:opacity-70 ml-2 shrink-0"
            style={{ color: "var(--text-muted)" }}
          >
            <X size={16} />
          </button>
        )}

        {/* Collapse toggle (desktop only) */}
        {!inDrawer && (
          <button
            onClick={onToggle}
            className="hidden md:flex items-center justify-center w-7 h-7 rounded-lg
                       hover:opacity-70 transition-opacity shrink-0"
            style={{
              color:           "var(--text-muted)",
              backgroundColor: "var(--bg-tertiary, var(--bg))",
              border:          "1px solid var(--border)",
              marginLeft:      collapsed ? "auto" : undefined,
            }}
            title={collapsed ? t("dash.sidenav.expand") : t("dash.sidenav.collapse")}
          >
            {collapsed
              ? <ChevronRight size={13} />
              : <ChevronLeft  size={13} />}
          </button>
        )}
      </div>

      {/* ── Nav items ── */}
      <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto overflow-x-hidden">
        {NAV_ITEM_DEFS.map((item) => {
          const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
          const label  = t(item.labelKey);
          return (
            <Tooltip key={item.href} label={label}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium
                           transition-all overflow-hidden"
                style={{
                  backgroundColor: active ? "var(--accent-bg)"     : "transparent",
                  color:           active ? "var(--accent)"         : "var(--text-secondary)",
                  border:          active ? "1px solid var(--accent-border)" : "1px solid transparent",
                  justifyContent:  collapsed && !inDrawer ? "center" : undefined,
                }}
              >
                <item.icon size={15} className="shrink-0" />
                {(!collapsed || inDrawer) && (
                  <span className="truncate">{label}</span>
                )}
              </Link>
            </Tooltip>
          );
        })}
      </nav>

      {/* ── Bottom section ── */}
      <div
        className="px-2 py-2 space-y-0.5 shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {/* View site */}
        <Tooltip label={t("dash.sidenav.viewsite")}>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium
                       transition-all hover:opacity-80 overflow-hidden"
            style={{
              color:          "var(--text-muted)",
              justifyContent: collapsed && !inDrawer ? "center" : undefined,
            }}
          >
            <ExternalLink size={15} className="shrink-0" />
            {(!collapsed || inDrawer) && <span className="truncate">{t("dash.sidenav.viewsite")}</span>}
          </a>
        </Tooltip>

        {/* Theme toggle */}
        {mounted && (
          <Tooltip label={isDark ? t("dash.sidenav.lightmode") : t("dash.sidenav.darkmode")}>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="w-full flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm
                         font-medium transition-all hover:opacity-80 overflow-hidden"
              style={{
                color:          "var(--text-secondary)",
                justifyContent: collapsed && !inDrawer ? "center" : undefined,
              }}
            >
              {isDark ? <Sun size={15} className="shrink-0" /> : <Moon size={15} className="shrink-0" />}
              {(!collapsed || inDrawer) && (
                <span className="truncate">{isDark ? t("dash.sidenav.lightmode") : t("dash.sidenav.darkmode")}</span>
              )}
            </button>
          </Tooltip>
        )}

        {/* Language toggle */}
        <Tooltip label={t("dash.sidenav.language")}>
          <div
            className="flex items-center gap-3 px-2.5 py-1.5 overflow-hidden"
            style={{ justifyContent: collapsed && !inDrawer ? "center" : undefined }}
          >
            <LangToggle />
            {(!collapsed || inDrawer) && (
              <span className="text-sm font-medium truncate" style={{ color: "var(--text-secondary)" }}>
                {t("dash.sidenav.language")}
              </span>
            )}
          </div>
        </Tooltip>

        {/* User card */}
        {collapsed && !inDrawer ? (
          /* Collapsed: just avatar + logout stacked */
          <div className="flex flex-col items-center gap-1 pt-1">
            <Tooltip label={username}>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
              >
                {initials}
              </div>
            </Tooltip>
            <Tooltip label={t("dash.sidenav.logout")}>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-lg transition-all hover:opacity-70"
                style={{ color: "#ef4444" }}
              >
                <LogOut size={14} />
              </button>
            </Tooltip>
          </div>
        ) : (
          /* Expanded: full user card */
          <div
            className="flex items-center gap-3 px-2.5 py-2.5 rounded-xl mt-1"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
              style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
            >
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold truncate" style={{ color: "var(--text-primary)" }}>
                {username}
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck size={9} style={{ color: "var(--accent)" }} />
                <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>{t("dash.sidenav.admin")}</span>
              </div>
            </div>
            <button
              onClick={handleLogout}
              title={t("dash.sidenav.logout")}
              className="p-1.5 rounded-lg transition-all hover:opacity-70 shrink-0"
              style={{ color: "#ef4444" }}
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop fixed sidebar ── */}
      <aside
        className="hidden md:flex flex-col fixed left-0 top-0 bottom-0 z-40 overflow-hidden
                   transition-[width] duration-300 ease-in-out"
        style={{
          width:           collapsed ? 64 : 240,
          backgroundColor: "var(--bg-secondary)",
          borderRight:     "1px solid var(--border)",
        }}
      >
        <SidebarContent />
      </aside>

      {/* ── Mobile topbar ── */}
      <div
        className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center
                   justify-between px-4"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg-secondary) 95%, transparent)",
          backdropFilter:  "blur(16px)",
          borderBottom:    "1px solid var(--border)",
        }}
      >
        <Link
          href="/dashboard"
          className="font-display font-extrabold text-base tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          ux<span style={{ color: "var(--accent)" }}>naufal</span>
          <span className="ml-2 text-xs font-normal opacity-40">dashboard</span>
        </Link>

        <div className="flex items-center gap-2">
          <LangToggle />
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

      {/* ── Mobile drawer ── */}
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
              borderRight:     "1px solid var(--border)",
            }}
          >
            <SidebarContent inDrawer />
          </aside>
        </>
      )}
    </>
  );
}
