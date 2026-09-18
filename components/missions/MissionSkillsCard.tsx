import { skillsMeta } from "@/constants/skills";
import type { SkillKey } from "@/types/skills";

export function MissionSkillsCard({ skills }: { skills: SkillKey[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
      <p className="text-sm font-bold text-white mb-3">Skill coinvolte</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((key) => {
          const meta = skillsMeta[key];
          const Icon = meta.icon;
          return (
            <span
              key={key}
              className="flex items-center gap-1.5 rounded-full bg-white/10 pl-1.5 pr-3 py-1.5"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/15">
                <Icon className="h-3 w-3 text-white" />
              </span>
              <span className="text-xs font-medium text-white/85">
                {meta.label}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
