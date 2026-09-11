/**
 * Single source of truth for every piece of site-wide copy, identity and
 * regulatory detail. Components must not inline user-facing strings.
 *
 * COMPLIANCE: `registration.number` is the only registration number permitted
 * on this domain. The SEBI Research Analyst number belongs to fintwiz.com and
 * must never be added here. See lib/compliance.ts.
 */

export const SITE_URL = "https://www.fintwizwealth.com";

/**
 * Values the client still has to confirm before this site goes live.
 * Anything referenced here is a documented placeholder, not a fact.
 * Keep this list accurate: it is the handover checklist.
 */
export const PENDING_CLIENT_DATA = [
  "Vector logo (SVG). A typographic wordmark is in place at components/brand/Logo.tsx.",
  "Role-based email addresses below are derived from the domain and need confirmation.",
  "Telephone number and registered office address for the contact page and footer.",
  "Principal Officer photograph and long-form biography.",
  "Signed empanelment confirmation and written consent for each portfolio manager listed in lib/managers.ts.",
  "Actual commission bands per manager for the Fees page.",
  "Compliance sign-off on all risk and disclosure wording.",
] as const;

export const site = {
  brand: "Fintwiz Wealth",
  legalName: "Fintwiz Pvt Ltd",
  domain: "fintwizwealth.com",
  tagline: "SEBI-registered Portfolio Management Service distributor",

  description:
    "Fintwiz Wealth is a SEBI and APMI registered PMS distributor (APRN 09563). We shortlist SEBI-registered portfolio managers against your mandate and run your onboarding. The portfolio manager manages the money, not us.",

  shortDescription:
    "A SEBI-registered PMS distributor. We help you compare and onboard with SEBI-registered portfolio managers.",

  registration: {
    /** The ONLY registration number that may appear on this domain. */
    number: "APRN 09563",
    authority: "APMI",
    authorityLong: "Association of Portfolio Managers in India",
    validFrom: "05 June 2026",
    validTo: "04 June 2029",
    bseEnlistment: "7156",
  },

  officer: {
    name: "Nihar Dutia",
    roles: [
      "Principal Officer",
      "Grievance Officer",
      "Compliance Officer",
    ] as const,
    roleLine: "Principal Officer, Grievance Officer and Compliance Officer",
    credentials: [
      "NISM Certified",
      "PGDM, Finance",
    ] as const,
    bio: "Nihar is accountable for the accuracy of the portfolio manager roster, the disclosures published on this site, and the handling of every investor grievance raised through it. He holds a PGDM in Finance and is NISM certified.",
  },

  /**
   * TODO(client): role addresses are derived from the domain and are placeholders.
   * Confirm or replace before launch. SEBI expects a published, monitored
   * grievance address, so this cannot ship unverified.
   */
  contact: {
    general: "hello@fintwizwealth.com",
    grievance: "grievance@fintwizwealth.com",
    compliance: "compliance@fintwizwealth.com",
    phone: null as string | null,
    address: null as string | null,
    responseWindow: "We reply to every enquiry within one working day.",
    grievanceWindow:
      "Grievances are acknowledged within 24 hours and resolved within 21 calendar days.",
  },

  /** PMS minimum is set by SEBI, not by Fintwiz Wealth. */
  pmsMinimum: {
    display: "₹50 lakh",
    numeric: 5000000,
    note: "Statutory minimum investment for Portfolio Management Services, set by SEBI.",
  },

  nav: [
    { href: "/what-is-pms", label: "What is PMS" },
    { href: "/portfolio-managers", label: "Portfolio Managers" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/fees-and-disclosures", label: "Fees & Disclosures" },
    { href: "/contact", label: "Contact" },
  ] as const,

  footerNav: {
    site: [
      { href: "/what-is-pms", label: "What is PMS" },
      { href: "/portfolio-managers", label: "Portfolio Managers" },
      { href: "/how-it-works", label: "How It Works" },
      { href: "/fees-and-disclosures", label: "Fees & Disclosures" },
      { href: "/contact", label: "Contact" },
    ],
    regulatory: [
      { href: "https://www.sebi.gov.in", label: "SEBI", external: true },
      {
        href: "https://scores.sebi.gov.in",
        label: "SEBI SCORES",
        external: true,
      },
      {
        href: "https://smartodr.in",
        label: "SMART ODR Portal",
        external: true,
      },
      { href: "https://www.apmiindia.org", label: "APMI", external: true },
    ],
    company: [
      { href: "/fees-and-disclosures#disclaimer", label: "Full Disclosures" },
      { href: "/contact#grievance", label: "Grievance Redressal" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/terms-and-conditions", label: "Terms & Conditions" },
    ],
  },
} as const;

/** Trust strip shown directly under the masthead on every page. */
export const trustPoints = [
  `${site.registration.authority} Registered Distributor`,
  site.registration.number,
  "Distributor, not a portfolio manager",
  "Manager-sourced figures only",
] as const;

/** Home page headline block. Deliberately states the role, not a mood. */
export const hero = {
  eyebrow: `${site.registration.authority} Registered PMS Distributor`,
  headline: "Compare SEBI-registered portfolio managers.",
  headlineAccent: "Invest directly with the one you choose.",
  lead: "Fintwiz Wealth shortlists SEBI-registered portfolio managers against your mandate and runs the onboarding paperwork. Your securities sit in your own demat account and are managed by the portfolio manager you select. We never hold or manage your money.",
  primaryCta: { href: "/portfolio-managers", label: "See the roster" },
  secondaryCta: { href: "/what-is-pms", label: "How PMS actually works" },
} as const;

/** Four-up figure bar under the hero. No figure here is authored by Fintwiz. */
export const heroStats = [
  {
    value: site.registration.number,
    label: `Distributor registration with ${site.registration.authority}`,
    mono: true,
  },
  {
    value: site.pmsMinimum.display,
    label: "SEBI statutory minimum per PMS account",
    mono: false,
  },
  {
    value: "100%",
    label: "Performance figures sourced from the manager's own disclosure",
    mono: false,
  },
  {
    value: "0",
    label: "Stock tips, target prices or trade calls published by us",
    mono: false,
  },
] as const;

export const services = [
  {
    number: "01",
    title: "Mandate and risk profiling",
    body: "A structured conversation about what the capital is for, the horizon it has, and the drawdown you can genuinely sit through. That profile is what the shortlist gets filtered against.",
    icon: "compass",
  },
  {
    number: "02",
    title: "Manager shortlisting",
    body: "We narrow the empanelled roster to two or three managers whose stated strategy, concentration and drawdown history fit your mandate. Not a ranked list of last year's winners.",
    icon: "filter",
  },
  {
    number: "03",
    title: "Onboarding support",
    body: "KYC, the PMS agreement, demat and bank mapping, and the funds transfer. All of it executed directly between you and the portfolio manager, with us doing the chasing.",
    icon: "file-signature",
  },
  {
    number: "04",
    title: "Review and continuity",
    body: "Periodic reviews against the original mandate, help reading the manager's reporting, and a considered view when a manager change is worth discussing.",
    icon: "refresh",
  },
] as const;

export const differentiators = [
  {
    title: "Registered and accountable",
    body: `Registered with ${site.registration.authority} as a PMS distributor under ${site.registration.number}, with a named Principal, Grievance and Compliance Officer published on this site.`,
    icon: "badge-check",
  },
  {
    title: "Paid by the manager, disclosed to you",
    body: "Our commission comes from the portfolio manager, never as a fee billed to you. The band we receive is published before you sign anything.",
    icon: "receipt",
  },
  {
    title: "Every figure traceable",
    body: "We publish no performance number of our own. Anything you see is the manager's own disclosed figure, carries the date it was disclosed, and links to the source document.",
    icon: "link",
  },
  {
    title: "No research, no calls",
    body: "This is a distribution business. No stock tips, no target prices, no entry and exit levels, no trade alerts. Selection and onboarding is the whole service.",
    icon: "shield-off",
  },
] as const;

/** The distributor / manager split. This is the core positioning of the site. */
export const roleSplit = {
  manager: {
    label: "The Portfolio Manager",
    heading: "Manages the money",
    points: [
      "Separately registered with SEBI under the PMS Regulations",
      "Makes every buy and sell decision in your account",
      "Holds your securities in your own name and demat account",
      "Publishes standardised, SEBI-format performance disclosures",
      "Charges you the management and performance fees",
    ],
  },
  distributor: {
    label: site.brand,
    heading: "Helps you choose one",
    points: [
      `Registered with ${site.registration.authority} as a distributor, ${site.registration.number}`,
      "Shortlists and explains manager options against your mandate",
      "Never takes custody of, or discretion over, your money",
      "Publishes no performance figures and no securities advice",
      "Is paid a disclosed commission by the manager, not a fee by you",
    ],
  },
} as const;

export const processSteps = [
  {
    step: "01",
    title: "Tell us what the capital is for",
    body: "Horizon, liquidity needs, existing exposure and the loss you can actually tolerate. A conversation, not a scoring form.",
    duration: "45 to 60 minutes",
  },
  {
    step: "02",
    title: "We return a shortlist of two or three",
    body: "Drawn from the empanelled roster and filtered against your mandate, with the reasoning for each inclusion and each exclusion written down.",
    duration: "3 to 5 working days",
  },
  {
    step: "03",
    title: "You read the disclosures and decide",
    body: "Each manager's SEBI-format disclosure document, side by side, with the fee structure and drawdown history in plain language. The choice is yours alone.",
    duration: "At your pace",
  },
  {
    step: "04",
    title: "We run the onboarding",
    body: "KYC, the PMS agreement, demat and bank mapping, and the transfer. The account is opened in your name, directly with the manager.",
    duration: "7 to 15 working days",
  },
  {
    step: "05",
    title: "Reviews for as long as you hold",
    body: "Scheduled reviews against the original mandate, help interpreting the manager's reporting, and a documented view if a change is worth considering.",
    duration: "Ongoing",
  },
] as const;

export const faqs = [
  {
    q: "Does Fintwiz Wealth manage my money?",
    a: "No. We are a distributor. The portfolio manager you select makes every investment decision and holds your securities in your own demat account. We never take custody of or discretion over your capital.",
  },
  {
    q: "What does it cost me to use Fintwiz Wealth?",
    a: "Nothing directly. We are paid a distribution commission by the portfolio manager. You pay the manager's own management and performance fees, which are set out in their disclosure document. The commission band we receive is disclosed to you before you sign.",
  },
  {
    q: "Why is the minimum ₹50 lakh?",
    a: "That minimum is set by SEBI for all Portfolio Management Services, not by us or by any individual manager. Below that threshold a PMS account cannot legally be opened.",
  },
  {
    q: "Do you publish returns for these managers?",
    a: "We publish no performance figure of our own. Where a figure appears on this site it is the manager's own disclosed number, shown with the date it was disclosed and linked to the source document. For current performance, read the manager's disclosure document.",
  },
  {
    q: "Will you give me stock recommendations?",
    a: "No. This domain carries no research content of any kind. No target prices, no entry or exit levels, no trade setups and no alerts. Securities research is a separate, separately regulated activity.",
  },
  {
    q: "How is PMS different from a mutual fund?",
    a: "A mutual fund pools your money with other investors and issues you units. A PMS holds securities directly in your own name in your own demat account, with a portfolio built for your account specifically. You can see every underlying holding and every transaction.",
  },
  {
    q: "Can I move to a different portfolio manager later?",
    a: "Yes. A PMS account can be closed or transferred subject to the terms in your agreement with that manager, including any applicable exit load. We will help you work through the implications before you act.",
  },
  {
    q: "How do I raise a complaint?",
    a: `Write to our Grievance Officer at ${"grievance@fintwizwealth.com"}. We acknowledge within 24 hours and resolve within 21 calendar days. If you are not satisfied, you can escalate to SEBI through the SCORES portal or the SMART ODR platform, both linked in the footer.`,
  },
] as const;
