import Image from "next/image";

export function BlogHero() {
  return (
    <section className="relative overflow-hidden rounded-3xl min-h-70 sm:min-h-80">
      <Image
        src="/Hero-BStudent.png"
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#172033]/75 via-[#172033]/35 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center h-full max-w-xl px-6 py-10 sm:px-10 sm:py-14">
        <span className="inline-flex items-center self-start text-[10px] font-bold uppercase tracking-widest text-white bg-white/15 backdrop-blur-sm px-3 py-1 rounded-pill mb-4">
          Blog
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-[1.1] mb-4">
          Idee, curiosità e consigli
          <br />
          per il tuo{" "}
          <span className="relative inline-block">
            percorso.
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-[3px] w-full -rotate-1 rounded-full bg-brand-secondary"
            />
          </span>
        </h1>

        <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-md">
          Approfondimenti, strategie di studio, curiosità dal mondo antico e
          consigli pratici per imparare latino e greco, un articolo alla volta.
        </p>
      </div>
    </section>
  );
}
