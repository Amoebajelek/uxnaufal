/**
 * Server-only: analytics queries from Supabase page_views table.
 * All date arithmetic uses UTC to match Supabase timestamp storage.
 */
import { supabase } from "./supabase.server";

export interface DailyView { date: string; count: number }
export interface TopPage   { path: string; count: number }

export interface AnalyticsSummary {
  total:      number;
  today:      number;
  week:       number;
  dailyViews: DailyView[];
  topPages:   TopPage[];
}

/** Returns "YYYY-MM-DD" for a UTC date offset by `daysAgo`. */
function utcDate(daysAgo = 0): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - daysAgo);
  return d.toISOString().split("T")[0];
}

/** Returns ISO string for midnight UTC today minus `daysAgo` days. */
function utcDayStart(daysAgo = 0): string {
  return `${utcDate(daysAgo)}T00:00:00.000Z`;
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const [totalRes, todayRes, weekRes, topRes, dailyRes] = await Promise.all([
    supabase.from("page_views").select("*", { count: "exact", head: true }),

    supabase.from("page_views").select("*", { count: "exact", head: true })
      .gte("created_at", utcDayStart(0)),

    supabase.from("page_views").select("*", { count: "exact", head: true })
      .gte("created_at", utcDayStart(7)),

    supabase.from("page_views").select("path")
      .gte("created_at", utcDayStart(7)),

    supabase.from("page_views").select("created_at")
      .gte("created_at", utcDayStart(13)),
  ]);

  // Top pages (last 7 days)
  const pathMap: Record<string, number> = {};
  for (const r of topRes.data ?? []) {
    pathMap[r.path] = (pathMap[r.path] ?? 0) + 1;
  }
  const topPages = Object.entries(pathMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, count]) => ({ path, count }));

  // Daily views for chart — last 14 days (UTC dates)
  const dayMap: Record<string, number> = {};
  for (const r of dailyRes.data ?? []) {
    const day = (r.created_at as string).split("T")[0];
    dayMap[day] = (dayMap[day] ?? 0) + 1;
  }

  const dailyViews: DailyView[] = [];
  for (let i = 13; i >= 0; i--) {
    const date = utcDate(i);
    dailyViews.push({ date, count: dayMap[date] ?? 0 });
  }

  return {
    total:      totalRes.count ?? 0,
    today:      todayRes.count ?? 0,
    week:       weekRes.count  ?? 0,
    dailyViews,
    topPages,
  };
}
