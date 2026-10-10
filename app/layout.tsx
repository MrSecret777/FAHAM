import type { Metadata } from "next";
import { siteUrl } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FAHAM",
    template: "%s - FAHAM"
  },
  description: "FAHAM - Lebih Daripada Sekadar Tahu.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "FAHAM",
    description: "Lebih Daripada Sekadar Tahu.",
    url: siteUrl,
    siteName: "FAHAM",
    locale: "ms_MY",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ms">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
