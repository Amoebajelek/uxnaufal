"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock, User, Eye, EyeOff, ShieldCheck, Save, CheckCircle2,
  Monitor, Smartphone, Globe, LogOut, Loader2, Trash2,
} from "lucide-react";
import { useLang } from "@/components/LanguageContext";
import type { Lang } from "@/components/LanguageContext";

// ─── Password strength ────────────────────────────────────────────────────────
function calcStrength(pw: string): { level: number; labelKey: string; color: string } {
  if (!pw) return { level: 0, labelKey: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: score, labelKey: "dash.settings.pw.weak",   color: "#ef4444" };
  if (score === 2) return { level: score, labelKey: "dash.settings.pw.fair",   color: "#f97316" };
  if (score === 3) return { level: score, labelKey: "dash.settings.pw.strong", color: "#84cc16" };
  return            { level: score, labelKey: "dash.settings.pw.vstrong",      color: "#22c55e" };
}

// ─── Reusable password input ──────────────────────────────────────────────────
function PasswordInput({
  value, onChange, placeholder, autoComplete, borderOverride,
}: {
  value: string; onChange: (v: string) => void;
  placeholder?: string; autoComplete?: string; borderOverride?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
      <input
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all"
        style={{
          backgroundColor: "var(--bg)",
          border: borderOverride ?? "1px solid var(--border)",
          color: "var(--text-primary)",
        }}
      />
      <button
        type="button"
        onClick={() => setShow((v) => !v)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
        style={{ color: "var(--text-muted)" }}
        tabIndex={-1}
      >
        {show ? <EyeOff size={13} /> : <Eye size={13} />}
      </button>
    </div>
  );
}

// ─── Session helpers ──────────────────────────────────────────────────────────
interface Session {
  id: string;
  created_at: string;
  expires_at: string;
  ip: string;
  user_agent: string;
  is_current: boolean;
}

function parseUA(ua: string): { browser: string; os: string; mobile: boolean } {
  const mobile  = /Mobi|Android|iPhone|iPad/i.test(ua);
  const browser =
    /Edg\//.test(ua)                          ? "Edge"    :
    /OPR\/|Opera/.test(ua)                    ? "Opera"   :
    /Chrome\//.test(ua)                       ? "Chrome"  :
    /Firefox\//.test(ua)                      ? "Firefox" :
    /Safari\//.test(ua) && !/Chrome/.test(ua) ? "Safari"  :
    /MSIE|Trident/.test(ua)                   ? "IE"      : "Browser";
  const os =
    /Windows/.test(ua) ? "Windows" :
    /iPhone/.test(ua)  ? "iPhone"  :
    /iPad/.test(ua)    ? "iPad"    :
    /Mac OS X/.test(ua)? "macOS"   :
    /Android/.test(ua) ? "Android" :
    /Linux/.test(ua)   ? "Linux"   : "Perangkat";
  return { browser, os, mobile };
}

function formatSessionDate(iso: string, lang: Lang): string {
  const d = new Date(iso);
  return d.toLocaleDateString(lang === "id" ? "id-ID" : "en-US", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function formatExpiry(
  iso: string,
  t: (k: string) => string
): string {
  const diff = new Date(iso).getTime() - Date.now();
  if (diff < 0) return t("dash.settings.sessions.expired");
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs  = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  if (days > 0) return t("dash.settings.sessions.expiry.days").replace("{d}", String(days)).replace("{h}", String(hrs));
  return t("dash.settings.sessions.expiry.hrs").replace("{h}", String(hrs));
}

// ─── Sessions section ─────────────────────────────────────────────────────────
function SessionsSection() {
  const router = useRouter();
  const { t, lang } = useLang();
  const [sessions,  setSessions]  = useState<Session[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [revoking,  setRevoking]  = useState<string | null>(null);
  const [revokeAll, setRevokeAll] = useState(false);

  async function loadSessions() {
    setLoading(true);
    try {
      const r = await fetch("/api/admin/sessions");
      if (r.ok) setSessions(await r.json());
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadSessions(); }, []);

  async function handleRevoke(id: string) {
    setRevoking(id);
    await fetch(`/api/admin/sessions?id=${id}`, { method: "DELETE" });
    await loadSessions();
    setRevoking(null);
  }

  async function handleRevokeAll() {
    if (!confirm("Cabut semua sesi lain? Perangkat lain akan otomatis logout.")) return;
    setRevokeAll(true);
    await fetch("/api/admin/sessions?all=1", { method: "DELETE" });
    await loadSessions();
    setRevokeAll(false);
  }

  async function handleRevokeCurrentAndLogout() {
    const current = sessions.find((s) => s.is_current);
    if (current) await fetch(`/api/admin/sessions?id=${current.id}`, { method: "DELETE" });
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/dashboard/login");
    router.refresh();
  }

  const otherCount = sessions.filter((s) => !s.is_current).length;

  return (
    <div className="rounded-2xl border" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-6 py-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck size={15} style={{ color: "var(--accent)" }} />
          <h2 className="font-display font-semibold text-base" style={{ color: "var(--text-primary)" }}>
            {t("dash.settings.sessions")}
          </h2>
          {!loading && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ backgroundColor: "var(--accent-bg)", color: "var(--accent)", border: "1px solid var(--accent-border)" }}
            >
              {sessions.length}
            </span>
          )}
        </div>

        {otherCount > 0 && (
          <button
            onClick={handleRevokeAll}
            disabled={revokeAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80 disabled:opacity-50"
            style={{ borderColor: "rgba(239,68,68,0.35)", color: "#ef4444", backgroundColor: "rgba(239,68,68,0.05)" }}
          >
            {revokeAll
              ? <Loader2 size={11} className="animate-spin" />
              : <Trash2 size={11} />}
            {t("dash.settings.sessions.revoke.all").replace("{n}", String(otherCount))}
          </button>
        )}
      </div>

      {/* List */}
      <div className="divide-y" style={{ borderColor: "var(--border)" }}>
        {loading ? (
          <div className="px-6 py-8 flex justify-center">
            <Loader2 size={18} className="animate-spin" style={{ color: "var(--text-muted)" }} />
          </div>
        ) : sessions.length === 0 ? (
          <div className="px-6 py-8 text-sm text-center" style={{ color: "var(--text-muted)" }}>
            {t("dash.settings.sessions.none")}
          </div>
        ) : (
          sessions.map((s) => {
            const { browser, os, mobile } = parseUA(s.user_agent);
            const DeviceIcon = mobile ? Smartphone : Monitor;
            return (
              <div
                key={s.id}
                className="px-6 py-4 flex items-start gap-4"
                style={s.is_current ? { backgroundColor: "color-mix(in srgb, var(--accent-bg) 60%, transparent)" } : {}}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                  style={{
                    backgroundColor: s.is_current ? "var(--accent-bg)" : "var(--bg)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <DeviceIcon
                    size={17}
                    style={{ color: s.is_current ? "var(--accent)" : "var(--text-muted)" }}
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>
                      {browser} — {os}
                    </span>
                    {s.is_current && (
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider"
                        style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
                      >
                        {t("dash.settings.sessions.current")}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs mb-0.5" style={{ color: "var(--text-muted)" }}>
                    <Globe size={10} />
                    <span className="font-mono">{s.ip}</span>
                    <span className="mx-1">·</span>
                    <span>{t("dash.settings.sessions.login")} {formatSessionDate(s.created_at, lang)}</span>
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {formatExpiry(s.expires_at, t)}
                  </div>
                </div>

                {/* Actions */}
                <div className="shrink-0">
                  {s.is_current ? (
                    <button
                      onClick={handleRevokeCurrentAndLogout}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80"
                      style={{ borderColor: "var(--border-strong)", color: "var(--text-muted)" }}
                      title="Logout dari sesi ini"
                    >
                      <LogOut size={11} />
                      Logout
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRevoke(s.id)}
                      disabled={revoking === s.id}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-80 disabled:opacity-50"
                      style={{ borderColor: "rgba(239,68,68,0.3)", color: "#ef4444", backgroundColor: "rgba(239,68,68,0.05)" }}
                    >
                      {revoking === s.id
                        ? <Loader2 size={11} className="animate-spin" />
                        : <LogOut size={11} />}
                      {t("dash.settings.sessions.revoke")}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer note */}
      <div
        className="px-6 py-3 text-xs"
        style={{ borderTop: "1px solid var(--border)", color: "var(--text-muted)" }}
      >
        {t("dash.settings.sessions.footer")}
      </div>
    </div>
  );
}

// ─── Settings page ────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const router = useRouter();
  const { t } = useLang();

  const [currentUsername, setCurrentUsername] = useState("");
  const [loadingUser,     setLoadingUser]     = useState(true);

  const [currentPassword,  setCurrentPassword]  = useState("");
  const [newUsername,      setNewUsername]       = useState("");
  const [newPassword,      setNewPassword]       = useState("");
  const [confirmPassword,  setConfirmPassword]   = useState("");

  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/password")
      .then((r) => r.json())
      .then((d) => {
        const u = d.username ?? "admin";
        setCurrentUsername(u);
        setNewUsername(u);
      })
      .catch(() => { setCurrentUsername("admin"); setNewUsername("admin"); })
      .finally(() => setLoadingUser(false));
  }, []);

  const str      = calcStrength(newPassword);
  const mismatch = confirmPassword.length > 0 && confirmPassword !== newPassword;
  const canSubmit =
    !saving && !success &&
    currentPassword.length > 0 &&
    newUsername.trim().length >= 3 &&
    newPassword.length >= 4 &&
    newPassword === confirmPassword;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newUsername.trim().length < 3)   { setError(t("dash.settings.err.username")); return; }
    if (newPassword.length < 4)          { setError(t("dash.settings.err.pwlen"));    return; }
    if (newPassword !== confirmPassword) { setError(t("dash.settings.err.pwmatch"));  return; }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newUsername: newUsername.trim(), newPassword }),
      });
      let data: { success?: boolean; error?: string } = {};
      try { data = await res.json(); } catch { /* empty */ }

      if (!res.ok) { setError(data.error ?? `Gagal menyimpan (HTTP ${res.status}).`); setSaving(false); return; }

      setSuccess(true);
      setCurrentUsername(newUsername.trim());
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setTimeout(async () => {
        await fetch("/api/admin/auth", { method: "DELETE" });
        router.push("/dashboard/login");
      }, 2000);
    } catch {
      setError(t("dash.settings.err.network"));
    }
    setSaving(false);
  }

  return (
    <div className="max-w-xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display font-extrabold text-3xl tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
          {t("dash.settings.title")}
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>{t("dash.settings.subtitle")}</p>
      </div>

      {/* Active account card */}
      <div
        className="rounded-2xl border p-5 flex items-center gap-4"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold"
          style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
        >
          {loadingUser ? "…" : currentUsername.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <ShieldCheck size={12} style={{ color: "var(--accent)" }} />
            <span className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--text-muted)" }}>
              {t("dash.settings.account")}
            </span>
          </div>
          <div className="font-display font-semibold text-base" style={{ color: "var(--text-primary)" }}>
            {loadingUser ? "Memuat…" : currentUsername}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Administrator</div>
        </div>
      </div>

      {/* Credentials form */}
      <div className="rounded-2xl border p-6" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}>
        <h2 className="font-display font-semibold text-base mb-1" style={{ color: "var(--text-primary)" }}>
          {t("dash.settings.form.title")}
        </h2>
        <p className="text-xs mb-6" style={{ color: "var(--text-muted)" }}>
          {t("dash.settings.form.desc")}
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="off">
          {/* New username */}
          <div>
            <label className="text-xs uppercase tracking-widest font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>
              {t("dash.settings.new.username")}
            </label>
            <div className="relative">
              <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder="username baru"
                autoComplete="off"
                required
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
              />
            </div>
            {newUsername.trim().length > 0 && newUsername.trim().length < 3 && (
              <p className="text-xs mt-1" style={{ color: "#f97316" }}>{t("dash.settings.err.username")}</p>
            )}
          </div>

          <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

          {/* Current password */}
          <div>
            <label className="text-xs uppercase tracking-widest font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>
              {t("dash.settings.current.pw")} <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <PasswordInput
              value={currentPassword}
              onChange={setCurrentPassword}
              placeholder="wajib diisi untuk konfirmasi"
              autoComplete="current-password"
            />
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Masukkan password yang sedang aktif untuk verifikasi.
            </p>
          </div>

          {/* New password */}
          <div>
            <label className="text-xs uppercase tracking-widest font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>
              {t("dash.settings.new.pw")}
            </label>
            <PasswordInput
              value={newPassword}
              onChange={setNewPassword}
              placeholder="minimal 4 karakter"
              autoComplete="new-password"
            />
            {newPassword.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{ backgroundColor: i <= str.level ? str.color : "var(--border)" }}
                    />
                  ))}
                </div>
                <p className="text-xs font-medium" style={{ color: str.color }}>{t(str.labelKey)}</p>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="text-xs uppercase tracking-widest font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>
              {t("dash.settings.confirm.pw")}
            </label>
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="ulangi password baru"
              autoComplete="new-password"
              borderOverride={mismatch ? "1px solid rgba(239,68,68,0.5)" : undefined}
            />
            {mismatch && (
              <p className="text-xs mt-1" style={{ color: "#ef4444" }}>{t("dash.settings.err.pwmatch")}</p>
            )}
            {confirmPassword.length > 0 && !mismatch && (
              <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#22c55e" }}>
                <CheckCircle2 size={11} /> Password cocok
              </p>
            )}
          </div>

          {error && (
            <div
              className="text-sm px-4 py-3 rounded-xl"
              style={{ backgroundColor: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="text-sm px-4 py-3 rounded-xl flex items-start gap-2"
              style={{ backgroundColor: "rgba(34,197,94,0.08)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <span>{t("dash.settings.saved")}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-85 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
          >
            <Save size={14} />
            {saving ? t("dash.settings.saving") : t("dash.settings.save")}
          </button>
        </form>
      </div>

      <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
        Setelah disimpan, kamu akan otomatis logout dan perlu login ulang dengan kredensial baru.
      </p>

      {/* Sessions section */}
      <SessionsSection />
    </div>
  );
}
