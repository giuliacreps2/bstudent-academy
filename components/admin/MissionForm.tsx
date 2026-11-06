"use client";

import { useState } from "react";
import { createMission, updateMission } from "@/lib/admin";
import type { AccessTier, Mission } from "@/types/admin";
import { buttonClass, Field, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Creazione (in coda alle missioni del corso) o modifica di una missione.
   Livello di accesso vuoto = eredita dal corso; ammessa anche premium in un corso free */

export default function MissionForm({ courseId, mission }: { courseId?: number; mission?: Mission }) {
  const { run, pending, error } = useAdminMutation();
  const [title, setTitle] = useState(mission?.title ?? "");
  const [shortDescription, setShortDescription] = useState(mission?.shortDescription ?? "");
  const [accessTier, setAccessTier] = useState<AccessTier | "">(mission?.accessTier ?? "");
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    const body = { title, shortDescription, accessTier: accessTier || null };
    if (mission) {
      setSaved(await run(() => updateMission(mission.missionId, body)));
      return;
    }
    if (courseId === undefined) return;
    const ok = await run(() => createMission(courseId, body));
    if (ok) {
      setTitle("");
      setShortDescription("");
      setAccessTier("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-3">
      <Field label="Titolo">
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} />
      </Field>
      <Field label="Descrizione breve">
        <input className={inputClass} value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required maxLength={500} />
      </Field>
      <Field label="Livello di accesso">
        <select className={inputClass} value={accessTier} onChange={(e) => setAccessTier(e.target.value as AccessTier | "")}>
          <option value="">Eredita dal corso</option>
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </select>
      </Field>
      <div className="sm:col-span-3">
        <button type="submit" className={buttonClass.primary} disabled={pending}>{mission ? "Salva" : "Aggiungi missione"}</button>
        {saved && <Notice tone="success">Salvato.</Notice>}
        {error && <Notice tone="error">{error}</Notice>}
      </div>
    </form>
  );
}
