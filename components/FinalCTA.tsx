import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { PlayCircleIcon } from "@heroicons/react/24/solid";

export function FinalCTA() {
  return (
    <section className="bg-[url('/land.png')] bg-cover bg-center py-12 md:py-16">
      <div className="container-section">
        <div
          className="
            relative
            overflow-hidden
            rounded-[28px]
            px-6
            py-14
            text-center
            text-foregound
            md:px-12
            md:py-20
          "
        >
          {/* CONTENUTO */}
          <div className="relative z-10 mx-auto max-w-3xl">
            <span className="text-xs font-extrabold tracking-[0.18em] text-foregound md:text-sm">
              SCALA LE CLASSIFICHE
            </span>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                leading-[1.05]
                tracking-tight
                sm:text-4xl
                md:text-5xl
              "
            >
              Inizia il tuo percorso
              {/* <br className="hidden sm:block" />
              in un modo nuovo?*/}
            </h2>

            <p
              className="
                mx-auto
                mt-5
                max-w-xl
                text-base
                leading-7
                text-foregound
                md:text-lg
              "
            >
              Impara, allenati e cresci con BStudent. Il tuo percorso nelle
              lingue classiche comincia qui.
            </p>

            <div className="mt-8 flex justify-center">
              <a
                href="#"
                className="
                btn-secondary
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-3
                  font-bold
                  shadow-[0_10px_25px_rgba(23,32,51,0.12)]
                "
              >
                Inizia gratis
                <ArrowRightIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
