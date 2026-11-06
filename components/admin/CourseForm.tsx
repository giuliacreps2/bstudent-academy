"use client";

import { useState } from "react";
import { createCourse, updateCourse } from "@/lib/admin";
import type { AccessTier, Course, Subject } from "@/types/admin";
import { buttonClass, Field, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Creazione (con scelta della materia) o modifica di un corso.
   Il livello di accesso del corso è il default delle missioni che non ne indicano uno proprio */

export default function CourseForm({ subjects, course }: { subjects: Subject[]; course?: Course }) {
  const { run, pending, error, setError } = useAdminMutation();
  const [subjectId, setSubjectId] = useState<number | null>(course?.subjectId ?? subjects[0]?.subjectId ?? null);
  const [title, setTitle] = useState(course?.title ?? "");
  const [shortDescription, setShortDescription] = useState(course?.shortDescription ?? "");
  const [extendedDescription, setExtendedDescription] = useState(course?.extendedDescription ?? "");
  const [coverReference, setCoverReference] = useState(course?.coverReference ?? "");
  const [accessTier, setAccessTier] = useState<AccessTier>(course?.accessTier ?? "premium");
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    const body = { title, shortDescription, extendedDescription, coverReference: coverReference || null, accessTier };
    if (course) {
      const ok = await run(() => updateCourse(course.courseId, body));
      setSaved(ok);
      return;
    }
    if (subjectId === null) {
      setError("Crea prima una materia");
      return;
    }
    // Il corso nuovo si apre subito per aggiungere le missioni
    await run(() => createCourse(subjectId, body), {
      redirectTo: (created) => `/admin/courses/${created.courseId}`,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
      {!course && (
        <Field label="Materia">
          <select className={inputClass} value={subjectId ?? ""} onChange={(e) => setSubjectId(Number(e.target.value))} required>
            {subjects.map((s) => <option key={s.subjectId} value={s.subjectId}>{s.name}</option>)}
          </select>
        </Field>
      )}
      <Field label="Titolo">
        <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} required maxLength={200} />
      </Field>
      <Field label="Livello di accesso" hint="Default delle missioni del corso">
        <select className={inputClass} value={accessTier} onChange={(e) => setAccessTier(e.target.value as AccessTier)}>
          <option value="premium">Premium</option>
          <option value="free">Free</option>
        </select>
      </Field>
      <Field label="Copertina" hint="Percorso o URL dell'immagine, facoltativo">
        <input className={inputClass} value={coverReference} onChange={(e) => setCoverReference(e.target.value)} maxLength={500} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Descrizione breve">
          <input className={inputClass} value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required maxLength={500} />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <Field label="Presentazione estesa">
          <textarea className={inputClass} rows={4} value={extendedDescription} onChange={(e) => setExtendedDescription(e.target.value)} required />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className={buttonClass.primary} disabled={pending}>{course ? "Salva" : "Crea corso"}</button>
        {saved && <Notice tone="success">Salvato.</Notice>}
        {error && <Notice tone="error">{error}</Notice>}
      </div>
    </form>
  );
}
