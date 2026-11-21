"use client";

import { useState } from "react";
import { createMission, orNull, updateMission, VIDEO_PROVIDERS } from "@/lib/admin";
import type { AccessTier, Mission, VideoProvider } from "@/types/admin";
import { buttonClass, Field, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* Creazione (in coda alle missioni del corso) o modifica di una missione.
   Livello di accesso vuoto = eredita dal corso; ammessa anche premium in un corso free.
   Alla creazione bastano titolo, descrizione e accesso: il resto (presentazione e briefing) si completa
   nella pagina della missione */

const MAX_ITEMS = 5;

export default function MissionForm({ courseId, mission }: { courseId?: number; mission?: Mission }) {
  const { run, pending, error } = useAdminMutation();
  const [title, setTitle] = useState(mission?.title ?? "");
  const [shortDescription, setShortDescription] = useState(mission?.shortDescription ?? "");
  const [accessTier, setAccessTier] = useState<AccessTier | "">(mission?.accessTier ?? "");
  const [slug, setSlug] = useState(mission?.slug ?? "");
  const [tagline, setTagline] = useState(mission?.tagline ?? "");
  const [coverReference, setCoverReference] = useState(mission?.coverReference ?? "");
  const [isFinal, setIsFinal] = useState(mission?.isFinal ?? false);
  const [videoProvider, setVideoProvider] = useState<VideoProvider | "">(mission?.briefingVideoProvider ?? "");
  const [videoIdentifier, setVideoIdentifier] = useState(mission?.briefingVideoIdentifier ?? "");
  const [briefingLines, setBriefingLines] = useState<string[]>(mission?.briefingLines ?? []);
  const [learningGoals, setLearningGoals] = useState<string[]>(mission?.learningGoals ?? []);
  const [saved, setSaved] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setSaved(false);
    const body = {
      title,
      shortDescription,
      accessTier: accessTier || null,
      slug: orNull(slug),
      tagline: orNull(tagline),
      coverReference: orNull(coverReference),
      isFinal,
      briefingVideoProvider: videoProvider || null,
      briefingVideoIdentifier: videoProvider ? orNull(videoIdentifier) : null,
      // Le righe lasciate vuote non si inviano
      briefingLines: briefingLines.map((l) => l.trim()).filter(Boolean),
      learningGoals: learningGoals.map((g) => g.trim()).filter(Boolean),
    };
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
      setSaved(true);
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

      {mission && (
        <>
          <Field label="Indirizzo della pagina" hint="Unico nel corso. Se lo lasci vuoto si crea dal titolo">
            <input className={inputClass} value={slug} onChange={(e) => setSlug(e.target.value)} maxLength={120} />
          </Field>
          <Field label="Copertina" hint="Codice dell'immagine su Cloudinary, facoltativo">
            <input className={inputClass} value={coverReference} onChange={(e) => setCoverReference(e.target.value)} maxLength={500} />
          </Field>
          <label className="flex items-end gap-2 text-sm">
            <input type="checkbox" checked={isFinal} onChange={(e) => setIsFinal(e.target.checked)} />
            <span>Prova finale del corso <span className="text-brand-muted">(al massimo una per corso)</span></span>
          </label>
          <div className="sm:col-span-3">
            <Field label="Frase di presentazione" hint="Una riga sotto il titolo, facoltativa">
              <input className={inputClass} value={tagline} onChange={(e) => setTagline(e.target.value)} maxLength={300} />
            </Field>
          </div>
          <div className="sm:col-span-3">
            <TextList label="Cosa imparerai" hint={`Frasi brevi, fino a ${MAX_ITEMS}`} items={learningGoals}
                      onChange={setLearningGoals} maxLength={200} addLabel="Aggiungi un obiettivo" />
          </div>
          <div className="sm:col-span-3">
            <TextList label="Briefing: battute della guida"
                      hint={`Prima di iniziare, la guida della materia presenta la missione in ${MAX_ITEMS} battute al massimo. Lo studente può saltarle`}
                      items={briefingLines} onChange={setBriefingLines} maxLength={500} multiline addLabel="Aggiungi una battuta" />
          </div>
          <Field label="Video del briefing" hint="Facoltativo">
            <select className={inputClass} value={videoProvider} onChange={(e) => setVideoProvider(e.target.value as VideoProvider | "")}>
              <option value="">Nessun video</option>
              {VIDEO_PROVIDERS.map((p) => <option key={p.key} value={p.key}>{p.label}</option>)}
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Codice del video" hint="La parte finale del link, es. dQw4w9WgXcQ per YouTube o 76979871 per Vimeo">
              <input className={inputClass} value={videoIdentifier} onChange={(e) => setVideoIdentifier(e.target.value)}
                     maxLength={200} disabled={!videoProvider} required={!!videoProvider} />
            </Field>
          </div>
        </>
      )}

      <div className="sm:col-span-3">
        <button type="submit" className={buttonClass.primary} disabled={pending}>{mission ? "Salva" : "Aggiungi missione"}</button>
        {saved && <Notice tone="success">{mission ? "Salvato." : "Missione aggiunta in fondo al corso."}</Notice>}
        {error && <Notice tone="error">{error}</Notice>}
      </div>
    </form>
  );
}

/** Elenco di frasi (fino a MAX_ITEMS) con aggiungi e togli */
function TextList({ label, hint, items, onChange, maxLength, multiline, addLabel }: {
  label: string;
  hint: string;
  items: string[];
  onChange: (items: string[]) => void;
  maxLength: number;
  multiline?: boolean;
  addLabel: string;
}) {
  const update = (index: number, value: string) => onChange(items.map((item, i) => (i === index ? value : item)));
  const remove = (index: number) => onChange(items.filter((_, i) => i !== index));

  return (
    <div className="text-sm">
      <span className="mb-1 block font-medium text-foreground">{label}</span>
      <span className="mb-2 block text-xs text-brand-muted">{hint}</span>
      <ol className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1 w-5 text-brand-muted">{index + 1}.</span>
            {multiline ? (
              <textarea className={inputClass} rows={2} value={item} maxLength={maxLength}
                        onChange={(e) => update(index, e.target.value)} aria-label={`${label} ${index + 1}`} />
            ) : (
              <input className={inputClass} value={item} maxLength={maxLength}
                     onChange={(e) => update(index, e.target.value)} aria-label={`${label} ${index + 1}`} />
            )}
            <button type="button" className={buttonClass.secondary} onClick={() => remove(index)}>Togli</button>
          </li>
        ))}
      </ol>
      {items.length < MAX_ITEMS && (
        <button type="button" className={`${buttonClass.secondary} mt-2`} onClick={() => onChange([...items, ""])}>
          {addLabel}
        </button>
      )}
    </div>
  );
}
