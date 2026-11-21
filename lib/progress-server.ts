import { ApiError } from "@/lib/api";
import { serverApi } from "@/lib/api-server";
import type {
  AttemptDetail,
  CourseProgress,
  Growth,
  HistoryContext,
  HistoryOutcome,
  HistoryPage,
  PracticeProgress,
  StudyTime,
  WeakPoints,
} from "@/types/progress";

/* "I miei progressi": letture dai Server Component (cookie della sessione inoltrato) */

const withSubject = (path: string, subject?: string) =>
  subject ? `${path}?${new URLSearchParams({ subject })}` : path;

export const getGrowth = () => serverApi<Growth>("/student/progress/growth");

export const getCourseProgress = (subject?: string) =>
  serverApi<CourseProgress[]>(withSubject("/student/progress/courses", subject));

export const getPracticeProgress = (subject?: string) =>
  serverApi<PracticeProgress>(withSubject("/student/progress/practice", subject));

/** Tempo di studio degli ultimi giorni (7 di default) */
export const getStudyTime = (days = 7) => serverApi<StudyTime>(`/student/progress/study-time?days=${days}`);

export const getWeakPoints = (subject?: string) =>
  serverApi<WeakPoints>(withSubject("/student/progress/weak-points", subject));

export function getHistory(filters: { context: HistoryContext; outcome: HistoryOutcome; allTime: boolean; page: number }) {
  const params = new URLSearchParams({
    context: filters.context,
    outcome: filters.outcome,
    allTime: String(filters.allTime),
    page: String(filters.page),
    size: "15",
  });
  return serverApi<HistoryPage>(`/student/progress/history?${params}`);
}

/** null = non è un tentativo consegnato dello studente */
export async function getAttemptDetail(exerciseAttemptId: number): Promise<AttemptDetail | null> {
  try {
    return await serverApi<AttemptDetail>(`/student/progress/attempts/${exerciseAttemptId}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
