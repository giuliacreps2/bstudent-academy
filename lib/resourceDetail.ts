import { resourceSectionOrder } from "@/constants/resourceDetail";
import type {
  ResourceDetailData,
  ResourceSectionKey,
} from "@/types/resourceDetail";
import type { ResourceSubjectKey } from "@/types/resources";

/* =====================================================================
   DETTAGLIO RISORSA (mock) — /risorse/[materia]/[slug]
   TODO: sostituire con la fetch reale quando il BE è pronto
   const res = await fetch(`${process.env.API_URL}/risorse/${subject}/${slug}`);
   if (res.status === 404) return null;
   if (!res.ok) throw new Error("Impossibile caricare la risorsa");
   return res.json();
   ===================================================================== */

const terzaDeclinazione: ResourceDetailData = {
  id: "terza-declinazione",
  slug: "terza-declinazione",
  subject: "latino",
  category: "grammatica",
  title: "La terza declinazione",
  description:
    "Tabella completa, spiegazione ed esempi per riconoscere e usare correttamente la terza declinazione latina.",
  isSaved: false,

  summary: {
    text: "La terza declinazione comprende nomi dei tre generi con genitivo singolare in -is. Il tema si ricava sempre dal genitivo, non dal nominativo, che può cambiare molto.",
    example: { term: "lex, legis", translation: "legge" },
  },

  tool: {
    type: "table",
    title: "Tabella della terza declinazione",
    variants: [
      {
        id: "consonantico",
        label: "Tema consonantico",
        columns: ["Caso", "Singolare", "Plurale"],
        rows: [
          ["Nominativo", "lex", "leges"],
          ["Genitivo", "legis", "legum"],
          ["Dativo", "legi", "legibus"],
          ["Accusativo", "legem", "leges"],
          ["Ablativo", "lege", "legibus"],
        ],
        note: "Il vocativo è uguale al nominativo.",
      },
      {
        id: "in-i",
        label: "Tema in -i",
        columns: ["Caso", "Singolare", "Plurale"],
        rows: [
          ["Nominativo", "hostis", "hostes"],
          ["Genitivo", "hostis", "hostium"],
          ["Dativo", "hosti", "hostibus"],
          ["Accusativo", "hostem", "hostes"],
          ["Ablativo", "hoste", "hostibus"],
        ],
        note: "Il vocativo è uguale al nominativo.",
      },
    ],
  },

  insights: [
    {
      id: "particolarita",
      title: "Particolarità della terza declinazione",
      defaultOpen: true,
      blocks: [
        {
          type: "list",
          id: "particolarita-list",
          items: [
            "Differenza tra temi: i nomi con tema in -i hanno il genitivo plurale in -ium (hostium), quelli consonantici in -um (legum).",
            "Terminazioni particolari: i neutri in -e, -al, -ar fanno l'ablativo singolare in -i e il plurale in -ia (mari, maria).",
            "Nei neutri nominativo e accusativo sono sempre uguali.",
          ],
        },
      ],
    },
    {
      id: "errori-frequenti",
      title: "Errori frequenti",
      blocks: [
        {
          type: "list",
          id: "errori-list",
          items: [
            "Ricavare il tema dal nominativo invece che dal genitivo (leg-is → tema leg-).",
            "Confondere il genitivo singolare in -is con il nominativo di nomi come hostis.",
            "Dimenticare la desinenza -ium nel genitivo plurale dei temi in -i.",
          ],
        },
      ],
    },
  ],

  examples: [
    {
      id: "ex-lex",
      term: "lex, legis",
      grammar: "(f.)",
      sentence: "Lex omnibus aequa est.",
      translation: "La legge è uguale per tutti.",
    },
    {
      id: "ex-hostis",
      term: "hostis, hostis",
      grammar: "(m.)",
      sentence: "Hostes urbem oppugnant.",
      translation: "I nemici attaccano la città.",
    },
    {
      id: "ex-rex",
      term: "rex, regis",
      grammar: "(m.)",
      sentence: "Rex populum regit.",
      translation: "Il re governa il popolo.",
    },
  ],

  exerciseLink: {
    title: "Vuoi vedere se l'hai capita?",
    description: "Allenati con esercizi mirati sulla terza declinazione.",
    ctaLabel: "Vai agli esercizi",
    href: "/esercizi/grammatica/terza-declinazione",
    skills: ["grammatica"],
    topics: ["terza-declinazione"],
  },

  related: [
    {
      id: "rel-riconoscere",
      kind: "article",
      label: "Come riconoscere la terza declinazione",
      href: "/blog/come-riconoscere-la-terza-declinazione",
    },
    {
      id: "rel-particolarita",
      kind: "resource",
      label: "Le particolarità della terza declinazione",
      href: "/risorse/latino/terza-declinazione#risorsa-spiegazione",
    },
    {
      id: "rel-temi",
      kind: "resource",
      label: "Tema consonantico e tema in -i",
      href: "/risorse/latino/terza-declinazione#risorsa-tabella",
    },
    {
      id: "rel-esercizi",
      kind: "exercises",
      label: "Esercizi sulla terza declinazione",
      href: "/esercizi/grammatica/terza-declinazione",
    },
  ],
};

const resourcePool: ResourceDetailData[] = [terzaDeclinazione];

/** Per generateStaticParams: una entry per ogni risorsa pubblicata (SEO). */
export const resourceDetailParams = resourcePool.map((resource) => ({
  materia: resource.subject,
  slug: resource.slug,
}));

export async function getResourceDetail(
  subject: ResourceSubjectKey,
  slug: string,
): Promise<ResourceDetailData | null> {
  return (
    resourcePool.find(
      (resource) => resource.subject === subject && resource.slug === slug,
    ) ?? null
  );
}

/** Sezioni realmente presenti nella risorsa, nell'ordine della barra di navigazione. */
export function getAvailableSections(
  resource: ResourceDetailData,
): ResourceSectionKey[] {
  const present: Record<ResourceSectionKey, boolean> = {
    panoramica: true,
    tabella: Boolean(resource.tool),
    spiegazione: Boolean(resource.insights?.length),
    esempi: Boolean(resource.examples?.length),
    esercizi: Boolean(resource.exerciseLink),
  };

  return resourceSectionOrder.filter((key) => present[key]);
}
