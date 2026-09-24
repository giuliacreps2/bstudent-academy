interface CourseLandingPreviewProps {
  videoUrl: string;
  posterUrl: string;
}

export function CourseLandingPreview({
  videoUrl,
  posterUrl,
}: CourseLandingPreviewProps) {
  return (
    <section
      id="anteprima"
      className="scroll-mt-4 overflow-hidden bg-background py-16 text-foreground md:py-20"
    >
      <div className="container-section relative">
        {/* Decorazioni di sfondo, coerenti con DemoSection */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-[#dcecff] opacity-60 blur-[1px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#e9dcff] opacity-50"
        />

        {/* TESTO — centrato */}
        <div className="relative z-10 mx-auto mb-10 flex max-w-2xl flex-col items-center text-center md:mb-12">
          <div className="mb-3 flex items-center gap-2">
            <span className="relative block h-7 w-8" aria-hidden="true">
              <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
              <span className="absolute left-0 top-3.5 h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />
              <span className="absolute left-5 top-4 h-2.5 w-1.5 rotate-[80deg] rounded-full bg-brand-accent" />
            </span>
            <span className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
              L&apos;ANTEPRIMA
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl">
            Guarda come sarà{" "}
            <span className="text-brand-secondary">il tuo viaggio.</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
            Lezioni, missioni ed esercizi in pochi minuti: scopri cosa ti
            aspetta prima di iniziare.
          </p>
        </div>

        {/* VIDEO */}
        <div className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-[0_20px_50px_rgba(23,32,51,0.12)]">
          <div className="relative aspect-video w-full">
            <video
              className="h-full w-full object-cover"
              poster={posterUrl}
              controls
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              Il tuo browser non supporta la riproduzione video.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
