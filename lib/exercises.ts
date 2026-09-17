import type { ExercisesPageData } from "@/types/exercises";

export async function getExercisesData(): Promise<ExercisesPageData> {
  // TODO: sostituire con la fetch reale quando il BE è pronto
  // const res = await fetch(`${process.env.API_URL}/exercises`);
  // if (!res.ok) throw new Error("Impossibile caricare i dati della pagina esercizi");
  // return res.json();

  return {
    skills: [
      {
        id: "grammatica",
        description: "Casi, coniugazioni e molto altro.",
        current: 70,
        max: 100,
        href: "/esercizi/grammatica",
      },
      {
        id: "lessico",
        description: "Amplia il tuo vocabolario.",
        current: 45,
        max: 100,
        href: "/esercizi/lessico",
      },
      {
        id: "analisi",
        description: "Riconosci le strutture e analizza le frasi.",
        current: 30,
        max: 100,
        href: "/esercizi/analisi",
      },
      {
        id: "traduzione",
        description: "Metti alla prova le tue competenze.",
        current: 20,
        max: 100,
        href: "/esercizi/traduzione",
      },
    ],
    exercisePool: [
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
    ],
    resumeActivities: [
      {
        id: "1",
        title: "I casi: nominativo e accusativo",
        thumbnail: "/placeholder-exercise.png",
        skill: "grammatica",
        status: "completed",
        date: "12 set 2025",
        score: { current: 10, max: 10 },
        href: "/esercizi/grammatica/casi-nominativo-accusativo",
      },
      {
        id: "2",
        title: "Il verbo sum al presente",
        thumbnail: "/placeholder-exercise.png",
        skill: "lessico",
        status: "in_progress",
        date: "10 set 2025",
        score: { current: 6, max: 10 },
        href: "/esercizi/lessico/verbo-sum-presente",
      },
      {
        id: "3",
        title: "Aggettivi della prima classe",
        thumbnail: "/placeholder-exercise.png",
        skill: "analisi",
        status: "retry",
        date: "9 set 2025",
        score: { current: 4, max: 10 },
        href: "/esercizi/analisi/aggettivi-prima-classe",
      },
    ],
    dailyChallenge: {
      completedSteps: 1,
      totalSteps: 3,
      rewardLabel: "esercizi completati",
      href: "/esercizi/sfida-giornaliera",
    },
    character: {
      name: "Studente di Roma",
      avatarUrl: "/studente.png",
      level: 2,
      currentXp: 320,
      maxXp: 500,
      quote: "Ogni errore è un passo in più verso il successo.",
      minXpToCustomize: 500,
    },
    streak: 0,
    bonuses: [],
  };
}
