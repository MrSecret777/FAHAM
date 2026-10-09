import { ArticleCard } from "@/components/ArticleCard";
import { PublicShell } from "@/components/PublicShell";
import { articles, categories } from "@/lib/content";

export default function WritingPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        <h1 className="font-serif text-4xl font-semibold md:text-5xl">Penulisan</h1>
        <p className="mt-3 max-w-2xl text-lg text-faham-muted">Himpunan penulisan, pemikiran dan kefahaman. Kandungan di laman ini ialah demo untuk FAHAM Versi 1.0.</p>

        <div className="mt-8 grid gap-4 md:grid-cols-[1fr_220px]">
          <label className="block">
            <span className="sr-only">Cari penulisan</span>
            <input className="h-12 w-full border border-faham-line bg-white/50 px-4 outline-none focus:border-faham-green" placeholder="Cari penulisan..." />
          </label>
          <select className="h-12 border border-faham-line bg-white/50 px-4 outline-none focus:border-faham-green" defaultValue="Semua Kategori">
            <option>Semua Kategori</option>
            {categories.map((category) => (
              <option key={category.name}>{category.name}</option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <button className="border-b border-faham-green pb-1 text-faham-green">Semua</button>
          {categories.map((category) => (
            <button key={category.name} className="pb-1 text-faham-muted transition hover:text-faham-green">
              {category.name}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} compact />
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-3 text-sm">
          <span className="flex h-9 w-9 items-center justify-center bg-faham-green text-white">1</span>
          <span className="flex h-9 w-9 items-center justify-center">2</span>
          <span className="flex h-9 w-9 items-center justify-center">3</span>
          <span className="px-2">...</span>
          <span className="flex h-9 w-9 items-center justify-center">8</span>
          <span>→</span>
        </div>
      </section>
    </PublicShell>
  );
}
