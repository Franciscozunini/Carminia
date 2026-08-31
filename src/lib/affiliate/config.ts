/**
 * Affiliate/link configuration — the single place that decides whether an
 * outbound link earns money and how it is rendered.
 *
 * Design goals:
 *  - No affiliate URL is hardcoded in a component. Components ask this module.
 *  - Until a program is CONFIRMED, we link to the provider's plain public URL
 *    (no tracking), and the UI shows an honest label. We never present an
 *    unconfirmed link as a paid placement.
 *  - Adding a real affiliate link later = one edit here, nothing in the UI.
 */

import type { AffiliateStatus } from "@/lib/data/providerTypes";

export interface AffiliateLink {
  /** The provider slug this applies to. */
  slug: string;
  status: AffiliateStatus;
  /** Plain, non-tracking destination (always safe to show). */
  publicUrl: string;
  /** Tracking URL, ONLY set once a program is CONFIRMED. */
  trackingUrl?: string;
}

/**
 * Registry. `status` here is the monetization source of truth for links; it
 * should mirror the provider record's affiliate.status. No trackingUrl is set
 * for anything not CONFIRMED.
 */
const links: Record<string, AffiliateLink> = {
  "summar-financial": {
    slug: "summar-financial",
    status: "PENDING",
    publicUrl: "https://summar.com/freight-referrals/",
  },
  "porter-freight-funding": {
    slug: "porter-freight-funding",
    status: "PENDING",
    publicUrl: "https://porterfreightfunding.com/freight-factoring-referral-program/",
  },
  bobtail: {
    slug: "bobtail",
    status: "PENDING",
    publicUrl: "https://www.bobtail.com/",
  },
  "rts-financial": {
    slug: "rts-financial",
    status: "UNKNOWN",
    publicUrl: "https://www.rtsinc.com/",
  },
  "otr-solutions": {
    slug: "otr-solutions",
    status: "UNKNOWN",
    publicUrl: "https://otrsolutions.com/",
  },
  triumph: {
    slug: "triumph",
    status: "PENDING",
    publicUrl: "https://triumph.io/",
  },
};

export function getAffiliateLink(slug: string): AffiliateLink | undefined {
  return links[slug];
}

/** Resolve the URL to actually use: tracking if confirmed, else the plain URL. */
export function resolveOutboundUrl(slug: string): string | undefined {
  const link = links[slug];
  if (!link) return undefined;
  if (link.status === "CONFIRMED" && link.trackingUrl) return link.trackingUrl;
  return link.publicUrl;
}

/** True only when a real, paid, tracked relationship is live. */
export function isMonetized(slug: string): boolean {
  const link = links[slug];
  return !!link && link.status === "CONFIRMED" && !!link.trackingUrl;
}

/** rel attribute: sponsored only when actually monetized; nofollow otherwise. */
export function linkRel(slug: string): string {
  return isMonetized(slug)
    ? "sponsored noopener noreferrer"
    : "nofollow noopener noreferrer";
}
