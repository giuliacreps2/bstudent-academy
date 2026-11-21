import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPracticeAttempt } from "@/lib/practice-server";
import { EXERCISES_PATH } from "@/lib/practice";
import { MissionBreadcrumb } from "@/components/missions/MissionBreadcrumb";
import { PracticeAttemptPlayer } from "@/components/practice/PracticeAttemptPlayer";

export const metadata: Metadata = { title: "Esercizio | BStudent", robots: { index: false } };

interface PageProps {
  params: Promise<{ attemptId: string }>;
}

/** Esercizio della Palestra: niente tempo obbligatorio e niente vite (Blueprint Svolgimento §7) */
export default async function PracticeAttemptPage({ params }: PageProps) {
  const { attemptId } = await params;
  const id = Number(attemptId);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  const attempt = await getPracticeAttempt(id);
  if (!attempt) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <MissionBreadcrumb items={[{ label: "Esercizi", href: EXERCISES_PATH }, { label: attempt.exercise.title }]} />
      <PracticeAttemptPlayer key={attempt.exerciseAttemptId} initial={attempt} />
    </div>
  );
}
