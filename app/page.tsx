import { Hero } from "@/components/home/Hero";
import { StatBar } from "@/components/home/StatBar";
import { Services } from "@/components/home/Services";
import { RoleSplit } from "@/components/home/RoleSplit";
import { MandateMatcher } from "@/components/home/MandateMatcher";
import { ManagerPreview } from "@/components/home/ManagerPreview";
import { WhyUs } from "@/components/home/WhyUs";
import { Officer } from "@/components/home/Officer";
import { Faq } from "@/components/shared/Faq";
import { CtaBand } from "@/components/shared/CtaBand";
import { SectionHeading } from "@/components/shared/Section";
import { DiamondField } from "@/components/brand/Motif";
import { faqs } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatBar />
      <RoleSplit />

      {/* The service, demonstrated rather than described. */}
      <section
        id="mandate"
        className="brand-rule relative isolate overflow-hidden bg-field text-field-foreground"
      >
        <DiamondField className="text-field-border opacity-70" scale={64} />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] bg-azure-logo/[0.07] blur-3xl"
        />

        <div className="container-page relative section-y">
          <SectionHeading
            onField
            eyebrow="Try the shortlist"
            index="02"
            title="Set a mandate. Watch the roster narrow."
            lead="This is the first fifteen minutes of a real engagement, compressed into three questions. Every manager that drops out tells you which criterion it failed, because a shortlist you cannot interrogate is just a sales list."
          />
          <div className="mt-14">
            <MandateMatcher />
          </div>
        </div>
      </section>

      <Services />
      <ManagerPreview />
      <WhyUs />
      <Officer />
      <Faq
        items={faqs.slice(0, 6)}
        lead="If your question is not here, the contact page reaches a person, not a queue."
      />
      <CtaBand />
    </>
  );
}
