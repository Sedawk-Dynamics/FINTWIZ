import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The client's supplied logo.
 *
 * The lockup reads "Fintwiz" only, so the "Wealth" descriptor is set beside it
 * behind a hairline rule. That is deliberate: this domain is the wealth
 * distribution arm and has to be distinguishable from fintwiz.com at a glance,
 * and the descriptor is the only thing that does that in the masthead.
 *
 * Assets are generated from the source PNG by `npm run build:brand`. If a true
 * vector arrives, replace the source and re-run that script. Nothing else in
 * the codebase references the mark directly.
 */

const LOCKUP = "/brand/logo-lockup.png";
const MARK = "/brand/logo-mark.png";

/** Aspect ratio of the trimmed lockup, 2260 x 437. */
const LOCKUP_RATIO = 2260 / 437;

export function FintwizMark({
  className,
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <Image
      src={MARK}
      alt=""
      width={size}
      height={size}
      aria-hidden="true"
      className={cn("shrink-0", className)}
    />
  );
}

type LogoProps = {
  className?: string;
  /** Use on dark fields so the descriptor keeps contrast. */
  inverted?: boolean;
  /** Rendered height of the lockup in pixels. */
  height?: number;
  priority?: boolean;
};

export function Logo({
  className,
  inverted = false,
  height = 27,
  priority = false,
}: LogoProps) {
  const width = Math.round(height * LOCKUP_RATIO);

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src={LOCKUP}
        alt="Fintwiz"
        width={width}
        height={height}
        priority={priority}
        sizes={`${width}px`}
        className="h-auto w-auto"
        style={{ height, width }}
      />
      <span
        aria-hidden="true"
        className={cn(
          "hidden h-6 w-px sm:block",
          inverted ? "bg-field-border" : "bg-border-strong",
        )}
      />
      <span
        className={cn(
          "hidden font-mono text-[0.58rem] leading-none font-medium tracking-[0.28em] uppercase sm:block",
          inverted ? "text-field-muted" : "text-slate",
        )}
      >
        Wealth
      </span>
    </span>
  );
}
