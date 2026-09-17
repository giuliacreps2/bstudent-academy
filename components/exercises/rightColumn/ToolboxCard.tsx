import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  BookOpenIcon,
  TableCellsIcon,
  ListBulletIcon,
  AcademicCapIcon,
  PlayCircleIcon,
  LockClosedIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export interface ToolboxItem {
  id: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  href?: string; // assente se locked
  locked?: boolean;
}

// TODO Placeholder — verranno sostituiti dai dati del backend
const items: ToolboxItem[] = [
  {
    id: "grammar-schemes",
    icon: BookOpenIcon,
    title: "Schemi di grammatica",
    description: "Regole essenziali, spiegate in modo semplice",
    href: "/risorse/grammatica",
  },
  {
    id: "declension-tables",
    icon: TableCellsIcon,
    title: "Tabelle di declinazioni",
    description: "Nomi, aggettivi e pronomi",
    href: "/risorse/declinazioni",
  },
  {
    id: "conjugation-tables",
    icon: ListBulletIcon,
    title: "Tabelle di coniugazioni",
    description: "Tutti i tempi dei verbi principali",
    href: "/risorse/coniugazioni",
  },
  {
    id: "worked-examples",
    icon: AcademicCapIcon,
    title: "Esempi svolti",
    description: "Analisi guidate passo dopo passo",
    href: "/risorse/esempi",
  },
  {
    id: "glossary",
    icon: BookOpenIcon,
    title: "Glossario",
    description: "Il vocabolario del corso",
    href: "/risorse/glossario",
  },
  {
    id: "videos",
    icon: PlayCircleIcon,
    title: "Pillole di approfondimento",
    description: "Brevi video e curiosità",
    locked: true,
  },
];

function ToolboxRow({ item }: { item: ToolboxItem }) {
  const Icon = item.icon;

  const content = (
    <div className="flex items-center gap-3 px-3.5 py-3">
      <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/70 shrink-0">
        <Icon
          className="w-4.5 h-4.5"
          style={{ color: "var(--texture-papyrus-ink)" }}
        />
      </span>
      <div className="flex-1 min-w-0">
        <p
          className="text-sm font-semibold truncate"
          style={{ color: "var(--texture-papyrus-ink)" }}
        >
          {item.title}
        </p>
        <p
          className="text-xs truncate"
          style={{ color: "var(--texture-papyrus-ink-muted)" }}
        >
          {item.description}
        </p>
      </div>
      {item.locked ? (
        <LockClosedIcon
          className="w-4 h-4 shrink-0"
          style={{ color: "var(--texture-papyrus-ink-muted)" }}
        />
      ) : (
        <ChevronRightIcon
          className="w-4 h-4 shrink-0"
          style={{ color: "var(--texture-papyrus-ink-muted)" }}
        />
      )}
    </div>
  );

  if (item.locked || !item.href) {
    return <div className="card-row card-locked">{content}</div>;
  }

  return (
    <Link href={item.href} className="card-row block hover:bg-white/40">
      {content}
    </Link>
  );
}

export function ToolboxCard() {
  return (
    <div className="card-papyrus p-4">
      <p
        className="text-sm font-bold mb-1 flex items-center gap-1.5"
        style={{ color: "var(--texture-papyrus-ink)" }}
      >
        <span aria-hidden="true">🧰</span> Cassetta degli attrezzi
      </p>
      <p
        className="text-xs mb-4 leading-5"
        style={{ color: "var(--texture-papyrus-ink-muted)" }}
      >
        Qui trovi tutte le risorse utili per affrontare gli esercizi. Consultale
        quando hai dubbi o vuoi ripassare un argomento.
      </p>

      <div className="divide-y divide-[#d8c49c]/50 rounded-lg overflow-hidden bg-white/30">
        {items.map((item) => (
          <ToolboxRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
