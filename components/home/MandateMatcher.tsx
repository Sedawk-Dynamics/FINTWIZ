"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Check, RotateCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BrandDiamond } from "@/components/brand/Motif";
import { managers, type PortfolioManager } from "@/lib/managers";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

type AxisKey = "cap" | "construction" | "volatility";

type Option<T extends string> = { value: T; label: string; hint?: string };

const CAP_OPTIONS: Option<"any" | "large" | "broad">[] = [
  { value: "any", label: "No preference" },
  {
    value: "large",
    label: "Large cap led",
    hint: "Bigger, more liquid companies",
  },
  {
    value: "broad",
    label: "Across market caps",
    hint: "Mid and small included",
  },
];

const CONSTRUCTION_OPTIONS: Option<"any" | "Concentrated" | "Diversified">[] = [
  { value: "any", label: "No preference" },
  {
    value: "Concentrated",
    label: "Concentrated",
    hint: "Fewer, larger positions",
  },
  { value: "Diversified", label: "Diversified", hint: "Spread more widely" },
];

const VOLATILITY_OPTIONS: Option<"any" | "Balanced" | "Aggressive">[] = [
  { value: "any", label: "No preference" },
  { value: "Balanced", label: "Moderate", hint: "Index-like swings" },
  { value: "Aggressive", label: "High", hint: "Deeper drawdowns possible" },
];

type Mandate = {
  cap: (typeof CAP_OPTIONS)[number]["value"];
  construction: (typeof CONSTRUCTION_OPTIONS)[number]["value"];
  volatility: (typeof VOLATILITY_OPTIONS)[number]["value"];
};

const DEFAULT_MANDATE: Mandate = {
  cap: "any",
  construction: "any",
  volatility: "any",
};

function capOf(manager: PortfolioManager): "large" | "broad" {
  return manager.category === "Large Cap" ? "large" : "broad";
}

/** Returns the criterion a manager fails, or null when it fits. */
function exclusionReason(
  manager: PortfolioManager,
  mandate: Mandate,
): string | null {
  if (mandate.cap !== "any" && capOf(manager) !== mandate.cap) {
    return mandate.cap === "large"
      ? "Invests beyond large caps"
      : "Stays in large caps";
  }
  if (
    mandate.construction !== "any" &&
    manager.construction !== mandate.construction
  ) {
    return manager.construction === "Concentrated"
      ? "Runs a more concentrated book"
      : "Runs a more diversified book";
  }
  if (mandate.volatility !== "any" && manager.risk !== mandate.volatility) {
    return manager.risk === "Aggressive"
      ? "Carries a higher volatility band"
      : "Carries a lower volatility band";
  }
  return null;
}

export function MandateMatcher() {
  const [mandate, setMandate] = React.useState<Mandate>(DEFAULT_MANDATE);

  const evaluated = React.useMemo(
    () =>
      managers.map((manager) => ({
        manager,
        reason: exclusionReason(manager, mandate),
      })),
    [mandate],
  );

  const fitting = evaluated.filter((e) => e.reason === null);
  const isDefault =
    mandate.cap === "any" &&
    mandate.construction === "any" &&
    mandate.volatility === "any";

  const set = <K extends AxisKey>(key: K, value: Mandate[K]) =>
    setMandate((m) => ({ ...m, [key]: value }));

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
      {/* Controls. Both panels stretch to the row height; the profile block is
          pinned to the bottom so the two columns always end level. */}
      <div className="flex flex-col gap-8 rounded-md border border-field-border bg-white/[0.02] p-5 md:p-7">
        <div>
          <Axis
            label="Market cap exposure"
            index="01"
            options={CAP_OPTIONS}
            value={mandate.cap}
            onChange={(v) => set("cap", v)}
          />
          <Axis
            label="Portfolio construction"
            index="02"
            options={CONSTRUCTION_OPTIONS}
            value={mandate.construction}
            onChange={(v) => set("construction", v)}
          />
          <Axis
            label="Volatility you can sit through"
            index="03"
            options={VOLATILITY_OPTIONS}
            value={mandate.volatility}
            onChange={(v) => set("volatility", v)}
          />
        </div>

        <div className="border-t border-field-border pt-6 lg:mt-auto">
          <MandateProfile mandate={mandate} />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[0.66rem] tracking-[0.1em] text-field-muted uppercase">
              Same scale as each manager card
            </p>
            <button
              type="button"
              onClick={() => setMandate(DEFAULT_MANDATE)}
              disabled={isDefault}
              className={cn(
                "inline-flex items-center gap-2 rounded-md border border-field-border px-3 py-1.5",
                "font-mono text-[0.7rem] tracking-[0.08em] text-field-muted uppercase",
                "transition-colors duration-200 enabled:hover:border-field-foreground enabled:hover:text-field-foreground",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                "disabled:cursor-default disabled:opacity-40",
              )}
            >
              <RotateCcw aria-hidden="true" className="size-3" />
              Reset mandate
            </button>
          </div>
        </div>
      </div>

      {/* Result */}
      <div className="flex flex-col rounded-md border border-field-border bg-white/[0.02] p-5 md:p-7">
        <div className="flex items-baseline justify-between gap-4 border-b border-field-border pb-4">
          <p
            aria-live="polite"
            className="font-mono text-[0.72rem] tracking-[0.1em] text-field-muted uppercase tnum"
          >
            {fitting.length} of {managers.length} empanelled{" "}
            {fitting.length === 1 ? "manager fits" : "managers fit"}
          </p>
          <BrandDiamond size={11} className="shrink-0 text-gold-bright/60" />
        </div>

        <ul className="mt-2">
          {evaluated.map(({ manager, reason }) => (
            // Exclusion is shown with colour, a strike-through and the X mark,
            // never by fading the row: the reason line is the information this
            // tool exists to give, so it has to stay readable.
            <li
              key={manager.id}
              className="border-b border-field-border last:border-b-0"
            >
              <div className="flex items-start gap-4 py-4">
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-sm border",
                    reason
                      ? "border-field-border text-field-muted"
                      : "border-azure-logo/60 bg-azure-logo/10 text-azure-logo",
                  )}
                >
                  {reason ? (
                    <X className="size-3" />
                  ) : (
                    <Check className="size-3" />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p
                      className={cn(
                        "text-[0.95rem] font-medium transition-colors duration-300",
                        reason
                          ? "text-field-muted line-through decoration-field-border"
                          : "text-field-foreground",
                      )}
                    >
                      {manager.house}
                    </p>
                    <p className="font-mono text-[0.68rem] tracking-[0.06em] text-field-muted tnum">
                      {manager.serial}
                    </p>
                  </div>
                  <p className="mt-0.5 text-[0.82rem] text-field-muted">
                    {manager.strategy}
                  </p>
                  <p
                    className={cn(
                      "mt-2 text-[0.78rem] leading-snug",
                      reason ? "text-field-muted" : "text-azure-logo",
                    )}
                  >
                    {reason
                      ? `Excluded: ${reason.toLowerCase()}`
                      : "Fits this mandate"}
                  </p>
                </div>

                <span className="hidden shrink-0 font-mono text-[0.66rem] tracking-[0.08em] text-field-muted uppercase sm:block">
                  {manager.category}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {fitting.length === 0 ? (
          <div className="mt-4 rounded-md border border-gold-bright/40 bg-white/[0.03] p-5">
            <p className="text-[0.875rem] leading-[1.7] text-field-foreground">
              Nothing on the roster fits that combination.
            </p>
            <p className="mt-2 text-[0.82rem] leading-[1.7] text-field-muted">
              That is a useful answer rather than a dead end. It usually means
              either the roster needs widening, or PMS is not the right
              instrument for this mandate. Either way we would tell you so
              rather than bend a manager to fit.
            </p>
          </div>
        ) : null}

        <div className="mt-8 lg:mt-auto lg:pt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button asChild variant="field">
              <Link href="/contact#enquiry">
                Get this shortlist properly
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="fieldOutline">
              <Link href="/portfolio-managers">See full detail</Link>
            </Button>
          </div>

          <p className="mt-6 border-t border-field-border pt-5 text-[0.75rem] leading-[1.7] text-field-muted">
            This filters our empanelled roster against criteria you choose. It
            is not investment advice, not a recommendation, and it uses no
            performance data. Construction and volatility bands describe how
            each strategy is built, drawn from the manager&apos;s own stated
            approach. A real shortlist from {site.brand} comes with the written
            reasoning for every inclusion and every exclusion.
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * The mandate you have set, drawn on the same three-step scale as the glyph on
 * each manager card, so the two can be compared at a glance. "Any" is shown as
 * an empty dashed track rather than a guessed level.
 */
function MandateProfile({ mandate }: { mandate: Mandate }) {
  const rows = [
    {
      label: "Cap breadth",
      level: mandate.cap === "any" ? null : mandate.cap === "large" ? 1 : 3,
    },
    {
      label: "Concentration",
      level:
        mandate.construction === "any"
          ? null
          : mandate.construction === "Concentrated"
            ? 3
            : 1,
    },
    {
      label: "Volatility",
      level:
        mandate.volatility === "any"
          ? null
          : mandate.volatility === "Aggressive"
            ? 3
            : 2,
    },
  ];

  return (
    <div>
      <p className="font-mono text-[0.66rem] tracking-[0.12em] text-gold-bright uppercase">
        Your mandate profile
      </p>
      <dl className="mt-4 space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="grid grid-cols-[6.5rem_1fr_auto] items-center gap-3 sm:grid-cols-[8rem_1fr_auto]"
          >
            <dt className="text-[0.8rem] text-field-muted">{row.label}</dt>
            <dd aria-hidden="true" className="flex gap-1">
              {[1, 2, 3].map((step) => (
                <span
                  key={step}
                  className={cn(
                    "h-1.5 flex-1 rounded-[1px] transition-colors duration-300",
                    row.level === null
                      ? "border border-dashed border-field-border"
                      : step <= row.level
                        ? "bg-gold-logo"
                        : "bg-white/10",
                  )}
                />
              ))}
            </dd>
            <dd className="w-12 text-right font-mono text-[0.66rem] tracking-[0.08em] text-field-muted uppercase tnum">
              {row.level === null ? "Any" : `${row.level} of 3`}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function Axis<T extends string>({
  label,
  index,
  options,
  value,
  onChange,
}: {
  label: string;
  index: string;
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <fieldset className="border-t border-field-border pt-6 first:border-t-0 first:pt-0 [&+fieldset]:mt-8">
      <legend className="sr-only">{label}</legend>
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[0.68rem] tracking-[0.14em] text-gold-bright tnum">
          {index}
        </span>
        <p className="text-[0.95rem] font-medium text-field-foreground">
          {label}
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={selected}
              className={cn(
                "group rounded-md border px-3.5 py-2 text-left transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                selected
                  ? "border-azure-logo bg-azure-logo/12 text-field-foreground"
                  : "border-field-border text-field-muted hover:border-field-foreground/50 hover:text-field-foreground",
              )}
            >
              <span className="block text-[0.85rem]">{option.label}</span>
              {option.hint ? (
                <span className="mt-0.5 block text-[0.7rem]">
                  {option.hint}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
