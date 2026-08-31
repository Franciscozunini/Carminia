import { describe, it, expect } from "vitest";
import { analyzeFactoring, factoringCentsPerMile } from "./factoring";
import type { FactoringInputs } from "./types";

const base: FactoringInputs = {
  monthlyVolume: 30000,
  ratePercent: 3,
  invoicesPerMonth: 20,
  achFeePerInvoice: 15,
  otherMonthlyFees: 0,
  daysToPay: 40,
  benchmarkRatePercent: 2,
};

describe("analyzeFactoring", () => {
  const r = analyzeFactoring(base);

  it("computes discount cost as volume * rate", () => {
    expect(r.monthlyDiscountCost).toBe(900); // 3% of 30000
  });

  it("adds per-invoice ACH fees", () => {
    expect(r.monthlyAchCost).toBe(300); // 20 * 15
    expect(r.monthlyFactoringCost).toBe(1200); // 900 + 300
    expect(r.annualFactoringCost).toBe(14400);
  });

  it("computes the effective all-in rate above the advertised rate", () => {
    // 1200 / 30000 = 4.0% effective vs 3% advertised
    expect(r.effectiveRatePercent).toBe(4);
  });

  it("annualizes cost into an APR using days-to-pay", () => {
    // 4.0% * (365/40) = 36.5% APR
    expect(r.effectiveApr).toBe(36.5);
  });

  it("computes overpayment vs benchmark", () => {
    // benchmark 2% of 30000 = 600; overpay = 1200 - 600 = 600/mo
    expect(r.benchmarkMonthlyCost).toBe(600);
    expect(r.monthlyOverpayment).toBe(600);
    expect(r.annualOverpayment).toBe(7200);
    expect(r.isOverpaying).toBe(true);
  });

  it("flags NOT overpaying when already at benchmark", () => {
    const good = analyzeFactoring({
      ...base,
      ratePercent: 2,
      achFeePerInvoice: 0,
    });
    expect(good.monthlyOverpayment).toBe(0);
    expect(good.isOverpaying).toBe(false);
  });

  it("handles zero volume without dividing by zero", () => {
    const z = analyzeFactoring({ ...base, monthlyVolume: 0, invoicesPerMonth: 0 });
    expect(z.effectiveRatePercent).toBe(0);
    expect(z.effectiveApr).toBe(0);
  });

  it("is deterministic", () => {
    expect(analyzeFactoring(base)).toEqual(analyzeFactoring(base));
  });
});

describe("factoringCentsPerMile", () => {
  it("spreads monthly factoring cost across miles as cents", () => {
    // $1200 / 10000 mi = $0.12 = 12.0 cents
    expect(factoringCentsPerMile(1200, 10000)).toBe(12);
  });
  it("returns 0 for zero miles", () => {
    expect(factoringCentsPerMile(1200, 0)).toBe(0);
  });
});
