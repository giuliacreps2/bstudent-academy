import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMissionMapData } from "@/lib/courses-server";
import { MissionMap } from "@/components/missions/MissionMap";

export const metadata: Metadata = { title: "Mappa del corso | BStudent" };

/** Mappa immersiva del corso (blueprint §5.9) con i dati del backend */
export default async function CourseMissionMapPage({ params }: { params: Promise<{ courseSlug: string }> }) {
  const { courseSlug } = await params;
  const data = await getMissionMapData(courseSlug);
  if (!data) notFound();

  return <MissionMap data={data} />;
}
