import type { DashboardData } from "@/types/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  // TODO: sostituire con la fetch reale quando il BE è pronto
  // const res = await fetch(`${process.env.API_URL}/dashboard`);
  // if (!res.ok) throw new Error("Impossibile caricare i dati della dashboard");
  // return res.json();

  return {
    user: { firstName: "Giulia", gender: "F" },
    hasStartedCourse: false,
    lastCourse: undefined,
    skin: {
      code: "SCRIBA",
      name: "Scriba",
      imageUrl: "/placeholder-skin.png",
      bonuses: [
        { label: "Grammatica", value: "+5%" },
        { label: "Traduzione", value: "+3%" },
        { label: "Lessico", value: "+2%" },
      ],
    },
    stats: { xp: 0, streak: 0, level: 1, currentXp: 0, maxXp: 500 },
    activity: {
      category: "Grammatica",
      title: "Le basi della grammatica latina",
      exerciseCount: 5,
      durationMinutes: 5,
      href: "/esercizi/basi-grammatica-latina",
    },
    skills: [
      { name: "Grammatica", progress: 0, icon: "grammatica" },
      { name: "Lessico", progress: 0, icon: "lessico" },
      { name: "Traduzione", progress: 0, icon: "traduzione" },
    ],
    milestone: { xpNeeded: 500, nextLevel: 2, progress: 0 },
    courses: [
      {
        slug: "basi-traduzione",
        language: "Latino",
        title: "Le basi della traduzione",
        description:
          "Impara le basi per affrontare le versioni di latino con sicurezza.",
        imageUrl: "/placeholder-course.png",
        progress: 0,
      },
      {
        slug: "grammatica-greca",
        language: "Greco",
        title: "Grammatica greca essenziale",
        description:
          "I fondamenti della lingua greca antica, passo dopo passo.",
        imageUrl: "/placeholder-course.png",
        progress: 15,
      },
    ],
    profileCompletion: {
      bonusXp: 40,
      tasks: [
        {
          id: "account",
          label: "Hai creato il tuo account",
          xpReward: 20,
          completed: true,
        },
        {
          id: "obiettivi",
          label: "Hai scelto i tuoi obiettivi",
          xpReward: 20,
          completed: true,
        },
        {
          id: "scuola",
          label: "Aggiungi la tua scuola",
          xpReward: 20,
          completed: false,
        },
        {
          id: "profilo",
          label: "Personalizza il tuo profilo",
          xpReward: 20,
          completed: false,
        },
      ],
    },
    isFirstLogin: false,
    featuredCourses: [
      {
        slug: "grammatica-greca",
        category: "Greco",
        title: "Grammatica greca essenziale",
        subtitle: "Dalle basi all'imperfetto",
        lessonsCount: 18,
        level: "Intermedio",
        rating: 4.7,
        studentsCount: "1.8k",
        imageUrl: "/placeholder-course.png",
      },
      {
        slug: "analisi-logica",
        category: "Italiano",
        title: "Grammatica",
        subtitle: "Tutto sull'analisi logica",
        lessonsCount: 15,
        level: "Base",
        rating: 4.6,
        studentsCount: "1.5k",
        imageUrl: "/placeholder-course.png",
      },
    ],
    recommendedActivity: {
      title: "Ripassa i casi latini",
      reason: "Basato sui tuoi ultimi errori",
      href: "/esercizi/casi-latini",
    },
  };
}
