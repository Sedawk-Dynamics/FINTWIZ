import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { LegalDocument } from "@/components/shared/LegalDocument";
import { pageMetadata } from "@/lib/seo";
import { termsSections } from "@/lib/content/legal";
import { mediaCredits } from "@/lib/media";

export const metadata = pageMetadata({
  title: "Terms & Conditions",
  description:
    "The terms governing use of fintwizwealth.com, including the limits of what is published here, the absence of investment advice, and how liability is allocated.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="What this site is, and what it is not."
        lead="Short version: this is an informational site run by a distributor. It carries no investment advice, no research and no performance figures of our own, and every investment decision described here remains yours."
        crumb={{ name: "Terms & Conditions", path: "/terms-and-conditions" }}
      />

      <LegalDocument sections={termsSections}>
        <section id="image-credits" className="mt-10 border-t border-border pt-10">
          <p className="font-mono text-[0.7rem] tracking-[0.14em] text-gold-deep uppercase">
            Appendix
          </p>
          <h2 className="mt-3 text-[1.4rem] text-ink md:text-[1.55rem]">
            Image credits
          </h2>
          <p className="mt-5 text-[0.95rem] leading-[1.78] text-slate">
            Photography on this site is used under Creative Commons licences or
            is in the public domain. Attribution is published here as those
            licences require. The ambient clip in the page header is derived
            from the first image listed below and is covered by its attribution.
          </p>

          <ul className="mt-7 space-y-px overflow-hidden rounded-md border border-border bg-border">
            {mediaCredits.map((credit) => (
              <li key={credit.src} className="bg-card p-5">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <p className="text-[0.9rem] font-medium text-ink">
                    {credit.work}
                  </p>
                  <p className="font-mono text-[0.72rem] text-slate">
                    {credit.licence}
                  </p>
                </div>
                <p className="mt-1.5 text-[0.82rem] text-slate">
                  by {credit.author}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                  <a
                    href={credit.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline inline-flex items-center gap-1 text-[0.78rem] text-azure-bright"
                  >
                    Source
                    <ArrowUpRight aria-hidden="true" className="size-3" />
                  </a>
                  {credit.licenceUrl ? (
                    <a
                      href={credit.licenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline inline-flex items-center gap-1 text-[0.78rem] text-azure-bright"
                    >
                      Licence terms
                      <ArrowUpRight aria-hidden="true" className="size-3" />
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </LegalDocument>
    </>
  );
}
