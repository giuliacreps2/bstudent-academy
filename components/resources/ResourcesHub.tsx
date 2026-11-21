"use client";

import { useResourceSearch } from "@/hooks/useResourceSearch";
import { resourcesHref } from "@/constants/resources";
import { ResourcesHero } from "./ResourcesHero";
import { ResourceSubjectToggle } from "./ResourcesSubjectToggle";
import { PopularResources } from "./PopularResources";
import { ResourceCategories } from "./ResourceCategories";
import { FeaturedResources } from "./FeaturedResources";
import { ResourceResultsList } from "./ResourceResultsList";
import { NotebookCta } from "./NotebookCta";
import type { ResourcesPageData } from "@/types/resources";

interface ResourcesHubProps {
  data: ResourcesPageData;
  isLoggedIn: boolean;
}

/**
 * Unico client component della pagina: possiede lo stato della ricerca.
 * Materia, categoria e ricerca stanno nell'indirizzo (?materia=, ?categoria=, ?q=):
 * la pagina si ricarica dal server con i dati giusti e il link resta condivisibile.
 */
export function ResourcesHub({ data, isLoggedIn }: ResourcesHubProps) {
  const { subject, content, results } = data;
  const search = useResourceSearch(subject, results?.query);

  return (
    <>
      <ResourcesHero hero={data.hero} search={search} />

      {data.subjects.length > 1 && (
        <ResourceSubjectToggle
          subjects={data.subjects}
          subject={subject}
          hrefFor={(key) => resourcesHref({ subject: key })}
        />
      )}

      {results ? (
        <ResourceResultsList results={results} />
      ) : content ? (
        <>
          {content.popular.length > 0 && (
            <PopularResources subject={subject} resources={content.popular} />
          )}

          {content.categories.length > 0 && (
            <ResourceCategories
              subject={subject}
              categories={content.categories}
              recommendedPath={content.recommendedPath}
            />
          )}

          {content.featured.length > 0 && (
            <FeaturedResources subject={subject} resources={content.featured} />
          )}
        </>
      ) : (
        <section className="container-section py-10 md:py-14">
          <p className="rounded-lg border border-border bg-surface p-6 text-center text-base text-brand-muted">
            Le risorse di questa materia stanno arrivando: torna a trovarci presto.
          </p>
        </section>
      )}

      <NotebookCta notebook={data.notebook} isLoggedIn={isLoggedIn} />
    </>
  );
}
