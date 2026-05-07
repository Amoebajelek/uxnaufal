export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-4">
      <div className="h-8 w-48 rounded-xl animate-pulse" style={{ backgroundColor: "var(--bg-secondary)" }} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-28 rounded-2xl border animate-pulse"
            style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
          />
        ))}
      </div>
      <div
        className="h-72 rounded-2xl border animate-pulse"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
      />
    </div>
  );
}
