"use client";

import { useState } from "react";
import {
  createLessonPage,
  deleteLessonPage,
  reorderLessonPages,
  updateLessonPage,
  type LessonPageInput,
} from "@/lib/admin";
import type { LessonPage, PageKind } from "@/types/admin";
import { buttonClass, EmptyNote, Field, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Pagine della lezione: ognuna ha un solo contenuto (testo, immagine o video).
   TODO (contenuti): formato del testo (es. Markdown) e anteprima, provider video ammessi */

const KIND_LABELS: Record<PageKind, string> = { text: "Testo", image: "Immagine", video: "Video" };

export default function LessonPagesEditor({ lessonId, pages }: { lessonId: number; pages: LessonPage[] }) {
  const { run, pending, error } = useAdminMutation();

  function move(index: number, delta: -1 | 1) {
    const ids = pages.map((p) => p.lessonPageId);
    const target = index + delta;
    [ids[index], ids[target]] = [ids[target], ids[index]];
    run(() => reorderLessonPages(lessonId, ids));
  }

  return (
    <div>
      {pages.length === 0 ? (
        <EmptyNote>Nessuna pagina: una lezione si pubblica solo con almeno una pagina.</EmptyNote>
      ) : (
        <ol className="divide-y divide-border">
          {pages.map((page, index) => (
            <li key={page.lessonPageId} className="py-3">
              <div className="mb-2 flex items-center gap-2 text-sm">
                <span className="text-brand-muted">{index + 1}.</span>
                <span className="font-medium">{KIND_LABELS[page.kind]}</span>
                <span className="flex-1" />
                <button type="button" className={buttonClass.secondary} disabled={pending || index === 0}
                        onClick={() => move(index, -1)} aria-label="Sposta su">↑</button>
                <button type="button" className={buttonClass.secondary} disabled={pending || index === pages.length - 1}
                        onClick={() => move(index, 1)} aria-label="Sposta giù">↓</button>
              </div>
              <PageForm lessonId={lessonId} page={page} />
            </li>
          ))}
        </ol>
      )}
      {error && <Notice tone="error">{error}</Notice>}
      <div className="mt-4 border-t border-border pt-4">
        <h3 className="mb-2 text-sm font-semibold">Nuova pagina</h3>
        <PageForm lessonId={lessonId} />
      </div>
    </div>
  );
}

function PageForm({ lessonId, page }: { lessonId: number; page?: LessonPage }) {
  const { run, pending, error } = useAdminMutation();
  const [kind, setKind] = useState<PageKind>(page?.kind ?? "text");
  const [text, setText] = useState(page?.formattedText ?? "");
  const [image, setImage] = useState(page?.imageReference ?? "");
  const [provider, setProvider] = useState(page?.videoProvider ?? "youtube");
  const [identifier, setIdentifier] = useState(page?.videoIdentifier ?? "");
  const [saved, setSaved] = useState(false);

  // Solo il campo del tipo scelto viene inviato: il backend vuole esattamente un contenuto
  function toInput(): LessonPageInput {
    return {
      formattedText: kind === "text" ? text : null,
      imageReference: kind === "image" ? image : null,
      videoProvider: kind === "video" ? provider : null,
      videoIdentifier: kind === "video" ? identifier : null,
    };
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    if (page) {
      setSaved(await run(() => updateLessonPage(page.lessonPageId, toInput())));
    } else if (await run(() => createLessonPage(lessonId, toInput()))) {
      setText("");
      setImage("");
      setIdentifier("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex flex-wrap gap-3">
        <Field label="Tipo">
          <select className={inputClass} value={kind} onChange={(e) => setKind(e.target.value as PageKind)}>
            <option value="text">Testo</option>
            <option value="image">Immagine</option>
            <option value="video">Video</option>
          </select>
        </Field>
        {kind === "video" && (
          <>
            <Field label="Provider">
              <input className={inputClass} value={provider} onChange={(e) => setProvider(e.target.value)} required maxLength={40} />
            </Field>
            <Field label="Identificativo del video">
              <input className={inputClass} value={identifier} onChange={(e) => setIdentifier(e.target.value)} required maxLength={200} />
            </Field>
          </>
        )}
        {kind === "image" && (
          <div className="min-w-64 flex-1">
            <Field label="Immagine" hint="Percorso o URL">
              <input className={inputClass} value={image} onChange={(e) => setImage(e.target.value)} required maxLength={500} />
            </Field>
          </div>
        )}
      </div>
      {kind === "text" && (
        <textarea className={inputClass} rows={6} value={text} onChange={(e) => setText(e.target.value)}
                  required aria-label="Testo della pagina" />
      )}
      <div className="flex items-center gap-2">
        <button type="submit" className={buttonClass.primary} disabled={pending}>{page ? "Salva pagina" : "Aggiungi pagina"}</button>
        {page && (
          <button
            type="button"
            className={buttonClass.danger}
            disabled={pending}
            onClick={() => run(() => deleteLessonPage(page.lessonPageId), { confirm: "Eliminare la pagina?" })}
          >
            Elimina
          </button>
        )}
      </div>
      {saved && <Notice tone="success">Salvato.</Notice>}
      {error && <Notice tone="error">{error}</Notice>}
    </form>
  );
}
