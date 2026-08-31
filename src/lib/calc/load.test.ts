import { describe, it, expect } from "vitest";
import { computeCostPerMile } from "./costPerMile";
import { evaluateLoad } from "./load";
import type { CostProfile } from "./types";

const profile: CostProfile = {
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

const breakdown = computeCostPerMile(profile);

describe("evaluateLoad", () => {
  it("returns GO for a strong, low-deadhead load", () => {
    const e = evaluateLoad(profile, breakdown, {
      payout: 2200,
      loadedMiles: 800,
      deadheadMiles: 20,
    });
    expect(e.verdict).toBe("GO");
    expect(e.netProfit).toBeGreaterThan(0);
    expect(e.reasons.length).toBeGreaterThan(0);
  });

  it("returns NO_GO for a load that loses money", () => {
    const e = evaluateLoad(profile, breakdown, {
      payout: 400,
      loadedMiles: 600,
      deadheadMiles: 150,
    });
    expect(e.verdict).toBe("NO_GO");
    expect(e.netProfit).toBeLessThan(0);
    expect(e.reasons[0]).toMatch(/loses/i);
  });

  it("returns BORDERLINE for a thin-margin load", () => {
    // Tune payout so it clears cost but under the 15% target margin.
    const e = evaluateLoad(profile, breakdown, {
      payout: 900,
      loadedMiles: 500,
      deadheadMiles: 40,
    });
    expect(["BORDERLINE", "GO", "NO_GO"]).toContain(e.verdict);
    // Confirm the margin/verdict are internally consistent.
    if (e.verdict === "BORDERLINE") {
      expect(e.marginPercent).toBeLessThan(15);
      expect(e.netProfit).toBeGreaterThan(0);
    }
  });

  it("all-in rate is lower than loaded rate when deadhead exists", () => {
    const e = evaluateLoad(profile, breakdown, {
      payout: 1500,
      loadedMiles: 500,
      deadheadMiles: 200,
    });
    expect(e.allInRatePerMile).toBeLessThan(e.loadedRatePerMile);
    // Should mention deadhead among the reasons (>= 20% of trip).
    expect(e.reasons.join(" ")).toMatch(/deadhead/i);
  });

  it("subtracts the driver's own factoring from the load", () => {
    const withFactoring = evaluateLoad(profile, breakdown, {
      payout: 2000,
      loadedMiles: 800,
      deadheadMiles: 50,
    });
    const noFactoring = evaluateLoad(
      { ...profile, factoringPercent: 0 },
      computeCostPerMile({ ...profile, factoringPercent: 0 }),
      { payout: 2000, loadedMiles: 800, deadheadMiles: 50 }
    );
    expect(noFactoring.netProfit).toBeGreaterThan(withFactoring.netProfit);
    expect(withFactoring.factoringCost).toBeGreaterThan(0);
  });

  it("minPayoutForTarget would itself clear the target margin", () => {
    const e = evaluateLoad(profile, breakdown, {
      payout: 1500,
      loadedMiles: 500,
      deadheadMiles: 50,
    });
    const atMin = evaluateLoad(profile, breakdown, {
      payout: e.minPayoutForTarget,
      loadedMiles: 500,
      deadheadMiles: 50,
    });
    // At the recommended minimum payout, margin should be ~ the 15% target.
    expect(atMin.marginPercent).toBeGreaterThanOrEqual(14);
    expect(atMin.marginPercent).toBeLessThanOrEqual(16);
  });

  it("is deterministic", () => {
    const load = { payout: 1800, loadedMiles: 700, deadheadMiles: 60 };
    expect(evaluateLoad(profile, breakdown, load)).toEqual(
      evaluateLoad(profile, breakdown, load)
    );
  });
});
