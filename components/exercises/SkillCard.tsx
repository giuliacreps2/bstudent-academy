// components/exercises/SkillPicker.tsx (versione corretta)
import Link from "next/link";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { skillsMeta, skillColorStyles } from "@/constants/skills";
import type { SkillOption } from "@/types/exercises";

function SkillCard({ skill }: { skill: SkillOption }) {
  const meta = skillsMeta[skill.id as keyof typeof skillsMeta];
  const styles = skillColorStyles[meta.color];
  const Icon = meta.icon;
  const percent = Math.min(100, Math.round((skill.current / skill.max) * 100));

  return (
    <div className="flex h-full flex-col rounded-lg bg-surface border border-border p-5">
      <div
        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${styles.iconBg}`}
      >
        <Icon className={`w-6 h-6 ${styles.iconText}`} />
      </div>

      <h4 className="font-bold text-foreground mb-1">{meta.label}</h4>
      <p className="text-sm text-brand-muted mb-4 flex-1">
        {skill.description}
      </p>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex-1 h-1.5 bg-surface-blue rounded-pill overflow-hidden">
          <div
            className={`h-full rounded-pill ${styles.bar}`}
            style={{ width: `${percent}%` }}
          />
        </div>
        <span className="text-xs text-brand-muted shrink-0">
          {skill.current} / {skill.max}
        </span>
      </div>

      <Link
        href={skill.href}
        className={`inline-flex items-center justify-center gap-1 text-sm font-semibold px-4 py-2.5 rounded-pill active:scale-95 transition-all duration-150 ${styles.btn}`}
      >
        Vai agli esercizi →
      </Link>
    </div>
  );
}

export function SkillPicker({ skills }: { skills: SkillOption[] }) {
  return (
    <div className="rounded-lg bg-surface border border-border p-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-full bg-surface-blue flex items-center justify-center shrink-0">
          <ChartBarIcon className="w-5 h-5 text-brand-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">
          Scegli una skill e inizia ad allenarti
        </h3>
      </div>
      <p className="text-sm text-brand-muted mb-6 sm:ml-12">
        Ogni esercizio ti fa guadagnare punti nella skill corrispondente.
      </p>

      <div
        className="
          flex gap-4
          overflow-x-auto
          snap-x snap-mandatory
          pb-2
          -mx-1 px-1
          [-ms-overflow-style:none]
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden

          md:grid
          md:grid-cols-4
          md:gap-4
          md:overflow-visible
          md:px-0
          md:mx-0
          md:pb-0
        "
      >
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="w-[78%] shrink-0 snap-start md:w-auto md:shrink"
          >
            <SkillCard skill={skill} />
          </div>
        ))}
      </div>
    </div>
  );
}
