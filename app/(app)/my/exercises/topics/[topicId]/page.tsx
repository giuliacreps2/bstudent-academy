import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPracticeByTopic } from "@/lib/practice-server";
import { EXERCISES_PATH } from "@/lib/practice";
import { MissionBreadcrumb } from "@/components/missions/MissionBreadcrumb";
import { PracticeItemRow } from "@/components/practice/PracticeItemRow";

export const metadata: Metadata = { title: "Esercizi | BStudent" };

interface PageProps {
  params: Promise<{ topicId: string }>;
}

/** Voci della Palestra di un argomento: si arriva da "Vai agli esercizi" di una Risorsa */
export default async function TopicPracticePage({ params }: PageProps) {
  const { topicId } = await params;
  const id = Number(topicId);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const items = await getPracticeByTopic(id);
  if (!items) notFound();

  const topicName = items[0]?.topicName ?? "Argomento";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <MissionBreadcrumb items={[{ label: "Esercizi", href: EXERCISES_PATH }, { label: topicName }]} />

      <header>
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-primary">Allenati su</p>
        <h1 className="mt-1 text-2xl font-extrabold text-foreground sm:text-3xl">{topicName}</h1>
      </header>

      {items.length === 0 ? (
        <p className="rounded-lg border border-border bg-surface p-6 text-center text-brand-muted">
          Gli esercizi di questo argomento stanno arrivando: torna a trovarci presto.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <PracticeItemRow key={item.practiceExerciseId} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
