import Link from "next/link";
import { signInAdmin } from "@/app/admin/login/actions";

export default function LoginPage({ searchParams }: { searchParams?: { error?: string; next?: string } }) {
  const error = searchParams?.error;
  const next = searchParams?.next ?? "/admin";

  return (
    <main className="flex min-h-screen items-center justify-center bg-faham-warm px-5">
      <section className="w-full max-w-md border border-faham-line bg-white/60 p-8 shadow-paper">
        <Link href="/" className="font-serif text-3xl font-semibold">
          FAHAM
        </Link>
        <h1 className="mt-8 font-serif text-4xl font-semibold">Login Pentadbir</h1>
        <p className="mt-2 text-faham-muted">Akses khusus untuk penulis dan pentadbir FAHAM.</p>
        {error ? <p className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p> : null}
        <form action={signInAdmin} className="mt-8 grid gap-4">
          <input name="next" type="hidden" value={next} />
          <label className="grid gap-2 text-sm">
            Emel
            <input className="h-12 border border-faham-line bg-faham-warm px-4 outline-none focus:border-faham-green" name="email" type="email" placeholder="admin@faham.my" required />
          </label>
          <label className="grid gap-2 text-sm">
            Kata laluan
            <input className="h-12 border border-faham-line bg-faham-warm px-4 outline-none focus:border-faham-green" name="password" type="password" placeholder="••••••••" required />
          </label>
          <button className="mt-2 h-12 bg-faham-green text-white" type="submit">
            Masuk
          </button>
        </form>
      </section>
    </main>
  );
}
