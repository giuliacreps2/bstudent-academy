"use client";

import { useState } from "react";
import { createLesson, updateLesson } from "@/lib/admin";
import { buttonClass, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Con missionId crea una lezione in coda alla missione; con lessonId ne modifica il titolo */

export default function LessonTitleForm({
  missionId,
  lessonId,
  initialTitle = "",
}: {
  missionId?: number;
  lessonId?: number;
  initialTitle?: string;
}) {
  const { run, pending, error } = useAdminMutation();
  const [title, setTitle] = useState(initialTitle);
  const [saved, setSaved] = useState(false);
  const editing = lessonId !== undefined;

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    if (editing) {
      setSaved(await run(() => updateLesson(lessonId, title)));
    } else if (missionId !== undefined) {
      if (await run(() => createLesson(missionId, title))) setTitle("");
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
      <button type="submit" className={buttonClass.primary} disabled={pending}>
        {editing ? "Salva titolo" : "Aggiungi lezione"}
      </button>
      {saved && <Notice tone="success">Salvato.</Notice>}
      {error && <div className="w-full"><Notice tone="error">{error}</Notice></div>}
    </form>
  );
}
