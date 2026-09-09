"use client";

import { useEffect, useState } from "react";
import type { ComponentType, SVGProps } from "react";
import {
  StarIcon,
  CheckBadgeIcon,
  FireIcon,
  TrophyIcon,
} from "@heroicons/react/24/solid";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

type StatIconKey = "xp" | "points" | "streak";
type StatColor = "pink" | "green" | "orange";

const iconMap: Record<StatIconKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  xp: StarIcon,
  points: CheckBadgeIcon,
  streak: FireIcon,
};

const colorStyles: Record<StatColor, string> = {
  pink: "bg-pink-100 text-pink-600",
  green: "bg-emerald-100 text-emerald-600",
  orange: "bg-amber-100 text-amber-600",
};

export interface Stat {
  id: string | number;
  icon: StatIconKey;
  color: StatColor;
  value: number;
  suffix?: string; // es. "XP"
  label: string;
}

const stats: Stat[] = [
  { id: 1, icon: "xp", color: "pink", value: 20, suffix: "XP", label: "Oggi" },
  {
    id: 2,
    icon: "points",
    color: "green",
    value: 5,
    label: "Punti da riscattare",
  },
  {
    id: 3,
    icon: "streak",
    color: "orange",
    value: 12,
    label: "Giorni consecutivi",
  },
];

const level = 3;
const currentXp = 680;
const targetXp = 1000;

export function LevelStatsCard() {
  const { ref, isInView } = useInView(0.4);
  const [barWidth, setBarWidth] = useState(0);
  const animatedXp = useCountUp(isInView ? currentXp : 0, 1000);
  const percentage = Math.round((currentXp / targetXp) * 100);

  useEffect(() => {
    if (isInView) {
      setBarWidth(percentage);
    }
  }, [isInView, percentage]);

  return (
    <div ref={ref} className="bg-white rounded-3xl shadow-xl p-6 w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <TrophyIcon className="text-amber-400" width={20} height={20} />
          <span className="text-fg-secondary text-sm">
            Livello{" "}
            <span className="font-semibold text-heading">
              {String(level).padStart(2, "0")}
            </span>
          </span>
        </div>
        <span className="text-sm text-fg-secondary">
          <span className="font-semibold text-heading">{animatedXp}</span> /{" "}
          {targetXp} XP
        </span>
      </div>

      <div className="h-2.5 w-full bg-neutral-200 rounded-full overflow-hidden mb-6">
        <div
          className="h-full bg-brand-primary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${barWidth}%` }}
        />
      </div>

      <div className="grid grid-cols-3 divide-x divide-neutral-200">
        {stats.map((stat, index) => {
          const Icon = iconMap[stat.icon];
          return (
            <div
              key={stat.id}
              className="flex items-center gap-3 px-4 first:pl-0 last:pr-0 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 120 + 200}ms` }}
            >
              <span
                className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 ${colorStyles[stat.color]}`}
              >
                <Icon width={16} height={16} />
              </span>
              <div>
                <p className="font-semibold text-heading text-sm">
                  {stat.suffix ? `+${stat.value} ${stat.suffix}` : stat.value}
                </p>
                <p className="text-fg-secondary text-xs">{stat.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
