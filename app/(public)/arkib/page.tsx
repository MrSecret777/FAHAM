import { PublicShell } from "@/components/PublicShell";

const archive = [
  { year: "2026", months: ["Oktober (3)", "September (4)", "Ogos (3)"] },
  { year: "2025", months: [] },
  { year: "2024", months: [] }
];

export default function ArchivePage() {
  return (
    <PublicShell>
      <section className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        <h1 className="font-serif text-4xl font-semibold md:text-5xl">Arkib Penulisan</h1>
        <p className="mt-3 text-lg text-faham-muted">Telusuri penulisan mengikut tahun dan bulan.</p>

        <div className="mt-8 border border-faham-line bg-white/35">
          {archive.map((item) => (
            <details key={item.year} className="border-b border-faham-line last:border-b-0" open={item.year === "2026"}>
              <summary className="cursor-pointer px-5 py-4 font-serif text-xl font-semibold">{item.year}</summary>
              {item.months.length > 0 ? (
                <div className="border-t border-faham-line">
                  {item.months.map((month) => (
                    <div key={month} className="border-b border-faham-line px-9 py-3 text-faham-muted last:border-b-0">
                      {month}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="border-t border-faham-line px-9 py-4 text-faham-muted">Tiada kandungan demo untuk tahun ini.</p>
              )}
            </details>
          ))}
        </div>
      </section>
    </PublicShell>
  );
}
