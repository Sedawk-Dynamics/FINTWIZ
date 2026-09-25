"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, LayoutGrid, Rows3 } from "lucide-react";
import { SampleTag } from "@/components/shared/SampleTag";
import { BrandDiamond } from "@/components/brand/Motif";
import { ManagerCard } from "./ManagerCard";
import { managers, activeCategories, type StrategyCategory } from "@/lib/managers";
import { cn } from "@/lib/utils";

type Category = "All" | StrategyCategory;
type View = "cards" | "table";

/**
 * Roster with category filtering and a comparison view.
 *
 * The table exists because this is a comparison decision and a card grid is a
 * poor comparison surface. Neither view sorts by anything that could be read
 * as a ranking: the order is the listing order in lib/managers.ts.
 */
export function RosterExplorer() {
  const [category, setCategory] = React.useState<Category>("All");
  const [view, setView] = React.useState<View>("cards");
  const reduced = useReducedMotion();

  const filtered = React.useMemo(
    () =>
      category === "All"
        ? managers
        : managers.filter((m) => m.category === category),
    [category],
  );

  return (
    <div>
      <div className="flex flex-col gap-5 border-b border-border pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter by strategy category"
          className="flex flex-wrap gap-2"
        >
          {activeCategories.map((option) => {
            const selected = option === category;
            return (
              <button
                key={option}
                type="button"
                onClick={() => setCategory(option)}
                aria-pressed={selected}
                className={cn(
                  "rounded-sm border px-3 py-1.5 text-[0.8125rem] transition-colors duration-200",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
                  selected
                    ? "border-ink bg-ink text-background"
                    : "border-border text-slate hover:border-border-strong hover:text-ink",
                )}
              >
                {option}
                <span className="ml-2 font-mono text-[0.68rem] tnum">
                  {option === "All"
                    ? managers.length
                    : managers.filter((m) => m.category === option).length}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="group"
          aria-label="Change layout"
          className="flex shrink-0 gap-1 self-start rounded-sm border border-border p-1"
        >
          <ViewButton
            active={view === "cards"}
            onClick={() => setView("cards")}
            icon={LayoutGrid}
            label="Cards"
          />
          <ViewButton
            active={view === "table"}
            onClick={() => setView("table")}
            icon={Rows3}
            label="Compare"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2">
        <SampleTag />
        <p
          aria-live="polite"
          className="font-mono text-[0.72rem] tracking-[0.06em] text-slate uppercase tnum"
        >
          Showing {filtered.length} of {managers.length}{" "}
          {managers.length === 1 ? "manager" : "managers"}
        </p>
      </div>

      {/*
        Deliberately not wrapped in AnimatePresence. An exit animation would
        gate the new view on the old one finishing, and if that exit never
        resolves the toggle silently stops working. Changing the key remounts
        the block instead, so the content swap is immediate and the fade is
        only ever decorative.
      */}
      <motion.div
        key={`${view}-${category}`}
        data-reveal=""
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6"
      >
        {view === "cards" ? (
          // The closing tile is part of the grid rather than a band below it,
          // so the last row is never left with a dead cell beside the cards.
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((manager) => (
              <ManagerCard key={manager.id} manager={manager} />
            ))}
            <ShortlistTile />
          </div>
        ) : (
          <ComparisonTable rows={filtered} />
        )}
      </motion.div>
    </div>
  );
}

/** The criteria a shortlist request is filtered on, matching the home matcher. */
const SHORTLIST_AXES = [
  "Market cap exposure",
  "Portfolio construction",
  "Volatility band",
] as const;

/** Closing cell of the card grid: the next step, and it fills the last row. */
function ShortlistTile() {
  return (
    <Link
      href="/contact#enquiry"
      className={cn(
        "group flex h-full flex-col justify-between rounded-md border border-dashed border-border-strong bg-card/40 p-6 md:p-7",
        "transition-colors duration-300 hover:border-azure hover:bg-card",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
      )}
    >
      <div>
        <span className="font-mono text-[0.66rem] tracking-[0.14em] text-gold-deep uppercase">
          Next step
        </span>
        <h3 className="mt-5 text-[1.2rem] leading-tight text-ink">
          Too many to choose from?
        </h3>
        <p className="mt-4 text-[0.875rem] leading-[1.7] text-slate">
          Tell us the mandate and we will come back with two or three that fit
          it, with the written reasoning for every manager we left out.
        </p>

        {/* The three axes we actually filter on, so the tile states the method
            instead of leaving a headline above an empty card. */}
        <ul className="mt-6 border-t border-border pt-4">
          {SHORTLIST_AXES.map((axis) => (
            <li
              key={axis}
              className="flex items-center gap-2.5 border-b border-border/70 py-2 text-[0.82rem] text-slate last:border-b-0"
            >
              <BrandDiamond size={9} className="shrink-0 text-gold-deep" />
              {axis}
            </li>
          ))}
        </ul>
      </div>
      <span className="mt-8 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-azure-bright">
        Request a shortlist
        <ArrowRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}

function ViewButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof LayoutGrid;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex items-center gap-2 rounded-[2px] px-3 py-1.5 text-[0.8125rem] transition-colors duration-200",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        active ? "bg-secondary text-ink" : "text-slate hover:text-ink",
      )}
    >
      <Icon aria-hidden="true" className="size-3.5" />
      {label}
    </button>
  );
}

function ComparisonTable({ rows }: { rows: typeof managers }) {
  return (
    <div className="overflow-x-auto rounded-md border border-border">
      <table className="w-full min-w-[52rem] border-collapse text-left">
        <caption className="sr-only">
          Empanelled portfolio managers compared by strategy, category, risk
          band and SEBI registration number.
        </caption>
        <thead>
          <tr className="border-b border-border bg-secondary">
            {["Manager", "Strategy", "Category", "Risk band", "SEBI registration", "Disclosure"].map(
              (heading) => (
                <th
                  key={heading}
                  scope="col"
                  className="px-5 py-3.5 font-mono text-[0.66rem] tracking-[0.12em] text-slate uppercase"
                >
                  {heading}
                </th>
              ),
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((manager) => (
            <tr
              key={manager.id}
              className="border-b border-border bg-card transition-colors duration-200 last:border-b-0 hover:bg-secondary"
            >
              <th
                scope="row"
                className="px-5 py-4 text-[0.9rem] font-medium text-ink"
              >
                {manager.house}
              </th>
              <td className="px-5 py-4 text-[0.85rem] text-slate">
                {manager.strategy}
              </td>
              <td className="px-5 py-4 text-[0.85rem] text-slate">
                {manager.category}
              </td>
              <td className="px-5 py-4 text-[0.85rem] text-slate">
                {manager.risk}
              </td>
              <td className="px-5 py-4 font-mono text-[0.78rem] text-slate tnum">
                {manager.sebiRegNo}
              </td>
              <td className="px-5 py-4">
                <a
                  href={manager.disclosureUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-1 text-[0.82rem] text-azure-bright"
                >
                  Document
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  <span className="sr-only"> for {manager.house}, opens in a new tab</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
