"use client";

import Image from "next/image";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useCharacter } from "./CharacterContext";

export function CharacterHero() {
  const {
    character,
    selectedCharacterId,
    equipCharacter,
    isViewedCharacterEquipped,
    previewedStage,
    isViewingPastStage,
    setPreviewedStageId,
  } = useCharacter();

  const lastReachedId = [...character.evolutionStages]
    .reverse()
    .find((s) => s.reached)?.id;

  return (
    <div className="relative flex h-full min-h-125 flex-col overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-b from-surface-blue via-white to-surface-blue">
      <div className="relative flex-1">
        <Image
          key={previewedStage.id}
          src={previewedStage.portraitUrl ?? "/placeholder-skin.png"}
          alt={character.name}
          fill
          priority
          className="object-contain object-bottom"
        />
      </div>

      {/* Overlay in alto: nome + stadio */}
      <div className="pointer-events-none absolute inset-x-0 top-0 p-5 sm:p-7">
        <div className="pointer-events-auto max-w-xs rounded-2xl border border-white/70 bg-white/90 px-5 py-4 shadow-[0_14px_35px_rgba(23,32,51,0.10)] backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-primary">
            Il mio personaggio
          </p>
          <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground">
            {character.name}
          </h1>
          <p className="mt-1 text-sm font-bold text-brand-secondary">
            {previewedStage.label}
          </p>
          <p className="mt-2 text-xs leading-5 text-brand-muted">
            Ogni missione fa evolvere il tuo personaggio.
          </p>

          {isViewingPastStage && lastReachedId && (
            <button
              type="button"
              onClick={() => setPreviewedStageId(lastReachedId)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary hover:underline"
            >
              <ArrowUturnLeftIcon className="h-3.5 w-3.5" />
              Torna allo stadio attuale
            </button>
          )}
        </div>
      </div>

      {/* Equip button */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <div className="pointer-events-auto flex justify-end">
          <button
            type="button"
            onClick={() => equipCharacter(selectedCharacterId)}
            disabled={isViewedCharacterEquipped}
            className="btn-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isViewedCharacterEquipped
              ? "Personaggio equipaggiato ✓"
              : "Equipaggia"}
          </button>
        </div>
      </div>
    </div>
  );
}
