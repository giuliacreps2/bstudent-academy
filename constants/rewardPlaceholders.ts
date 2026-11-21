import type { SkinData } from "@/types/dashboard";
import type { CourseRewardItem } from "@/types/myCourses";

/*
 * TODO (DECISIONE IN SOSPESO, Gamification §6.3–6.4, ripresa da Giulia il 21/11/2026):
 * bonus del personaggio, badge, sfondi, titoli, ricompensa misteriosa e oggetti come l'"Elmo di Bronzo"
 * non esistono nel backend. Finché Giulia non decide, le pagine collegate ai dati veri li mostrano
 * com'erano nei dati d'esempio, tutti da questo file: quando decide si cambia solo qui.
 */

/** Ricompense della pagina del corso, accanto agli XP veri */
export const COURSE_REWARDS_PLACEHOLDER: CourseRewardItem[] = [
  { id: "skin", kind: "skin", label: "Skin", name: "Studente di Roma", imageUrl: "/studente.png", locked: false },
  { id: "badge", kind: "badge", label: "Badge", name: "Traduttore Novizio", imageUrl: "/studente.png", locked: false },
  { id: "background", kind: "background", label: "Sfondo", name: "Foro Romano", imageUrl: "/land.png", locked: false },
  { id: "title", kind: "title", label: "Titolo", name: "Custode delle parole", imageUrl: "/studente.png", locked: false },
  { id: "mystery", kind: "mystery", label: "Qualcosa di speciale ti aspetta...", locked: true },
];

/** Oggetto ricompensa della missione (casella "Ricompensa" della mappa) */
export const MISSION_REWARD_LABEL_PLACEHOLDER = "Elmo di Bronzo";

/**
 * Personaggio della barra della mappa. TODO (gamification): nome e immagine dal personaggio scelto
 * (GET /student/game/character) quando esistono i personaggi nel database; i bonus restano in sospeso
 */
export const SKIN_PLACEHOLDER: SkinData = {
  code: "SCRIBA",
  name: "Scriba",
  imageUrl: "/studente.png",
  bonuses: [
    { label: "Grammatica", value: "+5%" },
    { label: "Traduzione", value: "+3%" },
  ],
};
