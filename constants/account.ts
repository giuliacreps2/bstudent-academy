import {
  UserCircleIcon,
  ShieldCheckIcon,
  BellIcon,
  EyeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
import type {
  AccountSectionKey,
  ReadingFont,
  ReadingPreferences,
  ReadingSpacing,
  ReadingTextSize,
} from "@/types/account";

/* ===== Sezioni ===== */

export interface AccountSectionMeta {
  key: AccountSectionKey;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const accountSections: AccountSectionMeta[] = [
  { key: "profilo", label: "Profilo", icon: UserCircleIcon },
  { key: "account", label: "Account e sicurezza", icon: ShieldCheckIcon },
  { key: "notifiche", label: "Notifiche", icon: BellIcon },
  { key: "accessibilita", label: "Accessibilità", icon: EyeIcon },
  { key: "privacy", label: "Privacy", icon: LockClosedIcon },
];

export const defaultAccountSection: AccountSectionKey = "profilo";

export function isAccountSection(value?: string): value is AccountSectionKey {
  return accountSections.some((section) => section.key === value);
}

/* ===== Preferenze di lettura ===== */

export const READING_STORAGE_KEY = "bstudent-reading";

export const defaultReadingPreferences: ReadingPreferences = {
  font: "standard",
  textSize: "md",
  spacing: "standard",
};

export const readingFontOptions: {
  key: ReadingFont;
  label: string;
  description: string;
  /** Usato per l'anteprima reale del font nella card */
  fontFamily: string;
}[] = [
  {
    key: "standard",
    label: "Standard",
    description: "Il font che usi ogni giorno su BStudent.",
    fontFamily: "var(--font-brand)",
  },
  {
    key: "high-readability",
    label: "Alta leggibilità",
    description:
      "Lettere ben distinguibili, pensato per chi ha difficoltà visive.",
    fontFamily: "var(--font-atkinson), system-ui, sans-serif",
  },
  {
    key: "dyslexia",
    label: "Font per dislessia",
    description:
      "OpenDyslexic: lettere con la base più pesante, che restano ferme.",
    fontFamily: '"OpenDyslexic", var(--font-brand), sans-serif',
  },
];

export const readingSizeOptions: {
  key: ReadingTextSize;
  label: string;
  ariaLabel: string;
  /** classe Tailwind per la lettera nel pulsante */
  letterClass: string;
}[] = [
  {
    key: "sm",
    label: "A−",
    ariaLabel: "Testo più piccolo",
    letterClass: "text-sm",
  },
  {
    key: "md",
    label: "A",
    ariaLabel: "Testo standard",
    letterClass: "text-base",
  },
  {
    key: "lg",
    label: "A+",
    ariaLabel: "Testo più grande",
    letterClass: "text-xl",
  },
];

export const readingSpacingOptions: {
  key: ReadingSpacing;
  label: string;
}[] = [
  { key: "standard", label: "Standard" },
  { key: "wide", label: "Ampia" },
];

/**
 * Script eseguito prima dell'hydration (vedi app/layout.tsx): applica subito le
 * preferenze salvate, così il testo non "salta" dal font standard a quello scelto.
 */
export const readingInitScript = `try{var p=JSON.parse(localStorage.getItem("${READING_STORAGE_KEY}")||"{}");var d=document.documentElement;d.dataset.readingFont=p.font||"standard";d.dataset.readingSize=p.textSize||"md";d.dataset.readingSpacing=p.spacing||"standard"}catch(e){}`;
