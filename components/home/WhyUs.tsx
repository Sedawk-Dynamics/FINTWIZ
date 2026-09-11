import { SectionHeading } from "@/components/shared/Section";
import { RevealGroup, RevealItem } from "@/components/shared/Reveal";
import { getIcon } from "@/components/shared/icons";
import { differentiators } from "@/lib/site";

export function WhyUs() {
  return (
    <section className="bg-background">
      <div className="container-page section-y">
        <SectionHeading
          eyebrow="Why us"
          title="Built to be checked, not just believed."
          lead="Everything below is something you can independently verify, which is the only kind of claim worth putting on a regulated financial website."
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {differentiators.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <RevealItem
                key={item.title}
                as="article"
                className="group bg-card p-7 transition-colors duration-300 hover:bg-secondary"
              >
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 items-center justify-center rounded-md border border-border text-teal-bright transition-colors duration-300 group-hover:border-teal-bright"
                >
                  <Icon className="size-[1.1rem]" />
                </span>
                <h3 className="mt-6 text-[1.05rem] leading-snug text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.86rem] leading-[1.7] text-slate">
                  {item.body}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
