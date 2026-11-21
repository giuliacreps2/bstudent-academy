import { api } from "@/lib/api";
import type { HintReviewLink, StudentTest, StudentTestResult } from "@/types/courses";

/* =====================================================================
   Corsi e missioni: indirizzi delle pagine e chiamate dal browser.
   ===================================================================== */

export const coursesHref = (subject?: string) =>
  subject ? `/my/courses?${new URLSearchParams({ materia: subject })}` : "/my/courses";

export const courseHref = (courseSlug: string) => `/my/courses/${encodeURIComponent(courseSlug)}`;

/** Mappa immersiva del corso */
export const missionMapHref = (courseSlug: string) => `/my/missions/${encodeURIComponent(courseSlug)}`;

/** Pagina della missione (blueprint §5.9) */
export const missionHref = (courseSlug: string, missionSlug: string) =>
  `/my/missions/${encodeURIComponent(courseSlug)}/${encodeURIComponent(missionSlug)}`;

/** Tutorial della prima volta: visto, non si mostra più */
export const markTutorialSeen = () => api("/student/tutorial", { method: "POST" });

/** "Ripassa": argomenti degli aiuti del cappello usati nel tentativo (solo a tentativo chiuso) */
export const getHintReview = (missionAttemptId: number) =>
  api<HintReviewLink[]>(`/student/game/mission-attempts/${missionAttemptId}/hint-review`);

/* ------------------------------------ Test di livello ------------------------------------ */

const testPath = (subjectSlug: string) => `/student/tests/${encodeURIComponent(subjectSlug)}/course_level`;

/** undefined = la materia non ha il test (risposta vuota del backend) */
export const getLevelTest = (subjectSlug: string) => api<StudentTest | undefined>(testPath(subjectSlug));

/** answers: id della domanda → id dell'opzione scelta, per tutte le domande */
export const submitLevelTest = (subjectSlug: string, answers: Record<number, number>) =>
  api<StudentTestResult>(testPath(subjectSlug), { body: { answers } });
