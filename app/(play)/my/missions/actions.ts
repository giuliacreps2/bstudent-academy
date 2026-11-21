"use server";

import { redirect } from "next/navigation";
import { errorMessage } from "@/lib/api";
import { serverApi } from "@/lib/api-server";
import { missionPlayHref } from "@/lib/missionPlay";
import type { MissionPlay } from "@/types/missionPlay";

/**
 * "Inizia" / "Riprendi" / "Riprova" dalla pagina della missione: il backend decide se aprire un
 * tentativo nuovo o riprendere quello in pausa. Se non si può (senza vite, un'altra missione della
 * stessa materia in corso, in attesa della docente, abbonamento) restituisce il messaggio da mostrare.
 */
export async function startMission(
  courseSlug: string,
  missionSlug: string,
): Promise<{ error: string }> {
  let play: MissionPlay;
  try {
    play = await serverApi<MissionPlay>(
      `/student/courses/${encodeURIComponent(courseSlug)}/missions/${encodeURIComponent(missionSlug)}/play`,
      { method: "POST" },
    );
  } catch (error) {
    return { error: errorMessage(error, "Non riusciamo ad aprire la missione. Riprova tra poco.") };
  }
  redirect(missionPlayHref(play.missionAttemptId));
}
