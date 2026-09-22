import type { BlogArticle } from "@/types/blog";

// TODO: sostituire con la fetch reale al CMS/BE quando sarà pronto
// const res = await fetch(`${process.env.API_URL}/blog/articles`);
// if (!res.ok) throw new Error("Impossibile caricare gli articoli del blog");
// return res.json();
const blogPool: BlogArticle[] = [
  {
    id: "1",
    slug: "come-organizzare-lo-studio-del-latino",
    category: "metodo",
    title: "Come organizzare lo studio del latino (senza stress)",
    excerpt:
      "Strategie semplici e sostenibili per rendere il latino parte della tua routine quotidiana.",
    image: "/placeholder-blog.png",
    readingMinutes: 5,
    href: "/blog/come-organizzare-lo-studio-del-latino",
  },
  {
    id: "2",
    slug: "il-latino-nella-vita-di-tutti-i-giorni",
    category: "latino",
    title: "Il latino nella vita di tutti i giorni",
    excerpt:
      "Dalle parole che usiamo ai nomi delle città: il latino è più vicino di quanto pensi.",
    image: "/placeholder-blog.png",
    readingMinutes: 6,
    href: "/blog/il-latino-nella-vita-di-tutti-i-giorni",
  },
  {
    id: "3",
    slug: "perche-il-greco-e-ancora-attuale",
    category: "greco",
    title: "Perché il greco è ancora attuale?",
    excerpt:
      "Un viaggio tra filosofia, scienza e linguaggio per scoprire quanto il greco antico parli ancora al presente.",
    image: "/placeholder-blog.png",
    readingMinutes: 7,
    href: "/blog/perche-il-greco-e-ancora-attuale",
  },
  {
    id: "4",
    slug: "curiosita-sul-mondo-antico",
    category: "curiosita",
    title: "5 curiosità sul mondo antico che forse non conoscevi",
    excerpt:
      "Dai banchi di scuola alla vita quotidiana: aneddoti sorprendenti dall'antichità.",
    image: "/placeholder-blog.png",
    readingMinutes: 4,
    href: "/blog/curiosita-sul-mondo-antico",
  },
  {
    id: "5",
    slug: "studiare-le-lingue-classiche-ti-cambia",
    category: "vita-da-studente",
    title: "Studiare le lingue classiche ti cambia (ecco come)",
    excerpt:
      "Più logica, più concentrazione, più sicurezza: ecco cosa dicono gli studenti.",
    image: "/placeholder-blog.png",
    readingMinutes: 6,
    href: "/blog/studiare-le-lingue-classiche-ti-cambia",
  },
  {
    id: "6",
    slug: "tecniche-di-memoria-per-il-vocabolario",
    category: "metodo",
    title: "Tecniche di memoria per il vocabolario",
    excerpt:
      "Dalle flashcard alle mappe mentali: i metodi più efficaci per ricordare le parole a lungo.",
    image: "/placeholder-blog.png",
    readingMinutes: 5,
    href: "/blog/tecniche-di-memoria-per-il-vocabolario",
  },
  {
    id: "7",
    slug: "le-iscrizioni-latine-piu-famose",
    category: "latino",
    title: "Le iscrizioni latine più famose e il loro significato",
    excerpt:
      "Dai monumenti alle strade: un viaggio tra le frasi latine più celebri della storia.",
    image: "/placeholder-blog.png",
    readingMinutes: 4,
    href: "/blog/le-iscrizioni-latine-piu-famose",
  },
  {
    id: "8",
    slug: "la-bellezza-della-lingua-greca",
    category: "greco",
    title: "La bellezza della lingua greca",
    excerpt:
      "Suoni, parole e concetti che continuano a ispirare la cultura, la scienza e l'arte di oggi.",
    image: "/placeholder-blog.png",
    readingMinutes: 6,
    href: "/blog/la-bellezza-della-lingua-greca",
  },
  {
    id: "9",
    slug: "creare-un-piano-di-studio-efficace",
    category: "studio",
    title: "Creare un piano di studio efficace in 4 mosse",
    excerpt:
      "Come strutturare le tue settimane di studio senza sentirti sopraffatto.",
    image: "/placeholder-blog.png",
    readingMinutes: 5,
    href: "/blog/creare-un-piano-di-studio-efficace",
  },
];

export async function getBlogArticles(): Promise<BlogArticle[]> {
  return blogPool;
}
