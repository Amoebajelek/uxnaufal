"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";
import { useLang } from "@/components/LanguageContext";
import { LangToggle } from "@/components/LangToggle";

// ─── Ambient background ───────────────────────────────────────────────────────
function Background() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <div
        className="absolute w-[480px] h-[480px] rounded-full blur-3xl opacity-[0.18]"
        style={{
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
          top: "-120px",
          right: "-80px",
        }}
      />
      <div
        className="absolute w-72 h-72 rounded-full blur-3xl opacity-[0.10]"
        style={{
          background: "radial-gradient(circle, var(--accent), transparent 70%)",
          bottom: "80px",
          left: "-60px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────
function LoginForm() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const nextPath     = searchParams.get("next") ?? "/dashboard";
  const { t }        = useLang();

  const [username,   setUsername]   = useState("");
  const [password,   setPassword]   = useState("");
  const [showPass,   setShowPass]   = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error,      setError]      = useState("");
  const [loading,    setLoading]    = useState(false);
  const [success,    setSuccess]    = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || success) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, rememberMe }),
      });
      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push(nextPath);
          router.refresh();
        }, 500);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? t("login.error.default"));
      }
    } catch {
      setError(t("login.error.network"));
    }
    setLoading(false);
  }

  const inputBase: React.CSSProperties = {
    backgroundColor: "var(--bg)",
    border: "1px solid var(--border)",
    color: "var(--text-primary)",
  };

  return (
    <div className="relative z-10 w-full max-w-[400px] mx-auto">

      {/* Brand */}
      <div className="text-center mb-10 select-none">
        <div
          className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
          style={{
            backgroundColor: "var(--accent-bg)",
            border: "1px solid var(--accent-border)",
          }}
        >
          <ShieldCheck size={26} style={{ color: "var(--accent)" }} />
        </div>
        <h1
          className="font-display font-extrabold text-3xl tracking-tight mb-1"
          style={{ color: "var(--text-primary)" }}
        >
          ux<span style={{ color: "var(--accent)" }}>naufal</span>
        </h1>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {t("login.subtitle")}
        </p>
      </div>

      {/* Card */}
      <div
        className="rounded-3xl border p-8"
        style={{
          backgroundColor: "var(--bg-secondary)",
          borderColor: "var(--border)",
          boxShadow: "0 32px 80px -16px rgba(0,0,0,0.25)",
        }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-5" autoComplete="on">

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Username
            </label>
            <div className="relative">
              <User
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(""); }}
                placeholder={t("login.username.ph")}
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputBase}
                required
                autoComplete="username"
                disabled={loading || success}
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={14}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--text-muted)" }}
              />
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder={t("login.password.ph")}
                className="w-full pl-9 pr-10 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputBase}
                required
                autoComplete="current-password"
                disabled={loading || success}
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 transition-opacity hover:opacity-70"
                style={{ color: "var(--text-muted)" }}
                tabIndex={-1}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative shrink-0">
              <input
                type="checkbox"
                className="sr-only"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading || success}
              />
              <div
                className="w-[18px] h-[18px] rounded-md flex items-center justify-center transition-all"
                style={{
                  backgroundColor: rememberMe ? "var(--accent)" : "var(--bg)",
                  border: rememberMe ? "2px solid var(--accent)" : "2px solid var(--border-strong)",
                }}
              >
                {rememberMe && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                    <path
                      d="M1 4.5L4 7.5L10 1"
                      stroke="#0a0a0a"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div>
              <div className="text-sm font-medium leading-tight" style={{ color: "var(--text-primary)" }}>
                {t("login.remember")}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                {t("login.remember.desc")}
              </div>
            </div>
          </label>

          {/* Error */}
          {error && (
            <div
              className="flex items-start gap-2.5 text-sm px-4 py-3 rounded-xl"
              style={{
                backgroundColor: "rgba(239,68,68,0.07)",
                color: "#ef4444",
                border: "1px solid rgba(239,68,68,0.25)",
              }}
            >
              <span className="shrink-0 font-bold mt-0.5 text-xs">✕</span>
              <span>{error}</span>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 mt-1"
            style={{
              backgroundColor: success ? "#22c55e" : "var(--accent)",
              color: "#0a0a0a",
            }}
          >
            {loading ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                {t("login.loading")}
              </>
            ) : success ? (
              <>
                <span className="text-base leading-none">✓</span>
                {t("login.success")}
              </>
            ) : (
              <>
                {t("login.submit")}
                <ArrowRight size={15} />
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
        {t("login.footer")}{" "}
        <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>{t("login.footer.duration")}</span>
      </p>
    </div>
  );
}

// ─── Page — standalone, no sidenav ───────────────────────────────────────────
export default function LoginPage() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-6 py-16"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <Background />
      {/* Language toggle — fixed top-right */}
      <div className="fixed top-4 right-4 z-50">
        <LangToggle />
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
