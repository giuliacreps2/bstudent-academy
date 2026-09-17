import Link from "next/link";
import { FireIcon } from "@heroicons/react/24/outline";
import { CheckIcon, GiftIcon } from "@heroicons/react/24/solid";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export interface DailyChallengeProps {
  completedSteps: number;
  totalSteps: number;
  rewardLabel: string; // es. "esercizi completati"
  href: string;
}

export function DailyChallenge({
  completedSteps,
  totalSteps,
  rewardLabel,
  href,
}: DailyChallengeProps) {
  const steps = Array.from(
    { length: totalSteps },
    (_, i) => i < completedSteps,
  );

  return (
    <div className="rounded-lg bg-surface border border-border p-4 sm:p-5">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
          <FireIcon className="w-5 h-5 text-brand-coral" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Sfida giornaliera
          </p>
          <p className="text-xs text-brand-muted mt-0.5">
            Completa gli esercizi di oggi e ottieni una ricompensa speciale!
          </p>
        </div>
      </div>

      {/* STEP + REWARD */}
      <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap">
        {/* Step indicator */}
        <div className="flex items-center flex-1 min-w-35">
          {steps.map((done, index) => (
            <div
              key={index}
              className="flex items-center flex-1 last:flex-none"
            >
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-full shrink-0 border-2 transition-colors ${
                  done
                    ? "bg-brand-primary border-brand-primary"
                    : "bg-white border-border"
                }`}
              >
                {done && <CheckIcon className="w-3.5 h-3.5 text-white" />}
              </span>

              {index < steps.length - 1 && (
                <span
                  className={`h-0.5 flex-1 mx-1 rounded-full ${
                    index < completedSteps - 1
                      ? "bg-brand-primary"
                      : "bg-border"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Reward box */}
        <Link
          href={href}
          className="flex items-center gap-3 rounded-md bg-surface-blue px-4 py-2.5 shrink-0 hover:bg-surface-blue/70 transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
            <GiftIcon className="w-4 h-4 text-brand-accent" />
          </span>
          <div className="text-xs leading-tight">
            <p className="font-semibold text-foreground">
              {completedSteps} / {totalSteps}
            </p>
            <p className="text-brand-muted">{rewardLabel}</p>
          </div>
          <ChevronRightIcon className="w-4 h-4 text-brand-muted shrink-0" />
        </Link>
      </div>
    </div>
  );
}
