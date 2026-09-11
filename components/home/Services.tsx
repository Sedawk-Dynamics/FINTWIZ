import Image from "next/image";
import { SectionHeading } from "@/components/shared/Section";
import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { getIcon } from "@/components/shared/icons";
import { photography } from "@/lib/media";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section className="relative isolate overflow-hidden bg-field text-field-foreground">
      {/* Architecture, held well back so it reads as depth rather than decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src={photography.towers.src}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-top opacity-[0.16]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-field via-field/85 to-field" />
      </div>

      <div className="container-page relative section-y">
        <SectionHeading
          onField
          eyebrow="What we actually do"
          title="Distribution, not discretion."
          lead="Four things, done properly. Selecting a portfolio manager is a research and paperwork problem, not a stock-picking one, and that is the part we take off your desk."
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-md border border-field-border bg-field-border md:grid-cols-2">
          {services.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <RevealItem
                key={service.number}
                as="article"
                className="group bg-field p-7 transition-colors duration-300 hover:bg-white/[0.035] md:p-9"
              >
                <div className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-10 items-center justify-center rounded-md border border-field-border text-brass-bright transition-colors duration-300 group-hover:border-brass"
                  >
                    <Icon className="size-[1.1rem]" />
                  </span>
                  <span className="font-mono text-[0.72rem] tracking-[0.14em] text-field-muted tnum">
                    {service.number}
                  </span>
                </div>
                <h3 className="mt-6 text-[1.15rem] text-field-foreground">
                  {service.title}
                </h3>
                <p className="mt-3 max-w-[46ch] text-[0.9rem] leading-[1.72] text-field-muted">
                  {service.body}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
