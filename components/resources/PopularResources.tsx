import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { resourceIcons } from "@/constants/resources";
import type { PopularResource, ResourceSubjectKey } from "@/types/resources";

const inkStyle = { color: "var(--texture-papyrus-ink)" };
const inkMutedStyle = { color: "var(--texture-papyrus-ink-muted)" };

function PopularCard({ resource }: { resource: PopularResource }) {
  const Icon = resourceIcons[resource.icon];

  return (
    <Link
      href={resource.href}
      className="card-papyrus group flex h-full flex-col p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/70">
        <Icon className="h-6 w-6" style={inkStyle} />
      </span>

      <h3 className="mt-4 text-lg font-extrabold" style={inkStyle}>
        {resource.title}
      </h3>
      <p className="mt-1 flex-1 text-sm leading-6" style={inkMutedStyle}>
        {resource.description}
      </p>

      <ArrowRightIcon
        aria-hidden="true"
        className="mt-4 h-4 w-4 transition-transform group-hover:translate-x-1"
        style={inkStyle}
      />
    </Link>
  );
}

export function PopularResources({
  subject,
  resources,
}: {
  subject: ResourceSubjectKey;
  resources: PopularResource[];
}) {
  return (
    <section
      aria-labelledby="resources-popular-title"
      className="py-10 md:py-14"
    >
      <div className="container-section">
        <div className="mb-7 md:mb-8">
          <p className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
            <span aria-hidden="true">🔥 </span>
            LE PIÙ CONSULTATE
          </p>
          <h2
            id="resources-popular-title"
            className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl"
          >
            Le risorse più usate
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-muted">
            Le tabelle e gli strumenti che gli studenti consultano di più.
          </p>
        </div>

        {/* Mobile: scroll orizzontale (sono shortcut). Desktop: griglia. */}
        <div
          key={subject}
          className="-mx-1 flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-3 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-5 [&::-webkit-scrollbar]:hidden"
        >
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="w-[70%] shrink-0 snap-start sm:w-[45%] md:w-auto md:shrink"
            >
              <PopularCard resource={resource} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
