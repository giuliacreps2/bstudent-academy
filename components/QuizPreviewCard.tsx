export function QuizPreviewCard() {
  const options = [
    { id: 1, label: "Complemento oggetto", selected: false },
    { id: 2, label: "Soggetto", selected: true },
    { id: 3, label: "Complemento di termine", selected: false },
    { id: 4, label: "Complemento di specificazione", selected: false },
  ];

  return (
    <div className="w-72 rounded-3xl bg-white shadow-xl p-5">
      <p className="text-xs font-semibold text-fg-secondary mb-3">
        Latino · Analisi della frase
      </p>

      <p className="text-sm font-semibold text-heading mb-1">
        Qual è la funzione di "puella" nella frase?
      </p>
      <p className="text-sm italic text-fg-secondary mb-4">
        Puella rosam amat.
      </p>

      <div className="flex flex-col gap-2.5 mb-5">
        {options.map((option) => (
          <div
            key={option.id}
            className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 text-sm ${
              option.selected
                ? "border-emerald-200 bg-emerald-50 text-emerald-700 font-medium"
                : "border-neutral-200 text-heading"
            }`}
          >
            <span
              className={`flex items-center justify-center w-4 h-4 rounded-full border shrink-0 ${
                option.selected
                  ? "border-emerald-500 bg-emerald-500"
                  : "border-neutral-300"
              }`}
            >
              {option.selected && (
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </span>
            {option.label}
          </div>
        ))}
      </div>

      <button className="w-full bg-brand-primary text-white text-sm font-medium py-2.5 rounded-full transition-colors">
        Controlla
      </button>
    </div>
  );
}
