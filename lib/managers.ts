/**
 * The empanelled portfolio manager roster.
 *
 * COMPLIANCE CONTRACT
 * -------------------
 * 1. Fintwiz Wealth authors no performance figure. A number may only appear on
 *    this site through `disclosedFigures`, and the type makes `asOf` and
 *    `sourceUrl` mandatory, so a figure cannot be published without the date
 *    the manager disclosed it and a link to the document it came from.
 * 2. `sebiRegNo` is the manager's own SEBI PMS registration. It is never
 *    Fintwiz Wealth's own registration, which is APRN 09563 and appears only
 *    in lib/site.ts.
 * 3. `consent` records whether signed empanelment and written permission to
 *    display the manager's name exist. It is internal, never rendered.
 *
 * TODO(client): registration numbers and disclosure URLs below were carried
 * over from the supplied visual mockup, which sourced them from public SEBI
 * records. Verify each one against the signed empanelment agreement, and
 * confirm written consent to display, before this site goes live.
 */

export type StrategyCategory =
  | "Large Cap"
  | "Multi Cap"
  | "All Cap"
  | "Mid & Small Cap"
  | "Thematic"
  | "Multi Asset";

export type RiskBand = "Conservative" | "Balanced" | "Aggressive";

/**
 * A figure the portfolio manager has themselves disclosed.
 * Every field is required on purpose: no undated, unsourced number can be
 * added to this site without the compiler objecting.
 */
export type DisclosedFigure = {
  label: string;
  value: string;
  /** Date the manager disclosed this figure, as printed in their document. */
  asOf: string;
  /** Direct link to the manager's own document containing this figure. */
  sourceUrl: string;
};

export type PortfolioManager = {
  id: string;
  serial: string;
  house: string;
  strategy: string;
  category: StrategyCategory;
  risk: RiskBand;
  /** One line, factual, drawn from the manager's own stated approach. */
  summary: string;
  /** Two or three characteristics of the mandate. Never a recommendation. */
  attributes: readonly string[];
  sebiRegNo: string;
  disclosureUrl: string;
  /** Empty until the manager publishes a figure we can date and link. */
  disclosedFigures: readonly DisclosedFigure[];
  consent: {
    empanelmentSigned: boolean;
    displayConsentOnFile: boolean;
  };
};

export const managers: readonly PortfolioManager[] = [
  {
    id: "marcellus-consistent-compounders",
    serial: "PM 001",
    house: "Marcellus Investment Managers",
    strategy: "Consistent Compounders",
    category: "Large Cap",
    risk: "Balanced",
    summary:
      "A concentrated portfolio of large, cash-generative franchises held for long periods, selected on balance-sheet quality and consistency of earnings.",
    attributes: ["Concentrated book", "Quality and compounding bias", "Long holding periods"],
    sebiRegNo: "INP000006183",
    disclosureUrl:
      "https://marcellus.in/wp-content/uploads/disclosures/Marcellus-disclosure-Document.pdf",
    disclosedFigures: [],
    consent: { empanelmentSigned: false, displayConsentOnFile: false },
  },
  {
    id: "dezerv-multi-strategy",
    serial: "PM 002",
    house: "Dezerv Investments",
    strategy: "Multi-Strategy Portfolio",
    category: "Multi Cap",
    risk: "Balanced",
    summary:
      "A diversified, goal-linked allocation spread across market capitalisations, rebalanced against a stated target allocation rather than a single style.",
    attributes: ["Diversified across caps", "Goal-linked allocation", "Rules-based rebalancing"],
    sebiRegNo: "INP000007377",
    disclosureUrl: "https://dezerv.in",
    disclosedFigures: [],
    consent: { empanelmentSigned: false, displayConsentOnFile: false },
  },
  {
    id: "abakkus-all-cap",
    serial: "PM 003",
    house: "Abakkus Asset Manager",
    strategy: "All Cap Approach",
    category: "All Cap",
    risk: "Aggressive",
    summary:
      "A bottom-up, valuation-led book that moves across the full market-cap range, built around earnings visibility and the price paid for it.",
    attributes: ["Bottom-up selection", "Valuation discipline", "Full cap range"],
    sebiRegNo: "INP000006457",
    disclosureUrl:
      "https://abakkus-website.s3.ap-south-1.amazonaws.com/files/disclosures/Abakkus_PMS_Disclosure_Document.pdf",
    disclosedFigures: [],
    consent: { empanelmentSigned: false, displayConsentOnFile: false },
  },
  {
    id: "alchemy-select-stock",
    serial: "PM 004",
    house: "Alchemy Capital Management",
    strategy: "Select Stock",
    category: "Multi Cap",
    risk: "Aggressive",
    summary:
      "A high-conviction, concentrated portfolio built stock by stock, weighted toward businesses the manager expects to grow earnings faster than the broad market.",
    attributes: ["High conviction", "Concentrated positions", "Growth-led selection"],
    sebiRegNo: "INP000000365",
    disclosureUrl: "https://www.alchemycapital.com",
    disclosedFigures: [],
    consent: { empanelmentSigned: false, displayConsentOnFile: false },
  },
] as const;

export const categories: readonly ("All" | StrategyCategory)[] = [
  "All",
  "Large Cap",
  "Multi Cap",
  "All Cap",
  "Mid & Small Cap",
  "Thematic",
  "Multi Asset",
];

/** Categories that actually have at least one manager behind them. */
export const activeCategories: readonly ("All" | StrategyCategory)[] = [
  "All",
  ...Array.from(new Set(managers.map((m) => m.category))),
];

export function managersByCategory(
  category: "All" | StrategyCategory,
): readonly PortfolioManager[] {
  if (category === "All") return managers;
  return managers.filter((m) => m.category === category);
}
