/* compliance-allow: research-language
   The terms have to enumerate the research activities this domain does not
   carry out in order to disclaim them, so that rule is waived for this file. */

import { site } from "../site";

/**
 * Privacy policy and terms.
 *
 * TODO(client): both documents need review by your compliance adviser before
 * launch, and the registered office address has to be inserted where marked.
 * They are drafted to be accurate about what this site actually does rather
 * than copied from a generic template.
 */

export const LEGAL_UPDATED = "11 September 2026";

export type LegalSection = {
  id: string;
  title: string;
  body: readonly string[];
  list?: readonly string[];
};

export const privacySections: readonly LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: [
      `${site.legalName}, operating as ${site.brand}, is a distributor of Portfolio Management Services registered with the ${site.registration.authorityLong} under ${site.registration.number}. This policy covers ${site.domain} and any enquiry you send through it.`,
      `${site.officer.name} is our Grievance Officer for data protection matters and can be reached at ${site.contact.grievance}.`,
    ],
  },
  {
    id: "what-we-collect",
    title: "What we collect",
    body: [
      "We collect only what you give us, and only what we need in order to reply usefully. We do not buy personal data, and we do not run tracking that follows you across other websites.",
      "When you submit the enquiry form, we collect:",
    ],
    list: [
      "Your name and email address, so that we can reply",
      "Your telephone number, if you choose to provide it",
      "The nature of your enquiry and the approximate amount you are considering, so that we can tell you quickly whether PMS is suitable at all",
      "The message you write",
      "The date and time of submission, and the IP address the request came from, which is used to rate limit the form against abuse",
    ],
  },
  {
    id: "why-we-collect",
    title: "Why we collect it",
    body: [
      "We process your details on the basis of the consent you give when submitting the form, and in order to take steps at your request before entering into any arrangement.",
      "We use the information to respond to your enquiry, to prepare a shortlist of portfolio managers if you ask for one, and to keep records of our own regulatory compliance as a registered distributor.",
      "We do not use your information for automated decision making, and we do not use it to build an advertising profile.",
    ],
  },
  {
    id: "sharing",
    title: "Who we share it with",
    body: [
      "We share your personal data with a portfolio manager only when you have asked us to begin onboarding with that specific manager, and only to the extent needed to open your account. We will tell you before we do this.",
      "We use service providers for email delivery and website hosting, who process data on our instructions and are not permitted to use it for their own purposes.",
      "We disclose personal data to a regulator, court or law enforcement authority where we are legally required to do so.",
      "We do not sell your personal data, and we do not share it with third parties for their own marketing.",
    ],
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: [
      "Enquiries that do not proceed are retained for twenty four months and then deleted, so that we can recognise you if you return to the conversation.",
      "Where you become a client, records are retained for the period required by applicable securities and tax law, which is generally eight years from the end of the relationship.",
      "Grievance records are retained for the period required by the applicable SEBI and APMI grievance handling requirements.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    body: [
      "Under the Digital Personal Data Protection Act, 2023, you have the right to ask us for a summary of the personal data we hold about you, to have inaccurate data corrected, to have data erased where we no longer have a reason to keep it, and to withdraw the consent you gave.",
      "You may also nominate another individual to exercise these rights on your behalf in the event of death or incapacity.",
      `To exercise any of these rights, write to ${site.contact.grievance}. We will respond within thirty days. Withdrawing consent does not affect anything we did lawfully before you withdrew it, and may mean we can no longer help with your enquiry.`,
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    body: [
      "This website sets no advertising cookies and runs no cross-site tracking.",
      "Your choice of light or dark appearance is stored in your browser's local storage on your own device. It is never transmitted to us and is not personal data.",
      "If analytics are added in future, this policy will be updated before they are switched on, and the section will say exactly what is collected.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "The site is served over HTTPS, and enquiry submissions are encrypted in transit. Access to enquiry records is limited to the people who need it in order to respond.",
      "No system is perfectly secure. Please do not send bank account details, passwords, or complete identity document numbers through the enquiry form. Nothing in our process requires you to.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: [
      `This policy was last updated on ${LEGAL_UPDATED}. If we make a material change we will update the date at the top of this page, and where the change affects how we use data you have already given us, we will contact you directly.`,
    ],
  },
];

export const termsSections: readonly LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of these terms",
    body: [
      `These terms govern your use of ${site.domain}. By using the site you accept them. If you do not accept them, please do not use the site.`,
      `The site is operated by ${site.legalName}, a distributor of Portfolio Management Services registered with ${site.registration.authority} under ${site.registration.number}.`,
    ],
  },
  {
    id: "nature-of-site",
    title: "What this site is",
    body: [
      "This website is informational. It explains what Portfolio Management Services are, lists SEBI-registered portfolio managers by way of illustration, and describes the process by which we help you select and onboard with one of them. Managers shown on the roster are not yet confirmed as empanelled partners.",
      `${site.brand} is a distributor. We do not manage portfolios, we do not hold client funds or securities, and we have no discretion over any client account.`,
    ],
  },
  {
    id: "no-advice",
    title: "No investment advice",
    body: [
      "Nothing on this site is investment advice, a recommendation, or an offer or solicitation to buy or sell any security or to invest in any strategy.",
      "This domain publishes no research reports, target prices, entry, stop-loss or target levels, trade setups or trading alerts. Securities research is a separately regulated activity and is not conducted on this domain.",
      "You should read the portfolio manager's own disclosure document and, where appropriate, take independent professional advice before making any investment decision. Every investment decision is yours.",
    ],
  },
  {
    id: "performance",
    title: "Performance information",
    body: [
      `${site.brand} authors no performance figures. Any figure appearing on this site is the portfolio manager's own disclosed figure, is presented with the date as of which they disclosed it, and links to their source document.`,
      "Past performance is not indicative of future results. Investments in securities markets are subject to market risk, including the loss of the amount invested.",
    ],
  },
  {
    id: "third-party",
    title: "Third-party links and content",
    body: [
      "This site links to documents and websites published by portfolio managers, by SEBI, and by other third parties. We do not control that content and we are not responsible for its accuracy or availability.",
      "Inclusion of a portfolio manager on our roster, or a link to their disclosure document, is not an endorsement or a recommendation of that manager.",
    ],
  },
  {
    id: "accuracy",
    title: "Accuracy and availability",
    body: [
      "We take reasonable care that the information on this site is accurate at the time of publication, but we do not warrant that it is complete, current or error free. Regulatory positions and manager information change.",
      "We may change, suspend or withdraw any part of the site at any time without notice.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    body: [
      `The text, design, diagrams and code on this site are owned by ${site.legalName}, except where stated otherwise. You may read, print and share pages for your own personal or internal business use.`,
      "You may not republish, sell, or systematically extract content from this site without written permission. Photographs are licensed from third parties and are credited below, and their licences govern their reuse rather than these terms.",
      "Portfolio manager names and registration numbers are the property of those firms and appear here for identification only.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, we are not liable for any investment loss arising from a decision you take, whether or not information on this site formed part of your reasoning. The investment decision, and the appointment of a portfolio manager, are yours.",
      "We are not liable for indirect or consequential loss, or for loss of profit, arising from use of this site.",
      "Nothing in these terms limits any liability that cannot lawfully be limited, including liability for fraud, and nothing here limits your rights or our obligations under the SEBI and APMI framework applicable to distributors.",
    ],
  },
  {
    id: "grievances",
    title: "Grievances",
    body: [
      `${site.officer.name} is our Grievance Officer. ${site.contact.grievanceWindow} Complaints may be sent to ${site.contact.grievance}.`,
      "Unresolved complaints may be escalated to SEBI through the SCORES portal, or to the SMART ODR platform for online dispute resolution. Both are linked in the footer of every page.",
      "Complaints about how a portfolio is managed, its performance, or the fees charged for managing it, must be raised with the portfolio manager holding your mandate.",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law",
    body: [
      "These terms are governed by the laws of India. The courts at the place of our registered office have exclusive jurisdiction over any dispute arising from them.",
      "TODO(client): insert the registered office city once the address is confirmed.",
    ],
  },
  {
    id: "changes-terms",
    title: "Changes to these terms",
    body: [
      `These terms were last updated on ${LEGAL_UPDATED}. Continued use of the site after a change constitutes acceptance of the revised terms.`,
    ],
  },
];
