import { PracticeItemRow } from "./PracticeItemRow";
import type { PracticeTopicGroup } from "@/types/practice";

/**
 * Voci di una skill raggruppate per argomento, nell'ordine del backend.
 * TODO (Gamification §3-bis): sezioni "Per la tua classe" e "Più avanti nel programma" quando il frontend
 * conosce la classe dello studente; per ora la classe di riferimento compare accanto all'argomento.
 */
export function PracticeTopicGroups({ topics }: { topics: PracticeTopicGroup[] }) {
  if (topics.length === 0) {
    return (
      <p className="rounded-lg border border-border bg-surface p-6 text-center text-brand-muted">
        Gli esercizi di questa skill stanno arrivando: torna a trovarci presto.
      </p>
    );
  }

  return (
    <div className="space-y-8">
      {topics.map((group) => (
        <section key={group.topicId ?? "senza-argomento"} aria-labelledby={`topic-${group.topicId ?? 0}`}>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <h2 id={`topic-${group.topicId ?? 0}`} className="text-lg font-bold text-foreground">
              {group.topicName ?? "Altri esercizi"}
            </h2>
            {group.referenceYear && (
              <span className="rounded-pill bg-surface-blue px-2.5 py-0.5 text-xs font-semibold text-brand-primary">
                {group.referenceYear}ª superiore
              </span>
            )}
          </div>
          <div className="space-y-3">
            {group.items.map((item) => (
              <PracticeItemRow key={item.practiceExerciseId} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
