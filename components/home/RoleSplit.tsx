import { Check, Minus } from "lucide-react";
import { SectionHeading, DisclosureNote } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { RoutingDiagram } from "@/components/visuals/RoutingDiagram";
import { roleSplit } from "@/lib/site";
import { roleStatement } from "@/lib/compliance";

export function RoleSplit() {
  return (
    <section id="role" className="bg-background">
      <div className="container-page section-y">
        <SectionHeading
          eyebrow="Who does what"
          title="One of us manages the money. It is not us."
          lead="This is the distinction that decides everything else: who holds the securities, who makes the decisions, who you pay, and who you complain to when something goes wrong."
        />

        <Reveal className="mt-14 rounded-md border border-border bg-card p-6 md:p-10">
          <RoutingDiagram />
        </Reveal>

        <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-border bg-border md:grid-cols-2">
          <RoleColumn
            label={roleSplit.manager.label}
            heading={roleSplit.manager.heading}
            points={roleSplit.manager.points}
            tone="manager"
          />
          <RoleColumn
            label={roleSplit.distributor.label}
            heading={roleSplit.distributor.heading}
            points={roleSplit.distributor.points}
            tone="distributor"
          />
        </div>

        <Reveal className="mt-8">
          <DisclosureNote>{roleStatement}</DisclosureNote>
        </Reveal>
      </div>
    </section>
  );
}

function RoleColumn({
  label,
  heading,
  points,
  tone,
}: {
  label: string;
  heading: string;
  points: readonly string[];
  tone: "manager" | "distributor";
}) {
  const Icon = tone === "manager" ? Check : Minus;
  const accent = tone === "manager" ? "text-teal-bright" : "text-brass-deep";

  return (
    <Reveal
      as="article"
      delay={tone === "distributor" ? 0.08 : 0}
      className={
        tone === "manager" ? "bg-card p-7 md:p-9" : "bg-secondary p-7 md:p-9"
      }
    >
      <p className={`eyebrow rule-lead ${accent}`}>{label}</p>
      <h3 className="mt-4 text-[1.35rem] text-ink">{heading}</h3>
      <ul className="mt-6 space-y-3.5">
        {points.map((point) => (
          <li key={point} className="flex gap-3">
            <Icon
              aria-hidden="true"
              className={`mt-[0.3rem] size-3.5 shrink-0 ${accent}`}
            />
            <span className="text-[0.9rem] leading-[1.68] text-slate">
              {point}
            </span>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
