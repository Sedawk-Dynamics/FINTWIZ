import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/Reveal";
import { photography } from "@/lib/media";
import { site } from "@/lib/site";

export function CtaBand({
  eyebrow = "Next step",
  title = "Start with a conversation, not a form.",
  lead = "Tell us what the capital is for. If PMS is the wrong instrument for it, we will say so, and there is no cost to finding that out.",
  primaryLabel = "Book a consultation",
  primaryHref = "/contact",
  secondaryLabel = "How the process works",
  secondaryHref = "/how-it-works",
}: {
  eyebrow?: string;
  title?: string;
  lead?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="brand-rule relative isolate overflow-hidden bg-field text-field-foreground">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src={photography.narimanPoint.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-[0.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-field via-field/90 to-field/55" />
      </div>

      <div className="container-page relative py-20 md:py-24">
        <Reveal className="max-w-[44rem]">
          <p className="eyebrow rule-lead text-gold-bright">{eyebrow}</p>
          <h2 className="mt-5 text-[clamp(1.7rem,3.4vw,2.5rem)] text-field-foreground">
            {title}
          </h2>
          <p className="mt-5 max-w-[56ch] text-[1.0125rem] leading-[1.72] text-field-muted">
            {lead}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="field" size="lg">
              <Link href={primaryHref}>
                {primaryLabel}
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="fieldOutline" size="lg">
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          </div>

          <p className="mt-8 text-[0.78rem] text-field-muted">
            {site.contact.responseWindow} Minimum investment for PMS is{" "}
            {site.pmsMinimum.display}, as set by SEBI.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
