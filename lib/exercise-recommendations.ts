"use server";

import type { GoalSelection } from "@/types/skills";
import type { ExerciseSuggestion } from "@/types/exercises";

// TODO: sostituire con la query reale (filtro per skill sulla tabella esercizi)
const exercisePool: ExerciseSuggestion[] = [
  {
    id: "1",
    title: "I casi: nominativo e accusativo",
    skill: "grammatica",
    durationMinutes: 5,
    thumbnail: "/placeholder-exercise.png",
    href: "/esercizi/grammatica/casi-nominativo-accusativo",
  },
  {
    id: "2",
    title: "Il verbo sum al presente",
    skill: "lessico",
    durationMinutes: 4,
    thumbnail: "/placeholder-exercise.png",
    href: "/esercizi/lessico/verbo-sum-presente",
  },
  {
    id: "3",
    title: "Aggettivi della prima classe",
    skill: "analisi",
    durationMinutes: 6,
    thumbnail: "/placeholder-exercise.png",
    href: "/esercizi/analisi/aggettivi-prima-classe",
  },
  {
    id: "4",
    title: "Traduzione guidata: Cesare",
    skill: "traduzione",
    durationMinutes: 8,
    thumbnail: "/placeholder-exercise.png",
    href: "/esercizi/traduzione/cesare-guidata",
  },
  {
    id: "5",
    title: "Il congiuntivo presente",
    skill: "grammatica",
    durationMinutes: 5,
    thumbnail: "/placeholder-exercise.png",
    href: "/esercizi/grammatica/congiuntivo-presente",
  },
  {
    id: "6",
    title: "Vocabolario: la famiglia",
    skill: "lessico",
    durationMinutes: 4,
    thumbnail: "/placeholder-exercise.png",
    href: "/esercizi/lessico/vocabolario-famiglia",
  },
];

export async function getRecommendedExercises(
  goal: GoalSelection,
): Promise<ExerciseSuggestion[]> {
  if (goal === "mix") return exercisePool.slice(0, 3);

  const matching = exercisePool.filter((e) => e.skill === goal);
  if (matching.length >= 3) return matching.slice(0, 3);

  const fallback = exercisePool.filter((e) => e.skill !== goal);
  return [...matching, ...fallback].slice(0, 3);
}
