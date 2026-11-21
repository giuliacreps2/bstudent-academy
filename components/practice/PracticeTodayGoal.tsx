"use client";

import { useState, useTransition } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";
import { Modal } from "@/components/ui/Modal";
import { skillIcons, skillStyles, toSkillIconKey } from "@/constants/skills";
import { errorMessage } from "@/lib/api";
import { getTodayGoal } from "@/lib/practice";
import { PracticeItemRow } from "./PracticeItemRow";
import type { PracticeItem, SkillRef } from "@/types/practice";

/** "Sorprendimi": il backend sceglie la skill più debole */
const SURPRISE = "";

/**
 * "Qual è il tuo obiettivo oggi?" (stesso aspetto di TodayGoalSection): lo studente sceglie una skill
 * o "Sorprendimi" e il backend propone le voci da fare.
 * TODO (blueprint §8.1): link "Non sai cosa allenare? Fai il test" quando esiste la pagina del test.
 */
export function PracticeTodayGoal({ subject, skills }: { subject: string; skills: SkillRef[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [items, setItems] = useState<PracticeItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const byCode = new Map(skills.map((skill) => [skill.code, skill]));

  function handleConfirm() {
    if (selected === null) return;
    const skill = selected;
    setModalOpen(false);
    setError(null);
    startTransition(async () => {
      try {
        setItems(await getTodayGoal(subject, skill || undefined));
      } catch (e) {
        setItems(null);
        setError(errorMessage(e, "Non riusciamo a proporti gli esercizi. Riprova tra poco."));
      }
    });
  }

  const optionClass = (active: boolean) =>
    `flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition ${
      active
        ? "border-brand-primary bg-surface-blue"
        : "border-border bg-surface hover:border-brand-primary/40 hover:bg-surface-blue"
    }`;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-lg border border-border bg-surface p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-blue text-lg">
          🎯
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">Qual è il tuo obiettivo oggi?</p>
          <p className="mt-0.5 text-xs text-brand-muted">
            Dicci cosa vuoi allenare e ti suggeriremo gli esercizi più adatti a te.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          disabled={skills.length === 0}
          className="btn-primary shrink-0 px-4 py-2 text-sm transition-transform duration-150 active:scale-95 disabled:opacity-50"
        >
          Inizia il quiz
        </button>
      </div>

      {(pending || items || error) && (
        <div className="rounded-lg border border-border bg-surface p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h3 className="text-lg font-bold text-foreground">Esercizi consigliati per te</h3>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="shrink-0 text-sm font-medium text-brand-primary hover:underline"
            >
              Cambia obiettivo
            </button>
          </div>

          {pending ? (
            <div className="space-y-3" aria-busy="true">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-lg bg-surface-blue" />
              ))}
            </div>
          ) : error ? (
            <p role="alert" className="text-sm font-semibold text-brand-coral">
              {error}
            </p>
          ) : items && items.length > 0 ? (
            <div className="space-y-3">
              {items.map((item) => (
                <PracticeItemRow key={item.practiceExerciseId} item={item} skill={byCode.get(item.skillCode)} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg bg-surface-blue p-6 text-center text-sm text-brand-muted">
              Per oggi non ci sono esercizi da proporti in questa skill. Prova con un&apos;altra.
            </p>
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} eyebrow="BStudent" title="Qual è il tuo obiettivo oggi?">
        <p className="mb-6 text-sm leading-6 text-brand-muted">
          Scegli su cosa vuoi concentrarti: ti proponiamo gli esercizi più adatti.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {skills.map((skill) => {
            const styles = skillStyles(skill.color);
            const Icon = skillIcons[toSkillIconKey(skill.icon)];
            const active = selected === skill.code;
            return (
              <button key={skill.code} type="button" onClick={() => setSelected(skill.code)} className={optionClass(active)}>
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${styles.iconBg}`}>
                  <Icon className={`h-4 w-4 ${styles.iconText}`} />
                </span>
                <span className="flex-1 text-sm font-bold text-foreground">{skill.name}</span>
                {active && <CheckIcon className="h-5 w-5 shrink-0 text-brand-primary" />}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => setSelected(SURPRISE)}
            className={`sm:col-span-2 justify-between text-sm font-bold ${optionClass(selected === SURPRISE)}`}
          >
            {/* Il backend sceglie la skill più debole, non un mix di tutte */}
            Sorprendimi
            {selected === SURPRISE && <CheckIcon className="h-5 w-5 text-brand-primary" />}
          </button>
        </div>

        <button
          type="button"
          onClick={handleConfirm}
          disabled={selected === null}
          className="btn-primary mt-7 inline-flex h-11 w-full items-center justify-center text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Mostrami gli esercizi →
        </button>
      </Modal>
    </div>
  );
}
