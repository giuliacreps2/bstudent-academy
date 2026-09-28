import type { ComponentType, SVGProps } from "react";
import type { ArticleBlock } from "@/types/article";
import type {
  ResourceCategoryKey,
  ResourceSubjectKey,
} from "@/types/resources";
import type { SkillKey } from "@/types/skills";

/* ===================== NAVIGAZIONE INTERNA (anchor) ===================== */

/** Non sono pagine: sono ancore della stessa risorsa. */
export type ResourceSectionKey =
  | "panoramica"
  | "tabella"
  | "spiegazione"
  | "esempi"
  | "esercizi";

export interface ResourceSectionMeta {
  key: ResourceSectionKey;
  label: string;
}

/* ============================== IN BREVE ============================== */

export interface ResourceSummary {
  /** 2–4 righe al massimo, leggibile in 10 secondi */
  text: string;
  /** Mini esempio evidenziato, es. lex, legis → legge */
  example?: {
    term: string;
    translation: string;
  };
}

/* ========================== STRUMENTO PRINCIPALE ========================= */

/** Una variante = un set di righe selezionabile dal toggle (es. Tema consonantico | Tema in -i) */
export interface ResourceTableVariant {
  id: string;
  label: string;
  columns: string[]; // es. ["Caso", "Singolare", "Plurale"]
  rows: string[][]; // ogni riga ha tanti valori quante colonne
  note?: string;
}

/** Union pensata per crescere: oggi solo tabelle, domani altri strumenti. */
export interface ResourceTableTool {
  type: "table";
  title: string;
  variants: ResourceTableVariant[];
}

export type ResourceTool = ResourceTableTool;

/* ============================ APPROFONDIMENTI ============================ */

/** Accordion: il contenuto riusa i blocchi già usati dagli articoli. */
export interface ResourceInsight {
  id: string;
  title: string;
  blocks: ArticleBlock[];
  defaultOpen?: boolean;
}

/* ================================ ESEMPI ================================ */

export interface ResourceExample {
  id: string;
  term: string; // es. "lex, legis"
  grammar: string; // es. "(f.)"
  sentence: string;
  translation: string;
}

/* ========================= COLLEGAMENTO ESERCIZI ========================= */

export interface ResourceExerciseLink {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  /** Una risorsa può essere collegata a una o più skill / categorie / topic */
  skills: SkillKey[];
  topics: string[];
}

/* ============================== APPROFONDISCI ============================ */

export type ResourceRelatedKind = "resource" | "article" | "exercises";

export interface ResourceRelatedKindMeta {
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export interface ResourceRelatedLink {
  id: string;
  kind: ResourceRelatedKind;
  label: string;
  href: string;
}

/* ================================ PAGINA ================================ */

export interface ResourceDetailData {
  id: string;
  slug: string;
  subject: ResourceSubjectKey;
  category: ResourceCategoryKey;
  title: string;
  description: string;
  /** Solo se autenticato: già salvata nel Quaderno */
  isSaved: boolean;

  summary: ResourceSummary;

  /* Composabile: non tutte le risorse hanno tutte le sezioni */
  tool?: ResourceTool;
  insights?: ResourceInsight[];
  examples?: ResourceExample[];
  exerciseLink?: ResourceExerciseLink;

  related: ResourceRelatedLink[];
}
