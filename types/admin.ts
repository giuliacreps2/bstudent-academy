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
/** Materia: bozza = nascosta agli studenti (v0.9) */
export type SubjectStatus = "draft" | "published";
/** Livello del corso e del test di livello: Principiante, Intermedio, Avanzato */
export type CourseLevel = "beginner" | "intermediate" | "advanced";
/** Piattaforme video ammesse: YouTube (non in elenco) per i contenuti free, Vimeo per i premium */
export type VideoProvider = "youtube" | "vimeo";

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
  /** Chiavi dell'elenco fisso SKILL_ICONS / SKILL_COLORS; null = aspetto neutro */
  icon: string | null;
  color: string | null;
  status: string;
}

/** Skill scelta dalla materia, nell'ordine dell'autrice */
export interface SubjectSkill {
  subjectId: number;
  skillId: number;
  code: string;
  name: string;
  icon: string | null;
  color: string | null;
  status: string;
  sortOrder: number;
}

/** Argomento della materia (es. "L'ablativo assoluto") */
export interface Topic {
  topicId: number;
  subjectId: number;
  name: string;
  imageReference: string | null;
}

export interface Subject {
  subjectId: number;
  name: string;
  /** Indirizzo della pagina */
  slug: string;
  tagline: string | null;
  imageReference: string | null;
  status: SubjectStatus;
  publishedAt: string | null;
  /** Guida che presenta le missioni nel briefing */
  guideName: string | null;
  guideImageReference: string | null;
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
  slug: string;
  tagline: string | null;
  /** Obbligatorio per pubblicare */
  level: CourseLevel | null;
  /** In evidenza fino a questa data; null = no */
  featuredUntil: string | null;
  worldTheme: string | null;
  quote: string | null;
  quoteAuthor: string | null;
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
  slug: string;
  tagline: string | null;
  coverReference: string | null;
  /** Prova finale: al massimo una per corso */
  isFinal: boolean;
  briefingVideoProvider: VideoProvider | null;
  briefingVideoIdentifier: string | null;
  /** Battute della guida, da 1 a 5 */
  briefingLines: string[];
  /** "Cosa imparerai", al massimo 5 */
  learningGoals: string[];
  status: ContentStatus;
  publishedAt: string | null;
  withdrawnAt: string | null;
  createdAt: string;
  /** Per esercizi e lezioni comprende anche versioni e pagine */
  updatedAt: string;
}

/** La posizione nella missione è quella del suo passo (MissionStep) */
export interface Lesson {
  lessonId: number;
  missionId: number;
  title: string;
  /** Argomento della stessa materia, facoltativo */
  topicId: number | null;
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
  /** Titolo per lo studente: obbligatorio per pubblicare */
  title: string | null;
  /** Argomento facoltativo (collegamento alla teoria) */
  topicId?: number | null;
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

/** Esercizio della missione: draft = nascosto allo studente finché non si pubblica (o esce con la missione) */
export interface MissionExercise {
  missionExerciseId: number;
  missionId: number;
  questionBankEntryId: number;
  status: Exclude<ContentStatus, "withdrawn">;
  allowedDurationMs: number;
  maxPoints: number;
}

/** Passo della sequenza della missione: una lezione oppure un esercizio */
export interface MissionStep {
  stepId: number;
  sortOrder: number;
  kind: "lesson" | "exercise";
  title: string;
  /** Della lezione, oppure dell'esercizio nella missione */
  status: ContentStatus;
  /** Solo per gli esercizi: stato nel banco esercizi (withdrawn = nascosto ovunque) */
  bankStatus: ContentStatus | null;
  lessonId: number | null;
  missionExerciseId: number | null;
  questionBankEntryId: number | null;
}

/** Controllo "missione pronta": i problemi bloccano la pubblicazione, gli avvisi no */
export interface MissionReadiness {
  ready: boolean;
  problems: string[];
  warnings: string[];
}

/** Dove è usato un esercizio del banco: mostrato prima del ritiro */
export interface ExerciseUsages {
  missions: {
    missionId: number;
    missionTitle: string;
    missionStatus: ContentStatus;
    courseId: number;
    courseTitle: string;
    /** Senza questo esercizio la missione resterebbe senza esercizi */
    leftWithoutExercises: boolean;
  }[];
  publishedInPractice: boolean;
}

export interface SkillWeight {
  skillId: number;
  skillCode: string;
  skillName: string;
  weight: number;
}
