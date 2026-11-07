"use client";

import {
  deleteCourse,
  deleteExercise,
  deleteLesson,
  deleteMission,
  publishCourse,
  publishExercise,
  publishLesson,
  publishMission,
  withdrawCourse,
  withdrawExercise,
  withdrawLesson,
  withdrawMission,
} from "@/lib/admin";
import type { ContentStatus } from "@/types/admin";
import { buttonClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Pubblica / ritira / elimina con lo stesso comportamento per corsi, missioni, lezioni ed esercizi.
   Il backend decide se la transizione è ammessa: il 409 ("La missione non è pronta: ...") si mostra qui */

type Target = "course" | "mission" | "lesson" | "exercise";

const ACTIONS: Record<Target, {
  label: string;
  publish: (id: number) => Promise<unknown>;
  withdraw: (id: number) => Promise<unknown>;
  remove: (id: number) => Promise<unknown>;
}> = {
  course: { label: "il corso", publish: publishCourse, withdraw: withdrawCourse, remove: deleteCourse },
  mission: { label: "la missione", publish: publishMission, withdraw: withdrawMission, remove: deleteMission },
  lesson: { label: "la lezione", publish: publishLesson, withdraw: withdrawLesson, remove: deleteLesson },
  exercise: { label: "l'esercizio", publish: publishExercise, withdraw: withdrawExercise, remove: deleteExercise },
};

export default function StatusActions({
  target,
  id,
  status,
  everPublished,
  afterDeleteHref,
  withdrawConfirm,
}: {
  target: Target;
  id: number;
  status: ContentStatus;
  /** publishedAt valorizzato: il backend non ammette più l'eliminazione */
  everPublished: boolean;
  /** Dove andare dopo l'eliminazione (la pagina corrente non esiste più) */
  afterDeleteHref: string;
  /** Conferma del ritiro al posto di quella standard (es. dove è usato l'esercizio) */
  withdrawConfirm?: string;
}) {
  const { run, pending, error } = useAdminMutation();
  const { label, publish, withdraw, remove } = ACTIONS[target];

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {status !== "published" && (
          <button
            type="button"
            className={buttonClass.primary}
            disabled={pending}
            onClick={() => run(() => publish(id), { confirm: `Pubblicare ${label}? Diventa visibile agli studenti.` })}
          >
            {status === "withdrawn" ? "Ripristina" : "Pubblica"}
          </button>
        )}
        {status === "published" && (
          <button
            type="button"
            className={buttonClass.secondary}
            disabled={pending}
            onClick={() => run(() => withdraw(id), {
              confirm: withdrawConfirm ?? `Ritirare ${label}? Gli studenti non lo vedranno più.`,
            })}
          >
            Ritira
          </button>
        )}
        {status === "draft" && !everPublished && (
          <button
            type="button"
            className={buttonClass.danger}
            disabled={pending}
            onClick={() => run(() => remove(id), {
              confirm: `Eliminare definitivamente ${label}?`,
              redirectTo: afterDeleteHref,
            })}
          >
            Elimina
          </button>
        )}
      </div>
      {error && <Notice tone="error">{error}</Notice>}
    </div>
  );
}
