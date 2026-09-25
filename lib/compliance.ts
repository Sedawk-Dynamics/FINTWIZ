/* compliance-allow: research-language
   This file is the disclaimer itself. It has to name the activities we do not
   carry out in order to disclaim them, so the research-language rule in
   scripts/check-compliance.mjs is waived for this file only. */

/**
 * Regulatory copy for fintwizwealth.com.
 *
 * THE DOMAIN RULE
 * ---------------
 * fintwizwealth.com is the PMS distributor domain and carries the APMI
 * distributor registration only. The separate SEBI Research Analyst
 * registration belongs to fintwiz.com and must never appear on this domain.
 * This is a regulatory requirement, not a style preference.
 *
 * The Research Analyst number is deliberately not written anywhere in this
 * codebase, including in comments. `scripts/check-compliance.mjs` fails the
 * build if it, research-style language, or an em dash appears in the source.
 *
 * TODO(client): the disclaimer below is drafted to mirror the seven-section
 * structure described in the developer brief. It requires compliance sign-off
 * before launch, and the commission bands in section 3 are placeholders.
 */

import { site } from "./site";

/** Short risk line rendered in the footer of every page. */
export const standardRiskLine = `${site.brand} (${site.registration.number}) is a ${site.registration.authority} registered distributor of Portfolio Management Services. Investments in securities are subject to market risk, including loss of principal. Past performance of any portfolio manager is not indicative of future returns. Read the portfolio manager's disclosure document and all related documents carefully before investing.`;

/** One-line statement of what this company is and is not. */
export const roleStatement = `${site.brand} does not manage client money, does not hold client securities, and does not advise on individual securities. We help investors select and onboard with SEBI-registered portfolio managers.`;

export type DisclaimerSection = {
  id: string;
  number: string;
  title: string;
  body: readonly string[];
};

export const disclaimerSections: readonly DisclaimerSection[] = [
  {
    id: "nature-of-service",
    number: "01",
    title: "Nature of our service",
    body: [
      `${site.legalName}, operating as ${site.brand}, is registered with the ${site.registration.authorityLong} as a distributor of Portfolio Management Services under registration number ${site.registration.number}, valid from ${site.registration.validFrom} to ${site.registration.validTo}.`,
      "Our role is limited to introducing investors to SEBI-registered portfolio managers, explaining the options available, and supporting the account opening process. We are not a portfolio manager and we are not registered as one.",
      `${site.brand} does not receive, hold, pool or have discretion over client funds or client securities at any point. Your account is opened in your own name, your securities are held in your own demat account, and all investment decisions are taken by the portfolio manager you appoint.`,
    ],
  },
  {
    id: "no-investment-advice",
    number: "02",
    title: "We do not provide investment advice on securities",
    body: [
      "Nothing on this website constitutes investment advice, a recommendation, or an offer to buy or sell any security. No content here should be read as a view on the merits of any individual stock, bond or other instrument.",
      "This domain publishes no research reports, no target prices, no entry, stop-loss or target levels, no trade setups and no trading alerts. Securities research is a separately regulated activity which is not carried out on this domain.",
      "The decision to appoint any portfolio manager, and the decision to invest at all, is yours. You should form that judgement on the portfolio manager's own disclosure document and, where appropriate, on independent professional advice.",
    ],
  },
  {
    id: "commission-and-conflicts",
    number: "03",
    title: "How we are paid, and the conflicts that creates",
    body: [
      `${site.brand} is compensated by distribution commission paid by the portfolio manager. We do not charge you an advisory or platform fee for the distribution service.`,
      "Commission rates differ between portfolio managers. This is a structural conflict of interest and we disclose it rather than describe it away: a distributor paid more by one manager than another has an incentive to favour that manager.",
      "We manage that conflict by writing down the reasoning for every inclusion and every exclusion in a shortlist, and by disclosing the applicable commission band for each shortlisted manager before you sign any agreement. You are entitled to ask for that disclosure in writing at any time.",
      "TODO(client): insert the actual commission bands per manager once confirmed.",
    ],
  },
  {
    id: "performance-figures",
    number: "04",
    title: "Performance figures and their source",
    body: [
      `${site.brand} does not compute, author, restate or project performance figures. We publish no returns of our own.`,
      "Where a performance figure appears anywhere on this website, it is the portfolio manager's own disclosed figure, is shown with the date as of which the manager disclosed it, and links to the manager's source document.",
      "Performance figures are historical. They are not a promise, projection or guarantee of future results. Returns shown by a portfolio manager may be before or after fees and expenses, and may not reflect what any individual investor actually experienced. Always read the basis of calculation stated in the manager's disclosure document.",
    ],
  },
  {
    id: "risk-factors",
    number: "05",
    title: "Risk factors",
    body: [
      "Investments in securities markets are subject to market risk. The value of a portfolio can fall as well as rise, and you may get back less than you invested, including a total loss of capital.",
      "Portfolio Management Services frequently run concentrated portfolios. Concentration increases both the potential return and the potential loss relative to a diversified index, and can produce drawdowns that are deeper and longer than a broad market fall.",
      "Additional risks include liquidity risk in mid and small capitalisation securities, strategy risk if the manager's approach underperforms for extended periods, key person risk where a strategy depends on named individuals, regulatory and tax risk, and operational risk.",
      "There is no assurance or guarantee that the objective of any portfolio strategy will be achieved.",
    ],
  },
  {
    id: "suitability",
    number: "06",
    title: "Suitability and minimum investment",
    body: [
      `SEBI prescribes a minimum investment of ${site.pmsMinimum.display} for Portfolio Management Services. This minimum is statutory and is not set by ${site.brand} or by any individual portfolio manager.`,
      "PMS is intended for investors who can commit capital for an extended horizon and who can tolerate significant interim volatility. It is not a substitute for an emergency reserve or for capital needed in the short term.",
      "Any profiling we carry out is a suitability discussion for the purpose of shortlisting portfolio managers. It is not a recommendation on securities and it does not transfer responsibility for the investment decision from you to us.",
    ],
  },
  {
    id: "grievance-redressal",
    number: "07",
    title: "Grievance redressal and escalation",
    body: [
      `${site.officer.name} is the Principal Officer, Grievance Officer and Compliance Officer for ${site.brand}. Complaints may be sent to ${site.contact.grievance}.`,
      site.contact.grievanceWindow,
      "If your complaint is not resolved to your satisfaction, you may escalate it to SEBI through the SCORES portal at scores.sebi.gov.in, or initiate online dispute resolution through the SMART ODR portal at smartodr.in.",
      `Complaints relating to the management of your portfolio, its performance, or the fees charged for managing it, must be raised with the portfolio manager who holds your mandate, since ${site.brand} has no role in managing your portfolio.`,
    ],
  },
];

/**
 * The roster in lib/managers.ts illustrates the format of the list. No
 * empanelment is confirmed yet, so this sentence travels with every surface
 * that names a portfolio manager, and may only be removed once signed
 * empanelment and written display consent are on file for each one.
 */
export const sampleRosterNote =
  "These managers are shown to illustrate our platform's format and are not yet confirmed as empanelled partners.";

/** Short, page-level disclosures used as inline notes near relevant content. */
export const inlineDisclosures = {
  roster: `Figures and descriptions shown for each portfolio manager are sourced from that manager's own disclosures. ${site.brand} does not author, verify or restate manager performance. Inclusion on this roster is not a recommendation.`,
  fees: `${site.brand} is paid a distribution commission by the portfolio manager and does not bill you a fee for the distribution service. Commission differs between managers, which is a conflict of interest we disclose to you in writing before you sign.`,
  minimum: site.pmsMinimum.note,
  noAdvice:
    "This page is general information about a regulated product category. It is not investment advice and it is not a recommendation to buy or sell any security.",
} as const;
