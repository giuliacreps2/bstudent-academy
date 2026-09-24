import { StarIcon } from "@heroicons/react/24/solid";
import type { LandingReview } from "@/types/courseLanding";

const MIN_ITEMS = 6;

function initials(author: string) {
  return author
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ReviewCard({ review }: { review: LandingReview }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-border bg-surface p-5">
      <div
        role="img"
        aria-label={`${review.rating} stelle su 5`}
        className="flex gap-0.5"
      >
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            className={`h-4 w-4 ${
              index < review.rating ? "text-brand-accent" : "text-border"
            }`}
          />
        ))}
      </div>

      <blockquote className="mt-3 flex-1 text-sm leading-6 text-foreground">
        {review.text}
      </blockquote>

      <figcaption className="mt-4 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-blue text-xs font-extrabold text-brand-primary">
          {initials(review.author)}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold">{review.author}</span>
          <span className="block text-xs text-brand-muted">{review.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function CourseLandingReviews({
  reviews,
}: {
  reviews: LandingReview[];
}) {
  if (reviews.length === 0) return null;

  // Stessa tecnica del carosello corsi: ripeto le recensioni per riempire la
  // fascia, poi la duplico. L'animazione scorre di -50% senza salti.
  const repeats = Math.ceil(MIN_ITEMS / reviews.length);
  const items = Array.from({ length: repeats }, () => reviews).flat();

  return (
    <section
      aria-labelledby="landing-reviews-title"
      className="overflow-hidden bg-background py-16 text-foreground md:py-20"
    >
      <div className="container-section mb-9 md:mb-10">
        <span className="text-xs font-extrabold tracking-[0.18em] text-brand-primary md:text-sm">
          DICONO DI NOI
        </span>

        <h2
          id="landing-reviews-title"
          className="mt-3 max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
        >
          Cosa ne pensano gli studenti.
        </h2>
      </div>

      <div className="group overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] motion-reduce:overflow-x-auto">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {[false, true].map((decorative) => (
            <div
              key={String(decorative)}
              aria-hidden={decorative || undefined}
              className="flex shrink-0 motion-reduce:[&:last-child]:hidden"
            >
              {items.map((review, index) => (
                <div
                  key={`${review.id}-${index}`}
                  className="w-72 shrink-0 pr-4 sm:w-80"
                >
                  <ReviewCard review={review} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
