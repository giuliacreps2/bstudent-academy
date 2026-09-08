import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { CourseCard, type Course } from "./CourseCard";

// TODO Placeholder — verranno sostituiti dai dati del backend
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
    <section className="bg-background text-foreground py-16 px-6 md:py-24 md:px-12">
      <div className="container-section">
        <div className="mb-10">
          <span className="inline-block  py-1 text-sm font-bold tracking-widest text-brand-primary">
            I CORSI PIÙ AMATI
          </span>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">
            <h2 className="text-4xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight max-w-2xl">
              I corsi più amati dagli studenti.
            </h2>
            <button className="hidden md:flex items-center gap-2 text-brand-primary font-medium shrink-0 hover:underline">
              Scopri tutti i corsi
              <ArrowRightIcon width={15} height={15} />
            </button>
          </div>

          <p className="text-foreground text-lg md:text-xl mt-4 max-w-2xl">
            Dai fondamentali alle materie più complesse, scegli il corso che fa
            per te.
          </p>
        </div>

        {/* CTA mobile: sopra le card */}
        <button className="flex md:hidden items-center gap-2 text-brand-primary font-medium mb-6">
          Scopri tutti i corsi
          <ArrowRightIcon width={15} height={15} />
        </button>

        {/* Griglia su desktop, carosello con scroll-snap su mobile */}
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-[85%] shrink-0 snap-start md:w-auto md:shrink"
            >
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
