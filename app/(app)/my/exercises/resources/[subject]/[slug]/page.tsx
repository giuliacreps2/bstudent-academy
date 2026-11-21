import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { MissionBreadcrumb } from "@/components/missions/MissionBreadcrumb";
import { ResourceHeader } from "@/components/resources/ResourceHeader";
import { ResourceSectionNav } from "@/components/resources/ResourceSectionNav";
import { ResourceSummaryCard } from "@/components/resources/ResourceSummaryCard";
import { ResourceTableTool } from "@/components/resources/ResourceTableTool";
import { ResourceInsights } from "@/components/resources/ResourceInsights";
import { ResourceExamples } from "@/components/resources/ResourceExamples";
import { ResourceExerciseCta } from "@/components/resources/ResourceExerciseCta";
import { ResourcePremiumNotice } from "@/components/resources/PremiumLock";
import { getAvailableSections } from "@/lib/resourceDetail";
import { getResourceDetail } from "@/lib/resources-server";
import {
  resourceCategoriesMeta,
  resourcesHref,
} from "@/constants/resources";
import { resourceSectionId } from "@/constants/resourceDetail";

// Il nome dei parametri segue le cartelle: resources/[subject]/[slug]
type ResourcePageProps = {
  params: Promise<{ subject: string; slug: string }>;
};

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { subject, slug } = await params;
  const resource = await getResourceDetail(subject, slug);
  return resource ? { title: `${resource.title} | Risorse | BStudent` } : {};
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { subject, slug } = await params;

  const resource = await getResourceDetail(subject, slug);
  if (!resource) notFound();

  const categoryLabel = resourceCategoriesMeta[resource.category].label;
  const backHref = resourcesHref({ subject: resource.subject });
  const sections = getAvailableSections(resource);

  return (
    <div className="bg-background">
      {/* Niente `reading-area` qui: il layout root avvolge già tutto in <ReadingArea> */}
      <article className="container-section max-w-4xl py-8 md:py-12">
        {/* BREADCRUMB: Esercizi → Risorse → Grammatica → Terza declinazione */}
        <MissionBreadcrumb
          items={[
            { label: "Esercizi", href: "/my/exercises" },
            { label: "Risorse", href: backHref },
            {
              label: categoryLabel,
              href: resourcesHref({
                subject: resource.subject,
                category: resource.category,
              }),
            },
            { label: resource.title },
          ]}
        />

        <Link
          href={backHref}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:underline"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Torna alle risorse
        </Link>

        {/* TODO (Quaderno): canSave quando il backend salva i segnalibri */}
        <ResourceHeader resource={resource} isLoggedIn canSave={false} />

        {/* Sticky in alto su desktop, barra scrollabile su mobile */}
        <ResourceSectionNav sections={sections} />

        <div className="mt-8 space-y-12 md:space-y-14">
          {resource.summary.text && (
            <ResourceSummaryCard
              id={resourceSectionId("panoramica")}
              summary={resource.summary}
            />
          )}

          {resource.locked && <ResourcePremiumNotice />}

          {resource.tool && (
            <ResourceTableTool
              id={resourceSectionId("tabella")}
              tool={resource.tool}
            />
          )}

          {resource.insights && resource.insights.length > 0 && (
            <ResourceInsights
              id={resourceSectionId("spiegazione")}
              insights={resource.insights}
            />
          )}

          {resource.examples && resource.examples.length > 0 && (
            <ResourceExamples
              id={resourceSectionId("esempi")}
              examples={resource.examples}
            />
          )}

          {resource.exerciseLink && (
            <ResourceExerciseCta
              id={resourceSectionId("esercizi")}
              link={resource.exerciseLink}
            />
          )}

          {/* "Approfondisci" non è visibile nell'MVP (blueprint §7.4) */}
        </div>
      </article>
    </div>
  );
}
