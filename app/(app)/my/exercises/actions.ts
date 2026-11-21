"use server";

import { redirect } from "next/navigation";
import { errorMessage } from "@/lib/api";
import { serverApi } from "@/lib/api-server";
import { practiceAttemptHref } from "@/lib/practice";
import type { PracticeAttempt } from "@/types/practice";

/**
 * Avvia o riprende una voce della Palestra e apre la pagina dell'esercizio. Se non si può (lucchetto del
 * livello, in correzione, abbonamento) restituisce il messaggio da mostrare.
 */
export async function startPractice(practiceExerciseId: number): Promise<{ error: string }> {
  let attempt: PracticeAttempt;
  try {
    attempt = await serverApi<PracticeAttempt>(
      `/student/practice/exercises/${practiceExerciseId}/attempts`,
      { method: "POST" },
    );
  } catch (error) {
    return { error: errorMessage(error, "Non riusciamo ad aprire l'esercizio. Riprova tra poco.") };
  }
  redirect(practiceAttemptHref(attempt.exerciseAttemptId));
}
