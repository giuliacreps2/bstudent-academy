import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ResourcesHub } from "@/components/resources/ResourcesHub";
import { getResourcesHubData } from "@/lib/resources";
import {
  defaultResourceSubject,
  isResourceSubject,
} from "@/constants/resources";

export const metadata: Metadata = {
  title: "Risorse | BStudent",
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

  const data = await getResourcesHubData();

  // TODO: sostituire con lo stato di autenticazione reale quando l'auth sarà collegata
  const isLoggedIn = false;

  return (
    <div>
      <Navbar />

      <main className="bg-background">
        <ResourcesHub
          data={data}
          initialSubject={initialSubject}
          isLoggedIn={isLoggedIn}
        />
      </main>

      <Footer />
    </div>
  );
}
