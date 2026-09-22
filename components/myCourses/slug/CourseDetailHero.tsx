import Image from "next/image";
import Link from "next/link";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import {
  BookOpenIcon,
  ChartBarIcon,
  StarIcon,
} from "@heroicons/react/24/outline";

interface CourseDetailHeroProps {
  subjectName: string;
  imageUrl: string;
  title: string;
  tagline: string;
  description: string;
  /** Numero di tappe/missioni — sempre calcolato dinamicamente dal chiamante. */
  missionsCount: number;
  skillsCount: number;
  recommendedLevel: string;
  continueHref: string;
}

export function CourseDetailHero({
  subjectName,
  imageUrl,
  title,
  tagline,
  description,
  missionsCount,
  skillsCount,
  recommendedLevel,
  continueHref,
}: CourseDetailHeroProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl min-h-110">
      <Image src={imageUrl} alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#172033]/85 via-[#172033]/45 to-transparent" />

      <div className="relative z-10 flex h-full flex-col justify-center gap-5 max-w-lg px-6 py-10 sm:px-10">
        <span className="inline-flex items-center gap-1.5 self-start text-[10px] font-bold uppercase tracking-widest text-white bg-white/15 backdrop-blur-sm px-3 py-1 rounded-pill">
          {subjectName}
        </span>

        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.05]">
            {title}
          </h1>
          <p className="mt-2 text-base sm:text-lg font-semibold text-white/90">
            {tagline}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/75">
            {description}
          </p>
        </div>

        {/* Badge dinamici — tappe è sempre calcolato dal numero di missioni */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/90">
          <span className="flex items-center gap-1.5">
            <BookOpenIcon className="w-4 h-4" />
            {missionsCount} tappe
          </span>
          <span className="flex items-center gap-1.5">
            <ChartBarIcon className="w-4 h-4" />
            {skillsCount} skill principali
          </span>
          <span className="flex items-center gap-1.5">
            <StarIcon className="w-4 h-4" />
            Livello consigliato: {recommendedLevel}
          </span>
        </div>

        <Link
          href={continueHref}
          className="inline-flex items-center gap-3 self-start rounded-2xl bg-brand-primary pl-3 pr-6 py-3 text-white shadow-lg hover:bg-brand-primary-hover active:scale-95 transition-all duration-150"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 shrink-0">
            <PlayCircleIcon className="h-5 w-5" />
          </span>
          <span className="text-left leading-tight">
            <span className="block text-sm font-bold">
              Continua il percorso
            </span>
            <span className="block text-xs text-white/70">
              Riprendi dalla tua ultima missione
            </span>
          </span>
        </Link>
      </div>
    </div>
  );
}
