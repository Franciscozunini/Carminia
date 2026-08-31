import type { FactoringInputs, FactoringAnalysis } from "./types";
import { round } from "./costPerMile";

/**
 * Analyze what a driver actually pays to factor, and how much they overpay
 * versus a best-in-class benchmark rate.
 *
 * This is the piece generic calculators skip. We surface three things they
 * don't: (1) the ALL-IN effective rate once ACH and portal fees are added,
 * (2) the true annualized cost (APR) of buying your money early, and
 * (3) the dollars overpaid per year vs. a realistic cheaper program.
 */
export function analyzeFactoring(input: FactoringInputs): FactoringAnalysis {
  const volume = Math.max(0, input.monthlyVolume);
  const rate = Math.max(0, input.ratePercent);
  const invoices = Math.max(0, input.invoicesPerMonth);
  const achFee = Math.max(0, input.achFeePerInvoice);
  const other = Math.max(0, input.otherMonthlyFees);
  const days = input.daysToPay > 0 ? input.daysToPay : 40;
  const benchmark = Math.max(0, input.benchmarkRatePercent);

  const monthlyDiscountCost = volume * (rate / 100);
  const monthlyAchCost = invoices * achFee;
  const monthlyFactoringCost = monthlyDiscountCost + monthlyAchCost + other;
  const annualFactoringCost = monthlyFactoringCost * 12;

  // Effective all-in rate = total monthly cost as a % of volume factored.
  const effectiveRatePercent = volume > 0 ? (monthlyFactoringCost / volume) * 100 : 0;

  // APR: paying `effectiveRate` to get money `days` early annualizes by 365/days.
  const effectiveApr = (effectiveRatePercent / 100) * (365 / days) * 100;

  // Benchmark assumes a clean flat-rate program with no separate ACH fee.
  const benchmarkMonthlyCost = volume * (benchmark / 100);
  const monthlyOverpayment = Math.max(0, monthlyFactoringCost - benchmarkMonthlyCost);
  const annualOverpayment = monthlyOverpayment * 12;

  // "Meaningfully" overpaying = at least $50/mo AND effective rate is above
  // benchmark by a non-trivial margin. Avoids nagging over rounding noise.
  const isOverpaying =
    monthlyOverpayment >= 50 && effectiveRatePercent > benchmark + 0.15;

  return {
    monthlyDiscountCost: round(monthlyDiscountCost),
    monthlyAchCost: round(monthlyAchCost),
    monthlyFactoringCost: round(monthlyFactoringCost),
    annualFactoringCost: round(annualFactoringCost),
    effectiveApr: round(effectiveApr, 1),
    benchmarkMonthlyCost: round(benchmarkMonthlyCost),
    monthlyOverpayment: round(monthlyOverpayment),
    annualOverpayment: round(annualOverpayment),
    effectiveRatePercent: round(effectiveRatePercent, 2),
    isOverpaying,
  };
}

/**
 * Factoring cost expressed as cents added to every mile you drive — the fusion
 * that lets the dashboard fold factoring into your break-even rate.
 */
export function factoringCentsPerMile(
  monthlyFactoringCost: number,
  monthlyMiles: number
): number {
  if (monthlyMiles <= 0) return 0;
  return round((monthlyFactoringCost / monthlyMiles) * 100, 1);
}
