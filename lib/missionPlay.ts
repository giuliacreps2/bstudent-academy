import { api, API_URL } from "@/lib/api";
import type {
  Answer,
  Hint,
  Lives,
  MissionPlay,
  MissionStepOutcome,
  MissionSync,
} from "@/types/missionPlay";

/* =====================================================================
   Missione in corso: chiamate dal browser (il cookie della sessione
   parte da solo). La prima lettura la fa la pagina dal server.
   ===================================================================== */

export const missionPlayHref = (missionAttemptId: number) =>
  `/my/missions/play/${missionAttemptId}`;

export const courseHref = (courseSlug: string) => `/my/courses/${courseSlug}`;

const attempt = (id: number) => `/student/missions/attempts/${id}`;
const exercise = (id: number) => `/student/missions/exercises/${id}`;

export const getMissionState = (missionAttemptId: number) =>
  api<MissionPlay>(attempt(missionAttemptId));

export const completeLesson = (missionAttemptId: number, lessonId: number) =>
  api<MissionStepOutcome>(
    `${attempt(missionAttemptId)}/lessons/${lessonId}/done`,
    { method: "POST" },
  );

export const pauseMission = (missionAttemptId: number, answer?: Answer) =>
  api<MissionPlay>(`${attempt(missionAttemptId)}/pause`, {
    method: "POST",
    body: answer,
  });

export const resumeMission = (missionAttemptId: number) =>
  api<MissionPlay>(`${attempt(missionAttemptId)}/resume`, { method: "POST" });

export const abandonMission = (missionAttemptId: number) =>
  api<Lives>(`${attempt(missionAttemptId)}/abandon`, { method: "POST" });

export const syncExercise = (exerciseAttemptId: number, answer: Answer) =>
  api<MissionSync>(`${exercise(exerciseAttemptId)}/sync`, {
    method: "PUT",
    body: answer,
  });

export const submitExercise = (exerciseAttemptId: number, answer: Answer) =>
  api<MissionStepOutcome>(`${exercise(exerciseAttemptId)}/submit`, {
    body: answer,
  });

export const cancelSubmission = (exerciseAttemptId: number) =>
  api<MissionPlay>(`${exercise(exerciseAttemptId)}/cancel-submission`, {
    method: "POST",
  });

/** Consuma una carica del cappello (riaprirlo nello stesso tentativo non la consuma) */
export const openHint = (missionAttemptId: number, missionExerciseId: number) =>
  api<Hint>(
    `/student/game/mission-attempts/${missionAttemptId}/exercises/${missionExerciseId}/hint`,
    { method: "POST" },
  );

/**
 * Chiusura della pagina: "Salva missione" con la risposta, anche se la pagina se ne sta andando
 * (keepalive). Se non arriva, il backend mette comunque in pausa dopo 45 secondi senza segnali.
 */
export function pauseOnLeave(missionAttemptId: number, answer?: Answer) {
  try {
    void fetch(`${API_URL}${attempt(missionAttemptId)}/pause`, {
      method: "POST",
      credentials: "include",
      keepalive: true,
      headers: answer ? { "Content-Type": "application/json" } : undefined,
      body: answer ? JSON.stringify(answer) : undefined,
    });
  } catch {
    // la pausa automatica del backend copre questo caso
  }
}
