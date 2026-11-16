import type { SkillKey } from "./skills";
import type { SkinData, StatsData } from "@/types/dashboard";

export interface MissionTreeItemData {
  id: string;
  number: number;
  title: string;
  status: MissionStatus;
  href: string;
}

export interface MissionCourseTree {
  courseName: string;
  missions: MissionTreeItemData[];
}

export interface MissionBonusCounter {
  id: "energy" | "scrolls";
  icon: "bolt" | "scroll";
  value: number;
}

export interface MissionCharacterData {
  name: string;
  avatarUrl: string;
  level: number;
  currentXp: number;
  maxXp: number;
}

export interface MissionObjectiveData {
  description: string;
  timeLimitMinutes: number;
  minScore: number;
  lives: number;
}

export interface MissionRewardXp {
  skill: SkillKey;
  xp: number;
}

export interface MissionRewardsData {
  xpRewards: MissionRewardXp[];
  skinAccessory?: {
    name: string;
    imageUrl: string;
  };
}

export interface MissionLeaderboardData {
  unlocked: boolean;
  unlockHint: string;
}

export type MissionStatus = "completed" | "current" | "locked";
export type MissionType = "normal" | "final";

export interface MissionMapPosition {
  /** Percentuale orizzontale (0-100) rispetto allo scenario */
  x: number;
  /** Percentuale verticale (0-100) rispetto allo scenario */
  y: number;
}

export interface MissionSkillReward {
  label: string; // es. "Grammatica"
  xp: number;
  icon: "grammatica" | "lessico" | "traduzione" | "analisi";
}

/*
 * TODO (blueprint §5.9, deciso il 14/11/2026) — adeguare questi tipi ai dati del backend:
 * - MissionMapNode: aggiungere slug (href = /my/missions/[courseSlug]/[missionSlug], costruito qui) e il
 *   lucchetto premium, distinto da status "locked"; togliere position (posti predefiniti per tema,
 *   occupati in ordine), maxErrors (si mostra la soglia 60%), prepReadingHref/prepVideoHref (sostituiti
 *   dal briefing della guida della materia: 1-5 battute + video facoltativo, saltabile).
 *   type "final" = casella "Prova finale" della missione. durationMinutes = somma dei tempi degli esercizi.
 *   skillRewards: in testa "+N XP" (XP = punti skin), sotto i punti skill per skill. rewardLabel: gamification.
 * - CourseWorld.theme e MissionMapCourse.quote/quoteAuthor arrivano dal corso; backHref e dashboardHref
 *   li costruisce il frontend (oggi /corsi/ è sbagliato).
 * - Pagina della missione: MissionStepData = sequenza vera (lezione/esercizio con titolo pubblico) + traguardo
 *   "Ricompensa"; compatto oltre 7-8 passi. MissionBonusCounter: energy = Vite (+ porta all'attività per
 *   ottenere vite), scrolls = Aiuti del cappello (niente +, tempo alla ricarica); mai acquistabili.
 *   MissionLeaderboardData: fuori MVP, sezione nascosta. Tutorial della prima volta: una sola volta per studente.
 */
export interface MissionMapNode {
  id: string;
  order: number;
  title: string;
  tagline: string; // es. "La forza delle circostanze."
  description: string;
  position: MissionMapPosition;
  status: MissionStatus;
  type: MissionType;
  skillRewards: MissionSkillReward[];
  rewardLabel: string; // es. "Elmo di Bronzo"
  durationMinutes: number;
  maxErrors: number;
  prepReadingHref?: string;
  prepVideoHref?: string;
  /** Breve checklist "Cosa imparerai" mostrata nel pannello di dettaglio */
  objectives?: string[];
  coverImageUrl: string;
  href: string;
}

export interface CourseWorld {
  id: string;
  name: string;
  backgroundDesktop: string;
  backgroundMobile: string;
  theme: "roman-city" | "greek-temple" | "library";
}

export interface MissionMapCourse {
  slug: string;
  category: string;
  title: string;
  quote: string;
  quoteAuthor: string;
  backHref: string;
}

export interface StudentSkillLevel {
  label: string;
  current: number;
  max: number;
}

export interface MissionMapData {
  world: CourseWorld;
  course: MissionMapCourse;
  missions: MissionMapNode[];
  studentSkills: StudentSkillLevel[];
  /** Link al bottone "casa" della navbar — riporta lo studente in dashboard */
  dashboardHref: string;
  /** Skin + XP/streak/livello già usati in dashboard, richiamati nella navbar */
  skin: SkinData;
  stats: StatsData;
}
