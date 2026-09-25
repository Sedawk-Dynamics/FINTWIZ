import { ArrowUpRight } from "lucide-react";
import type { PortfolioManager } from "@/lib/managers";
import { MandateGlyph } from "./MandateGlyph";
import { cn } from "@/lib/utils";

/**
 * A manager entry. Note what is deliberately absent: any performance number
 * authored by us. `disclosedFigures` is the only channel through which a figure
 * can reach this card, and the type requires a date and a source for each one.
 */
export function ManagerCard({
  manager,
  className,
}: {
  manager: PortfolioManager;
  className?: string;
}) {
  return (
    <article
      className={cn(
        // `relative` and the top margin exist for the NEW marker, which sits
        // on the top border rather than inside the card so it does not push
        // the serial row down on the cards that do not carry one.
        // Tighter padding at xl: that is where five cards share one row and
        // every pixel of content width matters.
        "group relative flex h-full flex-col rounded-md border bg-card p-6 md:p-7 xl:p-5 2xl:p-6",
        "transition-[border-color,box-shadow,transform] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:shadow-lift",
        manager.isNew
          ? "mt-2 border-gold/60 hover:border-gold"
          : "border-border hover:border-border-strong",
        className,
      )}
    >
      {/* The long form is a sibling, not a child of the chip: nesting it made
          the chip's text content far wider than the chip itself, which reads
          as an overflow to any layout check measuring the two against each
          other. The chip shows the short word and is hidden from the tree. */}
      {manager.isNew ? (
        <>
          <span
            aria-hidden="true"
            className="absolute -top-2 left-5 rounded-sm border border-gold/60 bg-gold-chip px-2 py-0.5 font-mono text-[0.6rem] font-medium tracking-[0.16em] text-gold-deep uppercase"
          >
            New
          </span>
          <span className="sr-only">Recently added to the roster.</span>
        </>
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <span className="font-mono text-[0.66rem] tracking-[0.14em] text-gold-deep uppercase tnum">
          {manager.serial}
        </span>
        <span className="rounded-sm border border-border px-2 py-0.5 font-mono text-[0.64rem] tracking-[0.08em] text-slate uppercase">
          {manager.category}
        </span>
      </div>

      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="text-[1.2rem] leading-tight text-ink">
            {manager.house}
          </h3>
          <p className="mt-1.5 text-[0.875rem] text-gold-deep">
            {manager.strategy}
          </p>
        </div>
        <MandateGlyph
          manager={manager}
          className="mt-0.5 text-azure transition-opacity duration-300 group-hover:opacity-100 md:opacity-70"
        />
      </div>

      <p className="mt-4 text-[0.875rem] leading-[1.7] text-slate">
        {manager.summary}
      </p>

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {manager.attributes.map((attribute) => (
          <li
            key={attribute}
            className="rounded-sm bg-muted px-2.5 py-1 text-[0.72rem] text-slate"
          >
            {attribute}
          </li>
        ))}
      </ul>

      {manager.disclosedFigures.length > 0 ? (
        <dl className="mt-5 space-y-2 border-t border-border pt-4">
          {manager.disclosedFigures.map((figure) => (
            <div key={figure.label} className="flex items-baseline justify-between gap-4">
              <dt className="text-[0.78rem] text-slate">{figure.label}</dt>
              <dd className="text-right">
                <span className="font-mono text-[0.85rem] text-ink tnum">
                  {figure.value}
                </span>
                <span className="ml-2 font-mono text-[0.66rem] text-slate-light tnum">
                  as of {figure.asOf}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      ) : null}

      <div className="mt-auto pt-6">
        {/* The registration is one token and never breaks across lines: a
            half-wrapped SEBI number is unreadable and looks like a typo. When
            the card is too narrow for both, the risk band drops below it. */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-border pt-4">
          <span className="font-mono text-[0.7rem] whitespace-nowrap text-slate tnum">
            SEBI {manager.sebiRegNo}
          </span>
          <span className="font-mono text-[0.66rem] tracking-[0.08em] text-slate-light uppercase">
            {manager.risk}
          </span>
        </div>

        <a
          href={manager.disclosureUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "link-underline mt-4 inline-flex items-center gap-1.5",
            "text-[0.85rem] font-medium text-azure-bright",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          )}
        >
          Read the disclosure document
          <ArrowUpRight
            aria-hidden="true"
            className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
          <span className="sr-only">
            {" "}
            for {manager.house} {manager.strategy}, opens in a new tab
          </span>
        </a>
      </div>
    </article>
  );
}
