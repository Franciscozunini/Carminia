"use client";

import * as React from "react";
import Link from "next/link";
import { NumberField } from "@/components/NumberField";
import { Card, Stat } from "@/components/ui";
import { usd, perMile } from "@/lib/format";
import { computeCostPerMile } from "@/lib/calc";
import type { CostProfile } from "@/lib/calc";
import { STARTER_PROFILE } from "@/lib/data/benchmarks";

/**
 * Focused cost-per-mile / break-even tool for the standalone SEO pages.
 * Shares the exact same engine as the full dashboard, so results are identical.
 * `emphasis` picks which single number leads.
 */
export function MiniProfit({ emphasis = "profit" }: { emphasis?: "profit" | "breakeven" }) {
  const [p, setP] = React.useState<CostProfile>({ ...STARTER_PROFILE });
  const set = (k: keyof CostProfile) => (v: number) => setP((s) => ({ ...s, [k]: v }));
  const r = computeCostPerMile(p);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <Card className="p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField label="Monthly gross revenue" prefix="$" value={p.monthlyGrossRevenue} onChange={set("monthlyGrossRevenue")} />
          <NumberField label="Total miles / month" value={p.monthlyMiles} onChange={set("monthlyMiles")} />
          <NumberField label="Deadhead" suffix="%" value={p.deadheadPercent} onChange={set("deadheadPercent")} />
          <NumberField label="Fuel economy" suffix="mpg" value={p.mpg} onChange={set("mpg")} step="0.1" />
          <NumberField label="Diesel price" prefix="$" suffix="/gal" value={p.dieselPrice} onChange={set("dieselPrice")} step="0.01" />
          <NumberField label="Truck + trailer payment" prefix="$" value={p.truckPayment} onChange={set("truckPayment")} hint="Combined monthly." />
          <NumberField label="Insurance / month" prefix="$" value={p.insurance} onChange={set("insurance")} />
          <NumberField label="Other fixed / month" prefix="$" value={p.otherFixedMonthly} onChange={set("otherFixedMonthly")} hint="Permits, ELD, load boards, etc." />
          <NumberField label="Maintenance + tires" prefix="$" suffix="/mi" value={p.maintenancePerMile} onChange={set("maintenancePerMile")} step="0.01" />
          <NumberField label="Dispatch + factoring" suffix="%" value={p.factoringPercent} onChange={set("factoringPercent")} step="0.1" hint="Combined % of revenue." />
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          Want the full picture — real factoring cost and per-load verdicts?{" "}
          <Link href="/factoring/calculator" className="text-brand hover:underline">
            Open the Money Dashboard
          </Link>
          .
        </p>
      </Card>

      <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <Card className="p-5">
          <div className="grid grid-cols-2 gap-3">
            <Stat
              label="Break-even rate"
              value={perMile(r.breakEvenLoadedRate)}
              tone="brand"
              emphasize={emphasis === "breakeven"}
              hint="Per loaded mile"
            />
            <Stat
              label="Monthly profit"
              value={usd(r.monthlyOperatingProfit)}
              tone={r.monthlyOperatingProfit >= 0 ? "go" : "stop"}
              emphasize={emphasis === "profit"}
            />
            <Stat label="True cost / mile" value={perMile(r.totalCostPerMile)} />
            <Stat label="Annual profit" value={usd(r.annualOperatingProfit)} />
          </div>
        </Card>
      </div>
    </div>
  );
}
