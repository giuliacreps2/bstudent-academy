import { ArrowRightIcon } from "@heroicons/react/24/outline";
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
    <section className="bg-background py-12 text-foreground md:py-16">
      <div className="container-section">
        {/* HEADER */}
        <div className="mb-9 md:mb-10">
          {/* DECORAZIONE */}
          <span aria-hidden="true" className="relative mb-1 block h-7 w-8">
            <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
            <span className="absolute left-0 top-3.5 h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />
            <span className="absolute left-5 top-4 h-2.5 w-1.5 rotate-[80deg] rounded-full bg-brand-accent" />
          </span>

          {/* EYEBROW */}
          <span
            className="
              text-xs
              font-extrabold
              tracking-[0.18em]
              text-brand-primary
              md:text-sm
            "
          >
            ULTIMI ARTICOLI
          </span>

          <div
            className="
              mt-3
              flex flex-col
              gap-4
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <h2
              className="
                max-w-2xl
                text-3xl
                font-extrabold
                leading-[1.05]
                tracking-tight
                sm:text-4xl
                md:text-5xl
              "
            >
              Notizie, consigli e spunti per il tuo percorso.
            </h2>

            {/* CTA DESKTOP */}
            <button
              className="
                hidden
                shrink-0
                items-center
                gap-2
                font-medium
                text-brand-primary
                hover:underline
                md:flex
              "
            >
              Vai al blog
              <ArrowRightIcon width={15} height={15} />
            </button>
          </div>

          <p
            className="
              mt-4
              max-w-2xl
              text-base
              leading-relaxed
              text-brand-muted
              md:text-lg
            "
          >
            Scopri i nostri articoli su metodi di studio, strategie,
            approfondimenti e molto altro.
          </p>
        </div>

        {/* CTA MOBILE */}
        <button
          className="
            mb-5
            flex
            items-center
            gap-2
            font-medium
            text-brand-primary
            md:hidden
          "
        >
          Vai al blog
          <ArrowRightIcon width={15} height={15} />
        </button>

        {/* ARTICLES */}
        <div className="overflow-visible pb-8">
          <div
            className="
              flex
              gap-4
              overflow-x-auto
              snap-x
              snap-mandatory
              px-2
              pb-5
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              md:grid
              md:grid-cols-3
              md:gap-6
              md:overflow-visible
              md:px-0
              md:pb-2
            "
          >
            {articles.map((article) => (
              <div
                key={article.id}
                className="
                  w-[85%]
                  shrink-0
                  snap-start

                  md:w-auto
                  md:shrink
                "
              >
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
