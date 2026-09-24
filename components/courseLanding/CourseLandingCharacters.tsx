import Image from "next/image";
import { LockClosedIcon, SparklesIcon } from "@heroicons/react/24/solid";
import type { CourseLandingCharactersData } from "@/types/courseLanding";

export function CourseLandingCharacters({
  characters,
}: {
  characters: CourseLandingCharactersData;
}) {
  return (
    <section className="relative overflow-hidden bg-surface-blue py-16 text-foreground md:py-20">
      {/* Decorazioni */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#ffd5e7] opacity-50" />
        <div className="absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#e9dcff] opacity-60" />
      </div>

      <div className="container-section relative z-10">
        <div className="mx-auto mb-10 flex max-w-2xl flex-col items-center text-center md:mb-12">
          <span className="mb-3 flex items-center gap-2 text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
            <SparklesIcon className="h-4 w-4 text-brand-accent" />
            {characters.eyebrow}
          </span>

          <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            {characters.title}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
            {characters.description}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3 md:gap-6">
          {characters.characters.map((character) => (
            <article
              key={character.id}
              className={`${
                character.unlocked ? "card-marble" : "card-stone"
              } flex flex-col items-center p-5 text-center`}
            >
              <div className="relative h-56 w-full md:h-64">
                <Image
                  src={character.imageUrl}
                  alt={character.name}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className={`object-contain object-bottom ${
                    character.unlocked ? "" : "brightness-75 grayscale"
                  }`}
                />

                {!character.unlocked && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                      <LockClosedIcon className="h-5 w-5 text-white" />
                    </span>
                  </span>
                )}
              </div>

              <h3 className="mt-4 text-lg font-extrabold">{character.name}</h3>

              {character.tagline && (
                <p className="mt-1 text-sm text-brand-muted">
                  {character.tagline}
                </p>
              )}

              {character.bonuses && character.bonuses.length > 0 && (
                <ul className="mt-4 flex flex-wrap justify-center gap-2">
                  {character.bonuses.map((bonus) => (
                    <li
                      key={bonus.label}
                      className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold"
                    >
                      <span className="text-brand-success">{bonus.value}</span>{" "}
                      {bonus.label}
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-4 text-xs font-bold text-brand-muted">
                {character.unlocked
                  ? "Disponibile da subito"
                  : (character.unlockHint ?? "Da sbloccare")}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
