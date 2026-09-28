"use server";

import { getResourcesHubData } from "@/lib/resources";
import type {
  ResourceSearchResult,
  ResourceSubjectKey,
} from "@/types/resources";

// TODO: sostituire con la ricerca reale (testuale) quando il BE è pronto.
// Per ora filtra i contenuti mock per titolo e descrizione.
export async function searchResources(
  query: string,
  subject: ResourceSubjectKey,
): Promise<ResourceSearchResult[]> {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];

  const { content } = await getResourcesHubData();
  const { popular, featured } = content[subject];

  const pool: ResourceSearchResult[] = [
    ...featured.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      subject,
      category: item.category,
      href: item.href,
    })),
    ...popular.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      subject,
      href: item.href,
    })),
  ];

  return pool.filter(
    (item) =>
      item.title.toLowerCase().includes(needle) ||
      item.description.toLowerCase().includes(needle),
  );
}
