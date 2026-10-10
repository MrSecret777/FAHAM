import Link from "next/link";

const navItems = [
  { href: "/", label: "Utama" },
  { href: "/penulisan", label: "Penulisan" },
  { href: "/siri-koleksi", label: "Siri & Koleksi" },
  { href: "/arkib", label: "Arkib" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-faham-line bg-faham-warm/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="font-serif text-2xl font-semibold">
          FAHAM
        </Link>
        <nav className="hidden items-center gap-8 text-sm md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-faham-green">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-lg hover:border-faham-line" aria-label="Cari">
            ⌕
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-faham-line md:hidden" aria-label="Menu">
            ≡
          </button>
        </div>
      </div>
    </header>
  );
}
