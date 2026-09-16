import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { site } from "@/lib/site";
import { standardRiskLine } from "@/lib/compliance";
import { DiamondField } from "@/components/brand/Motif";

const companyRows = [
  { k: "Legal entity", v: site.legalName },
  { k: `${site.registration.authority} registration`, v: site.registration.number },
  { k: "BSE enlistment", v: site.registration.bseEnlistment },
  { k: "Registration validity", v: `${site.registration.validFrom} to ${site.registration.validTo}` },
  { k: "Principal Officer", v: site.officer.name },
  { k: "Grievance Officer", v: site.officer.name },
  { k: "Compliance Officer", v: site.officer.name },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="brand-rule relative overflow-hidden bg-field text-field-muted">
      <DiamondField className="text-field-border opacity-60" scale={68} />

      <div className="container-page relative pt-20 pb-10">
        {/* Statutory identity block, kept above the navigation on purpose */}
        <section
          aria-label="Company and regulatory details"
          className="rounded-md border border-field-border bg-white/[0.025] p-6 md:p-8"
        >
          <h2 className="eyebrow text-gold-bright">Company details</h2>
          <dl className="mt-6 grid gap-x-12 gap-y-0 sm:grid-cols-2">
            {companyRows.map((row) => (
              <div
                key={row.k}
                className="flex items-baseline justify-between gap-6 border-b border-field-border py-3 last:border-b-0 sm:last:border-b"
              >
                <dt className="text-[0.8125rem] text-field-muted">{row.k}</dt>
                <dd className="text-right font-mono text-[0.78rem] text-field-foreground tnum">
                  {row.v}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <div className="mt-14 grid gap-12 border-b border-field-border pb-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo inverted />
            <p className="mt-5 text-[0.875rem] leading-[1.7]">
              {site.shortDescription}
            </p>
            <a
              href={`mailto:${site.contact.general}`}
              className="link-underline mt-5 inline-flex items-center gap-2 text-[0.875rem] text-field-foreground"
            >
              <Mail aria-hidden="true" className="size-4 text-gold-bright" />
              {site.contact.general}
            </a>
          </div>

          <FooterColumn title="Site" links={site.footerNav.site} />
          <FooterColumn title="Regulatory" links={site.footerNav.regulatory} />
          <FooterColumn title="Legal" links={site.footerNav.company} />
        </div>

        <p className="mt-10 text-[0.75rem] leading-[1.75] text-field-muted">
          {standardRiskLine}
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-field-border pt-7 text-[0.75rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            {"©"} {year} {site.legalName}. {site.registration.number}.
          </p>
          <p className="text-field-muted">
            Distributor of Portfolio Management Services. Not a portfolio manager.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { href: string; label: string; external?: boolean }[];
}) {
  return (
    <nav aria-label={title}>
      <h2 className="eyebrow text-gold-bright">{title}</h2>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline inline-flex items-center gap-1 text-[0.875rem] hover:text-field-foreground"
              >
                {link.label}
                <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-60" />
              </a>
            ) : (
              <Link
                href={link.href}
                className="link-underline text-[0.875rem] hover:text-field-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
