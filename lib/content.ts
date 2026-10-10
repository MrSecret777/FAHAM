export type Category = "Pemikiran" | "Kehidupan" | "Masyarakat" | "Sejarah" | "Ekonomi" | "Agama";

export type Article = {
  slug: string;
  title: string;
  category: Category;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  featured?: boolean;
};

export const articles: Article[] = [
  {
    slug: "mengapa-manusia-sentiasa-mencari-makna",
    title: "Mengapa Manusia Sentiasa Mencari Makna?",
    category: "Pemikiran",
    date: "9 Oktober 2026",
    readTime: "8 minit bacaan",
    excerpt:
      "Setiap manusia membawa persoalan sendiri. Dalam kehidupan yang sentiasa berubah, kita mencari jawapan tentang siapa diri kita, ke mana kita menuju, dan apa yang sebenarnya bermakna.",
    image: "/images/mountain.svg",
    featured: true
  },
  {
    slug: "antara-kemajuan-dan-kehilangan-arah",
    title: "Antara Kemajuan dan Kehilangan Arah",
    category: "Masyarakat",
    date: "3 Oktober 2026",
    readTime: "6 minit bacaan",
    excerpt:
      "Kemajuan membawa banyak perubahan, tetapi pada masa yang sama menimbulkan persoalan tentang arah kehidupan manusia.",
    image: "/images/city.svg"
  },
  {
    slug: "fitrah-dan-realiti-kehidupan-moden",
    title: "Fitrah dan Realiti Kehidupan Moden",
    category: "Agama",
    date: "28 September 2026",
    readTime: "7 minit bacaan",
    excerpt:
      "Manusia dicipta dengan fitrah yang jelas. Namun realiti kehidupan moden sering menguji kefahaman kita tentang fitrah itu.",
    image: "/images/arch.svg"
  },
  {
    slug: "ketika-ilmu-tidak-membawa-kebijaksanaan",
    title: "Ketika Ilmu Tidak Membawa Kebijaksanaan",
    category: "Pemikiran",
    date: "20 September 2026",
    readTime: "8 minit bacaan",
    excerpt:
      "Ilmu yang banyak tidak semestinya membawa kepada kebijaksanaan. Apakah yang membezakan antara pengetahuan dan kefahaman?",
    image: "/images/mountain.svg"
  },
  {
    slug: "sejarah-sebagai-cermin-kehidupan",
    title: "Sejarah sebagai Cermin Kehidupan",
    category: "Sejarah",
    date: "15 September 2026",
    readTime: "6 minit bacaan",
    excerpt:
      "Sejarah bukan sekadar catatan masa lalu, tetapi cermin yang membantu kita memahami realiti hari ini.",
    image: "/images/desert.svg"
  }
];

export const categories: { name: Category; count: number }[] = [
  { name: "Pemikiran", count: 24 },
  { name: "Kehidupan", count: 18 },
  { name: "Masyarakat", count: 16 },
  { name: "Sejarah", count: 12 },
  { name: "Ekonomi", count: 9 },
  { name: "Agama", count: 21 }
];

export const series = [
  { title: "Manusia dan Kehidupan", count: "5 penulisan", image: "/images/mountain.svg" },
  { title: "Fitrah dan Masyarakat", count: "4 penulisan", image: "/images/arch.svg" },
  { title: "Sejarah dan Pengajaran", count: "3 penulisan", image: "/images/desert.svg" }
];

export const featuredArticle = articles.find((article) => article.featured) ?? articles[0];
export const latestArticles = articles.filter((article) => !article.featured);
