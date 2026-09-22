import { ChevronDownIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import {
  blogCategoriesMeta,
  blogColorStyles,
  blogCategoryOrder,
} from "@/constants/blog";
import type { BlogCategoryKey } from "@/types/blog";

interface BlogFiltersProps {
  activeCategory: BlogCategoryKey | "tutti";
  onChangeCategory: (category: BlogCategoryKey | "tutti") => void;
  onRequireLogin: () => void;
}

export function BlogFilters({
  activeCategory,
  onChangeCategory,
  onRequireLogin,
}: BlogFiltersProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* CATEGORIE */}
      <div
        className="
          flex items-center gap-2
          overflow-x-auto
          -mx-1 px-1
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        <button
          type="button"
          onClick={() => onChangeCategory("tutti")}
          className={`shrink-0 inline-flex items-center gap-1.5 rounded-pill px-4 py-2.5 text-sm font-bold transition ${
            activeCategory === "tutti"
              ? "bg-brand-primary text-white"
              : "bg-white text-foreground border border-border hover:border-brand-primary/40"
          }`}
        >
          Tutti
        </button>

        {blogCategoryOrder.map((key) => {
          const meta = blogCategoriesMeta[key];
          const styles = blogColorStyles[meta.color];
          const Icon = meta.icon;
          const active = activeCategory === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => onChangeCategory(key)}
              className={`shrink-0 inline-flex items-center gap-1.5 rounded-pill px-4 py-2.5 text-sm font-bold transition ${
                active
                  ? "bg-brand-primary text-white"
                  : "bg-white text-foreground border border-border hover:border-brand-primary/40"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${active ? "text-white" : styles.iconText}`}
              />
              {meta.label}
            </button>
          );
        })}
      </div>

      {/* ORDINAMENTO — richiede login, coerente con il bookmark sulle card */}
      <button
        type="button"
        onClick={onRequireLogin}
        className="shrink-0 inline-flex items-center gap-1.5 self-start sm:self-auto rounded-pill border border-border bg-white px-4 py-2.5 text-sm font-bold text-foreground hover:border-brand-primary/40"
      >
        Più recenti
        <ChevronDownIcon className="w-4 h-4 text-brand-muted" />
        <LockClosedIcon className="w-3.5 h-3.5 text-brand-muted" />
      </button>
    </div>
  );
}
