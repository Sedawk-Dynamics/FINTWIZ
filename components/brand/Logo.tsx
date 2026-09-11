import { cn } from "@/lib/utils";

/**
 * PLACEHOLDER WORDMARK.
 *
 * The client has not supplied a vector logo yet. This is a considered
 * typographic lockup built so the whole site can ship today. When the real
 * SVG arrives, replace the contents of `FintwizMark` and, if the supplied
 * logo includes its own wordmark, replace `Logo` entirely. Nothing else in
 * the codebase references the brand mark directly.
 *
 * The mark reads as the business does: a single mandate entering on the left,
 * routed out to a shortlist of three managers on the right. Fintwiz Wealth is
 * the routing, never the destination.
 */

export function FintwizMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className={cn("h-7 w-7 shrink-0", className)}
    >
      <rect
        x="0.75"
        y="0.75"
        width="30.5"
        height="30.5"
        rx="1.5"
        stroke="currentColor"
        strokeOpacity="0.32"
        strokeWidth="1.5"
      />
      {/* The mandate arrives */}
      <path
        d="M6 16h7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
      />
      {/* and is routed into a shortlist */}
      <path
        d="M13 16h4.5M17.5 16V8.5h3M17.5 16v7.5h3M17.5 16h3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <g fill="var(--brass)">
        <rect x="23.25" y="7.25" width="2.5" height="2.5" />
        <rect x="23.25" y="14.75" width="2.5" height="2.5" />
        <rect x="23.25" y="22.25" width="2.5" height="2.5" />
      </g>
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** Use on dark fields so the descriptor keeps contrast. */
  inverted?: boolean;
};

export function Logo({ className, inverted = false }: LogoProps) {
  return (
    <span
      className={cn("inline-flex items-center gap-2.5", className)}
      aria-label="Fintwiz Wealth"
    >
      <FintwizMark
        className={inverted ? "text-field-foreground" : "text-ink"}
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.28rem] font-semibold tracking-[-0.02em]",
            inverted ? "text-field-foreground" : "text-ink",
          )}
        >
          Fintwiz
        </span>
        <span
          className={cn(
            "mt-[3px] font-mono text-[0.5rem] font-medium tracking-[0.34em] uppercase",
            inverted ? "text-brass-bright" : "text-brass-deep",
          )}
        >
          Wealth
        </span>
      </span>
    </span>
  );
}
