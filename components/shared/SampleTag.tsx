import { cn } from "@/lib/utils";

/**
 * Marks a block as an illustrative sample rather than a confirmed roster.
 *
 * The managers in lib/managers.ts are shown to demonstrate the format of the
 * roster. Empanelment is not yet confirmed for any of them, so every surface
 * that lists them carries this label. Removing it is a compliance decision,
 * not a styling one: it may only come off once signed empanelment and written
 * display consent are on file for every manager listed.
 */
export function SampleTag({
  label = "Sample",
  onField = false,
  className,
}: {
  label?: string;
  onField?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm border px-2 py-0.5",
        "font-mono text-[0.62rem] font-medium tracking-[0.16em] uppercase",
        onField
          ? "border-gold-bright/50 bg-gold-bright/10 text-gold-bright"
          : "border-gold/45 bg-gold/[0.08] text-gold-deep",
        className,
      )}
    >
      {label}
    </span>
  );
}
