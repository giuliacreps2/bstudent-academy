import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArticleHeader } from "@/components/article/ArticleHeader";
import { ArticleContent } from "@/components/article/ArticleContent";
import { SaveToNotebookCard } from "@/components/article/SaveToNotebookCard";
import { NotebookSoftPopup } from "@/components/article/NotebookSoftPopup";
import { getArticleData } from "@/lib/article";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleData(slug);

  if (!article) {
    notFound();
  }

  // TODO: sostituire con lo stato di autenticazione reale quando l'auth sarà collegata
  const isLoggedIn = false;

  return (
    <div>
      <Navbar />

      <main className="bg-background">
        <article className="container-section max-w-3xl py-8 md:py-12">
          <ArticleHeader article={article} isLoggedIn={isLoggedIn} />
          <div className="mt-10">
            <ArticleContent blocks={article.content} />
          </div>
          <div className="mt-12">
            <SaveToNotebookCard
              isLoggedIn={isLoggedIn}
              isSaved={article.isSavedToNotebook}
            />
          </div>
        </article>

        <NotebookSoftPopup isLoggedIn={isLoggedIn} />
      </main>

      <Footer />
    </div>
  );
}
