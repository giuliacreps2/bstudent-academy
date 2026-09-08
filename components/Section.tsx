"use client";

import { useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { IconSection, type FeatureIcon } from "@/components/Icon";

const items: FeatureIcon[] = [
  {
    id: 1,
    icon: "video",
    color: "purple",
    title: "Video lezioni",
    subtitle: "Impara guardando",
    href: "#",
  },
  {
    id: 2,
    icon: "appunti",
    color: "green",
    title: "Appunti",
    subtitle: "Ripassa quando vuoi",
    href: "#",
  },
  {
    id: 3,
    icon: "versioni",
    color: "pink",
    title: "Versioni guidate",
    subtitle: "Passo dopo passo",
    href: "#",
  },
  {
    id: 4,
    icon: "esercizi",
    color: "orange",
    title: "Esercizi",
    subtitle: "Mettiti alla prova",
    href: "#",
  },
  {
    id: 5,
    icon: "punti",
    color: "purple",
    title: "Punti",
    subtitle: "Guadagna mentre studi",
    href: "#",
  },
  {
    id: 6,
    icon: "progressi",
    color: "blue",
    title: "Progressi",
    subtitle: "Scopri quanto migliori",
    href: "#",
  },
  {
    id: 7,
    icon: "community",
    color: "teal",
    title: "Community",
    subtitle: "Studia insieme agli altri",
    href: "#",
  },
];

export function Section() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (direction: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-background text-foreground py-16 px-6 md:py-12 md:px-12">
      <div className="container-section md:w-full text-center">
        <span className="inline-block py-1 text-sm font-bold tracking-widest text-brand-primary">
          COSA PUOI FARE SU BSTUDENT
        </span>
        <h2 className="text-4xl text-center sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mt-2 mb-10">
          Tutto ciò che ti serve
          <br />
          per studiare meglio.
        </h2>

        <div className="relative">
          <button
            type="button"
            aria-label="Scorri a sinistra"
            onClick={() => scrollByAmount("left")}
            className="hidden absolute -left-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-neutral-50"
          >
            <ChevronLeftIcon width={18} height={18} />
          </button>

          <div
            ref={scrollerRef}
            className="bg-[#e2f0ff] rounded-[60px] flex items-start gap-2 md:gap-16 overflow-x-auto snap-x snap-mandatory scroll-smooth py-8 px-6  bg-neutral-primary-soft [-ms-overflow-style:none] scrollbar [&::-webkit-scrollbar]:hidden"
          >
            {items.map((item) => (
              <div key={item.id} className="snap-start">
                <IconSection item={item} />
              </div>
            ))}
          </div>

          <button
            type="button"
            aria-label="Scorri a destra"
            onClick={() => scrollByAmount("right")}
            className="hidden absolute -right-5 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full bg-white shadow-md hover:bg-neutral-50"
          >
            <ChevronRightIcon width={18} height={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
