"use client";

import { ArrowPathIcon, CheckIcon } from "@heroicons/react/24/outline";
import {
  readingFontOptions,
  readingSizeOptions,
  readingSpacingOptions,
} from "@/constants/account";
import { useReadingPreferences } from "@/hooks/userReadingPreferences";
import { AccountCard, SectionHeader } from "./AccountPrimitives";

const choiceBase =
  "rounded-xl border px-4 py-3 text-left transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary";
const choiceActive = "border-brand-primary bg-surface-blue";
const choiceIdle = "border-border bg-white hover:border-brand-primary/40";

export function AccessibilitySection() {
  const { preferences, update, reset, isDefault } = useReadingPreferences();

  return (
    <section aria-labelledby="account-accessibilita">
      <SectionHeader
        id="account-accessibilita"
        title="Accessibilità"
        description="Personalizza la lettura: scegli come visualizzare i contenuti per rendere BStudent più comodo da usare."
      />

      <div className="space-y-4">
        {/* FONT */}
        <AccountCard title="Font">
          <div
            role="radiogroup"
            aria-label="Font"
            className="grid gap-3 lg:grid-cols-3"
          >
            {readingFontOptions.map((option) => {
              const active = preferences.font === option.key;
              return (
                <button
                  key={option.key}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => update({ font: option.key })}
                  className={`${choiceBase} flex flex-col ${
                    active ? choiceActive : choiceIdle
                  }`}
                >
                  <span className="flex w-full items-center justify-between gap-2 text-sm font-bold text-foreground">
                    {option.label}
                    {active && (
                      <CheckIcon className="h-5 w-5 shrink-0 text-brand-primary" />
                    )}
                  </span>

                  {/* Anteprima reale: il testo è scritto con il font descritto */}
                  <span
                    className="mt-3 block text-xl font-bold leading-snug text-foreground"
                    style={{ fontFamily: option.fontFamily }}
                  >
                    Puella rosam amat.
                  </span>
                  <span
                    className="mt-1 block text-sm leading-6 text-brand-muted"
                    style={{ fontFamily: option.fontFamily }}
                  >
                    Studiare è più facile se leggi bene.
                  </span>
                </button>
              );
            })}
          </div>
        </AccountCard>

        {/* DIMENSIONE + SPAZIATURA */}
        <div className="grid gap-4 md:grid-cols-2">
          <AccountCard title="Dimensione del testo">
            <div
              role="radiogroup"
              aria-label="Dimensione del testo"
              className="grid grid-cols-3 gap-2"
            >
              {readingSizeOptions.map((option) => {
                const active = preferences.textSize === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    aria-label={option.ariaLabel}
                    onClick={() => update({ textSize: option.key })}
                    className={`${choiceBase} flex h-14 items-center justify-center font-extrabold text-foreground ${
                      option.letterClass
                    } ${active ? choiceActive : choiceIdle}`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </AccountCard>

          <AccountCard title="Spaziatura">
            <div
              role="radiogroup"
              aria-label="Spaziatura"
              className="grid grid-cols-2 gap-2"
            >
              {readingSpacingOptions.map((option) => {
                const active = preferences.spacing === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => update({ spacing: option.key })}
                    className={`${choiceBase} flex h-14 items-center justify-center text-sm font-bold text-foreground ${
                      active ? choiceActive : choiceIdle
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </AccountCard>
        </div>

        {/* ANTEPRIMA: `reading-area` applica le scelte, come nel resto dell'app */}
        <AccountCard
          title="Anteprima"
          description="Così vedrai il testo in missioni, esercizi, Quaderno, Risorse e articoli."
        >
          <div className="reading-area rounded-xl bg-background p-4 sm:p-5">
            <p className="text-lg font-bold text-foreground">
              Puella rosam amat.
            </p>
            <p className="mt-2 text-base leading-7 text-foreground/85">
              Ogni frase è un piccolo viaggio: leggila con calma, una parola
              alla volta, e riconosci chi fa cosa. Il soggetto compie
              l&apos;azione, il complemento oggetto la riceve.
            </p>
          </div>
        </AccountCard>

        <div>
          <button
            type="button"
            onClick={reset}
            disabled={isDefault}
            className="btn-secondary text-sm disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowPathIcon className="h-4 w-4" />
            Ripristina impostazioni predefinite
          </button>
        </div>
      </div>
    </section>
  );
}
