import type {
  CourseLandingData,
  CourseLandingCharactersData,
  LandingBadge,
  LandingFaq,
  LandingMission,
  LandingReview,
} from "@/types/courseLanding";
import type { CourseListItem } from "@/types/myCourses";

/* =====================================================================
   CONTENUTI CONDIVISI TRA LE MATERIE (v01)
   ===================================================================== */

const badges: LandingBadge[] = [
  { id: "missions", icon: "missions", label: "5 missioni" },
  { id: "exercises", icon: "exercises", label: "20 esercizi" },
  { id: "level", icon: "level", label: "Dal base all'avanzato" },
  { id: "years", icon: "years", label: "Per tutti e 5 gli anni" },
];

// TODO: sostituire con video/poster reali
const previewVideo = {
  videoUrl: "/demo-video.mp4",
  posterUrl: "/demo-poster.png",
};

// Posizioni dei 5 nodi sull'illustrazione (percentuali)
const missionPositions = [
  { x: 11, y: 60 },
  { x: 28, y: 56 },
  { x: 48, y: 51 },
  { x: 66, y: 43 },
  { x: 84, y: 47 },
];

function buildMissions(titles: string[]): LandingMission[] {
  return titles.map<LandingMission>((title, index) => ({
    id: `mission-${index + 1}`,
    order: index + 1,
    title,
    position: missionPositions[index],
    status: index === 0 ? "open" : "locked",
  }));
}

const characters: CourseLandingCharactersData = {
  eyebrow: "IL TUO PERSONAGGIO",
  title: "Scegli chi ti accompagna nel viaggio.",
  description:
    "Ogni personaggio cresce con te: sali di livello, sblocca nuove skin e bonus.",
  characters: [
    {
      id: "studente",
      name: "Studente",
      imageUrl: "/studente.png",
      unlocked: true,
      tagline: "Curioso e costante.",
    },
    {
      id: "studentessa",
      name: "Studentessa",
      imageUrl: "/studentessa.png",
      unlocked: true,
      tagline: "Precisa e determinata.",
    },
    {
      id: "stratega",
      name: "Stratega",
      imageUrl: "/avatars/avatar-3.png",
      unlocked: false,
      tagline: "Una skin speciale con bonus sulle skill.",
      bonuses: [
        { label: "Traduzione", value: "+8%" },
        { label: "Analisi", value: "+5%" },
        { label: "Metodo di studio", value: "+7%" },
      ],
      unlockHint: "Sblocca con 500 XP",
    },
  ],
};

// TODO: PLACEHOLDER. Sostituire con recensioni reali prima della pubblicazione.
const reviews: LandingReview[] = [
  {
    id: "r1",
    author: "Sara M.",
    role: "4° liceo",
    rating: 5,
    text: "Le missioni rendono lo studio meno pesante: faccio un pezzo alla volta e vedo subito i miei progressi.",
  },
  {
    id: "r2",
    author: "Luca B.",
    role: "3° liceo",
    rating: 5,
    text: "Il feedback dopo ogni esercizio mi fa capire dove sbaglio, senza dover aspettare la verifica.",
  },
  {
    id: "r3",
    author: "Giorgia T.",
    role: "2° liceo",
    rating: 4,
    text: "Mi piace guadagnare XP e sbloccare le tappe: mi viene voglia di fare ancora un esercizio.",
  },
  {
    id: "r4",
    author: "Matteo R.",
    role: "5° liceo",
    rating: 5,
    text: "Ottimo per ripassare prima dell'interrogazione: le spiegazioni sono chiare e brevi.",
  },
];

// TODO: contenuti da rivedere (prezzo, età, regole del percorso)
const faqs: LandingFaq[] = [
  {
    id: "faq-gratis",
    question: "Posso iniziare gratis?",
    answer:
      "Sì, puoi iniziare gratuitamente: crei il tuo account e parti dalla prima missione del corso.",
  },
  {
    id: "faq-eta",
    question: "Serve avere un'età minima?",
    answer:
      "Il percorso è pensato per studenti delle superiori. Se hai meno di 14 anni, durante la registrazione ti chiediamo l'email di un genitore o tutore.",
  },
  {
    id: "faq-missioni",
    question: "Come funzionano missioni e XP?",
    answer:
      "Ogni missione è una tappa del corso con lezioni ed esercizi. Completandola guadagni XP, sali di livello e sblocchi la tappa successiva.",
  },
  {
    id: "faq-livello",
    question: "Devo già conoscere la materia?",
    answer:
      "No. Il corso parte dalle basi e arriva ai livelli più avanzati, ed è adatto a tutti e 5 gli anni delle superiori.",
  },
  {
    id: "faq-materie",
    question: "Quali materie posso studiare?",
    answer:
      "Al momento puoi studiare Latino, Greco e Italiano. Ogni materia ha il suo percorso di missioni.",
  },
];

/* =====================================================================
   CONTENUTI PER MATERIA
   ===================================================================== */

// TODO: sostituire con la fetch reale quando il BE è pronto.
// Nel carosello pubblico `progress` e `href` non vengono usati.
const latinoCourses: CourseListItem[] = [
  {
    slug: "basi-traduzione",
    subjectSlug: "latino",
    title: "Le basi della traduzione",
    description:
      "Impara a riconoscere le strutture fondamentali e a tradurre con sicurezza i primi testi.",
    imageUrl: "/placeholder-course.png",
    stepsCount: 8,
    level: "Principiante",
    skillsCount: 4,
    isPopular: true,
    href: "/my/courses/basi-traduzione",
  },
  {
    slug: "periodo-latino",
    subjectSlug: "latino",
    title: "Il periodo latino",
    description:
      "Dalle frasi semplici alle strutture complesse. Scopri come analizzare e tradurre periodi completi.",
    imageUrl: "/placeholder-course.png",
    stepsCount: 10,
    level: "Intermedio",
    skillsCount: 5,
    href: "/my/courses/periodo-latino",
  },
  {
    slug: "grammatica-essenziale",
    subjectSlug: "latino",
    title: "La grammatica essenziale",
    description:
      "Tutto ciò che ti serve per orientarti nella morfologia e nella sintassi latina.",
    imageUrl: "/placeholder-course.png",
    stepsCount: 6,
    level: "Principiante",
    skillsCount: 4,
    href: "/my/courses/grammatica-essenziale",
  },
  {
    slug: "autori-e-testi",
    subjectSlug: "latino",
    title: "Autori e testi",
    description:
      "Leggi, analizza e traduci brani di autori latini, da Cesare a Cicerone.",
    imageUrl: "/placeholder-course.png",
    stepsCount: 8,
    level: "Avanzato",
    skillsCount: 5,
    href: "/my/courses/autori-e-testi",
  },
];

const grecoCourses: CourseListItem[] = [
  {
    slug: "grammatica-greca",
    subjectSlug: "greco",
    title: "Grammatica greca essenziale",
    description: "I fondamenti della lingua greca antica, passo dopo passo.",
    imageUrl: "/placeholder-course.png",
    stepsCount: 9,
    level: "Intermedio",
    skillsCount: 5,
    href: "/my/courses/grammatica-greca",
  },
];

// Placeholder: i corsi di italiano non esistono ancora nel mock
const italianoCourses: CourseListItem[] = [
  {
    slug: "analisi-logica",
    subjectSlug: "italiano",
    title: "Tutto sull'analisi logica",
    description: "Riconosci soggetto, predicato e complementi senza errori.",
    imageUrl: "/placeholder-course.png",
    stepsCount: 6,
    level: "Principiante",
    skillsCount: 3,
    href: "/my/courses/analisi-logica",
  },
  {
    slug: "comprensione-testo",
    subjectSlug: "italiano",
    title: "Comprensione del testo",
    description: "Leggi, capisci e rispondi con metodo a qualsiasi brano.",
    imageUrl: "/placeholder-course.png",
    stepsCount: 6,
    level: "Intermedio",
    skillsCount: 3,
    href: "/my/courses/comprensione-testo",
  },
];

interface SubjectConfig {
  slug: string;
  subjectName: string; // "Latino"
  withArticle: string; // "il Latino"
  eyebrowLabel: string; // "CORSO DI LATINO"
  heroLead: string; // "Impara il Latino,"
  heroDescription: string;
  courses: CourseListItem[];
  missionTitles: string[]; // esattamente 5
}

function buildLanding(config: SubjectConfig): CourseLandingData {
  const { slug, subjectName, withArticle } = config;

  return {
    slug,
    subjectName,
    hero: {
      eyebrow: config.eyebrowLabel,
      titleLead: config.heroLead,
      titleHighlight: "una missione alla volta.",
      description: config.heroDescription,
      imageUrl: "/Hero-BStudent.png", // placeholder
      imageAlt: `Studenti che imparano ${withArticle} con BStudent`,
      badges,
    },
    preview: previewVideo,
    courses: config.courses,
    missions: {
      eyebrow: "IL TUO VIAGGIO",
      titleLead: "5 missioni per",
      titleHighlight: `padroneggiare ${withArticle}.`,
      description:
        "Ogni missione ti porta più lontano: nuovi concetti, esercizi, sfide e ricompense. Scopri le prime tappe del tuo percorso.",
      ctaLabel: "Scopri tutte le missioni",
      imageUrl: "/land.png", // placeholder
      imageAlt: `Mappa delle missioni del corso di ${subjectName}`,
      missions: buildMissions(config.missionTitles),
    },
    characters,
    journey: {
      eyebrow: "COME SI STUDIA",
      titleLead: "Studia, metti in pratica,",
      titleHighlight: "conquista nuovi traguardi.",
      description:
        "Ogni lezione si trasforma in esercizi e ogni esercizio in progressi concreti, che puoi vedere a ogni missione.",
      highlights: [
        "Lezioni brevi e chiare",
        "Esercizi con feedback immediato",
        "XP, livelli e ricompense",
      ],
      ...previewVideo, // TODO: video dedicato
    },
    reviews,
    faqs,
    finalCta: {
      eyebrow: "PRONTO A PARTIRE?",
      title: `Inizia il tuo viaggio nel ${subjectName}`,
      description: `Impara, allenati e cresci con BStudent. Il tuo percorso in ${subjectName} comincia qui.`,
      buttonLabel: "Inizia gratis",
    },
  };
}

// Nella v01 le materie disponibili sono solo latino, greco e italiano.
const landings: Record<string, CourseLandingData> = {
  latino: buildLanding({
    slug: "latino",
    subjectName: "Latino",
    withArticle: "il Latino",
    eyebrowLabel: "CORSO DI LATINO",
    heroLead: "Impara il Latino,",
    heroDescription:
      "Lezioni, esercizi e sfide per affrontare declinazioni, verbi e prime traduzioni con sicurezza. A ogni tappa guadagni XP e sblocchi nuovi traguardi.",
    courses: latinoCourses,
    missionTitles: [
      "Le origini del latino",
      "Le prime parole",
      "Nomi e declinazioni",
      "Verbi al presente",
      "La tua prima traduzione",
    ],
  }),
  greco: buildLanding({
    slug: "greco",
    subjectName: "Greco",
    withArticle: "il Greco",
    eyebrowLabel: "CORSO DI GRECO",
    heroLead: "Scopri il Greco,",
    heroDescription:
      "Dall'alfabeto ai primi testi: un percorso guidato per leggere, capire e tradurre il greco antico passo dopo passo.",
    courses: grecoCourses,
    // TODO: titoli placeholder
    missionTitles: [
      "L'alfabeto greco",
      "Le prime parole",
      "Nomi e declinazioni",
      "Verbi al presente",
      "La tua prima traduzione",
    ],
  }),
  italiano: buildLanding({
    slug: "italiano",
    subjectName: "Italiano",
    withArticle: "l'Italiano",
    eyebrowLabel: "CORSO DI ITALIANO",
    heroLead: "Padroneggia l'Italiano,",
    heroDescription:
      "Grammatica, analisi logica e comprensione del testo con esercizi mirati e feedback immediato, per studiare con meno fatica.",
    courses: italianoCourses,
    // TODO: titoli placeholder
    missionTitles: [
      "Le parti del discorso",
      "Soggetto e predicato",
      "I complementi",
      "La frase complessa",
      "Il tuo primo testo",
    ],
  }),
};

export const landingSlugs = Object.keys(landings);

export async function getCourseLandingData(
  slug: string,
): Promise<CourseLandingData | null> {
  // TODO: sostituire con la fetch reale quando il BE è pronto
  // const res = await fetch(`${process.env.API_URL}/courses/${slug}/landing`);
  // if (res.status === 404) return null;
  // if (!res.ok) throw new Error("Impossibile caricare la landing del corso");
  // return res.json();

  return landings[slug] ?? null;
}
