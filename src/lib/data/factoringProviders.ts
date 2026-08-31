import type { FactoringProvider } from "./providerTypes";

/**
 * Factoring provider dataset.
 *
 * HONESTY POLICY (enforced by the team, not the compiler):
 *  - Provider names, products, and official URLs are verifiable facts.
 *  - Every NUMERIC TERM below is "UNKNOWN" until a human confirms it against
 *    the provider's own public materials and sets `lastVerified`.
 *  - Affiliate/referral fields reflect only what each program publicly states.
 *    We have NOT yet been accepted into any program, so no status is
 *    "CONFIRMED". Argentina-based publisher acceptance is unverified.
 *
 * To fill a value: read the provider's page, replace "UNKNOWN", add a SourceRef
 * with today's date, and bump `lastVerified`. Do not paste numbers from
 * third-party listicles — go to the source.
 */

const TODAY = "2026-08-31";

export const factoringProviders: FactoringProvider[] = [
  {
    category: "factoring",
    slug: "summar-financial",
    name: "Summar Financial",
    product: "Freight factoring",
    summary:
      "Freight factoring company that runs a public referral program advertising recurring commissions — our lead monetization candidate, pending publisher verification.",
    advertisedRate: "UNKNOWN",
    advanceRate: "UNKNOWN",
    recourse: "UNKNOWN",
    contractTerm: "UNKNOWN",
    terminationFee: "UNKNOWN",
    achFee: "UNKNOWN",
    minimums: "UNKNOWN",
    otherFees: "UNKNOWN",
    fundingSpeed: "UNKNOWN",
    newAuthorityFriendly: "unclear",
    fuelCardOffered: "unclear",
    affiliate: {
      status: "PENDING",
      commission:
        "Public referral program advertises 10% of factoring fees every month the referral factors (recurring). Not yet verified for our account.",
      network: "Direct / referral",
      internationalPublisher: "unclear",
      payoutMethods: "Public program mentions monthly check or wire transfer",
      notes:
        "PRIORITY VERIFY: confirm an Argentina-based content publisher (not a dispatcher/agent) can enroll, how attribution/tracking works, W-8BEN handling, and whether payout by wire/Wise/PayPal is available. Only then move to CONFIRMED.",
    },
    sources: [
      {
        label: "Summar Financial — Freight Factoring Referrals (public program page)",
        url: "https://summar.com/freight-referrals/",
        retrieved: TODAY,
      },
    ],
    lastVerified: TODAY,
  },
  {
    category: "factoring",
    slug: "porter-freight-funding",
    name: "Porter Freight Funding",
    product: "Freight factoring",
    summary:
      "Owner-operator-focused factoring with a public referral program paying a flat bounty per funded referral.",
    advertisedRate: "UNKNOWN",
    advanceRate: "UNKNOWN",
    recourse: "UNKNOWN",
    contractTerm: "UNKNOWN",
    terminationFee: "UNKNOWN",
    achFee: "UNKNOWN",
    minimums: "UNKNOWN",
    otherFees: "UNKNOWN",
    fundingSpeed: "UNKNOWN",
    newAuthorityFriendly: "unclear",
    fuelCardOffered: "unclear",
    affiliate: {
      status: "PENDING",
      commission:
        "Public referral program advertises a flat cash reward per funded referral. Not yet verified for our account.",
      network: "Direct / referral",
      internationalPublisher: "unclear",
      payoutMethods: "UNKNOWN",
      notes:
        "Flat bounty is simpler to attribute than recurring, but confirm content-publisher eligibility and international payout before relying on it.",
    },
    sources: [
      {
        label: "Porter Freight Funding — Referral Program (public program page)",
        url: "https://porterfreightfunding.com/freight-factoring-referral-program/",
        retrieved: TODAY,
      },
    ],
    lastVerified: TODAY,
  },
  {
    category: "factoring",
    slug: "bobtail",
    name: "Bobtail",
    product: "Freight factoring",
    summary:
      "Technology-forward factoring with a public referral/affiliate program tied to a factored-volume threshold.",
    advertisedRate: "UNKNOWN",
    advanceRate: "UNKNOWN",
    recourse: "UNKNOWN",
    contractTerm: "UNKNOWN",
    terminationFee: "UNKNOWN",
    achFee: "UNKNOWN",
    minimums: "UNKNOWN",
    otherFees: "UNKNOWN",
    fundingSpeed: "UNKNOWN",
    newAuthorityFriendly: "unclear",
    fuelCardOffered: "unclear",
    affiliate: {
      status: "PENDING",
      commission:
        "Public program rewards referrals that reach a factored-volume threshold. Structure and amount not yet verified for our account.",
      network: "Direct / referral",
      internationalPublisher: "unclear",
      payoutMethods: "UNKNOWN",
      notes: "Read the referral terms page in full; confirm tracking mechanism.",
    },
    sources: [
      {
        label: "Bobtail — Referral Program Terms (public page)",
        url: "https://www.bobtail.com/referral-program-terms/",
        retrieved: TODAY,
      },
    ],
    lastVerified: TODAY,
  },
  {
    category: "factoring",
    slug: "rts-financial",
    name: "RTS Financial",
    product: "Freight factoring",
    summary:
      "Large, established freight factoring provider frequently cited for competitive rates and high advances. Terms unverified from source.",
    advertisedRate: "UNKNOWN",
    advanceRate: "UNKNOWN",
    recourse: "UNKNOWN",
    contractTerm: "UNKNOWN",
    terminationFee: "UNKNOWN",
    achFee: "UNKNOWN",
    minimums: "UNKNOWN",
    otherFees: "UNKNOWN",
    fundingSpeed: "UNKNOWN",
    newAuthorityFriendly: "unclear",
    fuelCardOffered: "unclear",
    affiliate: {
      status: "UNKNOWN",
      commission: "UNKNOWN",
      network: "UNKNOWN",
      internationalPublisher: "unclear",
      payoutMethods: "UNKNOWN",
      notes: "Check whether RTS runs a partner/referral program at all.",
    },
    sources: [
      {
        label: "RTS Financial — official site",
        url: "https://www.rtsinc.com/",
        retrieved: TODAY,
      },
    ],
    lastVerified: TODAY,
  },
  {
    category: "factoring",
    slug: "otr-solutions",
    name: "OTR Solutions",
    product: "Freight factoring",
    summary:
      "Carrier-focused factoring provider. Terms and referral program unverified from source.",
    advertisedRate: "UNKNOWN",
    advanceRate: "UNKNOWN",
    recourse: "UNKNOWN",
    contractTerm: "UNKNOWN",
    terminationFee: "UNKNOWN",
    achFee: "UNKNOWN",
    minimums: "UNKNOWN",
    otherFees: "UNKNOWN",
    fundingSpeed: "UNKNOWN",
    newAuthorityFriendly: "unclear",
    fuelCardOffered: "unclear",
    affiliate: {
      status: "UNKNOWN",
      commission: "UNKNOWN",
      network: "UNKNOWN",
      internationalPublisher: "unclear",
      payoutMethods: "UNKNOWN",
      notes: "Investigate partner program and international eligibility.",
    },
    sources: [
      {
        label: "OTR Solutions — official site",
        url: "https://otrsolutions.com/",
        retrieved: TODAY,
      },
    ],
    lastVerified: TODAY,
  },
  {
    category: "factoring",
    slug: "triumph",
    name: "Triumph",
    product: "Freight factoring",
    summary:
      "Established freight factoring provider with a public referral partner page. Terms unverified from source.",
    advertisedRate: "UNKNOWN",
    advanceRate: "UNKNOWN",
    recourse: "UNKNOWN",
    contractTerm: "UNKNOWN",
    terminationFee: "UNKNOWN",
    achFee: "UNKNOWN",
    minimums: "UNKNOWN",
    otherFees: "UNKNOWN",
    fundingSpeed: "UNKNOWN",
    newAuthorityFriendly: "unclear",
    fuelCardOffered: "unclear",
    affiliate: {
      status: "PENDING",
      commission: "Public referral partner program exists; terms not yet verified.",
      network: "Direct / referral",
      internationalPublisher: "unclear",
      payoutMethods: "UNKNOWN",
      notes: "Confirm program details and publisher eligibility.",
    },
    sources: [
      {
        label: "Triumph — Referral Partners (public page)",
        url: "https://triumph.io/about-us/referral-partners/",
        retrieved: TODAY,
      },
    ],
    lastVerified: TODAY,
  },
];

export function getFactoringProvider(slug: string): FactoringProvider | undefined {
  return factoringProviders.find((p) => p.slug === slug);
}

export function factoringProviderSlugs(): string[] {
  return factoringProviders.map((p) => p.slug);
}
