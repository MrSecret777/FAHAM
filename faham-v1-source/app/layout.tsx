import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FAHAM",
  description: "FAHAM - Lebih Daripada Sekadar Tahu.",
  metadataBase: new URL("https://faham.vercel.app")
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ms">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
