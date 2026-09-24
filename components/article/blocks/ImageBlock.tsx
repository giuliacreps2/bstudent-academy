import Image from "next/image";
import type { ImageBlock as ImageBlockData } from "@/types/article";

export function ImageBlock({ block }: { block: ImageBlockData }) {
  return (
    <figure>
      <div className="relative w-full h-56 sm:h-80 rounded-2xl overflow-hidden">
        <Image src={block.src} alt={block.alt} fill className="object-cover" />
      </div>
      {block.caption && (
        <figcaption className="mt-2 text-center text-xs text-brand-muted">
          {block.caption}
        </figcaption>
      )}
    </figure>
  );
}
