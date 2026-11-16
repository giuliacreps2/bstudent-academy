import type { SkillKey } from "./skills";
import type { SkinBonus } from "./dashboard";

/*
 * TODO (blueprint §7.3, deciso il 14/11/2026). "Esercizi" = Palestra nel backend: gli id sono delle
 * voci della Palestra, non degli esercizi del banco; qui non compaiono esercizi né tentativi di missione.
 * - Materia attiva in alto (modificabile, default l'ultima usata): tutto si riferisce a quella materia.
 * - SkillKey fisso → codici dal backend (codice, nome, descrizione); icona e colore restano qui per i
 *   codici noti, aspetto neutro per i nuovi. SkillOption.current/max = punti verso il prossimo livello (gamification).
 * - SkillOption.href → /my/exercises/[skill]: pagina elenco DA DISEGNARE (voci per argomento, stato, punti, lucchetto).
 * - ActivityStatus: aggiungere "in_review" (consegnato alla docente). title = titolo per lo studente.
 * - thumbnail: illustrazione della skill o dell'argomento, non per singola voce.
 * - ExerciseSuggestion.durationMinutes: tempo stimato facoltativo; se manca non si mostra.
 * - Obiettivo di oggi + link "Non sai cosa allenare? Fai il test" (orientamento, §8.1).
 * - DailyChallenge: "supera 3 esercizi oggi" (≥60%), nessun premio per ora: rewardLabel da rivedere.
 * - bonuses (skin) vuoti, character/streak dalla gamification e dalla dashboard.
 */
export interface SkillOption {
  id: SkillKey;
  description: string;
  current: number;
  max: number;
  href: string;
}

export type ActivityStatus = "completed" | "in_progress" | "retry";

export interface ActivityData {
  id: string;
  title: string;
  thumbnail: string;
  skill: SkillKey;
  status: ActivityStatus;
  date: string;
  score: { current: number; max: number };
  href: string;
}

export interface ExerciseSuggestion {
  id: string;
  title: string;
  skill: SkillKey;
  durationMinutes: number;
  thumbnail: string;
  href: string;
}

export interface DailyChallengeData {
  completedSteps: number;
  totalSteps: number;
  rewardLabel: string;
  href: string;
}

export interface CharacterData {
  name: string;
  avatarUrl: string;
  level: number;
  currentXp: number;
  maxXp: number;
  quote: string;
  minXpToCustomize: number;
}

export interface ExercisesPageData {
  hero: HeroData;
  skills: SkillOption[];
  resumeActivities: ActivityData[];
  dailyChallenge: DailyChallengeData;
  character: CharacterData;
  streak: number;
  bonuses: SkinBonus[];
}

export interface HeroData {
  imageUrl: string;
  quote: string;
  quoteAuthor: string;
}
