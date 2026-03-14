"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.push("/dashboard");
        router.refresh();
      } else {
        setError("Username atau password salah.");
      }
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
    }
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div
            className="font-display font-extrabold text-2xl tracking-tight mb-1"
            style={{ color: "var(--text-primary)" }}
          >
            ux<span style={{ color: "var(--accent)" }}>naufal</span>
          </div>
          <p className="text-xs uppercase tracking-widest font-medium" style={{ color: "var(--text-muted)" }}>
            Dashboard
          </p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl border p-8"
          style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          <h1 className="font-display font-bold text-xl mb-6" style={{ color: "var(--text-primary)" }}>
            Masuk ke CMS
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div>
              <label
                className="text-xs uppercase tracking-widest font-medium block mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Username
              </label>
              <div className="relative">
                <User
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                className="text-xs uppercase tracking-widest font-medium block mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "var(--bg)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                  style={{ color: "var(--text-muted)" }}
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {error && (
              <p
                className="text-xs px-3 py-2 rounded-lg"
                style={{ backgroundColor: "rgba(239,68,68,0.08)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl text-sm font-semibold mt-2 transition-all hover:opacity-85 active:scale-[0.98] disabled:opacity-50"
              style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
            >
              {loading ? "Memverifikasi…" : "Masuk"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
          Default: <span className="font-mono">admin</span> / <span className="font-mono">admin</span>
        </p>
      </div>
    </div>
  );
}
