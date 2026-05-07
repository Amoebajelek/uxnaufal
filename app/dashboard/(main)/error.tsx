"use client";

import { RefreshCw } from "lucide-react";

export default function DashboardError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div
      className="rounded-2xl border p-8"
      style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
    >
      <h1 className="font-display font-bold text-xl mb-2" style={{ color: "var(--text-primary)" }}>
        Dashboard gagal dimuat
      </h1>
      <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>
        Coba muat ulang. Jika masih gagal, cek koneksi Supabase dan environment variable.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold"
        style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
      >
        <RefreshCw size={14} />
        Muat ulang
      </button>
    </div>
  );
}
