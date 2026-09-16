import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { heroStats } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Four figures, none of them ours to claim. Two are regulatory facts, one is
 * a statement about sourcing, and one is a count of something we deliberately
 * do not do.
 */
export function StatBar() {
  return (
    <section
      aria-label="Regulatory standing at a glance"
      className="border-b border-border bg-card"
    >
      <RevealGroup className="container-page grid grid-cols-2 lg:grid-cols-4">
        {heroStats.map((stat, index) => (
          <RevealItem
            key={stat.label}
            className={cn(
              "flex flex-col gap-2 px-1 py-8 md:px-6 md:py-10",
              "border-border",
              index % 2 === 0 ? "border-r lg:border-r" : "",
              index < 2 ? "border-b lg:border-b-0" : "",
              index === 1 ? "lg:border-r" : "",
              index === 2 ? "lg:border-r" : "",
              index === 3 ? "border-r-0" : "",
            )}
          >
            <p
              className={cn(
                "text-ink",
                stat.mono
                  ? "font-mono text-[1.15rem] tracking-[0.01em] tnum md:text-[1.3rem]"
                  : "font-display text-[1.6rem] font-medium md:text-[1.9rem]",
              )}
            >
              {stat.value}
            </p>
            <p className="text-[0.8rem] leading-[1.6] text-slate">
              {stat.label}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
