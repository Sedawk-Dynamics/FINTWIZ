import Image from "next/image";
import { ArrowUpRight, Clock, Mail, Scale, ShieldAlert } from "lucide-react";
import { photography } from "@/lib/media";
import { PageHero } from "@/components/shared/PageHero";
import {
  SectionHeading,
  DisclosureNote,
  RegBadge,
} from "@/components/shared/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { processSteps, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Speak to Fintwiz Wealth about Portfolio Management Service distribution, request a manager shortlist, or raise a grievance with our named Grievance Officer.",
  path: "/contact",
  keywords: [
    "contact PMS distributor",
    "PMS grievance",
    "SEBI SCORES",
    "SMART ODR",
  ],
});

const escalation = [
  {
    step: "01",
    title: `Write to our Grievance Officer`,
    body: `${site.officer.name} is the named Grievance Officer. ${site.contact.grievanceWindow}`,
    action: {
      label: site.contact.grievance,
      href: `mailto:${site.contact.grievance}`,
    },
  },
  {
    step: "02",
    title: "Escalate to SEBI through SCORES",
    body: "If you are not satisfied with our resolution, the SEBI complaints redress system accepts complaints against registered intermediaries directly.",
    action: {
      label: "scores.sebi.gov.in",
      href: "https://scores.sebi.gov.in",
      external: true,
    },
  },
  {
    step: "03",
    title: "Online dispute resolution",
    body: "The SMART ODR platform provides conciliation and arbitration for disputes in the Indian securities market.",
    action: {
      label: "smartodr.in",
      href: "https://smartodr.in",
      external: true,
    },
  },
] as const;

const beforeYouWrite = [
  {
    heading: "We cannot advise on shares",
    body: "This domain carries no securities research. If you want a view on a particular stock, we are the wrong firm and will say so.",
  },
  {
    heading: `The minimum is ${site.pmsMinimum.display}`,
    body: "Set by SEBI for all Portfolio Management Services. Below it, a PMS account cannot be opened at all.",
  },
  {
    heading: "Nothing you send is a commitment",
    body: "An enquiry starts a conversation. There is no cost, and no obligation to proceed at any stage.",
  },
] as const;

const nextSteps = [
  {
    title: "A person reads it",
    body: "Your enquiry goes to a member of the team, not an automated queue.",
  },
  {
    title: "We reply",
    body: site.contact.responseWindow,
  },
  {
    title: "A first conversation, if PMS fits",
    body: `${processSteps[0].duration} on what the capital is for. If PMS is the wrong instrument, we say so then.`,
  },
] as const;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what the capital is for."
        lead="The first conversation is about whether PMS is the right instrument at all. If it is not, you will hear that straight away rather than after a shortlist."
        crumb={{ name: "Contact", path: "/contact" }}
        aside={
          <div className="space-y-3">
            <ContactTile
              icon={Mail}
              label="General enquiries"
              value={site.contact.general}
              href={`mailto:${site.contact.general}`}
            />
            <ContactTile
              icon={ShieldAlert}
              label="Grievances"
              value={site.contact.grievance}
              href={`mailto:${site.contact.grievance}`}
            />
            <ContactTile
              icon={Scale}
              label="Compliance"
              value={site.contact.compliance}
              href={`mailto:${site.contact.compliance}`}
            />
            <div className="flex items-center gap-3 rounded-md border border-field-border bg-white/[0.03] px-4 py-3">
              <Clock
                aria-hidden="true"
                className="size-4 shrink-0 text-gold-bright"
              />
              <p className="text-[0.8125rem] text-field-muted">
                {site.contact.responseWindow}
              </p>
            </div>
          </div>
        }
      />

      {/* Form */}
      <section id="enquiry" className="bg-background">
        <div className="container-page section-y">
          {/* The heading spans both columns so the form and the side panel
              start on the same line. */}
          <SectionHeading
            eyebrow="Send an enquiry"
            title="A person reads this, not a queue."
          />

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
            <Reveal delay={0.08} className="h-full">
              <ContactForm className="h-full" />
            </Reveal>

            {/* Stretches to the form's height. The first card absorbs any
                remaining difference so the two columns end level. */}
            <Reveal delay={0.12} className="h-full">
              <div className="flex h-full flex-col gap-6">
                <div className="flex-1 rounded-md border border-border bg-secondary p-6 md:p-8">
                  <p className="eyebrow rule-lead text-gold-deep">
                    Before you write
                  </p>
                  <h3 className="mt-4 text-[1.2rem] text-ink">
                    Three things worth knowing
                  </h3>
                  <ul className="mt-6 space-y-5">
                    {beforeYouWrite.map((item) => (
                      <li key={item.heading}>
                        <p className="text-[0.95rem] font-medium text-ink">
                          {item.heading}
                        </p>
                        <p className="mt-1.5 text-[0.86rem] leading-[1.7] text-slate">
                          {item.body}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-md border border-border bg-card p-6 md:p-8">
                  <p className="eyebrow rule-lead text-gold-deep">
                    What happens next
                  </p>
                  <ol className="mt-5">
                    {nextSteps.map((step, index) => (
                      <li
                        key={step.title}
                        className="relative flex gap-4 pb-5 last:pb-0"
                      >
                        {index < nextSteps.length - 1 ? (
                          <span
                            aria-hidden="true"
                            className="absolute top-3 -bottom-3 left-3 w-px -translate-x-1/2 bg-border-strong"
                          />
                        ) : null}
                        <span className="relative z-10 flex size-6 shrink-0 items-center justify-center rounded-sm border border-azure-bright/50 bg-card font-mono text-[0.62rem] text-azure-bright tnum">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 pt-0.5">
                          <p className="text-[0.92rem] font-medium text-ink">
                            {step.title}
                          </p>
                          <p className="mt-1 text-[0.84rem] leading-[1.65] text-slate">
                            {step.body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-8">
            <DisclosureNote>
              {site.brand} ({site.registration.number}) is a{" "}
              {site.registration.authority} registered distributor of Portfolio
              Management Services. We do not manage client funds and we do not
              provide advice on individual securities.
            </DisclosureNote>
          </Reveal>
        </div>
      </section>

      {/* Officers */}
      <section className="bg-secondary">
        <div className="container-page section-y">
          <SectionHeading
            eyebrow="Named officers"
            title="One person holds all three roles, and is named."
            lead="For a firm of this size, the Principal, Grievance and Compliance Officer functions sit with the same individual. Naming them is a regulatory requirement and a useful accountability test."
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-3">
            {site.officer.roles.map((role) => (
              <RevealItem key={role} as="article" className="bg-card p-7">
                <p className="eyebrow text-gold-deep">{role}</p>
                <p className="mt-4 font-display text-[1.2rem] font-medium text-ink">
                  {site.officer.name}
                </p>
                <div className="mt-4">
                  <RegBadge
                    label={site.registration.authority}
                    value={site.registration.number}
                  />
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Grievance escalation */}
      <section
        id="grievance"
        className="brand-rule relative isolate overflow-hidden bg-field text-field-foreground"
      >
        {/* SEBI Bhavan, held right back. The escalation path on this page ends
            at the regulator, so the building is the subject, not decoration. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <Image
            src={photography.regulator.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center opacity-[0.16]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-field via-field/90 to-field/60" />
        </div>

        <div className="container-page relative section-y">
          <SectionHeading
            onField
            eyebrow="Grievance redressal"
            title="If we get it wrong, here is exactly where to go."
            lead="Complaints about our conduct as a distributor come to us first. Complaints about how your portfolio is managed belong with the portfolio manager who holds your mandate."
          />

          <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
            {escalation.map((stage) => (
              <RevealItem
                key={stage.step}
                as="article"
                className="flex h-full flex-col rounded-md border border-field-border bg-white/[0.025] p-7"
              >
                <span className="font-mono text-[0.72rem] tracking-[0.14em] text-gold-bright tnum">
                  {stage.step}
                </span>
                <h3 className="mt-4 text-[1.05rem] text-field-foreground">
                  {stage.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-[1.72] text-field-muted">
                  {stage.body}
                </p>
                <a
                  href={stage.action.href}
                  {...("external" in stage.action && stage.action.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="link-underline mt-auto inline-flex items-center gap-1.5 pt-5 font-mono text-[0.78rem] [overflow-wrap:anywhere] text-gold-bright"
                >
                  {stage.action.label}
                  {"external" in stage.action && stage.action.external ? (
                    <ArrowUpRight aria-hidden="true" className="size-3.5" />
                  ) : null}
                </a>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-8">
            <DisclosureNote onField>
              Registered office address and telephone number will be published
              here once confirmed. In the meantime every officer is reachable at
              the addresses above, all of which are monitored.
            </DisclosureNote>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ContactTile({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 rounded-md border border-field-border bg-white/[0.03] px-4 py-3 transition-colors duration-200 hover:border-gold/50"
    >
      <Icon aria-hidden="true" className="size-4 shrink-0 text-gold-bright" />
      <span className="min-w-0">
        <span className="block font-mono text-[0.6rem] tracking-[0.14em] text-field-muted uppercase">
          {label}
        </span>
        <span className="block text-[0.875rem] [overflow-wrap:anywhere] text-field-foreground">
          {value}
        </span>
      </span>
    </a>
  );
}
