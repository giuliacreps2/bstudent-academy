import { CheckIcon } from "@heroicons/react/24/solid";
import type { ListBlock as ListBlockData } from "@/types/article";

export function ListBlock({ block }: { block: ListBlockData }) {
  const Tag = block.ordered ? "ol" : "ul";

  return (
    <Tag className="space-y-2.5">
      {block.items.map((item, index) => (
        <li key={item} className="flex items-start gap-3">
          {block.ordered ? (
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-surface-blue text-[11px] font-bold text-brand-primary shrink-0 mt-0.5">
              {index + 1}
            </span>
          ) : (
            <CheckIcon className="w-4.5 h-4.5 text-brand-success shrink-0 mt-1" />
          )}
          <span className="text-base leading-7 text-foreground/85">{item}</span>
        </li>
      ))}
    </Tag>
  );
}
