import { articles as demoArticles } from "@/lib/content";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

export async function getPublishedArticles() {
  if (!hasSupabaseEnv()) {
    return demoArticles;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("slug,title,excerpt,status,published_at,cover_path,categories(name)")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (error || !data) {
    return demoArticles;
  }

  return (data as Array<Record<string, any>>).map((article) => {
    const category = Array.isArray(article.categories) ? article.categories[0]?.name : article.categories?.name;

    return {
      slug: article.slug,
      title: article.title,
      category: category ?? "Pemikiran",
      date: article.published_at ? new Intl.DateTimeFormat("ms-MY", { dateStyle: "long" }).format(new Date(article.published_at)) : "Demo",
      readTime: "5 minit bacaan",
      excerpt: article.excerpt ?? "",
      image: article.cover_path || "/images/mountain.svg"
    };
  });
}
