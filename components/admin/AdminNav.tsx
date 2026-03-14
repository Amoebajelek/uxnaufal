"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, FolderOpen, Settings,
  LogOut, ChevronDown, ExternalLink, ShieldCheck,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/portfolio", label: "Portofolio", icon: FolderOpen, exact: false },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const [username, setUsername] = useState("admin");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch current username
  useEffect(() => {
    fetch("/api/admin/password")
      .then((r) => r.json())
      .then((d) => { if (d.username) setUsername(d.username); })
      .catch(() => {});
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function handleLogout() {
    setOpen(false);
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  // Avatar initials
  const initials = username.slice(0, 2).toUpperCase();

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center px-6 md:px-10"
      style={{
        backgroundColor: "color-mix(in srgb, var(--bg) 92%, transparent)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-6xl mx-auto w-full flex items-center gap-2">
        {/* Logo */}
        <Link
          href="/admin"
          className="font-display font-extrabold text-base tracking-tight mr-4 shrink-0"
          style={{ color: "var(--text-primary)" }}
        >
          ux<span style={{ color: "var(--accent)" }}>naufal</span>
          <span className="ml-2 text-xs font-normal opacity-40">cms</span>
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

        {/* View site link */}
        <Link
          href="/"
          target="_blank"
          className="text-xs mr-2 transition-opacity hover:opacity-70 hidden md:block"
          style={{ color: "var(--text-muted)" }}
        >
          Lihat Site →
        </Link>

        {/* User dropdown */}
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2.5 pl-1.5 pr-3 py-1.5 rounded-xl transition-all hover:opacity-90"
            style={{
              backgroundColor: open ? "var(--bg-secondary)" : "transparent",
              border: `1px solid ${open ? "var(--border-strong)" : "var(--border)"}`,
            }}
          >
            {/* Avatar */}
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
              style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
            >
              {initials}
            </div>

            {/* Name + role */}
            <div className="text-left hidden sm:block">
              <div className="text-xs font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>
                {username}
              </div>
              <div className="text-[10px] leading-tight" style={{ color: "var(--text-muted)" }}>
                Administrator
              </div>
            </div>

            <ChevronDown
              size={13}
              style={{
                color: "var(--text-muted)",
                transform: open ? "rotate(180deg)" : "none",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {/* Dropdown menu */}
          {open && (
            <div
              className="absolute right-0 top-full mt-2 w-56 rounded-2xl border overflow-hidden shadow-lg"
              style={{
                backgroundColor: "var(--bg-secondary)",
                borderColor: "var(--border)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
              }}
            >
              {/* User info header */}
              <div
                className="px-4 py-3.5 flex items-center gap-3"
                style={{ borderBottom: "1px solid var(--border)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
                  style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
                >
                  {initials}
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                    {username}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                    <ShieldCheck size={10} style={{ color: "var(--accent)" }} />
                    <span className="text-[10px]" style={{ color: "var(--text-muted)" }}>Administrator</span>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <div className="p-1.5 flex flex-col gap-0.5">
                <Link
                  href="/admin/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all hover:opacity-80"
                  style={{
                    backgroundColor: pathname.startsWith("/admin/settings")
                      ? "var(--accent-bg)"
                      : "transparent",
                    color: pathname.startsWith("/admin/settings")
                      ? "var(--accent)"
                      : "var(--text-secondary)",
                  }}
                >
                  <Settings size={14} />
                  Pengaturan Akun
                </Link>

                <Link
                  href="/"
                  target="_blank"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all hover:opacity-80 md:hidden"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <ExternalLink size={14} />
                  Lihat Site
                </Link>

                <div className="h-px mx-1 my-0.5" style={{ backgroundColor: "var(--border)" }} />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm w-full text-left transition-all hover:opacity-80"
                  style={{ color: "#ef4444" }}
                >
                  <LogOut size={14} />
                  Keluar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
