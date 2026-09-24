import type { BlogCategoryKey } from "./blog";

export type ArticleBlockType =
  | "heading"
  | "paragraph"
  | "quote"
  | "callout"
  | "image"
  | "list";

export interface HeadingBlock {
  type: "heading";
  id: string;
  /** es. "01" — opzionale, l'Admin può lasciarlo vuoto per un titolo senza numerazione */
  number?: string;
  text: string;
}

export interface ParagraphBlock {
  type: "paragraph";
  id: string;
  text: string;
}

export interface QuoteBlock {
  type: "quote";
  id: string;
  text: string;
  author?: string;
}

export interface CalloutBlock {
  type: "callout";
  id: string;
  /** emoji impostata dall'Admin, es. "💡" — con fallback nel componente */
  icon?: string;
  text: string;
}

export interface ImageBlock {
  type: "image";
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface ListBlock {
  type: "list";
  id: string;
  items: string[];
  ordered?: boolean;
}

export type ArticleBlock =
  | HeadingBlock
  | ParagraphBlock
  | QuoteBlock
  | CalloutBlock
  | ImageBlock
  | ListBlock;

export interface ArticleAuthor {
  name: string;
  avatarUrl: string;
}

export interface ArticlePageData {
  slug: string;
  title: string;
  subtitle?: string;
  coverUrl: string;
  category: BlogCategoryKey;
  author: ArticleAuthor;
  publishedAt: string; // già formattata lato BE, es. "12 settembre 2025"
  readingMinutes: number;
  content: ArticleBlock[];
  isSavedToNotebook: boolean;
}
