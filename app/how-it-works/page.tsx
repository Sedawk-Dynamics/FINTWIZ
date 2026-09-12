import Image from "next/image";
import { ClipboardList, FileSearch, Handshake, ShieldQuestion } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading, DisclosureNote } from "@/components/shared/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { ProcessTimeline } from "@/components/visuals/ProcessTimeline";
import { CtaBand } from "@/components/shared/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { roleStatement } from "@/lib/compliance";
import { photography } from "@/lib/media";

export const metadata = pageMetadata({
  title: "How It Works",
  description:
    "The five stages of a Fintwiz Wealth engagement, from mandate and risk profiling through shortlisting, disclosure review, onboarding with the portfolio manager, and ongoing reviews.",
  path: "/how-it-works",
  keywords: [
    "PMS onboarding process",
    "how to invest in PMS",
    "PMS account opening",
    "portfolio manager selection",
  ],
});

const documents = [
  {
    icon: ClipboardList,
    title: "KYC and PAN records",
    body: "Standard identity and address verification, plus PAN. If you are already KYC compliant, this is usually a confirmation rather than a fresh submission.",
  },
  {
    icon: FileSearch,
    title: "The manager's disclosure document",
    body: "The SEBI-format document for the manager you choose. Read it before signing. We will walk through the fee section and the risk factors line by line if that helps.",
  },
  {
    icon: Handshake,
    title: "The PMS agreement",
    body: "Signed directly between you and the portfolio manager. It sets the mandate, the fees, the reporting cadence and the exit terms. We are not a party to it.",
  },
  {
    icon: ShieldQuestion,
    title: "Demat and bank mapping",
    body: "The account is opened in your name. Funds move from your bank account to your PMS account, never through any account of ours.",
  },
] as const;

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="The engagement"
        title="Five stages, and the paperwork that goes with each."
        lead="Nothing here is proprietary. Publishing the process means you can hold us to it, and it means you can tell how far along you are without having to ask."
        crumb={{ name: "How It Works", path: "/how-it-works" }}
      />

      <section className="bg-background">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="Stage by stage"
            title="From a first conversation to a funded account."
            lead="Timings are typical rather than guaranteed. The onboarding stage depends on the portfolio manager's own operations team as much as on ours."
          />

          <ProcessTimeline />

          <Reveal className="mt-12">
            <DisclosureNote>{roleStatement}</DisclosureNote>
          </Reveal>
        </div>
      </section>

      <section className="bg-secondary">
        <div className="container-page section-y">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <figure className="overflow-hidden rounded-md border border-border">
                <Image
                  src={photography.financialDistrict.src}
                  alt={photography.financialDistrict.alt}
                  width={1920}
                  height={1440}
                  sizes="(min-width: 1024px) 46vw, 100vw"
                  className="h-full w-full object-cover"
                />
                <figcaption className="border-t border-border bg-card px-5 py-4 text-[0.78rem] leading-relaxed text-slate">
                  The Bandra Kurla Complex, Mumbai. Most of the portfolio
                  managers on our roster operate from here or from Nariman
                  Point.
                </figcaption>
              </figure>
            </Reveal>

            <div>
              <SectionHeading
                eyebrow="What you will sign"
                title="Four documents, none of them ours."
                lead="Every document in a PMS onboarding is between you and the portfolio manager. We prepare, chase and explain them. We are not a counterparty to any of them."
                maxWidth="max-w-none"
              />

              <RevealGroup className="mt-10 space-y-px overflow-hidden rounded-md border border-border bg-border">
                {documents.map((document) => {
                  const Icon = document.icon;
                  return (
                    <RevealItem
                      key={document.title}
                      as="article"
                      className="flex gap-4 bg-card p-6"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-border text-gold-deep"
                      >
                        <Icon className="size-4" />
                      </span>
                      <div>
                        <h3 className="text-[1rem] text-ink">{document.title}</h3>
                        <p className="mt-2 text-[0.86rem] leading-[1.7] text-slate">
                          {document.body}
                        </p>
                      </div>
                    </RevealItem>
                  );
                })}
              </RevealGroup>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-field text-field-foreground">
        <div className="container-page section-y">
          <SectionHeading
            onField
            eyebrow="After you are invested"
            title="The part most distributors stop doing."
            lead="Commission continues for as long as you stay invested, so continuing to earn it is the least we can do. Reviews are scheduled, not reactive."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-md border border-field-border bg-field-border md:grid-cols-3">
            {[
              {
                heading: "Scheduled reviews",
                body: "A standing review against the mandate you originally set, not against whatever benchmark happens to flatter the period.",
              },
              {
                heading: "Reporting, translated",
                body: "Portfolio manager statements are dense. We will read them with you and flag anything that has drifted from the original mandate.",
              },
              {
                heading: "Manager changes",
                body: "If a change is worth considering, you get the reasoning in writing, including the exit load and tax consequences of acting on it.",
              },
            ].map((item) => (
              <RevealItem
                key={item.heading}
                as="article"
                className="bg-field p-7 md:p-9"
              >
                <h3 className="text-[1.05rem] text-field-foreground">
                  {item.heading}
                </h3>
                <p className="mt-3 text-[0.9rem] leading-[1.72] text-field-muted">
                  {item.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-8">
            <DisclosureNote onField>
              {site.brand} has no role in managing your portfolio. Questions
              about holdings, performance or the fees charged for managing your
              money must be raised with the portfolio manager who holds your
              mandate.
            </DisclosureNote>
          </Reveal>
        </div>
      </section>

      <CtaBand
        eyebrow="Stage one"
        title="The first conversation costs nothing and commits nothing."
        lead="Forty five minutes on what the capital is for. If PMS is the wrong instrument, you will hear that in the first meeting rather than the third."
      />
    </>
  );
}
