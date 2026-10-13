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
  category?: string | null;
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

export async function GET(request: Request) {
  const { supabase, userId } = await getAdminUser();

  if (!userId) {
    return jsonError("Sesi admin tidak sah.", 401);
  }

  const id = request ? new URL(request.url).searchParams.get("id") : null;

  if (!supabase) {
    if (id) {
      return NextResponse.json({
        article: {
          id,
          title: "Draf demo FAHAM",
          slug: "draf-demo-faham",
          excerpt: "Ringkasan demo.",
          body: "Kandungan demo editor FAHAM.",
          status: "draft",
          category: "Pemikiran",
          scheduledAt: null
        },
        mode: "demo"
      });
    }

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

  if (id) {
    const { data, error } = await supabase
      .from("articles")
      .select("id,title,slug,excerpt,content,status,scheduled_at,cover_path,seo_title,seo_description,categories(name)")
      .eq("id", id)
      .single();

    if (error) {
      return jsonError(error.message, 404);
    }

    const article = data as Record<string, any>;
    const category = Array.isArray(article.categories) ? article.categories[0]?.name : article.categories?.name;

    return NextResponse.json({
      article: {
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt ?? "",
        body: article.content?.body ?? "",
        status: article.status,
        category: category ?? "Pemikiran",
        scheduledAt: article.scheduled_at ?? "",
        coverPath: article.cover_path,
        seoTitle: article.seo_title,
        seoDescription: article.seo_description
      },
      mode: "supabase"
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
  let categoryId = payload.categoryId || null;

  if (supabase && !categoryId && payload.category) {
    const categorySlug = createSlug(payload.category);
    const { data: category } = await supabase.from("categories").select("id").eq("slug", categorySlug).maybeSingle();
    categoryId = category?.id ?? null;
  }

  const articleRecord = {
    author_id: userId,
    category_id: categoryId,
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

export async function DELETE(request: Request) {
  const { supabase, userId } = await getAdminUser();
  const id = new URL(request.url).searchParams.get("id");

  if (!userId) {
    return jsonError("Sesi admin tidak sah.", 401);
  }

  if (!id) {
    return jsonError("ID artikel diperlukan.");
  }

  if (!supabase) {
    return NextResponse.json({ deleted: true, mode: "demo" });
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    return jsonError(error.message, 500);
  }

  return NextResponse.json({ deleted: true, mode: "supabase" });
}
