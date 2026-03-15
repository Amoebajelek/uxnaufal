"use client";

import { useState, useEffect, type ReactNode } from "react";
import { DashboardSidenav } from "./DashboardSidenav";

export function DashboardShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  /* Sync with localStorage after mount */
  useEffect(() => {
    const stored = localStorage.getItem("sidenav-collapsed");
    if (stored === "true") setCollapsed(true);
  }, []);

  function toggle() {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem("sidenav-collapsed", String(next));
      return next;
    });
  }

  const sidenavWidth = collapsed ? 64 : 240;

  return (
    <>
      <DashboardSidenav collapsed={collapsed} onToggle={toggle} />

      {/* Main content — margin-left follows sidenav width on desktop */}
      <main
        className="pt-14 md:pt-0 min-h-screen"
        style={{
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ["--sidenav-w" as any]: `${sidenavWidth}px`,
        }}
      >
        <style>{`
          @media (min-width: 768px) {
            .dashboard-main-inner {
              margin-left: var(--sidenav-w, 240px);
              transition: margin-left 300ms ease;
            }
          }
        `}</style>
        <div className="dashboard-main-inner">
          <div className="max-w-5xl mx-auto px-6 md:px-10 py-10">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
