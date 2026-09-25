import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SampleTag } from "./SampleTag";

/**
 * Section label.
 *
 * With an `index` it becomes a chapter marker: a numeral in the brand gold, a
 * short rule, then the label. Used down the home page so the site reads as a
 * document with chapters rather than a stack of interchangeable blocks.
 */
export function Eyebrow({
  children,
  className,
  onField = false,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  onField?: boolean;
  index?: string;
}) {
  const tone = onField ? "text-gold-bright" : "text-gold-deep";

  if (index) {
    return (
      <p className={cn("eyebrow flex items-center gap-3", tone, className)}>
        <span
          className={cn(
            "inline-flex items-center border-b pb-0.5 tnum",
            onField ? "border-gold-bright/45" : "border-gold-deep/45",
          )}
        >
          {index}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-6",
            onField ? "bg-gold-bright/45" : "bg-gold-deep/45",
          )}
        />
        <span className={onField ? "text-field-muted" : "text-slate"}>
          {children}
        </span>
      </p>
    );
  }

  return (
    <p className={cn("eyebrow rule-lead", tone, className)}>{children}</p>
  );
}

export function SectionHeading({
  eyebrow,
  eyebrowTag,
  index,
  title,
  lead,
  align = "left",
  onField = false,
  className,
  maxWidth = "max-w-none",
}: {
  eyebrow?: string;
  /** Short qualifier shown beside the eyebrow, e.g. "Sample". */
  eyebrowTag?: string;
  /** Chapter number, e.g. "01". Renders the eyebrow as a chapter marker. */
  index?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  align?: "left" | "center";
  onField?: boolean;
  className?: string;
  maxWidth?: string;
}) {
  return (
    <Reveal
      className={cn(
        maxWidth,
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "flex flex-wrap items-center gap-x-3 gap-y-2",
            align === "center" && "justify-center",
          )}
        >
          <Eyebrow onField={onField} index={index}>
            {eyebrow}
          </Eyebrow>
          {eyebrowTag ? (
            <SampleTag label={eyebrowTag} onField={onField} />
          ) : null}
        </div>
      ) : null}
      <h2
        className={cn(
          "mt-5 text-[clamp(1.75rem,3.4vw,2.6rem)]",
          onField ? "text-field-foreground" : "text-ink",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-5 text-[1.0125rem] leading-[1.72] md:text-[1.075rem]",
            onField ? "text-field-muted" : "text-slate",
          )}
        >
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}

/**
 * A compliance note tied to nearby content. Used wherever a claim, a figure or
 * a manager name appears and the regulatory qualification has to travel with it.
 */
export function DisclosureNote({
  children,
  onField = false,
  className,
}: {
  children: React.ReactNode;
  onField?: boolean;
  className?: string;
}) {
  return (
    <aside
      className={cn(
        "flex gap-3 rounded-md border p-4 text-[0.8125rem] leading-[1.65] md:p-5",
        onField
          ? "border-field-border bg-white/[0.035] text-field-muted"
          : "border-border bg-muted/70 text-slate",
        className,
      )}
    >
      <Info
        aria-hidden="true"
        className={cn(
          "mt-[0.15rem] size-4 shrink-0",
          onField ? "text-gold-bright" : "text-gold-deep",
        )}
      />
      <p className="[text-wrap:pretty]">{children}</p>
    </aside>
  );
}

/** Mono label used for registration numbers and other regulatory identifiers. */
export function RegBadge({
  label,
  value,
  onField = false,
  className,
}: {
  label?: string;
  value: string;
  onField?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-2 rounded-sm border px-2.5 py-1",
        "font-mono text-[0.72rem] tracking-[0.06em] tnum",
        onField
          ? "border-field-border text-field-muted"
          : "border-border text-slate",
        className,
      )}
    >
      {label ? (
        <span className="text-[0.62rem] tracking-[0.14em] uppercase">
          {label}
        </span>
      ) : null}
      <span className={onField ? "text-field-foreground" : "text-ink-soft"}>
        {value}
      </span>
    </span>
  );
}
