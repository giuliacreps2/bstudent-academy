import Link from "next/link";
import Image from "next/image";
import { ClockIcon, BookmarkIcon } from "@heroicons/react/24/outline";
import { blogCategoriesMeta, blogColorStyles } from "@/constants/blog";
import type { BlogArticle } from "@/types/blog";

interface BlogCardProps {
  article: BlogArticle;
  onBookmark: () => void;
}

export function BlogCard({ article, onBookmark }: BlogCardProps) {
  const meta = blogCategoriesMeta[article.category];
  const styles = blogColorStyles[meta.color];
  const Icon = meta.icon;

  return (
    <article className="relative h-full">
      {/* CATEGORIA */}
      <span
        className={`absolute top-3 left-3 z-10 inline-flex items-center gap-1 border text-xs font-semibold px-2.5 py-1 rounded-pill shadow-sm ${styles.badgeBg} ${styles.badgeText} ${styles.badgeBorder}`}
      >
        <Icon className="w-3.5 h-3.5" />
        {meta.label}
      </span>

      {/* BOOKMARK — richiede login */}
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          onBookmark();
        }}
        aria-label="Salva articolo"
        className="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/90 shadow-sm hover:bg-white transition-colors"
      >
        <BookmarkIcon className="w-4 h-4 text-brand-muted" />
      </button>

      <Link
        href={article.href}
        className="flex h-full flex-col overflow-hidden rounded-[20px] bg-surface border border-border shadow-[0_8px_24px_rgba(23,32,51,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(23,32,51,0.10)]"
      >
        <div className="relative w-full h-40 bg-surface-blue">
          <Image src={article.image} alt="" fill className="object-cover" />
        </div>

        <div className="flex flex-col flex-1 p-4">
          <div className="flex items-center gap-1.5 text-xs text-brand-muted mb-2">
            <ClockIcon className="w-3.5 h-3.5" />
            <span>{article.readingMinutes} min</span>
          </div>

          <h3 className="text-base font-bold leading-snug text-foreground mb-1.5">
            {article.title}
          </h3>

          <p className="text-sm text-brand-muted leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </article>
  );
}
