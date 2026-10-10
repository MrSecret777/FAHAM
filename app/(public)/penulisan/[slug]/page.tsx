import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard } from "@/components/ArticleCard";
import { PublicShell } from "@/components/PublicShell";
import { articles } from "@/lib/content";

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = articles.find((item) => item.slug === params.slug);
  if (!article) notFound();

  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 2);

  return (
    <PublicShell>
      <article className="mx-auto max-w-4xl px-5 py-10 md:px-8 md:py-14">
        <div className="text-sm text-faham-muted">
          <Link href="/">Utama</Link> / <Link href="/penulisan">Penulisan</Link>
        </div>
        <p className="mt-8 text-xs font-semibold uppercase text-faham-green">{article.category}</p>
        <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight md:text-6xl">{article.title}</h1>
        <p className="mt-4 text-sm text-faham-muted">
          {article.date} · {article.readTime}
        </p>
        <Image src={article.image} alt="" width={1100} height={620} priority className="mt-8 aspect-[16/8] w-full object-cover shadow-paper" />

        <div className="article-body mx-auto mt-10 max-w-2xl font-serif text-lg">
          <p>
            Setiap manusia membawa persoalan sendiri. Dalam kehidupan yang sentiasa berubah, kita mencari jawapan tentang siapa diri kita, ke mana kita menuju, dan apa yang sebenarnya bermakna.
          </p>
          <p>
            Persoalan ini hadir dalam pelbagai bentuk. Ada yang datang ketika kita berdepan dengan perubahan besar dalam hidup. Ada yang muncul dalam hening malam, sewaktu semua perkara yang biasa kelihatan tidak lagi memberi jawapan yang memadai.
          </p>
          <h2 className="mt-10 font-serif text-3xl font-semibold">Memahami Persoalan</h2>
          <p>
            Pencarian makna bukan sekadar soal emosi atau pengalaman peribadi. Ia melibatkan cara kita melihat diri, kehidupan dan realiti di sekeliling kita. Ia juga berkait rapat dengan persoalan tentang tujuan kewujudan manusia dan tempat kita dalam dunia ini.
          </p>
          <blockquote>"Pencarian makna adalah sebahagian daripada fitrah manusia yang sentiasa ingin memahami hakikat kehidupan."</blockquote>
          <p>
            Dalam dunia yang semakin kompleks, persoalan ini menjadi lebih penting. Maka, memahami pencarian makna bukan sekadar satu pilihan, tetapi satu keperluan.
          </p>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center gap-4 border-t border-faham-line pt-6 text-sm">
          <span>Kongsi:</span>
          <button className="text-faham-green">WhatsApp</button>
          <button className="text-faham-green">Facebook</button>
          <button className="text-faham-green">Salin Link</button>
        </div>
      </article>

      <section className="mx-auto max-w-5xl px-5 pb-16 md:px-8">
        <h2 className="font-serif text-3xl font-semibold">Artikel Berkaitan</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {related.map((item) => (
            <ArticleCard key={item.slug} article={item} compact />
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
