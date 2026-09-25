"use client";

import type { ComponentType, SVGProps } from "react";
import {
  UserIcon,
  SwatchIcon,
  GiftIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { useCharacter } from "./CharacterContext";
import type { CharacterSectionKey } from "@/types/character";

const sections: {
  key: CharacterSectionKey;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}[] = [
  { key: "aspetto", label: "Aspetto", icon: SwatchIcon },
  { key: "accessori", label: "Accessori", icon: GiftIcon },
  { key: "evoluzioni", label: "Evoluzioni", icon: SparklesIcon },
];

export function CharacterControls() {
  const { activeSection, setActiveSection } = useCharacter();

  return (
    <div className="rounded-2xl border border-border bg-surface p-3 lg:sticky lg:top-20">
      <div className="mb-1 flex items-center gap-2 px-2 py-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10">
          <UserIcon className="h-4 w-4 text-brand-primary" />
        </span>
        <p className="text-sm font-extrabold text-foreground">Personaggio</p>
      </div>

      {/* MOBILE: pillole scorrevoli */}
      <div className="flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:hidden">
        {sections.map(({ key, label, icon: Icon }) => {
          const active = activeSection === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveSection(key)}
              aria-pressed={active}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-pill px-4 py-2.5 text-sm font-bold transition ${
                active
                  ? "bg-brand-primary text-white"
                  : "border border-border bg-white text-foreground hover:border-brand-primary/40"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          );
        })}
      </div>

      {/* DESKTOP: lista verticale compatta */}
      <div className="hidden space-y-1 lg:block">
        {sections.map(({ key, label, icon: Icon }) => {
          const active = activeSection === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveSection(key)}
              aria-pressed={active}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-brand-primary/10 text-brand-primary"
                  : "text-foreground hover:bg-surface-blue hover:text-brand-primary"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
