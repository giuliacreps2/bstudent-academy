import type { ComponentType, SVGProps } from "react";

/*
 * TODO (blueprint §7.4, deciso il 14/11/2026). Le Risorse sono attrezzi della Palestra:
 * - Spostare le pagine da /resources (pubblico) all'area riservata; togliere SEO, generateStaticParams e la
 *   variante "non autenticato" di ResourcesNotebookData. La versione SEO resta in app/SEO_criteria/resources.
 * - Ogni risorsa è free o premium: aggiungere il lucchetto premium a card e pagina.
 * - ResourceSubjectKey fisso → slug delle materie dal backend.
 * - Categorie: elenco fisso separato dalle skill (va bene ResourceCategoryKey).
 * - PopularResource ("Le risorse più usate"): scelte dall'autrice finché non c'è l'uso reale; icona da elenco fisso.
 * - RecommendedPathData ("Percorso consigliato"): porta al test di orientamento (§8.1).
 * - Ricerca: solo Risorse della materia scelta, titolo e descrizione.
 * - Dettaglio (types/resourceDetail.ts): exerciseLink dall'argomento della Palestra, nascosto se non ci sono voci;
 *   related ("Approfondisci") NON visibile nell'MVP.
 * - "Salva" resta (solo iscritti), ma Risorse = libro e Quaderno = appunti: la Risorsa salvata compare nel Quaderno
 *   come segnalibro (collegamento), separata dagli appunti. Rivedere il testo di ResourcesNotebookData di conseguenza.
 */
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
