import {
  BookOpenIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    icon: BookOpenIcon,
    title: "Impara",
    description: "Segui le lezioni interattive",
  },
  {
    icon: ArrowPathIcon,
    title: "Allenati",
    description: "Mettiti alla prova con gli esercizi",
  },
  {
    icon: ChatBubbleLeftRightIcon,
    title: "Ricevi feedback",
    description: "Scopri i tuoi progressi e i tuoi errori",
  },
  {
    icon: StarIcon,
    title: "Guadagna XP",
    description: "Ogni traguardo è un passo avanti",
  },
  {
    icon: ChartBarIcon,
    title: "Migliora",
    description: "Raggiungi i tuoi obiettivi e sblocca nuove abilità",
  },
];

export function HowItWorks() {
  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <h3 className="text-lg font-bold text-foreground mb-1">
        Come funziona BStudent
      </h3>
      <p className="text-sm text-brand-muted mb-6">
        Un percorso semplice, pensato per te.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.title} className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-surface-blue flex items-center justify-center mb-2">
                <Icon className="w-5 h-5 text-brand-primary" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                {step.title}
              </p>
              <p className="text-xs text-brand-muted mt-0.5">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
