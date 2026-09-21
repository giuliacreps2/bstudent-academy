import Image from "next/image";
import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import type { SubjectData } from "@/types/myCourses";

export function SubjectCard({
  subject,
  active,
}: {
  subject: SubjectData;
  active: boolean;
}) {
  const content = (
    <div
      className={`relative h-24 rounded-lg overflow-hidden ${
        active ? "ring-2 ring-brand-secondary" : ""
      } ${subject.locked ? "opacity-70" : ""}`}
    >
      <Image
        src={subject.imageUrl}
        alt={subject.name}
        fill
        className={`object-cover ${subject.locked ? "grayscale" : ""}`}
      />

      <div className="absolute inset-0 bg-linear-to-t from-[#172033]/85 via-[#172033]/15 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-3">
        <p className="font-bold text-white text-sm leading-tight">
          {subject.name}
        </p>
        <p className="text-[11px] text-white/75 leading-tight mt-0.5">
          {subject.tagline}
        </p>
      </div>

      {subject.locked && (
        <span className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-black/40 backdrop-blur-sm">
          <LockClosedIcon className="w-3.5 h-3.5 text-white" />
        </span>
      )}
    </div>
  );

  if (subject.locked) {
    return (
      <div className="cursor-not-allowed select-none" aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={`/my/courses?materia=${subject.slug}`}
      className="block active:scale-[0.98] transition-transform duration-150"
      aria-current={active ? "true" : undefined}
    >
      {content}
    </Link>
  );
}
