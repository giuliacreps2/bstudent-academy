import Image from "next/image";

interface SkinImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function SkinImage({ src, alt, className }: SkinImageProps) {
  return (
    <Image src={src} alt={alt} width={96} height={96} className={className} />
  );
}
