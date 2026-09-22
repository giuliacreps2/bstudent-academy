import Image from "next/image";
import Link from "next/link";
import { ClockIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { skillsMeta } from "@/constants/skills";
import type { MissionMapNode } from "@/types/missions";

export function CourseMissionDetails({
  mission,
  notebookHref,
}: {
  mission: MissionMapNode;
  notebookHref: string;
}) {
  const skillLabels = mission.skillRewards.map(
    (reward) => skillsMeta[reward.icon].label,
  );

  return (
    <div className="flex h-full flex-col">
      <p className="text-xs font-extrabold uppercase tracking-widest text-brand-primary">
        Prossima tappa
      </p>

      <div className="relative mt-3 h-32 rounded-xl overflow-hidden shrink-0">
        <Image
          src={mission.coverImageUrl}
          alt=""
          fill
          className="object-cover"
        />
      </div>

      <h3 className="mt-3 text-lg font-extrabold text-foreground">
        {mission.title}
      </h3>
      <p className="mt-1 text-sm text-brand-muted leading-relaxed">
        {mission.description}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-brand-muted">
        <span className="flex items-center gap-1">
          <ClockIcon className="w-4 h-4" />
          {mission.durationMinutes} min
        </span>
        {skillLabels.length > 0 && (
          <span className="flex items-center gap-1">
            <BookOpenIcon className="w-4 h-4" />
            {skillLabels.join(" + ")}
          </span>
        )}
      </div>

      {mission.objectives && mission.objectives.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold text-foreground mb-2">
            Cosa imparerai
          </p>
          <ul className="space-y-1.5">
            {mission.objectives.map((objective) => (
              <li
                key={objective}
                className="flex items-start gap-2 text-sm text-brand-muted"
              >
                <CheckIcon className="w-4 h-4 text-brand-success mt-0.5 shrink-0" />
                {objective}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-4">
        {/* Solo mobile: accesso al taccuino, sopra la CTA */}
        <Link
          href={notebookHref}
          className="lg:hidden flex items-center justify-center gap-1.5 text-sm font-medium text-brand-primary py-2 mb-1"
        >
          <BookOpenIcon className="w-4 h-4" />
          Apri il taccuino
        </Link>

        <Link href={mission.href} className="btn-primary w-full justify-center">
          Inizia la missione →
        </Link>
      </div>
    </div>
  );
}
