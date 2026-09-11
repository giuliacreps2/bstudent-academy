import { ArrowRightIcon, StarIcon } from "@heroicons/react/24/outline";
import { QuizPreviewCard } from "@/components/QuizPreviewCard";
import { ResultCard } from "@/components/ResultCard";

export function PracticeSection() {
  return (
    <section className="relative overflow-hidden bg-background py-16 text-foreground md:py-20">
      {/* FLOATING BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-1/3 h-96 w-96 -translate-y-1/2 rounded-full bg-[#e9dcff] opacity-60" />
        <div className="absolute right-[10%] bottom-[10%] h-40 w-40 rounded-full bg-[#dcecff] opacity-50 blur-sm" />

        <div className="absolute left-[38%] top-[12%] h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
        <div className="absolute left-[40%] top-[18%] h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />
        <div className="absolute right-[6%] top-[30%] h-2.5 w-1.5 rotate-[80deg] rounded-full bg-brand-secondary" />
      </div>

      <div className="container-section relative z-10 grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-14">
        {/* TESTO */}
        <div className="flex max-w-lg flex-col items-start">
          <div className="flex items-center gap-2 mb-4">
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-primary">
              <StarIcon className="text-white" width={14} height={14} />
            </span>
            <span className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
              PROVA BSTUDENT
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            Non limitarti a studiare.
            <br />
            <span className="text-brand-secondary">Mettiti alla prova.</span>
          </h2>

          <p className="mt-5 text-base leading-7 text-brand-muted md:text-lg">
            Esercizi mirati, feedback immediati e ricompense per ogni traguardo
            raggiunto.
          </p>
        </div>

        {/* DEMO */}
        <div className="relative flex items-center justify-center md:justify-end">
          <div className="rotate-[-3deg]">
            <QuizPreviewCard />
          </div>

          <ArrowRightIcon
            className="hidden md:block text-brand-primary shrink-0 mx-3"
            width={28}
            height={28}
          />

          <div className="rotate-[3deg] -ml-4 md:ml-0 mt-16 md:mt-0">
            <ResultCard />
          </div>
        </div>
      </div>
    </section>
  );
}
