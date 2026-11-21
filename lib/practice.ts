import { api } from "@/lib/api";
import type { Answer } from "@/types/missionPlay";
import type { PracticeAttempt, PracticeItem, PracticeItemStatus } from "@/types/practice";

/* =====================================================================
   Palestra: indirizzi delle pagine e chiamate dal browser.
   Le letture delle pagine le fa il server (lib/practice-server.ts).
   ===================================================================== */

export const EXERCISES_PATH = "/my/exercises";

export function exercisesHref(subject?: string): string {
  return subject ? `${EXERCISES_PATH}?${new URLSearchParams({ materia: subject })}` : EXERCISES_PATH;
}

export function skillPracticeHref(subject: string, skillCode: string): string {
  return `${EXERCISES_PATH}/skills/${encodeURIComponent(skillCode)}?${new URLSearchParams({ materia: subject })}`;
}

export function topicPracticeHref(topicId: number): string {
  return `${EXERCISES_PATH}/topics/${topicId}`;
}

export function practiceAttemptHref(exerciseAttemptId: number): string {
  return `${EXERCISES_PATH}/practice/${exerciseAttemptId}`;
}

/** Testo del pulsante di una voce, secondo il suo stato */
export const practiceActionLabel: Record<PracticeItemStatus, string> = {
  new: "Inizia",
  saved: "Continua",
  retry: "Riprova",
  completed: "Rifai",
  in_review: "Vedi la consegna",
};

export const practiceStatusLabel: Record<PracticeItemStatus, string> = {
  new: "Da fare",
  saved: "In sospeso",
  retry: "Da riprovare",
  completed: "Superato",
  in_review: "In correzione",
};

/** Voce chiusa da un lucchetto (livello o abbonamento): non si apre */
export const isPracticeLocked = (item: PracticeItem) =>
  item.premiumLocked || Boolean(item.lock?.locked);

/* ------------------------------------ Chiamate ------------------------------------ */

const attempt = (id: number) => `/student/practice/attempts/${id}`;

export const getTodayGoal = (subjectSlug: string, skillCode?: string) =>
  api<PracticeItem[]>(
    `/student/practice/${encodeURIComponent(subjectSlug)}/today-goal${
      skillCode ? `?${new URLSearchParams({ skill: skillCode })}` : ""
    }`,
  );

/** "Salva esercizio": bozza da riprendere più tardi */
export const saveDraft = (exerciseAttemptId: number, answer: Answer) =>
  api<PracticeAttempt>(`${attempt(exerciseAttemptId)}/draft`, { method: "PUT", body: answer });

/** "Esci senza salvare" */
export const leaveAttempt = (exerciseAttemptId: number) =>
  api(`${attempt(exerciseAttemptId)}/leave`, { method: "POST" });

export const submitPractice = (exerciseAttemptId: number, answer: Answer) =>
  api<PracticeAttempt>(`${attempt(exerciseAttemptId)}/submit`, { body: answer });

export const cancelPracticeSubmission = (exerciseAttemptId: number) =>
  api<PracticeAttempt>(`${attempt(exerciseAttemptId)}/cancel-submission`, { method: "POST" });
