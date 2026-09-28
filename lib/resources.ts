import { resourceCategoryOrder } from "@/constants/resources";
import type {
  FeaturedResource,
  PopularResource,
  ResourceCategoryCard,
  ResourceSubjectContent,
  ResourceSubjectKey,
  ResourcesHubData,
} from "@/types/resources";

/* =====================================================================
   CONTENUTI PER MATERIA (mock)
   TODO: sostituire con la fetch reale quando il BE è pronto
   const res = await fetch(`${process.env.API_URL}/risorse`);
   if (!res.ok) throw new Error("Impossibile caricare le risorse");
   return res.json();
   ===================================================================== */

const categoryDescriptions: Record<
  ResourceSubjectKey,
  Record<(typeof resourceCategoryOrder)[number], string>
> = {
  latino: {
    grammatica: "Declinazioni, pronomi, aggettivi, concordanze, sintassi...",
    verbi: "Coniugazioni, paradigmi, verbi irregolari, modi e tempi...",
    traduzione: "Metodo, costruzioni, riconoscimento della frase...",
    vocabolario: "Parole frequenti, espressioni, campi semantici...",
  },
  // TODO: descrizioni placeholder
  greco: {
    grammatica: "Alfabeto, articolo, declinazioni, aggettivi, sintassi...",
    verbi: "Coniugazioni, temi verbali, verbi in -μι, modi e tempi...",
    traduzione: "Metodo, costruzioni, riconoscimento della frase...",
    vocabolario: "Parole frequenti, espressioni, campi semantici...",
  },
};

function buildCategories(subject: ResourceSubjectKey): ResourceCategoryCard[] {
  return resourceCategoryOrder.map((category) => ({
    category,
    description: categoryDescriptions[subject][category],
    href: `/resources/categoria/${category}?materia=${subject}`,
  }));
}

const latinoPopular: PopularResource[] = [
  {
    id: "declinazioni-latino",
    title: "Declinazioni",
    description: "Tabelle complete",
    icon: "declinazioni",
    href: "/resources/latino/declinazioni",
  },
  {
    id: "verbi-latino",
    title: "Verbi",
    description: "Coniugazioni e paradigmi",
    icon: "verbi",
    href: "/resources/latino/verbi",
  },
  {
    id: "complementi-latino",
    title: "Complementi",
    description: "Schemi ed esempi",
    icon: "complementi",
    href: "/resources/latino/complementi",
  },
  {
    id: "pronomi-latino",
    title: "Pronomi",
    description: "Forme e utilizzi",
    icon: "pronomi",
    href: "/resources/latino/pronomi",
  },
  {
    id: "vocabolario-latino",
    title: "Vocabolario",
    description: "Parole frequenti",
    icon: "vocabolario",
    href: "/resources/latino/vocabolario",
  },
];

// TODO: contenuti placeholder per il Greco
const grecoPopular: PopularResource[] = [
  {
    id: "alfabeto-greco",
    title: "Alfabeto",
    description: "Lettere, spiriti e accenti",
    icon: "alfabeto",
    href: "/resources/greco/alfabeto",
  },
  {
    id: "articolo-greco",
    title: "Articolo",
    description: "Tutte le forme",
    icon: "articolo",
    href: "/resources/greco/articolo",
  },
  {
    id: "declinazioni-greco",
    title: "Declinazioni",
    description: "Tabelle complete",
    icon: "declinazioni",
    href: "/resources/greco/declinazioni",
  },
  {
    id: "verbi-greco",
    title: "Verbi",
    description: "Coniugazioni e paradigmi",
    icon: "verbi",
    href: "/resources/greco/verbi",
  },
  {
    id: "vocabolario-greco",
    title: "Vocabolario",
    description: "Parole frequenti",
    icon: "vocabolario",
    href: "/resources/greco/vocabolario",
  },
];

const latinoFeatured: FeaturedResource[] = [
  {
    id: "terza-declinazione",
    category: "grammatica",
    title: "La terza declinazione",
    description: "Tabella completa, spiegazione ed esempi.",
    imageUrl: "/placeholder-blog.png",
    href: "/resources/latino/terza-declinazione",
  },
  {
    id: "verbo-sum",
    category: "verbi",
    title: "Il verbo sum",
    description: "Tutte le forme, uso ed esempi.",
    imageUrl: "/placeholder-blog.png",
    href: "/resources/latino/verbo-sum",
  },
  {
    id: "complementi-principali",
    category: "traduzione",
    title: "I complementi principali",
    description: "Come riconoscerli e tradurli in una frase.",
    imageUrl: "/placeholder-blog.png",
    href: "/resources/latino/complementi-principali",
  },
  {
    id: "100-parole-frequenti",
    category: "vocabolario",
    title: "Le 100 parole più frequenti",
    description: "Il lessico da conoscere a memoria.",
    imageUrl: "/placeholder-blog.png",
    href: "/resources/latino/100-parole-frequenti",
  },
];

// TODO: contenuti placeholder per il Greco
const grecoFeatured: FeaturedResource[] = [
  {
    id: "alfabeto-e-pronuncia",
    category: "grammatica",
    title: "L'alfabeto greco",
    description: "Lettere, pronuncia, spiriti e accenti.",
    imageUrl: "/placeholder-blog.png",
    href: "/resources/greco/alfabeto-e-pronuncia",
  },
  {
    id: "verbo-eimi",
    category: "verbi",
    title: "Il verbo εἰμί",
    description: "Tutte le forme, uso ed esempi.",
    imageUrl: "/placeholder-blog.png",
    href: "/resources/greco/verbo-eimi",
  },
  {
    id: "costruzioni-greche",
    category: "traduzione",
    title: "Le costruzioni più comuni",
    description: "Come riconoscerle e tradurle.",
    imageUrl: "/placeholder-blog.png",
    href: "/resources/greco/costruzioni-greche",
  },
  {
    id: "parole-frequenti-greco",
    category: "vocabolario",
    title: "Le parole greche più frequenti",
    description: "Il lessico di base da tenere sempre a portata.",
    imageUrl: "/placeholder-blog.png",
    href: "/resources/greco/parole-frequenti",
  },
];

const content: Record<ResourceSubjectKey, ResourceSubjectContent> = {
  latino: {
    popular: latinoPopular,
    categories: buildCategories("latino"),
    recommendedPath: {
      title: "Non sai da dove iniziare?",
      description:
        "Scopri una selezione di risorse utili per iniziare a tradurre.",
      ctaLabel: "Percorso consigliato",
      // TODO: filtro/raccolta di risorse consigliate (da confermare nel Blueprint)
      href: "/resources/categoria/traduzione?materia=latino&percorso=consigliato",
    },
    featured: latinoFeatured,
  },
  greco: {
    popular: grecoPopular,
    categories: buildCategories("greco"),
    recommendedPath: {
      title: "Non sai da dove iniziare?",
      description:
        "Scopri una selezione di risorse utili per iniziare a tradurre.",
      ctaLabel: "Percorso consigliato",
      href: "/resources/categoria/traduzione?materia=greco&percorso=consigliato",
    },
    featured: grecoFeatured,
  },
};

export async function getResourcesHubData(): Promise<ResourcesHubData> {
  return {
    hero: {
      eyebrow: "RISORSE",
      titleLead: "Tutto quello che ti serve,",
      titleHighlight: "quando ti serve.",
      description: "Tabelle, schemi e strumenti per studiare latino e greco.",
      imageUrl: "/studente.png", // placeholder
      imageAlt: "Studente BStudent con libri e zaino",
      scrollWords: ["Studia.", "Consulta.", "Approfondisci."],
      searchPlaceholder: "Cerca una regola, una tabella, un argomento...",
      searchButtonLabel: "Cerca",
    },
    content,
    notebook: {
      title: "Salva le risorse nel tuo Quaderno",
      description:
        "Crea un account gratuito per salvare le risorse che usi di più e ritrovarle quando studi.",
      benefits: ["Salva le risorse", "Organizzale", "Ritrovale quando vuoi"],
      ctaLabel: "Crea il tuo account gratuito",
      ctaHref: "/register",
      loggedIn: {
        title: "Le tue risorse salvate",
        ctaLabel: "Apri il Quaderno",
        ctaHref: "/my/notebook",
      },
    },
  };
}
