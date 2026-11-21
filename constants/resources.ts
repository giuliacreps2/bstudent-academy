import {
  ArrowPathIcon,
  ArrowsRightLeftIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  ChatBubbleLeftRightIcon,
  LanguageIcon,
  ListBulletIcon,
  PuzzlePieceIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import type {
  ResourceCategoryKey,
  ResourceCategoryMeta,
  ResourceColor,
  ResourceColorStyle,
  ResourceIconMap,
  ResourceSubjectKey,
  ResourceSubjectMeta,
} from "@/types/resources";

/* ===== Materie (selettore Latino | Greco) ===== */

export const resourceSubjectsMeta: Record<
  ResourceSubjectKey,
  ResourceSubjectMeta
> = {
  latino: { key: "latino", label: "Latino" },
  greco: { key: "greco", label: "Greco" },
};

export const resourceSubjectOrder: ResourceSubjectKey[] = ["latino", "greco"];

export const defaultResourceSubject: ResourceSubjectKey = "latino";

export function isResourceSubject(value?: string): value is ResourceSubjectKey {
  return resourceSubjectOrder.some((key) => key === value);
}

/* ===== Categorie (card bianche) ===== */

// Unica fonte di verità: label, colore e icona di ogni categoria.
export const resourceCategoriesMeta: Record<
  ResourceCategoryKey,
  ResourceCategoryMeta
> = {
  grammatica: {
    key: "grammatica",
    label: "Grammatica",
    color: "pink",
    icon: BuildingLibraryIcon,
  },
  verbi: {
    key: "verbi",
    label: "Verbi",
    color: "green",
    icon: ArrowPathIcon,
  },
  traduzione: {
    key: "traduzione",
    label: "Traduzione",
    color: "orange",
    icon: ArrowsRightLeftIcon,
  },
  vocabolario: {
    key: "vocabolario",
    label: "Vocabolario",
    color: "purple",
    icon: BookOpenIcon,
  },
};

export const resourceCategoryOrder: ResourceCategoryKey[] = [
  "grammatica",
  "verbi",
  "traduzione",
  "vocabolario",
];

export const resourceColorStyles: Record<ResourceColor, ResourceColorStyle> = {
  pink: {
    iconBg: "bg-pink-50",
    iconText: "text-pink-600",
    badgeBg: "bg-pink-50",
    badgeText: "text-pink-700",
  },
  green: {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
  },
  purple: {
    iconBg: "bg-violet-50",
    iconText: "text-violet-600",
    badgeBg: "bg-violet-50",
    badgeText: "text-violet-700",
  },
  orange: {
    iconBg: "bg-amber-50",
    iconText: "text-amber-600",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
  },
  blue: {
    iconBg: "bg-sky-50",
    iconText: "text-sky-600",
    badgeBg: "bg-sky-50",
    badgeText: "text-sky-700",
  },
};

/* ===== Icone delle card pergamena ===== */

export const resourceIcons: ResourceIconMap = {
  declinazioni: TableCellsIcon,
  verbi: ListBulletIcon,
  complementi: PuzzlePieceIcon,
  pronomi: ChatBubbleLeftRightIcon,
  vocabolario: BookOpenIcon,
  alfabeto: LanguageIcon,
  articolo: LanguageIcon,
};

/** Icona scelta dall'autrice; una chiave nuova o sconosciuta usa quella del libro */
export function toResourceIconKey(key: string): keyof ResourceIconMap {
  return key in resourceIcons ? (key as keyof ResourceIconMap) : "vocabolario";
}

/* ===== Area riservata ===== */

/** Le Risorse sono gli attrezzi della Palestra (blueprint §7.4): stanno dentro Esercizi */
export const RESOURCES_PATH = "/my/exercises/resources";

/** Pagina principale delle Risorse, con materia, categoria o ricerca facoltative */
export function resourcesHref(params: {
  subject?: string;
  category?: ResourceCategoryKey;
  query?: string;
} = {}) {
  const search = new URLSearchParams();
  if (params.subject) search.set("materia", params.subject);
  if (params.category) search.set("categoria", params.category);
  if (params.query) search.set("q", params.query);
  const qs = search.toString();
  return qs ? `${RESOURCES_PATH}?${qs}` : RESOURCES_PATH;
}

export function resourceHref(subject: string, slug: string) {
  return `${RESOURCES_PATH}/${encodeURIComponent(subject)}/${encodeURIComponent(slug)}`;
}

export function isResourceCategory(value?: string): value is ResourceCategoryKey {
  return resourceCategoryOrder.some((key) => key === value);
}

/** Descrizioni delle card delle categorie, uguali per tutte le materie */
export const resourceCategoryDescriptions: Record<ResourceCategoryKey, string> = {
  grammatica: "Declinazioni, pronomi, aggettivi, concordanze, sintassi...",
  verbi: "Coniugazioni, paradigmi, modi e tempi...",
  traduzione: "Metodo, costruzioni, riconoscimento della frase...",
  vocabolario: "Parole frequenti, espressioni, campi semantici...",
};
