import { SkinImage } from "./SkinImage";
import { SkinDetails } from "@/components/dashboard/rightColumn/SkinDetails";
import type { SkinData } from "@/types/dashboard";

export function SkinCard({ skin }: { skin: SkinData }) {
  return (
    <div className="rounded-lg bg-surface border border-border p-4">
      <p className="text-sm font-semibold text-foreground mb-4">La tua skin</p>
      <div className="flex items-start gap-4">
        <SkinDetails name={skin.name} bonuses={skin.bonuses} />
        <SkinImage
          src={skin.imageUrl}
          alt={skin.name}
          className="w-24 h-24 rounded-full object-cover shrink-0"
        />
      </div>
    </div>
  );
}
