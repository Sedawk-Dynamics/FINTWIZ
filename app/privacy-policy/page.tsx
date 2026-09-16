import { PageHero } from "@/components/shared/PageHero";
import { HeroFacts } from "@/components/shared/HeroFacts";
import { LegalDocument } from "@/components/shared/LegalDocument";
import { pageMetadata } from "@/lib/seo";
import { LEGAL_UPDATED, privacySections } from "@/lib/content/legal";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "How Fintwiz Wealth collects, uses, shares and retains personal data submitted through fintwizwealth.com, and the rights you have under the Digital Personal Data Protection Act, 2023.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="What we collect, why, and how to make us delete it."
        lead={`We collect only what you send us through the enquiry form. This page says exactly what that is, how long we keep it, and how to exercise your rights under the Digital Personal Data Protection Act, 2023.`}
        crumb={{ name: "Privacy Policy", path: "/privacy-policy" }}
        aside={
          <HeroFacts
            title="This policy at a glance"
            facts={[
              { term: "Last updated", value: LEGAL_UPDATED },
              { term: "Sections", value: String(privacySections.length) },
              { term: "Governing law", value: "DPDP Act, 2023" },
              { term: "Grievance Officer", value: site.officer.name, note: site.contact.grievance },
            ]}
          />
        }
      />

      <LegalDocument sections={privacySections}>
        <div className="mt-10 rounded-md border border-border bg-secondary p-6 md:p-7">
          <h2 className="text-[1.1rem] text-ink">Contact the Grievance Officer</h2>
          <p className="mt-3 text-[0.9rem] leading-[1.72] text-slate">
            {site.officer.name}, {site.officer.roleLine}.
          </p>
          <a
            href={`mailto:${site.contact.grievance}`}
            className="link-underline mt-3 inline-block font-mono text-[0.85rem] text-azure-bright"
          >
            {site.contact.grievance}
          </a>
        </div>
      </LegalDocument>
    </>
  );
}
