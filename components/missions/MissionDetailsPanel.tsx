import Link from "next/link";
import {
  BookOpenIcon,
  PlayCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { StarIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { skillsMeta, skillColorStyles } from "@/constants/skills";
import type { MissionMapNode } from "@/types/missions";

export function MissionSkillRewards({ mission }: { mission: MissionMapNode }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {mission.skillRewards.map((reward) => {
        const meta = skillsMeta[reward.icon as keyof typeof skillsMeta];
        const styles = skillColorStyles[meta.color];
        const Icon = meta.icon;

        return (
          <div key={reward.label} className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${styles.iconBg}`}
            >
              <Icon className={`h-4 w-4 ${styles.iconText}`} />
            </span>
            <div className="leading-tight">
              <p className="text-xs font-semibold text-foreground">
                {reward.label}
              </p>
              <p className="text-[11px] font-bold text-brand-success">
                +{reward.xp} XP
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function MissionRules({ mission }: { mission: MissionMapNode }) {
  const isFinal = mission.type === "final";

  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="rounded-lg bg-surface-blue px-3 py-3 text-center">
        <ShieldCheckIcon className="mx-auto h-4 w-4 text-brand-primary" />
        <p className="mt-1 text-[11px] font-bold text-foreground">
          {mission.rewardLabel}
        </p>
        <p className="text-[10px] text-brand-muted">Ricompensa</p>
      </div>
      <div className="rounded-lg bg-surface-blue px-3 py-3 text-center">
        <ClockIcon className="mx-auto h-4 w-4 text-brand-primary" />
        <p className="mt-1 text-[11px] font-bold text-foreground">
          {mission.durationMinutes} min · max {mission.maxErrors} errori
        </p>
        <p className="text-[10px] text-brand-muted">Regole</p>
      </div>
      <div className="rounded-lg bg-surface-blue px-3 py-3 text-center">
        <StarIcon className="mx-auto h-4 w-4 text-brand-primary" />
        <p className="mt-1 text-[11px] font-bold text-foreground">
          {isFinal ? "Prova finale" : "Missione principale"}
        </p>
        <p className="text-[10px] text-brand-muted">Tipo</p>
      </div>
    </div>
  );
}

export function MissionDetailsPanel({ mission }: { mission: MissionMapNode }) {
  const isFinal = mission.type === "final";

  return (
    <div className="rounded-lg border border-border bg-surface p-4 sm:p-5">
      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-muted">
        <span aria-hidden="true">{isFinal ? "🏛" : "🎖"}</span>
        Missione {mission.order}
      </p>

      <h2 className="mt-2 flex items-center gap-2 text-lg font-extrabold text-foreground">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary">
          <StarIcon className="h-4 w-4 text-white" />
        </span>
        {mission.title}
      </h2>

      <p className="mt-1 text-sm italic text-brand-muted">{mission.tagline}</p>
      <p className="mt-3 text-sm leading-6 text-brand-muted">
        {mission.description}
      </p>

      <Link
        href={mission.href}
        className="btn-primary mt-4 w-full justify-center"
      >
        Inizia →
      </Link>

      {(mission.prepReadingHref || mission.prepVideoHref) && (
        <div className="mt-4 rounded-lg bg-surface-blue p-3">
          <p className="flex items-center gap-1.5 text-sm font-bold text-foreground">
            <BookOpenIcon className="h-4 w-4" />
            Preparati alla missione
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {mission.prepReadingHref && (
              <Link
                href={mission.prepReadingHref}
                className="btn-secondary bg-white px-3 py-1.5 text-xs"
              >
                Leggi la spiegazione
              </Link>
            )}
            {mission.prepVideoHref && (
              <Link
                href={mission.prepVideoHref}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-secondary px-3 py-1.5 text-xs font-medium text-white transition hover:bg-brand-secondary/90"
              >
                <PlayCircleIcon className="h-4 w-4" />
                Guarda il video
              </Link>
            )}
          </div>
        </div>
      )}

      <div className="mt-4">
        <p className="mb-2 text-xs font-bold text-brand-muted">
          Skill allenate
        </p>
        <MissionSkillRewards mission={mission} />
      </div>

      <div className="mt-4">
        <MissionRules mission={mission} />
      </div>
    </div>
  );
}
