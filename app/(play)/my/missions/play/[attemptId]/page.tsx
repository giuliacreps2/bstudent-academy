import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ApiError } from "@/lib/api";
import { serverApi } from "@/lib/api-server";
import { MissionPlayer } from "@/components/missionPlay/MissionPlayer";
import type { MissionPlay } from "@/types/missionPlay";

export const metadata: Metadata = {
  title: "Missione in corso | BStudent",
  robots: { index: false },
};

interface PageProps {
  params: Promise<{ attemptId: string }>;
}

export default async function MissionPlayPage({ params }: PageProps) {
  const { attemptId } = await params;
  const id = Number(attemptId);
  if (!Number.isSafeInteger(id) || id <= 0) notFound();

  let play: MissionPlay;
  try {
    // Il backend ricalcola il tempo: dopo 45 secondi senza segnali la missione risulta in pausa
    play = await serverApi<MissionPlay>(`/student/missions/attempts/${id}`);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  // key: un tentativo nuovo ("Riprova") riparte con uno stato pulito
  return <MissionPlayer key={play.missionAttemptId} initial={play} />;
}
