import Image from "next/image";
import type { NotebookStudent } from "@/types/notebook";

export function NotebookCover({ student }: { student: NotebookStudent }) {
  return (
    <div className="card-notebook-cover px-6 py-10 sm:px-10 sm:py-14">
      {/* dorso decorativo */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-3 sm:w-4"
        style={{ backgroundColor: "var(--texture-notebook-gold)" }}
      />

      <div className="relative z-10 flex flex-col items-center gap-4 text-center">
        <div
          className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-2 sm:h-24 sm:w-24"
          style={{ borderColor: "var(--texture-notebook-gold)" }}
        >
          <Image
            src={student.avatarUrl}
            alt={student.name}
            fill
            className="object-cover"
          />
        </div>

        <div>
          <p
            className="text-xs font-extrabold uppercase tracking-[0.18em]"
            style={{ color: "var(--texture-notebook-gold)" }}
          >
            Il quaderno di
          </p>
          <h1 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
            {student.name}
          </h1>
        </div>

        <p className="max-w-sm text-sm leading-6 text-white/70">
          Tutto ciò che impari lungo il tuo percorso — e ciò che scegli di
          conservare — trova posto qui.
        </p>
      </div>
    </div>
  );
}
