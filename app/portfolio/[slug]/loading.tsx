export default function PortfolioLoading() {
  return (
    <main className="min-h-screen px-6 py-10" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <div className="h-6 w-36 rounded-lg animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }} />
        <div className="h-16 w-full max-w-3xl rounded-2xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }} />
        <div className="h-[360px] rounded-2xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }} />
      </div>
    </main>
  );
}
