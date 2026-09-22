import { getBlogArticles } from "@/lib/blog";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogSection } from "@/components/blog/BlogSection";

export default async function BlogPage() {
  const articles = await getBlogArticles();

  return (
    <div>
      <Navbar />

      <main className="bg-background">
        <div className="container-section pt-6 pb-4 md:pt-10">
          <BlogHero />
        </div>

        <BlogSection articles={articles} />
      </main>

      <Footer />
    </div>
  );
}
