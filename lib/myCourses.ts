import type {
  CoursesPageData,
  SubjectData,
  CourseListItem,
  LevelTestSubmission,
  CourseDetailData,
} from "@/types/myCourses";

// TODO: sostituire con la fetch reale quando il BE è pronto
const subjects: SubjectData[] = [
  {
    slug: "latino",
    name: "Latino",
    tagline: "Roma, la lingua di un impero",
    imageUrl: "/latino.png",
    locked: false,
  },
  {
    slug: "greco",
    name: "Greco",
    tagline: "Atene, le radici del pensiero",
    imageUrl: "/Hero.png",
    locked: false,
  },
  {
    slug: "storia",
    name: "Storia",
    tagline: "Presto disponibile",
    imageUrl: "/Hero.png",
    locked: true,
  },
  {
    slug: "filosofia",
    name: "Filosofia",
    tagline: "Presto disponibile",
    imageUrl: "/Hero.png",
    locked: true,
  },
  {
    slug: "italiano",
    name: "Italiano",
    tagline: "Presto disponibile",
    imageUrl: "/Hero.png",
    locked: true,
  },
];

const coursesBySubject: Record<string, CourseListItem[]> = {
  latino: [
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
      progress: 65,
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
  ],
  greco: [
    {
      slug: "grammatica-greca",
      subjectSlug: "greco",
      title: "Grammatica greca essenziale",
      description: "I fondamenti della lingua greca antica, passo dopo passo.",
      imageUrl: "/placeholder-course.png",
      stepsCount: 9,
      level: "Intermedio",
      skillsCount: 5,
      progress: 15,
      href: "/my/courses/grammatica-greca",
    },
  ],
};

export async function getCoursesData(
  activeSlug?: string,
): Promise<CoursesPageData> {
  // TODO: sostituire con la fetch reale quando il BE è pronto
  // const res = await fetch(`${process.env.API_URL}/courses?materia=${activeSlug ?? ""}`);
  // if (!res.ok) throw new Error("Impossibile caricare i corsi");
  // return res.json();

  const unlockedSubjects = subjects.filter((subject) => !subject.locked);
  const activeSubject =
    subjects.find(
      (subject) => subject.slug === activeSlug && !subject.locked,
    ) ??
    unlockedSubjects[0] ??
    subjects[0];

  return {
    subjects,
    activeSubject,
    courses: coursesBySubject[activeSubject.slug] ?? [],
  };
}

export async function saveLevelTestResult(
  submission: LevelTestSubmission,
): Promise<void> {
  /**
   * TODO: collegare all'endpoint reale non appena il backend esporrà
   * lo storico studente (es. POST /student/level-test).
   *
   * await fetch(`${process.env.API_URL}/student/level-test`, {
   *   method: "POST",
   *   body: JSON.stringify(submission),
   * });
   */

  console.log("LEVEL TEST RESULT", submission);
}

export async function getCourseDetailData(
  courseSlug: string,
): Promise<CourseDetailData> {
  const course = Object.values(coursesBySubject)
    .flat()
    .find((item) => item.slug === courseSlug);

  if (!course) {
    throw new Error(`Corso non trovato: ${courseSlug}`);
  }

  const subject =
    subjects.find((item) => item.slug === course.subjectSlug) ?? subjects[0];

  return {
    course,
    subject,

    tagline: "Dalle prime frasi ai testi autentici.",

    description:
      "Un percorso pratico e coinvolgente per imparare a riconoscere le strutture fondamentali, ampliare il tuo vocabolario e tradurre con sicurezza.",

    skillsInvolved: ["traduzione", "grammatica", "lessico", "analisi"],

    studentLevel: {
      level: 12,
      currentXp: 850,
      maxXp: 1200,
    },

    notebook: {
      totalTopics: 6,
      lastDiscovery: {
        topic: "Complemento di causa",
        missionLabel: "Missione 2 · Le prime traduzioni",
      },
      href: `/my/courses/${courseSlug}/taccuino`,
    },

    rewards: [
      {
        id: "skin",
        kind: "skin",
        label: "Skin",
        name: "Studente di Roma",
        imageUrl: "/studente.png",
        locked: false,
      },
      {
        id: "badge",
        kind: "badge",
        label: "Badge",
        name: "Traduttore Novizio",
        imageUrl: "/placeholder-skin.png",
        locked: false,
      },
      {
        id: "background",
        kind: "background",
        label: "Sfondo",
        name: "Foro Romano",
        imageUrl: "/land.png",
        locked: false,
      },
      {
        id: "title",
        kind: "title",
        label: "Titolo",
        name: "Custode delle parole",
        imageUrl: "/placeholder-skin.png",
        locked: false,
      },
      {
        id: "mystery",
        kind: "mystery",
        label: "Qualcosa di speciale ti aspetta...",
        locked: true,
      },
    ],
  };
}
