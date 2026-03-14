"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, ShieldCheck, Save, CheckCircle2 } from "lucide-react";

/* ─── password strength ─── */
function calcStrength(pw: string): { level: number; label: string; color: string } {
  if (!pw) return { level: 0, label: "", color: "transparent" };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  if (score <= 1) return { level: score, label: "Lemah", color: "#ef4444" };
  if (score === 2) return { level: score, label: "Cukup", color: "#f97316" };
  if (score === 3) return { level: score, label: "Kuat", color: "#84cc16" };
  return { level: score, label: "Sangat Kuat", color: "#22c55e" };
}

/* ─── reusable password input ─── */
function PasswordInput({
  value, onChange, placeholder, autoComplete, borderOverride,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
  borderOverride?: string;
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

export default function SettingsPage() {
  const router = useRouter();

  const [currentUsername, setCurrentUsername] = useState("");
  const [loadingUser, setLoadingUser] = useState(true);

  /* form */
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername]         = useState("");
  const [newPassword, setNewPassword]         = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  /* ui */
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState("");
  const [success, setSuccess] = useState(false);

  /* load username on mount */
  useEffect(() => {
    fetch("/api/admin/password")
      .then((r) => r.json())
      .then((d) => {
        const u = d.username ?? "admin";
        setCurrentUsername(u);
        setNewUsername(u);
      })
      .catch(() => {
        setCurrentUsername("admin");
        setNewUsername("admin");
      })
      .finally(() => setLoadingUser(false));
  }, []);

  const str               = calcStrength(newPassword);
  const mismatch          = confirmPassword.length > 0 && confirmPassword !== newPassword;
  const canSubmit         = !saving && !success && currentPassword.length > 0
                            && newUsername.trim().length >= 3
                            && newPassword.length >= 4
                            && newPassword === confirmPassword;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    /* client-side guards */
    if (newUsername.trim().length < 3) { setError("Username minimal 3 karakter."); return; }
    if (newPassword.length < 4)         { setError("Password baru minimal 4 karakter."); return; }
    if (newPassword !== confirmPassword) { setError("Password baru dan konfirmasi tidak cocok."); return; }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newUsername: newUsername.trim(),
          newPassword,
        }),
      });

      let data: { success?: boolean; error?: string } = {};
      try { data = await res.json(); } catch { /* empty body */ }

      if (!res.ok) {
        setError(data.error ?? `Gagal menyimpan (HTTP ${res.status}).`);
        setSaving(false);
        return;
      }

      /* success */
      setSuccess(true);
      setCurrentUsername(newUsername.trim());
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      /* logout → login after 2s */
      setTimeout(async () => {
        await fetch("/api/admin/auth", { method: "DELETE" });
        router.push("/admin/login");
      }, 2000);

    } catch {
      setError("Koneksi gagal. Pastikan server berjalan dan coba lagi.");
    }
    setSaving(false);
  }

  return (
    <div className="max-w-xl">
      {/* Header */}
      <div className="mb-10">
        <h1 className="font-display font-extrabold text-3xl tracking-tight mb-2" style={{ color: "var(--text-primary)" }}>
          Pengaturan
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>Kelola kredensial login CMS</p>
      </div>

      {/* Active account card */}
      <div
        className="rounded-2xl border p-5 mb-6 flex items-center gap-4"
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
              Akun Aktif
            </span>
          </div>
          <div className="font-display font-semibold text-base" style={{ color: "var(--text-primary)" }}>
            {loadingUser ? "Memuat…" : currentUsername}
          </div>
          <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>Administrator</div>
        </div>
      </div>

      {/* Form card */}
      <div className="rounded-2xl border p-6" style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}>
        <h2 className="font-display font-semibold text-base mb-6" style={{ color: "var(--text-primary)" }}>
          Ubah Kredensial
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="off">

          {/* New username */}
          <div>
            <label className="text-xs uppercase tracking-widest font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>
              Username Baru
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
              <p className="text-xs mt-1" style={{ color: "#f97316" }}>Minimal 3 karakter</p>
            )}
          </div>

          <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

          {/* Current password (verification) */}
          <div>
            <label className="text-xs uppercase tracking-widest font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>
              Password Saat Ini <span style={{ color: "#ef4444" }}>*</span>
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
              Password Baru
            </label>
            <PasswordInput
              value={newPassword}
              onChange={setNewPassword}
              placeholder="minimal 4 karakter"
              autoComplete="new-password"
            />
            {/* strength bar */}
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
                <p className="text-xs font-medium" style={{ color: str.color }}>{str.label}</p>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label className="text-xs uppercase tracking-widest font-medium block mb-1.5" style={{ color: "var(--text-muted)" }}>
              Konfirmasi Password Baru
            </label>
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="ulangi password baru"
              autoComplete="new-password"
              borderOverride={mismatch ? "1px solid rgba(239,68,68,0.5)" : undefined}
            />
            {mismatch && (
              <p className="text-xs mt-1" style={{ color: "#ef4444" }}>Password tidak cocok</p>
            )}
            {confirmPassword.length > 0 && !mismatch && (
              <p className="text-xs mt-1 flex items-center gap-1" style={{ color: "#22c55e" }}>
                <CheckCircle2 size={11} /> Password cocok
              </p>
            )}
          </div>

          {/* Error banner */}
          {error && (
            <div
              className="text-sm px-4 py-3 rounded-xl"
              style={{ backgroundColor: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
            >
              {error}
            </div>
          )}

          {/* Success banner */}
          {success && (
            <div
              className="text-sm px-4 py-3 rounded-xl flex items-start gap-2"
              style={{ backgroundColor: "rgba(34,197,94,0.08)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.2)" }}
            >
              <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
              <span>Kredensial berhasil diperbarui! Mengarahkan ke halaman login…</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-85 active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed mt-1"
            style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
          >
            <Save size={14} />
            {saving ? "Menyimpan…" : "Simpan Perubahan"}
          </button>
        </form>
      </div>

      <p className="text-xs mt-4 text-center" style={{ color: "var(--text-muted)" }}>
        Setelah disimpan, kamu akan otomatis logout dan perlu login ulang dengan kredensial baru.
      </p>
    </div>
  );
}
