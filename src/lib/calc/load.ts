import type {
  CostProfile,
  CostBreakdown,
  LoadInputs,
  LoadEvaluation,
  LoadVerdict,
} from "./types";
import { round } from "./costPerMile";

export interface LoadOptions {
  /** Target net margin to clear before a load is a confident "GO", 0–1. */
  targetMargin?: number;
}

const DEFAULT_TARGET_MARGIN = 0.15;

/**
 * Evaluate a single specific load against a saved cost profile — net of the
 * driver's OWN dispatch and factoring cost. This is the daily-use decision:
 * "should I take this load, negotiate it, or skip it?"
 *
 * Unlike generic load calculators, deadhead is charged in full (it burns fuel
 * and wear for zero pay) and factoring is subtracted from the payout, so the
 * verdict reflects money that actually hits the bank.
 */
export function evaluateLoad(
  profile: CostProfile,
  breakdown: CostBreakdown,
  load: LoadInputs,
  options: LoadOptions = {}
): LoadEvaluation {
  const targetMargin = options.targetMargin ?? DEFAULT_TARGET_MARGIN;
  const payout = Math.max(0, load.payout);
  const loadedMiles = Math.max(0, load.loadedMiles);
  const deadheadMiles = Math.max(0, load.deadheadMiles);
  const totalMiles = loadedMiles + deadheadMiles;

  const fuelCost = breakdown.fuelCostPerMile * totalMiles;
  // Non-fuel variable cost per mile (maintenance + tires + tolls).
  const nonFuelVariablePerMile = Math.max(
    0,
    breakdown.variableCostPerMile - breakdown.fuelCostPerMile
  );
  const variableCost = nonFuelVariablePerMile * totalMiles;
  const fixedCostAllocated = breakdown.fixedCostPerMile * totalMiles;
  const dispatchCost = payout * (clampPct(profile.dispatchPercent) / 100);
  const factoringCost = payout * (clampPct(profile.factoringPercent) / 100);

  const totalCost =
    fuelCost + variableCost + fixedCostAllocated + dispatchCost + factoringCost;
  const netProfit = payout - totalCost;

  const allInRatePerMile = safeDiv(payout, totalMiles);
  const loadedRatePerMile = safeDiv(payout, loadedMiles);
  const breakEvenAllInRate = safeDiv(totalCost, totalMiles);

  // Payout that clears the target margin: cost that scales with revenue
  // (dispatch + factoring) has to be solved for, so we gross it up.
  const revenueLinkedRate =
    (clampPct(profile.dispatchPercent) + clampPct(profile.factoringPercent)) / 100;
  const fixedishCost = fuelCost + variableCost + fixedCostAllocated;
  // payout*(1 - revenueLinkedRate) - fixedish = targetMargin * payout
  const denom = 1 - revenueLinkedRate - targetMargin;
  const minPayoutForTarget = denom > 0 ? fixedishCost / denom : Infinity;

  const marginPercent = payout > 0 ? netProfit / payout : 0;

  const { verdict, reasons } = decide({
    netProfit,
    marginPercent,
    targetMargin,
    totalMiles,
    deadheadMiles,
    loadedMiles,
    fuelCost,
    factoringCost,
    dispatchCost,
    fixedCostAllocated,
    totalCost,
    allInRatePerMile,
    loadedRatePerMile,
    breakEvenAllInRate,
  });

  return {
    totalMiles: round(totalMiles),
    fuelCost: round(fuelCost),
    variableCost: round(variableCost),
    fixedCostAllocated: round(fixedCostAllocated),
    dispatchCost: round(dispatchCost),
    factoringCost: round(factoringCost),
    totalCost: round(totalCost),
    netProfit: round(netProfit),
    allInRatePerMile: round(allInRatePerMile, 2),
    loadedRatePerMile: round(loadedRatePerMile, 2),
    breakEvenAllInRate: round(breakEvenAllInRate, 2),
    minPayoutForTarget: Number.isFinite(minPayoutForTarget)
      ? round(minPayoutForTarget)
      : 0,
    marginPercent: round(marginPercent * 100, 1),
    verdict,
    reasons,
  };
}

interface DecideInput {
  netProfit: number;
  marginPercent: number;
  targetMargin: number;
  totalMiles: number;
  deadheadMiles: number;
  loadedMiles: number;
  fuelCost: number;
  factoringCost: number;
  dispatchCost: number;
  fixedCostAllocated: number;
  totalCost: number;
  allInRatePerMile: number;
  loadedRatePerMile: number;
  breakEvenAllInRate: number;
}

function decide(d: DecideInput): { verdict: LoadVerdict; reasons: string[] } {
  const reasons: string[] = [];
  let verdict: LoadVerdict;

  if (d.netProfit <= 0) {
    verdict = "NO_GO";
    reasons.push(
      `This load loses about $${Math.abs(Math.round(d.netProfit))} after all your costs. Your all-in rate is $${d.allInRatePerMile.toFixed(2)}/mi but you need $${d.breakEvenAllInRate.toFixed(2)}/mi just to break even.`
    );
  } else if (d.marginPercent < d.targetMargin) {
    verdict = "BORDERLINE";
    reasons.push(
      `It clears about $${Math.round(d.netProfit)}, but that's only a ${(d.marginPercent * 100).toFixed(0)}% margin — below your ${(d.targetMargin * 100).toFixed(0)}% target. Negotiate before you commit.`
    );
  } else {
    verdict = "GO";
    reasons.push(
      `Profitable: about $${Math.round(d.netProfit)} net at a ${(d.marginPercent * 100).toFixed(0)}% margin, above your ${(d.targetMargin * 100).toFixed(0)}% target.`
    );
  }

  // Deadhead drag.
  const deadheadShare = d.totalMiles > 0 ? d.deadheadMiles / d.totalMiles : 0;
  if (deadheadShare >= 0.2) {
    reasons.push(
      `Deadhead is ${Math.round(deadheadShare * 100)}% of the trip (${Math.round(d.deadheadMiles)} empty miles). That's why the loaded rate of $${d.loadedRatePerMile.toFixed(2)}/mi drops to a real $${d.allInRatePerMile.toFixed(2)}/mi.`
    );
  }

  // Factoring drag on this specific load.
  if (d.factoringCost > 0 && d.factoringCost >= d.netProfit * 0.25 && d.netProfit > 0) {
    reasons.push(
      `Factoring takes about $${Math.round(d.factoringCost)} out of this load — a big slice of the profit. Lowering your factoring rate lifts every load like this one.`
    );
  }

  // Biggest cost caller for context.
  const drivers: Array<[string, number]> = [
    ["fuel", d.fuelCost],
    ["your fixed overhead", d.fixedCostAllocated],
    ["factoring", d.factoringCost],
    ["dispatch", d.dispatchCost],
  ];
  drivers.sort((a, b) => b[1] - a[1]);
  if (drivers[0][1] > 0) {
    reasons.push(
      `Biggest cost on this run is ${drivers[0][0]} at about $${Math.round(drivers[0][1])}.`
    );
  }

  return { verdict, reasons };
}

function clampPct(p: number): number {
  if (!Number.isFinite(p)) return 0;
  return Math.min(100, Math.max(0, p));
}

function safeDiv(a: number, b: number): number {
  return b > 0 ? a / b : 0;
}
