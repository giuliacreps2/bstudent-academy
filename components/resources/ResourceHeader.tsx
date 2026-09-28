"use client";

import { ShareIcon, CheckIcon } from "@heroicons/react/24/outline";
import { SaveToNotebookButton } from "@/components/article/SaveToNotebookButton";
import { useShareResource } from "@/hooks/useShareResource";
import {
  resourceCategoriesMeta,
  resourceColorStyles,
} from "@/constants/resources";
import type { ResourceDetailData } from "@/types/resourceDetail";

interface ResourceHeaderProps {
  resource: ResourceDetailData;
  isLoggedIn: boolean;
}

export function ResourceHeader({ resource, isLoggedIn }: ResourceHeaderProps) {
  const { share, status } = useShareResource(resource.title);

  const meta = resourceCategoriesMeta[resource.category];
  const styles = resourceColorStyles[meta.color];
  const CategoryIcon = meta.icon;

  return (
    <header className="mt-6">
      <span
        className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-bold uppercase tracking-widest ${styles.badgeBg} ${styles.badgeText}`}
      >
        <CategoryIcon className="h-3.5 w-3.5" />
        {meta.label}
      </span>

      <h1 className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {resource.title}
      </h1>

      <p className="mt-3 max-w-2xl text-base leading-7 text-brand-muted md:text-lg">
        {resource.description}
      </p>

      {/* AZIONI */}
      <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2">
        <SaveToNotebookButton
          isLoggedIn={isLoggedIn}
          initialSaved={resource.isSaved}
        />

        <button
          type="button"
          onClick={share}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary transition hover:text-brand-primary-hover"
        >
          {status === "copied" ? (
            <CheckIcon className="h-4 w-4" />
          ) : (
            <ShareIcon className="h-4 w-4" />
          )}
          {status === "copied" ? "Link copiato" : "Condividi"}
        </button>

        {status === "error" && (
          <span role="alert" className="text-sm font-medium text-red-600">
            Non siamo riusciti a condividere. Riprova.
          </span>
        )}
      </div>
    </header>
  );
}
