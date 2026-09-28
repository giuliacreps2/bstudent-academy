import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { skillsMeta, skillColorStyles } from "@/constants/skills";
import type { ResourceExerciseLink } from "@/types/resourceDetail";

interface ResourceExerciseCtaProps {
  id: string;
  link: ResourceExerciseLink;
}

export function ResourceExerciseCta({ id, link }: ResourceExerciseCtaProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-24 rounded-[28px] bg-surface-blue p-6 sm:p-8"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2
            id={`${id}-title`}
            className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-foreground"
          >
            <span aria-hidden="true">🎯</span>
            {link.title}
          </h2>

          <p className="mt-2 text-base leading-7 text-brand-muted">
            {link.description}
          </p>

          {link.skills.length > 0 && (
            <ul
              className="mt-4 flex flex-wrap gap-2"
              aria-label="Skill allenate"
            >
              {link.skills.map((key) => {
                const meta = skillsMeta[key];
                const styles = skillColorStyles[meta.color];
                const Icon = meta.icon;

                return (
                  <li
                    key={key}
                    className={`inline-flex items-center gap-1.5 rounded-pill px-3 py-1 text-xs font-semibold ${styles.badgeBg} ${styles.badgeText}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {meta.label}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <Link
          href={link.href}
          className="btn-primary shrink-0 self-start md:self-auto"
        >
          {link.ctaLabel}
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
