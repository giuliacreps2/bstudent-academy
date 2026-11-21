import type { ExerciseView } from "@/types/missionPlay";

/* =====================================================================
   "Consegne da correggere" (Blueprint Svolgimento §4): risposte di
   /admin/academy/submissions (SubmissionController).
   ===================================================================== */

export type ExerciseContext = "mission" | "practice";

export interface SubmissionListItem {
  exerciseAttemptId: number;
  context: ExerciseContext;
  studentUsername: string;
  subjectName: string;
  /** "Palestra" oppure "Missione «titolo» · corso" */
  place: string;
  /** Titolo interno del banco */
  exerciseTitle: string;
  kind: ExerciseView["kind"];
  submittedAt: string;
}

export interface SubmissionAssessment {
  percentage: number;
  passed: boolean;
  feedback: string;
  assessedAt: string;
}

export interface SubmissionDetail {
  exerciseAttemptId: number;
  context: ExerciseContext;
  status: string;
  studentUsername: string;
  subjectName: string;
  place: string;
  missionAttemptNumber: number | null;
  exerciseTitle: string;
  exercise: ExerciseView;
  answer: string | null;
  referenceAnswers: string[];
  generalExplanation: string | null;
  rubric: { category: "structural" | "lexical"; description: string }[];
  maxPoints: number | null;
  passingThreshold: number;
  submittedAt: string | null;
  /** C'è quando la consegna è già corretta: il giudizio è definitivo */
  assessment: SubmissionAssessment | null;
}

/** Riscontro dopo il salvataggio: effect dice in parole semplici che cosa succede allo studente */
export interface SubmissionAssessed {
  exerciseAttemptId: number;
  percentage: number;
  passingThreshold: number;
  passed: boolean;
  feedback: string;
  effect: string;
}

export interface TeacherAssessmentInput {
  percentage: number;
  feedback: string;
}
