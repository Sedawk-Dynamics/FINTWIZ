import { ArrowDown, ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The narrow-screen form of the two flow diagrams.
 *
 * The desktop diagrams are SVG, which scales as a picture. Below the lg
 * breakpoint that scaling takes their labels under 8px, and at phone width to
 * roughly 3px, so the same information is laid out here as real text in a
 * vertical flow instead of being shrunk.
 *
 * Three nodes run top to bottom, joined by two connectors. A rail down the
 * left edge links the first node straight to the last and passes the middle
 * one without touching it. That rail is the point of both diagrams: capital
 * that bypasses the distributor, or a fee that is never charged.
 */

type Tone = "neutral" | "gold" | "azure";

export type FlowNode = {
  kicker: string;
  title: string;
  sub: string;
  tone: Tone;
};

export type FlowConnector = {
  label: string;
  tone: Exclude<Tone, "neutral">;
  dashed?: boolean;
};

export type FlowRail = {
  label: string;
  tone: "azure" | "muted";
  /** "arrow" ends in an arrowhead; "blocked" marks a route that does not exist. */
  kind: "arrow" | "blocked";
};

const nodeBorder: Record<Tone, string> = {
  neutral: "border-border-strong",
  gold: "border-gold",
  azure: "border-azure-bright",
};

const lineColour: Record<Exclude<Tone, "neutral">, string> = {
  gold: "border-gold",
  azure: "border-azure-bright",
};

const textColour: Record<Exclude<Tone, "neutral">, string> = {
  gold: "text-gold-deep",
  azure: "text-azure-bright",
};

export function StackedFlow({
  nodes,
  connectors,
  rail,
  className,
}: {
  nodes: readonly [FlowNode, FlowNode, FlowNode];
  connectors: readonly [FlowConnector, FlowConnector];
  rail: FlowRail;
  className?: string;
}) {
  const railLine =
    rail.tone === "azure"
      ? "border-azure-bright border-solid"
      : "border-slate-light border-dashed";
  const railText = rail.tone === "azure" ? "text-azure-bright" : "text-slate";

  // Five rows: node, connector, node, connector, node.
  const rows = [
    { kind: "node", node: nodes[0], railPart: "start" },
    { kind: "connector", connector: connectors[0], railPart: "through" },
    { kind: "node", node: nodes[1], railPart: "bypass" },
    { kind: "connector", connector: connectors[1], railPart: "through" },
    { kind: "node", node: nodes[2], railPart: "end" },
  ] as const;

  return (
    <div className={cn("w-full", className)}>
      <ol className="grid grid-cols-[2.25rem_1fr]">
        {rows.map((row, index) => (
          <li key={index} className="contents">
            {/* Rail gutter */}
            <div aria-hidden="true" className="relative">
              <span
                className={cn(
                  "absolute left-[0.6875rem] border-l-2",
                  railLine,
                  row.railPart === "start" && "top-1/2 bottom-0",
                  row.railPart === "end" && "top-0 bottom-1/2",
                  (row.railPart === "through" || row.railPart === "bypass") &&
                    "top-0 bottom-0",
                )}
              />
              {row.railPart === "start" || row.railPart === "end" ? (
                <span
                  className={cn(
                    "absolute top-1/2 right-0 left-[0.6875rem] border-t-2",
                    railLine,
                  )}
                />
              ) : null}
              {row.railPart === "end" && rail.kind === "arrow" ? (
                <ArrowRight
                  className={cn(
                    "absolute top-1/2 -right-1.5 size-4 -translate-y-1/2",
                    railText,
                  )}
                  strokeWidth={2.5}
                />
              ) : null}
              {row.railPart === "bypass" && rail.kind === "blocked" ? (
                <span className="absolute top-1/2 left-[0.6875rem] flex size-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-sm border border-slate-light bg-card">
                  <X className="size-3 text-slate" strokeWidth={2.5} />
                </span>
              ) : null}
            </div>

            {/* Content column */}
            {row.kind === "node" ? (
              <div
                className={cn(
                  "rounded-md border bg-card px-4 py-3.5",
                  nodeBorder[row.node.tone],
                )}
              >
                <p className="font-mono text-[0.66rem] tracking-[0.12em] text-slate uppercase">
                  {row.node.kicker}
                </p>
                <p className="mt-1 font-display text-[1.05rem] font-medium text-ink">
                  {row.node.title}
                </p>
                <p className="mt-0.5 text-[0.84rem] text-slate">
                  {row.node.sub}
                </p>
              </div>
            ) : (
              <div className="flex items-stretch gap-3 py-1.5 pl-5">
                <span
                  aria-hidden="true"
                  className="relative flex w-3 shrink-0 justify-center"
                >
                  <span
                    className={cn(
                      "h-full border-l-2",
                      lineColour[row.connector.tone],
                      row.connector.dashed ? "border-dashed" : "border-solid",
                    )}
                  />
                  <ArrowDown
                    className={cn(
                      "absolute -bottom-1 size-3.5",
                      textColour[row.connector.tone],
                    )}
                    strokeWidth={2.5}
                  />
                </span>
                <p
                  className={cn(
                    "py-3 font-mono text-[0.7rem] leading-snug tracking-[0.08em] uppercase",
                    textColour[row.connector.tone],
                  )}
                >
                  {row.connector.label}
                </p>
              </div>
            )}
          </li>
        ))}
      </ol>

      <p
        className={cn(
          "mt-5 flex items-start gap-3 font-mono text-[0.7rem] leading-snug tracking-[0.08em] uppercase",
          railText,
        )}
      >
        <span
          aria-hidden="true"
          className={cn("mt-[0.45rem] w-6 shrink-0 border-t-2", railLine)}
        />
        {rail.label}
      </p>
    </div>
  );
}
