"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import { createSlug } from "@/lib/slug";

type SaveStatus = "idle" | "saving" | "saved" | "error";
type PublishStatus = "draft" | "published" | "scheduled";

const initialBody =
  "Ini ialah kandungan demo editor FAHAM.\n\nAutosave akan menyimpan perubahan sebagai draf di Supabase.\n\nPreview akan memaparkan artikel dalam reka letak bacaan sebenar sebelum diterbitkan.";

function formatTime(date: Date) {
  return new Intl.DateTimeFormat("ms-MY", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);
}

export function ArticleEditor() {
  const [articleId, setArticleId] = useState<string | null>(null);
  const [title, setTitle] = useState("Tajuk penulisan demo");
  const [slug, setSlug] = useState("tajuk-penulisan-demo");
  const [excerpt, setExcerpt] = useState("Ringkasan pendek artikel untuk paparan senarai dan SEO.");
  const [body, setBody] = useState(initialBody);
  const [category, setCategory] = useState("Pemikiran");
  const [status, setStatus] = useState<PublishStatus>("draft");
  const [scheduledAt, setScheduledAt] = useState("");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();
  const changedByUser = useRef(false);

  const previewParagraphs = useMemo(() => body.split(/\n{2,}/).filter(Boolean), [body]);

  useEffect(() => {
    if (!changedByUser.current) {
      return;
    }

    const timeout = window.setTimeout(() => {
      void saveArticle("draft", true);
    }, 1800);

    return () => window.clearTimeout(timeout);
  }, [title, slug, excerpt, body, category]);

  function markChanged() {
    changedByUser.current = true;
    setSaveStatus("idle");
    setMessage("");
  }

  async function saveArticle(nextStatus: PublishStatus = status, autosave = false) {
    setSaveStatus("saving");
    setMessage(autosave ? "Autosave sedang berjalan..." : "Menyimpan artikel...");

    const response = await fetch("/api/admin/articles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: articleId,
        title,
        slug,
        excerpt,
        body,
        status: nextStatus,
        scheduledAt: nextStatus === "scheduled" ? scheduledAt : null
      })
    });

    const result = await response.json();

    if (!response.ok) {
      setSaveStatus("error");
      setMessage(result.error || "Artikel gagal disimpan.");
      return;
    }

    setArticleId(result.article.id);
    setStatus(nextStatus);
    setSaveStatus("saved");
    setLastSavedAt(new Date());
    setMessage(result.mode === "demo" ? "Disimpan dalam mod demo. Sambung Supabase untuk simpan sebenar." : "Artikel berjaya disimpan.");
  }

  function runSave(nextStatus: PublishStatus) {
    startTransition(() => {
      void saveArticle(nextStatus);
    });
  }

  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
      <section className="border border-faham-line bg-white p-5">
        <input
          className="w-full border-0 border-b border-faham-line pb-4 font-serif text-4xl font-semibold outline-none focus:border-faham-green"
          value={title}
          onChange={(event) => {
            markChanged();
            setTitle(event.target.value);
            setSlug(createSlug(event.target.value));
          }}
        />

        <div className="mt-5 grid gap-4 border-b border-faham-line pb-5 md:grid-cols-[1fr_220px]">
          <label className="grid gap-2 text-sm">
            Slug
            <input
              className="h-11 border border-faham-line px-3 outline-none focus:border-faham-green"
              value={slug}
              onChange={(event) => {
                markChanged();
                setSlug(createSlug(event.target.value));
              }}
            />
          </label>
          <label className="grid gap-2 text-sm">
            Kategori
            <select
              className="h-11 border border-faham-line px-3 outline-none focus:border-faham-green"
              value={category}
              onChange={(event) => {
                markChanged();
                setCategory(event.target.value);
              }}
            >
              <option>Pemikiran</option>
              <option>Kehidupan</option>
              <option>Masyarakat</option>
              <option>Sejarah</option>
              <option>Ekonomi</option>
              <option>Agama</option>
            </select>
          </label>
        </div>

        <label className="mt-5 grid gap-2 text-sm">
          Ringkasan
          <textarea
            className="min-h-24 w-full border border-faham-line p-3 outline-none focus:border-faham-green"
            value={excerpt}
            onChange={(event) => {
              markChanged();
              setExcerpt(event.target.value);
            }}
          />
        </label>

        <textarea
          className="mt-5 min-h-[520px] w-full resize-y border border-faham-line p-4 font-serif text-lg leading-8 outline-none focus:border-faham-green"
          value={body}
          onChange={(event) => {
            markChanged();
            setBody(event.target.value);
          }}
        />
      </section>

      <aside className="grid content-start gap-5">
        <section className="border border-faham-line bg-white p-5">
          <h2 className="font-serif text-2xl font-semibold">Workflow</h2>
          <p className="mt-2 text-sm text-faham-muted">
            Status semasa: <span className="font-medium text-faham-charcoal">{status}</span>
          </p>

          <div className="mt-5 grid gap-3">
            <button
              className="border border-faham-green px-5 py-3 text-sm text-faham-green disabled:opacity-50"
              disabled={isPending || saveStatus === "saving"}
              onClick={() => runSave("draft")}
            >
              Simpan Draf
            </button>
            <button
              className="bg-faham-green px-5 py-3 text-sm text-white disabled:opacity-50"
              disabled={isPending || saveStatus === "saving"}
              onClick={() => runSave("published")}
            >
              Publish
            </button>
          </div>

          <label className="mt-5 grid gap-2 text-sm">
            Jadual penerbitan
            <input
              type="datetime-local"
              className="h-11 border border-faham-line px-3 outline-none focus:border-faham-green"
              value={scheduledAt}
              onChange={(event) => setScheduledAt(event.target.value)}
            />
          </label>
          <button
            className="mt-3 w-full border border-faham-line px-5 py-3 text-sm text-faham-muted hover:border-faham-green hover:text-faham-green disabled:opacity-50"
            disabled={!scheduledAt || isPending || saveStatus === "saving"}
            onClick={() => runSave("scheduled")}
          >
            Schedule
          </button>
        </section>

        <section className="border border-faham-line bg-white p-5">
          <h2 className="font-serif text-2xl font-semibold">Autosave</h2>
          <p className="mt-2 text-sm text-faham-muted">
            {saveStatus === "saving" && "Sedang menyimpan..."}
            {saveStatus === "saved" && lastSavedAt && `Disimpan pada ${formatTime(lastSavedAt)}.`}
            {saveStatus === "error" && "Gagal menyimpan."}
            {saveStatus === "idle" && "Menunggu perubahan."}
          </p>
          {message ? <p className="mt-3 text-sm text-faham-green">{message}</p> : null}
        </section>

        <section className="border border-faham-line bg-white p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-faham-green">Preview</p>
          <h2 className="mt-3 font-serif text-3xl font-semibold">{title || "Tanpa tajuk"}</h2>
          <p className="mt-2 text-sm text-faham-muted">{category} · 5 minit bacaan</p>
          <div className="article-body mt-5 border-t border-faham-line pt-4 font-serif text-[17px]">
            {previewParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}
