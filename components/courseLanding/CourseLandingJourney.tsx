import { CheckIcon } from "@heroicons/react/24/solid";
import type { CourseLandingJourneyData } from "@/types/courseLanding";

export function CourseLandingJourney({
  journey,
}: {
  journey: CourseLandingJourneyData;
}) {
  return (
    <section className="relative overflow-hidden bg-background py-16 text-foreground md:py-20">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#dcecff] opacity-60"
      />

      <div className="container-section relative z-10 grid grid-cols-1 items-center gap-10 md:grid-cols-5 md:gap-12">
        {/* TESTO */}
        <div className="flex flex-col items-start md:col-span-2">
          <span className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
            {journey.eyebrow}
          </span>

          <h2 className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-[44px]">
            {journey.titleLead}{" "}
            <span className="text-brand-secondary">
              {journey.titleHighlight}
            </span>
          </h2>

          <p className="mt-5 max-w-md text-base leading-7 text-brand-muted md:text-lg">
            {journey.description}
          </p>

          <ul className="mt-6 space-y-3">
            {journey.highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-3 text-sm font-semibold"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-success">
                  <CheckIcon className="h-3.5 w-3.5 text-white" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* VIDEO */}
        <div className="md:col-span-3">
          <div className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_20px_50px_rgba(23,32,51,0.12)]">
            <div className="relative aspect-video w-full">
              <video
                className="h-full w-full object-cover"
                poster={journey.posterUrl}
                controls
                preload="metadata"
              >
                <source src={journey.videoUrl} type="video/mp4" />
                Il tuo browser non supporta la riproduzione video.
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
