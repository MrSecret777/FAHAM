import Link from "next/link";

export default function EditorPage() {
  return (
    <main className="min-h-screen bg-[#F5F2EC] p-5 text-faham-charcoal md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-3 border-b border-faham-line pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/admin" className="text-sm text-faham-green">
              ← Dashboard
            </Link>
            <h1 className="mt-3 font-serif text-4xl font-semibold">Tulis Baharu</h1>
            <p className="mt-2 text-faham-muted">Editor demo untuk autosave draf, preview dan penerbitan.</p>
          </div>
          <div className="flex gap-3">
            <button className="border border-faham-green px-5 py-3 text-sm text-faham-green">Simpan Draf</button>
            <button className="bg-faham-green px-5 py-3 text-sm text-white">Preview</button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <section className="border border-faham-line bg-white p-5">
            <input className="w-full border-0 border-b border-faham-line pb-4 font-serif text-4xl font-semibold outline-none focus:border-faham-green" defaultValue="Tajuk penulisan demo" />
            <div className="mt-5 flex flex-wrap gap-2 border-b border-faham-line pb-4 text-sm">
              {["Bold", "Italic", "Quote", "Link", "Image", "Heading"].map((tool) => (
                <button key={tool} className="border border-faham-line px-3 py-2 text-faham-muted hover:border-faham-green hover:text-faham-green">
                  {tool}
                </button>
              ))}
            </div>
            <textarea
              className="mt-5 min-h-[520px] w-full resize-y border-0 font-serif text-lg leading-8 outline-none"
              defaultValue={
                "Ini ialah kandungan demo editor FAHAM.\n\nAutosave akan menyimpan perubahan sebagai draf di Supabase.\n\nPreview akan memaparkan artikel dalam reka letak bacaan sebenar sebelum diterbitkan."
              }
            />
          </section>

          <aside className="grid content-start gap-5">
            <section className="border border-faham-line bg-white p-5">
              <h2 className="font-serif text-2xl font-semibold">Tetapan</h2>
              <label className="mt-5 grid gap-2 text-sm">
                Status
                <select className="h-11 border border-faham-line px-3 outline-none focus:border-faham-green" defaultValue="Draf">
                  <option>Draf</option>
                  <option>Published</option>
                </select>
              </label>
              <label className="mt-4 grid gap-2 text-sm">
                Kategori
                <select className="h-11 border border-faham-line px-3 outline-none focus:border-faham-green" defaultValue="Pemikiran">
                  <option>Pemikiran</option>
                  <option>Kehidupan</option>
                  <option>Masyarakat</option>
                  <option>Sejarah</option>
                  <option>Ekonomi</option>
                  <option>Agama</option>
                </select>
              </label>
            </section>

            <section className="border border-faham-line bg-white p-5">
              <h2 className="font-serif text-2xl font-semibold">Autosave</h2>
              <p className="mt-2 text-sm text-faham-muted">Status demo: disimpan 10 saat lalu.</p>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}
