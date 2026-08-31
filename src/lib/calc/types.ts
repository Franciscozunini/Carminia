/**
 * Core domain types for the Owner-Operator Money engine.
 *
 * All money is expressed in US dollars, all distances in miles, all fuel in
 * US gallons. The engine is pure: given the same inputs it always returns the
 * same outputs, and it never reads global state, storage, or the network.
 */

/** A truck's steady-state monthly economics. Everything the engine needs. */
export interface CostProfile {
  // --- Operations ---
  /** Total miles driven per month (loaded + deadhead/empty). */
  monthlyMiles: number;
  /** Share of total miles run empty, 0–100. Deadhead earns nothing but costs fuel + wear. */
  deadheadPercent: number;
  /** Average fuel economy, miles per gallon. */
  mpg: number;
  /** Diesel price, US dollars per gallon. */
  dieselPrice: number;

  // --- Fixed monthly costs ($/month) ---
  truckPayment: number;
  trailerPayment: number;
  /** Physical damage + liability + cargo, monthly. */
  insurance: number;
  /** Base plate, IFTA, permits, prorated monthly. */
  permits: number;
  /** ELD hardware/subscription, monthly. */
  eldMonthly: number;
  /** Load board subscription(s), monthly. */
  loadBoardMonthly: number;
  /** Any other fixed monthly overhead (parking, phone, accounting, etc.). */
  otherFixedMonthly: number;

  // --- Variable costs ($/mile) ---
  /** Maintenance + repairs reserve, per mile. */
  maintenancePerMile: number;
  /** Tire reserve, per mile. */
  tiresPerMile: number;
  /** Tolls, averaged per mile. */
  tollsPerMile: number;

  // --- Deductions taken as a % of revenue ---
  /** Dispatch service fee, % of gross revenue (0 if self-dispatched). */
  dispatchPercent: number;
  /** Factoring fee, % of factored revenue. See FactoringInputs for detail. */
  factoringPercent: number;

  // --- Revenue ---
  /** Gross revenue per month, before any deductions. */
  monthlyGrossRevenue: number;
}

export interface CostBreakdown {
  fuelCostPerMile: number;
  variableCostPerMile: number; // fuel + maintenance + tires + tolls
  fixedMonthly: number;
  fixedCostPerMile: number; // fixed allocated across total miles
  dispatchMonthly: number;
  factoringMonthly: number; // simple % model; the analyzer refines this
  totalMonthlyCost: number;
  totalCostPerMile: number; // per TOTAL mile (loaded + deadhead)
  loadedMiles: number;
  /**
   * Break-even rate you must AVERAGE on loaded miles to cover everything.
   * Deadhead-aware: empty miles are spread onto the miles that actually pay.
   */
  breakEvenLoadedRate: number;
  revenuePerTotalMile: number;
  monthlyOperatingProfit: number;
  annualOperatingProfit: number;
  /** Largest single cost bucket, for "where the money goes" callouts. */
  topCostDriver: { key: string; label: string; monthly: number };
}

export interface FactoringInputs {
  /** Dollars of invoices factored per month. */
  monthlyVolume: number;
  /** Advertised discount/factoring rate, % of invoice. */
  ratePercent: number;
  /** Number of invoices factored per month (drives per-invoice ACH fees). */
  invoicesPerMonth: number;
  /** ACH/transfer fee charged per invoice, $. */
  achFeePerInvoice: number;
  /** Any other fixed monthly factoring fees (portal, minimums), $. */
  otherMonthlyFees: number;
  /** Days until the broker would have paid you without factoring (for APR). */
  daysToPay: number;
  /** Best-in-class benchmark rate to compare against, % (see benchmarks.ts). */
  benchmarkRatePercent: number;
}

export interface FactoringAnalysis {
  monthlyDiscountCost: number; // volume * rate%
  monthlyAchCost: number; // invoices * achFee
  monthlyFactoringCost: number; // discount + ach + other
  annualFactoringCost: number;
  /** True annualized cost of the cash-acceleration, as an APR. */
  effectiveApr: number;
  benchmarkMonthlyCost: number;
  /** How much more you pay than the benchmark, per month (floored at 0). */
  monthlyOverpayment: number;
  annualOverpayment: number;
  /** Effective all-in rate you actually pay, % of volume. */
  effectiveRatePercent: number;
  /** Whether the current setup is meaningfully above benchmark. */
  isOverpaying: boolean;
}

export interface LoadInputs {
  /** Total the load pays (linehaul + fuel surcharge + accessorials), $. */
  payout: number;
  /** Paid/loaded miles. */
  loadedMiles: number;
  /** Empty miles to get to the pickup. */
  deadheadMiles: number;
}

export type LoadVerdict = "GO" | "BORDERLINE" | "NO_GO";

export interface LoadEvaluation {
  totalMiles: number;
  fuelCost: number;
  variableCost: number;
  fixedCostAllocated: number;
  dispatchCost: number;
  factoringCost: number;
  totalCost: number;
  netProfit: number;
  /** Revenue / TOTAL miles (the honest number — includes deadhead). */
  allInRatePerMile: number;
  /** Revenue / loaded miles (what brokers quote). */
  loadedRatePerMile: number;
  /** All-in RPM at which this specific load breaks even. */
  breakEvenAllInRate: number;
  /** Minimum payout to clear your target margin. */
  minPayoutForTarget: number;
  marginPercent: number;
  verdict: LoadVerdict;
  /** Plain-language reasons a driver can act on, most important first. */
  reasons: string[];
}
