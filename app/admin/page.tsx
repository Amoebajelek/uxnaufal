"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FolderOpen, Plus, ArrowUpRight, Pencil } from "lucide-react";
import type { Project } from "@/lib/projects";

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((data) => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Total Proyek", value: projects.length, icon: FolderOpen },
    {
      label: "Featured",
      value: projects.filter((p) => p.tags?.includes("Featured") || p.id === projects[0]?.id).length,
      icon: ArrowUpRight,
    },
  ];

  return (
    <div>
      <div className="mb-10">
        <h1 className="font-display font-extrabold text-3xl tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
          Dashboard
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Selamat datang di CMS uxnaufal
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border p-5"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-2 mb-3">
              <s.icon size={14} style={{ color: "var(--accent)" }} />
              <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--text-muted)" }}>
                {s.label}
              </span>
            </div>
            <div className="font-display font-extrabold text-3xl" style={{ color: "var(--text-primary)" }}>
              {loading ? "—" : s.value}
            </div>
          </div>
        ))}
      </div>

      {/* Quick access */}
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>
          Proyek Terbaru
        </h2>
        <div className="flex gap-3">
          <Link
            href="/admin/portfolio/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:opacity-85"
            style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
          >
            <Plus size={14} />
            Tambah Proyek
          </Link>
          <Link
            href="/admin/portfolio"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:opacity-80"
            style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
          >
            Semua Proyek
          </Link>
        </div>
      </div>

      {/* Project cards */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.slice(0, 5).map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between rounded-2xl border px-5 py-4 group"
              style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: p.accent }}
                />
                <div>
                  <div className="font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                    {p.title}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {p.type} · {p.year}
                  </div>
                </div>
              </div>
              <Link
                href={`/admin/portfolio/${p.id}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border opacity-0 group-hover:opacity-100 transition-all"
                style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
              >
                <Pencil size={11} />
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
