"use client";

import Image from "next/image";
import { ChevronRightIcon, CheckIcon } from "@heroicons/react/24/solid";
import { useCharacter } from "./CharacterContext";

export function CharacterEvolutionStrip() {
  const { character, previewedStageId, setPreviewedStageId } = useCharacter();
  const stages = [...character.evolutionStages].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
      <div className="mb-5">
        <p className="text-lg font-extrabold text-foreground">
          Il percorso di {character.name}
        </p>
        <p className="mt-0.5 text-sm text-brand-muted">
          Ogni missione fa evolvere il tuo personaggio.
        </p>
      </div>

      <div className="flex items-center gap-1 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:justify-center sm:gap-2">
        {stages.map((stage, index) => {
          const isSelected = stage.id === previewedStageId;
          const isLocked = !stage.reached;

          return (
            <div
              key={stage.id}
              className="flex shrink-0 items-center gap-1 sm:gap-2"
            >
              <button
                type="button"
                onClick={() => stage.reached && setPreviewedStageId(stage.id)}
                disabled={isLocked}
                aria-pressed={isSelected}
                className="group flex w-24 shrink-0 flex-col items-center gap-2 disabled:cursor-not-allowed"
              >
                <div
                  className={`relative h-20 w-20 overflow-hidden rounded-full border-2 transition ${
                    isSelected
                      ? "border-brand-primary ring-4 ring-brand-primary/15"
                      : isLocked
                        ? "border-border"
                        : "border-transparent group-hover:border-brand-primary/40"
                  }`}
                >
                  {stage.thumbnailUrl ? (
                    <Image
                      src={stage.thumbnailUrl}
                      alt={stage.label}
                      fill
                      className={`object-cover object-top ${isLocked ? "grayscale brightness-75" : ""}`}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-surface-blue text-2xl text-brand-muted">
                      ?
                    </div>
                  )}
                  {stage.reached && (
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-success ring-2 ring-white">
                      <CheckIcon className="h-3 w-3 text-white" />
                    </span>
                  )}
                </div>

                <span
                  className={`text-center text-xs font-bold leading-tight ${isLocked ? "text-brand-muted" : "text-foreground"}`}
                >
                  {stage.label}
                </span>

                {isLocked && (
                  <span className="text-center text-[10px] leading-tight text-brand-muted">
                    Continua il viaggio per scoprirla.
                  </span>
                )}
              </button>

              {index < stages.length - 1 && (
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-brand-muted" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
