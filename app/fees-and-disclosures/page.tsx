import { AlertTriangle, Scale } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading, DisclosureNote, RegBadge } from "@/components/shared/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { FeeFlow } from "@/components/visuals/FeeFlow";
import { CtaBand } from "@/components/shared/CtaBand";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import {
  disclaimerSections,
  inlineDisclosures,
  standardRiskLine,
} from "@/lib/compliance";
import { costsOverview } from "@/lib/content/pms";

export const metadata = pageMetadata({
  title: "Fees & Disclosures",
  description:
    "How Fintwiz Wealth is compensated, the conflicts of interest that creates, what the portfolio manager charges you, and the full seven-section PMS distributor disclosure.",
  path: "/fees-and-disclosures",
  keywords: [
    "PMS distributor commission",
    "PMS fees",
    "conflict of interest disclosure",
    "PMS risk factors",
  ],
});

export default function FeesAndDisclosuresPage() {
  return (
    <>
      <PageHero
        eyebrow="Fees and disclosures"
        title="How we are paid, and what that should make you watch for."
        lead="A distributor's incentives are the most useful thing you can know about them. Ours are set out here in full, including the parts that do not flatter us."
        crumb={{ name: "Fees & Disclosures", path: "/fees-and-disclosures" }}
        aside={
          <div className="rounded-md border border-field-border bg-white/[0.03] p-6">
            <p className="eyebrow text-brass-bright">In one line</p>
            <p className="mt-4 text-[0.95rem] leading-[1.72] text-field-foreground">
              You pay the portfolio manager. The portfolio manager pays us. You
              are never billed by {site.brand} for the distribution service.
            </p>
            <div className="mt-6">
              <RegBadge
                onField
                label={site.registration.authority}
                value={site.registration.number}
              />
            </div>
          </div>
        }
      />

      {/* Money flow */}
      <section className="bg-background">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="The flow of money"
            title="Three parties, two payments, one that never happens."
          />
          <Reveal className="mt-12 rounded-md border border-border bg-card p-6 md:p-10">
            <FeeFlow />
          </Reveal>
        </div>
      </section>

      {/* Conflict of interest */}
      <section className="bg-secondary">
        <div className="container-page section-y">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Conflict of interest"
                title="Commission differs by manager. That is a problem, and here is how we handle it."
                maxWidth="max-w-none"
              />
              <Reveal delay={0.08} className="mt-7 space-y-5">
                <p className="max-w-[60ch] text-[1rem] leading-[1.78] text-slate">
                  A distributor paid more by one portfolio manager than another
                  has a financial incentive to steer you toward the one that
                  pays better. Every distributor has this conflict. Most describe
                  it away in a footer.
                </p>
                <p className="max-w-[60ch] text-[1rem] leading-[1.78] text-slate">
                  We manage it with two commitments. First, the written
                  reasoning for every manager we include in a shortlist, and
                  every manager we leave out, is given to you as part of the
                  shortlist. Second, the commission band applying to each
                  shortlisted manager is disclosed to you in writing before you
                  sign anything.
                </p>
                <p className="max-w-[60ch] text-[1rem] leading-[1.78] text-slate">
                  You are entitled to ask for both at any point, and to ask why
                  a better-paying manager was or was not on your list.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="rounded-md border border-brass/35 bg-card p-7 md:p-8">
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 items-center justify-center rounded-md border border-brass/45 text-brass-deep"
                >
                  <Scale className="size-[1.1rem]" />
                </span>
                <h3 className="mt-6 text-[1.15rem] text-ink">
                  Commission bands
                </h3>
                <p className="mt-3 text-[0.9rem] leading-[1.72] text-slate">
                  The actual band applying to each empanelled manager is being
                  finalised and will be published here in full.
                </p>
                <div className="mt-6 flex items-start gap-3 rounded-md border border-border bg-muted/70 p-4">
                  <AlertTriangle
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-brass-deep"
                  />
                  <p className="text-[0.8125rem] leading-[1.65] text-slate">
                    Until this table is published, ask us for the commission
                    band in writing before you sign. We will provide it, and you
                    should not proceed with any distributor who will not.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What the manager charges */}
      <section className="bg-background">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="What you do pay"
            title="The portfolio manager's charges, levied inside your account."
            lead="These are set by the manager, disclosed in their SEBI-format document, and deducted from your account. We do not set them and we do not receive them."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {costsOverview.map((cost) => (
              <RevealItem key={cost.label} className="bg-card p-7">
                <h3 className="text-[1rem] text-ink">{cost.label}</h3>
                <p className="mt-2.5 text-[0.86rem] leading-[1.7] text-slate">
                  {cost.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-8">
            <DisclosureNote>{inlineDisclosures.fees}</DisclosureNote>
          </Reveal>
        </div>
      </section>

      {/* Full disclaimer */}
      <section id="disclaimer" className="bg-field text-field-foreground">
        <div className="container-page section-y">
          <SectionHeading
            onField
            eyebrow="Full disclosure"
            title="The complete PMS distributor disclosure."
            lead="Seven sections covering our role, the limits of what we do, how we are paid, the source of every figure, the risks involved, suitability, and how to complain."
          />

          <Reveal className="mt-12">
            <Accordion
              type="multiple"
              className="border-t border-field-border"
            >
              {disclaimerSections.map((section) => (
                <AccordionItem
                  key={section.id}
                  value={section.id}
                  id={section.id}
                  className="border-b border-field-border"
                >
                  <AccordionTrigger className="text-field-foreground hover:text-brass-bright">
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[0.72rem] text-brass-bright tnum">
                        {section.number}
                      </span>
                      <span>{section.title}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-field-muted">
                    <div className="space-y-4">
                      {section.body.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 32)}
                          className="text-[0.9rem] leading-[1.75]"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal className="mt-10">
            <div className="rounded-md border border-field-border bg-white/[0.025] p-6 md:p-7">
              <p className="eyebrow text-brass-bright">Standard risk warning</p>
              <p className="mt-4 max-w-[88ch] font-mono text-[0.8rem] leading-[1.8] text-field-muted">
                {standardRiskLine}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Still reading"
        title="Ask us the uncomfortable question."
        lead="Which manager on the roster pays us the most, and why are they or are they not on your shortlist. It is a fair question and you will get a straight answer."
        primaryLabel="Ask us directly"
        primaryHref="/contact"
        secondaryLabel="See the roster"
        secondaryHref="/portfolio-managers"
      />
    </>
  );
}
