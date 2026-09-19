import type { MissionMapData } from "@/types/missions";

export async function getMissionMapData(
  courseSlug: string,
): Promise<MissionMapData> {
  // TODO: sostituire con la fetch reale quando il BE è pronto
  // const res = await fetch(`${process.env.API_URL}/corsi/${courseSlug}/missioni`);
  // if (!res.ok) throw new Error("Impossibile caricare la mappa missioni");
  // return res.json();

  return {
    world: {
      id: "roma-01",
      name: "Roma",
      backgroundDesktop: "/land.png",
      backgroundMobile: "/land.png",
      theme: "roman-city",
    },
    course: {
      slug: courseSlug,
      category: "Corso di Latino",
      title: "Le basi della traduzione",
      quote: "Non per la scuola, ma per la vita impariamo.",
      quoteAuthor: "Seneca",
      backHref: `/corsi/${courseSlug}`,
    },
    dashboardHref: "/my/dashboard",
    skin: {
      code: "SCRIBA",
      name: "Scriba",
      imageUrl: "/placeholder-skin.png",
      bonuses: [
        { label: "Grammatica", value: "+5%" },
        { label: "Traduzione", value: "+3%" },
      ],
    },
    stats: { xp: 640, streak: 4, level: 3, currentXp: 320, maxXp: 500 },
    studentSkills: [
      { label: "Grammatica", current: 72, max: 100 },
      { label: "Traduzione", current: 48, max: 100 },
    ],
    missions: [
      {
        id: "mission-1",
        order: 1,
        title: "Il Verbo e i suoi casi",
        tagline: "Le fondamenta di ogni frase.",
        description:
          "Scopri come il verbo latino organizza il significato della frase e ripassa i casi principali.",
        position: { x: 23, y: 31 },
        status: "completed",
        type: "normal",
        skillRewards: [{ label: "Grammatica", xp: 120, icon: "grammatica" }],
        rewardLabel: "Stilo di Bronzo",
        durationMinutes: 3,
        maxErrors: 2,
        coverImageUrl: "/placeholder-exercise.png",
        href: "/esercizi/grammatica/il-verbo-e-i-suoi-casi",
      },
      {
        id: "mission-2",
        order: 2,
        title: "La Prima Declinazione",
        tagline: "Nomi femminili, radici solide.",
        description:
          "Allenati a riconoscere e declinare i nomi della prima declinazione in tutti i casi.",
        position: { x: 40, y: 42 },
        status: "completed",
        type: "normal",
        skillRewards: [{ label: "Grammatica", xp: 130, icon: "grammatica" }],
        rewardLabel: "Tavoletta di Cera",
        durationMinutes: 4,
        maxErrors: 2,
        coverImageUrl: "/placeholder-exercise.png",
        href: "/esercizi/grammatica/prima-declinazione",
      },
      {
        id: "mission-3",
        order: 3,
        title: "L'Ablativo Assoluto",
        tagline: "La forza delle circostanze.",
        description:
          "Comprendi la struttura e gli usi dell'ablativo assoluto e mettilo in pratica nella traduzione.",
        position: { x: 58, y: 54 },
        status: "current",
        type: "normal",
        skillRewards: [
          { label: "Grammatica", xp: 150, icon: "grammatica" },
          { label: "Traduzione", xp: 200, icon: "traduzione" },
        ],
        rewardLabel: "Elmo di Bronzo",
        durationMinutes: 3,
        maxErrors: 2,
        prepReadingHref: "/risorse/grammatica/ablativo-assoluto",
        prepVideoHref: "/video/ablativo-assoluto",
        coverImageUrl: "/placeholder-exercise.png",
        href: "/esercizi/grammatica/ablativo-assoluto",
      },
      {
        id: "mission-4",
        order: 4,
        title: "Cum + Congiuntivo",
        tagline: "Le sfumature del tempo e della causa.",
        description:
          "Impara a riconoscere e tradurre le proposizioni introdotte da cum con il congiuntivo.",
        position: { x: 72, y: 67 },
        status: "locked",
        type: "normal",
        skillRewards: [
          { label: "Grammatica", xp: 150, icon: "grammatica" },
          { label: "Traduzione", xp: 180, icon: "traduzione" },
        ],
        rewardLabel: "Scudo di Bronzo",
        durationMinutes: 4,
        maxErrors: 2,
        coverImageUrl: "/placeholder-exercise.png",
        href: "/esercizi/grammatica/cum-congiuntivo",
      },
      {
        id: "mission-5",
        order: 5,
        title: "Prova finale del corso",
        tagline: "Metti alla prova tutto ciò che hai imparato.",
        description:
          "Una missione finale che unisce grammatica e traduzione per completare il tuo percorso su questo corso.",
        position: { x: 87, y: 79 },
        status: "locked",
        type: "final",
        skillRewards: [
          { label: "Grammatica", xp: 250, icon: "grammatica" },
          { label: "Traduzione", xp: 300, icon: "traduzione" },
        ],
        rewardLabel: "Corona d'Alloro",
        durationMinutes: 8,
        maxErrors: 3,
        coverImageUrl: "/placeholder-exercise.png",
        href: "/esercizi/prova-finale",
      },
    ],
  };
}
