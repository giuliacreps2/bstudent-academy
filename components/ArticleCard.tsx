import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarDateRangeIcon,
  ChartBarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export type ArticleColor = "blue" | "pink" | "green";

const colorStyles: Record<ArticleColor, { badge: string }> = {
  blue: {
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  pink: {
    badge: "bg-pink-50 text-pink-700 border-pink-200",
  },
  green: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

export interface Article {
  id: string | number;
  category: string;
  color: ArticleColor;
  title: string;
  subtitle: string;
  date: Date;
  time: number;
  image: string;
  href: string;
}

export function ArticleCard({ article }: { article: Article }) {
  const styles = colorStyles[article.color];

  return (
    <div className="relative h-full">
      <span
        className={`absolute top-3 left-4 z-10 inline-flex items-center border text-xs font-medium px-3 py-1 rounded-full shadow-sm ${styles.badge}`}
      >
        {article.category}
      </span>

      <div className="bg-neutral-primary-soft rounded-3xl shadow-xl overflow-hidden h-full flex flex-col">
        <a href={article.href}>
          <img
            className="w-full h-20 object-cover"
            src={article.image}
            alt={`Copertina corso di ${article.title}`}
          />
        </a>

        <div className="px-6 py-4 flex flex-col flex-1">
          <a href={article.href}>
            <h5 className="text-left mb-1.5 text-xl font-semibold tracking-tight text-heading">
              {article.title}
            </h5>
          </a>
          <p className="text-left text-fg-secondary mb-4">{article.subtitle}</p>

          <div className="flex items-center gap-4 text-sm text-fg-secondary mb-4">
            <div className="flex items-center gap-1.5">
              <CalendarDateRangeIcon width={15} height={15} />
              <span className="font-medium text-heading">
                {article.date.toLocaleDateString("it-IT")}
              </span>{" "}
            </div>
            <span className="text-fg-secondary">|</span>
            <div className="flex items-center gap-1.5">
              <ClockIcon width={15} height={15} />
              <span>
                <span className="font-medium text-heading">{article.time}</span>
                min{" "}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
