import Image from "next/image";
import { Check, X } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading, DisclosureNote, RegBadge } from "@/components/shared/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { AccountStructure } from "@/components/visuals/AccountStructure";
import { Faq } from "@/components/shared/Faq";
import { CtaBand } from "@/components/shared/CtaBand";
import { pageMetadata } from "@/lib/seo";
import { site, faqs } from "@/lib/site";
import { inlineDisclosures } from "@/lib/compliance";
import { photography } from "@/lib/media";
import {
  pmsPage,
  definition,
  pmsTypes,
  suitability,
  costsOverview,
} from "@/lib/content/pms";

export const metadata = pageMetadata({
  title: "What is PMS",
  description:
    "A plain-language explanation of Portfolio Management Services: how a PMS account differs from a mutual fund, where your securities are held, what it costs, and who it suits.",
  path: "/what-is-pms",
  keywords: [
    "what is PMS",
    "portfolio management services explained",
    "PMS vs mutual fund",
    "PMS minimum investment",
  ],
});

export default function WhatIsPmsPage() {
  return (
    <>
      <PageHero
        eyebrow={pmsPage.eyebrow}
        title={pmsPage.title}
        lead={pmsPage.lead}
        crumb={{ name: "What is PMS", path: "/what-is-pms" }}
        aside={
          <dl className="rounded-md border border-field-border bg-white/[0.03] p-6">
            <FactRow
              term="Minimum investment"
              value={site.pmsMinimum.display}
              note="Set by SEBI"
            />
            <FactRow
              term="Who regulates it"
              value="SEBI"
              note="PMS Regulations"
            />
            <FactRow
              term="Who holds your shares"
              value="You do"
              note="Your own demat account"
            />
            <FactRow
              term="Our role"
              value="Distributor"
              note={site.registration.number}
              last
            />
          </dl>
        }
      />

      {/* The short version */}
      <section className="bg-background">
        <div className="container-page section-y">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow={definition.eyebrow}
                title={definition.title}
                maxWidth="max-w-none"
              />
              <Reveal delay={0.08} className="mt-7 space-y-5">
                {definition.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="max-w-[62ch] text-[1rem] leading-[1.78] text-slate"
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
              <Reveal delay={0.14} className="mt-8">
                <DisclosureNote>{inlineDisclosures.noAdvice}</DisclosureNote>
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <figure className="overflow-hidden rounded-md border border-border">
                <Image
                  src={photography.exchange.src}
                  alt={photography.exchange.alt}
                  width={1024}
                  height={768}
                  sizes="(min-width: 1024px) 44vw, 100vw"
                  className="h-full w-full object-cover"
                />
                <figcaption className="border-t border-border bg-card px-5 py-4 text-[0.78rem] leading-relaxed text-slate">
                  Phiroze Jeejeebhoy Towers, Mumbai. Portfolio managers are
                  registered and supervised by SEBI under a separate set of
                  regulations from distributors like us.
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Structural comparison */}
      <section className="bg-secondary">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="PMS against a mutual fund"
            title="The difference is not the returns. It is who owns the shares."
            lead="Both are professionally managed. Only one of them puts the securities in your own name, and that single structural fact drives the minimum, the reporting, the tax treatment and the fees."
          />
          <AccountStructure className="mt-14" />
        </div>
      </section>

      {/* Types */}
      <section className="bg-background">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="Three forms"
            title="Who pulls the trigger decides which kind you have."
            lead="SEBI recognises three forms of Portfolio Management Service. They differ only in how much authority you hand over."
          />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {pmsTypes.map((type, index) => (
              <RevealItem
                key={type.name}
                as="article"
                className="flex h-full flex-col rounded-md border border-border bg-card p-7 transition-[border-color,box-shadow] duration-300 hover:border-border-strong hover:shadow-card"
              >
                <span className="font-mono text-[0.66rem] tracking-[0.14em] text-brass-deep uppercase tnum">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-[1.15rem] text-ink">{type.name}</h3>
                <p className="mt-3 text-[0.9rem] leading-[1.72] text-slate">
                  {type.summary}
                </p>
                <p className="mt-auto border-t border-border pt-4 text-[0.8rem] leading-[1.65] text-slate-light">
                  {type.note}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Suitability */}
      <section className="bg-field text-field-foreground">
        <div className="container-page section-y">
          <SectionHeading
            onField
            eyebrow="Suitability"
            title="It is a good product for a narrow set of situations."
            lead="A distributor paid on volume has every reason to tell you PMS suits you. Here is the honest version of both sides, so you can rule yourself out before a sales conversation does it for you."
          />

          <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
            <SuitabilityColumn
              title={suitability.suitedTo.title}
              points={suitability.suitedTo.points}
              tone="yes"
            />
            <SuitabilityColumn
              title={suitability.notSuitedTo.title}
              points={suitability.notSuitedTo.points}
              tone="no"
            />
          </div>

          <Reveal className="mt-8">
            <DisclosureNote onField>{inlineDisclosures.minimum}</DisclosureNote>
          </Reveal>
        </div>
      </section>

      {/* Costs */}
      <section className="bg-background">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="What it costs"
            title="Four charges, all of them the manager's, none of them ours."
            lead="You do not pay Fintwiz Wealth a fee. These are the charges levied by the portfolio manager inside your account, and every one of them is set out in their disclosure document before you sign."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2">
            {costsOverview.map((cost) => (
              <RevealItem
                key={cost.label}
                className="bg-card p-7 transition-colors duration-300 hover:bg-secondary"
              >
                <h3 className="text-[1rem] text-ink">{cost.label}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-[1.7] text-slate">
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

      <Faq
        items={faqs.slice(2, 7)}
        eyebrow="Common questions"
        title="What people ask once the structure makes sense."
        withJsonLd={false}
      />

      <CtaBand
        eyebrow="If it fits"
        title="See which managers we have empanelled."
        lead="The roster lists each manager's strategy, category and SEBI registration, and links to their own disclosure document so you can read the primary source rather than our summary of it."
        primaryLabel="View the roster"
        primaryHref="/portfolio-managers"
        secondaryLabel="Talk it through"
        secondaryHref="/contact"
      />
    </>
  );
}

function FactRow({
  term,
  value,
  note,
  last = false,
}: {
  term: string;
  value: string;
  note: string;
  last?: boolean;
}) {
  return (
    <div
      className={
        last
          ? "flex items-baseline justify-between gap-6 py-3"
          : "flex items-baseline justify-between gap-6 border-b border-field-border py-3"
      }
    >
      <dt className="text-[0.8125rem] text-field-muted">{term}</dt>
      <dd className="text-right">
        <span className="block text-[0.9rem] font-medium text-field-foreground">
          {value}
        </span>
        <span className="mt-0.5 block font-mono text-[0.66rem] text-field-muted tnum">
          {note}
        </span>
      </dd>
    </div>
  );
}

function SuitabilityColumn({
  title,
  points,
  tone,
}: {
  title: string;
  points: readonly string[];
  tone: "yes" | "no";
}) {
  const Icon = tone === "yes" ? Check : X;
  const accent = tone === "yes" ? "text-teal-bright" : "text-brass-bright";

  return (
    <Reveal
      as="article"
      delay={tone === "no" ? 0.08 : 0}
      className="rounded-md border border-field-border bg-white/[0.025] p-7 md:p-8"
    >
      <h3 className="text-[1.15rem] text-field-foreground">{title}</h3>
      <ul className="mt-6 space-y-3.5">
        {points.map((point) => (
          <li key={point} className="flex gap-3">
            <Icon
              aria-hidden="true"
              className={`mt-[0.3rem] size-3.5 shrink-0 ${accent}`}
            />
            <span className="text-[0.9rem] leading-[1.68] text-field-muted">
              {point}
            </span>
          </li>
        ))}
      </ul>
      {tone === "no" ? (
        <div className="mt-7">
          <RegBadge onField value="We will tell you if this is you" />
        </div>
      ) : null}
    </Reveal>
  );
}
