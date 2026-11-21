import type { ComponentType, SVGProps } from "react";

/*
 * Risorse = attrezzi della Palestra (blueprint §7.4, deciso il 14/11/2026).
 * Fatto il 21/11/2026: pagine nell'area riservata (/my/exercises/resources) con i dati del backend
 * (lib/resources-server.ts), lucchetto premium, materie dal backend, ricerca nella materia scelta,
 * "Approfondisci" nascosto. La copia con gli elementi SEO resta in app/SEO_criteria/resources con i dati di esempio.
 * TODO:
 * - "Percorso consigliato" (RecommendedPathData) porta al test di orientamento (§8.1): nascosto finché la pagina
 *   del test non esiste.
 * - "Salva nel Quaderno": nascosto finché il backend non salva i segnalibri (INotebookService). Nel Quaderno la
 *   Risorsa salvata è un segnalibro, separato dagli appunti.
 */
/** Slug della materia (dal backend; "latino" | "greco" nei dati di esempio) */
export type ResourceSubjectKey = string;

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
  /** Chiave scelta dall'autrice (ResourceIconKey); una chiave sconosciuta usa l'icona generica */
  icon: string;
  href: string;
  /** Risorsa premium e studente senza abbonamento */
  locked?: boolean;
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
  href: string;
  locked?: boolean;
}

export interface ResourceSubjectContent {
  popular: PopularResource[];
  categories: ResourceCategoryCard[];
  /** Assente = card nascosta */
  recommendedPath?: RecommendedPathData;
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

/** Dati di esempio di tutte le materie insieme (solo copia SEO_criteria) */
export interface ResourcesHubData {
  hero: ResourcesHeroData;
  content: Record<ResourceSubjectKey, ResourceSubjectContent>;
  notebook: ResourcesNotebookData;
}

/** Pagina principale delle Risorse di una materia */
export interface ResourcesPageData {
  hero: ResourcesHeroData;
  notebook: ResourcesNotebookData;
  /** Materie tra cui scegliere; con una sola materia il selettore non compare */
  subjects: ResourceSubjectMeta[];
  subject: ResourceSubjectKey;
  /** null = nessuna Risorsa pubblicata nella materia */
  content: ResourceSubjectContent | null;
  /** Presente quando si cerca o si apre una categoria: prende il posto delle sezioni */
  results?: ResourceResults;
}

/* ================================ RICERCA =============================== */

export interface ResourceSearchResult {
  id: string;
  title: string;
  description: string;
  subject: ResourceSubjectKey;
  category?: ResourceCategoryKey;
  href: string;
  locked?: boolean;
}

/** Elenco dei risultati di una ricerca o di una categoria */
export interface ResourceResults {
  title: string;
  items: ResourceSearchResult[];
  emptyText: string;
  /** Torna alla pagina principale della materia */
  backHref: string;
  /** Testo già cercato, per riempire la barra di ricerca */
  query?: string;
}
