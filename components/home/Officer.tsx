import Link from "next/link";
import { Mail, ShieldCheck } from "lucide-react";
import { SectionHeading, RegBadge } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { Button } from "@/components/ui/button";
import { DiamondField } from "@/components/brand/Motif";
import { site } from "@/lib/site";

/**
 * TODO(client): supply a photograph of the Principal Officer. Until it exists,
 * the monogram plate below is the intended presentation rather than a gap: it
 * is designed to look deliberate, and swapping in an <Image> is a local change.
 */
export function Officer() {
  const initials = site.officer.name
    .split(" ")
    .map((part) => part[0])
    .join("");

  return (
    <section className="brand-rule relative bg-field text-field-foreground">
      <div className="container-page section-y">
        <SectionHeading
          onField
          eyebrow="Accountability"
          index="06"
          title="A named person is answerable for this website."
          lead="Regulatory pages often avoid saying who is responsible. The person below is responsible for the accuracy of the roster, the disclosures, and the handling of any complaint you raise."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-16">
          <Reveal>
            <MonogramPlate initials={initials} />
          </Reveal>

          <Reveal delay={0.1} className="max-w-[58ch]">
            <h3 className="text-[1.6rem] text-field-foreground">
              {site.officer.name}
            </h3>
            <p className="mt-2 font-mono text-[0.76rem] tracking-[0.06em] text-gold-bright">
              {site.officer.roleLine}
            </p>

            <p className="mt-6 text-[0.95rem] leading-[1.75] text-field-muted">
              {site.officer.bio}
            </p>

            <ul className="mt-7 flex flex-wrap gap-2">
              <li>
                <RegBadge
                  onField
                  label={site.registration.authority}
                  value={site.registration.number}
                />
              </li>
              {site.officer.credentials.map((credential) => (
                <li key={credential}>
                  <RegBadge onField value={credential} />
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="field">
                <a href={`mailto:${site.contact.grievance}`}>
                  <Mail aria-hidden="true" />
                  Raise a grievance
                </a>
              </Button>
              <Button asChild variant="fieldOutline">
                <Link href="/fees-and-disclosures#disclaimer">
                  <ShieldCheck aria-hidden="true" />
                  Read the disclosures
                </Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function MonogramPlate({ initials }: { initials: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex size-52 items-center justify-center rounded-md border border-field-border bg-white/[0.03] lg:size-60"
    >
      <DiamondField className="rounded-md text-field-border opacity-70" scale={40} />
      <span className="relative font-display text-[3.4rem] font-medium text-field-foreground/85">
        {initials}
      </span>
      <span className="absolute inset-x-7 bottom-6 h-px bg-gold/60" />
      <span className="absolute bottom-2.5 font-mono text-[0.58rem] tracking-[0.2em] text-field-muted uppercase">
        Principal Officer
      </span>
    </div>
  );
}
