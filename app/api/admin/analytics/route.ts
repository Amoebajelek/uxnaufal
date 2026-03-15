import { NextResponse } from "next/server";
import { getAnalyticsSummary } from "@/lib/analytics.server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const days = Math.min(90, Math.max(7, parseInt(searchParams.get("days") ?? "14", 10)));
  const summary = await getAnalyticsSummary(days);
  return NextResponse.json(summary);
}
