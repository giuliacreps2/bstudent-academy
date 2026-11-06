"use client";

import Link from "next/link";
import { useState } from "react";
import { createSubject, deleteSubject, updateSubject } from "@/lib/admin";
import type { Skill, Subject } from "@/types/admin";
import { buttonClass, Card, EmptyNote, Field, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* La skill principale (default_skill nel backend) conta al 100% per gli esercizi senza una ripartizione tra le skill */

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
  const [defaultSkillId, setDefaultSkillId] = useState<number | null>(subject?.defaultSkillId ?? null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const body = { name, defaultSkillId };
    const ok = await run(() => (subject ? updateSubject(subject.subjectId, body) : createSubject(body)));
    if (ok && !subject) {
      setName("");
      setDefaultSkillId(null);
    }
    if (ok) onDone?.();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-3">
      <Field label="Nome">
        <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} required maxLength={150} />
      </Field>
      <Field label="Skill principale" hint="Se un esercizio non indica come si divide tra le skill, conta tutto per questa">
        <SkillSelect skills={skills} value={defaultSkillId} onChange={setDefaultSkillId} />
      </Field>
      <div className="flex items-end gap-2">
        <button type="submit" className={buttonClass.primary} disabled={pending}>{subject ? "Salva" : "Crea materia"}</button>
        {onDone && <button type="button" className={buttonClass.secondary} onClick={onDone}>Annulla</button>}
      </div>
      {error && <div className="sm:col-span-3"><Notice tone="error">{error}</Notice></div>}
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

  if (editing) {
    return <li className="py-3"><SubjectForm skills={skills} subject={subject} onDone={() => setEditing(false)} /></li>;
  }

  return (
    <li className="py-2">
      <div className="flex flex-wrap items-center gap-3">
        <span className="font-medium">{subject.name}</span>
        <span className="text-sm text-brand-muted">Skill principale: {defaultSkillName ?? "nessuna"}</span>
        <span className="flex-1" />
        <Link href={`/admin/courses?subjectId=${subject.subjectId}`} className={buttonClass.secondary}>Corsi</Link>
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
      {error && <Notice tone="error">{error}</Notice>}
    </li>
  );
}
