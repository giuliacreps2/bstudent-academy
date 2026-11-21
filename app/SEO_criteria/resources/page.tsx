/*
 * SEO_criteria — COPIA DI STUDIO (14/11/2026) di app/resources, con i suoi elementi SEO
 * (metadata, generateMetadata, generateStaticParams) tenuti per studiarli.
 * Le Risorse vere andranno nell'area riservata, senza SEO (blueprint §7.3 e mappa Risorse):
 * questa copia resta pubblica solo come riferimento. Non pubblicarla in produzione
 * (contenuto duplicato per Google) e non collegarla dalla navigazione.
 * I link interni puntano ancora alle pagine originali /resources.
 */
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ResourcesHub } from "@/components/resources/ResourcesHub";
import { getResourcesHubData } from "@/lib/resources";
import {
  defaultResourceSubject,
  isResourceSubject,
  resourceSubjectOrder,
  resourceSubjectsMeta,
} from "@/constants/resources";
import type { ResourcesPageData } from "@/types/resources";

export const metadata: Metadata = {
  title: "SEO_criteria | Risorse | BStudent",
  description: "Tabelle, schemi e strumenti per studiare latino e greco.",
};

interface ResourcesPageProps {
  searchParams: Promise<{ materia?: string }>;
}

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const { materia } = await searchParams;
  const initialSubject = isResourceSubject(materia)
    ? materia
    : defaultResourceSubject;

  const hub = await getResourcesHubData();

  // Adattato il 21/11/2026 alla pagina dell'area riservata: una materia per volta, scelta con ?materia=
  const data: ResourcesPageData = {
    hero: hub.hero,
    notebook: hub.notebook,
    subjects: resourceSubjectOrder.map((key) => resourceSubjectsMeta[key]),
    subject: initialSubject,
    content: hub.content[initialSubject],
  };

  // Copia pubblica: variante per chi non ha l'account
  const isLoggedIn = false;

  return (
    <div>
      <Navbar />

      <main className="bg-background">
        <ResourcesHub data={data} isLoggedIn={isLoggedIn} />
      </main>

      <Footer />
    </div>
  );
}
