import Image from "next/image";
import type { SubjectData } from "@/types/myCourses";

export function CoursesHero({ subject }: { subject: SubjectData }) {
  return (
    <div className="relative overflow-hidden rounded-3xl min-h-52 sm:min-h-64">
      <Image
        src={subject.imageUrl}
        alt=""
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-r from-[#172033]/75 via-[#172033]/35 to-transparent" />

      <div className="relative z-10 flex flex-col justify-center h-full max-w-lg px-6 py-8 sm:px-10 sm:py-10">
        <span className="inline-flex items-center gap-1.5 self-start text-[10px] font-bold uppercase tracking-widest text-white bg-white/15 backdrop-blur-sm px-3 py-1 rounded-pill mb-4">
          {subject.name}
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-[1.1] mb-3">
          Corsi di {subject.name}
        </h2>

        <p className="text-sm sm:text-base text-white/80 leading-relaxed">
          Dalle basi alla padronanza. Scegli il tuo percorso.
        </p>
      </div>
    </div>
  );
}
