import { BlogCard } from "./BlogCard";
import type { BlogArticle } from "@/types/blog";

interface BlogGridProps {
  articles: BlogArticle[];
  onBookmark: () => void;
}

export function BlogGrid({ articles, onBookmark }: BlogGridProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-lg bg-surface-blue p-10 text-center">
        <p className="text-sm font-semibold text-foreground">
          Nessun articolo in questa categoria, per ora.
        </p>
        <p className="text-sm text-brand-muted mt-1">
          Torna presto: pubblichiamo nuovi contenuti regolarmente.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
      {articles.map((article) => (
        <BlogCard key={article.id} article={article} onBookmark={onBookmark} />
      ))}
    </div>
  );
}
