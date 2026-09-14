import Image from "next/image";

export function NextStepBanner() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-surface-blue p-8">
      <p className="text-xs font-semibold tracking-widest text-brand-primary uppercase mb-2">
        Il tuo prossimo passo
      </p>

      <h3 className="text-3xl font-bold text-foreground mb-3">
        Inizia il tuo percorso
      </h3>
      <p className="text-brand-muted max-w-md mb-6">
        Scopri il corso perfetto per te e inizia ad apprendere il latino e il
        greco.
      </p>
      <button className="btn-primary active:scale-95 transition-transform duration-150">
        Inizia il corso →
      </button>
      <Image
        src="/studente.png"
        alt="Studente con libro di latino"
        width={280}
        height={280}
        className="absolute right-4 bottom-0 "
      />
    </div>
  );
}
