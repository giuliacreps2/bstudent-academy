"use client";

import Image from "next/image";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useCharacter } from "./CharacterContext";
import type {
  RosterCharacter,
  CustomizationItem,
  AppearanceCategoryKey,
} from "@/types/character";

const appearanceTabLabels: Record<AppearanceCategoryKey, string> = {
  skin: "Skin",
  capelli: "Capelli",
  abiti: "Abiti",
  colori: "Colori",
};

function RosterAvatar({ item }: { item: RosterCharacter }) {
  const { selectedCharacterId, selectCharacter, equippedCharacterId } =
    useCharacter();
  const isSelected = item.id === selectedCharacterId;
  const isEquipped = item.id === equippedCharacterId;
  const isLocked = item.status === "locked";

  return (
    <button
      type="button"
      onClick={() => selectCharacter(item.id)}
      disabled={isLocked}
      aria-pressed={isSelected}
      className={`flex w-22 shrink-0 flex-col items-center gap-1.5 rounded-2xl border-2 p-2 transition disabled:cursor-not-allowed ${
        isSelected
          ? "border-brand-primary bg-surface-blue"
          : "border-transparent hover:border-border"
      }`}
    >
      <div className="relative h-14 w-14 overflow-hidden rounded-full bg-surface-blue">
        <Image
          src={item.thumbnailUrl}
          alt={item.name}
          fill
          className={`object-cover object-top ${isLocked ? "grayscale" : ""}`}
        />
        {isLocked && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/30">
            <LockClosedIcon className="h-4 w-4 text-white" />
          </span>
        )}
        {isEquipped && !isLocked && (
          <span className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-success ring-2 ring-white">
            <CheckIcon className="h-2.5 w-2.5 text-white" />
          </span>
        )}
      </div>
      <span
        className={`w-full truncate text-center text-[11px] font-bold ${isLocked ? "text-brand-muted" : "text-foreground"}`}
      >
        {item.name}
      </span>
    </button>
  );
}

const statusBadge: Partial<
  Record<CustomizationItem["status"], { label: string; className: string }>
> = {
  equipped: { label: "Equipaggiato", className: "bg-brand-primary text-white" },
  new: { label: "Nuovo", className: "bg-brand-secondary text-white" },
};

// TODO: onSelect/equip da collegare quando sarà pronta l'azione lato personaggio
function CustomizationItemCard({ item }: { item: CustomizationItem }) {
  const isLocked = item.status === "locked";
  const badge = statusBadge[item.status];

  return (
    <div
      className={`relative flex flex-col items-center gap-2 rounded-xl border p-3 text-center ${
        item.status === "equipped"
          ? "border-brand-primary bg-surface-blue"
          : "border-border bg-white"
      } ${isLocked ? "opacity-70" : ""}`}
    >
      {badge && (
        <span
          className={`absolute left-2 top-2 rounded-pill px-2 py-0.5 text-[10px] font-bold ${badge.className}`}
        >
          {badge.label}
        </span>
      )}

      <div className="relative h-16 w-16 overflow-hidden rounded-full bg-surface-blue">
        <Image
          src={item.thumbnailUrl}
          alt={item.label}
          fill
          className={`object-cover ${isLocked ? "grayscale" : ""}`}
        />
        {isLocked && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/30">
            <LockClosedIcon className="h-4 w-4 text-white" />
          </span>
        )}
      </div>

      <span className="text-xs font-bold text-foreground">{item.label}</span>

      {isLocked && item.unlockHint && (
        <span className="text-[10px] leading-tight text-brand-muted">
          {item.unlockHint}
        </span>
      )}
    </div>
  );
}

function AppearancePanel() {
  const { character, activeAppearanceTab, setActiveAppearanceTab } =
    useCharacter();
  const activeCategory = character.appearance.find(
    (c) => c.key === activeAppearanceTab,
  );

  return (
    <div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {character.appearance.map((category) => {
          const active = category.key === activeAppearanceTab;
          return (
            <button
              key={category.key}
              type="button"
              onClick={() => setActiveAppearanceTab(category.key)}
              aria-pressed={active}
              className={`shrink-0 rounded-pill px-4 py-2 text-sm font-bold transition ${
                active
                  ? "bg-brand-primary text-white"
                  : "border border-border bg-white text-foreground hover:border-brand-primary/40"
              }`}
            >
              {appearanceTabLabels[category.key]}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        {activeCategory && activeCategory.items.length > 0 ? (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {activeCategory.items.map((item) => (
              <CustomizationItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-surface-blue p-6 text-center">
            <p className="text-sm font-semibold text-foreground">
              {appearanceTabLabels[activeAppearanceTab]} in arrivo
            </p>
            <p className="mt-1 text-sm text-brand-muted">
              Stiamo lavorando per aggiungere presto nuove opzioni.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function AccessoriesPanel() {
  const { character } = useCharacter();

  if (character.accessories.length === 0) {
    return (
      <div className="rounded-lg bg-surface-blue p-6 text-center">
        <p className="text-sm font-semibold text-foreground">
          Nessun accessorio disponibile
        </p>
        <p className="mt-1 text-sm text-brand-muted">
          Continua il percorso per sbloccarne di nuovi.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {character.accessories.map((slot) => (
        <div key={slot.id}>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-muted">
            {slot.label}
          </p>
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
            {slot.items.map((item) => (
              <CustomizationItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function EvolutionsPanel() {
  const { character, previewedStageId, setPreviewedStageId } = useCharacter();
  const stages = [...character.evolutionStages].sort(
    (a, b) => a.order - b.order,
  );

  return (
    <div>
      <p className="mb-4 text-sm leading-6 text-brand-muted">
        Guarda il percorso completo in fondo alla pagina, oppure scegli qui
        sotto uno stadio già raggiunto per rivederlo.
      </p>

      <ul className="space-y-2">
        {stages.map((stage) => {
          const isSelected = stage.id === previewedStageId;
          const isLocked = !stage.reached;

          return (
            <li key={stage.id}>
              <button
                type="button"
                onClick={() => stage.reached && setPreviewedStageId(stage.id)}
                disabled={isLocked}
                aria-pressed={isSelected}
                className={`flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition disabled:cursor-not-allowed ${
                  isSelected
                    ? "bg-surface-blue text-brand-primary"
                    : isLocked
                      ? "text-brand-muted"
                      : "text-foreground hover:bg-surface-blue"
                }`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-current text-xs font-bold">
                  {stage.reached ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    <LockClosedIcon className="h-3.5 w-3.5" />
                  )}
                </span>
                <span className="flex-1 text-sm font-semibold">
                  {stage.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function CharacterSelection() {
  const { data, activeSection } = useCharacter();

  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-sm font-bold text-foreground">
          I tuoi personaggi
        </p>
        <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {data.roster.map((item) => (
            <RosterAvatar key={item.id} item={item} />
          ))}
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
        {activeSection === "aspetto" && <AppearancePanel />}
        {activeSection === "accessori" && <AccessoriesPanel />}
        {activeSection === "evoluzioni" && <EvolutionsPanel />}
      </div>
    </div>
  );
}
