import { api, ApiError } from "@/lib/api";
import type {
  AccessTier,
  Course,
  CourseLevel,
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
  VideoProvider,
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

/** Stringa vuota -> null: i campi facoltativi del backend */
export const orNull = (value: string) => (value.trim() === "" ? null : value.trim());

/* Elenchi fissi scelti nell'Admin. Le chiavi devono avere un'icona, un colore o un'illustrazione nel frontend
   dello studente: aggiungerne una qui senza il disegno corrispondente mostra l'aspetto neutro */
export const SKILL_ICONS = [
  { key: "grammatica", label: "Grammatica" },
  { key: "lessico", label: "Lessico" },
  { key: "analisi", label: "Analisi" },
  { key: "traduzione", label: "Traduzione" },
] as const;
export const SKILL_COLORS = [
  { key: "pink", label: "Rosa" },
  { key: "green", label: "Verde" },
  { key: "purple", label: "Viola" },
  { key: "orange", label: "Arancione" },
] as const;
export const WORLD_THEMES = [
  { key: "roman-city", label: "Città romana" },
  { key: "greek-temple", label: "Tempio greco" },
  { key: "library", label: "Biblioteca" },
] as const;
export const COURSE_LEVELS: { key: CourseLevel; label: string }[] = [
  { key: "beginner", label: "Principiante" },
  { key: "intermediate", label: "Intermedio" },
  { key: "advanced", label: "Avanzato" },
];
export const VIDEO_PROVIDERS: { key: VideoProvider; label: string }[] = [
  { key: "youtube", label: "YouTube (non in elenco) — contenuti free" },
  { key: "vimeo", label: "Vimeo — contenuti premium" },
];

// Skill
export type SkillInput = {
  code: string;
  name: string;
  description: string | null;
  icon: string | null;
  color: string | null;
};
export const createSkill = (body: SkillInput) => post<Skill>("/skills", body);
export const updateSkill = (id: number, body: SkillInput) => put<Skill>(`/skills/${id}`, body);
export const deleteSkill = (id: number) => del(`/skills/${id}`);

// Materie
export type SubjectInput = {
  name: string;
  /** null = ricavato dal nome */
  slug: string | null;
  tagline: string | null;
  imageReference: string | null;
  guideName: string | null;
  guideImageReference: string | null;
  defaultSkillId: number | null;
};
export const createSubject = (body: SubjectInput) => post<Subject>("/subjects", body);
export const updateSubject = (id: number, body: SubjectInput) => put<Subject>(`/subjects/${id}`, body);
/** Mostra la materia agli studenti; senza corsi pubblicati appare come "Presto disponibile" */
export const publishSubject = (id: number) => patch<Subject>(`/subjects/${id}/publish`);
/** La nasconde agli studenti (torna in bozza) */
export const unpublishSubject = (id: number) => patch<Subject>(`/subjects/${id}/unpublish`);
export const deleteSubject = (id: number) => del(`/subjects/${id}`);

// Corsi
export type CourseInput = {
  title: string;
  shortDescription: string;
  extendedDescription: string;
  coverReference: string | null;
  accessTier: AccessTier;
  /** null = ricavato dal titolo */
  slug: string | null;
  tagline: string | null;
  level: CourseLevel | null;
  /** ISO; null = non in evidenza */
  featuredUntil: string | null;
  worldTheme: string | null;
  quote: string | null;
  quoteAuthor: string | null;
};
export const createCourse = (subjectId: number, body: CourseInput) =>
  post<Course>(`/subjects/${subjectId}/courses`, body);
export const updateCourse = (id: number, body: CourseInput) => put<Course>(`/courses/${id}`, body);
export const publishCourse = (id: number) => patch<Course>(`/courses/${id}/publish`);
export const withdrawCourse = (id: number) => patch<Course>(`/courses/${id}/withdraw`);
export const deleteCourse = (id: number) => del(`/courses/${id}`);

// Missioni
export type MissionInput = {
  title: string;
  shortDescription: string;
  accessTier: AccessTier | null;
  /** null = ricavato dal titolo */
  slug: string | null;
  tagline: string | null;
  coverReference: string | null;
  isFinal: boolean;
  briefingVideoProvider: VideoProvider | null;
  briefingVideoIdentifier: string | null;
  briefingLines: string[];
  learningGoals: string[];
};
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
export type LessonInput = { title: string; topicId: number | null };
export const createLesson = (missionId: number, body: LessonInput) =>
  post<Lesson>(`/missions/${missionId}/lessons`, body);
export const updateLesson = (id: number, body: LessonInput) => put<Lesson>(`/lessons/${id}`, body);
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
/** title = titolo per lo studente, facoltativo in bozza e obbligatorio per pubblicare */
export type ExerciseInput = { internalTitle: string; title: string | null; topicId: number | null };
export const createExercise = (body: ExerciseInput) => post<QuestionBankEntry>("/exercises", body);
export const updateExercise = (id: number, body: ExerciseInput) =>
  put<QuestionBankEntry>(`/exercises/${id}`, body);
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
