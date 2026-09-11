import type { ComponentType, SVGProps } from "react";
import {
  AcademicCapIcon,
  FireIcon,
  ChatBubbleLeftRightIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export type StepColor = "blue" | "green" | "purple" | "amber" | "pink";

export type StepIconKey = "impara" | "allenati" | "feedback" | "xp" | "skill";

const iconMap: Record<StepIconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  impara: AcademicCapIcon,
  allenati: FireIcon,
  feedback: ChatBubbleLeftRightIcon,
  xp: StarIcon,
  skill: ArrowTrendingUpIcon,
};

const colorStyles: Record<
  StepColor,
  {
    icon: string;
    number: string;
    dot: string;
  }
> = {
  blue: {
    icon: "bg-brand-primary/10 text-brand-primary",
    number: "text-brand-primary",
    dot: "bg-brand-primary",
  },

  green: {
    icon: "bg-brand-green/10 text-brand-green",
    number: "text-brand-green",
    dot: "bg-brand-green",
  },

  purple: {
    icon: "bg-brand-purple/10 text-brand-purple",
    number: "text-brand-purple",
    dot: "bg-brand-purple",
  },

  amber: {
    icon: "bg-brand-yellow/15 text-brand-accent",
    number: "text-brand-accent",
    dot: "bg-brand-accent",
  },

  pink: {
    icon: "bg-brand-secondary/10 text-brand-secondary",
    number: "text-brand-secondary",
    dot: "bg-brand-secondary",
  },
};

export interface Step {
  id: string | number;
  number: number;
  icon: StepIconKey;
  color: StepColor;
  title: string;
  description: string;
}

export function StepCard({ step }: { step: Step }) {
  const styles = colorStyles[step.color];
  const Icon = iconMap[step.icon];

  return (
    <article className="group relative flex items-start gap-4 md:block">
      {/* =========================
          ICONA
      ========================== */}

      <div
        className={`
          relative z-10
          flex h-12 w-12 shrink-0
          items-center justify-center
          rounded-2xl
          ${styles.icon}
          transition-transform duration-200
          group-hover:-translate-y-0.5
          md:h-11 md:w-11
        `}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>

      {/* =========================
          CONTENUTO
      ========================== */}

      <div className="min-w-0 pt-0.5 md:mt-4 md:pt-0">
        {/* Numero */}
        <div className="mb-1.5">
          <span
            className={`
              text-[11px]
              font-extrabold
              tracking-[0.14em]
              ${styles.number}
            `}
          >
            {String(step.number).padStart(2, "0")}
          </span>
        </div>

        {/* Titolo */}
        <h3
          className="
            text-base
            font-extrabold
            tracking-tight
            text-foreground
            md:text-lg
          "
        >
          {step.title}
        </h3>

        {/* Descrizione */}
        <p
          className="
            mt-1
            max-w-60
            text-sm
            leading-6
            text-brand-muted
          "
        >
          {step.description}
        </p>
      </div>
    </article>
  );
}
