"use client";

import { useState } from "react";
import { createSkill, deleteSkill, updateSkill } from "@/lib/admin";
import type { Skill } from "@/types/admin";
import { buttonClass, Card, EmptyNote, Field, inputClass, Notice } from "./ui";
import { useAdminMutation } from "./useAdminMutation";

/* L'identificativo (code nel backend) è il nome tecnico stabile della skill: si genera dal nome,
   si può correggere alla creazione e poi non si cambia */

const CODE_PATTERN = /^[a-z][a-z0-9_]*$/;

/** "Grammatica latina" -> "grammatica_latina": minuscolo, senza accenti, spazi e simboli */
function toIdentifier(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^[^a-z]+|_+$/g, "")
    .slice(0, 60);
}

export default function SkillsManager({ skills }: { skills: Skill[] }) {
  return (
    <>
      <Card title="Nuova skill">
        <CreateSkillForm />
      </Card>
      <Card title="Skill">
        {skills.length === 0 ? (
          <EmptyNote>Nessuna skill. Creane almeno una per poter pubblicare le missioni.</EmptyNote>
        ) : (
          <ul className="divide-y divide-border">
            {skills.map((skill) => <SkillRow key={skill.skillId} skill={skill} />)}
          </ul>
        )}
      </Card>
    </>
  );
}

function CreateSkillForm() {
  const { run, pending, error, setError } = useAdminMutation();
  const [code, setCode] = useState("");
  // Finché non lo si modifica a mano, l'identificativo segue il nome
  const [codeEdited, setCodeEdited] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(value: string) {
    setName(value);
    if (!codeEdited) setCode(toIdentifier(value));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!CODE_PATTERN.test(code)) {
      setError("L'identificativo usa solo lettere minuscole senza accenti, numeri e _, e inizia con una lettera");
      return;
    }
    const ok = await run(() => createSkill({ code, name, description: description || null }));
    if (ok) {
      setCode("");
      setCodeEdited(false);
      setName("");
      setDescription("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-3">
      <Field label="Nome" hint="Come lo vedranno studenti e docenti, es. Grammatica">
        <input className={inputClass} value={name} onChange={(e) => handleNameChange(e.target.value)} required maxLength={150} />
      </Field>
      <Field label="Identificativo" hint="Si compila dal nome: è la parola con cui il sistema riconosce la skill. Dopo la creazione non si cambia">
        <input
          className={inputClass}
          value={code}
          onChange={(e) => {
            setCode(e.target.value.trim());
            setCodeEdited(true);
          }}
          required
          maxLength={60}
        />
      </Field>
      <Field label="Descrizione">
        <input className={inputClass} value={description} onChange={(e) => setDescription(e.target.value)} />
      </Field>
      <div className="sm:col-span-3">
        <button type="submit" className={buttonClass.primary} disabled={pending}>Crea skill</button>
        {error && <Notice tone="error">{error}</Notice>}
      </div>
    </form>
  );
}

function SkillRow({ skill }: { skill: Skill }) {
  const { run, pending, error } = useAdminMutation();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(skill.name);
  const [description, setDescription] = useState(skill.description ?? "");

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();
    const ok = await run(() => updateSkill(skill.skillId, { code: skill.code, name, description: description || null }));
    if (ok) setEditing(false);
  }

  return (
    <li className="py-2">
      {editing ? (
        <form onSubmit={handleSave} className="flex flex-wrap items-end gap-2">
          <span className="text-xs text-brand-muted">identificativo: {skill.code}</span>
          <input className={`${inputClass} max-w-xs`} value={name} onChange={(e) => setName(e.target.value)} required aria-label="Nome" />
          <input className={`${inputClass} max-w-sm`} value={description} onChange={(e) => setDescription(e.target.value)} aria-label="Descrizione" placeholder="Descrizione" />
          <button type="submit" className={buttonClass.primary} disabled={pending}>Salva</button>
          <button type="button" className={buttonClass.secondary} onClick={() => setEditing(false)}>Annulla</button>
        </form>
      ) : (
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-medium">{skill.name}</span>
          <span className="text-xs text-brand-muted">identificativo: {skill.code}</span>
          {skill.description && <span className="text-sm text-brand-muted">{skill.description}</span>}
          <span className="flex-1" />
          <button type="button" className={buttonClass.secondary} onClick={() => setEditing(true)}>Modifica</button>
          <button
            type="button"
            className={buttonClass.danger}
            disabled={pending}
            onClick={() => run(() => deleteSkill(skill.skillId), { confirm: `Eliminare la skill ${skill.name}?` })}
          >
            Elimina
          </button>
        </div>
      )}
      {error && <Notice tone="error">{error}</Notice>}
    </li>
  );
}
