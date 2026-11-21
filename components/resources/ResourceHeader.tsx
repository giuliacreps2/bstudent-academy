"use client";

import { useState } from "react";
import { ShareIcon, CheckIcon } from "@heroicons/react/24/outline";
import { addBookmark, removeBookmark } from "@/lib/notebook-api";
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
  /** false = "Salva nel Quaderno" nascosto (es. copia pubblica con i dati d'esempio) */
  canSave?: boolean;
  /** true = il salvataggio va al backend come segnalibro del Quaderno (blueprint §7.4) */
  persistBookmark?: boolean;
}

export function ResourceHeader({
  resource,
  isLoggedIn,
  canSave = true,
  persistBookmark = false,
}: ResourceHeaderProps) {
  const { share, status } = useShareResource(resource.title);
  const [bookmarkError, setBookmarkError] = useState(false);

  async function handleToggle(saved: boolean) {
    if (!persistBookmark) return;
    setBookmarkError(false);
    try {
      const id = Number(resource.id);
      await (saved ? addBookmark(id) : removeBookmark(id));
    } catch {
      setBookmarkError(true);
    }
  }

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
        {canSave && (
          <SaveToNotebookButton
            isLoggedIn={isLoggedIn}
            initialSaved={resource.isSaved}
            onToggle={handleToggle}
          />
        )}

        {bookmarkError && (
          <span role="alert" className="text-sm font-medium text-red-600">
            Non siamo riusciti a salvare nel Quaderno. Ricarica la pagina e riprova.
          </span>
        )}

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
