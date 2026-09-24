import Image from "next/image";
import { MissionBreadcrumb } from "@/components/missions/MissionBreadcrumb";
import { SaveToNotebookButton } from "./SaveToNotebookButton";
import { blogCategoriesMeta } from "@/constants/blog";
import type { ArticlePageData } from "@/types/article";

export function ArticleHeader({
  article,
  isLoggedIn,
}: {
  article: ArticlePageData;
  isLoggedIn: boolean;
}) {
  const categoryMeta = blogCategoriesMeta[article.category];

  return (
    <header>
      <MissionBreadcrumb
        items={[
          { label: "Blog", href: "/blog" },
          {
            label: categoryMeta.label,
            href: `/blog?categoria=${article.category}`,
          },
          { label: article.title },
        ]}
      />

      <div className="relative mt-4 h-56 w-full overflow-hidden rounded-3xl sm:h-80">
        <Image
          src={article.coverUrl}
          alt={article.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      <span className="mt-5 inline-flex items-center gap-1.5 rounded-pill bg-surface-blue px-3 py-1 text-xs font-semibold text-brand-primary">
        {categoryMeta.label}
      </span>

      <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl">
        {article.title}
      </h1>

      {article.subtitle && (
        <p className="mt-2 max-w-xl text-base leading-7 text-brand-muted">
          {article.subtitle}
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-surface-blue">
            <Image
              src={article.author.avatarUrl}
              alt={article.author.name}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-sm text-brand-muted">
            <span className="font-semibold text-foreground">
              {article.author.name}
            </span>{" "}
            · {article.publishedAt} · {article.readingMinutes} min di lettura
          </p>
        </div>

        <SaveToNotebookButton
          isLoggedIn={isLoggedIn}
          initialSaved={article.isSavedToNotebook}
        />
      </div>
    </header>
  );
}
