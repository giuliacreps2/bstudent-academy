import type { ExerciseOutcome, ExerciseView } from "@/types/missionPlay";
import type { PracticeItem, SkillLevelState } from "@/types/practice";
import type { CourseLevelKey } from "@/types/courses";

/* =====================================================================
   "I miei progressi" (blueprint §10.5): risposte di /student/progress/**.
   ===================================================================== */

export interface EvolutionProgress {
  currentStage: number;
  totalXp: number;
  bestAverageLevel: number;
  /** null dopo l'ultimo stadio */
  nextStage: number | null;
  nextRequiresFirstCourse: boolean;
  nextMinXp: number | null;
  xpMissing: number | null;
  nextMinAverageLevel: number | null;
  averageLevelReached: boolean;
}

export interface CharacterInfo {
  characterId: number;
  code: string;
  name: string;
  motto: string | null;
  stageNumber: number;
  stageName: string;
  imageReference: string | null;
}

export interface NearAccessory {
  accessoryId: number;
  code: string;
  name: string;
  status: "locked" | "redeemable" | "owned" | "equipped";
  skillName: string | null;
  requiredPoints: number | null;
  currentPoints: number | null;
  unlockHint: string | null;
}

export interface Growth {
  evolution: EvolutionProgress;
  character: CharacterInfo | null;
  subjects: { subjectSlug: string; subjectName: string; levels: SkillLevelState[] }[];
  nearAccessories: NearAccessory[];
}

export interface CourseProgress {
  courseSlug: string;
  courseTitle: string;
  passedMissions: number;
  totalMissions: number;
  percentage: number | null;
  completed: boolean;
}

export interface PracticeProgress {
  items: { item: PracticeItem; bestPercentage: number | null; assessedAttempts: number; lastAssessedAttemptId: number | null }[];
  inReview: PracticeItem[];
}

export interface AttemptHistoryItem {
  exerciseAttemptId: number;
  context: "mission" | "practice";
  title: string;
  place: string;
  subjectName: string | null;
  date: string;
  /** assessed = con esito, pending_review = in correzione, expired = tempo finito */
  status: "assessed" | "pending_review" | "expired";
  percentage: number | null;
  /** Voto in decimi al mezzo punto (§10.2) */
  grade: number | null;
  passed: boolean | null;
  teacher: boolean;
}

export interface HistoryPage {
  content: AttemptHistoryItem[];
  page: { size: number; number: number; totalElements: number; totalPages: number };
}

export interface AttemptDetail {
  attempt: AttemptHistoryItem;
  exercise: ExerciseView;
  answer: string | null;
  outcome: ExerciseOutcome | null;
}

export interface TestResult {
  kind: "course_level" | "exercises";
  level: CourseLevelKey | null;
  recommended: PracticeItem[];
  createdAt: string;
}

export interface WeakPoints {
  weakestSkill: SkillLevelState | null;
  topics: {
    topicId: number;
    topicName: string;
    exercisesToReview: number;
    subjectSlug: string;
    resourceSlug: string | null;
    resourceTitle: string | null;
  }[];
  lastLevelTest: TestResult | null;
  lastOrientationTest: TestResult | null;
}

/** Tempo di studio (blueprint §10.5): solo giorni con attività, minuti */
export interface StudyTime {
  days: number;
  totalMinutes: number;
  theoryMinutes: number;
  exerciseMinutes: number;
  activeDays: number;
  averageMinutesPerActiveDay: number;
  byDay: { date: string; theoryMinutes: number; exerciseMinutes: number }[];
}

export type HistoryContext = "all" | "mission" | "practice";
export type HistoryOutcome = "all" | "passed" | "failed";
