"use client";

import {
  ArrowRightIcon,
  CheckIcon,
  PlayCircleIcon,
  StarIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] overflow-hidden md:block"
      >
        <div className="absolute -right-20 -top-24 h-180 w-180 rounded-full bg-[#dcecff]" />

        <div className="absolute right-[8%] top-30 h-140 w-140 rounded-[45%] bg-[#e9dcff] opacity-80" />

        <div className="absolute right-[18%] top-45 h-107.5 w-107.5 rounded-full bg-[#ffd5e7] opacity-70" />
      </div>

      <div className="container-section relative z-10 grid min-h-155 grid-cols-1 items-center gap-8 py-16 md:min-h-170 md:grid-cols-[0.9fr_1.1fr] md:py-10 lg:grid-cols-[0.85fr_1.15fr]">
        {/* =========================
            TESTO
        ========================== */}
        <div className="relative z-20 flex max-w-162.5 flex-col items-start">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <span className="relative block h-8 w-8">
              <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
              <span className="absolute left-0 top-4 h-3 w-1.5 rotate-55 rounded-full bg-brand-accent" />
              <span className="absolute left-5 top-5 h-2 w-1.5 rotate-80 rounded-full bg-brand-accent" />
            </span>

            <span className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
              IMPARA. GIOCA. CRESCI.
            </span>
          </div>

          {/* Heading */}
          <h1 className="max-w-170 text-5xl font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-[64px] xl:text-[70px]">
            Studiare latino e greco
            <br />
            può essere molto
            <br />
            <span className="relative inline-block text-brand-secondary">
              più semplice.
              <span
                aria-hidden="true"
                className="absolute -bottom-3 left-0 h-2 w-full -rotate-1 rounded-full bg-brand-secondary/80"
              />
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-142.5 text-base leading-7 text-brand-muted md:text-lg">
            BStudent è la piattaforma per imparare le lingue classiche
            attraverso lezioni, esercizi e un percorso pensato per aiutarti a
            migliorare, un passo alla volta.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="btn-primary">
              Inizia a studiare
              <ArrowRightIcon className="h-4 w-4" />
            </button>

            <button className="btn-secondary">
              <PlayCircleIcon className="h-5 w-5" />
              Come funziona
            </button>
          </div>
        </div>

        {/* =========================
            VISUAL
        ========================== */}
        <div className="relative h-117.5 w-full md:h-130">
          {/* Main illustration */}

          <div className="absolute inset-0">
            <Image
              src="/Hero-Bstudent.png"
              alt="Studenti BStudent"
              fill
              priority
              className="object-cover rounded-4xl"
            />
          </div>

          {/* =====================
              FLOATING UI
          ====================== */}

          {/* XP */}
          <div className="hidden md:block absolute left-[2%] top-[13%] z-20 rotate-[-5deg] rounded-2xl border border-white/70 bg-white/95 px-5 py-3 shadow-[0_12px_30px_rgba(23,32,51,0.10)] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-secondary">
                <StarIcon className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="text-lg font-extrabold text-foreground">+20 XP</p>
              </div>
            </div>
          </div>

          {/* Exercise completed */}
          <div className="absolute right-[8%] top-[10%] z-20 rounded-2xl border border-white/70 bg-white/95 px-5 py-3 shadow-[0_12px_30px_rgba(23,32,51,0.10)] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-success">
                <CheckIcon className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="text-sm font-extrabold text-brand-success">
                  ESERCIZIO
                </p>
                <p className="text-sm font-extrabold text-brand-success">
                  COMPLETATO ✓
                </p>
              </div>
            </div>
          </div>

          {/* Progress */}
          <div className="absolute left-[-2%] top-[53%] z-20 w-43.75 rotate-[-4deg] rounded-2xl border border-white/70 bg-white/95 px-5 py-4 shadow-[0_12px_30px_rgba(23,32,51,0.10)] backdrop-blur-sm">
            <p className="text-lg font-extrabold">Latino</p>
            <p className="text-sm text-brand-muted">Progresso</p>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e7edfa]">
              <div className="h-full w-[68%] rounded-full bg-brand-primary" />
            </div>

            <p className="mt-1 text-xs font-semibold text-brand-muted">68%</p>
          </div>

          {/* Level */}
          <div className="hidden md:block absolute right-[3%] top-[31%] z-20 w-43.75 rotate-[4deg] rounded-2xl border border-white/70 bg-white/95 px-5 py-4 shadow-[0_12px_30px_rgba(23,32,51,0.10)] backdrop-blur-sm">
            <div className=" flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent">
                <TrophyIcon className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="text-xs font-bold text-brand-muted">LIVELLO</p>
                <p className="text-lg font-extrabold">03</p>
              </div>
            </div>

            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e7edfa]">
              <div className="h-full w-[62%] rounded-full bg-brand-primary" />
            </div>
          </div>

          {/* Points */}
          <div className="absolute bottom-[19%] right-[2%] z-20 rotate-[-5deg] rounded-2xl border border-white/70 bg-white/95 px-5 py-3 shadow-[0_12px_30px_rgba(23,32,51,0.10)] backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-accent">
                <StarIcon className="h-5 w-5 text-white" />
              </div>

              <p className="text-lg font-extrabold">+10 punti</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom transition */}
      <div
        aria-hidden="true"
        className="absolute -bottom-px left-0 h-12 w-full rounded-t-[50%] bg-background"
      />
    </section>
  );
}
