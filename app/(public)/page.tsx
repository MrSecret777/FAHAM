import Image from "next/image";
import Link from "next/link";
import { ArticleCard } from "@/components/ArticleCard";
import { PublicShell } from "@/components/PublicShell";
import { categories, featuredArticle, latestArticles, series } from "@/lib/content";

export default function HomePage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="text-center">
          <h1 className="font-serif text-5xl font-semibold md:text-7xl">FAHAM</h1>
          <p className="mt-3 font-serif text-xl">Lebih Daripada Sekadar Tahu.</p>
          <div className="mx-auto mt-5 h-px w-28 bg-faham-green" />
        </div>

        <div className="mt-10 grid items-center gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <Image src={featuredArticle.image} alt="" width={900} height={540} priority className="aspect-[16/9] w-full object-cover shadow-paper" />
          <article>
            <p className="text-xs font-semibold uppercase text-faham-green">{featuredArticle.category}</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold leading-tight md:text-4xl">{featuredArticle.title}</h2>
            <p className="mt-5 max-w-xl leading-8 text-faham-muted">{featuredArticle.excerpt}</p>
            <Link href={`/penulisan/${featuredArticle.slug}`} className="mt-6 inline-flex text-sm font-semibold text-faham-green">
              Baca Selanjutnya →
            </Link>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold">Penulisan Terkini</h2>
          <Link href="/penulisan" className="text-sm text-faham-green">
            Lihat Semua →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-12 md:px-8">
        <h2 className="font-serif text-3xl font-semibold">Terokai Topik</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-6">
          {categories.map((category) => (
            <Link key={category.name} href={`/penulisan?category=${category.name}`} className="border border-faham-line bg-white/45 p-5 text-center transition hover:border-faham-green">
              <span className="block font-serif font-semibold">{category.name}</span>
              <span className="mt-1 block text-sm text-faham-muted">{category.count}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl font-semibold">Siri Penulisan</h2>
          <Link href="/siri-koleksi" className="text-sm text-faham-green">
            Lihat Semua →
          </Link>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {series.map((item) => (
            <Link key={item.title} href="/siri-koleksi" className="border border-faham-line bg-white/45">
              <Image src={item.image} alt="" width={600} height={260} className="h-36 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-serif text-xl font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-faham-muted">{item.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
