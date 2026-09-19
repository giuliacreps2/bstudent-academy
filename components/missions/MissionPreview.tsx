import Link from "next/link";
import Image from "next/image";
import {
  XMarkIcon,
  BookOpenIcon,
  PlayCircleIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { StarIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { skillsMeta, skillColorStyles } from "@/constants/skills";
import type { MissionMapNode, StudentSkillLevel } from "@/types/missions";

const inkStyle = { color: "var(--texture-papyrus-ink)" };
const inkMutedStyle = { color: "var(--texture-papyrus-ink-muted)" };

export function MissionPreview({
  mission,
  studentSkills,
  onClose,
}: {
  mission: MissionMapNode;
  studentSkills: StudentSkillLevel[];
  onClose: () => void;
}) {
  const isFinal = mission.type === "final";

  return (
    <div className="card-papyrus relative flex max-h-[calc(100dvh-5.5rem)] flex-col overflow-hidden sm:max-h-[calc(100dvh-3rem)]">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 pb-6 sm:p-6">
        <button
          type="button"
          onClick={onClose}
          aria-label="Chiudi dettaglio missione"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/70 transition hover:bg-white"
        >
          <XMarkIcon className="h-4 w-4" style={inkStyle} />
        </button>

        {/* HEADER */}
        <div className="flex items-start gap-4 pr-8">
          <div className="flex-1">
            <p
              className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em]"
              style={inkMutedStyle}
            >
              <span aria-hidden="true">{isFinal ? "🏛" : "🎖"}</span>
              Missione {mission.order}
            </p>

            <h2
              className="mt-2 flex items-center gap-2 text-xl font-extrabold"
              style={inkStyle}
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary">
                <StarIcon className="h-4 w-4 text-white" />
              </span>
              {mission.title}
            </h2>

            <p className="mt-1 text-sm italic" style={inkMutedStyle}>
              {mission.tagline}
            </p>

            <p className="mt-3 text-sm leading-6" style={inkMutedStyle}>
              {mission.description}
            </p>
          </div>

          <div className="relative hidden h-20 w-20 shrink-0 overflow-hidden rounded-xl sm:block">
            <Image
              src={mission.coverImageUrl}
              alt=""
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* PREPARAZIONE */}
        {(mission.prepReadingHref || mission.prepVideoHref) && (
          <div className="rounded-2xl bg-white/50 p-4">
            <p
              className="flex items-center gap-1.5 text-sm font-bold"
              style={inkStyle}
            >
              <BookOpenIcon className="h-4 w-4" />
              Preparati alla missione (opzionale)
            </p>
            <p className="mt-1 text-xs leading-5" style={inkMutedStyle}>
              Rivedi la spiegazione e ottieni punti extra.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
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
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-secondary/90 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-brand-secondary"
                >
                  <PlayCircleIcon className="h-4 w-4" />
                  Guarda il video
                </Link>
              )}
            </div>
          </div>
        )}

        {/* SKILL ALLENATE */}
        <div className="rounded-2xl bg-white/50 p-4">
          <p className="text-sm font-bold" style={inkStyle}>
            Skill allenate
          </p>
          <div className="mt-3 grid grid-cols-2 gap-3">
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
                    <p className="text-xs font-semibold" style={inkStyle}>
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
        </div>

        {/* LIVELLO ATTUALE */}
        <div className="rounded-2xl bg-white/50 p-4">
          <p className="text-sm font-bold" style={inkStyle}>
            Il tuo livello attuale
          </p>
          <div className="mt-3 space-y-3">
            {studentSkills.map((skill) => {
              const percent = Math.min(
                100,
                Math.round((skill.current / skill.max) * 100),
              );
              return (
                <div key={skill.label}>
                  <div
                    className="mb-1 flex items-center justify-between text-xs font-semibold"
                    style={inkStyle}
                  >
                    <span>{skill.label}</span>
                    <span>
                      {skill.current} / {skill.max}
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-black/10">
                    <div
                      className="h-full rounded-full bg-brand-primary"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RICOMPENSA / REGOLE / TIPO */}
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-xl bg-white/50 px-3 py-3 text-center">
            <ShieldCheckIcon
              className="mx-auto h-4 w-4"
              style={inkMutedStyle}
            />
            <p className="mt-1 text-[11px] font-bold" style={inkStyle}>
              {mission.rewardLabel}
            </p>
            <p className="text-[10px]" style={inkMutedStyle}>
              Ricompensa
            </p>
          </div>
          <div className="rounded-xl bg-white/50 px-3 py-3 text-center">
            <ClockIcon className="mx-auto h-4 w-4" style={inkMutedStyle} />
            <p className="mt-1 text-[11px] font-bold" style={inkStyle}>
              {mission.durationMinutes} min · max {mission.maxErrors} errori
            </p>
            <p className="text-[10px]" style={inkMutedStyle}>
              Regole
            </p>
          </div>
          <div className="rounded-xl bg-white/50 px-3 py-3 text-center">
            <StarIcon className="mx-auto h-4 w-4" style={inkMutedStyle} />
            <p className="mt-1 text-[11px] font-bold" style={inkStyle}>
              {isFinal ? "Prova finale" : "Missione principale"}
            </p>
            <p className="text-[10px]" style={inkMutedStyle}>
              Tipo
            </p>
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-black/10 bg-white/75 p-3 backdrop-blur-sm sm:p-4">
        <Link href={mission.href} className="btn-primary w-full justify-center">
          Scopri la missione →
        </Link>
      </div>
    </div>
  );
}
