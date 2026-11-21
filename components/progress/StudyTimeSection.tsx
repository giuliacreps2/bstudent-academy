import { ProgressCard } from "./ProgressCard";
import type { StudyTime } from "@/types/progress";

const minutes = (value: number) =>
  value < 60 ? `${value} min` : `${Math.floor(value / 60)} h ${value % 60 > 0 ? `${value % 60} min` : ""}`.trim();

/** Ultimi 7 giorni, da oggi all'indietro, con le date nel formato del backend (AAAA-MM-GG, ora italiana) */
function lastDays(count: number): string[] {
  const formatter = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Rome" });
  return Array.from({ length: count }, (_, i) => formatter.format(new Date(Date.now() - (count - 1 - i) * 86_400_000)));
}

/**
 * Tempo di studio (blueprint §10.5): tempo attivo su teoria ed esercizi. Tono neutro e nessun obiettivo di
 * tempo: è solo una vista, non un traguardo. Aggiunto all'MVP il 21/11/2026.
 */
export function StudyTimeSection({ time }: { time: StudyTime }) {
  const byDate = new Map(time.byDay.map((d) => [d.date, d]));
  const days = lastDays(Math.min(time.days, 7));
  const max = Math.max(1, ...days.map((d) => (byDate.get(d)?.theoryMinutes ?? 0) + (byDate.get(d)?.exerciseMinutes ?? 0)));

  return (
    <ProgressCard
      id="tempo"
      icon="⏱️"
      title="Il tuo tempo di studio"
      summary={
        <p className="text-sm text-brand-muted">
          {time.totalMinutes === 0
            ? "Negli ultimi 7 giorni non c'è ancora tempo di studio registrato."
            : `Negli ultimi 7 giorni: ${minutes(time.totalMinutes)} in ${time.activeDays} ${time.activeDays === 1 ? "giorno" : "giorni"}, in media ${minutes(time.averageMinutesPerActiveDay)} nei giorni in cui hai studiato.`}
        </p>
      }
    >
      <div className="flex h-32 items-end gap-2" aria-hidden="true">
        {days.map((date) => {
          const day = byDate.get(date);
          const theory = day?.theoryMinutes ?? 0;
          const exercises = day?.exerciseMinutes ?? 0;
          return (
            <div key={date} className="flex flex-1 flex-col items-center gap-1">
              <div className="flex w-full flex-1 flex-col justify-end overflow-hidden rounded-md bg-surface-blue">
                <div className="bg-brand-primary" style={{ height: `${(exercises / max) * 100}%` }} />
                <div className="bg-brand-success" style={{ height: `${(theory / max) * 100}%` }} />
              </div>
              <span className="text-[10px] text-brand-muted">
                {new Date(`${date}T12:00:00`).toLocaleDateString("it-IT", { weekday: "short" })}
              </span>
            </div>
          );
        })}
      </div>
      <p className="mt-3 flex flex-wrap gap-4 text-sm text-brand-muted">
        <span>
          <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-brand-success" />
          Teoria: {minutes(time.theoryMinutes)}
        </span>
        <span>
          <span className="mr-1 inline-block h-2.5 w-2.5 rounded-full bg-brand-primary" />
          Esercizi: {minutes(time.exerciseMinutes)}
        </span>
      </p>
      <p className="sr-only">
        {time.byDay.map((d) => `${d.date}: teoria ${d.theoryMinutes} minuti, esercizi ${d.exerciseMinutes} minuti.`).join(" ")}
      </p>
    </ProgressCard>
  );
}
