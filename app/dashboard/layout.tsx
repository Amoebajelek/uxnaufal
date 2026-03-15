import type { ReactNode } from "react";

export const metadata = { title: "Dashboard — uxnaufal" };

// Root dashboard layout — minimal wrapper shared by both (auth) and (main) groups.
// Each group adds its own layout on top of this.
export default function DashboardRootLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
