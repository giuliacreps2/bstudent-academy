import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api";
import { serverApi } from "@/lib/api-server";
import type {
  Course,
  ExerciseUsages,
  Lesson,
  LessonPage,
  Mission,
  MissionExercise,
  MissionReadiness,
  MissionStep,
  Paged,
  QuestionBankEntry,
  QuestionBankEntryListItem,
  QuestionVersion,
  QuestionVersionSummary,
  Skill,
  SkillWeight,
  Subject,
} from "@/types/admin";

/* =====================================================================
   Letture dell'area Admin dai Server Component (cookie inoltrato).
   Le modifiche partono dai componenti client: vedi lib/admin.ts.
   ===================================================================== */

const BASE = "/admin/academy";

/** Elenchi usati nei select: una pagina ampia basta finché i cataloghi restano piccoli */
const SELECT_PAGE_SIZE = 100;

/** 404 del backend -> pagina 404 di Next */
async function get<T>(path: string): Promise<T> {
  try {
    return await serverApi<T>(`${BASE}${path}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}

/** Il backend accetta solo ID numerici: un segmento non valido è una pagina inesistente */
export function parseId(value: string): number {
  const id = Number(value);
  if (!Number.isInteger(id) || id <= 0) notFound();
  return id;
}

export function parsePage(value: string | string[] | undefined): number {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(page) && page >= 0 ? page : 0;
}

// Skill
export const getSkills = (page = 0, size = 20) =>
  get<Paged<Skill>>(`/skills?page=${page}&size=${size}&sortBy=skillName`);
export const getAllSkills = () => getSkills(0, SELECT_PAGE_SIZE);

// Materie
export const getSubjects = (page = 0, size = 20) =>
  get<Paged<Subject>>(`/subjects?page=${page}&size=${size}&sortBy=subjectName`);
export const getAllSubjects = () => getSubjects(0, SELECT_PAGE_SIZE);
export const getSubject = (id: number) => get<Subject>(`/subjects/${id}`);

// Corsi
export const getCourses = (page = 0, subjectId?: number) =>
  get<Paged<Course>>(
    subjectId
      ? `/subjects/${subjectId}/courses?page=${page}&size=20&sortBy=courseTitle`
      : `/courses?page=${page}&size=20&sortBy=courseTitle`,
  );
export const getCourse = (id: number) => get<Course>(`/courses/${id}`);

// Missioni
export const getMissions = (courseId: number) => get<Mission[]>(`/courses/${courseId}/missions`);
export const getMission = (id: number) => get<Mission>(`/missions/${id}`);
/** Lezioni ed esercizi in un unico ordine */
export const getMissionSteps = (missionId: number) => get<MissionStep[]>(`/missions/${missionId}/steps`);
export const getMissionReadiness = (missionId: number) =>
  get<MissionReadiness>(`/missions/${missionId}/readiness`);

// Lezioni e pagine
export const getLessons = (missionId: number) => get<Lesson[]>(`/missions/${missionId}/lessons`);
export const getLesson = (id: number) => get<Lesson>(`/lessons/${id}`);
export const getLessonPages = (lessonId: number) => get<LessonPage[]>(`/lessons/${lessonId}/pages`);

/** Esercizi della missione, nell'ordine della sequenza */
export const getMissionExercises = (missionId: number) =>
  get<MissionExercise[]>(`/missions/${missionId}/exercises`);
export const getMissionExercise = (id: number) => get<MissionExercise>(`/mission-exercises/${id}`);
export const getSkillWeights = (missionExerciseId: number) =>
  get<SkillWeight[]>(`/mission-exercises/${missionExerciseId}/skills`);

// Esercizi e versioni
export const getExercises = (page = 0, size = 20) =>
  get<Paged<QuestionBankEntryListItem>>(`/exercises?page=${page}&size=${size}&sortBy=internalQuestionTitle`);
// TODO: con molti esercizi serve un filtro per titolo/stato nel backend (GET /exercises?q=&status=)
export const getAllExercises = () => getExercises(0, SELECT_PAGE_SIZE);
export const getExercise = (id: number) => get<QuestionBankEntry>(`/exercises/${id}`);
/** Missioni e Palestra in cui è usato: da mostrare prima del ritiro */
export const getExerciseUsages = (id: number) => get<ExerciseUsages>(`/exercises/${id}/usages`);
export const getVersions = (exerciseId: number) =>
  get<QuestionVersionSummary[]>(`/exercises/${exerciseId}/versions`);
export const getVersion = (versionId: number) => get<QuestionVersion>(`/versions/${versionId}`);
