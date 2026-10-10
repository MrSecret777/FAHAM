import { NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/env";
import { createSlug, estimateReadingMinutes } from "@/lib/slug";
import { createClient } from "@/lib/supabase/server";

type ArticlePayload = {
  id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  body?: string;
  status?: "draft" | "published" | "scheduled";
  categoryId?: string | null;
  seriesId?: string | null;
  coverPath?: string | null;
  scheduledAt?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
};

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function getAdminUser() {
  if (!hasSupabaseEnv()) {
    return { supabase: null, userId: "demo-admin" };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { supabase, userId: null };
  }

  return { supabase, userId: user.id };
}

export async function GET() {
  const { supabase, userId } = await getAdminUser();

  if (!userId) {
    return jsonError("Sesi admin tidak sah.", 401);
  }

  if (!supabase) {
    return NextResponse.json({
      articles: [
        {
          id: "demo-draft",
          title: "Draf demo FAHAM",
          slug: "draf-demo-faham",
          status: "draft",
          updated_at: new Date().toISOString()
        }
      ],
      mode: "demo"
    });
  }

  const { data, error } = await supabase
    .from("articles")
    .select("id,title,slug,excerpt,status,published_at,scheduled_at,updated_at,categories(name)")
    .order("updated_at", { ascending: false });

  if (error) {
    return jsonError(error.message, 500);
  }

  return NextResponse.json({ articles: data ?? [], mode: "supabase" });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ArticlePayload;
  const title = payload.title?.trim();
  const body = payload.body?.trim() ?? "";

  if (!title) {
    return jsonError("Tajuk artikel diperlukan.");
  }

  const { supabase, userId } = await getAdminUser();

  if (!userId) {
    return jsonError("Sesi admin tidak sah.", 401);
  }

  const requestedStatus = payload.status ?? "draft";
  const now = new Date().toISOString();
  const slug = createSlug(payload.slug || title);

  const articleRecord = {
    author_id: userId,
    category_id: payload.categoryId || null,
    series_id: payload.seriesId || null,
    title,
    slug,
    excerpt: payload.excerpt?.trim() || body.slice(0, 180),
    content: { type: "markdown", body },
    cover_path: payload.coverPath || null,
    status: requestedStatus,
    published_at: requestedStatus === "published" ? now : null,
    scheduled_at: requestedStatus === "scheduled" ? payload.scheduledAt || now : null,
    seo_title: payload.seoTitle || null,
    seo_description: payload.seoDescription || payload.excerpt || null,
    reading_minutes: estimateReadingMinutes(body)
  };

  if (!supabase) {
    return NextResponse.json({
      article: {
        id: payload.id || "demo-local-draft",
        ...articleRecord,
        author_id: "demo-admin",
        updated_at: now
      },
      mode: "demo"
    });
  }

  if (payload.id) {
    const { data, error } = await supabase
      .from("articles")
      .update(articleRecord)
      .eq("id", payload.id)
      .select("id,title,slug,status,published_at,scheduled_at,updated_at")
      .single();

    if (error) {
      return jsonError(error.message, 500);
    }

    return NextResponse.json({ article: data, mode: "supabase" });
  }

  const { data, error } = await supabase
    .from("articles")
    .insert(articleRecord)
    .select("id,title,slug,status,published_at,scheduled_at,updated_at")
    .single();

  if (error) {
    return jsonError(error.message, 500);
  }

  return NextResponse.json({ article: data, mode: "supabase" }, { status: 201 });
}
