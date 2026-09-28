import type { ComponentType, SVGProps } from "react";

export type ResourceSubjectKey = "latino" | "greco";

export type ResourceCategoryKey =
  | "grammatica"
  | "verbi"
  | "traduzione"
  | "vocabolario";

export type ResourceColor = "pink" | "green" | "purple" | "orange" | "blue";

/** Icona della card "pergamena" (risorse più usate) */
export type ResourceIconKey =
  | "declinazioni"
  | "verbi"
  | "complementi"
  | "pronomi"
  | "vocabolario"
  | "alfabeto"
  | "articolo";

type IconComponent = ComponentType<SVGProps<SVGSVGElement>>;

/* ============================ META (constants) ============================ */

export interface ResourceSubjectMeta {
  key: ResourceSubjectKey;
  label: string;
}

export interface ResourceCategoryMeta {
  key: ResourceCategoryKey;
  label: string;
  color: ResourceColor;
  icon: IconComponent;
}

export interface ResourceColorStyle {
  iconBg: string;
  iconText: string;
  badgeBg: string;
  badgeText: string;
}

export type ResourceIconMap = Record<ResourceIconKey, IconComponent>;

/* ============================== CONTENUTI =============================== */

/** Card pergamena: singolo strumento importante */
export interface PopularResource {
  id: string;
  title: string;
  description: string;
  icon: ResourceIconKey;
  href: string; // /risorse/[id]
}

/** Card bianca: macro-categoria (label/icona/colore vengono da resourceCategoriesMeta) */
export interface ResourceCategoryCard {
  category: ResourceCategoryKey;
  description: string;
  href: string;
}

export interface RecommendedPathData {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

/** Card editoriale: niente data/autore/tempo di lettura, per non somigliare al Blog */
export interface FeaturedResource {
  id: string;
  category: ResourceCategoryKey;
  title: string;
  description: string;
  imageUrl: string;
  href: string; // /risorse/[id]
}

export interface ResourceSubjectContent {
  popular: PopularResource[];
  categories: ResourceCategoryCard[];
  recommendedPath: RecommendedPathData;
  featured: FeaturedResource[];
}

/* ================================ PAGINA ================================ */

export interface ResourcesHeroData {
  eyebrow: string; // "RISORSE"
  titleLead: string; // "Tutto quello che ti serve,"
  titleHighlight: string; // "quando ti serve." (sottolineatura rosa)
  description: string;
  imageUrl: string;
  imageAlt: string;
  /** Le tre parole sulla pergamena decorativa: Studia. Consulta. Approfondisci. */
  scrollWords: string[];
  searchPlaceholder: string;
  searchButtonLabel: string;
}

export interface ResourcesNotebookData {
  title: string;
  description: string;
  benefits: string[];
  ctaLabel: string;
  ctaHref: string;
  /** Variante mostrata se lo studente è già autenticato */
  loggedIn: {
    title: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export interface ResourcesHubData {
  hero: ResourcesHeroData;
  content: Record<ResourceSubjectKey, ResourceSubjectContent>;
  notebook: ResourcesNotebookData;
}

/* ================================ RICERCA =============================== */

export interface ResourceSearchResult {
  id: string;
  title: string;
  description: string;
  subject: ResourceSubjectKey;
  category?: ResourceCategoryKey;
  href: string;
}
