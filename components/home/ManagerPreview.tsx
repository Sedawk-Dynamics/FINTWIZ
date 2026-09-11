import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading, DisclosureNote } from "@/components/shared/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { ManagerCard } from "@/components/managers/ManagerCard";
import { Button } from "@/components/ui/button";
import { managers } from "@/lib/managers";
import { inlineDisclosures } from "@/lib/compliance";

export function ManagerPreview() {
  return (
    <section className="bg-secondary">
      <div className="container-page section-y">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Empanelled managers"
            title="Their strategies, their disclosures, their numbers."
            lead="Every entry links to that manager's own SEBI-format disclosure document. Inclusion here is not a recommendation, and the order is not a ranking."
            maxWidth="max-w-[42rem]"
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

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {managers.map((manager) => (
            <RevealItem key={manager.id} className="h-full">
              <ManagerCard manager={manager} />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-8">
          <DisclosureNote>{inlineDisclosures.roster}</DisclosureNote>
        </Reveal>

        <Reveal className="mt-8 lg:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href="/portfolio-managers">
              See the full roster
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
