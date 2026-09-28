import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MissionBreadcrumb } from "@/components/missions/MissionBreadcrumb";
import { ResourceHeader } from "@/components/resources/ResourceHeader";
import { ResourceSectionNav } from "@/components/resources/ResourceSectionNav";
import { ResourceSummaryCard } from "@/components/resources/ResourceSummaryCard";
import { ResourceTableTool } from "@/components/resources/ResourceTableTool";
import { ResourceInsights } from "@/components/resources/ResourceInsights";
import { ResourceExamples } from "@/components/resources/ResourceExamples";
import { ResourceExerciseCta } from "@/components/resources/ResourceExerciseCta";
import { ResourceRelatedList } from "@/components/resources/ResourceRelatedList";
import {
  getAvailableSections,
  getResourceDetail,
  resourceDetailParams,
} from "@/lib/resourceDetail";
import {
  isResourceSubject,
  resourceCategoriesMeta,
  resourceSubjectsMeta,
} from "@/constants/resources";
import { resourceSectionId } from "@/constants/resourceDetail";

// Il nome del parametro segue la cartella: app/resources/[subject]/[slug]
type ResourcePageProps = {
  params: Promise<{ subject: string; slug: string }>;
};

export function generateStaticParams() {
  // lib/resourceDetail espone { materia, slug }: qui lo adattiamo alla cartella
  return resourceDetailParams.map(({ materia, slug }) => ({
    subject: materia,
    slug,
  }));
}

export async function generateMetadata({
  params,
}: ResourcePageProps): Promise<Metadata> {
  const { subject, slug } = await params;
  if (!isResourceSubject(subject)) return {};

  const resource = await getResourceDetail(subject, slug);
  if (!resource) return {};

  return {
    title: `${resource.title} | Risorse di ${resourceSubjectsMeta[subject].label} | BStudent`,
    description: resource.description,
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { subject, slug } = await params;
  if (!isResourceSubject(subject)) notFound();

  const resource = await getResourceDetail(subject, slug);
  if (!resource) notFound();

  // TODO: sostituire con lo stato di autenticazione reale quando l'auth sarà collegata
  const isLoggedIn = false;

  const subjectLabel = resourceSubjectsMeta[resource.subject].label;
  const categoryLabel = resourceCategoriesMeta[resource.category].label;
  // L'hub legge ancora ?materia= (vedi app/resources/page.tsx)
  const backHref = `/resources?materia=${resource.subject}`;
  const sections = getAvailableSections(resource);

  return (
    <div>
      <Navbar />

      <main className="bg-background">
        {/* Niente `reading-area` qui: il layout root avvolge già tutto in <ReadingArea> */}
        <article className="container-section max-w-4xl py-8 md:py-12">
          {/* BREADCRUMB: Risorse → Latino → Grammatica → Terza declinazione */}
          <MissionBreadcrumb
            items={[
              { label: "Risorse", href: "/resources" },
              { label: subjectLabel, href: backHref },
              {
                label: categoryLabel,
                // TODO: la pagina categoria non esiste ancora in app/resources
                href: `/resources/categoria/${resource.category}?materia=${resource.subject}`,
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

          <ResourceHeader resource={resource} isLoggedIn={isLoggedIn} />

          {/* Sticky sotto la navbar su desktop, barra scrollabile su mobile */}
          <ResourceSectionNav sections={sections} />

          <div className="mt-8 space-y-12 md:space-y-14">
            <ResourceSummaryCard
              id={resourceSectionId("panoramica")}
              summary={resource.summary}
            />

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

            <ResourceRelatedList links={resource.related} />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
