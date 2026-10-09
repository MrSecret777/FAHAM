import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleCard({ article, compact = false }: { article: Article; compact?: boolean }) {
  if (compact) {
    return (
      <Link href={`/penulisan/${article.slug}`} className="grid grid-cols-[116px_1fr] gap-4 border-b border-faham-line pb-5">
        <Image src={article.image} alt="" width={232} height={140} className="h-24 w-full object-cover" />
        <div>
          <h3 className="font-serif text-lg font-semibold leading-tight">{article.title}</h3>
          <p className="mt-1 text-xs text-faham-muted">
            {article.category} · {article.date} · {article.readTime}
          </p>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-faham-muted">{article.excerpt}</p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/penulisan/${article.slug}`} className="group block">
      <Image src={article.image} alt="" width={600} height={360} className="aspect-[4/3] w-full object-cover" />
      <p className="mt-4 text-xs font-semibold uppercase text-faham-green">{article.category}</p>
      <h3 className="mt-1 font-serif text-lg font-semibold leading-tight group-hover:text-faham-green">{article.title}</h3>
      <p className="mt-2 text-sm text-faham-muted">{article.date}</p>
      <p className="mt-1 text-sm text-faham-muted">{article.readTime}</p>
    </Link>
  );
}
