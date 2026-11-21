"use client";

import { useState } from "react";
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useReadingSignal } from "@/hooks/useReadingSignal";
import type { LessonPage, LessonPlay } from "@/types/missionPlay";

interface LessonReaderProps {
  lesson: LessonPlay;
  onDone: () => void;
  busy: boolean;
}

/**
 * Lezione della missione: una pagina alla volta, nell'ordine dell'autrice. La lettura non ha tempo.
 * All'ultima pagina "Ho finito di leggere" porta al passo successivo e mette la lezione nel Quaderno.
 */
export function LessonReader({ lesson, onDone, busy }: LessonReaderProps) {
  const [index, setIndex] = useState(0);
  const total = lesson.pages.length;
  const page = lesson.pages[index];
  const isLast = index >= total - 1;

  // Registro di studio (blueprint §10.5): tempo attivo sulla pagina che lo studente sta leggendo
  useReadingSignal({ kind: "lesson_read", lessonId: lesson.lessonId, lessonPageId: page?.lessonPageId });

  return (
    <article className="rounded-lg border border-border bg-surface p-5 shadow-sm sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Lezione</p>
      <h2 className="mt-1 text-2xl font-extrabold leading-tight sm:text-3xl">{lesson.title}</h2>

      <div className="mt-6 min-h-40">
        {page ? (
          <LessonPageView key={page.lessonPageId} page={page} />
        ) : (
          <p className="text-brand-muted">Questa lezione non ha ancora pagine.</p>
        )}
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
        <button
          type="button"
          onClick={() => setIndex((i) => i - 1)}
          disabled={index === 0}
          className="flex items-center gap-1.5 rounded-pill px-4 py-2 text-sm font-semibold text-brand-primary transition hover:bg-surface-blue disabled:invisible"
        >
          <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
          Indietro
        </button>

        {total > 1 && (
          <span className="text-sm text-brand-muted" aria-live="polite">
            Pagina {index + 1} di {total}
          </span>
        )}

        {isLast ? (
          <button
            type="button"
            onClick={onDone}
            disabled={busy}
            className="flex items-center gap-1.5 rounded-pill bg-brand-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-primary-hover disabled:opacity-60"
          >
            <CheckIcon aria-hidden="true" className="h-4 w-4" />
            Ho finito di leggere
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIndex((i) => i + 1)}
            className="flex items-center gap-1.5 rounded-pill bg-brand-primary px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-primary-hover"
          >
            Avanti
            <ArrowRightIcon aria-hidden="true" className="h-4 w-4" />
          </button>
        )}
      </div>
    </article>
  );
}

export function LessonPageView({ page }: { page: LessonPage }) {
  if (page.kind === "text" && page.formattedText) {
    // Testo semplice dall'Admin: i paragrafi sono separati da una riga vuota.
    // TODO (editor a blocchi, Piano MVP 4.4): mostrare grassetti, elenchi e tabelle quando l'Admin li salva
    return (
      <div className="space-y-4 text-lg leading-8">
        {page.formattedText.split(/\n\s*\n/).map((paragraph, i) => (
          <p key={i} className="whitespace-pre-line">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  if (page.kind === "image" && page.imageReference) {
    // TODO (Cloudinary, blueprint §5.1): costruire l'indirizzo dell'immagine dal riferimento
    return (
      // eslint-disable-next-line @next/next/no-img-element -- immagini da percorso o URL libero finché manca Cloudinary
      <img src={page.imageReference} alt="" className="mx-auto max-h-[60vh] w-auto rounded-md" />
    );
  }

  if (page.kind === "video" && page.videoIdentifier) {
    const src = videoSrc(page.videoProvider, page.videoIdentifier);
    if (!src) return null;
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-md bg-black">
        <iframe
          src={src}
          title="Video della lezione"
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    );
  }

  return null;
}

/** YouTube "non in elenco" per i contenuti free, Vimeo per i premium (lib/admin VIDEO_PROVIDERS) */
function videoSrc(provider: LessonPage["videoProvider"], identifier: string): string | null {
  const id = encodeURIComponent(identifier.trim());
  switch (provider) {
    case "youtube":
      return `https://www.youtube-nocookie.com/embed/${id}?rel=0`;
    case "vimeo":
      return `https://player.vimeo.com/video/${id}`;
    default:
      return null;
  }
}
