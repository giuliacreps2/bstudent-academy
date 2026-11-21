import type { ResourceSummary } from "@/types/resourceDetail";

/* =====================================================================
   Missione in corso: risposte del backend (StudentMissionPlayController,
   Blueprint Svolgimento). Nomi e valori come nel backend.
   ===================================================================== */

/** active = in corso, saved = in pausa ("Riprendi"), pending_review = aspetta la docente */
export type MissionAttemptStatus =
  | "active"
  | "saved"
  | "pending_review"
  | "failed"
  | "passed";

export type FailureReason = "below_threshold" | "time_expired" | "abandonment";

export type ExerciseAttemptStatus =
  | "active"
  | "saved"
  | "pending_review"
  | "assessed"
  | "abandoned"
  | "expired"
  | "withdrawn";

export type QuestionKind =
  | "multiple_choice"
  | "fill_in"
  | "sentence_translation"
  | "passage_translation";

export interface MissionStep {
  order: number;
  kind: "lesson" | "exercise";
  title: string;
  status: "done" | "current" | "todo";
}

export interface LessonPage {
  lessonPageId: number;
  sortOrder: number;
  kind: "text" | "image" | "video";
  formattedText: string | null;
  imageReference: string | null;
  videoProvider: "youtube" | "vimeo" | null;
  videoIdentifier: string | null;
}

export interface LessonPlay {
  lessonId: number;
  title: string;
  pages: LessonPage[];
}

/** Risposta: l'opzione scelta (scelta multipla) oppure il testo */
export interface Answer {
  selectedAnswerId: number | null;
  text: string | null;
}

export interface ExerciseView {
  title: string;
  kind: QuestionKind;
  prompt: string;
  sourceText: string | null;
  assessmentMode: "automatic" | "teacher";
  options: { answerId: number; text: string }[] | null;
}

export interface MissionExercisePlay {
  exerciseAttemptId: number;
  missionExerciseId: number;
  status: ExerciseAttemptStatus;
  exercise: ExerciseView;
  answer: Answer | null;
  maxPoints: number;
  allowedMs: number;
  /** Tempo rimasto adesso, deciso dal server */
  remainingMs: number;
  timerRunning: boolean;
}

export interface Lives {
  lives: number;
  baseLives: number;
  rechargeAt: string | null;
}

export interface HintCharges {
  owned: boolean;
  equipped: boolean;
  accessoryName: string | null;
  remaining: number;
  capacity: number;
  rechargeAt: string | null;
}

export interface MissionPlay {
  missionRunId: number;
  missionAttemptId: number;
  attemptNumber: number;
  courseSlug: string;
  missionSlug: string;
  missionTitle: string;
  subjectName: string;
  status: MissionAttemptStatus;
  failureReason: FailureReason | null;
  steps: MissionStep[];
  /** Numero della tappa attuale; null a missione finita */
  currentStep: number | null;
  lesson: LessonPlay | null;
  exercise: MissionExercisePlay | null;
  lives: Lives;
  hint: HintCharges;
}

export interface ExerciseOutcome {
  percentage: number;
  passingThreshold: number;
  passed: boolean;
  feedback: string | null;
  correctAnswers: string[];
  generalExplanation: string | null;
  reviewTopicName: string | null;
  reviewSubjectSlug: string | null;
  reviewResourceSlug: string | null;
  pointsEarned: number | null;
}

export interface CourseResult {
  courseId: number;
  courseTitle: string;
  passedMissions: number;
  totalMissions: number;
  percentage: number;
  completedNow: boolean;
  newStages: number[];
}

export interface MissionPassed {
  percentage: number;
  newRecord: boolean;
  xpEarned: number;
  newStages: number[];
  course: CourseResult | null;
}

export type StepResult =
  | "lesson_read"
  | "passed"
  | "failed"
  | "expired"
  | "pending_review"
  | "withdrawn"
  | "mission_passed";

export interface MissionStepOutcome {
  result: StepResult;
  outcome: ExerciseOutcome | null;
  lifeLost: boolean;
  lives: Lives;
  missionPassed: MissionPassed | null;
  newStages: number[];
  state: MissionPlay;
}

export interface MissionSync {
  status: MissionAttemptStatus;
  remainingMs: number;
}

/** Aiuto del cappello: argomento e "In breve" della Risorsa collegata, mai la risposta */
export interface Hint {
  topicName: string | null;
  summaryText: string | null;
  summaryExample: ResourceSummary["example"] | null;
  alreadyOpened: boolean;
  charges: HintCharges;
}
