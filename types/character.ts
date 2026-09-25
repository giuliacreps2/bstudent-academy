import type { SkinBonus } from "@/types/dashboard";

/* ============================ ROSTER ============================ */

export type CharacterOwnershipStatus = "selected" | "unlocked" | "locked";

export interface RosterCharacter {
  id: string;
  slug: string;
  name: string;
  thumbnailUrl: string;
  status: CharacterOwnershipStatus;
  /** Solo per i personaggi bloccati, es. "Prossimamente", "Si sblocca al livello 20" */
  unlockHint?: string;
}

/* ==================== ASPETTO / ACCESSORI ==================== */

export type CustomizationItemStatus =
  | "equipped"
  | "unlocked"
  | "locked"
  | "new";

export interface CustomizationItem {
  id: string;
  label: string;
  thumbnailUrl: string;
  status: CustomizationItemStatus;
  /** Solo se status = "locked", es. "Si sblocca al livello 10" */
  unlockHint?: string;
}

export type AppearanceCategoryKey = "skin" | "capelli" | "abiti" | "colori";

export interface AppearanceCategory {
  key: AppearanceCategoryKey;
  label: string;
  items: CustomizationItem[];
}

export interface AccessorySlot {
  id: string;
  label: string; // es. "Zaino", "Copricapo", "Mantello"
  items: CustomizationItem[];
}

/* ========================= EVOLUZIONE ========================= */

export interface EvolutionStage {
  id: string;
  order: number;
  label: string; // "Base", "Evoluzione I", "Evoluzione II", "Prossima evoluzione"
  reached: boolean;
  /** Immagine intera per l'hero — presente solo se reached */
  portraitUrl?: string;
  /** Miniatura per la striscia in basso — assente = silhouette bloccata */
  thumbnailUrl?: string;
}

/* ===================== DETTAGLIO PERSONAGGIO ===================== */

export interface CharacterDetail {
  id: string;
  name: string;
  /** Descrizione breve (2 righe) accanto al nome nell'hero */
  tagline: string;
  /** Motto/citazione, es. "Discere semper progressus est." */
  quote: string;
  appearance: AppearanceCategory[];
  accessories: AccessorySlot[];
  evolutionStages: EvolutionStage[];
  /** Bonus attivi da skin/accessori equipaggiati — riusa il tipo già usato in dashboard/esercizi */
  bonuses: SkinBonus[];
}

/* ============================ SEZIONE ============================ */

export type CharacterSectionKey = "aspetto" | "accessori" | "evoluzioni";

/* ============================ PAGINA ============================ */

export interface CharacterPageData {
  roster: RosterCharacter[];
  /** Dettaglio completo per ogni personaggio del roster, indicizzato per id — evita refetch al cambio selezione */
  characters: Record<string, CharacterDetail>;
}
