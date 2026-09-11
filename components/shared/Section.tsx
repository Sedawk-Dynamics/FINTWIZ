import * as React from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function Eyebrow({
  children,
  className,
  onField = false,
}: {
  children: React.ReactNode;
  className?: string;
  onField?: boolean;
}) {
  return (
    <p
      className={cn(
        "eyebrow rule-lead",
        onField ? "text-brass-bright" : "text-brass-deep",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  onField = false,
  className,
  maxWidth = "max-w-[46rem]",
}: {
  eyebrow?: string;
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
        <Eyebrow
          onField={onField}
          className={cn(align === "center" && "flex justify-center")}
        >
          {eyebrow}
        </Eyebrow>
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
          onField ? "text-brass-bright" : "text-brass-deep",
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
        <span className="text-[0.62rem] tracking-[0.14em] uppercase opacity-70">
          {label}
        </span>
      ) : null}
      <span className={onField ? "text-field-foreground" : "text-ink-soft"}>
        {value}
      </span>
    </span>
  );
}
