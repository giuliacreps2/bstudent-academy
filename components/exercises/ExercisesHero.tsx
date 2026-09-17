// components/exercises/ExercisesHero.tsx
import Image from "next/image";
import type { HeroData } from "@/types/exercises";

export function ExercisesHero({ imageUrl, quote, quoteAuthor }: HeroData) {
  return (
    <div className="relative overflow-hidden rounded-3xl min-h-70 sm:min-h-80">
      <Image src={imageUrl} alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#172033]/75 via-[#172033]/35 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center h-full max-w-lg px-6 py-8 sm:px-10 sm:py-10">
        <span className="inline-flex items-center gap-1.5 self-start text-[10px] font-bold uppercase tracking-widest text-white bg-white/15 backdrop-blur-sm px-3 py-1 rounded-pill mb-4">
          🏛 Esercizi
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.1] mb-3">
          Allenati oggi,
          <br />
          per andare più lontano.
        </h2>

        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          Scegli una skill, completa gli esercizi e rafforza le tue competenze.
        </p>
      </div>

      <div className="card-papyrus absolute bottom-5 right-5 hidden sm:block max-w-52 px-4 py-3 shadow-lg">
        <p
          className="text-sm italic leading-5"
          style={{ color: "var(--texture-papyrus-ink)" }}
        >
          “{quote}”
        </p>
        <p
          className="text-xs font-semibold mt-1 text-right"
          style={{ color: "var(--texture-papyrus-ink-muted)" }}
        >
          — {quoteAuthor}
        </p>
      </div>
    </div>
  );
}
