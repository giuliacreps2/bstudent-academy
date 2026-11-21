"use client";

import { useState } from "react";
import { COURSE_LEVELS, createCourse, orNull, updateCourse, WORLD_THEMES } from "@/lib/admin";
import type { AccessTier, Course, CourseLevel, Subject } from "@/types/admin";
import { buttonClass, Field, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Creazione (con scelta della materia) o modifica di un corso.
   Il livello di accesso del corso è il default delle missioni che non ne indicano uno proprio.
   Il livello (Principiante, Intermedio, Avanzato) serve al test di livello: senza, il corso non si pubblica */

/** Data ISO -> valore di <input type="date"> (giorno locale) */
function toDateInput(value: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** "In evidenza fino al" giorno scelto, compreso: fine della giornata */
function fromDateInput(value: string): string | null {
  return value ? new Date(`${value}T23:59:59`).toISOString() : null;
}

/** Proposta del blueprint §5.8: una settimana da oggi */
function oneWeekFromToday(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7);
  return toDateInput(date.toISOString());
}

export default function CourseForm({ subjects, course }: { subjects: Subject[]; course?: Course }) {
  const { run, pending, error, setError } = useAdminMutation();
  const [subjectId, setSubjectId] = useState<number | null>(course?.subjectId ?? subjects[0]?.subjectId ?? null);
  const [title, setTitle] = useState(course?.title ?? "");
  const [slug, setSlug] = useState(course?.slug ?? "");
  const [tagline, setTagline] = useState(course?.tagline ?? "");
  const [level, setLevel] = useState<CourseLevel | "">(course?.level ?? "");
  const [shortDescription, setShortDescription] = useState(course?.shortDescription ?? "");
  const [extendedDescription, setExtendedDescription] = useState(course?.extendedDescription ?? "");
  const [coverReference, setCoverReference] = useState(course?.coverReference ?? "");
  const [accessTier, setAccessTier] = useState<AccessTier>(course?.accessTier ?? "premium");
  const [featuredUntil, setFeaturedUntil] = useState(toDateInput(course?.featuredUntil ?? null));
  const [worldTheme, setWorldTheme] = useState(course?.worldTheme ?? "");
  const [quote, setQuote] = useState(course?.quote ?? "");
  const [quoteAuthor, setQuoteAuthor] = useState(course?.quoteAuthor ?? "");
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    const body = {
      title,
      shortDescription,
      extendedDescription,
      coverReference: orNull(coverReference),
      accessTier,
      slug: orNull(slug),
      tagline: orNull(tagline),
      level: level || null,
      featuredUntil: fromDateInput(featuredUntil),
      worldTheme: worldTheme || null,
      quote: orNull(quote),
      quoteAuthor: orNull(quote) ? orNull(quoteAuthor) : null,
    };
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
      <Field label="Indirizzo della pagina" hint="Es. latino-base. Se lo lasci vuoto si crea dal titolo">
        <input className={inputClass} value={slug} onChange={(e) => setSlug(e.target.value)} maxLength={120} />
      </Field>
      <Field label="Livello" hint="Serve per pubblicare: il test di livello consiglia da quale corso partire">
        <select className={inputClass} value={level} onChange={(e) => setLevel(e.target.value as CourseLevel | "")}>
          <option value="">Da scegliere</option>
          {COURSE_LEVELS.map((l) => <option key={l.key} value={l.key}>{l.label}</option>)}
        </select>
      </Field>
      <Field label="Livello di accesso" hint="Default delle missioni del corso">
        <select className={inputClass} value={accessTier} onChange={(e) => setAccessTier(e.target.value as AccessTier)}>
          <option value="premium">Premium</option>
          <option value="free">Free</option>
        </select>
      </Field>
      <Field label="Copertina" hint="Codice dell'immagine su Cloudinary, facoltativo">
        <input className={inputClass} value={coverReference} onChange={(e) => setCoverReference(e.target.value)} maxLength={500} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Sottotitolo" hint="Frase sotto il titolo nella pagina del corso, facoltativa">
          <input className={inputClass} value={tagline} onChange={(e) => setTagline(e.target.value)} maxLength={300} />
        </Field>
      </div>
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
      <Field label="Mondo della mappa" hint="Lo sfondo su cui compaiono le missioni">
        <select className={inputClass} value={worldTheme} onChange={(e) => setWorldTheme(e.target.value)}>
          <option value="">Da scegliere</option>
          {WORLD_THEMES.map((t) => <option key={t.key} value={t.key}>{t.label}</option>)}
        </select>
      </Field>
      <Field label="In evidenza fino al" hint="Vuoto = non in evidenza. Di solito una settimana dall'uscita">
        <div className="flex gap-2">
          <input type="date" className={inputClass} value={featuredUntil} onChange={(e) => setFeaturedUntil(e.target.value)} />
          <button type="button" className={buttonClass.secondary} onClick={() => setFeaturedUntil(oneWeekFromToday())}>
            1 settimana
          </button>
        </div>
      </Field>
      <Field label="Citazione" hint="Facoltativa, compare sulla mappa">
        <input className={inputClass} value={quote} onChange={(e) => setQuote(e.target.value)} maxLength={500} />
      </Field>
      <Field label="Autore della citazione">
        <input className={inputClass} value={quoteAuthor} onChange={(e) => setQuoteAuthor(e.target.value)} maxLength={150}
               disabled={quote.trim() === ""} />
      </Field>
      <div className="sm:col-span-2">
        <button type="submit" className={buttonClass.primary} disabled={pending}>{course ? "Salva" : "Crea corso"}</button>
        {saved && <Notice tone="success">Salvato.</Notice>}
        {error && <Notice tone="error">{error}</Notice>}
      </div>
    </form>
  );
}
