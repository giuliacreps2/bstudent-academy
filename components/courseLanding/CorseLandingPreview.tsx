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
      className="scroll-mt-4 overflow-hidden bg-white py-16 text-foreground md:py-24"
    >
      <div className="container-section grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
        {/* Video a sinistra */}
        <div className="overflow-hidden rounded-[24px] border border-border bg-surface-blue p-2 shadow-[0_20px_50px_rgba(23,32,51,0.09)] sm:p-3">
          <div className="mb-2 flex items-center justify-between px-2 text-xs font-semibold tracking-wide text-brand-primary sm:mb-3">
            <span>ANTEPRIMA DEL CORSO</span>
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-brand-secondary"
            />
          </div>

          <div className="aspect-video w-full">
            <video
              className="h-full w-full rounded-xl object-cover"
              poster={posterUrl}
              controls
              preload="metadata"
            >
              <source src={videoUrl} type="video/mp4" />
              Il tuo browser non supporta la riproduzione video.
            </video>
          </div>
        </div>

        {/* Testo a destra */}
        <div className="max-w-md">
          <div className="mb-4 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-brand-primary" />
            <span className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
              L&apos;ANTEPRIMA
            </span>
          </div>

          <h2 className="text-3xl font-extrabold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl">
            Guarda come sarà{" "}
            <span className="text-brand-primary">il tuo viaggio.</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-brand-muted md:text-lg">
            Lezioni, missioni ed esercizi in pochi minuti: scopri cosa ti
            aspetta prima di iniziare.
          </p>

          <p className="mt-6 border-l-2 border-brand-secondary pl-4 text-sm font-semibold text-foreground">
            Un primo sguardo al percorso prima di iniziare.
          </p>
        </div>
      </div>
    </section>
  );
}
