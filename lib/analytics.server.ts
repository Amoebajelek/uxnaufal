/**
 * Server-only: analytics queries from Supabase page_views table.
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

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const now      = new Date();
  const todayISO = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const weekAgo  = new Date(now); weekAgo.setDate(now.getDate() - 7);
  const twoWeeks = new Date(now); twoWeeks.setDate(now.getDate() - 13);

  const [totalRes, todayRes, weekRes, topRes, dailyRes] = await Promise.all([
    supabase.from("page_views").select("*", { count: "exact", head: true }),
    supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", todayISO),
    supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", weekAgo.toISOString()),
    supabase.from("page_views").select("path").gte("created_at", weekAgo.toISOString()),
    supabase.from("page_views").select("created_at").gte("created_at", twoWeeks.toISOString()),
  ]);

  // Top pages count
  const pathMap: Record<string, number> = {};
  for (const r of topRes.data ?? []) {
    pathMap[r.path] = (pathMap[r.path] ?? 0) + 1;
  }
  const topPages = Object.entries(pathMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([path, count]) => ({ path, count }));

  // Daily views for chart (last 14 days)
  const dayMap: Record<string, number> = {};
  for (const r of dailyRes.data ?? []) {
    const day = (r.created_at as string).split("T")[0];
    dayMap[day] = (dayMap[day] ?? 0) + 1;
  }
  const dailyViews: DailyView[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now); d.setDate(now.getDate() - i);
    const key = d.toISOString().split("T")[0];
    dailyViews.push({ date: key, count: dayMap[key] ?? 0 });
  }

  return {
    total:      totalRes.count ?? 0,
    today:      todayRes.count ?? 0,
    week:       weekRes.count  ?? 0,
    dailyViews,
    topPages,
  };
}
