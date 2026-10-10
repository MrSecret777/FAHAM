import Image from "next/image";
import Link from "next/link";
import { articles } from "@/lib/content";

const stats = [
  { label: "Jumlah Penulisan", value: "32" },
  { label: "Diterbitkan", value: "28" },
  { label: "Draf", value: "4" },
  { label: "Jumlah Paparan", value: "12,340" }
];

const nav = ["Dashboard", "Penulisan", "Tulis Baharu", "Draf", "Siri & Koleksi", "Kategori", "Media", "Analytics", "Settings"];

export default function AdminPage() {
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
            <Link href="/admin/login" className="border border-faham-green px-4 py-2 text-sm text-faham-green">
              Login Pentadbir
            </Link>
          </div>

          <section className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="border border-faham-line bg-white p-5">
                <p className="font-serif text-3xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-sm text-faham-muted">{stat.label}</p>
              </div>
            ))}
          </section>

          <section className="mt-7 border border-faham-line bg-white">
            <div className="border-b border-faham-line p-5">
              <h2 className="font-serif text-2xl font-semibold">Penulisan Terkini</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
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
                  {articles.map((article, index) => (
                    <tr key={article.slug} className="border-t border-faham-line">
                      <td className="px-5 py-4 font-medium">{article.title}</td>
                      <td className="px-5 py-4">
                        <span className={index === 2 ? "bg-blue-100 px-2 py-1 text-xs text-blue-700" : "bg-green-100 px-2 py-1 text-xs text-faham-green"}>
                          {index === 2 ? "Draf" : "Published"}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-faham-muted">{article.category}</td>
                      <td className="px-5 py-4 text-faham-muted">{article.date}</td>
                      <td className="px-5 py-4 text-faham-muted">Edit · Preview</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="mt-7 grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="border border-faham-line bg-white p-5">
              <h2 className="font-serif text-2xl font-semibold">Editor Artikel</h2>
              <p className="mt-2 text-sm text-faham-muted">Demo rich text editor: autosave, preview dan publish akan disambungkan kepada Supabase Auth dan database.</p>
              <input className="mt-5 h-12 w-full border border-faham-line px-4 outline-none focus:border-faham-green" placeholder="Tajuk penulisan" defaultValue="Draf demo FAHAM" />
              <textarea className="mt-4 min-h-56 w-full border border-faham-line p-4 outline-none focus:border-faham-green" defaultValue={"Tulis kandungan artikel di sini...\n\nStatus autosave: Disimpan sebagai draf demo."} />
              <div className="mt-4 flex flex-wrap gap-3">
                <button className="bg-faham-green px-5 py-3 text-sm text-white">Preview</button>
                <button className="border border-faham-green px-5 py-3 text-sm text-faham-green">Simpan Draf</button>
              </div>
            </div>
            <div className="border border-faham-line bg-white p-5">
              <h2 className="font-serif text-2xl font-semibold">Media Library</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {["/images/mountain.svg", "/images/city.svg", "/images/desert.svg", "/images/arch.svg"].map((src) => (
                  <Image key={src} src={src} alt="" width={320} height={240} className="aspect-[4/3] w-full object-cover" />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
