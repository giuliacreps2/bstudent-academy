import { cache } from "react";
import { ApiError } from "@/lib/api";
import { serverApi } from "@/lib/api-server";
import type { ExercisesPage, PracticeAttempt, PracticeItem, PracticeList } from "@/types/practice";

/* =====================================================================
   Palestra: letture dai Server Component (cookie della sessione inoltrato).
   404 = contenuto non pubblicato o non dello studente → null.
   ===================================================================== */

async function orNull<T>(request: Promise<T>): Promise<T | null> {
  try {
    return await request;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}

/** Pagina "Esercizi": senza materia il backend sceglie la prima */
export function getExercisesPage(subject?: string): Promise<ExercisesPage> {
  const qs = subject ? `?${new URLSearchParams({ subject })}` : "";
  return serverApi<ExercisesPage>(`/student/practice${qs}`);
}

export const getPracticeBySkill = cache((subject: string, skillCode: string) =>
  orNull(
    serverApi<PracticeList>(
      `/student/practice/${encodeURIComponent(subject)}/skills/${encodeURIComponent(skillCode)}`,
    ),
  ),
);

export function getPracticeByTopic(topicId: number): Promise<PracticeItem[] | null> {
  return orNull(serverApi<PracticeItem[]>(`/student/practice/topics/${topicId}`));
}

export function getPracticeAttempt(exerciseAttemptId: number): Promise<PracticeAttempt | null> {
  return orNull(serverApi<PracticeAttempt>(`/student/practice/attempts/${exerciseAttemptId}`));
}
