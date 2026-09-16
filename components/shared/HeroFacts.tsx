import { cn } from "@/lib/utils";

export type HeroFact = {
  term: string;
  value: string;
  note?: string;
};

/**
 * A short panel of facts for the right-hand side of an inner-page hero.
 *
 * Every fact here should be checkable: a registration, a count taken from the
 * data, a date. It exists so the hero is not a headline beside half a screen
 * of empty field, not to add claims.
 */
export function HeroFacts({
  title,
  tag,
  facts,
  footer,
  className,
}: {
  title?: string;
  tag?: string;
  facts: readonly HeroFact[];
  footer?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-field-border bg-field/70 backdrop-blur-[2px]",
        className,
      )}
    >
      {title ? (
        <div className="flex items-center justify-between gap-4 border-b border-field-border px-6 py-4">
          <p className="text-[0.875rem] font-medium text-field-foreground">{title}</p>
          {tag ? (
            <span className="rounded-sm border border-field-border px-2 py-0.5 font-mono text-[0.62rem] tracking-[0.14em] text-field-muted uppercase">
              {tag}
            </span>
          ) : null}
        </div>
      ) : null}

      <dl className="px-6 py-2">
        {facts.map((fact, index) => (
          <div
            key={fact.term}
            className={cn(
              "flex items-baseline justify-between gap-6 py-3",
              index < facts.length - 1 && "border-b border-field-border",
            )}
          >
            <dt className="text-[0.8125rem] text-field-muted">{fact.term}</dt>
            <dd className="min-w-0 text-right">
              <span className="block text-[0.9rem] font-medium [overflow-wrap:anywhere] text-field-foreground">
                {fact.value}
              </span>
              {fact.note ? (
                <span className="mt-0.5 block font-mono text-[0.66rem] [overflow-wrap:anywhere] text-field-muted tnum">
                  {fact.note}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>

      {footer ? (
        <p className="border-t border-field-border px-6 py-3.5 text-[0.78rem] leading-relaxed text-field-muted">
          {footer}
        </p>
      ) : null}
    </div>
  );
}
