import { api, ApiError } from "@/lib/api";
import type {
  AccessTier,
  Course,
  Lesson,
  LessonPage,
  Mission,
  MissionExercise,
  MissionStep,
  QuestionBankEntry,
  QuestionVersion,
  QuestionVersionInput,
  QuestionVersionSummary,
  Skill,
  SkillWeight,
  Subject,
} from "@/types/admin";

/* =====================================================================
   Modifiche dell'area Admin (lato client). Dopo ogni modifica la pagina
   chiama router.refresh() e i Server Component rileggono i dati.
   ===================================================================== */

const BASE = "/admin/academy";

const post = <T>(path: string, body: unknown) => api<T>(`${BASE}${path}`, { method: "POST", body });
const put = <T>(path: string, body: unknown) => api<T>(`${BASE}${path}`, { method: "PUT", body });
const patch = <T>(path: string) => api<T>(`${BASE}${path}`, { method: "PATCH" });
const del = (path: string) => api(`${BASE}${path}`, { method: "DELETE" });

/**
 * Messaggio per l'Admin: a differenza di errorMessage() mostra anche gli errori
 * di validazione ("campo: messaggio") e i 409 ("La missione non è pronta: ..."),
 * che spiegano cosa correggere.
 */
export function adminErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    if (error.status === 0) return error.message;
    if (error.status === 401) return "Sessione scaduta: accedi di nuovo.";
    if (error.status === 403) return "Operazione riservata all'Admin.";
    if (error.status < 500) return error.message;
  }
  return "Errore del server. Riprova tra poco.";
}

/** Il backend usa i millisecondi, l'interfaccia i minuti */
export const msToMinutes = (ms: number) => Math.round((ms / 60000) * 100) / 100;
export const minutesToMs = (minutes: number) => Math.round(minutes * 60000);

// Skill
export type SkillInput = { code: string; name: string; description: string | null };
export const createSkill = (body: SkillInput) => post<Skill>("/skills", body);
export const updateSkill = (id: number, body: SkillInput) => put<Skill>(`/skills/${id}`, body);
export const deleteSkill = (id: number) => del(`/skills/${id}`);

// Materie
export type SubjectInput = { name: string; defaultSkillId: number | null };
export const createSubject = (body: SubjectInput) => post<Subject>("/subjects", body);
export const updateSubject = (id: number, body: SubjectInput) => put<Subject>(`/subjects/${id}`, body);
export const deleteSubject = (id: number) => del(`/subjects/${id}`);

// Corsi
export type CourseInput = {
  title: string;
  shortDescription: string;
  extendedDescription: string;
  coverReference: string | null;
  accessTier: AccessTier;
};
export const createCourse = (subjectId: number, body: CourseInput) =>
  post<Course>(`/subjects/${subjectId}/courses`, body);
export const updateCourse = (id: number, body: CourseInput) => put<Course>(`/courses/${id}`, body);
export const publishCourse = (id: number) => patch<Course>(`/courses/${id}/publish`);
export const withdrawCourse = (id: number) => patch<Course>(`/courses/${id}/withdraw`);
export const deleteCourse = (id: number) => del(`/courses/${id}`);

// Missioni
export type MissionInput = { title: string; shortDescription: string; accessTier: AccessTier | null };
export const createMission = (courseId: number, body: MissionInput) =>
  post<Mission>(`/courses/${courseId}/missions`, body);
export const updateMission = (id: number, body: MissionInput) => put<Mission>(`/missions/${id}`, body);
export const reorderMissions = (courseId: number, ids: number[]) =>
  put<Mission[]>(`/courses/${courseId}/missions/order`, { ids });
export const publishMission = (id: number) => patch<Mission>(`/missions/${id}/publish`);
export const withdrawMission = (id: number) => patch<Mission>(`/missions/${id}/withdraw`);
export const deleteMission = (id: number) => del(`/missions/${id}`);
/** Tutti e soli gli ID dei passi (lezioni ed esercizi) nel nuovo ordine */
export const reorderMissionSteps = (missionId: number, ids: number[]) =>
  put<MissionStep[]>(`/missions/${missionId}/steps/order`, { ids });

// Lezioni
export const createLesson = (missionId: number, title: string) =>
  post<Lesson>(`/missions/${missionId}/lessons`, { title });
export const updateLesson = (id: number, title: string) => put<Lesson>(`/lessons/${id}`, { title });
export const publishLesson = (id: number) => patch<Lesson>(`/lessons/${id}/publish`);
export const withdrawLesson = (id: number) => patch<Lesson>(`/lessons/${id}/withdraw`);
export const deleteLesson = (id: number) => del(`/lessons/${id}`);

// Pagine: esattamente un contenuto (testo, immagine o video)
export type LessonPageInput = {
  formattedText: string | null;
  imageReference: string | null;
  videoProvider: string | null;
  videoIdentifier: string | null;
};
export const createLessonPage = (lessonId: number, body: LessonPageInput) =>
  post<LessonPage>(`/lessons/${lessonId}/pages`, body);
export const updateLessonPage = (pageId: number, body: LessonPageInput) =>
  put<LessonPage>(`/pages/${pageId}`, body);
export const reorderLessonPages = (lessonId: number, ids: number[]) =>
  put<LessonPage[]>(`/lessons/${lessonId}/pages/order`, { ids });
export const deleteLessonPage = (pageId: number) => del(`/pages/${pageId}`);

// Esercizio della missione: un passo della sequenza, nasce in bozza
export type SkillWeightInput = { skillId: number; weight: number };
export type MissionExerciseInput = {
  questionBankEntryId: number | null;
  allowedDurationMs: number | null;
  maxPoints: number | null;
  /** Solo alla creazione; null = nessuna indicata */
  skills?: SkillWeightInput[] | null;
};
export const addMissionExercise = (missionId: number, body: MissionExerciseInput) =>
  post<MissionExercise>(`/missions/${missionId}/exercises`, body);
export const updateMissionExercise = (id: number, body: MissionExerciseInput) =>
  put<MissionExercise>(`/mission-exercises/${id}`, body);
/** Lo rende visibile in una missione già pubblicata */
export const publishMissionExercise = (id: number) =>
  patch<MissionExercise>(`/mission-exercises/${id}/publish`);
export const removeMissionExercise = (id: number) => del(`/mission-exercises/${id}`);
/** Lista vuota = 100% sulla skill predefinita della materia */
export const replaceSkillWeights = (id: number, weights: SkillWeightInput[]) =>
  put<SkillWeight[]>(`/mission-exercises/${id}/skills`, { weights });

// Esercizi e versioni
export const createExercise = (internalTitle: string) =>
  post<QuestionBankEntry>("/exercises", { internalTitle });
export const updateExercise = (id: number, internalTitle: string) =>
  put<QuestionBankEntry>(`/exercises/${id}`, { internalTitle });
export const publishExercise = (id: number) => patch<QuestionBankEntry>(`/exercises/${id}/publish`);
export const withdrawExercise = (id: number) => patch<QuestionBankEntry>(`/exercises/${id}/withdraw`);
export const deleteExercise = (id: number) => del(`/exercises/${id}`);
export const createVersion = (exerciseId: number, body: QuestionVersionInput) =>
  post<QuestionVersion>(`/exercises/${exerciseId}/versions`, body);
export const updateVersion = (versionId: number, body: QuestionVersionInput) =>
  put<QuestionVersion>(`/versions/${versionId}`, body);
export const publishVersion = (versionId: number) =>
  patch<QuestionVersionSummary>(`/versions/${versionId}/publish`);
export const deleteVersion = (versionId: number) => del(`/versions/${versionId}`);
