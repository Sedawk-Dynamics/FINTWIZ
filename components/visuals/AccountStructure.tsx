import { ArrowDown, Layers, Wallet } from "lucide-react";
import { RevealItem, RevealGroup } from "@/components/shared/Reveal";
import { structureComparison } from "@/lib/content/pms";
import { cn } from "@/lib/utils";

type Column = typeof structureComparison.pms | typeof structureComparison.mutualFund;

/**
 * Where the securities actually sit. This is the difference between a pooled
 * vehicle and a PMS, and it is the one most investors have never had drawn out,
 * so it gets a diagram rather than a sentence.
 *
 * Deliberately structural, not performance-based: nothing here implies a return.
 */
export function AccountStructure({ className }: { className?: string }) {
  return (
    <RevealGroup
      className={cn("grid gap-5 lg:grid-cols-2 lg:gap-6", className)}
      stagger={0.1}
    >
      <StructureColumn
        column={structureComparison.mutualFund}
        icon={Layers}
      />
      <StructureColumn column={structureComparison.pms} icon={Wallet} />
    </RevealGroup>
  );
}

function StructureColumn({
  column,
  icon: Icon,
}: {
  column: Column;
  icon: typeof Layers;
}) {
  const isTeal = column.tone === "teal";

  return (
    <RevealItem
      as="article"
      className={cn(
        "flex h-full flex-col rounded-md border p-6 md:p-8",
        isTeal ? "border-teal-bright/45 bg-card" : "border-border bg-secondary",
      )}
    >
      <header className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-md border",
            isTeal
              ? "border-teal-bright/50 text-teal-bright"
              : "border-border text-slate",
          )}
        >
          <Icon className="size-4" />
        </span>
        <h3
          className={cn(
            "text-[1.05rem]",
            isTeal ? "text-ink" : "text-slate",
          )}
        >
          {column.label}
        </h3>
      </header>

      <ol className="mt-7 space-y-0">
        {column.stages.map((stage, index) => (
          <li key={stage.title}>
            <div className="flex gap-4">
              <span
                className={cn(
                  "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-sm border font-mono text-[0.66rem] tnum",
                  isTeal
                    ? "border-teal-bright/50 text-teal-bright"
                    : "border-border text-slate",
                )}
              >
                {index + 1}
              </span>
              <div className="pb-1">
                <p className="text-[0.95rem] font-medium text-ink">
                  {stage.title}
                </p>
                <p className="mt-1.5 text-[0.86rem] leading-[1.68] text-slate">
                  {stage.body}
                </p>
              </div>
            </div>

            {index < column.stages.length - 1 ? (
              <div
                aria-hidden="true"
                className="ml-3 flex h-7 w-px items-center justify-center border-l border-dashed border-border"
              >
                <ArrowDown
                  className={cn(
                    "size-3 translate-x-[-0.4rem]",
                    isTeal ? "text-teal-bright/70" : "text-slate-light",
                  )}
                />
              </div>
            ) : null}
          </li>
        ))}
      </ol>

      <p
        className={cn(
          "mt-auto border-t pt-5 text-[0.8rem] leading-[1.65]",
          isTeal
            ? "border-teal-bright/30 text-slate"
            : "border-border text-slate",
        )}
      >
        {column.footnote}
      </p>
    </RevealItem>
  );
}
