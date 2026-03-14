"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Records a page view on each unique path visit per browser session.
 * Deduplicates using sessionStorage so refreshes don't inflate counts.
 */
export function PageTracker() {
  const pathname = usePathname();
  const tracked  = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (!pathname) return;
    if (pathname.startsWith("/dashboard") || pathname.startsWith("/api")) return;

    // Session-level dedup via ref (cleared on new tab/window)
    if (tracked.current.has(pathname)) return;
    tracked.current.add(pathname);

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path:     pathname,
        referrer: typeof document !== "undefined" ? document.referrer || null : null,
      }),
    }).catch(() => {});
  }, [pathname]);

  return null;
}
