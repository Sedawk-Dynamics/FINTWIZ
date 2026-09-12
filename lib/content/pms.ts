import { site } from "../site";

/** Copy for /what-is-pms. Plain language first, regulation second. */

export const pmsPage = {
  eyebrow: "Understanding PMS",
  title: "A portfolio built for one account. Yours.",
  lead: "Portfolio Management Services is the least-explained product in Indian wealth management, usually because explaining it plainly makes the fee conversation harder. Here is the plain version.",
} as const;

export const definition = {
  eyebrow: "The short version",
  title: "You open an account in your own name. A licensed manager runs it.",
  body: [
    "In a Portfolio Management Service, you open a demat and trading account in your own name and sign a mandate appointing a SEBI-registered portfolio manager to make the investment decisions in it.",
    "The manager buys and sells securities inside your account. The shares and bonds sit in your demat account, registered to you, and you can see every holding and every transaction at any time.",
    "You are not buying units in a pooled vehicle. You are hiring a manager to run a portfolio that belongs to you.",
  ],
} as const;

/** The structural difference, which is the part most people get wrong. */
export const structureComparison = {
  mutualFund: {
    label: "Mutual fund",
    tone: "neutral" as const,
    stages: [
      {
        title: "Your money joins a pool",
        body: "Your investment is combined with money from thousands of other investors into a single scheme.",
      },
      {
        title: "The scheme owns the securities",
        body: "The shares and bonds are held by the scheme, in the scheme's name, through its custodian.",
      },
      {
        title: "You hold units",
        body: "You own units representing a share of the pool. You see a NAV, not a list of your shares.",
      },
    ],
    footnote:
      "Entry is possible from a few hundred rupees. Decisions are made for the scheme as a whole, never for you individually.",
  },
  pms: {
    label: "Portfolio Management Service",
    tone: "azure" as const,
    stages: [
      {
        title: "Your money stays yours",
        body: "You transfer funds into an account opened in your own name. Nothing is pooled with other investors.",
      },
      {
        title: "You own the securities directly",
        body: "Every share and bond bought for you is registered in your name and sits in your own demat account.",
      },
      {
        title: "You see every holding",
        body: "You receive a full statement of holdings and transactions, not a single unit value.",
      },
    ],
    footnote: `Minimum investment is ${site.pmsMinimum.display}, set by SEBI. The portfolio is constructed for your account.`,
  },
} as const;

export const pmsTypes = [
  {
    name: "Discretionary",
    summary:
      "The portfolio manager makes and executes every decision under the mandate you signed, without checking each trade with you.",
    note: "The most common form of PMS in India, and the form most of the strategies on our roster take.",
  },
  {
    name: "Non-discretionary",
    summary:
      "The portfolio manager recommends. You approve each decision before it is executed, so the final call stays with you.",
    note: "Suits investors who want the research capability but will not delegate the trigger.",
  },
  {
    name: "Advisory",
    summary:
      "The portfolio manager advises only. You retain full control and handle execution yourself.",
    note: "Least common, and operationally the most demanding for the investor.",
  },
] as const;

export const suitability = {
  suitedTo: {
    title: "PMS tends to suit you if",
    points: [
      `You can commit at least ${site.pmsMinimum.display} without needing it back inside five years`,
      "You want to see the individual securities you own rather than a single unit value",
      "You can sit through a concentrated portfolio falling harder than the index in a bad year",
      "You already hold a diversified core and are adding a satellite allocation",
      "You want a portfolio constructed for your account rather than for a scheme",
    ],
  },
  notSuitedTo: {
    title: "PMS is probably wrong for you if",
    points: [
      "The capital is an emergency reserve or is earmarked for a near-term commitment",
      "A drawdown of thirty percent or more would force you to exit at the bottom",
      "You want daily liquidity at a published NAV with no exit friction",
      "You are looking for assured or predictable returns",
      "This would be your first and only equity exposure",
    ],
  },
} as const;

export const costsOverview = [
  {
    label: "Management fee",
    body: "A percentage of assets under management, charged by the portfolio manager. Set out in their disclosure document and your agreement.",
  },
  {
    label: "Performance fee",
    body: "A share of returns above a stated hurdle, usually subject to a high-water mark so the same gains are not charged twice.",
  },
  {
    label: "Operating costs",
    body: "Brokerage, custody, demat and statutory charges, incurred inside your account and visible on your statements.",
  },
  {
    label: "Exit load",
    body: "A charge that may apply if you withdraw within a defined period. The terms vary by manager and are in your agreement.",
  },
] as const;
