import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A captioned photograph that fills the height of its grid row.
 *
 * Used where a photo sits beside a column of text. A fixed-ratio image stops
 * wherever its ratio says, leaving dead space under it whenever the text
 * column runs longer, and the gap changes at every breakpoint. Here the image
 * area flexes to the row height from lg upwards, so the caption always lands
 * level with the bottom of the neighbouring column. Below lg the columns
 * stack, so the image falls back to a 4:3 frame.
 *
 * The parent grid item must be `h-full` (grid items stretch by default, so
 * this resolves against the row).
 */
export function FillFigure({
  src,
  alt,
  caption,
  sizes,
  objectPosition = "center",
  className,
}: {
  src: string;
  alt: string;
  caption: React.ReactNode;
  sizes: string;
  /** Which part of the photo to keep when the frame crops it. */
  objectPosition?: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-md border border-border bg-card",
        className,
      )}
    >
      <div className="relative aspect-[4/3] w-full lg:aspect-auto lg:min-h-80 lg:flex-1">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover"
          style={{ objectPosition }}
        />
      </div>
      <figcaption className="border-t border-border px-5 py-4 text-[0.78rem] leading-relaxed text-slate">
        {caption}
      </figcaption>
    </figure>
  );
}
