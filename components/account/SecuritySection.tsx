"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Modal } from "@/components/ui/Modal";
import { Field, inputClass } from "@/components/auth/StepHeading";
import { changeEmail, changePassword, logout } from "@/lib/account";
import {
  AccountCard,
  InlineMessage,
  SectionHeader,
  SettingList,
  SettingRow,
} from "./AccountPrimitives";

type SecurityModal = "email" | "password" | null;

function ChangeEmailForm({
  currentEmail,
  onDone,
  onClose,
}: {
  currentEmail: string;
  onDone: (email: string) => void;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const nextEmail = email.trim();

    if (!/^\S+@\S+\.\S+$/.test(nextEmail)) {
      return setError("Inserisci un indirizzo email valido.");
    }
    if (nextEmail.toLowerCase() === currentEmail.toLowerCase()) {
      return setError("Questa è già la tua email.");
    }
    if (!password) return setError("Inserisci la tua password per confermare.");

    setError("");
    setIsSaving(true);
    try {
      await changeEmail({ email: nextEmail, password });
      onDone(nextEmail);
    } catch {
      setError(
        "Non siamo riusciti a cambiare l'email. Controlla la password e riprova.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-sm leading-6 text-[#667085]">
        Ti invieremo un messaggio alla nuova email per confermarla.
      </p>
      <Field label="Nuova email">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="nome@email.com"
          className={inputClass}
          autoComplete="email"
        />
      </Field>
      <Field label="Password attuale">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          autoComplete="current-password"
        />
      </Field>

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
          type="submit"
          disabled={isSaving}
          className="btn-primary text-sm disabled:opacity-50"
        >
          {isSaving ? "Salvataggio..." : "Cambia email"}
        </button>
      </div>
    </form>
  );
}

function ChangePasswordForm({
  onDone,
  onClose,
}: {
  onDone: () => void;
  onClose: () => void;
}) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!currentPassword) return setError("Inserisci la password attuale.");
    if (newPassword.length < 8) {
      return setError("La nuova password deve contenere almeno 8 caratteri.");
    }
    if (newPassword === currentPassword) {
      return setError(
        "La nuova password deve essere diversa da quella attuale.",
      );
    }
    if (newPassword !== confirm) {
      return setError("Le due password non coincidono.");
    }

    setError("");
    setIsSaving(true);
    try {
      await changePassword({ currentPassword, newPassword });
      onDone();
    } catch {
      setError(
        "Non siamo riusciti a cambiare la password. Controlla quella attuale e riprova.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Field label="Password attuale">
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className={inputClass}
          autoComplete="current-password"
        />
      </Field>
      <Field label="Nuova password">
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Almeno 8 caratteri"
          className={inputClass}
          autoComplete="new-password"
        />
      </Field>
      <Field label="Ripeti la nuova password">
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className={inputClass}
          autoComplete="new-password"
        />
      </Field>

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
          type="submit"
          disabled={isSaving}
          className="btn-primary text-sm disabled:opacity-50"
        >
          {isSaving ? "Salvataggio..." : "Cambia password"}
        </button>
      </div>
    </form>
  );
}

export function SecuritySection({ email }: { email: string }) {
  const router = useRouter();
  const [modal, setModal] = useState<SecurityModal>(null);
  const [currentEmail, setCurrentEmail] = useState(email);
  const [notice, setNotice] = useState("");
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await logout();
    // TODO: dopo il logout reale, redirect alla pagina di accesso
    router.push("/");
  }

  return (
    <section aria-labelledby="account-sicurezza">
      <SectionHeader
        id="account-sicurezza"
        title="Account e sicurezza"
        description="Le informazioni che usi per entrare in BStudent."
      />

      <div className="space-y-4">
        {notice && <InlineMessage kind="success">{notice}</InlineMessage>}

        <AccountCard title="Accesso">
          <SettingList>
            <SettingRow
              label="Email"
              value={currentEmail}
              action={
                <button
                  type="button"
                  onClick={() => setModal("email")}
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  Cambia
                </button>
              }
            />
            <SettingRow
              label="Password"
              value={<span aria-label="Password nascosta">••••••••</span>}
              action={
                <button
                  type="button"
                  onClick={() => setModal("password")}
                  className="btn-secondary px-4 py-2 text-sm"
                >
                  Cambia
                </button>
              }
            />
            <SettingRow
              label="Accesso con Google o Apple"
              value={
                <span className="inline-flex items-center rounded-full bg-brand-accent/20 px-3 py-1 text-xs font-bold text-foreground">
                  Presto disponibile
                </span>
              }
            />
          </SettingList>
        </AccountCard>

        <AccountCard title="Esci da BStudent">
          <p className="text-sm leading-6 text-brand-muted">
            Esci da questo dispositivo. I tuoi progressi restano al sicuro.
          </p>
          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="btn-secondary mt-4 text-sm disabled:opacity-50"
          >
            <ArrowRightOnRectangleIcon className="h-4 w-4" />
            Esci
          </button>
        </AccountCard>

        <p className="px-1 text-sm text-brand-muted">
          Vuoi eliminare il tuo account?{" "}
          <Link
            href="/my/account?sezione=privacy#elimina-account"
            className="font-semibold text-brand-primary hover:underline"
          >
            Lo trovi nella sezione Privacy
          </Link>
          .
        </p>
      </div>

      <Modal
        open={modal === "email"}
        onClose={() => setModal(null)}
        eyebrow="BStudent"
        title="Cambia email"
      >
        <ChangeEmailForm
          currentEmail={currentEmail}
          onClose={() => setModal(null)}
          onDone={(next) => {
            setCurrentEmail(next);
            setModal(null);
            setNotice(
              "Email aggiornata. Controlla la posta per confermare il nuovo indirizzo.",
            );
          }}
        />
      </Modal>

      <Modal
        open={modal === "password"}
        onClose={() => setModal(null)}
        eyebrow="BStudent"
        title="Cambia password"
      >
        <ChangePasswordForm
          onClose={() => setModal(null)}
          onDone={() => {
            setModal(null);
            setNotice("Password aggiornata.");
          }}
        />
      </Modal>
    </section>
  );
}
