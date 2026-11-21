import Image from "next/image";
import { ClockIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon, ClockIcon as ClockSolidIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { skillStyles } from "@/constants/skills";
import { isPracticeLocked, practiceActionLabel, practiceStatusLabel } from "@/lib/practice";
import { PremiumLockBadge } from "@/components/resources/PremiumLock";
import { StartPracticeButton } from "./StartPracticeButton";
import type { PracticeItem, PracticeItemStatus, SkillRef } from "@/types/practice";

const statusLook: Record<PracticeItemStatus, { icon: typeof CheckCircleIcon; bg: string; badge: string }> = {
  completed: { icon: CheckCircleIcon, bg: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700" },
  saved: { icon: ClockSolidIcon, bg: "bg-amber-500", badge: "bg-amber-50 text-amber-700" },
  retry: { icon: XCircleIcon, bg: "bg-red-500", badge: "bg-red-50 text-red-700" },
  in_review: { icon: ClockSolidIcon, bg: "bg-brand-primary", badge: "bg-surface-blue text-brand-primary" },
  new: { icon: CheckCircleIcon, bg: "bg-border", badge: "bg-surface-blue text-brand-muted" },
};

// TODO (Cloudinary, blueprint §5.1): illustrazione dell'argomento o della skill da imageReference
const PLACEHOLDER = "/latino.png";

const formatPoints = (value: number) =>
  Number(value).toLocaleString("it-IT", { maximumFractionDigits: 2 });

function formatDate(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  return Number.isNaN(date.getTime())
    ? null
    : date.toLocaleDateString("it-IT", { day: "numeric", month: "short", year: "numeric" });
}

interface PracticeItemRowProps {
  item: PracticeItem;
  /** Skill della voce, per il colore dell'etichetta; assente nelle pagine di una sola skill */
  skill?: SkillRef;
  showDate?: boolean;
}

/**
 * Voce della Palestra: titolo per lo studente, stato, punti acquisiti sul massimo e pulsante.
 * Due lucchetti distinti: livello della skill (con il messaggio) e abbonamento.
 */
export function PracticeItemRow({ item, skill, showDate = false }: PracticeItemRowProps) {
  const look = statusLook[item.status];
  const StatusIcon = look.icon;
  const locked = isPracticeLocked(item);
  const date = showDate ? formatDate(item.lastActivityAt) : null;
  const styles = skill ? skillStyles(skill.color) : null;

  return (
    <div className="rounded-lg border border-border bg-surface p-3 sm:p-4">
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-surface-blue">
          <Image src={PLACEHOLDER} alt="" fill sizes="56px" className="object-cover" />
        </div>

        {item.status !== "new" && (
          <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${look.bg}`}>
            <StatusIcon aria-hidden="true" className="h-4 w-4 text-white" />
          </span>
        )}

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">{item.title}</p>
          <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
            {skill && styles && (
              <span className={`rounded-pill px-2 py-0.5 text-[10px] font-semibold ${styles.badgeBg} ${styles.badgeText}`}>
                {skill.name}
              </span>
            )}
            <span className={`rounded-pill px-2 py-0.5 text-[10px] font-semibold ${look.badge}`}>
              {practiceStatusLabel[item.status]}
            </span>
            {item.estimatedMinutes && (
              <span className="flex items-center gap-1 text-[11px] text-brand-muted">
                <ClockIcon aria-hidden="true" className="h-3.5 w-3.5" />~{item.estimatedMinutes} min
              </span>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <div className="hidden text-right text-xs text-brand-muted sm:block">
            {date && <p>{date}</p>}
            <p className="font-semibold text-foreground">
              {formatPoints(item.points)} / {formatPoints(item.maxPoints)}
            </p>
          </div>
          <ItemAction item={item} locked={locked} />
        </div>
      </div>

      {item.lock?.locked && item.lock.message && (
        <p className="mt-2 flex items-center gap-1.5 text-xs text-brand-muted sm:pl-[4.5rem]">
          <LockClosedIcon aria-hidden="true" className="h-3.5 w-3.5" />
          {item.lock.message}
        </p>
      )}
    </div>
  );
}

function ItemAction({ item, locked }: { item: PracticeItem; locked: boolean }) {
  if (item.premiumLocked) return <PremiumLockBadge />;
  if (locked) {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-blue" title="Bloccato">
        <LockClosedIcon aria-hidden="true" className="h-4 w-4 text-brand-muted" />
        <span className="sr-only">Bloccato</span>
      </span>
    );
  }
  // In correzione: il backend non riapre la voce finché la docente non ha dato l'esito
  if (item.status === "in_review") return null;
  return (
    <StartPracticeButton
      practiceExerciseId={item.practiceExerciseId}
      label={practiceActionLabel[item.status]}
    />
  );
}
