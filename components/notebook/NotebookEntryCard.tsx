import Link from "next/link";
import { notebookTabsMeta } from "@/constants/notebook";
import type { NotebookEntrySummary } from "@/types/notebook";

const kindLabel: Record<NotebookEntrySummary["kind"], string> = {
  grammatica: "Grammatica",
  lessico: "Lessico",
  articolo: "Articolo salvato",
};

// alterna una leggera rotazione per dare l'idea di foglietti attaccati a mano
const rotations = ["-rotate-1", "rotate-1", "rotate-0"];

export function NotebookEntryCard({
  entry,
  index = 0,
}: {
  entry: NotebookEntrySummary;
  index?: number;
}) {
  const accent = notebookTabsMeta[entry.tab].accent;

  return (
    <Link
      href={entry.href}
      className={`card-notebook-postit group block px-4 py-4 transition hover:-translate-y-1 hover:rotate-0 ${rotations[index % rotations.length]}`}
    >
      {entry.isNew && (
        <span
          className="absolute top-2 right-2 rotate-6 rounded-md px-2 py-1 text-[10px] font-extrabold text-white shadow-md"
          style={{ backgroundColor: "var(--brand-secondary)" }}
        >
          Nuovo
        </span>
      )}

      <span
        className="inline-flex items-center gap-1.5 rounded-pill px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
        style={{ backgroundColor: `${accent}1a`, color: accent }}
      >
        {kindLabel[entry.kind]}
      </span>

      <p className="mt-2 font-bold text-foreground group-hover:text-brand-primary">
        {entry.title}
      </p>

      <p className="mt-1 text-sm leading-6 text-brand-muted line-clamp-2">
        {entry.excerpt}
      </p>

      <div className="mt-3 flex items-center justify-between text-xs text-brand-muted">
        <span>{entry.missionLabel ?? entry.unlockedAt}</span>
        <span className="font-semibold text-brand-primary opacity-0 transition group-hover:opacity-100">
          Apri →
        </span>
      </div>
    </Link>
  );
}
