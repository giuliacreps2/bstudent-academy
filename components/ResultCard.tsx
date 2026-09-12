import { CheckIcon } from "@heroicons/react/24/solid";
import { SkillBar, type Skill } from "@/components/SkillBar";

const skill: Skill = {
  id: "grammatica",
  label: "Grammatica",
  percentage: 82,
  color: "purple",
};

export function ResultCard() {
  return (
    <div className="w-64 rounded-3xl bg-white shadow-xl p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500 shrink-0">
          <CheckIcon className="text-white" width={14} height={14} />
        </span>
        <span className="font-semibold text-emerald-600 text-sm">
          Corretto!
        </span>
      </div>

      <p className="text-xs text-fg-secondary leading-relaxed mb-4">
        "Puella" è il soggetto della frase.
      </p>

      <span className="inline-block text-xs font-bold text-amber-600 bg-amber-100 rounded-full px-3 py-1 mb-5">
        +20 XP
      </span>

      <div className="mb-5">
        <SkillBar skill={skill} />
      </div>

      <button className="w-full bg-brand-primary text-white text-sm font-medium py-2.5 rounded-full transition-colors">
        Continua →
      </button>
    </div>
  );
}
