"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { Field, inputClass } from "@/components/auth/StepHeading";
import { saveProfile } from "@/lib/account";
import {
  AccountCard,
  InlineMessage,
  SectionHeader,
  SettingList,
  SettingRow,
} from "./AccountPrimitives";
import type { AccountProfile } from "@/types/account";

const USERNAME_PATTERN = /^[a-zA-Z0-9_.]{3,20}$/;

export function ProfileSection({ profile }: { profile: AccountProfile }) {
  const [saved, setSaved] = useState({
    name: profile.name,
    username: profile.username,
  });
  const [draft, setDraft] = useState(saved);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function startEditing() {
    setDraft(saved);
    setError("");
    setSuccess(false);
    setIsEditing(true);
  }

  async function handleSave() {
    const name = draft.name.trim();
    const username = draft.username.trim();

    if (!name) return setError("Inserisci il tuo nome.");
    if (!USERNAME_PATTERN.test(username)) {
      return setError(
        "Lo username deve avere da 3 a 20 caratteri: lettere, numeri, punto o trattino basso.",
      );
    }

    setError("");
    setIsSaving(true);
    try {
      await saveProfile({ name, username });
      setSaved({ name, username });
      setIsEditing(false);
      setSuccess(true);
    } catch {
      setError("Non siamo riusciti a salvare le modifiche. Riprova.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section aria-labelledby="account-profilo">
      <SectionHeader
        id="account-profilo"
        title="Profilo"
        description="Come ti vedono gli altri su BStudent."
      />

      <div className="space-y-4">
        <AccountCard>
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-surface-blue">
              <Image
                src={profile.avatarUrl}
                alt={profile.avatarName}
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-brand-muted">
                Il tuo personaggio
              </p>
              <p className="truncate text-lg font-extrabold text-foreground">
                {profile.avatarName}
              </p>
              <Link
                href="/my/character"
                className="btn-secondary mt-2 px-4 py-2 text-sm"
              >
                Vai a Il mio personaggio
              </Link>
            </div>
          </div>
        </AccountCard>

        <AccountCard title="I tuoi dati">
          {success && !isEditing && (
            <div className="mb-4">
              <InlineMessage kind="success">Profilo aggiornato.</InlineMessage>
            </div>
          )}

          {isEditing ? (
            <div className="space-y-4">
              <Field label="Nome">
                <input
                  value={draft.name}
                  onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                  className={inputClass}
                  autoComplete="given-name"
                />
              </Field>
              <Field label="Username">
                <input
                  value={draft.username}
                  onChange={(e) =>
                    setDraft({ ...draft, username: e.target.value })
                  }
                  className={inputClass}
                  autoComplete="username"
                />
              </Field>

              {error && <InlineMessage kind="error">{error}</InlineMessage>}

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="btn-primary text-sm disabled:opacity-50"
                >
                  {isSaving ? "Salvataggio..." : "Salva modifiche"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary text-sm"
                >
                  Annulla
                </button>
              </div>
            </div>
          ) : (
            <>
              <SettingList>
                <SettingRow label="Nome" value={saved.name} />
                <SettingRow label="Username" value={saved.username} />
                <SettingRow label="Email" value={profile.email} />
                <SettingRow label="Iscritto dal" value={profile.joinedAt} />
                {profile.isUnder14 && profile.guardianEmail && (
                  <SettingRow
                    label="Genitore o tutore"
                    value={profile.guardianEmail}
                  />
                )}
              </SettingList>

              <button
                type="button"
                onClick={startEditing}
                className="btn-primary mt-6 text-sm"
              >
                <PencilSquareIcon className="h-4 w-4" />
                Modifica profilo
              </button>
            </>
          )}
        </AccountCard>
      </div>
    </section>
  );
}
