import Link from "next/link";
import { Card, PageHeader } from "@/components/admin/ui";

// Ordine consigliato per costruire un corso pubblicabile
const STEPS = [
  { href: "/admin/skills", title: "1. Skill", text: "Crea le skill (es. Grammatica, Lessico): ogni esercizio fa crescere una o più skill." },
  { href: "/admin/subjects", title: "2. Materie", text: "Crea le materie e scegli la skill principale: gli esercizi contano per lei se non indichi altro." },
  { href: "/admin/exercises", title: "3. Esercizi", text: "Scrivi gli esercizi e pubblica una versione di ciascuno." },
  { href: "/admin/courses", title: "4. Corsi", text: "Corso → missioni → lezioni con pagine ed esercizio collegato, poi pubblica dal basso verso l'alto." },
];

export default function AdminHomePage() {
  return (
    <div>
      <PageHeader title="Area Admin" />
      <div className="grid gap-4 sm:grid-cols-2">
        {STEPS.map((step) => (
          <Card key={step.href}>
            <Link href={step.href} className="font-semibold hover:underline">{step.title}</Link>
            <p className="mt-1 text-sm text-brand-muted">{step.text}</p>
          </Card>
        ))}
      </div>
      <Card title="Ordine di pubblicazione">
        <p className="text-sm text-brand-muted">
          Lezione (con almeno una pagina e l&apos;esercizio collegato) → missione (lezioni pubblicate, esercizi pubblicati,
          ripartizione tra le skill a 100% oppure skill principale della materia) → corso (almeno una missione pubblicata).
        </p>
      </Card>
    </div>
  );
}
