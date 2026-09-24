import type { ArticlePageData } from "@/types/article";

// TODO: sostituire con la fetch reale al CMS/BE quando sarà pronto
// const res = await fetch(`${process.env.API_URL}/blog/articoli/${slug}`);
// if (!res.ok) return null;
// return res.json();
const articlePool: ArticlePageData[] = [
  {
    slug: "come-organizzare-lo-studio-del-latino",
    title: "Come organizzare lo studio del latino (senza stress)",
    subtitle:
      "Strategie semplici e sostenibili per rendere il latino parte della tua routine quotidiana e ottenere risultati nel tempo.",
    coverUrl: "/Hero-BStudent.png",
    category: "metodo",
    author: {
      name: "BStudent Team",
      avatarUrl: "/studente.png",
    },
    publishedAt: "12 settembre 2025",
    readingMinutes: 5,
    isSavedToNotebook: false,
    content: [
      {
        type: "paragraph",
        id: "intro",
        text: "Il latino può sembrare una montagna da scalare, ma con il giusto metodo diventa un percorso stimolante e alla portata di tutti. In questo articolo trovi consigli pratici, una routine di studio efficace e qualche trucco per mantenere la motivazione nel tempo.",
      },
      {
        type: "heading",
        id: "h-routine",
        number: "01",
        text: "Crea una routine sostenibile",
      },
      {
        type: "paragraph",
        id: "p-routine",
        text: "Meglio 20-30 minuti al giorno, costanti, che lunghe sessioni saltuarie. La regolarità aiuta la memoria e riduce l'ansia. Scegli un orario fisso e un luogo tranquillo, senza distrazioni.",
      },
      {
        type: "quote",
        id: "q-routine",
        text: "Non è questione di tempo, ma di costanza.",
      },
      {
        type: "heading",
        id: "h-strumenti",
        number: "02",
        text: "Usa strumenti attivi",
      },
      {
        type: "paragraph",
        id: "p-strumenti",
        text: "Non limitarti a rileggere: fai esercizi, traduci, ripeti ad alta voce. Gli esercizi attivi aiutano a fissare le regole e a riconoscerle velocemente nei testi.",
      },
      {
        type: "callout",
        id: "c-strumenti",
        icon: "💡",
        text: "Prova a creare le tue schede di ripasso o usa il Quaderno di BStudent per avere tutto in un unico posto.",
      },
      {
        type: "heading",
        id: "h-realta",
        number: "03",
        text: "Collega il latino alla realtà",
      },
      {
        type: "paragraph",
        id: "p-realta",
        text: "Cerca le parole latine nell'italiano di tutti i giorni, scopri le radici comuni e prova a leggere frasi semplici. Vedrai che il latino è più vicino a te di quanto pensi!",
      },
      {
        type: "quote",
        id: "q-realta",
        text: "Il latino non è solo una lingua del passato, ma una chiave per comprendere meglio il presente.",
      },
      {
        type: "heading",
        id: "h-motivazione",
        number: "04",
        text: "Mantieni la motivazione",
      },
      {
        type: "paragraph",
        id: "p-motivazione",
        text: 'Fissa piccoli obiettivi, celebra i progressi e ricorda il tuo "perché". Il latino non è solo un voto, ma un allenamento per la mente che ti servirà in ogni ambito.',
      },
      {
        type: "heading",
        id: "h-risorse",
        number: "05",
        text: "Risorse utili",
      },
      {
        type: "paragraph",
        id: "p-risorse",
        text: "Libri, siti, app e — se vuoi — i corsi di BStudent: nella sezione Risorse trovi tutto ciò che ti serve per approfondire e continuare a crescere.",
      },
    ],
  },
];

export async function getArticleData(
  slug: string,
): Promise<ArticlePageData | null> {
  return articlePool.find((article) => article.slug === slug) ?? null;
}
