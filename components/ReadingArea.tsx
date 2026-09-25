import type { ElementType, ReactNode } from "react";

interface ReadingAreaProps {
  children: ReactNode;
  /** Tag HTML da usare: "div" (default), "article", "section", "main"... */
  as?: ElementType;
  className?: string;
}

/**
 * Racchiude i contenuti di lettura (missioni, esercizi, Quaderno, Risorse,
 * articoli): qui dentro valgono le preferenze scelte in Account → Accessibilità.
 * Gli stili sono in app/reading.css.
 */
export function ReadingArea({
  children,
  as: Tag = "div",
  className = "",
}: ReadingAreaProps) {
  return <Tag className={`reading-area ${className}`.trim()}>{children}</Tag>;
}
