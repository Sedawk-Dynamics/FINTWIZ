import { Hero } from "@/components/home/Hero";
import { StatBar } from "@/components/home/StatBar";
import { Services } from "@/components/home/Services";
import { RoleSplit } from "@/components/home/RoleSplit";
import { ManagerPreview } from "@/components/home/ManagerPreview";
import { WhyUs } from "@/components/home/WhyUs";
import { Officer } from "@/components/home/Officer";
import { Faq } from "@/components/shared/Faq";
import { CtaBand } from "@/components/shared/CtaBand";
import { faqs } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatBar />
      <RoleSplit />
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
