import {
  BookOpenIcon,
  DocumentTextIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import type {
  ResourceRelatedKind,
  ResourceRelatedKindMeta,
  ResourceSectionKey,
  ResourceSectionMeta,
} from "@/types/resourceDetail";

/* ===== Navigazione interna: Panoramica · Tabella · Spiegazione · Esempi · Esercizi ===== */

export const resourceSectionsMeta: Record<
  ResourceSectionKey,
  ResourceSectionMeta
> = {
  panoramica: { key: "panoramica", label: "Panoramica" },
  tabella: { key: "tabella", label: "Tabella" },
  spiegazione: { key: "spiegazione", label: "Spiegazione" },
  esempi: { key: "esempi", label: "Esempi" },
  esercizi: { key: "esercizi", label: "Esercizi" },
};

export const resourceSectionOrder: ResourceSectionKey[] = [
  "panoramica",
  "tabella",
  "spiegazione",
  "esempi",
  "esercizi",
];

/** Id HTML delle sezioni: usato sia dalle ancore sia dallo scroll-spy. */
export function resourceSectionId(key: ResourceSectionKey) {
  return `risorsa-${key}`;
}

/* ===== Approfondisci: icona per tipo di collegamento ===== */

export const resourceRelatedKindMeta: Record<
  ResourceRelatedKind,
  ResourceRelatedKindMeta
> = {
  resource: { label: "Risorsa", icon: BookOpenIcon },
  article: { label: "Articolo", icon: DocumentTextIcon },
  exercises: { label: "Esercizi", icon: PuzzlePieceIcon },
};

/** Altezza (in px) da lasciare sotto la barra sticky quando si scorre a una sezione. */
export const RESOURCE_NAV_OFFSET = 96;
