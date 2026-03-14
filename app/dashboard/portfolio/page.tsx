"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/projects";

export default function AdminPortfolioList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  async function load() {
    const res = await fetch("/api/admin/projects");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Hapus "${title}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    await load();
    setDeleting(null);
  }

  return (
    <div>
      <div className="flex items-start justify-between mb-10 gap-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
            Portofolio
          </h1>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Kelola semua proyek portofolio
          </p>
        </div>
        <Link
          href="/dashboard/portfolio/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-85 shrink-0"
          style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
        >
          <Plus size={14} />
          Tambah Proyek
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-20 rounded-2xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }} />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div
          className="flex flex-col items-center py-20 rounded-2xl border text-center"
          style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          <p className="font-display font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>
            Belum ada proyek
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>
            Tambah proyek pertama kamu
          </p>
          <Link
            href="/dashboard/portfolio/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
          >
            <Plus size={14} /> Tambah Proyek
          </Link>
        </div>
      ) : (
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Table header */}
          <div
            className="grid grid-cols-12 px-5 py-3 text-xs uppercase tracking-widest font-medium"
            style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}
          >
            <div className="col-span-1" />
            <div className="col-span-5">Judul</div>
            <div className="col-span-2">Tipe</div>
            <div className="col-span-1">Tahun</div>
            <div className="col-span-3 text-right">Aksi</div>
          </div>

          {/* Rows */}
          {projects.map((p, i) => (
            <div
              key={p.id}
              className="grid grid-cols-12 items-center px-5 py-4 group transition-colors"
              style={{
                borderBottom: i < projects.length - 1 ? "1px solid var(--border)" : "none",
                backgroundColor: "var(--bg)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-secondary)")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--bg)")}
            >
              {/* Color dot */}
              <div className="col-span-1 flex items-center">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.accent }} />
              </div>

              {/* Title */}
              <div className="col-span-5 pr-4">
                <div className="font-medium text-sm truncate" style={{ color: "var(--text-primary)" }}>
                  {p.title}
                </div>
                <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>
                  /portfolio/{p.slug}
                </div>
              </div>

              {/* Type */}
              <div className="col-span-2">
                <span
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ backgroundColor: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}
                >
                  {p.type}
                </span>
              </div>

              {/* Year */}
              <div className="col-span-1 text-sm" style={{ color: "var(--text-secondary)" }}>
                {p.year}
              </div>

              {/* Actions */}
              <div className="col-span-3 flex items-center justify-end gap-2">
                <a
                  href={`/portfolio/${p.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg transition-all hover:opacity-70"
                  style={{ color: "var(--text-muted)" }}
                  title="Lihat halaman"
                >
                  <ExternalLink size={13} />
                </a>
                <Link
                  href={`/dashboard/portfolio/${p.id}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
                >
                  <Pencil size={11} /> Edit
                </Link>
                <button
                  onClick={() => handleDelete(p.id, p.title)}
                  disabled={deleting === p.id}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80 disabled:opacity-50"
                  style={{
                    borderColor: "rgba(239,68,68,0.3)",
                    color: "#ef4444",
                    backgroundColor: "rgba(239,68,68,0.05)",
                  }}
                >
                  <Trash2 size={11} /> {deleting === p.id ? "…" : "Hapus"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
