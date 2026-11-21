"use client";

import { useState } from "react";
import Link from "next/link";
import { BookmarkIcon, LockClosedIcon, PencilSquareIcon, PlayCircleIcon } from "@heroicons/react/24/solid";
import { NotebookCover } from "./NotebookCover";
import { NotebookEmptyState } from "./NotebookEmptyState";
import { notebookCoverOf, notebookCovers } from "@/constants/notebookCover";
import { resourceHref } from "@/constants/resources";
import { notebookLessonHref, setNotebookCover } from "@/lib/notebook-api";
import type { NotebookData, NotebookItem } from "@/types/notebookData";

/** Colori delle linguette, nell'ordine delle materie */
const TAB_ACCENTS = ["#3155d9", "#35c98a", "#e96a9a", "#f2a23a", "#8b5cf6"];

// Leggera rotazione alternata: foglietti attaccati a mano (come NotebookEntryCard)
const rotations = ["-rotate-1", "rotate-1", "rotate-0"];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });

/**
 * Quaderno (blueprint §14): gli appunti dello studente. Copertina con il colore scelto, una linguetta per
 * materia con le lezioni raccolte e, a parte, i segnalibri delle Risorse (il libro della Palestra).
 * TODO (Blog): linguetta "Articoli" con gli articoli preferiti, quando esiste il Blog.
 */
export function NotebookView({ data, studentName }: { data: NotebookData; studentName: string }) {
  const [active, setActive] = useState(0);
  const [cover, setCover] = useState<string | null>(data.coverColor);
  const [coverError, setCoverError] = useState(false);
  const colors = notebookCoverOf(cover);
  const tab = data.subjects[active];
  const accent = TAB_ACCENTS[active % TAB_ACCENTS.length];

  async function chooseCover(key: string | null) {
    const previous = cover;
    setCover(key);
    setCoverError(false);
    try {
      await setNotebookCover(key);
    } catch {
      setCover(previous);
      setCoverError(true);
    }
  }

  return (
    <div>
      {/* Le variabili del colore scelto valgono per .card-notebook-cover qui dentro */}
      <div
        style={
          {
            "--texture-notebook-cover": colors.cover,
            "--texture-notebook-cover-dark": colors.dark,
          } as React.CSSProperties
        }
      >
        <NotebookCover student={{ name: studentName, avatarUrl: "/studente.png" }} />
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-end gap-2" role="group" aria-label="Colore della copertina">
        <span className="text-xs font-semibold text-brand-muted">Copertina:</span>
        {notebookCovers.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => chooseCover(c.key)}
            aria-pressed={cover === c.key}
            title={c.label}
            className={`h-7 w-7 rounded-full border-2 transition ${
              cover === c.key ? "scale-110 border-brand-primary" : "border-white shadow"
            }`}
            style={{ backgroundColor: c.cover }}
          >
            <span className="sr-only">{c.label}</span>
          </button>
        ))}
        {coverError && <span className="text-xs text-brand-coral">Non salvato, riprova.</span>}
      </div>

      {data.bookmarks.length > 0 && (
        <section aria-labelledby="notebook-bookmarks" className="mt-6">
          <h2 id="notebook-bookmarks" className="flex items-center gap-1.5 text-sm font-bold text-foreground">
            <BookmarkIcon className="h-4 w-4 text-brand-primary" />
            Segnalibri delle Risorse
          </h2>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
            {data.bookmarks.map((b) => (
              <Link
                key={`${b.subjectSlug}/${b.slug}`}
                href={resourceHref(b.subjectSlug, b.slug)}
                className="shrink-0 rounded-pill border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-foreground hover:border-brand-primary hover:text-brand-primary"
              >
                {b.title}
                {b.premiumLocked && <LockClosedIcon className="ml-1 inline h-3.5 w-3.5 text-brand-muted" />}
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="mt-6">
        {data.subjects.length > 0 && (
          <div className="flex items-end gap-1.5 px-2 sm:gap-2" role="tablist">
            {data.subjects.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.subjectSlug}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={`relative rounded-t-xl px-4 py-2.5 text-sm font-bold transition ${
                    isActive ? "bg-surface text-foreground" : "bg-white/60 text-brand-muted hover:bg-white/80"
                  }`}
                  style={isActive ? { boxShadow: `inset 0 3px 0 ${TAB_ACCENTS[i % TAB_ACCENTS.length]}` } : undefined}
                >
                  {s.subjectName}
                  <span className="ml-1.5 text-xs text-brand-muted">{s.items.length}</span>
                </button>
              );
            })}
          </div>
        )}

        <div className="card-notebook-page p-4 sm:p-6">
          {tab && tab.items.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {tab.items.map((item, index) => (
                <NotebookItemCard key={item.lessonId} item={item} index={index} accent={accent} />
              ))}
            </div>
          ) : (
            <NotebookEmptyState tabLabel={tab?.subjectName ?? "delle lezioni"} />
          )}
        </div>
      </div>
    </div>
  );
}

function NotebookItemCard({ item, index, accent }: { item: NotebookItem; index: number; accent: string }) {
  return (
    <Link
      href={notebookLessonHref(item.lessonId)}
      className={`card-notebook-postit group block px-4 py-4 transition hover:-translate-y-1 hover:rotate-0 ${rotations[index % rotations.length]}`}
    >
      {item.isNew && item.available && (
        <span
          className="absolute right-2 top-2 rotate-6 rounded-md px-2 py-1 text-[10px] font-extrabold text-white shadow-md"
          style={{ backgroundColor: "var(--brand-secondary)" }}
        >
          Nuovo
        </span>
      )}

      <div className="flex flex-wrap items-center gap-1.5">
        <span
          className="inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
          style={{ backgroundColor: `${accent}1a`, color: accent }}
        >
          {item.kind === "video" && <PlayCircleIcon className="h-3 w-3" />}
          {item.kind === "video" ? "Video" : "Lezione"}
          {item.topicName && ` · ${item.topicName}`}
        </span>
        {item.hasNote && (
          <span title="Hai scritto una nota" className="text-brand-primary">
            <PencilSquareIcon className="h-4 w-4" />
            <span className="sr-only">Con nota</span>
          </span>
        )}
        {item.premiumLocked && (
          <span title="Con abbonamento" className="text-brand-muted">
            <LockClosedIcon className="h-4 w-4" />
            <span className="sr-only">Con abbonamento</span>
          </span>
        )}
      </div>

      <p className="mt-2 font-bold text-foreground group-hover:text-brand-primary">{item.title}</p>

      <p className="mt-1 line-clamp-2 text-sm leading-6 text-brand-muted">
        {item.available ? item.preview : "Lezione non più disponibile: resta la tua nota."}
      </p>

      <div className="mt-3 flex items-center justify-between text-xs text-brand-muted">
        <span>
          {item.missionTitle} · {formatDate(item.acquiredAt)}
        </span>
        <span className="font-semibold text-brand-primary opacity-0 transition group-hover:opacity-100">Apri →</span>
      </div>
    </Link>
  );
}
