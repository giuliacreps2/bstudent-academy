import type { ParagraphBlock as ParagraphBlockData } from "@/types/article";

export function ParagraphBlock({ block }: { block: ParagraphBlockData }) {
  return (
    <p className="text-base leading-7 text-foreground/85 sm:text-lg sm:leading-8">
      {block.text}
    </p>
  );
}
