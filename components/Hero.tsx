"use client";

import { ArrowRightIcon, PlayCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

export function Hero() {
  return (
    <section className="bg-background text-foreground py-16 px-6 md:py-24 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Colonna Sinistra: Testo e Call to Action */}
        <div className="flex flex-col items-start gap-6">
          <span className="inline-block px-3 py-1 text-sm font-bold tracking-widest text-brand-primary">
            IMPARA. GIOCA. CRESCI.
          </span>
          <h1 className="text-5xl sm:text-4xl md:text-6xl font-extrabold tracking-tight leading-14 sm:leading-18">
            Studiare latino e greco può essere molto{" "}
            <span className="text-brand-secondary">più semplice.</span>
          </h1>
          <p className="text-foreground text-lg md:text-xl mt-4">
            BStudent è la piattaforma per imparare le lingue classiche
            attraverso lezioni, esercizi e un percorso pensato per aiutarti a
            migliorare un passo alla volta.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="flex items-center gap-2 bg-brand-primary hover:bg-blue-500 text-white px-6 py-3 rounded-4xl font-medium transition-colors">
              Scopri i corsi
              <ArrowRightIcon width={15} height={15} />
            </button>

            <button className="btn-border">
              <PlayCircleIcon width={15} height={15} />
              Come funziona
            </button>
          </div>
        </div>

        {/* Colonna Destra: Immagine o Elemento Visuale */}
        <div className="relative w-full aspect-square md:aspect-auto md:h-112.5 bg-linear-to-br from-blue-600 to-indigo-900 rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center p-8">
          {/* Sostituisci questo blocco con un tag <Image /> di Next.js se hai un'immagine */}
          <div>
            <Image src="/Hero.png" alt="Banner" fill className="object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
