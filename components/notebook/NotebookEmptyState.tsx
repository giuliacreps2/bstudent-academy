export function NotebookEmptyState({ tabLabel }: { tabLabel: string }) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
      <span className="text-3xl" aria-hidden="true">
        📖
      </span>
      <p className="font-bold text-foreground">
        La sezione {tabLabel} è ancora vuota
      </p>
      <p className="max-w-xs text-sm leading-6 text-brand-muted">
        Continua il percorso o salva un articolo: le tue pagine compariranno
        qui.
      </p>
    </div>
  );
}
