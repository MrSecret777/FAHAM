import Link from "next/link";
import { articles as demoArticles } from "@/lib/content";
import { hasSupabaseEnv } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import { AdminArticle, AdminDashboard } from "./AdminDashboard";

const nav = ["Dashboard", "Penulisan", "Tulis Baharu", "Draf", "Siri & Koleksi", "Kategori", "Media", "Analytics", "Settings"];

function formatDate(value?: string | null) {
  if (!value) {
    return "Belum diterbitkan";
  }

  return new Intl.DateTimeFormat("ms-MY", { dateStyle: "medium" }).format(new Date(value));
}

async function getAdminArticles(): Promise<AdminArticle[]> {
  if (!hasSupabaseEnv()) {
    return demoArticles.map((article, index) => ({
      id: article.slug,
      title: article.title,
      slug: article.slug,
      status: index === 2 ? "draft" : "published",
      category: article.category,
      date: article.date,
      viewCount: 0
    }));
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("articles")
    .select("id,title,slug,status,published_at,scheduled_at,updated_at,view_count,categories(name)")
    .order("updated_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as Array<Record<string, any>>).map((article) => {
    const category = Array.isArray(article.categories) ? article.categories[0]?.name : article.categories?.name;
    const date = article.published_at || article.scheduled_at || article.updated_at;
    const status = ["draft", "published", "scheduled", "archived"].includes(article.status) ? article.status : "draft";

    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      status,
      category: category ?? "-",
      date: formatDate(date),
      viewCount: article.view_count ?? 0
    };
  });
}

export default async function AdminPage() {
  const articles = await getAdminArticles();

  return (
    <div className="min-h-screen bg-[#F5F2EC] text-faham-charcoal">
      <div className="grid min-h-screen md:grid-cols-[260px_1fr]">
        <aside className="bg-faham-green p-6 text-white">
          <div className="flex items-center justify-between">
            <p className="font-serif text-2xl font-semibold">FAHAM</p>
            <span className="h-8 w-8 rounded-full bg-white/15 text-center text-xs leading-8">FA</span>
          </div>
          <nav className="mt-10 grid gap-1 text-sm">
            {nav.map((item) => (
              <Link key={item} href={item === "Tulis Baharu" ? "/admin/editor" : "/admin"} className="rounded px-3 py-3 transition hover:bg-white/10">
                {item}
              </Link>
            ))}
          </nav>
          <a href="/admin/logout" className="mt-8 rounded border border-white/20 px-3 py-3 text-sm transition hover:bg-white/10">
            Logout
          </a>
        </aside>

        <main className="p-5 md:p-8">
          <div className="flex flex-col gap-3 border-b border-faham-line pb-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase text-faham-green">Admin</p>
              <h1 className="font-serif text-4xl font-semibold">Dashboard</h1>
            </div>
            <Link href="/admin/editor" className="border border-faham-green px-4 py-2 text-sm text-faham-green">
              Tulis Baharu
            </Link>
          </div>

          <AdminDashboard initialArticles={articles} />
        </main>
      </div>
    </div>
  );
}
