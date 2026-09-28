import Link from "next/link";
import { ArrowRightIcon, MapIcon } from "@heroicons/react/24/outline";
import {
  resourceCategoriesMeta,
  resourceColorStyles,
} from "@/constants/resources";
import type {
  RecommendedPathData,
  ResourceCategoryCard,
  ResourceSubjectKey,
} from "@/types/resources";

function CategoryCard({ card }: { card: ResourceCategoryCard }) {
  const meta = resourceCategoriesMeta[card.category];
  const styles = resourceColorStyles[meta.color];
  const Icon = meta.icon;

  return (
    <Link
      href={card.href}
      className="group flex h-full flex-col rounded-lg border border-border bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_32px_rgba(23,32,51,0.08)]"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${styles.iconBg}`}
      >
        <Icon className={`h-6 w-6 ${styles.iconText}`} />
      </span>

      <h3 className="mt-4 text-lg font-extrabold text-foreground">
        {meta.label}
      </h3>
      <p className="mt-1 flex-1 text-sm leading-6 text-brand-muted">
        {card.description}
      </p>

      <ArrowRightIcon
        aria-hidden="true"
        className="mt-4 h-4 w-4 text-brand-primary transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

function RecommendedPathCard({ path }: { path: RecommendedPathData }) {
  return (
    <div className="flex h-full flex-col rounded-lg bg-surface-blue p-6">
      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
        <MapIcon className="h-6 w-6 text-brand-primary" />
      </span>

      <h3 className="mt-4 text-lg font-extrabold text-foreground">
        {path.title}
      </h3>
      <p className="mt-1 flex-1 text-sm leading-6 text-brand-muted">
        {path.description}
      </p>

      <Link
        href={path.href}
        className="btn-primary mt-5 justify-center text-sm"
      >
        {path.ctaLabel}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );
}

export function ResourceCategories({
  subject,
  categories,
  recommendedPath,
}: {
  subject: ResourceSubjectKey;
  categories: ResourceCategoryCard[];
  recommendedPath: RecommendedPathData;
}) {
  return (
    <section
      aria-labelledby="resources-categories-title"
      className="py-10 md:py-14"
    >
      <div className="container-section">
        <div className="mb-7 md:mb-8">
          <span aria-hidden="true" className="relative mb-1 block h-7 w-8">
            <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
            <span className="absolute left-0 top-3.5 h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />
            <span className="absolute left-5 top-4 h-2.5 w-1.5 rotate-[80deg] rounded-full bg-brand-accent" />
          </span>
          <h2
            id="resources-categories-title"
            className="text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl"
          >
            Esplora tutte le risorse
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-muted">
            Sfoglia le categorie e trova quello che ti serve.
          </p>
        </div>

        <div
          key={subject}
          className="grid gap-4 lg:grid-cols-[1fr_300px] lg:gap-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            {categories.map((card) => (
              <CategoryCard key={card.category} card={card} />
            ))}
          </div>

          <RecommendedPathCard path={recommendedPath} />
        </div>
      </div>
    </section>
  );
}
