"use client";

import Link from "next/link";
import { useState } from "react";
import {
  assignLessonExercise,
  minutesToMs,
  msToMinutes,
  removeMissionExercise,
  replaceSkillWeights,
  updateMissionExercise,
} from "@/lib/admin";
import type { MissionExercise, QuestionBankEntry, Skill, SkillWeight } from "@/types/admin";
import { buttonClass, EmptyNote, Field, inputClass, Notice, StatusBadge } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Esercizio della lezione: uno per lezione. Tempo in minuti nell'interfaccia, millisecondi nel backend.
   Campi vuoti alla creazione -> default di academy_settings (10 minuti, 10 punti) */

export default function LessonExercisePanel({
  lessonId,
  missionExercise,
  exercises,
  skills,
  weights,
  defaultSkillName,
}: {
  lessonId: number;
  missionExercise: MissionExercise | null;
  /** Catalogo degli esercizi, per la scelta e per mostrare il titolo di quello collegato */
  exercises: QuestionBankEntry[];
  skills: Skill[];
  weights: SkillWeight[];
  /** Skill principale della materia (default_skill nel backend), usata se l'esercizio non ha una ripartizione */
  defaultSkillName: string | null;
}) {
  if (!missionExercise) return <AssignForm lessonId={lessonId} exercises={exercises} />;

  const exercise = exercises.find((e) => e.questionBankEntryId === missionExercise.questionBankEntryId);
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Link href={`/admin/exercises/${missionExercise.questionBankEntryId}`} className="font-medium hover:underline">
          {exercise?.internalTitle ?? `Esercizio ${missionExercise.questionBankEntryId}`}
        </Link>
        {exercise && <StatusBadge status={exercise.status} />}
      </div>
      <ConfigForm missionExercise={missionExercise} />
      <WeightsEditor missionExerciseId={missionExercise.missionExerciseId} skills={skills} weights={weights}
                     defaultSkillName={defaultSkillName} />
    </div>
  );
}

function AssignForm({ lessonId, exercises }: { lessonId: number; exercises: QuestionBankEntry[] }) {
  const { run, pending, error, setError } = useAdminMutation();
  // Un esercizio ritirato non si collega
  const available = exercises.filter((e) => e.status !== "withdrawn");
  const [exerciseId, setExerciseId] = useState<number | null>(available[0]?.questionBankEntryId ?? null);
  const [minutes, setMinutes] = useState("");
  const [points, setPoints] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (exerciseId === null) {
      setError("Scegli un esercizio");
      return;
    }
    await run(() => assignLessonExercise(lessonId, {
      questionBankEntryId: exerciseId,
      allowedDurationMs: minutes ? minutesToMs(Number(minutes)) : null,
      maxPoints: points ? Number(points) : null,
    }));
  }

  if (available.length === 0) {
    return <EmptyNote>Nessun esercizio disponibile: <Link href="/admin/exercises" className="underline">creane uno</Link>.</EmptyNote>;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-3">
      <Field label="Esercizio">
        <select className={inputClass} value={exerciseId ?? ""} onChange={(e) => setExerciseId(Number(e.target.value))}>
          {available.map((e) => (
            <option key={e.questionBankEntryId} value={e.questionBankEntryId}>
              {e.internalTitle}{e.status === "draft" ? " (bozza)" : ""}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Tempo (minuti)" hint="Vuoto = 10 minuti">
        <input className={inputClass} type="number" min="0.1" step="0.1" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
      </Field>
      <Field label="Punti massimi" hint="Vuoto = 10. Lo studente ne ottiene una parte in base al risultato">
        <input className={inputClass} type="number" min="0.01" step="0.01" value={points} onChange={(e) => setPoints(e.target.value)} />
      </Field>
      <div className="sm:col-span-3">
        <button type="submit" className={buttonClass.primary} disabled={pending}>Collega esercizio</button>
        {error && <Notice tone="error">{error}</Notice>}
      </div>
    </form>
  );
}

function ConfigForm({ missionExercise }: { missionExercise: MissionExercise }) {
  const { run, pending, error } = useAdminMutation();
  const [minutes, setMinutes] = useState(String(msToMinutes(missionExercise.allowedDurationMs)));
  const [points, setPoints] = useState(String(missionExercise.maxPoints));
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    setSaved(await run(() => updateMissionExercise(missionExercise.missionExerciseId, {
      questionBankEntryId: null,
      allowedDurationMs: minutesToMs(Number(minutes)),
      maxPoints: Number(points),
    })));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-end gap-3">
      <Field label="Tempo (minuti)">
        <input className={inputClass} type="number" min="0.1" step="0.1" value={minutes} onChange={(e) => setMinutes(e.target.value)} required />
      </Field>
      <Field label="Punti massimi">
        <input className={inputClass} type="number" min="0.01" step="0.01" value={points} onChange={(e) => setPoints(e.target.value)} required />
      </Field>
      <button type="submit" className={buttonClass.primary} disabled={pending}>Salva</button>
      <button
        type="button"
        className={buttonClass.danger}
        disabled={pending}
        onClick={() => run(() => removeMissionExercise(missionExercise.missionExerciseId), {
          confirm: "Scollegare l'esercizio dalla lezione?",
        })}
      >
        Scollega
      </button>
      {saved && <Notice tone="success">Salvato.</Notice>}
      {error && <div className="w-full"><Notice tone="error">{error}</Notice></div>}
      <p className="w-full text-xs text-brand-muted">
        Per usare un altro esercizio in questa lezione: scollega quello attuale e collega il nuovo
        (solo con la lezione non pubblicata).
      </p>
    </form>
  );
}

type WeightRow = { skillId: number; weight: string };

function WeightsEditor({ missionExerciseId, skills, weights, defaultSkillName }: {
  missionExerciseId: number;
  skills: Skill[];
  weights: SkillWeight[];
  defaultSkillName: string | null;
}) {
  const { run, pending, error } = useAdminMutation();
  const [rows, setRows] = useState<WeightRow[]>(weights.map((w) => ({ skillId: w.skillId, weight: String(w.weight) })));
  const [saved, setSaved] = useState<string | null>(null);
  const sum = rows.reduce((total, row) => total + (Number(row.weight) || 0), 0);

  function update(index: number, change: Partial<WeightRow>) {
    setSaved(null);
    setRows((current) => current.map((row, i) => (i === index ? { ...row, ...change } : row)));
  }

  function addRow() {
    const unused = skills.find((s) => !rows.some((r) => r.skillId === s.skillId));
    if (unused) setRows((current) => [...current, { skillId: unused.skillId, weight: "" }]);
  }

  async function save(next: WeightRow[], message: string) {
    setSaved(null);
    const ok = await run(() => replaceSkillWeights(missionExerciseId, next.map((r) => ({ skillId: r.skillId, weight: Number(r.weight) }))));
    if (ok) {
      setRows(next);
      setSaved(message);
    }
  }

  return (
    <div>
      <h3 className="mb-1 text-sm font-semibold">Quanto conta per ogni skill</h3>
      <p className="mb-1 text-sm text-brand-muted">
        Indica come il risultato di questo esercizio si divide tra le skill (totale 100%).
        Esempio: 70% Grammatica e 30% Lessico.
      </p>
      <p className="mb-3 text-sm text-brand-muted">
        {rows.length === 0
          ? defaultSkillName
            ? `Nessuna ripartizione: il risultato conta tutto per la skill principale della materia (${defaultSkillName}).`
            : "Nessuna ripartizione e la materia non ha una skill principale: la missione non si potrà pubblicare."
          : "Ripartizione personalizzata per questo esercizio."}
      </p>
      {skills.length === 0 && <EmptyNote>Nessuna skill: <Link href="/admin/skills" className="underline">creane una</Link>.</EmptyNote>}
      <ul className="space-y-2">
        {rows.map((row, index) => (
          <li key={index} className="flex flex-wrap items-center gap-2">
            <select className={`${inputClass} max-w-xs`} value={row.skillId} aria-label="Skill"
                    onChange={(e) => update(index, { skillId: Number(e.target.value) })}>
              {skills.map((s) => <option key={s.skillId} value={s.skillId}>{s.name}</option>)}
            </select>
            <input className={`${inputClass} w-24`} type="number" min="0.01" max="100" step="0.01" value={row.weight}
                   onChange={(e) => update(index, { weight: e.target.value })} aria-label="Percentuale" required />
            <span className="text-sm">%</span>
            <button type="button" className={buttonClass.secondary}
                    onClick={() => setRows((current) => current.filter((_, i) => i !== index))}>Rimuovi</button>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" className={buttonClass.secondary} onClick={addRow}
                disabled={rows.length >= skills.length}>Aggiungi skill</button>
        {rows.length > 0 && (
          <span className={`text-sm ${Math.abs(sum - 100) > 0.001 ? "text-brand-coral" : "text-brand-muted"}`}>
            Totale: {Math.round(sum * 100) / 100}%
          </span>
        )}
        <span className="flex-1" />
        <button type="button" className={buttonClass.primary} disabled={pending || rows.length === 0}
                onClick={() => save(rows, "Ripartizione salvata.")}>
          Salva ripartizione
        </button>
        <button type="button" className={buttonClass.secondary} disabled={pending || defaultSkillName === null}
                onClick={() => save([], `Ora il risultato conta tutto per ${defaultSkillName}.`)}>
          Conta tutto per la skill principale
        </button>
      </div>
      {defaultSkillName === null && (
        <p className="mt-2 text-xs text-brand-muted">
          La materia non ha una skill principale: <Link href="/admin/subjects" className="underline">impostala nelle Materie</Link>.
        </p>
      )}
      {saved && <Notice tone="success">{saved}</Notice>}
      {error && <Notice tone="error">{error}</Notice>}
    </div>
  );
}
