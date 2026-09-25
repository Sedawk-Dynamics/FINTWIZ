import Image from "next/image";
import { FileCheck, ListFilter, ScrollText } from "lucide-react";
import { photography } from "@/lib/media";
import { PageHero } from "@/components/shared/PageHero";
import { HeroFacts } from "@/components/shared/HeroFacts";
import { SectionHeading, DisclosureNote } from "@/components/shared/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { RosterExplorer } from "@/components/managers/RosterExplorer";
import { CtaBand } from "@/components/shared/CtaBand";
import { ShortlistFunnel } from "@/components/visuals/CtaVisuals";
import { pageMetadata } from "@/lib/seo";
import { managers } from "@/lib/managers";
import { site } from "@/lib/site";
import { inlineDisclosures, sampleRosterNote } from "@/lib/compliance";

export const metadata = pageMetadata({
  title: "Our Portfolio Managers",
  description:
    "The SEBI-registered portfolio managers shown on the Fintwiz Wealth roster, with each manager's strategy, category, registration number and a link to their own SEBI-format disclosure document.",
  path: "/portfolio-managers",
  keywords: [
    "empanelled portfolio managers",
    "SEBI registered portfolio manager list",
    "PMS strategies India",
    "PMS disclosure document",
  ],
});

const principles = [
  {
    icon: ListFilter,
    title: "Order is not ranking",
    body: "The roster is listed in no order of merit. We do not rank managers, because a ranking implies a recommendation and that is not a service we are registered to provide.",
  },
  {
    icon: ScrollText,
    title: "Primary sources only",
    body: "Every entry links to the manager's own SEBI-format disclosure document. Read that rather than our summary, and raise anything that does not match with us.",
  },
  {
    icon: FileCheck,
    title: "No figures of ours",
    body: "We publish no returns. Where a manager has disclosed a figure, it appears with the date it was disclosed and a link to the document it came from, or it does not appear at all.",
  },
] as const;

const rosterCategories = Array.from(new Set(managers.map((m) => m.category)));

export default function PortfolioManagersPage() {
  return (
    <>
      <PageHero
        eyebrow="The roster"
        eyebrowTag="Sample"
        title="Empanelled managers, and the documents behind them."
        lead={`${managers.length} SEBI-registered portfolio managers are shown on the ${site.brand} roster. ${sampleRosterNote} Compare them on strategy and mandate, then read each manager's own disclosure document before you decide.`}
        crumb={{ name: "Portfolio Managers", path: "/portfolio-managers" }}
        aside={
          <HeroFacts
            title="Roster at a glance"
            tag="Sample"
            facts={[
              { term: "Managers shown", value: String(managers.length), note: "Listed in no order of merit" },
              { term: "Strategy categories", value: String(rosterCategories.length), note: rosterCategories.join(", ") },
              { term: "Each manager registered with", value: "SEBI", note: "Number shown on every entry" },
              { term: "Figures written by us", value: "None", note: "Manager-disclosed only" },
            ]}
          />
        }
      />

      <section className="bg-background">
        <div className="container-page section-y">
          <RosterExplorer />

          <Reveal className="mt-10">
            <DisclosureNote>{inlineDisclosures.roster}</DisclosureNote>
          </Reveal>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-secondary">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] lg:block"
        >
          <Image
            src={photography.centralBank.src}
            alt=""
            fill
            sizes="38vw"
            className="object-cover object-center opacity-[0.13]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/55 to-transparent" />
        </div>

        <div className="container-page relative section-y">
          <SectionHeading
            eyebrow="How to read this page"
            title="Three rules we hold ourselves to here."
            lead="A distributor's roster page is where conflicts of interest usually hide. These are the constraints we have put on ours."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
            {principles.map((principle) => {
              const Icon = principle.icon;
              return (
                <RevealItem
                  key={principle.title}
                  as="article"
                  className="bg-card p-7 md:p-8"
                >
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 items-center justify-center rounded-md border border-border text-azure-bright"
                  >
                    <Icon className="size-[1.1rem]" />
                  </span>
                  <h3 className="mt-6 text-[1.05rem] text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-[1.72] text-slate">
                    {principle.body}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <CtaBand
        eyebrow="Narrowing it down"
        title="A whole roster is still not a shortlist."
        lead="Tell us the mandate and we will come back with two or three that fit it, along with the written reasoning for every manager we left out."
        primaryLabel="Request a shortlist"
        primaryHref="/contact#enquiry"
        secondaryLabel="See how we shortlist"
        secondaryHref="/how-it-works"
        aside={<ShortlistFunnel />}
      />
    </>
  );
}
