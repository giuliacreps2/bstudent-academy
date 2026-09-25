import {
  READING_STORAGE_KEY,
  defaultReadingPreferences,
  readingFontOptions,
  readingSizeOptions,
  readingSpacingOptions,
} from "@/constants/account";
import type { ReadingPreferences } from "@/types/account";

// Le preferenze di lettura vivono in localStorage.
// TODO: quando il BE sarà pronto, salvarle anche sul profilo dello studente
// (localStorage resta come cache per evitare il "flash" al caricamento).

export function loadReadingPreferences(): ReadingPreferences {
  try {
    const raw = window.localStorage.getItem(READING_STORAGE_KEY);
    if (!raw) return defaultReadingPreferences;
    const parsed = JSON.parse(raw) as Partial<ReadingPreferences>;

    // Valori sconosciuti (es. salvati da una versione vecchia) → predefinito
    return {
      font: readingFontOptions.some((o) => o.key === parsed.font)
        ? parsed.font!
        : defaultReadingPreferences.font,
      textSize: readingSizeOptions.some((o) => o.key === parsed.textSize)
        ? parsed.textSize!
        : defaultReadingPreferences.textSize,
      spacing: readingSpacingOptions.some((o) => o.key === parsed.spacing)
        ? parsed.spacing!
        : defaultReadingPreferences.spacing,
    };
  } catch {
    return defaultReadingPreferences;
  }
}

export function saveReadingPreferences(preferences: ReadingPreferences) {
  try {
    window.localStorage.setItem(
      READING_STORAGE_KEY,
      JSON.stringify(preferences),
    );
  } catch {
    // localStorage non disponibile (es. navigazione privata): la scelta vale solo per la sessione
  }
}

export function applyReadingPreferences(preferences: ReadingPreferences) {
  const root = document.documentElement;
  root.dataset.readingFont = preferences.font;
  root.dataset.readingSize = preferences.textSize;
  root.dataset.readingSpacing = preferences.spacing;
}
