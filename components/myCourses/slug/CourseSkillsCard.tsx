import { skillIcons, toSkillIconKey } from "@/constants/skills";

/** Skill del corso: icona scelta nell'Admin, aspetto neutro se il frontend non la conosce */
export function CourseSkillsCard({
  skills,
}: {
  skills: { code: string; name: string; icon: string | null }[];
}) {
  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <p className="text-xs font-semibold tracking-widest text-brand-muted uppercase mb-3">
        Skill coinvolte
      </p>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => {
          const Icon = skillIcons[toSkillIconKey(skill.icon)];

          return (
            <div key={skill.code} className="flex flex-col items-center gap-1 w-14">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-blue">
                <Icon className="h-4 w-4 text-brand-primary" />
              </span>
              <span className="text-[10px] text-brand-muted text-center leading-tight">
                {skill.name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
