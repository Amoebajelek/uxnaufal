"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LangToggle } from "./LangToggle";
import { useLang } from "./LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLang();

  const navLinks = [
    { href: "#works", label: t("nav.works") },
    { href: "#skills", label: t("nav.skills") },
    { href: "#about", label: t("nav.about") },
    { href: "#contact", label: t("nav.contact") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--bg) 88%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="font-display font-extrabold text-lg tracking-tight transition-opacity hover:opacity-70"
            style={{ color: "var(--text-primary)" }}
          >
            ux<span style={{ color: "var(--accent)" }}>naufal</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-normal transition-colors duration-200 hover:opacity-100"
                style={{ color: "var(--text-secondary)" }}
                onClick={() => setMobileOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <LangToggle />
            <ThemeToggle />
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 hover:opacity-85 active:scale-95"
              style={{
                backgroundColor: "var(--accent)",
                color: "#0a0a0a",
              }}
            >
              {t("nav.cta")}
            </a>
            {/* Mobile menu btn */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-full border transition-colors"
              style={{
                borderColor: "var(--border-strong)",
                color: "var(--text-secondary)",
                backgroundColor: "var(--bg-secondary)",
              }}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-40 flex flex-col pt-16 transition-all duration-300 md:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "var(--bg)" }}
      >
        <div className="flex flex-col gap-1 p-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="py-4 text-xl font-display font-semibold border-b transition-colors"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-primary)",
              }}
              onClick={() => setMobileOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="mt-6 text-center py-4 rounded-full font-medium text-sm"
            style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
            onClick={() => setMobileOpen(false)}
          >
            {t("nav.cta")} →
          </a>
        </div>
      </div>
    </>
  );
}
