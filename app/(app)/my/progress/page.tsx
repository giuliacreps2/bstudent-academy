import type { Metadata } from "next";
import {
  getCourseProgress,
  getGrowth,
  getHistory,
  getPracticeProgress,
  getStudyTime,
  getWeakPoints,
} from "@/lib/progress-server";
import { StudyTimeSection } from "@/components/progress/StudyTimeSection";
import { progressHref, type ProgressFilters } from "@/lib/progress";
import { ResourceSubjectToggle } from "@/components/resources/ResourcesSubjectToggle";
import {
  CoursesSection,
  GrowthSection,
  HistorySection,
  PracticeSection,
  WeakPointsSection,
} from "@/components/progress/ProgressSections";
import type { HistoryContext, HistoryOutcome } from "@/types/progress";

export const metadata: Metadata = { title: "I miei progressi | BStudent" };

interface PageProps {
  searchParams: Promise<{ materia?: string; tipo?: string; esito?: string; tutto?: string; pagina?: string }>;
}

const CONTEXTS: HistoryContext[] = ["all", "mission", "practice"];
const OUTCOMES: HistoryOutcome[] = ["all", "passed", "failed"];

/*
 * "I miei progressi" (blueprint §10.5, deciso il 14/11/2026): com'è andato il percorso.
 * - La parte "cosa faccio ora" sta nella home, i dati veloci nella barra fissa.
 * - Cinque gruppi, ognuno una scheda riassunto con il dettaglio al clic.
 * - Personaggio e XP sopra, uguali per tutte le materie; sotto, il selettore della materia (solo con più materie).
 * - Storico: ultimi 30 giorni (il resto a richiesta), filtri Palestra/missioni e superati sì/no; il clic apre
 *   risposte, feedback (anche della docente) e collegamento alla teoria.
 * - TODO (UX, aperto nel blueprint): ordine tra crescita e punti deboli, da scegliere vedendo la pagina.
 * - Tempo di studio: aggiunto all'MVP il 21/11/2026, tono neutro e nessun obiettivo di tempo.
 */
export default async function ProgressPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const growth = await getGrowth();
  const requested = growth.subjects.find((s) => s.subjectSlug === params.materia);
  const subject = requested?.subjectSlug ?? growth.subjects[0]?.subjectSlug ?? "";

  const filters: ProgressFilters = {
    subject: requested?.subjectSlug,
    context: CONTEXTS.find((c) => c === params.tipo) ?? "all",
    outcome: OUTCOMES.find((o) => o === params.esito) ?? "all",
    allTime: params.tutto === "1",
    page: Math.max(0, Number(params.pagina) || 0),
  };

  const [courses, practice, weak, history, studyTime] = await Promise.all([
    getCourseProgress(subject || undefined),
    getPracticeProgress(subject || undefined),
    getWeakPoints(subject || undefined),
    getHistory({
      context: filters.context ?? "all",
      outcome: filters.outcome ?? "all",
      allTime: filters.allTime ?? false,
      page: filters.page ?? 0,
    }),
    getStudyTime(7),
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-widest text-brand-primary">I miei progressi</p>
        <h1 className="mt-1 text-3xl font-extrabold text-foreground">Com&apos;è andato il tuo percorso</h1>
      </header>

      <GrowthSection growth={growth} subject={subject} />

      {growth.subjects.length > 1 && (
        <ResourceSubjectToggle
          subjects={growth.subjects.map((s) => ({ key: s.subjectSlug, label: s.subjectName }))}
          subject={subject}
          hrefFor={(key) => progressHref({ subject: key })}
        />
      )}

      <WeakPointsSection weak={weak} />
      <CoursesSection courses={courses} />
      <PracticeSection practice={practice} />
      <HistorySection history={history} filters={filters} />
      <StudyTimeSection time={studyTime} />
    </div>
  );
}
