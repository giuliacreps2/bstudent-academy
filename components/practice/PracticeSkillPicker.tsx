import Link from "next/link";
import { ChartBarIcon } from "@heroicons/react/24/outline";
import { skillIcons, skillStyles, toSkillIconKey } from "@/constants/skills";
import type { SkillCardData } from "@/types/exercises";

/** Card di una skill (stesso aspetto di components/exercises/SkillCard) con livello e avanzamento veri */
function PracticeSkillCard({ skill }: { skill: SkillCardData }) {
  const styles = skillStyles(skill.color);
  const Icon = skillIcons[toSkillIconKey(skill.icon)];

  return (
    <div className="flex h-full flex-col rounded-lg border border-border bg-surface p-5">
      <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${styles.iconBg}`}>
        <Icon className={`h-6 w-6 ${styles.iconText}`} />
      </div>

      <h4 className="mb-1 font-bold text-foreground">{skill.name}</h4>
      <p className="mb-4 flex-1 text-sm text-brand-muted">{skill.description}</p>

      <div className="mb-4 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-pill bg-surface-blue">
          <div
            className={`h-full rounded-pill ${styles.bar}`}
            style={{ width: `${skill.maxLevel ? 100 : Math.min(100, skill.progressPercent)}%` }}
          />
        </div>
        <span className="shrink-0 text-xs text-brand-muted">
          {skill.maxLevel ? `Livello ${skill.level} (massimo)` : `Livello ${skill.level}`}
        </span>
      </div>

      {skill.itemsCount > 0 ? (
        <Link
          href={skill.href}
          className={`inline-flex items-center justify-center gap-1 rounded-pill px-4 py-2.5 text-sm font-semibold transition-all duration-150 active:scale-95 ${styles.btn}`}
        >
          Vai agli esercizi →
        </Link>
      ) : (
        <p className="rounded-pill bg-surface-blue px-4 py-2.5 text-center text-sm text-brand-muted">
          Esercizi in arrivo
        </p>
      )}
    </div>
  );
}

export function PracticeSkillPicker({ skills }: { skills: SkillCardData[] }) {
  return (
    <div id="skill" className="scroll-mt-20 rounded-lg border border-border bg-surface p-5">
      <div className="mb-1 flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-blue">
          <ChartBarIcon className="h-5 w-5 text-brand-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Scegli una skill e inizia ad allenarti</h3>
      </div>
      <p className="mb-6 text-sm text-brand-muted sm:ml-12">
        Ogni esercizio ti fa guadagnare punti nella skill corrispondente.
      </p>

      {skills.length === 0 ? (
        <p className="rounded-lg bg-surface-blue p-6 text-center text-sm text-brand-muted">
          Gli esercizi di questa materia stanno arrivando: torna a trovarci presto.
        </p>
      ) : (
        <div className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-2 [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 xl:grid-cols-4">
          {skills.map((skill) => (
            <div key={skill.code} className="w-[78%] shrink-0 snap-start md:w-auto md:shrink">
              <PracticeSkillCard skill={skill} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
