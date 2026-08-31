import type { CostProfile, CostBreakdown } from "./types";

/** Round to `n` decimals without floating-point tails. */
export function round(value: number, n = 2): number {
  if (!Number.isFinite(value)) return 0;
  const f = 10 ** n;
  return Math.round((value + Number.EPSILON) * f) / f;
}

/** Guard against divide-by-zero when a driver leaves a field blank. */
function safeDiv(a: number, b: number): number {
  return b > 0 ? a / b : 0;
}

/**
 * Compute a truck's cost-per-mile and deadhead-aware break-even rate.
 *
 * The key differentiator vs. generic CPM tools: dispatch and factoring are
 * modeled as a % of revenue (not a flat number), and the break-even rate is
 * expressed per LOADED mile, so empty miles are correctly spread onto the
 * miles that actually generate pay.
 */
export function computeCostPerMile(profile: CostProfile): CostBreakdown {
  const monthlyMiles = Math.max(0, profile.monthlyMiles);
  const deadheadPct = clampPct(profile.deadheadPercent);
  const loadedMiles = monthlyMiles * (1 - deadheadPct / 100);

  const fuelCostPerMile = safeDiv(profile.dieselPrice, profile.mpg);
  const variableCostPerMile =
    fuelCostPerMile +
    Math.max(0, profile.maintenancePerMile) +
    Math.max(0, profile.tiresPerMile) +
    Math.max(0, profile.tollsPerMile);

  const fixedMonthly =
    Math.max(0, profile.truckPayment) +
    Math.max(0, profile.trailerPayment) +
    Math.max(0, profile.insurance) +
    Math.max(0, profile.permits) +
    Math.max(0, profile.eldMonthly) +
    Math.max(0, profile.loadBoardMonthly) +
    Math.max(0, profile.otherFixedMonthly);

  const fixedCostPerMile = safeDiv(fixedMonthly, monthlyMiles);

  const dispatchMonthly =
    profile.monthlyGrossRevenue * (clampPct(profile.dispatchPercent) / 100);
  const factoringMonthly =
    profile.monthlyGrossRevenue * (clampPct(profile.factoringPercent) / 100);

  const variableMonthly = variableCostPerMile * monthlyMiles;
  const totalMonthlyCost =
    variableMonthly + fixedMonthly + dispatchMonthly + factoringMonthly;

  const totalCostPerMile = safeDiv(totalMonthlyCost, monthlyMiles);
  const breakEvenLoadedRate = safeDiv(totalMonthlyCost, loadedMiles);
  const revenuePerTotalMile = safeDiv(profile.monthlyGrossRevenue, monthlyMiles);
  const monthlyOperatingProfit = profile.monthlyGrossRevenue - totalMonthlyCost;

  const topCostDriver = pickTopDriver({
    Fuel: fuelCostPerMile * monthlyMiles,
    Fixed: fixedMonthly,
    Dispatch: dispatchMonthly,
    Factoring: factoringMonthly,
    Maintenance: Math.max(0, profile.maintenancePerMile) * monthlyMiles,
    Tires: Math.max(0, profile.tiresPerMile) * monthlyMiles,
    Tolls: Math.max(0, profile.tollsPerMile) * monthlyMiles,
  });

  return {
    fuelCostPerMile: round(fuelCostPerMile, 3),
    variableCostPerMile: round(variableCostPerMile, 3),
    fixedMonthly: round(fixedMonthly),
    fixedCostPerMile: round(fixedCostPerMile, 3),
    dispatchMonthly: round(dispatchMonthly),
    factoringMonthly: round(factoringMonthly),
    totalMonthlyCost: round(totalMonthlyCost),
    totalCostPerMile: round(totalCostPerMile, 3),
    loadedMiles: round(loadedMiles),
    breakEvenLoadedRate: round(breakEvenLoadedRate, 3),
    revenuePerTotalMile: round(revenuePerTotalMile, 3),
    monthlyOperatingProfit: round(monthlyOperatingProfit),
    annualOperatingProfit: round(monthlyOperatingProfit * 12),
    topCostDriver: {
      key: topCostDriver.key,
      label: topCostDriver.key,
      monthly: round(topCostDriver.monthly),
    },
  };
}

function clampPct(p: number): number {
  if (!Number.isFinite(p)) return 0;
  return Math.min(100, Math.max(0, p));
}

function pickTopDriver(buckets: Record<string, number>): {
  key: string;
  monthly: number;
} {
  let best = { key: "Fuel", monthly: -Infinity };
  for (const [key, monthly] of Object.entries(buckets)) {
    if (monthly > best.monthly) best = { key, monthly };
  }
  return best;
}
