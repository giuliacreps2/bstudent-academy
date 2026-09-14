import type { LastCourse } from "@/types/dashboard";

export function ContinueBanner({ course }: { course: LastCourse }) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-surface-blue p-8">
      <p className="text-xs font-semibold tracking-widest text-brand-primary uppercase mb-2">
        Riprendi da dove hai lasciato
      </p>
      <h3 className="text-3xl font-bold text-foreground mb-3">
        {course.title}
      </h3>
      <div className="w-full max-w-md h-2 bg-white rounded-pill overflow-hidden mb-6">
        <div
          className="h-full bg-brand-primary rounded-pill"
          style={{ width: `${course.progress}%` }}
        />
      </div>
      <button className="btn-primary active:scale-95 transition-transform duration-150">
        Continua →
      </button>
    </div>
  );
}
