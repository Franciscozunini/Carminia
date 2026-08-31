"use client";

import * as React from "react";
import Link from "next/link";
import { NumberField } from "@/components/NumberField";
import { Card, Stat, cn } from "@/components/ui";
import { usd, perMile, pct } from "@/lib/format";

/**
 * Standalone per-load profit check. This version takes a single blended
 * cost-per-mile (so it works without a saved profile), then applies the same
 * deadhead + margin logic the dashboard uses. For factoring-aware, profile-based
 * verdicts, the page links into the full dashboard.
 */
export function MiniLoad() {
  const [costPerMile, setCostPerMile] = React.useState(1.65);
  const [payout, setPayout] = React.useState(1800);
  const [loaded, setLoaded] = React.useState(700);
  const [deadhead, setDeadhead] = React.useState(90);
  const [target, setTarget] = React.useState(15);

  const totalMiles = loaded + deadhead;
  const cost = costPerMile * totalMiles;
  const net = payout - cost;
  const allIn = totalMiles > 0 ? payout / totalMiles : 0;
  const loadedRpm = loaded > 0 ? payout / loaded : 0;
  const margin = payout > 0 ? (net / payout) * 100 : 0;
  const breakEven = totalMiles > 0 ? cost / totalMiles : 0;
  const minPayout = target < 100 ? cost / (1 - target / 100) : Infinity;

  const verdict = net <= 0 ? "SKIP IT" : margin < target ? "NEGOTIATE" : "TAKE IT";
  const tone = net <= 0 ? "stop" : margin < target ? "warn" : "go";
  const toneText = { go: "text-go", warn: "text-warn", stop: "text-stop" }[tone];
  const toneBg = {
    go: "bg-go-soft border-go/30",
    warn: "bg-warn-soft border-warn/30",
    stop: "bg-stop-soft border-stop/30",
  }[tone];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
      <Card className="p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField label="Your cost per mile" prefix="$" suffix="/mi" value={costPerMile} onChange={setCostPerMile} step="0.01" hint="Don't know it? Use the profit calculator first." />
          <NumberField label="Target margin" suffix="%" value={target} onChange={setTarget} />
          <NumberField label="Load pays (total)" prefix="$" value={payout} onChange={setPayout} />
          <NumberField label="Loaded miles" value={loaded} onChange={setLoaded} />
          <NumberField label="Deadhead to pickup" suffix="mi" value={deadhead} onChange={setDeadhead} />
        </div>
        <p className="mt-4 text-xs text-ink-muted">
          This uses one blended cost per mile. For a verdict that subtracts your{" "}
          <em>real</em> factoring and dispatch,{" "}
          <Link href="/factoring/calculator" className="text-brand hover:underline">
            use the Money Dashboard
          </Link>
          .
        </p>
      </Card>

      <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
        <div className={cn("rounded-xl border p-4", toneBg)}>
          <div className={cn("text-2xl font-extrabold", toneText)}>{verdict}</div>
          <div className="tabular mt-1 text-3xl font-bold text-ink">{usd(net)}</div>
          <div className="text-sm text-ink-soft">net profit on this load</div>
        </div>
        <Card className="p-5">
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Real rate (all-in)" value={perMile(allIn)} hint={`Quoted ${perMile(loadedRpm)}`} />
            <Stat label="Break-even" value={perMile(breakEven)} />
            <Stat label="Margin" value={pct(margin, 0)} tone={margin >= target ? "go" : "warn"} />
            <Stat
              label="Counter with ≥"
              value={Number.isFinite(minPayout) ? usd(minPayout) : "—"}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
