"use client";

import Link from "next/link";
import { useState } from "react";
import {
  createSubject,
  deleteSubject,
  orNull,
  publishSubject,
  unpublishSubject,
  updateSubject,
} from "@/lib/admin";
import type { Skill, Subject } from "@/types/admin";
import { buttonClass, Card, EmptyNote, Field, inputClass, Notice, StatusBadge } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* La skill principale (default_skill nel backend) conta al 100% per gli esercizi senza una ripartizione tra le skill.
   Una materia nasce nascosta: si mostra agli studenti con "Pubblica". Senza corsi pubblicati appare come
   "Presto disponibile" */

export default function SubjectsManager({ subjects, skills }: { subjects: Subject[]; skills: Skill[] }) {
  const skillNames = new Map(skills.map((s) => [s.skillId, s.name]));

  return (
    <>
      <Card title="Nuova materia">
        <SubjectForm skills={skills} />
      </Card>
      <Card title="Materie">
        {subjects.length === 0 ? (
          <EmptyNote>Nessuna materia.</EmptyNote>
        ) : (
          <ul className="divide-y divide-border">
            {subjects.map((subject) => (
              <SubjectRow key={subject.subjectId} subject={subject} skills={skills}
                          defaultSkillName={subject.defaultSkillId ? skillNames.get(subject.defaultSkillId) : undefined} />
            ))}
          </ul>
        )}
      </Card>
    </>
  );
}

function SkillSelect({ skills, value, onChange }: {
  skills: Skill[];
  value: number | null;
  onChange: (value: number | null) => void;
}) {
  return (
    <select className={inputClass} value={value ?? ""} onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}>
      <option value="">Nessuna (ogni esercizio avrà la sua ripartizione)</option>
      {skills.map((s) => <option key={s.skillId} value={s.skillId}>{s.name}</option>)}
    </select>
  );
}

function SubjectForm({ skills, subject, onDone }: { skills: Skill[]; subject?: Subject; onDone?: () => void }) {
  const { run, pending, error } = useAdminMutation();
  const [name, setName] = useState(subject?.name ?? "");
  const [slug, setSlug] = useState(subject?.slug ?? "");
  const [tagline, setTagline] = useState(subject?.tagline ?? "");
  const [imageReference, setImageReference] = useState(subject?.imageReference ?? "");
  const [guideName, setGuideName] = useState(subject?.guideName ?? "");
  const [guideImageReference, setGuideImageReference] = useState(subject?.guideImageReference ?? "");
  const [defaultSkillId, setDefaultSkillId] = useState<number | null>(subject?.defaultSkillId ?? null);
  const [created, setCreated] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setCreated(false);
    const body = {
      name,
      slug: orNull(slug),
      tagline: orNull(tagline),
      imageReference: orNull(imageReference),
      guideName: orNull(guideName),
      guideImageReference: orNull(guideImageReference),
      defaultSkillId,
    };
    const ok = await run(() => (subject ? updateSubject(subject.subjectId, body) : createSubject(body)));
    if (ok && !subject) {
      setName("");
      setSlug("");
      setTagline("");
      setImageReference("");
      setGuideName("");
      setGuideImageReference("");
      setDefaultSkillId(null);
      setCreated(true);
    }
    if (ok) onDone?.();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-3">
      <Field label="Nome">
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required maxLength={150} />
      </Field>
      <Field label="Indirizzo della pagina" hint="Es. latino. Se lo lasci vuoto si crea dal nome">
        <input className={inputClass} value={slug} onChange={(e) => setSlug(e.target.value)} maxLength={120} />
      </Field>
      <Field label="Skill principale" hint="Se un esercizio non indica come si divide tra le skill, conta tutto per questa">
        <SkillSelect skills={skills} value={defaultSkillId} onChange={setDefaultSkillId} />
      </Field>
      <div className="sm:col-span-2">
        <Field label="Frase di presentazione" hint="Una riga sotto il nome, facoltativa">
          <input className={inputClass} value={tagline} onChange={(e) => setTagline(e.target.value)} maxLength={300} />
        </Field>
      </div>
      <Field label="Immagine" hint="Codice dell'immagine su Cloudinary, facoltativo">
        <input className={inputClass} value={imageReference} onChange={(e) => setImageReference(e.target.value)} maxLength={500} />
      </Field>
      <Field label="Nome della guida" hint="Il personaggio che presenta le missioni, facoltativo">
        <input className={inputClass} value={guideName} onChange={(e) => setGuideName(e.target.value)} maxLength={100} />
      </Field>
      <Field label="Immagine della guida" hint="Codice dell'immagine su Cloudinary">
        <input className={inputClass} value={guideImageReference} onChange={(e) => setGuideImageReference(e.target.value)} maxLength={500} />
      </Field>
      <div className="flex items-end gap-2">
        <button type="submit" className={buttonClass.primary} disabled={pending}>{subject ? "Salva" : "Crea materia"}</button>
        {onDone && <button type="button" className={buttonClass.secondary} onClick={onDone}>Annulla</button>}
      </div>
      <div className="sm:col-span-3">
        {created && <Notice tone="success">Materia creata: resta nascosta agli studenti finché non la pubblichi.</Notice>}
        {error && <Notice tone="error">{error}</Notice>}
      </div>
    </form>
  );
}

function SubjectRow({ subject, skills, defaultSkillName }: {
  subject: Subject;
  skills: Skill[];
  defaultSkillName?: string;
}) {
  const { run, pending, error } = useAdminMutation();
  const [editing, setEditing] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  if (editing) {
    return (
      <li className="py-3">
        <SubjectForm skills={skills} subject={subject} onDone={() => { setEditing(false); setNotice("Salvato."); }} />
      </li>
    );
  }

  async function toggleVisibility() {
    setNotice(null);
    const publishing = subject.status === "draft";
    const ok = await run(
      () => (publishing ? publishSubject(subject.subjectId) : unpublishSubject(subject.subjectId)),
      publishing ? {} : { confirm: `Nascondere ${subject.name} agli studenti? Corsi e missioni non saranno più visibili.` },
    );
    if (ok) setNotice(publishing ? "Pubblicata: gli studenti la vedono." : "Nascosta agli studenti.");
  }

  return (
    <li className="py-2">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-medium">{subject.name}</span>
        <StatusBadge status={subject.status} />
        <span className="text-sm text-brand-muted">/{subject.slug}</span>
        <span className="text-sm text-brand-muted">Skill principale: {defaultSkillName ?? "nessuna"}</span>
        <span className="flex-1" />
        <Link href={`/admin/courses?subjectId=${subject.subjectId}`} className={buttonClass.secondary}>Corsi</Link>
        <button type="button" className={buttonClass.secondary} disabled={pending} onClick={toggleVisibility}>
          {subject.status === "draft" ? "Pubblica" : "Nascondi"}
        </button>
        <button type="button" className={buttonClass.secondary} onClick={() => setEditing(true)}>Modifica</button>
        <button
          type="button"
          className={buttonClass.danger}
          disabled={pending}
          onClick={() => run(() => deleteSubject(subject.subjectId), { confirm: `Eliminare la materia ${subject.name}?` })}
        >
          Elimina
        </button>
      </div>
      {subject.tagline && <p className="mt-1 text-sm text-brand-muted">{subject.tagline}</p>}
      {notice && <Notice tone="success">{notice}</Notice>}
      {error && <Notice tone="error">{error}</Notice>}
    </li>
  );
}
