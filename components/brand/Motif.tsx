import { cn } from "@/lib/utils";

/**
 * A design device system abstracted from the logo mark.
 *
 * The mark is a chamfered diamond containing two ascending arrows over a bar
 * chart. Rather than decorate the site with unrelated shapes, these components
 * reuse that geometry so section openers, list bullets, dividers and background
 * textures all read as the same brand. It is the cheapest way to stop a site
 * looking like a template with a logo dropped into the corner.
 */

/** The chamfered diamond from the mark, on its own. */
export function BrandDiamond({
  className,
  size = 14,
  variant = "outline",
  strokeWidth = 1.6,
}: {
  className?: string;
  size?: number;
  variant?: "outline" | "solid" | "half";
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <rect
        x="4.2"
        y="4.2"
        width="15.6"
        height="15.6"
        rx="2.6"
        transform="rotate(45 12 12)"
        fill={variant === "solid" ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={variant === "solid" ? 0 : strokeWidth}
      />
      {variant === "half" ? (
        <path
          d="M12 1.8 L22.2 12 L12 22.2 Z"
          fill="currentColor"
          opacity="0.9"
        />
      ) : null}
    </svg>
  );
}

/**
 * The ascent: two rising strokes over three bars, the payload of the mark.
 * Used as a section opener and in the hero, where it earns being larger.
 */
export function AscentMark({
  className,
  size = 40,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("shrink-0", className)}
      fill="none"
    >
      <rect
        x="9.5"
        y="9.5"
        width="29"
        height="29"
        rx="4"
        transform="rotate(45 24 24)"
        stroke="currentColor"
        strokeOpacity="0.32"
        strokeWidth="1.5"
      />
      {/* bars, shortest to tallest */}
      <g className="text-gold-logo" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square">
        <path d="M18 32v-4" />
        <path d="M24 32v-8" />
        <path d="M30 32v-12" />
      </g>
      {/* the ascent */}
      <path
        d="M15 26 L22 19 L27 24 L35 16"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <path d="M30 15h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
    </svg>
  );
}

/**
 * A faint tiled lattice of the diamond, for dark fields.
 *
 * Replaces the generic square grid that every dark hero on the internet uses.
 * Rendered as one inline SVG pattern, so it costs a single element and no
 * network request, and it inherits colour from the parent.
 */
export function DiamondField({
  className,
  scale = 56,
}: {
  className?: string;
  scale?: number;
}) {
  return (
    <svg
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <defs>
        <pattern
          id="fw-diamond-lattice"
          width={scale}
          height={scale}
          patternUnits="userSpaceOnUse"
        >
          <rect
            x={scale * 0.28}
            y={scale * 0.28}
            width={scale * 0.44}
            height={scale * 0.44}
            rx={scale * 0.06}
            transform={`rotate(45 ${scale / 2} ${scale / 2})`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#fw-diamond-lattice)" />
    </svg>
  );
}

/**
 * Section divider: a hairline broken by the diamond. Used between the major
 * bands on the home page so the page reads as a document with chapters.
 */
export function RuleDivider({
  className,
  onField = false,
}: {
  className?: string;
  onField?: boolean;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center gap-4", className)}
    >
      <span
        className={cn(
          "h-px flex-1",
          onField ? "bg-field-border" : "bg-border",
        )}
      />
      <BrandDiamond
        size={11}
        className={onField ? "text-gold-bright/70" : "text-gold/70"}
      />
      <span
        className={cn(
          "h-px flex-1",
          onField ? "bg-field-border" : "bg-border",
        )}
      />
    </div>
  );
}
