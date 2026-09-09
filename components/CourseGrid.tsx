import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { CourseCard, type Course } from "./CourseCard";

const courses: Course[] = [
  {
    id: 1,
    category: "Lingue",
    color: "blue",
    title: "Latino",
    subtitle: "Dalle basi alla versione",
    lessonsCount: 12,
    level: "Base",
    rating: 4.8,
    studentsCount: "2.3k",
    image: "/Hero.png",
    href: "#",
  },
  {
    id: 2,
    category: "Matematica",
    color: "pink",
    title: "Sì, le funzioni!",
    subtitle: "Dalle basi ai grafici",
    lessonsCount: 18,
    level: "Intermedio",
    rating: 4.7,
    studentsCount: "1.8k",
    image: "/Hero.png",
    href: "#",
  },
  {
    id: 3,
    category: "Inglese",
    color: "green",
    title: "English for Teens",
    subtitle: "Parla, scrivi, conquista il tuo futuro",
    lessonsCount: 15,
    level: "Base",
    rating: 4.6,
    studentsCount: "1.5k",
    image: "/Hero.png",
    href: "#",
  },
];

export function CourseGrid() {
  return (
    <section className="section pb-16 md:pb-20">
      <div className="container-section">
        {/* HEADER */}
        <div className="mb-9 md:mb-10">
          {/* DECORAZIONE */}
          <span aria-hidden="true" className="relative mb-1 block h-7 w-8">
            <span className="absolute left-2 top-0 h-3 w-1.5 rotate-[-25deg] rounded-full bg-brand-accent" />
            <span className="absolute left-0 top-3.5 h-3 w-1.5 rotate-[55deg] rounded-full bg-brand-accent" />
            <span className="absolute left-5 top-4 h-2.5 w-1.5 rotate-[80deg] rounded-full bg-brand-accent" />
          </span>

          {/* EYEBROW */}
          <span
            className="
              relative inline-block
              text-xs
              font-extrabold
              tracking-[0.18em]
              text-brand-primary
            "
          >
            I CORSI PIÙ AMATI
            {/* SOTTOLINEATURA ROSA */}
            <span
              aria-hidden="true"
              className="
                absolute
                -bottom-1
                left-0
                h-[3px]
                w-full
                -rotate-[1deg]
                rounded-full
                bg-brand-secondary
              "
            />
          </span>

          <div
            className="
              mt-4
              flex flex-col
              gap-4
              md:flex-row
              md:items-end
              md:justify-between
            "
          >
            <div>
              <h2
                className="
                  max-w-2xl
                  text-3xl
                  font-extrabold
                  leading-[1.05]
                  tracking-tight
                  sm:text-4xl
                  md:text-5xl
                "
              >
                I corsi più amati dagli studenti.
              </h2>

              <p
                className="
                  mt-4
                  max-w-2xl
                  text-base
                  leading-relaxed
                  text-brand-muted
                  md:text-lg
                "
              >
                Dai fondamentali alle materie più complesse, scegli il corso che
                fa per te.
              </p>
            </div>

            <a href="#" className="btn-tertiary shrink-0">
              Scopri tutti i corsi
              <ArrowRightIcon className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* COURSES */}
        <div className="overflow-visible pb-8">
          <div
            className="
              flex gap-5
              overflow-x-auto
              snap-x snap-mandatory
              px-2
              pb-5
              [-ms-overflow-style:none]
              [scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden

              md:grid
              md:grid-cols-3
              md:gap-6
              md:overflow-visible
              md:px-0
              md:pb-2
            "
          >
            {courses.map((course) => (
              <div
                key={course.id}
                className="
                  w-[84%]
                  shrink-0
                  snap-start

                  md:w-auto
                  md:shrink
                "
              >
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
