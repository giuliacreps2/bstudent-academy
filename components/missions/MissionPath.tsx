import type { MissionMapNode } from "@/types/missions";

export function MissionPath({ missions }: { missions: MissionMapNode[] }) {
  const ordered = [...missions].sort((a, b) => a.order - b.order);

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {ordered.slice(0, -1).map((mission, index) => {
        const next = ordered[index + 1];
        // Il tratto è "percorso" (oro) solo se la missione di partenza è completata
        const isWalked = mission.status === "completed";

        return (
          <line
            key={`${mission.id}-${next.id}`}
            x1={mission.position.x}
            y1={mission.position.y}
            x2={next.position.x}
            y2={next.position.y}
            stroke={isWalked ? "var(--brand-accent)" : "rgba(255,255,255,0.55)"}
            strokeWidth={isWalked ? 0.6 : 0.45}
            strokeDasharray={isWalked ? undefined : "1.4 1.6"}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}
