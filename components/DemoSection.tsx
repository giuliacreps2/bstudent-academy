export function DemoSection() {
  return (
    <section className="bg-background text-foreground py-16 md:py-20 overflow-hidden">
      <div className="container-section relative">
        {/* Decorazioni di sfondo, coerenti con le altre sezioni */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-[#dcecff] opacity-60 blur-[1px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-[#e9dcff] opacity-50"
        />

        {/* TESTO — centrato */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="relative block h-7 w-8" aria-hidden="true">
              <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
              <span className="absolute left-0 top-3.5 h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />
              <span className="absolute left-5 top-4 h-2.5 w-1.5 rotate-[80deg] rounded-full bg-brand-accent" />
            </span>
            <span className="text-xs md:text-sm font-extrabold tracking-[0.18em] text-brand-primary">
              SCOPRI BSTUDENT
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05]">
            Guarda come funziona,{" "}
            <span className="text-brand-secondary">in pratica.</span>
          </h2>

          <p className="mt-4 text-base md:text-lg leading-relaxed text-brand-muted">
            Un'anteprima di quello che trovi dentro BStudent: lezioni, esercizi
            e progressi, tutto in un unico posto.
          </p>
        </div>

        {/* RETTANGOLO DEMO */}
        <div className="relative z-10 max-w-5xl mx-auto rounded-[28px] border border-neutral-200 bg-white shadow-[0_20px_50px_rgba(23,32,51,0.12)] overflow-hidden">
          <div className="relative w-full aspect-video">
            {/*
              TODO: sostituire con il componente della demo interattiva
              quando sarà pronto, mantenendo lo stesso wrapper rounded
              (aspect-video può cambiare a seconda del formato della demo).
            */}
            <video
              className="w-full h-full object-cover"
              poster="/demo-poster.png"
              controls
              preload="metadata"
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              Il tuo browser non supporta la riproduzione video.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
