import { cache } from "react";
import { ApiError } from "@/lib/api";
import { serverApi } from "@/lib/api-server";
import { topicPracticeHref } from "@/lib/practice";
import {
  isResourceCategory,
  resourceCategoriesMeta,
  resourceCategoryDescriptions,
  resourceCategoryOrder,
  resourceHref,
  resourcesHref,
} from "@/constants/resources";
import type {
  ResourceCategoryKey,
  ResourceResults,
  ResourceSearchResult,
  ResourcesHeroData,
  ResourcesNotebookData,
  ResourcesPageData,
  ResourceSubjectContent,
} from "@/types/resources";
import type {
  ResourceDetailData,
  ResourceExample,
  ResourceInsight,
  ResourceSummary,
  ResourceTool,
} from "@/types/resourceDetail";

/* =====================================================================
   Risorse dello studente dal backend (blueprint §7.4).
   Endpoint: /student/resources (StudentPracticeController). Solo con account:
   le chiamate partono dai Server Component con il cookie della sessione.
   ===================================================================== */

/* ---------------------------- Risposte del backend ---------------------------- */

interface SubjectCardDto {
  slug: string;
  name: string;
  tagline: string | null;
  imageReference: string | null;
  locked: boolean;
}

interface ResourceCardDto {
  slug: string;
  subjectSlug: string;
  title: string;
  description: string;
  category: ResourceCategoryKey;
  coverReference: string | null;
  mostUsed: boolean;
  mostUsedIcon: string | null;
  featured: boolean;
  premiumLocked: boolean;
}

interface ResourcesHubDto {
  subjects: SubjectCardDto[];
  activeSubject: SubjectCardDto | null;
  mostUsed: ResourceCardDto[];
  featured: ResourceCardDto[];
  resources: ResourceCardDto[];
}

/** Campo JSON `content` della Risorsa: ogni sezione è facoltativa */
interface ResourceContentDto {
  summaryExample?: ResourceSummary["example"];
  tool?: ResourceTool;
  insights?: ResourceInsight[];
  examples?: ResourceExample[];
}

interface ResourceDetailDto {
  resourceId: number;
  resource: ResourceCardDto;
  summaryText: string | null;
  /** null se la Risorsa è premium e lo studente non ha l'abbonamento */
  content: ResourceContentDto | null;
  topicId: number | null;
  topicName: string | null;
  hasExercises: boolean;
  saved: boolean;
}

/* ------------------------------- Testi fissi ------------------------------- */

const hero: ResourcesHeroData = {
  eyebrow: "RISORSE",
  titleLead: "Tutto quello che ti serve,",
  titleHighlight: "quando ti serve.",
  description: "Tabelle, schemi e strumenti per ripassare mentre ti alleni.",
  imageUrl: "/studente.png",
  imageAlt: "",
  scrollWords: ["Studia.", "Consulta.", "Ripassa."],
  searchPlaceholder: "Cerca una regola, una tabella, un argomento...",
  searchButtonLabel: "Cerca",
};

// Solo la variante per chi ha l'account: le Risorse stanno nell'area riservata
const notebook: ResourcesNotebookData = {
  title: "",
  description: "",
  benefits: [],
  ctaLabel: "",
  ctaHref: "",
  loggedIn: {
    title: "I tuoi appunti sono nel Quaderno",
    ctaLabel: "Apri il Quaderno",
    ctaHref: "/my/notebook",
  },
};

// TODO (Cloudinary, blueprint §5.1): costruire l'indirizzo dell'immagine da coverReference
const PLACEHOLDER_COVER = "/Hero.png";

const MIN_QUERY_LENGTH = 2;

/* -------------------------------- Pagina principale -------------------------------- */

export async function getResourcesPage(params: {
  subject?: string;
  category?: string;
  query?: string;
}): Promise<ResourcesPageData> {
  const qs = params.subject
    ? `?${new URLSearchParams({ subject: params.subject })}`
    : "";
  const hub = await serverApi<ResourcesHubDto>(`/student/resources${qs}`);

  const subjects = hub.subjects.map((s) => ({ key: s.slug, label: s.name }));
  const active = hub.activeSubject;

  if (!active) {
    return { hero, notebook, subjects, subject: "", content: null };
  }

  const subject = active.slug;
  const content = hub.resources.length > 0 ? buildContent(hub, subject) : null;
  const results = await buildResults(hub, subject, params);

  return { hero, notebook, subjects, subject, content, results };
}

function buildContent(
  hub: ResourcesHubDto,
  subject: string,
): ResourceSubjectContent {
  // Solo le categorie che hanno almeno una Risorsa, nell'ordine fisso
  const used = new Set(hub.resources.map((r) => r.category));

  return {
    popular: hub.mostUsed.map((r) => ({
      id: r.slug,
      title: r.title,
      description: r.description,
      icon: r.mostUsedIcon ?? "",
      href: resourceHref(r.subjectSlug, r.slug),
      locked: r.premiumLocked,
    })),
    categories: resourceCategoryOrder
      .filter((category) => used.has(category))
      .map((category) => ({
        category,
        description: resourceCategoryDescriptions[category],
        href: resourcesHref({ subject, category }),
      })),
    // TODO (blueprint §8.1): "Percorso consigliato" verso il test di orientamento, quando la pagina del test esiste
    recommendedPath: undefined,
    featured: hub.featured.map((r) => ({
      id: r.slug,
      category: r.category,
      title: r.title,
      description: r.description,
      imageUrl: PLACEHOLDER_COVER,
      href: resourceHref(r.subjectSlug, r.slug),
      locked: r.premiumLocked,
    })),
  };
}

async function buildResults(
  hub: ResourcesHubDto,
  subject: string,
  params: { category?: string; query?: string },
): Promise<ResourceResults | undefined> {
  const backHref = resourcesHref({ subject });
  const query = params.query?.trim();

  if (query) {
    const items =
      query.length < MIN_QUERY_LENGTH
        ? []
        : await serverApi<ResourceCardDto[]>(
            `/student/resources/${encodeURIComponent(subject)}/search?${new URLSearchParams({ q: query })}`,
          );

    return {
      title: `Risultati per «${query}»`,
      items: items.map(toSearchResult),
      emptyText:
        query.length < MIN_QUERY_LENGTH
          ? "Scrivi almeno due lettere per cercare."
          : "Nessuna risorsa trovata. Prova con un'altra parola.",
      backHref,
      query,
    };
  }

  if (isResourceCategory(params.category)) {
    const category = params.category;
    return {
      title: resourceCategoriesMeta[category].label,
      items: hub.resources
        .filter((r) => r.category === category)
        .map(toSearchResult),
      emptyText: "In questa categoria non ci sono ancora risorse.",
      backHref,
    };
  }

  return undefined;
}

function toSearchResult(r: ResourceCardDto): ResourceSearchResult {
  return {
    id: r.slug,
    title: r.title,
    description: r.description,
    subject: r.subjectSlug,
    category: r.category,
    href: resourceHref(r.subjectSlug, r.slug),
    locked: r.premiumLocked,
  };
}

/* ------------------------------------ Dettaglio ------------------------------------ */

/**
 * null = Risorsa inesistente o non pubblicata.
 * cache(): titolo della pagina e pagina della stessa richiesta fanno una sola chiamata
 */
export const getResourceDetail = cache(async function getResourceDetail(
  subject: string,
  slug: string,
): Promise<ResourceDetailData | null> {
  let dto: ResourceDetailDto;
  try {
    dto = await serverApi<ResourceDetailDto>(
      `/student/resources/${encodeURIComponent(subject)}/${encodeURIComponent(slug)}`,
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) return null;
    throw error;
  }

  const { resource, content } = dto;
  const hasContent = (list?: unknown[]) => Boolean(list && list.length > 0);

  return {
    id: String(dto.resourceId),
    slug: resource.slug,
    subject: resource.subjectSlug,
    category: resource.category,
    title: resource.title,
    description: resource.description,
    isSaved: dto.saved,
    locked: resource.premiumLocked,
    summary: {
      text: dto.summaryText ?? "",
      example: content?.summaryExample,
    },
    tool: content?.tool && hasContent(content.tool.variants) ? content.tool : undefined,
    insights: hasContent(content?.insights) ? content?.insights : undefined,
    examples: hasContent(content?.examples) ? content?.examples : undefined,
    exerciseLink:
      dto.hasExercises && dto.topicName && dto.topicId
        ? {
            title: "Vuoi vedere se l'hai capita?",
            description: `Allenati con gli esercizi della Palestra su ${dto.topicName}.`,
            ctaLabel: "Vai agli esercizi",
            href: topicPracticeHref(dto.topicId),
            skills: [],
            topics: [dto.topicName],
          }
        : undefined,
    related: [],
  };
});
