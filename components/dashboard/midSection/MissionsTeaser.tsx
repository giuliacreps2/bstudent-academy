import { TrophyIcon } from "@heroicons/react/24/outline";

export function MissionsTeaser() {
  return (
    <div className="rounded-lg bg-surface border border-border p-4 flex items-center gap-4 opacity-50 cursor-not-allowed select-none">
      <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
        <TrophyIcon className="w-5 h-5 text-brand-muted" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-foreground">Le missioni</p>
        <p className="text-xs text-brand-muted">
          Sfide settimanali per guadagnare ricompense extra
        </p>
      </div>
      <span className="text-[10px] font-medium text-brand-muted bg-surface-blue px-2 py-0.5 rounded-pill shrink-0">
        Prossimamente
      </span>
    </div>
  );
}
