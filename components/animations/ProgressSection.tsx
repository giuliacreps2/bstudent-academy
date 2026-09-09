import {
  CheckIcon,
  FireIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { LevelStatsCard } from "@/components/animations/LevelStatsCard";

export function ProgressSection() {
  return (
    <section className="relative overflow-hidden bg-background py-12 text-foreground md:py-16">
      {/* FLOATING BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* blob blu */}
        <div className="absolute -right-32 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#dcecff] opacity-70" />

        {/* blob rosa */}
        <div className="absolute right-[18%] top-[8%] h-40 w-40 rounded-full bg-[#ffd5e7] opacity-40 blur-sm" />

        {/* +50 XP */}
        <div className="absolute right-[8%] top-[18%] hidden rotate-[-6deg] rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_12px_30px_rgba(23,32,51,0.08)] backdrop-blur-sm lg:block">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-accent">
              <StarIcon className="h-4 w-4 text-white" />
            </span>
            <div>
              <p className="text-xs font-bold text-brand-muted">RICOMPENSA</p>
              <p className="text-sm font-extrabold">+50 XP</p>
            </div>
          </div>
        </div>

        {/* STREAK */}
        <div className="absolute bottom-[18%] right-[4%] hidden rotate-[4deg] rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-[0_12px_30px_rgba(23,32,51,0.08)] backdrop-blur-sm lg:block">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-secondary">
              <FireIcon className="h-4 w-4 text-white" />
            </span>
            <div>
              <p className="text-xs font-bold text-brand-muted">STREAK</p>
              <p className="text-sm font-extrabold">7 giorni 🔥</p>
            </div>
          </div>
        </div>

        {/* OBIETTIVO */}
        <div className="absolute left-[52%] bottom-[10%] hidden -rotate-[5deg] rounded-full border border-white/70 bg-white/90 px-4 py-2 shadow-[0_12px_30px_rgba(23,32,51,0.08)] backdrop-blur-sm lg:flex">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-success">
              <CheckIcon className="h-4 w-4 text-white" />
            </span>
            <span className="text-xs font-bold text-brand-success">
              Obiettivo completato
            </span>
          </div>
        </div>
      </div>

      <div className="container-section relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
        {/* TESTO */}
        <div className="flex max-w-xl flex-col items-start">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-accent md:h-14 md:w-14">
            <FlagIcon className="h-5 w-5 text-white md:h-[22px] md:w-[22px]" />
          </span>

          <span className="mt-4 text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
            IL TUO PERCORSO
          </span>

          <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            Ogni lezione ti fa fare un passo avanti.
          </h2>

          <p className="mt-5 max-w-lg text-base leading-7 text-brand-muted md:text-lg">
            Ogni attività completata ti avvicina ai tuoi obiettivi. Continua
            così!
          </p>
        </div>

        {/* CARD */}
        <div className="relative flex justify-center md:justify-end">
          <LevelStatsCard />
        </div>
      </div>
    </section>
  );
}
