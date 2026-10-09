import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-faham-warm px-5">
      <section className="w-full max-w-md border border-faham-line bg-white/60 p-8 shadow-paper">
        <Link href="/" className="font-serif text-3xl font-semibold">
          FAHAM
        </Link>
        <h1 className="mt-8 font-serif text-4xl font-semibold">Login Pentadbir</h1>
        <p className="mt-2 text-faham-muted">Akses khusus untuk penulis dan pentadbir FAHAM.</p>
        <form className="mt-8 grid gap-4">
          <label className="grid gap-2 text-sm">
            Emel
            <input className="h-12 border border-faham-line bg-faham-warm px-4 outline-none focus:border-faham-green" type="email" placeholder="admin@faham.my" />
          </label>
          <label className="grid gap-2 text-sm">
            Kata laluan
            <input className="h-12 border border-faham-line bg-faham-warm px-4 outline-none focus:border-faham-green" type="password" placeholder="••••••••" />
          </label>
          <button className="mt-2 h-12 bg-faham-green text-white" type="button">
            Masuk
          </button>
        </form>
      </section>
    </main>
  );
}
