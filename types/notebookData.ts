import type { LessonPage } from "@/types/missionPlay";

/* =====================================================================
   Quaderno (blueprint §14): risposte del backend (/student/notebook).
   I tipi del mockup restano in types/notebook.ts.
   ===================================================================== */

export interface NotebookItem {
  lessonId: number;
  /** "video" = lezione fatta solo di video */
  kind: "lesson" | "video";
  title: string;
  topicId: number | null;
  topicName: string | null;
  /** Primo paragrafo; null se la lezione non è più disponibile */
  preview: string | null;
  acquiredAt: string;
  courseSlug: string;
  courseTitle: string;
  missionSlug: string;
  missionTitle: string;
  /** false = lezione ritirata: resta solo la nota */
  available: boolean;
  /** Abbonamento scaduto: titolo, anteprima e nota sì, lezione completa no */
  premiumLocked: boolean;
  isNew: boolean;
  hasNote: boolean;
}

export interface NotebookBookmark {
  slug: string;
  subjectSlug: string;
  title: string;
  description: string;
  category: string;
  premiumLocked: boolean;
}

export interface NotebookData {
  coverColor: string | null;
  subjects: { subjectSlug: string; subjectName: string; items: NotebookItem[] }[];
  bookmarks: NotebookBookmark[];
}

export interface LessonNote {
  text: string;
  version: number;
  updatedAt: string;
}

export interface NotebookLessonData {
  item: NotebookItem;
  pages: LessonPage[];
  note: LessonNote | null;
}

export type StudyEventInput =
  | { kind: "lesson_read"; lessonId: number; lessonPageId?: number; startedAt: string; activeMs: number }
  | { kind: "resource_read"; resourceId: number; startedAt: string; activeMs: number }
  | { kind: "recommendation_open"; practiceExerciseId: number };
