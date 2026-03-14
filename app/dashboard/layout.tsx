import type { ReactNode } from "react";
import { DashboardSidenav } from "@/components/dashboard/DashboardSidenav";

export const metadata = { title: "Dashboard — uxnaufal" };

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ backgroundColor: "var(--bg)", minHeight: "100vh" }}>
      <DashboardSidenav />
      {/* Offset for sidenav: md:ml-60, mobile: pt-14 */}
      <main className="md:ml-60 pt-14 md:pt-0">
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
