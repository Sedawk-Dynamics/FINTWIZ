import type { Metadata } from "next";
import { SITE_URL, site } from "./site";

export { SITE_URL };

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: PageMetaInput): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.brand,
      locale: "en_IN",
      url: path,
      title: `${title} | ${site.brand}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.brand}`,
      description,
    },
  };
}

/**
 * Organization schema. Deliberately typed as FinancialService rather than
 * anything implying asset management, and the only registration identifier
 * published is the APMI distributor number.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${SITE_URL}/#organization`,
    name: site.brand,
    legalName: site.legalName,
    url: SITE_URL,
    description: site.description,
    areaServed: { "@type": "Country", name: "India" },
    knowsAbout: [
      "Portfolio Management Services",
      "PMS distribution",
      "SEBI registered portfolio managers",
    ],
    identifier: {
      "@type": "PropertyValue",
      name: `${site.registration.authority} Registration Number`,
      value: site.registration.number,
    },
    employee: {
      "@type": "Person",
      name: site.officer.name,
      jobTitle: site.officer.roleLine,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: site.contact.general,
        availableLanguage: ["en", "hi"],
      },
      {
        "@type": "ContactPoint",
        contactType: "complaints",
        email: site.contact.grievance,
        availableLanguage: ["en", "hi"],
      },
    ],
    disclaimer: site.shortDescription,
  };
}

export function faqJsonLd(items: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function breadcrumbJsonLd(
  trail: readonly { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path}`,
    })),
  };
}

/** Serialises JSON-LD safely for inline injection. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
