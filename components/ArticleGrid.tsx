import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { CourseCard, type Course } from "./CourseCard";
import { ArticleCard, type Article } from "./ArticleCard";

// TODO Placeholder — verranno sostituiti dai dati del backend
const articles: Article[] = [
  {
    id: 1,
    category: "Metodo di studio",
    color: "blue",
    title: "5 tecniche per velocizzare più velocemente",
    subtitle: "",
    date: new Date(),
    time: 5,
    image: "/Hero.png",
    href: "#",
  },
  {
    id: 2,
    category: "Latino",
    color: "pink",
    title: "Come analizzare un periodo ipotetico in latino",
    subtitle: "",
    date: new Date(),
    time: 5,
    image: "/Hero.png",
    href: "#",
  },
  {
    id: 3,
    category: "Consigli",
    color: "green",
    title: "Gestire l'ansia da verifica: strategie che funzionano",
    subtitle: "",
    date: new Date(),
    time: 5,
    image: "/Hero.png",
    href: "#",
  },
];

export function ArticleGrid() {
  return (
    <section className="bg-background text-foreground py-16 px-6 md:py-24 md:px-12">
      <div className="container-section">
        <div className="mb-10">
          <span className="inline-block  py-1 text-sm font-bold tracking-widest text-brand-primary">
            ULTIMI ARTICOLI
          </span>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">
            <h2 className="text-4xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl">
              Notizie, consigli e spunti per il tuo percorso.
            </h2>
            <button className="hidden md:flex items-center gap-2 text-brand-primary font-medium shrink-0 hover:underline">
              Vai al blog
              <ArrowRightIcon width={15} height={15} />
            </button>
          </div>

          <p className="text-foreground text-lg md:text-xl mt-4 max-w-2xl">
            Scopri i nostri articoli su metodi di studio, strategie,
            approfondimenti e molto altro.
          </p>
        </div>

        {/* CTA mobile: sopra le card */}
        <button className="flex md:hidden items-center gap-2 text-brand-primary font-medium mb-6">
          Scopri tutti i corsi
          <ArrowRightIcon width={15} height={15} />
        </button>

        {/* Griglia su desktop, carosello con scroll-snap su mobile */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3">
          {articles.map((article) => (
            <div
              key={article.id}
              className="w-[85%] shrink-0 snap-start md:w-auto md:shrink"
            >
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
