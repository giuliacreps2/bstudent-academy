"use client";

import { useResourceSubject } from "@/hooks/useResourceSubject";
import { useResourceSearch } from "@/hooks/useResourceSearch";
import { ResourcesHero } from "./ResourcesHero";
import { ResourceSubjectToggle } from "./ResourcesSubjectToggle";
import { PopularResources } from "./PopularResources";
import { ResourceCategories } from "./ResourceCategories";
import { FeaturedResources } from "./FeaturedResources";
import { NotebookCta } from "./NotebookCta";
import type { ResourceSubjectKey, ResourcesHubData } from "@/types/resources";

interface ResourcesHubProps {
  data: ResourcesHubData;
  initialSubject: ResourceSubjectKey;
  isLoggedIn: boolean;
}

/**
 * Unico client component della pagina: possiede lo stato della materia
 * e della ricerca, le sezioni sotto sono semplici componenti di presentazione.
 */
export function ResourcesHub({
  data,
  initialSubject,
  isLoggedIn,
}: ResourcesHubProps) {
  const { subject, select } = useResourceSubject(initialSubject);
  const search = useResourceSearch(subject);
  const content = data.content[subject];

  return (
    <>
      <ResourcesHero hero={data.hero} search={search} />

      <ResourceSubjectToggle subject={subject} onSelect={select} />

      <PopularResources subject={subject} resources={content.popular} />

      <ResourceCategories
        subject={subject}
        categories={content.categories}
        recommendedPath={content.recommendedPath}
      />

      <FeaturedResources subject={subject} resources={content.featured} />

      <NotebookCta notebook={data.notebook} isLoggedIn={isLoggedIn} />
    </>
  );
}
