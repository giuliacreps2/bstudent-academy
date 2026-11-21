"use client";

import { useState } from "react";
import { createLesson, updateLesson } from "@/lib/admin";
import type { Topic } from "@/types/admin";
import { buttonClass, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Con missionId crea una lezione in coda alla missione; con lessonId ne modifica titolo e argomento.
   L'argomento (della materia del corso) collega la lezione agli esercizi: "rileggi la teoria" */

export default function LessonTitleForm({
  missionId,
  lessonId,
  initialTitle = "",
  initialTopicId = null,
  topics = [],
}: {
  missionId?: number;
  lessonId?: number;
  initialTitle?: string;
  initialTopicId?: number | null;
  topics?: Topic[];
}) {
  const { run, pending, error } = useAdminMutation();
  const [title, setTitle] = useState(initialTitle);
  const [topicId, setTopicId] = useState<number | null>(initialTopicId);
  const [saved, setSaved] = useState(false);
  const editing = lessonId !== undefined;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    const body = { title, topicId };
    if (editing) {
      setSaved(await run(() => updateLesson(lessonId, body)));
    } else if (missionId !== undefined) {
      if (await run(() => createLesson(missionId, body))) {
        setTitle("");
        setTopicId(null);
        setSaved(true);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      <input
        className={`${inputClass} max-w-md`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titolo della lezione"
        aria-label="Titolo della lezione"
        required
        maxLength={200}
      />
      <select
        className={`${inputClass} max-w-xs`}
        value={topicId ?? ""}
        onChange={(e) => setTopicId(e.target.value ? Number(e.target.value) : null)}
        aria-label="Argomento della lezione"
      >
        <option value="">Argomento: nessuno</option>
        {topics.map((t) => <option key={t.topicId} value={t.topicId}>{t.name}</option>)}
      </select>
      <button type="submit" className={buttonClass.primary} disabled={pending}>
        {editing ? "Salva" : "Aggiungi lezione"}
      </button>
      {saved && <Notice tone="success">{editing ? "Salvato." : "Lezione aggiunta in fondo alla sequenza."}</Notice>}
      {error && <div className="w-full"><Notice tone="error">{error}</Notice></div>}
    </form>
  );
}
