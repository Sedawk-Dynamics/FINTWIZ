import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading, DisclosureNote } from "@/components/shared/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { SampleTag } from "@/components/shared/SampleTag";
import { ManagerCard } from "@/components/managers/ManagerCard";
import { Button } from "@/components/ui/button";
import { managers } from "@/lib/managers";
import { inlineDisclosures, sampleRosterNote } from "@/lib/compliance";

/** Strategy categories on the roster, in the order they first appear. */
const categoryCounts = Array.from(
  managers.reduce(
    (acc, m) => acc.set(m.category, (acc.get(m.category) ?? 0) + 1),
    new Map<string, number>(),
  ),
);

export function ManagerPreview() {
  return (
    <section className="bg-secondary">
      <div className="container-page section-y">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Portfolio managers"
            eyebrowTag="Sample"
            index="04"
            title="Their strategies, their disclosures, their numbers."
            lead={`Every entry links to that manager's own SEBI-format disclosure document. Inclusion here is not a recommendation, and the order is not a ranking. ${sampleRosterNote}`}
            maxWidth="max-w-none"
            className="min-w-0 flex-1 basis-[28rem]"
          />
          <Reveal className="hidden lg:block">
            <Button asChild variant="outline">
              <Link href="/portfolio-managers">
                See the full roster
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          </Reveal>
        </div>

        {/* The cards are labelled as a set, not card by card: one marker above
            the grid reads as a deliberate qualification, five repeated chips
            read as decoration. */}
        <Reveal className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-b border-border pb-3">
            <div className="flex items-center gap-3">
              <SampleTag />
              <p className="font-mono text-[0.7rem] tracking-[0.1em] text-slate uppercase">
                Sample roster
              </p>
            </div>
            <p className="font-mono text-[0.7rem] tracking-[0.1em] text-slate uppercase tnum">
              {String(managers.length).padStart(2, "0")} managers shown
            </p>
          </div>
        </Reveal>

        {/*
          Five across from xl, which is the layout the client signed off. Below
          that the roster tile is the sixth cell so two and three column rows
          also come out even; at xl the five cards already fill the row, so the
          tile is hidden there and the header button carries the same link.
        */}
        <RevealGroup className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {managers.map((manager) => (
            <RevealItem key={manager.id} className="h-full">
              <ManagerCard manager={manager} />
            </RevealItem>
          ))}

          <RevealItem className="h-full xl:hidden">
            <Link
              href="/portfolio-managers"
              className="group flex h-full flex-col justify-between rounded-md border border-dashed border-border-strong bg-card/40 p-6 transition-colors duration-300 hover:border-azure hover:bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:p-7"
            >
              <div>
                <span className="font-mono text-[0.66rem] tracking-[0.14em] text-gold-deep uppercase">
                  The full roster
                </span>
                <h3 className="mt-5 text-[1.2rem] leading-tight text-ink">
                  Compare all {managers.length} side by side.
                </h3>
                <p className="mt-4 text-[0.875rem] leading-[1.7] text-slate">
                  Filter the roster by strategy category, switch to the
                  comparison table, and open each manager&apos;s own disclosure
                  document from one place.
                </p>

                {/* The category split, so the tile carries information rather
                    than a headline over a block of empty card. */}
                <dl className="mt-6 border-t border-border pt-4">
                  {categoryCounts.map(([category, count]) => (
                    <div
                      key={category}
                      className="flex items-center justify-between gap-4 border-b border-border/70 py-2 last:border-b-0"
                    >
                      <dt className="text-[0.82rem] text-slate">{category}</dt>
                      <dd className="font-mono text-[0.72rem] text-ink tnum">
                        {String(count).padStart(2, "0")}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
              <span className="mt-8 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-azure-bright">
                See the full roster
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </span>
            </Link>
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-8">
          <DisclosureNote>{inlineDisclosures.roster}</DisclosureNote>
        </Reveal>
      </div>
    </section>
  );
}
