"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDownTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Modal } from "@/components/ui/Modal";
import { Field, inputClass } from "@/components/auth/StepHeading";
import { requestSensitiveAction, saveConsent } from "@/lib/account";
import {
  AccountCard,
  InlineMessage,
  SectionHeader,
  Toggle,
  dangerButtonClass,
} from "./AccountPrimitives";
import type { PrivacyConsent } from "@/types/account";

const CONFIRM_WORD = "ELIMINA";

function DeleteAccountForm({
  isUnder14,
  onClose,
}: {
  isUnder14: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [typed, setTyped] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [guardianNotified, setGuardianNotified] = useState(false);

  const canConfirm = isUnder14 || typed.trim().toUpperCase() === CONFIRM_WORD;

  async function handleConfirm() {
    setError("");
    setIsSending(true);
    try {
      const outcome = await requestSensitiveAction("delete-account", isUnder14);
      if (outcome === "guardian-required") {
        setGuardianNotified(true);
      } else {
        // TODO: dopo l'eliminazione reale, chiudere la sessione
        router.push("/");
      }
    } catch {
      setError("Non siamo riusciti a completare la richiesta. Riprova.");
    } finally {
      setIsSending(false);
    }
  }

  if (guardianNotified) {
    return (
      <div className="space-y-4">
        <InlineMessage kind="success">
          Abbiamo inviato un&apos;email al tuo genitore o tutore. L&apos;account
          verrà eliminato solo quando confermerà.
        </InlineMessage>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-primary text-sm"
          >
            Ho capito
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm leading-6 text-[#667085]">
        Eliminando l&apos;account perderai in modo definitivo profilo,
        progressi, XP, personaggio e Quaderno. Non potremo recuperarli.
      </p>

      {isUnder14 ? (
        <InlineMessage kind="info">
          Hai meno di 14 anni: invieremo una richiesta al tuo genitore o tutore,
          che dovrà confermarla.
        </InlineMessage>
      ) : (
        <Field label={`Per confermare, scrivi ${CONFIRM_WORD}`}>
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            className={inputClass}
            autoComplete="off"
          />
        </Field>
      )}

      {error && <InlineMessage kind="error">{error}</InlineMessage>}

      <div className="flex flex-wrap justify-end gap-3 pt-1">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary text-sm"
        >
          Annulla
        </button>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!canConfirm || isSending}
          className={`${dangerButtonClass} text-sm`}
        >
          {isUnder14 ? "Chiedi conferma al genitore" : "Elimina il mio account"}
        </button>
      </div>
    </div>
  );
}

export function PrivacySection({
  consents,
  isUnder14,
}: {
  consents: PrivacyConsent[];
  isUnder14: boolean;
}) {
  const [items, setItems] = useState(consents);
  const [consentError, setConsentError] = useState("");
  const [exportMessage, setExportMessage] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  async function handleConsent(id: string, granted: boolean) {
    const previous = items;
    setItems((current) =>
      current.map((item) => (item.id === id ? { ...item, granted } : item)),
    );
    setConsentError("");
    try {
      await saveConsent(id, granted);
    } catch {
      setItems(previous);
      setConsentError("Non siamo riusciti a salvare la preferenza. Riprova.");
    }
  }

  async function handleExport() {
    setIsExporting(true);
    setExportMessage("");
    try {
      const outcome = await requestSensitiveAction("export-data", isUnder14);
      setExportMessage(
        outcome === "guardian-required"
          ? "Abbiamo inviato una richiesta al tuo genitore o tutore: riceverà i tuoi dati dopo la conferma."
          : "Richiesta inviata. Quando la copia dei tuoi dati sarà pronta, ti scriveremo un'email.",
      );
    } catch {
      setExportMessage("");
      setConsentError("Non siamo riusciti a inviare la richiesta. Riprova.");
    } finally {
      setIsExporting(false);
    }
  }

  return (
    <section aria-labelledby="account-privacy">
      <SectionHeader
        id="account-privacy"
        title="Privacy"
        description="Decidi cosa possiamo fare con i tuoi dati e come tenerli sotto controllo."
      />

      <div className="space-y-4">
        {isUnder14 && (
          <InlineMessage kind="info">
            Alcune azioni, come scaricare o eliminare i dati, richiedono la
            conferma di un genitore o tutore.
          </InlineMessage>
        )}
        {consentError && (
          <InlineMessage kind="error">{consentError}</InlineMessage>
        )}

        <AccountCard title="Consensi e preferenze">
          <ul className="divide-y divide-border">
            {items.map((consent) => (
              <li
                key={consent.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-2 text-base font-bold text-foreground">
                    {consent.label}
                    {consent.required && (
                      <span className="rounded-full bg-surface-blue px-2.5 py-0.5 text-xs font-semibold text-brand-primary">
                        Necessario
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-sm leading-6 text-brand-muted">
                    {consent.description}
                    {consent.href && (
                      <>
                        {" "}
                        <Link
                          href={consent.href}
                          className="font-semibold text-brand-primary hover:underline"
                        >
                          Leggi
                        </Link>
                      </>
                    )}
                  </p>
                </div>
                <Toggle
                  checked={consent.granted}
                  disabled={consent.required}
                  onChange={(value) => handleConsent(consent.id, value)}
                  label={consent.label}
                />
              </li>
            ))}
          </ul>
        </AccountCard>

        <AccountCard
          title="I tuoi dati"
          description="Puoi chiedere una copia di tutto ciò che BStudent conserva su di te."
        >
          {exportMessage && (
            <div className="mb-4">
              <InlineMessage kind="success">{exportMessage}</InlineMessage>
            </div>
          )}
          <button
            type="button"
            onClick={handleExport}
            disabled={isExporting}
            className="btn-secondary text-sm disabled:opacity-50"
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            {isExporting
              ? "Invio richiesta..."
              : "Richiedi una copia dei tuoi dati"}
          </button>
        </AccountCard>

        <AccountCard
          id="elimina-account"
          tone="danger"
          title="Elimina il tuo account"
          description="È un'azione definitiva: profilo, progressi e Quaderno vengono cancellati e non si possono recuperare."
        >
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className={`${dangerButtonClass} text-sm`}
          >
            <TrashIcon className="h-4 w-4" />
            Elimina account
          </button>
        </AccountCard>
      </div>

      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        eyebrow="BStudent"
        title="Elimina il tuo account"
      >
        <DeleteAccountForm
          isUnder14={isUnder14}
          onClose={() => setDeleteOpen(false)}
        />
      </Modal>
    </section>
  );
}
