"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff, ShieldCheck, Save } from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();
  const [currentUsername, setCurrentUsername] = useState("");

  // Form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // UI state
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch("/api/admin/password")
      .then((r) => r.json())
      .then((d) => {
        setCurrentUsername(d.username ?? "admin");
        setNewUsername(d.username ?? "admin");
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError("Password baru dan konfirmasi tidak cocok.");
      return;
    }
    if (newPassword.length < 4) {
      setError("Password baru minimal 4 karakter.");
      return;
    }
    if (newUsername.trim().length < 3) {
      setError("Username minimal 3 karakter.");
      return;
    }

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

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Gagal menyimpan.");
      } else {
        setSuccess(true);
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setCurrentUsername(newUsername.trim());
        // Re-login required if username changed
        setTimeout(() => {
          fetch("/api/admin/auth", { method: "DELETE" }).then(() => {
            router.push("/admin/login");
          });
        }, 1800);
      }
    } catch {
      setError("Koneksi gagal. Coba lagi.");
    }
    setSaving(false);
  }

  /* ─── Strength indicator ─── */
  function strength(pw: string): { level: number; label: string; color: string } {
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

  const str = strength(newPassword);

  return (
    <div className="max-w-xl">
      {/* Header */}
      <div className="mb-10">
        <h1
          className="font-display font-extrabold text-3xl tracking-tight mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Pengaturan
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Kelola kredensial login CMS
        </p>
      </div>

      {/* Current account info */}
      <div
        className="rounded-2xl border p-5 mb-6 flex items-center gap-4"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: "var(--accent-bg)", border: "1px solid var(--accent-border)" }}
        >
          <ShieldCheck size={18} style={{ color: "var(--accent)" }} />
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest font-medium mb-0.5" style={{ color: "var(--text-muted)" }}>
            Akun Aktif
          </div>
          <div className="font-display font-semibold text-base" style={{ color: "var(--text-primary)" }}>
            {currentUsername || "—"}
          </div>
        </div>
      </div>

      {/* Change password form */}
      <div
        className="rounded-2xl border p-6"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <h2
          className="font-display font-semibold text-base mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Ubah Kredensial
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* New username */}
          <div>
            <label
              className="text-xs uppercase tracking-widest font-medium block mb-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Username Baru
            </label>
            <div className="relative">
              <User size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                placeholder="username baru"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="h-px" style={{ backgroundColor: "var(--border)" }} />

          {/* Current password */}
          <div>
            <label
              className="text-xs uppercase tracking-widest font-medium block mb-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Password Saat Ini
            </label>
            <div className="relative">
              <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type={showCurrent ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                placeholder="password saat ini"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrent((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                style={{ color: "var(--text-muted)" }}
              >
                {showCurrent ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
          </div>

          {/* New password */}
          <div>
            <label
              className="text-xs uppercase tracking-widest font-medium block mb-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Password Baru
            </label>
            <div className="relative">
              <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm outline-none"
                style={{ backgroundColor: "var(--bg)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
                placeholder="minimal 4 karakter"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowNew((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                style={{ color: "var(--text-muted)" }}
              >
                {showNew ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
            {/* Strength bar */}
            {newPassword && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-1 flex-1 rounded-full transition-all duration-300"
                      style={{
                        backgroundColor: i <= str.level ? str.color : "var(--border)",
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: str.color }}>
                  {str.label}
                </p>
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div>
            <label
              className="text-xs uppercase tracking-widest font-medium block mb-1.5"
              style={{ color: "var(--text-muted)" }}
            >
              Konfirmasi Password Baru
            </label>
            <div className="relative">
              <Lock size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: "var(--text-muted)" }} />
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm outline-none"
                style={{
                  backgroundColor: "var(--bg)",
                  border: `1px solid ${
                    confirmPassword && confirmPassword !== newPassword
                      ? "rgba(239,68,68,0.5)"
                      : "var(--border)"
                  }`,
                  color: "var(--text-primary)",
                }}
                placeholder="ulangi password baru"
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                style={{ color: "var(--text-muted)" }}
              >
                {showConfirm ? <EyeOff size={13} /> : <Eye size={13} />}
              </button>
            </div>
            {confirmPassword && confirmPassword !== newPassword && (
              <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>
                Password tidak cocok
              </p>
            )}
          </div>

          {/* Error / success */}
          {error && (
            <div
              className="text-sm px-4 py-3 rounded-xl"
              style={{
                backgroundColor: "rgba(239,68,68,0.08)",
                color: "#ef4444",
                border: "1px solid rgba(239,68,68,0.2)",
              }}
            >
              {error}
            </div>
          )}

          {success && (
            <div
              className="text-sm px-4 py-3 rounded-xl"
              style={{
                backgroundColor: "rgba(34,197,94,0.08)",
                color: "#22c55e",
                border: "1px solid rgba(34,197,94,0.2)",
              }}
            >
              ✓ Kredensial berhasil diperbarui. Kamu akan diarahkan ke halaman login…
            </div>
          )}

          <button
            type="submit"
            disabled={saving || success}
            className="inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-85 active:scale-[0.98] disabled:opacity-50 mt-1"
            style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
          >
            <Save size={14} />
            {saving ? "Menyimpan…" : "Simpan Perubahan"}
          </button>
        </form>
      </div>

      <p className="text-xs mt-4 text-center" style={{ color: "var(--text-muted)" }}>
        Setelah menyimpan, kamu akan otomatis logout dan perlu login ulang.
      </p>
    </div>
  );
}
