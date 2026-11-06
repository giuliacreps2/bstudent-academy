"use client";

import { useState } from "react";
import { createExercise, updateExercise } from "@/lib/admin";
import { buttonClass, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Titolo interno, visibile solo all'Admin. Senza exerciseId crea l'esercizio e apre la sua pagina */

export default function ExerciseTitleForm({ exerciseId, initialTitle = "" }: { exerciseId?: number; initialTitle?: string }) {
  const { run, pending, error } = useAdminMutation();
  const [title, setTitle] = useState(initialTitle);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    if (exerciseId !== undefined) {
      setSaved(await run(() => updateExercise(exerciseId, title)));
    } else {
      await run(() => createExercise(title), {
        redirectTo: (created) => `/admin/exercises/${created.questionBankEntryId}`,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap items-center gap-2">
      <input
        className={`${inputClass} max-w-md`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titolo interno (es. Genitivo prima declinazione)"
        aria-label="Titolo interno"
        required
        maxLength={200}
      />
      <button type="submit" className={buttonClass.primary} disabled={pending}>
        {exerciseId !== undefined ? "Salva titolo" : "Crea esercizio"}
      </button>
      {saved && <Notice tone="success">Salvato.</Notice>}
      {error && <div className="w-full"><Notice tone="error">{error}</Notice></div>}
    </form>
  );
}
