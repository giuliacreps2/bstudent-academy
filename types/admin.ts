/* =====================================================================
   Tipi dell'area Admin: rispecchiano i DTO di /admin/academy nel backend
   (payloads/catalog, payloads/exercises, payloads/skills).
   ===================================================================== */

export type ContentStatus = "draft" | "published" | "withdrawn";
export type AccessTier = "free" | "premium";
export type PageKind = "text" | "image" | "video";
export type QuestionKind =
  | "multiple_choice"
  | "fill_in"
  | "sentence_translation"
  | "passage_translation";
export type AssessmentMode = "automatic" | "teacher";
export type RubricCategory = "structural" | "lexical";

/** PagedModel di Spring Data: { content, page } */
export interface Paged<T> {
  content: T[];
  page: { size: number; number: number; totalElements: number; totalPages: number };
}

export interface Skill {
  skillId: number;
  code: string;
  name: string;
  description: string | null;
  status: string;
}

export interface Subject {
  subjectId: number;
  name: string;
  defaultSkillId: number | null;
}

export interface Course {
  courseId: number;
  subjectId: number;
  title: string;
  shortDescription: string;
  extendedDescription: string;
  coverReference: string | null;
  accessTier: AccessTier;
  status: ContentStatus;
  publishedAt: string | null;
  withdrawnAt: string | null;
  createdAt: string;
  /** Per esercizi e lezioni comprende anche versioni e pagine */
  updatedAt: string;
}

export interface Mission {
  missionId: number;
  courseId: number;
  title: string;
  shortDescription: string;
  sortOrder: number;
  /** null = eredita dal corso */
  accessTier: AccessTier | null;
  status: ContentStatus;
  publishedAt: string | null;
  withdrawnAt: string | null;
  createdAt: string;
  /** Per esercizi e lezioni comprende anche versioni e pagine */
  updatedAt: string;
}

export interface Lesson {
  lessonId: number;
  missionId: number;
  title: string;
  sortOrder: number;
  status: ContentStatus;
  publishedAt: string | null;
  withdrawnAt: string | null;
  createdAt: string;
  /** Per esercizi e lezioni comprende anche versioni e pagine */
  updatedAt: string;
}

export interface LessonPage {
  lessonPageId: number;
  lessonId: number;
  sortOrder: number;
  kind: PageKind;
  formattedText: string | null;
  imageReference: string | null;
  videoProvider: string | null;
  videoIdentifier: string | null;
}

export interface QuestionBankEntry {
  questionBankEntryId: number;
  internalTitle: string;
  status: ContentStatus;
  publishedAt: string | null;
  withdrawnAt: string | null;
  createdAt: string;
  /** Per esercizi e lezioni comprende anche versioni e pagine */
  updatedAt: string;
}

/** Riga dell'elenco esercizi: riepilogo delle versioni */
export interface QuestionBankEntryListItem extends QuestionBankEntry {
  /** null se l'esercizio non ha ancora versioni */
  firstVersionAt: string | null;
  /** null se nessuna versione è pubblicata */
  publishedVersionNumber: number | null;
  publishedVersionSince: string | null;
}

export interface QuestionVersionSummary {
  questionVersionId: number;
  questionBankEntryId: number;
  versionNumber: number;
  published: boolean;
  publishedAt: string | null;
  /** Fine dell'uso come versione pubblicata: null se in uso o mai pubblicata */
  replacedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionAnswer {
  questionAnswerId: number;
  sortOrder: number;
  text: string;
  correct: boolean;
  feedback: string | null;
}

export interface RubricCriterion {
  questionRubricCriterionId: number;
  sortOrder: number;
  category: RubricCategory;
  description: string;
}

/** Vista editoriale: include soluzioni e rubriche */
export interface QuestionVersion extends QuestionVersionSummary {
  kind: QuestionKind;
  assessmentMode: AssessmentMode;
  prompt: string;
  sourceText: string | null;
  generalExplanation: string | null;
  answers: QuestionAnswer[];
  rubricCriteria: RubricCriterion[];
}

/** Body di creazione e modifica di una versione */
export interface QuestionVersionInput {
  kind: QuestionKind;
  prompt: string;
  sourceText: string | null;
  generalExplanation: string | null;
  assessmentMode: AssessmentMode | null;
  answers: { text: string; correct: boolean; feedback: string | null }[];
  rubricCriteria: { category: RubricCategory; description: string }[];
}

export interface MissionExercise {
  missionExerciseId: number;
  missionId: number;
  lessonId: number;
  questionBankEntryId: number;
  allowedDurationMs: number;
  maxPoints: number;
}

export interface SkillWeight {
  skillId: number;
  skillCode: string;
  skillName: string;
  weight: number;
}
