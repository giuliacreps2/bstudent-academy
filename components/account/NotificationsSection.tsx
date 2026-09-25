"use client";

import { useState } from "react";
import { saveNotificationPreferences } from "@/lib/account";
import {
  AccountCard,
  InlineMessage,
  SectionHeader,
  Toggle,
} from "./AccountPrimitives";
import type { NotificationPreferences } from "@/types/account";

const options: {
  key: keyof NotificationPreferences;
  label: string;
  description: string;
}[] = [
  {
    key: "studyReminders",
    label: "Promemoria di studio",
    description: "Un piccolo avviso per non perdere il tuo ritmo.",
  },
  {
    key: "missionsToContinue",
    label: "Missioni e corsi da continuare",
    description: "Ti ricordiamo cosa hai lasciato a metà.",
  },
  {
    key: "news",
    label: "Novità BStudent",
    description: "Nuovi corsi, funzioni e articoli del blog.",
  },
];

export function NotificationsSection({
  initial,
}: {
  initial: NotificationPreferences;
}) {
  const [preferences, setPreferences] = useState(initial);
  const [error, setError] = useState("");

  async function handleChange(
    key: keyof NotificationPreferences,
    value: boolean,
  ) {
    const previous = preferences;
    const next = { ...preferences, [key]: value };

    setPreferences(next); // aggiornamento immediato
    setError("");
    try {
      await saveNotificationPreferences(next);
    } catch {
      setPreferences(previous);
      setError("Non siamo riusciti a salvare la preferenza. Riprova.");
    }
  }

  return (
    <section aria-labelledby="account-notifiche">
      <SectionHeader
        id="account-notifiche"
        title="Notifiche"
        description="Scegli cosa vuoi ricevere. Puoi cambiare idea quando vuoi."
      />

      <div className="space-y-4">
        {error && <InlineMessage kind="error">{error}</InlineMessage>}

        <AccountCard>
          <ul className="divide-y divide-border">
            {options.map((option) => (
              <li
                key={option.key}
                className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
              >
                <div className="min-w-0">
                  <p className="text-base font-bold text-foreground">
                    {option.label}
                  </p>
                  <p className="mt-0.5 text-sm leading-6 text-brand-muted">
                    {option.description}
                  </p>
                </div>
                <Toggle
                  checked={preferences[option.key]}
                  onChange={(value) => handleChange(option.key, value)}
                  label={option.label}
                />
              </li>
            ))}
          </ul>
        </AccountCard>
      </div>
    </section>
  );
}
