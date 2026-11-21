import type { Metadata } from "next";
import { ResourcesHub } from "@/components/resources/ResourcesHub";
import { getResourcesPage } from "@/lib/resources-server";

/*
 * Risorse: gli attrezzi della Palestra (blueprint §7.4). Solo con account, dentro Esercizi.
 * La copia pubblica con gli elementi SEO resta in app/SEO_criteria/resources.
 */
export const metadata: Metadata = {
  title: "Risorse | BStudent",
};

type ResourcesPageProps = {
  searchParams: Promise<{ materia?: string; categoria?: string; q?: string }>;
};

export default async function ResourcesPage({
  searchParams,
}: ResourcesPageProps) {
  const { materia, categoria, q } = await searchParams;

  const data = await getResourcesPage({
    subject: materia,
    category: categoria,
    query: q,
  });

  return (
    <div className="bg-background">
      {/* key: una nuova ricerca o un'altra materia ripartono con la barra di ricerca aggiornata */}
      <ResourcesHub
        key={`${data.subject}|${q ?? ""}`}
        data={data}
        isLoggedIn
      />
    </div>
  );
}
