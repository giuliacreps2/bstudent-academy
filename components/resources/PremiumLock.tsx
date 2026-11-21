import { LockClosedIcon } from "@heroicons/react/24/solid";

/**
 * Lucchetto premium (blueprint §5.6): la Risorsa è nell'abbonamento e lo studente non ce l'ha.
 * La pagina si apre lo stesso e mostra l'"In breve".
 */
export function PremiumLockBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-pill bg-white/90 px-2.5 py-1 text-xs font-semibold text-brand-muted shadow-sm ${className}`}
    >
      <LockClosedIcon aria-hidden="true" className="h-3.5 w-3.5" />
      Con abbonamento
    </span>
  );
}

/** Al posto delle sezioni complete, nella pagina di una Risorsa premium */
export function ResourcePremiumNotice() {
  return (
    <section className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5 sm:p-6">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-blue">
        <LockClosedIcon aria-hidden="true" className="h-5 w-5 text-brand-primary" />
      </span>
      <div>
        <h2 className="text-lg font-extrabold text-foreground">
          La risorsa completa è nell&apos;abbonamento
        </h2>
        <p className="mt-1 text-base leading-7 text-brand-muted">
          Tabelle, spiegazione ed esempi si aprono con l&apos;abbonamento. Intanto
          qui sopra trovi l&apos;«In breve».
        </p>
      </div>
    </section>
  );
}
