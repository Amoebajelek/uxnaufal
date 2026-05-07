import Link from "next/link";

export default function PortfolioNotFound() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}
    >
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "var(--text-muted)" }}>
          Portfolio
        </p>
        <h1 className="font-display font-bold text-3xl mb-3">
          Project tidak ditemukan
        </h1>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Link ini mungkin sudah berubah atau project belum dipublikasikan.
        </p>
        <Link
          href="/#portfolio"
          className="inline-flex px-5 py-3 rounded-xl text-sm font-semibold"
          style={{ backgroundColor: "var(--accent)", color: "#0a0a0a" }}
        >
          Lihat portfolio
        </Link>
      </div>
    </main>
  );
}
