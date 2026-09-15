import type { SkinBonus } from "@/types/dashboard";

interface SkinDetailsProps {
  name: string;
  bonuses: SkinBonus[];
}

export function SkinDetails({ name, bonuses }: SkinDetailsProps) {
  return (
    <div className="flex-1">
      <p className="font-semibold text-foreground mb-2 flex items-center gap-1.5">
        <span className="text-brand-primary">★</span> {name}
      </p>
      <ul className="text-sm text-brand-muted space-y-0.5 mb-4">
        {(bonuses ?? []).map((bonus) => (
          <li key={bonus.label}>
            {bonus.value} {bonus.label}
          </li>
        ))}
      </ul>
      <button className="btn-primary text-sm px-4 py-2 active:scale-95 transition-transform duration-150">
        Cambia skin →
      </button>
    </div>
  );
}
