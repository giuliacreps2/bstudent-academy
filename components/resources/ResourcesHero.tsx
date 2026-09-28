"use client";

import Image from "next/image";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { useResourceSearch } from "@/hooks/useResourceSearch";
import type { ResourcesHeroData } from "@/types/resources";

interface ResourcesHeroProps {
  hero: ResourcesHeroData;
  search: ReturnType<typeof useResourceSearch>;
}

export function ResourcesHero({ hero, search }: ResourcesHeroProps) {
  const { query, setQuery, submit, canSubmit } = search;

  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      {/* Decorazioni di sfondo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] overflow-hidden md:block"
      >
        <div className="absolute -right-24 -top-24 h-130 w-130 rounded-full bg-[#dcecff]" />
        <div className="absolute right-[14%] top-24 h-90 w-90 rounded-[45%] bg-[#e9dcff] opacity-80" />
        <div className="absolute right-[26%] top-40 h-60 w-60 rounded-full bg-[#ffd5e7] opacity-70" />
      </div>

      <div className="container-section relative z-10 grid grid-cols-1 items-center gap-8 py-12 md:grid-cols-[1.05fr_0.95fr] md:gap-x-10 md:py-16">
        {/* TESTO */}
        <div className="order-1 flex max-w-xl flex-col items-start">
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="relative block h-7 w-8">
              <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
              <span className="absolute left-0 top-3.5 h-3 w-1.5 rotate-55 rounded-full bg-brand-accent" />
              <span className="absolute left-5 top-4 h-2.5 w-1.5 rotate-80 rounded-full bg-brand-accent" />
            </span>
            <span className="text-xs font-extrabold tracking-[0.18em] text-brand-secondary md:text-sm">
              {hero.eyebrow}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.02] tracking-[-0.035em] sm:text-5xl lg:text-[56px]">
            {hero.titleLead}
            <br />
            <span className="relative inline-block">
              {hero.titleHighlight}
              <span
                aria-hidden="true"
                className="absolute -bottom-2 left-0 h-1.5 w-full -rotate-1 rounded-full bg-brand-secondary/80"
              />
            </span>
          </h1>

          <p className="mt-7 max-w-lg text-base leading-7 text-brand-muted md:text-lg">
            {hero.description}
          </p>
        </div>

        {/* RICERCA — su mobile subito dopo il testo, su desktop a tutta larghezza sotto */}
        <form
          role="search"
          onSubmit={submit}
          className="order-2 flex flex-col gap-3 rounded-3xl border border-border bg-white p-2 shadow-[0_12px_30px_rgba(23,32,51,0.08)] sm:flex-row sm:items-center sm:rounded-full md:order-3 md:col-span-2"
        >
          <label className="relative flex-1">
            <span className="sr-only">Cerca nelle risorse</span>
            <MagnifyingGlassIcon
              aria-hidden="true"
              className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-muted"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={hero.searchPlaceholder}
              className="h-12 w-full rounded-full bg-transparent pl-13 pr-4 text-sm font-medium text-foreground outline-none placeholder:text-brand-muted sm:text-base"
            />
          </label>

          <button
            type="submit"
            disabled={!canSubmit}
            className="btn-primary shrink-0 justify-center disabled:cursor-not-allowed disabled:opacity-50"
          >
            {hero.searchButtonLabel}
          </button>
        </form>

        {/* VISUAL DECORATIVO */}
        <div
          aria-hidden="true"
          className="relative order-3 h-72 w-full md:order-2 md:h-96"
        >
          <Image
            src={hero.imageUrl}
            alt=""
            fill
            priority
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-contain object-bottom"
          />

          <div className="card-papyrus absolute right-0 top-[10%] rotate-3 px-5 py-4 shadow-lg md:right-[4%]">
            <ul
              className="space-y-1 text-lg font-extrabold leading-tight"
              style={{ color: "var(--texture-papyrus-ink)" }}
            >
              {hero.scrollWords.map((word) => (
                <li key={word}>{word}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
