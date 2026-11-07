"use client";

import Link from "next/link";
import { useState } from "react";
import {
  addMissionExercise,
  minutesToMs,
  msToMinutes,
  publishMissionExercise,
  removeMissionExercise,
  replaceSkillWeights,
  updateMissionExercise,
} from "@/lib/admin";
import type { ContentStatus, MissionExercise, QuestionBankEntry, Skill, SkillWeight } from "@/types/admin";
import { buttonClass, EmptyNote, Field, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Esercizio della missione: un passo della sequenza, nasce in bozza.
   Tempo in minuti nell'interfaccia, millisecondi nel backend.
   Campi vuoti alla creazione -> default di academy_settings (10 minuti, 10 punti).
   TODO (gamification): le regole delle skill sono da ricontrollare (blueprint §10.3) */

type WeightRow = { skillId: number; weight: string };

const toInput = (rows: WeightRow[]) => rows.map((r) => ({ skillId: r.skillId, weight: Number(r.weight) }));

/** Aggiunta di un esercizio in coda alla sequenza della missione, con le skill facoltative */
export function AddExerciseForm({
  missionId,
  missionPublished,
  exercises,
  usedExerciseIds,
  skills,
  defaultSkillName,
}: {
  missionId: number;
  missionPublished: boolean;
  /** Catalogo del banco esercizi */
  exercises: QuestionBankEntry[];
  /** Già nella missione: lo stesso esercizio non si ripete */
  usedExerciseIds: number[];
  skills: Skill[];
  defaultSkillName: string | null;
}) {
  const { run, pending, error, setError } = useAdminMutation();
  // Un esercizio ritirato non si collega
  const available = exercises.filter(
    (e) => e.status !== "withdrawn" && !usedExerciseIds.includes(e.questionBankEntryId));
  const [exerciseId, setExerciseId] = useState<number | null>(null);
  const [minutes, setMinutes] = useState("");
  const [points, setPoints] = useState("");
  const [rows, setRows] = useState<WeightRow[]>([]);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    if (exerciseId === null) {
      setError("Scegli un esercizio");
      return;
    }
    const ok = await run(() => addMissionExercise(missionId, {
      questionBankEntryId: exerciseId,
      allowedDurationMs: minutes ? minutesToMs(Number(minutes)) : null,
      maxPoints: points ? Number(points) : null,
      skills: rows.length > 0 ? toInput(rows) : null,
    }));
    if (ok) {
      setMinutes("");
      setPoints("");
      setRows([]);
      setExerciseId(null);
      setSaved(true);
    }
  }

  if (available.length === 0) {
    return (
      <EmptyNote>
        Nessun esercizio da aggiungere: <Link href="/admin/exercises" className="underline">creane uno</Link>.
      </EmptyNote>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-3">
        <Field label="Esercizio">
          <select className={inputClass} value={exerciseId ?? ""} required
                  onChange={(e) => setExerciseId(e.target.value ? Number(e.target.value) : null)}>
            <option value="">Scegli…</option>
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
      </div>
      <div>
        <h3 className="mb-1 text-sm font-semibold">Quanto conta per ogni skill</h3>
        <p className="mb-2 text-sm text-brand-muted">
          {defaultSkillName
            ? `Facoltativo: se non indichi nulla, il risultato conta tutto per la skill principale della materia (${defaultSkillName}).`
            : "La materia non ha una skill principale: indica qui le skill, oppure più tardi dalla pagina dell'esercizio."}
        </p>
        <SkillWeightRows rows={rows} onChange={setRows} skills={skills} />
      </div>
      <p className="text-sm text-brand-muted">
        L&apos;esercizio va in fondo alla sequenza, poi puoi spostarlo con le frecce.{" "}
        {missionPublished
          ? "La missione è pubblicata: resta nascosto agli studenti finché non lo pubblichi dalla sua pagina."
          : "Verrà pubblicato insieme alla missione."}
      </p>
      <button type="submit" className={buttonClass.primary} disabled={pending}>Aggiungi esercizio</button>
      {saved && <Notice tone="success">Esercizio aggiunto in fondo alla sequenza.</Notice>}
      {error && <Notice tone="error">{error}</Notice>}
    </form>
  );
}

/** Pubblicazione dell'esercizio in una missione già pubblicata */
export function PublishInMission({ missionExercise, missionStatus }: {
  missionExercise: MissionExercise;
  missionStatus: ContentStatus;
}) {
  const { run, pending, error } = useAdminMutation();

  if (missionExercise.status === "published") {
    return <p className="text-sm text-brand-muted">Visibile agli studenti quando la missione è pubblicata.</p>;
  }
  if (missionStatus !== "published") {
    return <p className="text-sm text-brand-muted">In bozza: verrà pubblicato insieme alla missione.</p>;
  }
  return (
    <div>
      <p className="mb-2 text-sm text-brand-muted">
        In bozza: la missione è pubblicata ma gli studenti non vedono ancora questo esercizio.
        Per pubblicarlo servono l&apos;esercizio pubblicato e le skill (o la skill principale della materia).
      </p>
      <button type="button" className={buttonClass.primary} disabled={pending}
              onClick={() => run(() => publishMissionExercise(missionExercise.missionExerciseId), {
                confirm: "Pubblicare l'esercizio? Diventa subito visibile agli studenti nella missione.",
              })}>
        Pubblica nella missione
      </button>
      {error && <Notice tone="error">{error}</Notice>}
    </div>
  );
}

/** Tempo e punti; la rimozione dalla missione riporta alla pagina della missione */
export function ConfigForm({ missionExercise }: { missionExercise: MissionExercise }) {
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
          confirm: "Togliere l'esercizio dalla missione?",
          redirectTo: `/admin/missions/${missionExercise.missionId}`,
        })}
      >
        Togli dalla missione
      </button>
      {saved && <Notice tone="success">Salvato.</Notice>}
      {error && <div className="w-full"><Notice tone="error">{error}</Notice></div>}
      <p className="w-full text-xs text-brand-muted">
        Si può togliere solo se nessuno studente l&apos;ha ancora svolto. Tempo e punti valgono per i nuovi
        tentativi: chi l&apos;ha già iniziato conserva i suoi.
      </p>
    </form>
  );
}

export function WeightsEditor({ missionExerciseId, skills, weights, defaultSkillName }: {
  missionExerciseId: number;
  skills: Skill[];
  weights: SkillWeight[];
  defaultSkillName: string | null;
}) {
  const { run, pending, error } = useAdminMutation();
  const [rows, setRows] = useState<WeightRow[]>(weights.map((w) => ({ skillId: w.skillId, weight: String(w.weight) })));
  const [saved, setSaved] = useState<string | null>(null);

  async function save(next: WeightRow[], message: string) {
    setSaved(null);
    const ok = await run(() => replaceSkillWeights(missionExerciseId, toInput(next)));
    if (ok) {
      setRows(next);
      setSaved(message);
    }
  }

  return (
    <div>
      <p className="mb-1 text-sm text-brand-muted">
        Indica come il risultato di questo esercizio si divide tra le skill (totale 100%).
        Esempio: 70% Grammatica e 30% Lessico.
      </p>
      <p className="mb-3 text-sm text-brand-muted">
        {rows.length === 0
          ? defaultSkillName
            ? `Nessuna ripartizione: il risultato conta tutto per la skill principale della materia (${defaultSkillName}).`
            : "Nessuna ripartizione e la materia non ha una skill principale: l'esercizio non si potrà pubblicare."
          : "Ripartizione personalizzata per questo esercizio."}
      </p>
      <SkillWeightRows rows={rows} onChange={(next) => { setSaved(null); setRows(next); }} skills={skills} />
      <div className="mt-3 flex flex-wrap items-center gap-2">
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

/** Righe skill + percentuale con il totale: usate nell'aggiunta e nella pagina dell'esercizio */
function SkillWeightRows({ rows, onChange, skills }: {
  rows: WeightRow[];
  onChange: (rows: WeightRow[]) => void;
  skills: Skill[];
}) {
  const sum = rows.reduce((total, row) => total + (Number(row.weight) || 0), 0);

  function update(index: number, change: Partial<WeightRow>) {
    onChange(rows.map((row, i) => (i === index ? { ...row, ...change } : row)));
  }

  function addRow() {
    const unused = skills.find((s) => !rows.some((r) => r.skillId === s.skillId));
    if (unused) onChange([...rows, { skillId: unused.skillId, weight: rows.length === 0 ? "100" : "" }]);
  }

  if (skills.length === 0) {
    return <EmptyNote>Nessuna skill: <Link href="/admin/skills" className="underline">creane una</Link>.</EmptyNote>;
  }

  return (
    <div>
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
                    onClick={() => onChange(rows.filter((_, i) => i !== index))}>Rimuovi</button>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <button type="button" className={buttonClass.secondary} onClick={addRow}
                disabled={rows.length >= skills.length}>Aggiungi skill</button>
        {rows.length > 0 && (
          <span className={`text-sm ${Math.abs(sum - 100) > 0.001 ? "text-brand-coral" : "text-brand-muted"}`}>
            Totale: {Math.round(sum * 100) / 100}%
          </span>
        )}
      </div>
    </div>
  );
}
