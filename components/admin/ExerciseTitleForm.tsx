"use client";

import { useState } from "react";
import { createExercise, orNull, updateExercise } from "@/lib/admin";
import type { QuestionBankEntry, Subject, Topic } from "@/types/admin";
import { buttonClass, Field, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Titoli e argomento dell'esercizio. Il titolo interno lo vede solo l'Admin; il titolo per lo studente
   compare nella missione, in Palestra e nello storico ed è obbligatorio per pubblicare.
   Senza exercise crea l'esercizio e apre la sua pagina */

export type TopicGroup = { subject: Subject; topics: Topic[] };

export default function ExerciseTitleForm({ exercise, topicGroups = [] }: {
  exercise?: QuestionBankEntry;
  topicGroups?: TopicGroup[];
}) {
  const { run, pending, error } = useAdminMutation();
  const [internalTitle, setInternalTitle] = useState(exercise?.internalTitle ?? "");
  const [title, setTitle] = useState(exercise?.title ?? "");
  const [topicId, setTopicId] = useState<number | null>(exercise?.topicId ?? null);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    const body = { internalTitle, title: orNull(title), topicId };
    if (exercise) {
      setSaved(await run(() => updateExercise(exercise.questionBankEntryId, body)));
    } else {
      await run(() => createExercise(body), {
        redirectTo: (created) => `/admin/exercises/${created.questionBankEntryId}`,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-3">
      <Field label="Titolo interno" hint="Lo vedi solo tu, es. Genitivo prima declinazione (v. facile)">
        <input className={inputClass} value={internalTitle} onChange={(e) => setInternalTitle(e.target.value)} required maxLength={200} />
      </Field>
      <Field label="Titolo per lo studente" hint="Serve per pubblicare, es. Il genitivo della prima declinazione">
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={200} />
      </Field>
      <Field label="Argomento" hint="Facoltativo: collega l'esercizio alla teoria da rileggere">
        <select className={inputClass} value={topicId ?? ""} onChange={(e) => setTopicId(e.target.value ? Number(e.target.value) : null)}>
          <option value="">Nessuno</option>
          {topicGroups.map((group) => (
            <optgroup key={group.subject.subjectId} label={group.subject.name}>
              {group.topics.map((t) => <option key={t.topicId} value={t.topicId}>{t.name}</option>)}
            </optgroup>
          ))}
        </select>
      </Field>
      <div className="sm:col-span-3">
        <button type="submit" className={buttonClass.primary} disabled={pending}>
          {exercise ? "Salva" : "Crea esercizio"}
        </button>
        {saved && <Notice tone="success">Salvato.</Notice>}
        {error && <Notice tone="error">{error}</Notice>}
      </div>
    </form>
  );
}
