/**
 * Reference values used by the calculators. These are DEFAULTS and BENCHMARKS,
 * not claims about any specific provider. Each carries a rationale so the
 * methodology page can explain exactly where it comes from, and each is easy to
 * change in one place as the market moves.
 *
 * None of these are presented to the user as fact about a company. They are
 * transparent assumptions the driver can override in the tool.
 */

export interface Benchmark {
  value: number;
  label: string;
  rationale: string;
  /** Set true when sourced/verified; false while it is an editorial placeholder. */
  verified: boolean;
}

export const FACTORING_BENCHMARK_RATE: Benchmark = {
  value: 2.0,
  label: "Competitive flat factoring rate (%)",
  rationale:
    "Editorial benchmark for a lean, flat-rate program with no separate ACH fee, used only to estimate potential savings. The driver can change it. Not a quote from any provider. VERIFY against current market before treating as authoritative.",
  verified: false,
};

export const DEFAULT_DIESEL_PRICE: Benchmark = {
  value: 3.85,
  label: "Default US diesel price ($/gal)",
  rationale:
    "Editorial placeholder starting value only. Should be wired to the U.S. EIA weekly on-highway diesel average and refreshed automatically. Until then, drivers should overwrite it with today's real price.",
  verified: false,
};

export const DEFAULT_TARGET_MARGIN = 0.15; // 15% net margin target for a "GO".

/** Starting-point profile so the tool is never empty on first load. */
export const STARTER_PROFILE = {
  monthlyMiles: 10000,
  deadheadPercent: 12,
  mpg: 6.5,
  dieselPrice: DEFAULT_DIESEL_PRICE.value,
  truckPayment: 2000,
  trailerPayment: 400,
  insurance: 1100,
  permits: 250,
  eldMonthly: 40,
  loadBoardMonthly: 45,
  otherFixedMonthly: 400,
  maintenancePerMile: 0.17,
  tiresPerMile: 0.04,
  tollsPerMile: 0.03,
  dispatchPercent: 0,
  factoringPercent: 3,
  monthlyGrossRevenue: 21000,
};

/** Starting-point factoring inputs, consistent with STARTER_PROFILE. */
export const STARTER_FACTORING = {
  monthlyVolume: 21000,
  ratePercent: 3,
  invoicesPerMonth: 18,
  achFeePerInvoice: 12,
  otherMonthlyFees: 0,
  daysToPay: 40,
  benchmarkRatePercent: FACTORING_BENCHMARK_RATE.value,
};
