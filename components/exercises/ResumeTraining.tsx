// components/exercises/ResumeTraining.tsx
import Link from "next/link";
import Image from "next/image";
import { ClockIcon as ClockOutlineIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { skillsMeta, skillColorStyles } from "@/constants/skills";
import type { ActivityStatus, ActivityData } from "@/types/skills";

//TODO valutare se spostare i badge in CSS
const statusStyles: Record<
  ActivityStatus,
  {
    label: string;
    badgeBg: string;
    badgeText: string;
    icon: typeof CheckCircleIcon;
    iconBg: string;
    buttonLabel: string;
  }
> = {
  completed: {
    label: "Completato",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    icon: CheckCircleIcon,
    iconBg: "bg-emerald-500",
    buttonLabel: "Rifai",
  },
  in_progress: {
    label: "Interrotto",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    icon: ClockIcon,
    iconBg: "bg-amber-500",
    buttonLabel: "Continua",
  },
  retry: {
    label: "Da riprovare",
    badgeBg: "bg-red-50",
    badgeText: "text-red-700",
    icon: XCircleIcon,
    iconBg: "bg-red-500",
    buttonLabel: "Rifai",
  },
};

function ActivityRow({ activity }: { activity: ActivityData }) {
  const skillMeta = skillsMeta[activity.skill as keyof typeof skillsMeta];
  const skillStyle = skillColorStyles[skillMeta.color];
  const status = statusStyles[activity.status];
  const StatusIcon = status.icon;

  return (
    <div className="rounded-lg border border-border bg-surface p-3 sm:p-4">
      {/* Riga principale — su mobile contiene solo thumbnail/titolo/badge */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative w-14 h-14 rounded-md overflow-hidden shrink-0 bg-surface-blue">
          <Image
            src={activity.thumbnail}
            alt=""
            fill
            className="object-cover"
          />
        </div>

        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${status.iconBg}`}
        >
          <StatusIcon className="w-4 h-4 text-white" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm truncate">
            {activity.title}
          </p>
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-pill ${skillStyle.badgeBg} ${skillStyle.badgeText}`}
            >
              {skillMeta.label}
            </span>
            <span
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-pill ${status.badgeBg} ${status.badgeText}`}
            >
              {status.label}
            </span>
          </div>
        </div>

        {/* Data / punteggio / CTA — solo da sm in su, sulla stessa riga */}
        <div className="hidden sm:flex items-center gap-4 shrink-0">
          <div className="text-right text-xs text-brand-muted">
            <p>{activity.date}</p>
            <p className="font-semibold text-foreground">
              {activity.score.current} / {activity.score.max}
            </p>
          </div>
          <Link
            href={activity.href}
            className="btn-secondary text-sm px-4 py-2 shrink-0 active:scale-95 transition-transform duration-150"
          >
            {status.buttonLabel}
          </Link>
        </div>
      </div>

      {/* Data / punteggio / CTA — su mobile va su una seconda riga */}
      <div className="flex sm:hidden items-center justify-between mt-3 pt-3 border-t border-border">
        <div className="flex items-center gap-3 text-xs text-brand-muted">
          <span>{activity.date}</span>
          <span className="font-semibold text-foreground">
            {activity.score.current} / {activity.score.max}
          </span>
        </div>
        <Link
          href={activity.href}
          className="btn-secondary text-xs px-3 py-1.5 active:scale-95 transition-transform duration-150"
        >
          {status.buttonLabel}
        </Link>
      </div>
    </div>
  );
}

function EmptyResumeState({ recommendedHref }: { recommendedHref: string }) {
  return (
    <div className="rounded-lg bg-surface-blue p-6 text-center">
      <p className="text-sm font-semibold text-foreground mb-1">
        Non hai ancora fatto nessun esercizio
      </p>
      <p className="text-sm text-brand-muted mb-4">
        Inizia ora: bastano pochi minuti per guadagnare i tuoi primi punti.
      </p>
      <Link
        href={recommendedHref}
        className="btn-primary text-sm px-5 py-2.5 inline-flex active:scale-95 transition-transform duration-150"
      >
        Inizia subito ad allenarti →
      </Link>
    </div>
  );
}

export function ResumeTraining({
  activities,
  recommendedHref = "/esercizi",
}: {
  activities: ActivityData[];
  recommendedHref?: string;
}) {
  const hasActivities = activities.length > 0;

  return (
    <div className="rounded-lg bg-surface border border-border p-5">
      <div className="flex items-center justify-between mb-1 gap-3">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-surface-blue flex items-center justify-center shrink-0">
            <ClockOutlineIcon className="w-5 h-5 text-brand-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Riprendi il tuo allenamento
          </h3>
        </div>
        {hasActivities && (
          <Link
            href="/esercizi/cronologia"
            className="text-sm font-medium text-brand-primary hover:underline shrink-0"
          >
            Vedi cronologia →
          </Link>
        )}
      </div>
      <p className="text-sm text-brand-muted mb-6 sm:ml-12">
        Qui trovi gli ultimi esercizi che hai svolto. Continua da dove eri
        rimasto o rivedi quelli già completati.
      </p>

      {hasActivities ? (
        <div className="space-y-3">
          {activities.map((activity) => (
            <ActivityRow key={activity.id} activity={activity} />
          ))}
        </div>
      ) : (
        <EmptyResumeState recommendedHref={recommendedHref} />
      )}
    </div>
  );
}
