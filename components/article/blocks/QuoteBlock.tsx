import type { QuoteBlock as QuoteBlockData } from "@/types/article";

export function QuoteBlock({ block }: { block: QuoteBlockData }) {
  return (
    <blockquote className="border-l-4 border-brand-secondary/60 pl-5 py-1">
      <p className="text-lg italic leading-7 text-foreground sm:text-xl">
        "{block.text}"
      </p>
      {block.author && (
        <footer className="mt-2 text-sm font-semibold text-brand-muted">
          — {block.author}
        </footer>
      )}
    </blockquote>
  );
}
