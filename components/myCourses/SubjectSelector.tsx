import { SubjectCard } from "./SubjectCard";
import type { SubjectData } from "@/types/myCourses";

export function SubjectSelector({
  subjects,
  activeSlug,
}: {
  subjects: SubjectData[];
  activeSlug: string;
}) {
  return (
    <div>
      <div className="mb-4">
        <p className="text-xs font-semibold tracking-widest text-brand-primary uppercase mb-1">
          Corsi
        </p>
        <h2 className="text-xl font-bold text-foreground">
          Scegli il tuo mondo
        </h2>
        <p className="text-sm text-brand-muted mt-1">
          Ogni materia è un nuovo viaggio. Quale storia vuoi esplorare?
        </p>
      </div>

      {/* MOBILE: carosello orizzontale */}
      <div className="lg:hidden flex gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 [-ms-overflow-style:none] scrollbar-none [&::-webkit-scrollbar]:hidden">
        {subjects.map((subject) => (
          <div key={subject.slug} className="w-48 shrink-0 snap-start">
            <SubjectCard
              subject={subject}
              active={subject.slug === activeSlug}
            />
          </div>
        ))}
      </div>

      {/* DESKTOP: lista verticale */}
      <div className="hidden lg:flex lg:flex-col gap-3">
        {subjects.map((subject) => (
          <SubjectCard
            key={subject.slug}
            subject={subject}
            active={subject.slug === activeSlug}
          />
        ))}
      </div>
    </div>
  );
}
