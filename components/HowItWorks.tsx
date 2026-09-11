"use client";

import {
  AcademicCapIcon,
  CheckIcon,
  FireIcon,
  StarIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";

import { StepCard, type Step } from "./StepCard";

const steps: Step[] = [
  {
    id: 1,
    number: 1,
    icon: "impara",
    color: "blue",
    title: "Impara",
    description: "Scopri un nuovo argomento con lezioni chiare e mirate.",
  },
  {
    id: 2,
    number: 2,
    icon: "allenati",
    color: "green",
    title: "Allenati",
    description: "Mettiti alla prova con esercizi e traduzioni.",
  },
  {
    id: 3,
    number: 3,
    icon: "feedback",
    color: "purple",
    title: "Ricevi feedback",
    description: "Capisci subito cosa hai sbagliato e perché.",
  },
  {
    id: 4,
    number: 4,
    icon: "xp",
    color: "amber",
    title: "Guadagna XP",
    description: "Completa le attività e accumula XP mentre studi.",
  },
  {
    id: 5,
    number: 5,
    icon: "skill",
    color: "pink",
    title: "Migliora le skill",
    description: "Trasforma ogni esercizio in un progresso concreto.",
  },
];

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-background py-16 text-foreground md:py-20 lg:py-24">
      {/* =========================
          DECORAZIONI DI SFONDO
      ========================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          top-24
          h-64
          w-64
          rounded-full
          bg-[#dcecff]
          opacity-50
          blur-[2px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          top-1/2
          h-80
          w-80
          -translate-y-1/2
          rounded-full
          bg-[#e9dcff]
          opacity-40
          blur-[2px]
        "
      />

      <div className="container-section relative z-10">
        {/* ==================================================
            INTRO + VISUAL
        ================================================== */}

        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-10 lg:gap-20">
          {/* =========================
              TESTO
          ========================== */}

          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span className="relative block h-7 w-8" aria-hidden="true">
                <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
                <span className="absolute left-0 top-3.5 h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />
                <span className="absolute left-5 top-4 h-2.5 w-1.5 rotate-[80deg] rounded-full bg-brand-accent" />
              </span>

              <span className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
                COME FUNZIONA
              </span>
            </div>

            {/* Heading */}
            <h2
              className="
                max-w-xl
                text-4xl
                font-extrabold
                leading-[1]
                tracking-[-0.035em]
                sm:text-5xl
                lg:text-[58px]
              "
            >
              Impara.
              <br />
              Allenati.
              <br />
              <span className="text-brand-secondary">Migliora.</span>
            </h2>

            {/* Description */}
            <p
              className="
                mt-6
                max-w-lg
                text-base
                leading-7
                text-brand-muted
                md:text-lg
              "
            >
              BStudent trasforma lo studio di latino e greco in un percorso
              fatto di lezioni, esercizi, feedback e piccoli traguardi.
            </p>
          </div>

          {/* =========================
              VISUAL BSTUDENT
          ========================== */}

          <div className="relative mx-auto w-full max-w-135">
            {/* Decorative blobs */}

            <div
              aria-hidden="true"
              className="
                absolute
                -right-8
                -top-8
                h-28
                w-28
                rounded-full
                bg-brand-secondary/20
                blur-[1px]
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                -bottom-8
                -left-8
                h-32
                w-32
                rounded-full
                bg-brand-primary/10
              "
            />

            {/* Main mockup */}
            <div
              className="
                relative
                overflow-hidden
                rounded-[30px]
                border
                border-white/80
                bg-white
                p-5
                shadow-[0_24px_60px_rgba(23,32,51,0.10)]
                sm:p-6
              "
            >
              {/* Mockup header */}

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-muted">
                    Il tuo percorso
                  </p>

                  <h3 className="mt-1 text-xl font-extrabold tracking-tight">
                    Latino
                  </h3>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10">
                  <AcademicCapIcon className="h-5 w-5 text-brand-primary" />
                </div>
              </div>

              {/* Progress */}

              <div className="mt-6 rounded-2xl bg-[#f7f9fc] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold">Progresso</span>

                  <span className="text-sm font-extrabold text-brand-primary">
                    68%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#e5eaf2]">
                  <div className="h-full w-[68%] rounded-full bg-brand-primary" />
                </div>
              </div>

              {/* Activity */}

              <div className="mt-4 space-y-3">
                {/* Lesson */}

                <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10">
                    <AcademicCapIcon className="h-5 w-5 text-brand-primary" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold">Lezione completata</p>

                    <p className="mt-0.5 text-xs text-brand-muted">
                      Il congiuntivo latino
                    </p>
                  </div>

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-success">
                    <CheckIcon className="h-4 w-4 text-white" />
                  </div>
                </div>

                {/* Exercise */}

                <div className="flex items-center gap-3 rounded-2xl border border-border bg-white p-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-green/10">
                    <FireIcon className="h-5 w-5 text-brand-green" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-extrabold">Esercizio</p>

                    <p className="mt-0.5 text-xs text-brand-muted">
                      Traduzione guidata
                    </p>
                  </div>

                  <span className="rounded-full bg-brand-yellow/15 px-2.5 py-1 text-xs font-extrabold text-brand-accent">
                    +20 XP
                  </span>
                </div>
              </div>

              {/* Bottom stats */}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-brand-primary/5 p-4">
                  <div className="flex items-center gap-2">
                    <TrophyIcon className="h-4 w-4 text-brand-accent" />

                    <span className="text-xs font-bold text-brand-muted">
                      LIVELLO
                    </span>
                  </div>

                  <p className="mt-1 text-2xl font-extrabold">03</p>
                </div>

                <div className="rounded-2xl bg-brand-secondary/5 p-4">
                  <div className="flex items-center gap-2">
                    <StarIcon className="h-4 w-4 text-brand-secondary" />

                    <span className="text-xs font-bold text-brand-muted">
                      XP
                    </span>
                  </div>

                  <p className="mt-1 text-2xl font-extrabold">320</p>
                </div>
              </div>
            </div>

            {/* Floating XP badge */}

            <div
              className="
                absolute
                -left-4
                top-[28%]
                hidden
                items-center
                gap-2
                rounded-2xl
                border
                border-white/80
                bg-white/95
                px-4
                py-3
                shadow-[0_14px_35px_rgba(23,32,51,0.10)]
                sm:flex
              "
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-secondary">
                <StarIcon className="h-4 w-4 text-white" />
              </div>

              <div>
                <p className="text-xs font-bold text-brand-muted">TRAGUARDO</p>

                <p className="text-sm font-extrabold">+20 XP</p>
              </div>
            </div>

            {/* Floating completed badge */}

            <div
              className="
                absolute
                -right-4
                bottom-[14%]
                hidden
                items-center
                gap-2
                rounded-2xl
                border
                border-white/80
                bg-white/95
                px-4
                py-3
                shadow-[0_14px_35px_rgba(23,32,51,0.10)]
                sm:flex
              "
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-success">
                <CheckIcon className="h-4 w-4 text-white" />
              </div>

              <p className="text-sm font-extrabold text-brand-success">
                Esercizio completato
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            PERCORSO
        ================================================== */}

        <div className="mt-16 md:mt-20 lg:mt-24">
          {/* Desktop */}

          <div className="relative hidden md:block">
            {/* Connecting line */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-[8%]
                right-[8%]
                top-6
                h-px
                bg-brand-primary/15
              "
            />

            <div className="grid grid-cols-5 gap-5">
              {steps.map((step) => (
                <StepCard key={step.id} step={step} />
              ))}
            </div>
          </div>

          {/* Mobile */}

          <div className="relative md:hidden">
            {/* Vertical line */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-6
                top-6
                bottom-6
                w-px
                bg-brand-primary/15
              "
            />

            <div className="flex flex-col gap-9">
              {steps.map((step) => (
                <StepCard key={step.id} step={step} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
