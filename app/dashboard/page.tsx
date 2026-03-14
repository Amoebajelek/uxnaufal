"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard, FolderOpen, Eye, TrendingUp, CalendarDays,
  Plus, Pencil, Trash2, ExternalLink, ArrowUpRight, RefreshCw,
} from "lucide-react";
import type { Project } from "@/lib/projects";
import type { AnalyticsSummary, DailyView, TopPage } from "@/lib/analytics.server";

// ─── Mini bar chart ───────────────────────────────────────────────────────────
function BarChart({ data }: { data: DailyView[] }) {
  const max = Math.max(...data.map((d) => d.count), 1);
  return (
    <div className="flex items-end gap-1 h-24 w-full">
      {data.map((d, i) => {
        const pct     = (d.count / max) * 100;
        const isToday = i === data.length - 1;
        const dayLabel = i === 0 ? "14d" : i === 6 ? "7d" : i === 13 ? "hari ini" : "";
        return (
          <div key={d.date} className="flex-1 flex flex-col items-center gap-1 group relative">
            <div
              className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs px-2 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none"
              style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border-strong)", color: "var(--text-primary)" }}
            >
              {d.count} view{d.count !== 1 ? "s" : ""}
            </div>
            <div
              className="w-full rounded-sm transition-all duration-300"
              style={{
                height: `${Math.max(pct, 4)}%`,
                backgroundColor: isToday ? "var(--accent)" : "var(--border-strong)",
                opacity: isToday ? 1 : 0.6,
              }}
            />
            {dayLabel && (
              <span className="text-[9px]" style={{ color: "var(--text-muted)" }}>{dayLabel}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({
  label, value, icon: Icon, loading, sub,
}: {
  label: string; value: string | number; icon: React.ElementType;
  loading?: boolean; sub?: string;
}) {
  return (
    <div
      className="rounded-2xl border p-5 flex flex-col gap-2"
      style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
    >
      <div className="flex items-center gap-2">
        <Icon size={13} style={{ color: "var(--accent)" }} />
        <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--text-muted)" }}>
          {label}
        </span>
      </div>
      <div className="font-display font-extrabold text-3xl" style={{ color: "var(--text-primary)" }}>
        {loading ? <span className="inline-block w-12 h-8 rounded animate-pulse" style={{ backgroundColor: "var(--border-strong)" }} /> : value}
      </div>
      {sub && <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{sub}</div>}
    </div>
  );
}

// ─── Dashboard page ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [projects,  setProjects]  = useState<Project[]>([]);
  const [loadingA,  setLoadingA]  = useState(true);
  const [loadingP,  setLoadingP]  = useState(true);
  const [deleting,  setDeleting]  = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  async function loadAnalytics() {
    setLoadingA(true);
    try {
      const r = await fetch("/api/admin/analytics");
      if (r.ok) setAnalytics(await r.json());
    } finally { setLoadingA(false); }
  }

  async function loadProjects() {
    setLoadingP(true);
    try {
      const r = await fetch("/api/admin/projects");
      if (r.ok) setProjects(await r.json());
    } finally { setLoadingP(false); }
  }

  useEffect(() => { loadAnalytics(); loadProjects(); }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await loadAnalytics();
    setRefreshing(false);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Hapus "${title}"? Tindakan ini tidak dapat dibatalkan.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    await loadProjects();
    setDeleting(null);
  }

  const topProjectPath = analytics?.topPages.find((p) => p.path.startsWith("/portfolio/"))?.path;
  const topProjectSlug = topProjectPath?.split("/portfolio/")[1];
  const topProject     = projects.find((p) => p.slug === topProjectSlug);

  return (
    <div className="space-y-10">

      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <LayoutDashboard size={18} style={{ color: "var(--accent)" }} />
            <h1 className="font-display font-extrabold text-3xl tracking-tight" style={{ color: "var(--text-primary)" }}>
              Dashboard
            </h1>
          </div>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Statistik dan manajemen konten uxnaufal
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing || loadingA}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:opacity-80 disabled:opacity-50"
          style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
        >
          <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* ── ANALYTICS ─────────────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={15} style={{ color: "var(--accent)" }} />
          <h2 className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>Analitik</h2>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label="Total Views"  value={analytics?.total ?? 0} icon={Eye}          loading={loadingA} />
          <StatCard label="Hari Ini"     value={analytics?.today ?? 0} icon={CalendarDays}  loading={loadingA} />
          <StatCard label="7 Hari"       value={analytics?.week  ?? 0} icon={TrendingUp}    loading={loadingA} />
          <StatCard
            label="Proyek"
            value={loadingP ? "—" : projects.length}
            icon={FolderOpen}
            sub={topProject ? `Top: ${topProject.title}` : "Total portfolio"}
          />
        </div>

        {/* Chart + Top pages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Bar chart */}
          <div
            className="lg:col-span-2 rounded-2xl border p-6"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="font-display font-bold text-base mb-0.5" style={{ color: "var(--text-primary)" }}>
                  Kunjungan 14 Hari Terakhir
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  Batang paling kanan = hari ini
                </div>
              </div>
              {analytics && !loadingA && (
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium shrink-0"
                  style={{ backgroundColor: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}
                >
                  {analytics.week} minggu ini
                </span>
              )}
            </div>
            {loadingA ? (
              <div className="h-24 rounded-xl animate-pulse" style={{ backgroundColor: "var(--border)" }} />
            ) : analytics ? (
              <BarChart data={analytics.dailyViews} />
            ) : (
              <div
                className="h-24 flex items-center justify-center text-sm rounded-xl"
                style={{ backgroundColor: "var(--border)", color: "var(--text-muted)" }}
              >
                Jalankan migration SQL untuk mengaktifkan analitik
              </div>
            )}
          </div>

          {/* Top pages */}
          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <div className="font-display font-bold text-base mb-5" style={{ color: "var(--text-primary)" }}>
              Halaman Terpopuler
            </div>
            {loadingA ? (
              <div className="space-y-3">
                {[1,2,3,4].map(i => <div key={i} className="h-8 rounded-xl animate-pulse" style={{ backgroundColor: "var(--border)" }} />)}
              </div>
            ) : analytics && analytics.topPages.length > 0 ? (
              <div className="space-y-3">
                {analytics.topPages.map((p: TopPage, i: number) => {
                  const pct = (p.count / analytics.topPages[0].count) * 100;
                  return (
                    <div key={p.path}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-mono truncate max-w-[150px]" style={{ color: "var(--text-secondary)" }}>
                          {p.path}
                        </span>
                        <span className="text-xs font-bold shrink-0 ml-2" style={{ color: "var(--text-primary)" }}>
                          {p.count}
                        </span>
                      </div>
                      <div className="h-1 w-full rounded-full" style={{ backgroundColor: "var(--border-strong)" }}>
                        <div
                          className="h-1 rounded-full"
                          style={{
                            width: `${pct}%`,
                            backgroundColor: i === 0 ? "var(--accent)" : "var(--text-muted)",
                            opacity: i === 0 ? 1 : 0.5,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-sm text-center py-8" style={{ color: "var(--text-muted)" }}>
                Belum ada data kunjungan
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO CMS ─────────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-5 gap-4">
          <div className="flex items-center gap-2">
            <FolderOpen size={15} style={{ color: "var(--accent)" }} />
            <h2 className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>Portofolio</h2>
            {!loadingP && (
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ backgroundColor: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}
              >
                {projects.length}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Link
              href="/dashboard/portfolio/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-85"
              style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
            >
              <Plus size={13} /> Tambah
            </Link>
            <Link
              href="/dashboard/portfolio"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
            >
              Kelola <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {loadingP ? (
          <div className="flex flex-col gap-3">
            {[1,2,3,4,5].map(i => <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }} />)}
          </div>
        ) : projects.length === 0 ? (
          <div
            className="flex flex-col items-center py-20 rounded-2xl border text-center"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <p className="font-display font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>Belum ada proyek</p>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>Tambah proyek pertama</p>
            <Link href="/dashboard/portfolio/new" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold" style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}>
              <Plus size={14} /> Tambah Proyek
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
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
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="grid grid-cols-12 items-center px-5 py-4 transition-colors"
                style={{ borderBottom: i < projects.length - 1 ? "1px solid var(--border)" : "none", backgroundColor: "var(--bg)" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-secondary)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--bg)")}
              >
                <div className="col-span-1"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.accent }} /></div>
                <div className="col-span-5 pr-4">
                  <div className="font-medium text-sm truncate" style={{ color: "var(--text-primary)" }}>{p.title}</div>
                  <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>/portfolio/{p.slug}</div>
                </div>
                <div className="col-span-2">
                  <span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}>
                    {p.type}
                  </span>
                </div>
                <div className="col-span-1 text-sm" style={{ color: "var(--text-secondary)" }}>{p.year}</div>
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <a href={`/portfolio/${p.slug}`} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:opacity-70 transition-all" style={{ color: "var(--text-muted)" }} title="Lihat">
                    <ExternalLink size={13} />
                  </a>
                  <Link href={`/dashboard/portfolio/${p.id}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80" style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}>
                    <Pencil size={11} /> Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    disabled={deleting === p.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80 disabled:opacity-50"
                    style={{ borderColor: "rgba(239,68,68,0.3)", color: "#ef4444", backgroundColor: "rgba(239,68,68,0.05)" }}
                  >
                    <Trash2 size={11} /> {deleting === p.id ? "…" : "Hapus"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
