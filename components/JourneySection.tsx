"use client";

import Image from "next/image";
import { CheckIcon } from "@heroicons/react/24/solid";
import { StepListItem, type Step } from "./StepListItem";
import { SkillBar, type Skill } from "./SkillBar";

// Placeholder — verranno sostituiti dai dati del backend
const steps: Step[] = [
  {
    id: 1,
    number: 1,
    icon: "impara",
    color: "blue",
    title: "Impara",
    description: "Acquisisci una nuova competenza.",
  },
  {
    id: 2,
    number: 2,
    icon: "allenati",
    color: "green",
    title: "Allenati",
    description: "Mettiti alla prova con esercizi mirati.",
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
    description: "Ogni attività completata ti fa salire di livello.",
  },
  {
    id: 5,
    number: 5,
    icon: "skill",
    color: "pink",
    title: "Migliora le skill",
    description: "Trasforma gli esercizi in progressi concreti.",
  },
];

const skills: Skill[] = [
  { id: 1, label: "Grammatica", percentage: 82, color: "purple" },
  { id: 2, label: "Lessico", percentage: 74, color: "pink" },
  { id: 3, label: "Traduzione", percentage: 88, color: "blue" },
  { id: 4, label: "Analisi del testo", percentage: 71, color: "teal" },
  { id: 5, label: "Comprensione", percentage: 80, color: "orange" },
  { id: 6, label: "Metodo di studio", percentage: 90, color: "red" },
];

const currentXp = 320;
const targetXp = 500;
const level = 3;

export function JourneySection() {
  return (
    <section className="bg-background text-foreground py-16 md:py-20 overflow-hidden">
      <div className="container-section grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8 items-start">
        {/* TESTO — ordine 1 sempre */}
        <div className="order-1 md:col-span-2 flex flex-col items-start">
          <div className="mb-3 flex items-center gap-3">
            <span className="relative block h-7 w-8" aria-hidden="true">
              <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
              <span className="absolute left-0 top-3.5 h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />
              <span className="absolute left-5 top-4 h-2.5 w-1.5 rotate-[80deg] rounded-full bg-brand-accent" />
            </span>
            <span className="text-xs md:text-sm font-extrabold tracking-[0.18em] text-brand-primary">
              COME FUNZIONA
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] max-w-md">
            Il tuo percorso, passo dopo passo.
          </h2>

          <p className="mt-4 mb-8 max-w-md text-base md:text-lg leading-relaxed text-brand-muted">
            Un metodo semplice e coinvolgente per imparare, allenarti e vedere
            davvero i tuoi progressi.
          </p>

          <div className="flex flex-col gap-5">
            {steps.map((step) => (
              <StepListItem key={step.id} step={step} />
            ))}
          </div>
        </div>

        {/* ILLUSTRAZIONE — ordine 2 sempre (sotto su mobile, a destra su desktop) */}
        <div className="order-2 md:col-span-3 relative w-full h-90 md:h-125">
          <Image
            src="/Hero-BStudent.png"
            alt="Studente che usa BStudent"
            fill
            className="object-contain"
          />

          {/* Esercizio completato + XP */}
          <div className="absolute top-[4%] right-[4%] flex items-center gap-2 bg-white rounded-2xl shadow-lg px-4 py-2.5 animate-float">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 shrink-0">
              <CheckIcon className="text-white" width={14} height={14} />
            </span>
            <span className="font-semibold text-emerald-700 text-sm">
              Esercizio completato!
            </span>
            <span className="ml-1 text-xs font-bold text-amber-600 bg-amber-100 rounded-full px-2 py-0.5">
              +20 XP
            </span>
          </div>

          {/* Livello 3 */}
          <div
            className="absolute top-[26%] right-0 w-52 bg-white rounded-2xl shadow-lg px-4 py-3 animate-float"
            style={{ animationDelay: "0.6s", animationDuration: "5.5s" }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-amber-100 shrink-0">
                🛡️
              </span>
              <span className="font-semibold text-heading text-sm">
                Livello {level}
              </span>
            </div>
            <div className="h-1.5 w-full bg-neutral-200 rounded-full overflow-hidden mb-1">
              <div
                className="h-full bg-brand-primary rounded-full"
                style={{ width: `${(currentXp / targetXp) * 100}%` }}
              />
            </div>
            <p className="text-xs text-fg-secondary">
              {currentXp} / {targetXp} XP
            </p>
          </div>

          {/* Skill in crescita */}
          <div
            className="absolute bottom-[2%] right-0 w-64 bg-white rounded-2xl shadow-lg px-4 py-4 animate-float"
            style={{ animationDelay: "1.1s", animationDuration: "6s" }}
          >
            <p className="font-semibold text-heading text-sm mb-3">
              Skill in crescita
            </p>
            <div className="flex flex-col gap-2.5">
              {skills.map((skill) => (
                <SkillBar key={skill.id} skill={skill} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
