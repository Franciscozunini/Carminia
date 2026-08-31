/**
 * Structured schema for every service provider we compare (factoring first,
 * then load boards, ELDs, insurance, fuel cards). Fields are intentionally
 * explicit so a non-developer can update the data file by hand.
 *
 * RULE: never invent a value. If a figure is not confirmed from the provider's
 * own public materials, use the string "UNKNOWN". The UI renders "UNKNOWN"
 * literally so readers can see exactly what we have and haven't verified.
 */

export type Unknownable<T> = T | "UNKNOWN";

/** Whether we can actually earn (and be paid) as a publisher for this program. */
export type AffiliateStatus =
  | "CONFIRMED" // We have an active, accepted publisher account and payout path.
  | "PENDING" // Applied / in review, or terms seen but not yet accepted.
  | "UNKNOWN"; // Not yet investigated or no public program found.

export type RecourseType = Unknownable<"recourse" | "non-recourse" | "both">;

export type ServiceCategory =
  | "factoring"
  | "load-board"
  | "eld"
  | "insurance"
  | "fuel-card";

export interface AffiliateInfo {
  status: AffiliateStatus;
  /** Human-readable commission description, or "UNKNOWN". Never fabricated. */
  commission: Unknownable<string>;
  /** Network or program name (e.g., "Direct / referral", "Impact", "PartnerStack"). */
  network: Unknownable<string>;
  /** Does the public program state it accepts non-US / international publishers? */
  internationalPublisher: Unknownable<"yes" | "no" | "unclear">;
  /** Stated payout methods (e.g., "PayPal, Wise", "US bank ACH", "check/wire"). */
  payoutMethods: Unknownable<string>;
  /** Internal notes for the operator — verification to-dos, caveats. */
  notes?: string;
}

export interface SourceRef {
  label: string;
  url: string;
  /** ISO date (YYYY-MM-DD) the figure was last read from this source. */
  retrieved: string;
}

export interface FactoringProvider {
  category: "factoring";
  /** URL-safe id, used as /factoring/[provider]. */
  slug: string;
  name: string;
  product: string;
  /** One-line neutral positioning. */
  summary: string;

  // --- Structured comparison fields ---
  advertisedRate: Unknownable<string>; // e.g., "1.5%–3.5%" or "2% flat"
  advanceRate: Unknownable<string>; // e.g., "up to 97%"
  recourse: RecourseType;
  contractTerm: Unknownable<string>; // e.g., "month-to-month", "12 months"
  terminationFee: Unknownable<string>;
  achFee: Unknownable<string>; // per-invoice funding fee
  minimums: Unknownable<string>; // monthly minimums / volume commitments
  otherFees: Unknownable<string>;
  fundingSpeed: Unknownable<string>; // e.g., "same day", "24h"
  newAuthorityFriendly: Unknownable<"yes" | "no" | "unclear">;
  fuelCardOffered: Unknownable<"yes" | "no" | "unclear">;

  affiliate: AffiliateInfo;
  sources: SourceRef[];
  /** ISO date this whole record was last verified end-to-end. */
  lastVerified: string;
}
