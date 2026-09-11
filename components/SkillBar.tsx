export type SkillColor = "purple" | "pink" | "blue" | "teal" | "orange" | "red";

const colorStyles: Record<SkillColor, string> = {
  purple: "bg-violet-500",
  pink: "bg-pink-500",
  blue: "bg-blue-500",
  teal: "bg-teal-500",
  orange: "bg-orange-400",
  red: "bg-rose-500",
};

export interface Skill {
  id: string | number;
  label: string;
  percentage: number;
  color: SkillColor;
}

export function SkillBar({ skill }: { skill: Skill }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-fg-secondary w-28 shrink-0">
        {skill.label}
      </span>
      <div className="h-1.5 flex-1 bg-neutral-200 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colorStyles[skill.color]}`}
          style={{ width: `${skill.percentage}%` }}
        />
      </div>
    </div>
  );
}
