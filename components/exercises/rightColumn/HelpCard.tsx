// components/exercises/rightColumn/HelpCard.tsx
import Link from "next/link";

export function HelpCard() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-surface-blue p-5">
      <p className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
        <span aria-hidden="true">🌿</span> Hai bisogno di una pausa?
      </p>
      <p className="text-xs text-brand-muted leading-5 mb-4 max-w-[75%]">
        Riprendi con calma. Ogni sforzo fa parte del tuo percorso.
      </p>
      <Link
        href="/i-miei-corsi"
        className="btn-secondary text-sm px-4 py-2 inline-flex active:scale-95 transition-transform duration-150"
      >
        Torna ai miei corsi
      </Link>
    </div>
  );
}
