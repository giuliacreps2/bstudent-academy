import type { SkillColor, SkillKey } from "@/types/skills";
import type { Answer, ExerciseOutcome, ExerciseView, Lives } from "@/types/missionPlay";

/* =====================================================================
   Palestra ("Esercizi", blueprint §7.3): risposte del backend
   (StudentPracticeController, StudentPracticeAttemptController).
   ===================================================================== */

export interface SubjectCard {
  slug: string;
  name: string;
  tagline: string | null;
  imageReference: string | null;
  locked: boolean;
}

/** Skill come la mostra il frontend: icona e colore da un elenco fisso (lib/admin SKILL_ICONS / SKILL_COLORS) */
export interface SkillRef {
  skillId: number;
  code: string;
  name: string;
  description: string | null;
  icon: SkillKey | string | null;
  color: SkillColor | string | null;
}

/** Livello dello studente in una skill (Blueprint Gamification §2) */
export interface SkillLevelState {
  skillId: number;
  code: string;
  name: string;
  icon: string | null;
  color: string | null;
  points: number;
  level: number;
  maxLevel: boolean;
  progressPercent: number;
  pointsToNextLevel: number | null;
}

export interface PracticeSkill {
  skill: SkillRef;
  level: SkillLevelState;
  itemsCount: number;
}

export interface PracticeLock {
  practiceExerciseId: number;
  difficulty: number;
  locked: boolean;
  unlockLevel: number | null;
  /** "Si sblocca al livello N di [skill]"; null se la voce è aperta */
  message: string | null;
}

/** new = mai svolta, completed = superata, saved = bozza, retry = sotto il 60%, in_review = alla docente */
export type PracticeItemStatus = "new" | "completed" | "saved" | "retry" | "in_review";

export interface PracticeItem {
  practiceExerciseId: number;
  title: string;
  skillCode: string;
  topicId: number | null;
  topicName: string | null;
  imageReference: string | null;
  estimatedMinutes: number | null;
  maxPoints: number;
  points: number;
  status: PracticeItemStatus;
  difficulty: number;
  lock: PracticeLock | null;
  premiumLocked: boolean;
  lastActivityAt: string | null;
}

export interface PracticeTopicGroup {
  topicId: number | null;
  topicName: string | null;
  imageReference: string | null;
  /** Classe di riferimento (anno di scuola superiore); null = per tutti */
  referenceYear: number | null;
  items: PracticeItem[];
}

export interface PracticeList {
  skill: SkillRef;
  level: SkillLevelState;
  topics: PracticeTopicGroup[];
}

export interface DailyChallenge {
  passedToday: number;
  target: number;
  completed: boolean;
  lifeAwarded: boolean;
}

export interface PauseSuggestion {
  message: string;
  topicName: string | null;
  subjectSlug: string | null;
  resourceSlug: string | null;
  resourceTitle: string | null;
}

export interface PracticeRunState {
  passedInARow: number;
  streakForLife: number;
  pause: PauseSuggestion | null;
}

export interface Streak {
  current: number;
  record: number;
}

export interface ExercisesPage {
  subjects: SubjectCard[];
  activeSubject: SubjectCard | null;
  skills: PracticeSkill[];
  resumeActivities: PracticeItem[];
  dailyChallenge: DailyChallenge;
  practiceRun: PracticeRunState;
  streak: Streak;
}

/* ------------------------------------ Tentativo ------------------------------------ */

export interface PracticeRewards {
  streakLifeAwarded: boolean;
  dailyChallengeLifeAwarded: boolean;
  dailyChallenge: DailyChallenge | null;
  run: PracticeRunState | null;
  lives: Lives | null;
}

export interface PracticeOutcome extends ExerciseOutcome {
  rewards: PracticeRewards | null;
}

/** active = in corso, saved = bozza, pending_review = in correzione, assessed = con esito */
export interface PracticeAttempt {
  exerciseAttemptId: number;
  practiceExerciseId: number;
  status: "active" | "saved" | "pending_review" | "assessed" | "abandoned" | "expired" | "withdrawn";
  exercise: ExerciseView;
  answer: Answer | null;
  outcome: PracticeOutcome | null;
}
