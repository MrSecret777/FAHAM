import { NextResponse } from "next/server";
import { getPublishedArticles } from "@/lib/supabase/articles";

export async function GET() {
  const articles = await getPublishedArticles();
  return NextResponse.json({ articles });
}
