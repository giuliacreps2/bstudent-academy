import type { SubjectCard, SkillRef } from "@/types/practice";
import type { HintCharges, Lives, MissionStep } from "@/types/missionPlay";

/* =====================================================================
   Corsi e missioni dello studente: risposte del backend
   (StudentCourseController, StudentTestController). Nomi come nel backend.
   ===================================================================== */

export type CourseLevelKey = "beginner" | "intermediate" | "advanced";

export interface CourseCard {
  slug: string;
  subjectSlug: string;
  title: string;
  description: string;
  imageReference: string | null;
  /** Missioni visibili */
  stepsCount: number;
  level: CourseLevelKey | null;
  skillsCount: number;
  /** Percentuale di missioni superate; null = non ancora iniziato */
  progress: number | null;
  featured: boolean;
  popular: boolean;
  premiumLocked: boolean;
  entryCourse: boolean;
}

export interface CoursesPage {
  subjects: SubjectCard[];
  activeSubject: SubjectCard | null;
  courses: CourseCard[];
  recommendedLevel: CourseLevelKey | null;
  hasLevelTest: boolean;
}

export interface CourseRewards {
  totalXp: number;
  firstEvolution: boolean;
}

export interface CourseDetail {
  course: CourseCard;
  subject: SubjectCard;
  tagline: string | null;
  description: string;
  quote: string | null;
  quoteAuthor: string | null;
  skills: SkillRef[];
  rewards: CourseRewards;
}

export interface MissionNode {
  missionId: number;
  slug: string;
  order: number;
  title: string;
  tagline: string | null;
  description: string;
  coverReference: string | null;
  isFinal: boolean;
  status: "completed" | "current" | "locked";
  premiumLocked: boolean;
  durationMinutes: number;
  xp: number;
  learningGoals: string[];
}

export interface MissionMap {
  courseSlug: string;
  courseTitle: string;
  subjectSlug: string;
  subjectName: string;
  worldTheme: string | null;
  quote: string | null;
  quoteAuthor: string | null;
  missions: MissionNode[];
}

export interface SkillReward {
  skillId: number;
  skillName: string;
  maxPoints: number;
}

export interface MissionBriefing {
  guideName: string | null;
  guideImageReference: string | null;
  lines: string[];
  videoProvider: "youtube" | "vimeo" | null;
  videoIdentifier: string | null;
}

export interface MissionPage {
  mission: MissionNode;
  courseSlug: string;
  courseTitle: string;
  passingThreshold: number;
  rewards: { xp: number; skillPoints: SkillReward[] };
  steps: MissionStep[];
  briefing: MissionBriefing;
  lives: Lives;
  hint: HintCharges;
  /** Missione attuale o già completata, accessibile e con almeno una vita */
  canStart: boolean;
  tutorialSeen: boolean;
}

/** "Continua la missione": una per materia */
export interface CurrentMission {
  missionAttemptId: number;
  status: "active" | "saved" | "pending_review" | "failed" | "passed";
  subjectName: string;
  courseSlug: string;
  missionSlug: string;
  missionTitle: string;
}

/** "Ripassa": a tentativo chiuso, l'argomento di ogni aiuto del cappello usato */
export interface HintReviewLink {
  topicName: string;
  subjectSlug: string | null;
  resourceSlug: string | null;
  resourceTitle: string | null;
}

/* ------------------------------------ Test di livello ------------------------------------ */

export interface StudentTest {
  testId: number;
  kind: "course_level" | "exercises";
  title: string;
  questions: { questionId: number; text: string; options: { optionId: number; text: string }[] }[];
}

export interface StudentTestResult {
  kind: "course_level" | "exercises";
  level: CourseLevelKey | null;
  createdAt: string;
}
