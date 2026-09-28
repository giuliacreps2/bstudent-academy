import Image from "next/image";
import Link from "next/link";
import {
  resourceCategoriesMeta,
  resourceColorStyles,
} from "@/constants/resources";
import type { FeaturedResource, ResourceSubjectKey } from "@/types/resources";

function FeaturedCard({ resource }: { resource: FeaturedResource }) {
  const meta = resourceCategoriesMeta[resource.category];
  const styles = resourceColorStyles[meta.color];
  const Icon = meta.icon;

  return (
    <article className="relative h-full">
      {/* CATEGORIA */}
      <span
        className={`absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-xs font-semibold shadow-sm ${styles.badgeBg} ${styles.badgeText}`}
      >
        <Icon className="h-3.5 w-3.5" />
        {meta.label}
      </span>

      <Link
        href={resource.href}
        className="flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-surface shadow-[0_8px_24px_rgba(23,32,51,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(23,32,51,0.10)]"
      >
        <div className="relative h-36 w-full bg-surface-blue">
          <Image
            src={resource.imageUrl}
            alt=""
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col p-4">
          <h3 className="text-base font-bold leading-snug text-foreground">
            {resource.title}
          </h3>
          <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">
            {resource.description}
          </p>
        </div>
      </Link>
    </article>
  );
}

export function FeaturedResources({
  subject,
  resources,
}: {
  subject: ResourceSubjectKey;
  resources: FeaturedResource[];
}) {
  return (
    <section
      aria-labelledby="resources-featured-title"
      className="py-10 md:py-14"
    >
      <div className="container-section">
        <div className="mb-7 md:mb-8">
          <p className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
            IN EVIDENZA
          </p>
          <h2
            id="resources-featured-title"
            className="mt-3 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl"
          >
            Novità e risorse in evidenza
          </h2>
        </div>

        <div
          key={subject}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 md:gap-6"
        >
          {resources.map((resource) => (
            <FeaturedCard key={resource.id} resource={resource} />
          ))}
        </div>
      </div>
    </section>
  );
}
