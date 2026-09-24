import type { CourseListItem } from "@/types/myCourses";
import type { MissionMapPosition } from "@/types/missions";
import type { SkinBonus } from "@/types/dashboard";

/* ============================ HERO ============================ */

export type LandingBadgeIcon = "missions" | "exercises" | "level" | "years";

export interface LandingBadge {
  id: string;
  icon: LandingBadgeIcon;
  label: string;
}

export interface CourseLandingHeroData {
  eyebrow: string; // es. "CORSO DI LATINO"
  titleLead: string; // es. "Impara il Latino,"
  titleHighlight: string; // parte evidenziata con sottolineatura rosa
  description: string;
  imageUrl: string;
  imageAlt: string;
  badges: LandingBadge[];
}

/* ====================== VIDEO ANTEPRIMA ======================= */

export interface CoursePreviewData {
  videoUrl: string;
  posterUrl: string;
}

/* ======================== 5 MISSIONI ========================== */

export type LandingMissionStatus = "open" | "locked";

export interface LandingMission {
  id: string;
  order: number;
  title: string;
  /** Percentuali (0-100) rispetto all'illustrazione */
  position: MissionMapPosition;
  /** "open" = prima tappa, le altre sono bloccate finché non ci si registra */
  status: LandingMissionStatus;
}

export interface CourseLandingMissionsData {
  eyebrow: string; // es. "IL TUO VIAGGIO"
  titleLead: string; // es. "5 missioni per"
  titleHighlight: string; // es. "padroneggiare il Latino."
  description: string;
  ctaLabel: string; // es. "Scopri tutte le missioni"
  imageUrl: string;
  imageAlt: string;
  missions: LandingMission[];
}

/* ========================= CHARACTER ========================== */

export interface LandingCharacter {
  id: string;
  name: string;
  imageUrl: string;
  unlocked: boolean;
  tagline?: string;
  bonuses?: SkinBonus[];
  /** Solo per i personaggi bloccati, es. "Sblocca con 500 XP" */
  unlockHint?: string;
}

export interface CourseLandingCharactersData {
  eyebrow: string;
  title: string;
  description: string;
  characters: LandingCharacter[];
}

/* ============ "STUDIA, METTI IN PRATICA, CONQUISTA" =========== */

export interface CourseLandingJourneyData {
  eyebrow: string;
  titleLead: string; // es. "Studia, metti in pratica,"
  titleHighlight: string; // es. "conquista nuovi traguardi."
  description: string;
  highlights: string[]; // 3 punti brevi accanto al video
  videoUrl: string;
  posterUrl: string;
}

/* ========================= RECENSIONI ========================= */

export interface LandingReview {
  id: string;
  author: string; // es. "Sara M."
  role: string; // es. "4° liceo"
  rating: number; // 1-5
  text: string;
}

/* ============================ FAQ ============================= */

export interface LandingFaq {
  id: string;
  question: string;
  answer: string;
}

/* ========================== CTA FINALE ======================== */

export interface CourseLandingFinalCtaData {
  eyebrow: string;
  title: string; // es. "Inizia il tuo viaggio nel Latino"
  description: string;
  buttonLabel: string; // es. "Inizia gratis"
}

/* ========================== PAGINA ============================ */

export interface CourseLandingData {
  slug: string; // "latino" | "greco" | "italiano" nella v01
  subjectName: string;
  hero: CourseLandingHeroData;
  preview: CoursePreviewData;
  courses: CourseListItem[]; // corsi della materia mostrati nel carosello
  missions: CourseLandingMissionsData;
  characters: CourseLandingCharactersData;
  journey: CourseLandingJourneyData;
  reviews: LandingReview[];
  faqs: LandingFaq[];
  finalCta: CourseLandingFinalCtaData;
}
