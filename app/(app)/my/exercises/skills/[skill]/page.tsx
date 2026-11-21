import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { skillIcons, skillStyles, toSkillIconKey } from "@/constants/skills";
import { getPracticeBySkill } from "@/lib/practice-server";
import { exercisesHref } from "@/lib/practice";
import { MissionBreadcrumb } from "@/components/missions/MissionBreadcrumb";
import { PracticeTopicGroups } from "@/components/practice/PracticeTopicGroups";

interface PageProps {
  params: Promise<{ skill: string }>;
  searchParams: Promise<{ materia?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const [{ skill }, { materia }] = await Promise.all([params, searchParams]);
  const list = materia ? await getPracticeBySkill(materia, skill) : null;
  return { title: list ? `${list.skill.name} | Esercizi | BStudent` : "Esercizi | BStudent" };
}

/** Voci della Palestra di una skill, per argomento (blueprint §7.3) */
export default async function SkillPracticePage({ params, searchParams }: PageProps) {
  const [{ skill }, { materia }] = await Promise.all([params, searchParams]);
  if (!materia) notFound();

  const list = await getPracticeBySkill(materia, skill);
  if (!list) notFound();

  const styles = skillStyles(list.skill.color);
  const Icon = skillIcons[toSkillIconKey(list.skill.icon)];
  const { level } = list;

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <MissionBreadcrumb
        items={[{ label: "Esercizi", href: exercisesHref(materia) }, { label: list.skill.name }]}
      />

      <header className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-surface p-5">
        <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl ${styles.iconBg}`}>
          <Icon className={`h-7 w-7 ${styles.iconText}`} />
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-extrabold text-foreground">{list.skill.name}</h1>
          {list.skill.description && <p className="mt-1 text-sm text-brand-muted">{list.skill.description}</p>}
        </div>
        <div className="w-full sm:w-56">
          <p className="text-sm font-semibold text-foreground">
            Livello {level.level}
            {level.maxLevel && " (massimo)"}
          </p>
          <div className="mt-1.5 h-2 overflow-hidden rounded-pill bg-surface-blue">
            <div
              className={`h-full rounded-pill ${styles.bar}`}
              style={{ width: `${level.maxLevel ? 100 : Math.min(100, level.progressPercent)}%` }}
            />
          </div>
          {!level.maxLevel && level.pointsToNextLevel !== null && (
            <p className="mt-1 text-xs text-brand-muted">
              Ancora {Number(level.pointsToNextLevel).toLocaleString("it-IT", { maximumFractionDigits: 2 })} punti
              per il livello {level.level + 1}
            </p>
          )}
        </div>
      </header>

      <PracticeTopicGroups topics={list.topics} />
    </div>
  );
}
