"use client";

import { useEffect, useState } from "react";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import { resendConfirmation } from "@/lib/registration";
import { errorMessage } from "@/lib/api";

/** Stessa attesa del backend (registration.resend-cooldown) */
const RESEND_COOLDOWN_SECONDS = 60;

/** Esito della registrazione (202): account non ancora creato, si attende l'email */
export function RegistrationSent({
  email,
  isUnder14,
}: {
  email: string;
  isUnder14: boolean;
}) {
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  async function handleResend() {
    setSecondsLeft(RESEND_COOLDOWN_SECONDS);
    try {
      await resendConfirmation(email);
      setNotice("Fatto! Se non la trovi, controlla anche nello spam.");
    } catch (err) {
      setNotice(errorMessage(err, "Non siamo riusciti a inviarla. Riprova tra poco."));
    }
  }

  return (
    <div className="text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f2ff]">
        <EnvelopeIcon className="h-7 w-7 text-[#3155d9]" />
      </div>

      <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-[#172033]">
        Controlla la posta 📬
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#667085]">
        {isUnder14 ? (
          <>
            Abbiamo scritto al tuo genitore o tutore. Appena conferma, il tuo
            account sarà pronto e riceverai un&apos;email a{" "}
            <strong className="text-[#172033]">{email}</strong>.
          </>
        ) : (
          <>
            Abbiamo inviato un link a{" "}
            <strong className="text-[#172033]">{email}</strong>. Aprilo per
            attivare il tuo account.
          </>
        )}
      </p>

      <p className="mt-2 text-xs text-[#98a2b3]">Il link vale 7 giorni.</p>

      <button
        type="button"
        onClick={handleResend}
        disabled={secondsLeft > 0}
        className="mt-6 text-sm font-semibold text-[#3155d9] hover:underline disabled:cursor-not-allowed disabled:text-[#98a2b3] disabled:no-underline"
      >
        {secondsLeft > 0
          ? `Puoi richiedere un nuovo invio tra ${secondsLeft}s`
          : isUnder14
            ? "Invia di nuovo l'email al genitore"
            : "Invia di nuovo l'email"}
      </button>

      {notice && <p className="mt-2 text-xs text-[#667085]">{notice}</p>}
    </div>
  );
}
