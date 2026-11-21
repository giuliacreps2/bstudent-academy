import Link from "next/link";
import { ClockIcon } from "@heroicons/react/24/outline";
import { PracticeItemRow } from "./PracticeItemRow";
import type { PracticeItem, SkillRef } from "@/types/practice";

/**
 * "Riprendi il tuo allenamento" con le ultime voci svolte (stesso aspetto di ResumeTraining).
 * "Vedi cronologia" non c'è: il backend non ha ancora la pagina della cronologia.
 */
export function PracticeResume({
  activities,
  skills,
}: {
  activities: PracticeItem[];
  skills: SkillRef[];
}) {
  const byCode = new Map(skills.map((skill) => [skill.code, skill]));

  return (
    <div className="rounded-lg border border-border bg-surface p-5">
      <div className="mb-1 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-blue">
          <ClockIcon className="h-5 w-5 text-brand-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Riprendi il tuo allenamento</h3>
      </div>
      <p className="mb-6 text-sm text-brand-muted sm:ml-12">
        Qui trovi gli ultimi esercizi che hai svolto. Continua da dove eri rimasto o rivedi quelli già
        completati.
      </p>

      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.map((item) => (
            <PracticeItemRow
              key={item.practiceExerciseId}
              item={item}
              skill={byCode.get(item.skillCode)}
              showDate
            />
          ))}
        </div>
      ) : (
        <div className="rounded-lg bg-surface-blue p-6 text-center">
          <p className="mb-1 text-sm font-semibold text-foreground">Non hai ancora fatto nessun esercizio</p>
          <p className="mb-4 text-sm text-brand-muted">
            Inizia ora: bastano pochi minuti per guadagnare i tuoi primi punti.
          </p>
          <Link
            href="#skill"
            className="btn-primary inline-flex px-5 py-2.5 text-sm transition-transform duration-150 active:scale-95"
          >
            Inizia subito ad allenarti →
          </Link>
        </div>
      )}
    </div>
  );
}
