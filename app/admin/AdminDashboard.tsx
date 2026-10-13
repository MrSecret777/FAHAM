"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";

export type AdminArticle = {
  id: string;
  title: string;
  slug: string;
  status: "draft" | "published" | "scheduled" | "archived";
  category: string;
  date: string;
  viewCount: number;
};

type AdminDashboardProps = {
  initialArticles: AdminArticle[];
};

function statusClass(status: AdminArticle["status"]) {
  if (status === "published") {
    return "bg-green-100 text-faham-green";
  }

  if (status === "scheduled") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "archived") {
    return "bg-stone-200 text-stone-700";
  }

  return "bg-blue-100 text-blue-700";
}

export function AdminDashboard({ initialArticles }: AdminDashboardProps) {
  const [articles, setArticles] = useState(initialArticles);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const stats = useMemo(() => {
    const published = articles.filter((article) => article.status === "published").length;
    const drafts = articles.filter((article) => article.status === "draft").length;
    const views = articles.reduce((total, article) => total + article.viewCount, 0);

    return [
      { label: "Jumlah Penulisan", value: String(articles.length) },
      { label: "Diterbitkan", value: String(published) },
      { label: "Draf", value: String(drafts) },
      { label: "Jumlah Paparan", value: views.toLocaleString("ms-MY") }
    ];
  }, [articles]);

  function deleteArticle(article: AdminArticle) {
    const confirmed = window.confirm(`Padam artikel "${article.title}"? Tindakan ini tidak boleh dibuat asal.`);

    if (!confirmed) {
      return;
    }

    startTransition(async () => {
      setMessage("Memadam artikel...");

      const response = await fetch(`/api/admin/articles?id=${encodeURIComponent(article.id)}`, {
        method: "DELETE"
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.error || "Artikel gagal dipadam.");
        return;
      }

      setArticles((current) => current.filter((item) => item.id !== article.id));
      setMessage("Artikel berjaya dipadam.");
    });
  }

  return (
    <>
      <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="border border-faham-line bg-white p-5">
            <p className="font-serif text-3xl font-semibold">{stat.value}</p>
            <p className="mt-1 text-sm text-faham-muted">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-7 border border-faham-line bg-white">
        <div className="flex flex-col gap-3 border-b border-faham-line p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold">Penulisan Terkini</h2>
            {message ? <p className="mt-1 text-sm text-faham-green">{message}</p> : null}
          </div>
          <Link href="/admin/editor" className="bg-faham-green px-4 py-2 text-sm text-white">
            Tulis Baharu
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-[#F7F4EF] text-faham-muted">
              <tr>
                <th className="px-5 py-3 font-medium">Tajuk</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Kategori</th>
                <th className="px-5 py-3 font-medium">Tarikh</th>
                <th className="px-5 py-3 font-medium">Tindakan</th>
              </tr>
            </thead>
            <tbody>
              {articles.length ? (
                articles.map((article) => (
                  <tr key={article.id} className="border-t border-faham-line">
                    <td className="px-5 py-4 font-medium">{article.title}</td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 text-xs capitalize ${statusClass(article.status)}`}>{article.status}</span>
                    </td>
                    <td className="px-5 py-4 text-faham-muted">{article.category}</td>
                    <td className="px-5 py-4 text-faham-muted">{article.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-3 text-faham-muted">
                        <Link className="hover:text-faham-green" href={`/admin/editor?id=${article.id}`}>
                          Edit
                        </Link>
                        <Link className="hover:text-faham-green" href={`/penulisan/${article.slug}`} target="_blank">
                          Preview
                        </Link>
                        <button className="text-red-700 hover:text-red-900 disabled:opacity-50" disabled={isPending} onClick={() => deleteArticle(article)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-5 py-8 text-center text-faham-muted" colSpan={5}>
                    Belum ada artikel. Klik Tulis Baharu untuk mula.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
