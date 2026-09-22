export function CourseProgressCard({
  completed,
  total,
}: {
  completed: number;
  total: number;
}) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <p className="text-xs font-semibold tracking-widest text-brand-muted uppercase mb-3">
        Il tuo avanzamento
      </p>

      <div className="h-2 w-full overflow-hidden rounded-pill bg-surface-blue mb-2">
        <div
          className="h-full rounded-pill bg-brand-primary transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-brand-muted">
          {completed}/{total} tappe
        </span>
        <span className="font-bold text-foreground">{percent}%</span>
      </div>
    </div>
  );
}
