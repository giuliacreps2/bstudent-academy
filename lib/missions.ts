import type { MissionPageData } from "@/types/missions";

export async function getMissionData(): Promise<MissionPageData> {
  // TODO: sostituire con la fetch reale quando il BE è pronto
  // const res = await fetch(`${process.env.API_URL}/missions/${slug}`);
  // if (!res.ok) throw new Error("Impossibile caricare la missione");
  // return res.json();

  return {
    breadcrumb: [
      { label: "I miei corsi", href: "/my/courses" },
      { label: "Latino Base", href: "/corsi/latino-base" },
      { label: "Missione 2" },
    ],
    bonuses: [
      { id: "energy", icon: "bolt", value: 5 },
      { id: "scrolls", icon: "scroll", value: 2 },
    ],
    character: {
      name: "Studente di Roma",
      avatarUrl: "/studente.png",
      level: 2,
      currentXp: 320,
      maxXp: 500,
    },
    hero: {
      imageUrl: "/studente.png",
      missionNumber: 2,
      title: "Nomi e genere",
      description:
        "Nella città di Roma si è diffusa una strana confusione: i nomi hanno perso il loro genere! Aiuta il senatore Lucio a rimettere ordine nelle iscrizioni del Foro.",
    },
    objective: {
      description:
        "Riconosci il genere dei nomi, impara a identificarli e usali correttamente nelle frasi.",
      timeLimitMinutes: 10,
      minScore: 800,
      lives: 3,
    },
    skills: ["grammatica", "lessico"],
    rewards: {
      xpRewards: [
        { skill: "grammatica", xp: 150 },
        { skill: "lessico", xp: 100 },
      ],
      skinAccessory: {
        name: "Spilla senatoriale",
        imageUrl: "/placeholder-skin.png",
      },
    },
    leaderboard: {
      unlocked: false,
      unlockHint:
        "Completa la missione per entrare in classifica e sfidare altri studenti!",
    },
    steps: [
      { id: "briefing", label: "Briefing", status: "current" },
      { id: "sfide", label: "Sfide", status: "upcoming" },
      { id: "prova-finale", label: "Prova finale", status: "upcoming" },
      { id: "ricompensa", label: "Ricompensa", status: "upcoming" },
    ],
    courseTree: {
      courseName: "Latino Base",
      missions: [
        {
          id: "1",
          number: 1,
          title: "Alle origini della lingua",
          status: "completed",
          href: "/missioni/latino-base/1",
        },
        {
          id: "2",
          number: 2,
          title: "Nomi e genere",
          status: "active",
          href: "/missioni/latino-base/2",
        },
        {
          id: "3",
          number: 3,
          title: "La prima declinazione",
          status: "locked",
          href: "/missioni/latino-base/3",
        },
        {
          id: "4",
          number: 4,
          title: "Gli aggettivi",
          status: "locked",
          href: "/missioni/latino-base/4",
        },
        {
          id: "5",
          number: 5,
          title: "Il presente indicativo",
          status: "locked",
          href: "/missioni/latino-base/5",
        },
      ],
    },
    startHref: "/missioni/latino-base/2/play",
  };
}
