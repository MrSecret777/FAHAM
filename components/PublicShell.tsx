import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-faham-warm text-faham-charcoal">
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
