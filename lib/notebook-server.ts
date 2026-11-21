import { ApiError } from "@/lib/api";
import { serverApi } from "@/lib/api-server";
import type { NotebookData, NotebookLessonData } from "@/types/notebookData";

/* Quaderno: letture dai Server Component (cookie della sessione inoltrato) */

export const getNotebook = () => serverApi<NotebookData>("/student/notebook");

/** null = la lezione non è nel Quaderno (o è ritirata senza nota) */
export async function getNotebookLesson(lessonId: number): Promise<NotebookLessonData | null> {
  try {
    return await serverApi<NotebookLessonData>(`/student/notebook/lessons/${lessonId}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }
}
