"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { InlineMessage } from "@/components/account/AccountPrimitives";
import { Field, inputClass } from "./StepHeading";
import { PasswordField, newPasswordError } from "./PasswordField";
import { Done } from "./TokenPages";
import {
  giveGuardianConsent,
  previewRegistration,
  rejectGuardianConsent,
} from "@/lib/registration";
import { errorMessage } from "@/lib/api";
import type {
  GuardianRelationship,
  RegistrationPreview,
} from "@/types/registration";

/** Etichette dell'enum Relationship del backend */
const relationshipOptions: { value: GuardianRelationship; label: string }[] = [
  { value: "parents", label: "Genitore" },
  { value: "legal_guardian", label: "Tutore legale" },
  { value: "custodian", label: "Affidatario" },
  { value: "relative", label: "Altro parente (zio, nonno...)" },
  { value: "other", label: "Altro / nessuna relazione formale" },
];

type Outcome = "consented" | "rejected" | null;

/**
 * Pagina del link inviato al genitore/tutore di uno studente sotto i 14 anni.
 * L'anteprima (POST, sola lettura) non consuma il token.
 */
export function GuardianConsent({
  token,
  currentEmail,
}: {
  token: string;
  /** Email della sessione attiva, se il genitore ha già fatto l'accesso */
  currentEmail: string | null;
}) {
  const [preview, setPreview] = useState<RegistrationPreview | null>(null);
  const [loadError, setLoadError] = useState("");
  const [relationship, setRelationship] = useState<GuardianRelationship | "">("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [confirmReject, setConfirmReject] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [outcome, setOutcome] = useState<Outcome>(null);

  useEffect(() => {
    previewRegistration(token)
      .then(setPreview)
      .catch((err) =>
        setLoadError(
          errorMessage(err, "Il link non è valido o è scaduto."),
        ),
      );
  }, [token]);

  if (outcome === "consented") {
    return (
      <Done>
        Grazie! L&apos;account di{" "}
        <strong className="text-[#172033]">{studentLabel(preview)}</strong> è
        attivo. Gli abbiamo inviato un&apos;email per iniziare.
      </Done>
    );
  }

  if (outcome === "rejected") {
    return (
      <Done>
        Richiesta rifiutata. Non conserviamo i dati della registrazione.
      </Done>
    );
  }

  if (loadError) return <InlineMessage kind="error">{loadError}</InlineMessage>;
  if (!preview) return <p className="text-sm text-[#667085]">Caricamento...</p>;

  // Il genitore ha già un account: deve entrare con quello (anche con Google)
  if (preview.guardianHasAccount && !currentEmail) {
    const next = `/registration/guardian-consent?token=${encodeURIComponent(token)}`;
    return (
      <div className="space-y-4">
        <Intro preview={preview} />
        <InlineMessage kind="info">
          Hai già un account BStudent: accedi con email e password per
          confermare.
        </InlineMessage>
        <Link
          href={`/login?next=${encodeURIComponent(next)}`}
          className="btn-primary w-full"
        >
          Accedi per continuare
        </Link>
      </div>
    );
  }

  const needsPassword = !preview.guardianHasAccount;

  async function handleConsent(event: React.FormEvent) {
    event.preventDefault();
    if (!relationship) return setError("Indica il tuo legame con lo studente.");
    if (needsPassword) {
      const invalid = newPasswordError(password, confirm);
      if (invalid) return setError(invalid);
    }
    if (!accepted) {
      return setError("Per confermare accetta i Termini e la Privacy Policy.");
    }

    setError("");
    setIsSubmitting(true);
    try {
      await giveGuardianConsent({
        token,
        relationship,
        firstName,
        lastName,
        password: needsPassword ? password : undefined,
      });
      setOutcome("consented");
    } catch (err) {
      setError(errorMessage(err, "Non siamo riusciti a registrare il consenso. Riprova."));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleReject() {
    setError("");
    setIsSubmitting(true);
    try {
      await rejectGuardianConsent(token);
      setOutcome("rejected");
    } catch (err) {
      setError(errorMessage(err, "Non siamo riusciti a rifiutare la richiesta. Riprova."));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleConsent} className="space-y-4" noValidate>
      <Intro preview={preview} />

      {currentEmail && (
        <InlineMessage kind="info">
          Confermi come <strong>{currentEmail}</strong>.
        </InlineMessage>
      )}

      <Field label="Il tuo legame con lo studente">
        <select
          value={relationship}
          onChange={(e) => setRelationship(e.target.value as GuardianRelationship)}
          className={inputClass}
        >
          <option value="">Seleziona...</option>
          {relationshipOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </Field>

      {needsPassword && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nome (facoltativo)">
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
                autoComplete="given-name"
              />
            </Field>
            <Field label="Cognome (facoltativo)">
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={inputClass}
                autoComplete="family-name"
              />
            </Field>
          </div>

          <p className="text-sm leading-6 text-[#667085]">
            Creiamo anche il tuo account da genitore: ti servirà per seguire i
            progressi e gestire le autorizzazioni.
          </p>
          <PasswordField
            label="Scegli una password"
            value={password}
            onChange={setPassword}
            placeholder="Almeno 8 caratteri"
          />
          <PasswordField
            label="Ripeti la password"
            value={confirm}
            onChange={setConfirm}
          />
        </>
      )}

      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-[#e5eaf2] p-4">
        <input
          type="checkbox"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          className="mt-0.5 h-5 w-5 shrink-0 accent-[#3155d9]"
        />
        <span className="text-sm leading-6 text-[#172033]">
          Acconsento all&apos;uso di BStudent da parte di{" "}
          {studentLabel(preview)} e accetto i{" "}
          <a
            href="/privacy"
            target="_blank"
            className="font-semibold text-[#3155d9] hover:underline"
          >
            Termini e la Privacy Policy
          </a>
          .
        </span>
      </label>

      {error && <InlineMessage kind="error">{error}</InlineMessage>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn-primary w-full disabled:opacity-50"
      >
        {isSubmitting ? "Invio..." : "Do il mio consenso"}
      </button>

      <div className="pt-2 text-center">
        {confirmReject ? (
          <div className="space-y-3 rounded-2xl bg-red-50 p-4">
            <p className="text-sm text-red-700">
              Vuoi davvero rifiutare? La richiesta di {studentLabel(preview)}{" "}
              verrà cancellata.
            </p>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmReject(false)}
                className="btn-secondary px-4 py-2 text-sm"
              >
                Annulla
              </button>
              <button
                type="button"
                onClick={handleReject}
                disabled={isSubmitting}
                className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                Sì, rifiuta
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirmReject(true)}
            className="text-sm font-semibold text-[#667085] hover:text-red-600 hover:underline"
          >
            Non conosco questa richiesta / rifiuto
          </button>
        )}
      </div>
    </form>
  );
}

function studentLabel(preview: RegistrationPreview | null): string {
  if (!preview) return "lo studente";
  return preview.studentName
    ? `${preview.studentName} (${preview.studentUsername})`
    : preview.studentUsername;
}

function Intro({ preview }: { preview: RegistrationPreview }) {
  return (
    <p className="text-sm leading-6 text-[#667085]">
      <strong className="text-[#172033]">{studentLabel(preview)}</strong> si
      è registrato su BStudent e ha indicato te come genitore o tutore. Per i
      minori di 14 anni serve il tuo consenso. Il link scade il{" "}
      {new Date(preview.expiresAt).toLocaleDateString("it-IT")}.
    </p>
  );
}
