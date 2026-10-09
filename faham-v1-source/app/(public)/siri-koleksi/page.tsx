import Image from "next/image";
import { PublicShell } from "@/components/PublicShell";
import { series } from "@/lib/content";

export default function SeriesPage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <h1 className="font-serif text-4xl font-semibold md:text-5xl">Siri & Koleksi</h1>
        <p className="mt-3 max-w-2xl text-lg text-faham-muted">Kumpulan penulisan yang saling berkaitan dalam satu tema. Semua kad di bawah menggunakan kandungan demo.</p>

        <div className="mt-9 grid gap-6 md:grid-cols-3">
          {series.map((item) => (
            <article key={item.title} className="border border-faham-line bg-white/45">
              <Image src={item.image} alt="" width={700} height={420} className="h-48 w-full object-cover" />
              <div className="p-6">
                <h2 className="font-serif text-2xl font-semibold">{item.title}</h2>
                <p className="mt-2 text-faham-muted">{item.count}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
