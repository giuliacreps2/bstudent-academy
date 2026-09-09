"use client";

import {
  PlayCircleIcon,
  DocumentTextIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export function TwoCol() {
  return (
    <section className="section">
      <div className="container-section">
        <div
          className="
            relative
            overflow-hidden
            rounded-[24px]
            bg-surface-blue
            px-6 py-8
            md:px-12 md:py-10
            grid
            grid-cols-1
            md:grid-cols-5
            gap-8
            md:gap-12
            items-center
          "
        >
          {/* DECORAZIONI DI SFONDO */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden"
          >
            {/* Blob rosa */}
            <div
              className="
                absolute
                -left-20
                -top-20
                h-44
                w-44
                rounded-full
                bg-[#ffd5e7]
                opacity-50
                blur-[1px]
              "
            />

            {/* Forma blu */}
            <div
              className="
                absolute
                -bottom-24
                left-[12%]
                h-48
                w-48
                rounded-full
                bg-[#d7e8ff]
                opacity-70
              "
            />

            {/* Piccoli elementi gialli */}
            <div className="absolute left-[6%] top-[32%] h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />

            <div className="absolute left-[3%] top-[39%] h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />

            <div className="absolute left-[8%] top-[42%] h-2.5 w-1.5 rotate-[80deg] rounded-full bg-brand-accent" />

            {/* Piccolo punto rosa */}
            <div
              className="
                absolute
                bottom-[18%]
                left-[25%]
                h-3
                w-3
                rounded-full
                bg-brand-secondary
                opacity-70
              "
            />
          </div>

          {/* TESTO */}
          <div
            className="
              relative
              z-10
              md:col-span-2
              flex
              flex-col
              items-start
            "
          >
            <span
              className="
                text-xs
                font-bold
                tracking-[0.18em]
                text-brand-primary
              "
            >
              IL TUO STILE, IL TUO RITMO
            </span>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                tracking-tight
                leading-[1.05]
                sm:text-4xl
                md:text-5xl
              "
            >
              Studia come vuoi, quando vuoi.
            </h2>

            <p
              className="
                mt-5
                max-w-xl
                text-base
                leading-relaxed
                text-brand-muted
                md:text-lg
              "
            >
              Che tu preferisca seguire le lezioni, ripassare con gli appunti o
              metterti alla prova con gli esercizi, su BStudent trovi tutto ciò
              che ti serve, nel modo che preferisci.
            </p>

            <a href="#" className="btn-secondary mt-7">
              Scopri come funziona
            </a>
          </div>

          {/* IMMAGINE */}
          <div
            className="
              relative
              z-10
              md:col-span-3
              w-full
              h-[300px]
              md:h-[380px]
            "
          >
            <Image
              src="/Studenti-BStudent.png"
              alt="Studenti che usano BStudent"
              fill
              className="object-contain"
            />

            {/* IMPARA */}
            <div
              className="
                absolute
                top-[28%]
                left-0
                flex
                items-center
                gap-2
                rounded-xl
                bg-brand-primary/10
                pl-2
                pr-4
                py-2
                shadow-md
                animate-float
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-brand-primary
                "
              >
                <PlayCircleIcon className="text-white" width={16} height={16} />
              </span>

              <div>
                <p className="text-xs font-semibold leading-tight text-brand-primary">
                  Impara
                </p>

                <p className="text-[10px] leading-tight text-brand-primary/70">
                  con le video lezioni
                </p>
              </div>
            </div>

            {/* ALLENATI */}
            <div
              className="
                absolute
                right-[5%]
                top-[8%]
                flex
                items-center
                gap-2
                rounded-xl
                bg-brand-success/10
                pl-2
                pr-4
                py-2
                shadow-md
                animate-float
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-brand-success
                "
              >
                <DocumentTextIcon
                  className="text-white"
                  width={16}
                  height={16}
                />
              </span>

              <div>
                <p className="text-xs font-semibold leading-tight text-brand-success">
                  Allenati
                </p>

                <p className="text-[10px] leading-tight text-brand-success/70">
                  con gli esercizi
                </p>
              </div>
            </div>

            {/* CRESCI */}
            <div
              className="
                absolute
                bottom-[8%]
                right-0
                flex
                items-center
                gap-2
                rounded-xl
                bg-brand-accent/15
                pl-2
                pr-4
                py-2
                shadow-md
                animate-float
              "
            >
              <span
                className="
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-brand-accent
                "
              >
                <StarIcon className="text-white" width={16} height={16} />
              </span>

              <div>
                <p className="text-xs font-semibold leading-tight text-foreground">
                  Cresci
                </p>

                <p className="text-[10px] leading-tight text-foreground/60">
                  con i tuoi progressi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
