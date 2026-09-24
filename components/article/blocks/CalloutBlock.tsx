import type { CalloutBlock as CalloutBlockData } from "@/types/article";

export function CalloutBlock({ block }: { block: CalloutBlockData }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-surface-blue p-4 sm:p-5">
      <span className="text-lg leading-none shrink-0" aria-hidden="true">
        {block.icon ?? "💡"}
      </span>
      <p className="text-sm leading-6 text-foreground sm:text-base">
        {block.text}
      </p>
    </div>
  );
}
