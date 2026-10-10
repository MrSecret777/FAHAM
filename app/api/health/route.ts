import { NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/env";

export function GET() {
  return NextResponse.json({
    ok: true,
    app: "FAHAM",
    supabaseConfigured: hasSupabaseEnv(),
    timestamp: new Date().toISOString()
  });
}
