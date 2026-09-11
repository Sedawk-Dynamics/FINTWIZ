import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { jsonLdScript, faqJsonLd } from "@/lib/seo";

export function Faq({
  items,
  eyebrow = "Questions",
  title = "The questions that actually get asked.",
  lead,
  withJsonLd = true,
}: {
  items: readonly { q: string; a: string }[];
  eyebrow?: string;
  title?: string;
  lead?: string;
  withJsonLd?: boolean;
}) {
  return (
    <section className="bg-background">
      <div className="container-page section-y">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <SectionHeading eyebrow={eyebrow} title={title} lead={lead} />

          <Reveal>
            <Accordion type="single" collapsible>
              {items.map((item) => (
                <AccordionItem key={item.q} value={item.q}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </div>

      {withJsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd(items)) }}
        />
      ) : null}
    </section>
  );
}
