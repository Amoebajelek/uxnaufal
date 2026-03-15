"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import {
  LayoutDashboard, FolderOpen, Eye, TrendingUp, CalendarDays,
  Plus, Pencil, Trash2, ExternalLink, ArrowUpRight, RefreshCw,
  Download, Clock, ChevronDown,
} from "lucide-react";
import type { Project } from "@/lib/projects";
import type { AnalyticsSummary, DailyView, TopPage } from "@/lib/analytics.server";
import { useLang } from "@/components/LanguageContext";

type FilterDays = 7 | 14 | 30;

// ─── SVG Line Chart ───────────────────────────────────────────────────────────
function LineChart({ data }: { data: DailyView[] }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const W = 600, H = 150;
  const PAD = { top: 20, right: 16, bottom: 30, left: 36 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  const n = data.length;
  const max = Math.max(...data.map((d) => d.count), 1);

  const xOf = (i: number) => PAD.left + (i / Math.max(n - 1, 1)) * chartW;
  const yOf = (v: number) => PAD.top + chartH - (v / max) * chartH;

  // Smooth cubic bezier path
  const points = data.map((d, i) => ({ x: xOf(i), y: yOf(d.count) }));
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const cpx = points[i - 1].x + (points[i].x - points[i - 1].x) / 2;
    pathD += ` C ${cpx} ${points[i - 1].y} ${cpx} ${points[i].y} ${points[i].x} ${points[i].y}`;
  }
  const areaD = `${pathD} L ${points[n - 1].x} ${H - PAD.bottom} L ${points[0].x} ${H - PAD.bottom} Z`;

  // Y-axis ticks (3 levels)
  const yTicks = [0, Math.ceil(max / 2), max];

  // X-axis: show ~4 evenly-spaced labels
  const xLabelIdxs: number[] = [0];
  if (n > 4) xLabelIdxs.push(Math.round((n - 1) / 3), Math.round(((n - 1) * 2) / 3));
  xLabelIdxs.push(n - 1);
  const uniqueX = [...new Set(xLabelIdxs)];

  // Tooltip clamping so it never overflows
  const tipW = 120, tipH = 24;
  function tipX(i: number) {
    return Math.max(PAD.left, Math.min(xOf(i) - tipW / 2, W - PAD.right - tipW));
  }
  function tipY(i: number) {
    const y = yOf(data[i].count) - tipH - 8;
    return y < 0 ? yOf(data[i].count) + 8 : y;
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      className="w-full"
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.01" />
        </linearGradient>
        <clipPath id="chartArea">
          <rect x={PAD.left} y={PAD.top - 2} width={chartW} height={chartH + 4} />
        </clipPath>
      </defs>

      {/* Grid lines */}
      {yTicks.map((t) => (
        <line
          key={t}
          x1={PAD.left} y1={yOf(t)}
          x2={W - PAD.right} y2={yOf(t)}
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
      ))}

      {/* Area fill */}
      <path d={areaD} fill="url(#areaGrad)" clipPath="url(#chartArea)" />

      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        clipPath="url(#chartArea)"
      />

      {/* Invisible wide hit zones for hover */}
      {points.map((p, i) => (
        <rect
          key={`hit-${i}`}
          x={i === 0 ? p.x - 8 : (points[i - 1].x + p.x) / 2}
          y={PAD.top - 4}
          width={
            i === 0
              ? (p.x + (points[1]?.x ?? p.x)) / 2 - (p.x - 8)
              : (i === n - 1
                  ? (p.x + 8) - (points[i - 1].x + p.x) / 2
                  : (p.x + (points[i + 1]?.x ?? p.x)) / 2 - (points[i - 1].x + p.x) / 2)
          }
          height={chartH + 8}
          fill="transparent"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          style={{ cursor: "crosshair" }}
        />
      ))}

      {/* Dots — only render the hovered one prominently, others as small */}
      {points.map((p, i) => (
        <circle
          key={`dot-${i}`}
          cx={p.x} cy={p.y}
          r={hovered === i ? 5 : 2.5}
          fill={hovered === i ? "var(--accent)" : "var(--bg-secondary)"}
          stroke="var(--accent)"
          strokeWidth={hovered === i ? 2 : 1.5}
          style={{ pointerEvents: "none", transition: "r 0.12s, fill 0.12s" }}
        />
      ))}

      {/* Vertical hover line */}
      {hovered !== null && (
        <line
          x1={xOf(hovered)} y1={PAD.top}
          x2={xOf(hovered)} y2={H - PAD.bottom}
          stroke="var(--accent)"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.5"
          style={{ pointerEvents: "none" }}
        />
      )}

      {/* Tooltip */}
      {hovered !== null && (
        <g style={{ pointerEvents: "none" }}>
          <rect
            x={tipX(hovered)} y={tipY(hovered)}
            width={tipW} height={tipH}
            rx={5}
            fill="var(--bg)"
            stroke="var(--border-strong)"
            strokeWidth="1"
          />
          <text
            x={tipX(hovered) + tipW / 2}
            y={tipY(hovered) + tipH / 2 + 4}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-primary)"
            fontFamily="monospace"
          >
            {data[hovered].date.slice(5)}  ·  {data[hovered].count} view{data[hovered].count !== 1 ? "s" : ""}
          </text>
        </g>
      )}

      {/* X-axis labels */}
      {uniqueX.map((i) => (
        <text
          key={`xl-${i}`}
          x={xOf(i)}
          y={H - 6}
          textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
          fontSize="9"
          fill="var(--text-muted)"
        >
          {data[i]?.date.slice(5)}
        </text>
      ))}

      {/* Y-axis labels */}
      {yTicks.slice(1).map((t) => (
        <text
          key={`yl-${t}`}
          x={PAD.left - 5}
          y={yOf(t) + 3}
          textAnchor="end"
          fontSize="9"
          fill="var(--text-muted)"
        >
          {t}
        </text>
      ))}
    </svg>
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
        {loading
          ? <span className="inline-block w-12 h-8 rounded animate-pulse" style={{ backgroundColor: "var(--border-strong)" }} />
          : value}
      </div>
      {sub && <div className="text-xs truncate" style={{ color: "var(--text-muted)" }}>{sub}</div>}
    </div>
  );
}

// ─── Export helpers ───────────────────────────────────────────────────────────
function exportCSV(data: DailyView[], filename: string) {
  const rows = ["date,views", ...data.map((d) => `${d.date},${d.count}`)];
  const blob = new Blob([rows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function exportJSON(data: DailyView[], filename: string) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Dashboard page ───────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { t } = useLang();

  const [analytics,  setAnalytics]  = useState<AnalyticsSummary | null>(null);
  const [projects,   setProjects]   = useState<Project[]>([]);
  const [loadingA,   setLoadingA]   = useState(true);
  const [loadingP,   setLoadingP]   = useState(true);
  const [deleting,   setDeleting]   = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filterDays, setFilterDays] = useState<FilterDays>(14);

  // formatRelative inside component so it can use t()
  function formatRelative(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const s = Math.floor(diff / 1000);
    if (s < 60) return t("dash.time.justnow");
    const m = Math.floor(s / 60);
    if (m < 60) return `${m} ${t("dash.time.minsago")}`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} ${t("dash.time.hrsago")}`;
    return `${Math.floor(h / 24)} ${t("dash.time.daysago")}`;
  }

  const loadAnalytics = useCallback(async (days: FilterDays = filterDays) => {
    setLoadingA(true);
    try {
      const r = await fetch(`/api/admin/analytics?days=${days}`);
      if (r.ok) setAnalytics(await r.json());
    } finally {
      setLoadingA(false);
    }
  }, [filterDays]);

  async function loadProjects() {
    setLoadingP(true);
    try {
      const r = await fetch("/api/admin/projects");
      if (r.ok) setProjects(await r.json());
    } finally {
      setLoadingP(false);
    }
  }

  useEffect(() => { loadAnalytics(filterDays); }, [filterDays]); // eslint-disable-line
  useEffect(() => { loadProjects(); }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await loadAnalytics(filterDays);
    setRefreshing(false);
  }

  function handleFilter(d: FilterDays) {
    setFilterDays(d);
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(t("dash.confirm.delete").replace("{title}", title))) return;
    setDeleting(id);
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    await loadProjects();
    setDeleting(null);
  }

  const topProjectPath = analytics?.topPages.find((p) => p.path.startsWith("/portfolio/"))?.path;
  const topProjectSlug = topProjectPath?.split("/portfolio/")[1];
  const topProject     = projects.find((p) => p.slug === topProjectSlug);

  const filterOptions: { label: string; value: FilterDays }[] = [
    { label: t("dash.filter.7d"),  value: 7  },
    { label: t("dash.filter.14d"), value: 14 },
    { label: t("dash.filter.30d"), value: 30 },
  ];

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
            {t("dash.subtitle")} uxnaufal
          </p>
        </div>
        <button
          onClick={handleRefresh}
          disabled={refreshing || loadingA}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:opacity-80 disabled:opacity-50"
          style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
        >
          <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
          {t("dash.refresh")}
        </button>
      </div>

      {/* ── ANALYTICS ─────────────────────────────────────────────────────── */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={15} style={{ color: "var(--accent)" }} />
          <h2 className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>{t("dash.analytics")}</h2>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard label={t("dash.stat.totalviews")} value={analytics?.total ?? 0} icon={Eye}          loading={loadingA} />
          <StatCard label={t("dash.stat.today")}  value={analytics?.today ?? 0} icon={CalendarDays}  loading={loadingA} />
          <StatCard label={t("dash.stat.week")}   value={analytics?.week  ?? 0} icon={TrendingUp}    loading={loadingA} />
          <StatCard
            label={t("dash.stat.projects")}
            value={loadingP ? "—" : projects.length}
            icon={FolderOpen}
            sub={topProject ? `${t("dash.stat.top")} ${topProject.title}` : t("dash.stat.portfolio")}
          />
        </div>

        {/* Chart + Top pages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {/* ── Line chart panel ─────────────────────────────────────────── */}
          <div
            className="lg:col-span-2 rounded-2xl border p-6"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            {/* Chart header */}
            <div className="flex flex-wrap items-start justify-between gap-3 mb-5">
              <div>
                <div className="font-display font-bold text-base mb-0.5" style={{ color: "var(--text-primary)" }}>
                  {filterDays === 7 ? t("dash.filter.7d") : filterDays === 14 ? t("dash.filter.14d") : t("dash.filter.30d")}
                </div>
                {analytics?.updatedAt && !loadingA ? (
                  <div className="flex items-center gap-1 text-xs" style={{ color: "var(--text-muted)" }}>
                    <Clock size={10} />
                    <span>{t("dash.chart.updated")} {formatRelative(analytics.updatedAt)}</span>
                  </div>
                ) : (
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>{t("dash.chart.hover")}</div>
                )}
              </div>

              {/* Controls: filter + export */}
              <div className="flex items-center gap-2 flex-wrap">
                {/* Filter pills */}
                <div
                  className="flex items-center rounded-xl p-0.5 gap-0.5"
                  style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)" }}
                >
                  {filterOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleFilter(opt.value)}
                      className="px-3 py-1 rounded-lg text-xs font-medium transition-all"
                      style={
                        filterDays === opt.value
                          ? { backgroundColor: "var(--accent)", color: "#0a0a0a" }
                          : { color: "var(--text-muted)" }
                      }
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {/* Export CSV */}
                <button
                  onClick={() =>
                    analytics &&
                    exportCSV(
                      analytics.dailyViews,
                      `analytics-${filterDays}d-${new Date().toISOString().slice(0, 10)}.csv`
                    )
                  }
                  disabled={!analytics || loadingA}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all hover:opacity-80 disabled:opacity-40"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
                  title={t("dash.export.csv")}
                >
                  <Download size={11} />
                  {t("dash.export.csv")}
                </button>

                {/* Export JSON */}
                <button
                  onClick={() =>
                    analytics &&
                    exportJSON(
                      analytics.dailyViews,
                      `analytics-${filterDays}d-${new Date().toISOString().slice(0, 10)}.json`
                    )
                  }
                  disabled={!analytics || loadingA}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all hover:opacity-80 disabled:opacity-40"
                  style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
                  title={t("dash.export.json")}
                >
                  <Download size={11} />
                  {t("dash.export.json")}
                </button>
              </div>
            </div>

            {/* Chart body */}
            {loadingA ? (
              <div className="h-36 rounded-xl animate-pulse" style={{ backgroundColor: "var(--border)" }} />
            ) : analytics ? (
              <LineChart data={analytics.dailyViews} />
            ) : (
              <div
                className="h-36 flex items-center justify-center text-sm rounded-xl"
                style={{ backgroundColor: "var(--border)", color: "var(--text-muted)" }}
              >
                {t("dash.chart.nodata")}
              </div>
            )}

            {/* Summary row below chart */}
            {analytics && !loadingA && (
              <div
                className="mt-4 pt-4 flex items-center gap-6 flex-wrap"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                  <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {t("dash.chart.total")} {filterDays}d:{" "}
                    <strong style={{ color: "var(--text-primary)" }}>
                      {analytics.dailyViews.reduce((s, d) => s + d.count, 0)} views
                    </strong>
                  </span>
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {t("dash.chart.avg")}{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    {(
                      analytics.dailyViews.reduce((s, d) => s + d.count, 0) / filterDays
                    ).toFixed(1)}{" "}
                    {t("dash.chart.perday")}
                  </strong>
                </div>
                <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {t("dash.chart.peak")}{" "}
                  <strong style={{ color: "var(--text-primary)" }}>
                    {Math.max(...analytics.dailyViews.map((d) => d.count))} views
                  </strong>
                </div>
              </div>
            )}
          </div>

          {/* Top pages */}
          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <div className="font-display font-bold text-base mb-5" style={{ color: "var(--text-primary)" }}>
              {t("dash.toppages")}
            </div>
            <div className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>{t("dash.toppages.sub")}</div>
            {loadingA ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-8 rounded-xl animate-pulse" style={{ backgroundColor: "var(--border)" }} />
                ))}
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
                          className="h-1 rounded-full transition-all duration-500"
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
                {t("dash.novisit")}
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
            <h2 className="font-display font-bold text-lg" style={{ color: "var(--text-primary)" }}>{t("dash.portfolio.section")}</h2>
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
              <Plus size={13} /> {t("dash.portfolio.add")}
            </Link>
            <Link
              href="/dashboard/portfolio"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-all hover:opacity-80"
              style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
            >
              {t("dash.portfolio.manage")} <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        {loadingP ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 rounded-2xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div
            className="flex flex-col items-center py-20 rounded-2xl border text-center"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
          >
            <p className="font-display font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>{t("dash.portfolio.empty.title")}</p>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>{t("dash.portfolio.empty.desc")}</p>
            <Link
              href="/dashboard/portfolio/new"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold"
              style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
            >
              <Plus size={14} /> {t("dash.portfolio.add")}
            </Link>
          </div>
        ) : (
          <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "var(--border)" }}>
            <div
              className="grid grid-cols-12 px-5 py-3 text-xs uppercase tracking-widest font-medium"
              style={{ backgroundColor: "var(--bg-secondary)", borderBottom: "1px solid var(--border)", color: "var(--text-muted)" }}
            >
              <div className="col-span-1" />
              <div className="col-span-5">{t("dash.portfolio.col.title")}</div>
              <div className="col-span-2">{t("dash.portfolio.col.type")}</div>
              <div className="col-span-1">{t("dash.portfolio.col.year")}</div>
              <div className="col-span-3 text-right">{t("dash.portfolio.col.actions")}</div>
            </div>
            {projects.map((p, i) => (
              <div
                key={p.id}
                className="grid grid-cols-12 items-center px-5 py-4 transition-colors"
                style={{
                  borderBottom: i < projects.length - 1 ? "1px solid var(--border)" : "none",
                  backgroundColor: "var(--bg)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--bg-secondary)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "var(--bg)")}
              >
                <div className="col-span-1">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.accent }} />
                </div>
                <div className="col-span-5 pr-4">
                  <div className="font-medium text-sm truncate" style={{ color: "var(--text-primary)" }}>{p.title}</div>
                  <div className="text-xs font-mono" style={{ color: "var(--text-muted)" }}>/portfolio/{p.slug}</div>
                </div>
                <div className="col-span-2">
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}
                  >
                    {p.type}
                  </span>
                </div>
                <div className="col-span-1 text-sm" style={{ color: "var(--text-secondary)" }}>{p.year}</div>
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <a
                    href={`/portfolio/${p.slug}`}
                    target="_blank" rel="noopener noreferrer"
                    className="p-1.5 rounded-lg hover:opacity-70 transition-all"
                    style={{ color: "var(--text-muted)" }}
                    title={t("dash.portfolio.view")}
                  >
                    <ExternalLink size={13} />
                  </a>
                  <Link
                    href={`/dashboard/portfolio/${p.id}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80"
                    style={{ borderColor: "var(--border-strong)", color: "var(--text-secondary)" }}
                  >
                    <Pencil size={11} /> {t("dash.actions.edit")}
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    disabled={deleting === p.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80 disabled:opacity-50"
                    style={{ borderColor: "rgba(239,68,68,0.3)", color: "#ef4444", backgroundColor: "rgba(239,68,68,0.05)" }}
                  >
                    <Trash2 size={11} /> {deleting === p.id ? t("dash.deleting") : t("dash.actions.delete")}
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
