import Link from "next/link";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import {
  resourceCategoriesMeta,
  resourceColorStyles,
} from "@/constants/resources";
import { PremiumLockBadge } from "./PremiumLock";
import type { ResourceResults } from "@/types/resources";

/** Risultati di una ricerca o Risorse di una categoria, al posto delle sezioni della pagina */
export function ResourceResultsList({ results }: { results: ResourceResults }) {
  return (
    <section
      aria-labelledby="resources-results-title"
      className="py-10 md:py-14"
    >
      <div className="container-section">
        <Link
          href={results.backHref}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Tutte le risorse
        </Link>

        <h2
          id="resources-results-title"
          className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl"
        >
          {results.title}
        </h2>

        {results.items.length === 0 ? (
          <p className="mt-6 rounded-lg border border-border bg-surface p-6 text-base text-brand-muted">
            {results.emptyText}
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-border overflow-hidden rounded-lg border border-border bg-surface">
            {results.items.map((item) => {
              const meta = item.category
                ? resourceCategoriesMeta[item.category]
                : undefined;
              const styles = meta ? resourceColorStyles[meta.color] : undefined;
              const Icon = meta?.icon;

              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    className="group flex items-center gap-4 px-4 py-4 transition-colors hover:bg-surface-blue sm:px-5"
                  >
                    {Icon && styles && (
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${styles.iconBg}`}
                      >
                        <Icon className={`h-5 w-5 ${styles.iconText}`} />
                      </span>
                    )}

                    <span className="min-w-0 flex-1">
                      <span className="block font-bold text-foreground group-hover:text-brand-primary">
                        {item.title}
                      </span>
                      <span className="mt-0.5 block text-sm text-brand-muted">
                        {item.description}
                      </span>
                    </span>

                    {item.locked && <PremiumLockBadge className="shrink-0" />}

                    <ArrowRightIcon
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-brand-primary transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
