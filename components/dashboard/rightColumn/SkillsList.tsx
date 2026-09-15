import Link from "next/link";
import type { ComponentType, SVGProps } from "react";
import {
  BuildingLibraryIcon,
  BookOpenIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import type { SkillData, SkillIcon } from "@/types/dashboard";

const skillIcons: Record<SkillIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  grammatica: BuildingLibraryIcon,
  lessico: BookOpenIcon,
  traduzione: ChatBubbleLeftRightIcon,
};

function SkillRow({ skill }: { skill: SkillData }) {
  const Icon = skillIcons[skill.icon];

  return (
    <div className="flex items-center gap-3">
      <div className="w-9 h-9 rounded-full bg-surface-blue flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-brand-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <p className="text-sm font-medium text-foreground">{skill.name}</p>
          <p className="text-xs text-brand-muted">{skill.progress}%</p>
        </div>
        <div className="w-full h-1.5 bg-surface-blue rounded-pill overflow-hidden">
          <div
            className="h-full bg-brand-primary rounded-pill"
            style={{ width: `${skill.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export function SkillsList({ skills }: { skills: SkillData[] }) {
  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Le tue skill</h3>
        <Link
          href="/progressi"
          className="text-xs font-medium text-brand-primary hover:underline"
        >
          Vedi tutte →
        </Link>
      </div>
      <div className="space-y-4">
        {skills.map((skill) => (
          <SkillRow key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  );
}
