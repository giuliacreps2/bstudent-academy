import { CheckCircleIcon, GiftIcon } from "@heroicons/react/24/solid";
import type { ProfileCompletionData } from "@/types/dashboard";

export function ProfileCompletionCard({
  data,
}: {
  data: ProfileCompletionData;
}) {
  const completedCount = data.tasks.filter((t) => t.completed).length;
  const totalCount = data.tasks.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <h3 className="text-sm font-semibold text-foreground mb-1">
        Completa il tuo profilo
      </h3>
      <p className="text-xs text-brand-muted mb-2">
        {completedCount}/{totalCount} completato
      </p>
      <div className="w-full h-1.5 bg-surface-blue rounded-pill overflow-hidden mb-4">
        <div
          className="h-full bg-brand-success rounded-pill"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ul className="space-y-3 mb-4">
        {data.tasks.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="flex items-center gap-2">
              <CheckCircleIcon
                className={`w-5 h-5 ${task.completed ? "text-brand-success" : "text-border"}`}
              />
              <span
                className={
                  task.completed ? "text-foreground" : "text-brand-muted"
                }
              >
                {task.label}
              </span>
            </span>
            <span className="text-brand-success font-medium">
              +{task.xpReward} XP
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2 bg-surface-blue rounded-md p-3">
        <GiftIcon className="w-5 h-5 text-brand-primary shrink-0" />
        <p className="text-xs text-foreground">
          Completa il profilo e ottieni{" "}
          <span className="font-semibold">altri {data.bonusXp} XP!</span>
        </p>
      </div>
    </div>
  );
}
