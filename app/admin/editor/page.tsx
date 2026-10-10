import Link from "next/link";
import { ArticleEditor } from "./ArticleEditor";

export default function EditorPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EC] p-5 text-faham-charcoal md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 border-b border-faham-line pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/admin" className="text-sm text-faham-green">
              Dashboard
            </Link>
            <h1 className="mt-3 font-serif text-4xl font-semibold">Tulis Baharu</h1>
            <p className="mt-2 text-faham-muted">Editor artikel dengan autosave, preview, publish dan schedule.</p>
          </div>
        </div>

        <ArticleEditor />
      </div>
    </main>
  );
}
