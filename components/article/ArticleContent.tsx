import type { ArticleBlock } from "@/types/article";
import { HeadingBlock } from "./blocks/HeadingBlock";
import { ParagraphBlock } from "./blocks/ParagraphBlock";
import { QuoteBlock } from "./blocks/QuoteBlock";
import { CalloutBlock } from "./blocks/CalloutBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { ListBlock } from "./blocks/ListBlock";

export function ArticleContent({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block) => {
        switch (block.type) {
          case "heading":
            return <HeadingBlock key={block.id} block={block} />;
          case "paragraph":
            return <ParagraphBlock key={block.id} block={block} />;
          case "quote":
            return <QuoteBlock key={block.id} block={block} />;
          case "callout":
            return <CalloutBlock key={block.id} block={block} />;
          case "image":
            return <ImageBlock key={block.id} block={block} />;
          case "list":
            return <ListBlock key={block.id} block={block} />;
          default:
            return null;
        }
      })}
    </div>
  );
}
