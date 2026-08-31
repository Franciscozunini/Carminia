import { describe, it, expect } from "vitest";
import { computeCostPerMile, round } from "./costPerMile";
import type { CostProfile } from "./types";

const baseProfile: CostProfile = {
  monthlyMiles: 10000,
  deadheadPercent: 10,
  mpg: 6.5,
  dieselPrice: 4.0,
  truckPayment: 2200,
  trailerPayment: 500,
  insurance: 1200,
  permits: 300,
  eldMonthly: 40,
  loadBoardMonthly: 40,
  otherFixedMonthly: 480,
  maintenancePerMile: 0.18,
  tiresPerMile: 0.04,
  tollsPerMile: 0.02,
  dispatchPercent: 5,
  factoringPercent: 3,
  monthlyGrossRevenue: 22000,
};

describe("round", () => {
  it("rounds to given decimals without float tails", () => {
    expect(round(1.005, 2)).toBe(1.01); // half-up via EPSILON nudge
    expect(round(0.615384, 3)).toBe(0.615);
    expect(round(1234.567)).toBe(1234.57);
  });
  it("returns 0 for non-finite", () => {
    expect(round(Infinity)).toBe(0);
    expect(round(NaN)).toBe(0);
  });
});

describe("computeCostPerMile", () => {
  const r = computeCostPerMile(baseProfile);

  it("computes fuel cost per mile as diesel / mpg", () => {
    expect(r.fuelCostPerMile).toBe(round(4.0 / 6.5, 3)); // ~0.615
  });

  it("sums fixed monthly costs correctly", () => {
    // 2200+500+1200+300+40+40+480 = 4760
    expect(r.fixedMonthly).toBe(4760);
  });

  it("computes loaded miles from deadhead percent", () => {
    expect(r.loadedMiles).toBe(9000); // 10000 * (1 - 0.10)
  });

  it("charges dispatch and factoring as % of revenue", () => {
    expect(r.dispatchMonthly).toBe(1100); // 5% of 22000
    expect(r.factoringMonthly).toBe(660); // 3% of 22000
  });

  it("break-even loaded rate exceeds total cost per mile due to deadhead", () => {
    expect(r.breakEvenLoadedRate).toBeGreaterThan(r.totalCostPerMile);
  });

  it("total monthly cost = variable + fixed + dispatch + factoring", () => {
    const variableMonthly =
      (round(4.0 / 6.5, 12) + 0.18 + 0.04 + 0.02) * 10000;
    const expected = variableMonthly + 4760 + 1100 + 660;
    expect(r.totalMonthlyCost).toBe(round(expected));
  });

  it("operating profit = revenue - total cost, annualized x12", () => {
    expect(r.monthlyOperatingProfit).toBe(
      round(22000 - r.totalMonthlyCost)
    );
    // Engine annualizes from the unrounded monthly figure, so allow a cent.
    expect(r.annualOperatingProfit).toBeCloseTo(r.monthlyOperatingProfit * 12, 0);
  });

  it("identifies a plausible top cost driver", () => {
    expect(["Fuel", "Fixed", "Maintenance"]).toContain(r.topCostDriver.key);
  });

  it("does not divide by zero when miles are zero", () => {
    const z = computeCostPerMile({ ...baseProfile, monthlyMiles: 0 });
    expect(Number.isFinite(z.totalCostPerMile)).toBe(true);
    expect(z.breakEvenLoadedRate).toBe(0);
  });

  it("is deterministic", () => {
    const a = computeCostPerMile(baseProfile);
    const b = computeCostPerMile(baseProfile);
    expect(a).toEqual(b);
  });
});
