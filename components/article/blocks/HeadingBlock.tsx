import type { HeadingBlock as HeadingBlockData } from "@/types/article";

export function HeadingBlock({ block }: { block: HeadingBlockData }) {
  return (
    <div className="flex items-center gap-3 mt-10 mb-3 first:mt-0">
      {block.number && (
        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-blue text-sm font-extrabold text-brand-primary shrink-0">
          {block.number}
        </span>
      )}
      <h2 className="text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
        {block.text}
      </h2>
    </div>
  );
}
