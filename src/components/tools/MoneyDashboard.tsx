"use client";

import * as React from "react";
import Link from "next/link";
import { NumberField } from "@/components/NumberField";
import { Card, Stat, Badge, Callout, cn } from "@/components/ui";
import { usd, perMile, pct, cents } from "@/lib/format";
import {
  computeCostPerMile,
  analyzeFactoring,
  factoringCentsPerMile,
  evaluateLoad,
} from "@/lib/calc";
import type { CostProfile, FactoringInputs, LoadInputs } from "@/lib/calc";
import { loadState, saveState, clearState, defaultState } from "@/lib/profile/storage";
import { FACTORING_BENCHMARK_RATE } from "@/lib/data/benchmarks";

type Tab = "truck" | "factoring" | "load";

export function MoneyDashboard() {
  const [profile, setProfile] = React.useState<CostProfile>(
    () => defaultState().profile
  );
  const [factoring, setFactoring] = React.useState<FactoringInputs>(
    () => defaultState().factoring
  );
  const [load, setLoad] = React.useState<LoadInputs>({
    payout: 1800,
    loadedMiles: 700,
    deadheadMiles: 90,
  });
  const [tab, setTab] = React.useState<Tab>("truck");
  const [savedAt, setSavedAt] = React.useState<string>("");
  const [hydrated, setHydrated] = React.useState(false);

  // Load any saved profile on first mount (client only).
  React.useEffect(() => {
    const s = loadState();
    setProfile(s.profile);
    setFactoring(s.factoring);
    setSavedAt(s.savedAt);
    setHydrated(true);
  }, []);

  // --- Derived, deterministic calculations ---
  const factAnalysis = React.useMemo(() => analyzeFactoring(factoring), [factoring]);

  // The fusion: fold the REAL, all-in factoring rate into the cost profile so
  // break-even reflects ACH fees and minimums, not just the advertised rate.
  const effectiveProfile: CostProfile = React.useMemo(() => {
    const useEffective = factoring.monthlyVolume > 0;
    return {
      ...profile,
      factoringPercent: useEffective
        ? factAnalysis.effectiveRatePercent
        : profile.factoringPercent,
    };
  }, [profile, factoring.monthlyVolume, factAnalysis.effectiveRatePercent]);

  const breakdown = React.useMemo(
    () => computeCostPerMile(effectiveProfile),
    [effectiveProfile]
  );

  const factCents = factoringCentsPerMile(
    factAnalysis.monthlyFactoringCost,
    profile.monthlyMiles
  );

  // What break-even would be at the benchmark factoring rate (savings preview).
  const breakdownAtBenchmark = React.useMemo(
    () =>
      computeCostPerMile({
        ...profile,
        factoringPercent:
          factoring.monthlyVolume > 0 ? factoring.benchmarkRatePercent : profile.factoringPercent,
      }),
    [profile, factoring.monthlyVolume, factoring.benchmarkRatePercent]
  );

  const loadEval = React.useMemo(
    () =>
      load.loadedMiles > 0 && load.payout > 0
        ? evaluateLoad(effectiveProfile, breakdown, load)
        : null,
    [effectiveProfile, breakdown, load]
  );

  function handleSave() {
    const s = saveState({ profile, factoring });
    setSavedAt(s.savedAt);
  }
  function handleReset() {
    const d = defaultState();
    clearState();
    setProfile(d.profile);
    setFactoring(d.factoring);
    setSavedAt("");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      {/* LEFT: inputs by tab */}
      <div>
        <TabBar tab={tab} setTab={setTab} overpaying={factAnalysis.isOverpaying} />

        {tab === "truck" && (
          <TruckInputs profile={profile} setProfile={setProfile} />
        )}
        {tab === "factoring" && (
          <FactoringInputsPanel
            factoring={factoring}
            setFactoring={setFactoring}
            analysis={factAnalysis}
            factCents={factCents}
          />
        )}
        {tab === "load" && (
          <LoadInputsPanel load={load} setLoad={setLoad} evaluation={loadEval} />
        )}

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button className="btn-primary" onClick={handleSave} type="button">
            Save my truck profile
          </button>
          <button className="btn-ghost" onClick={handleReset} type="button">
            Reset
          </button>
          <span className="text-xs text-ink-muted">
            {hydrated && savedAt
              ? `Saved on this device · ${new Date(savedAt).toLocaleDateString()}`
              : "Saved only in your browser — nothing is uploaded."}
          </span>
        </div>
      </div>

      {/* RIGHT: persistent results rail */}
      <ResultsRail
        breakdown={breakdown}
        breakdownAtBenchmark={breakdownAtBenchmark}
        analysis={factAnalysis}
        factCents={factCents}
        hasFactoring={factoring.monthlyVolume > 0}
      />
    </div>
  );
}

function TabBar({
  tab,
  setTab,
  overpaying,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
  overpaying: boolean;
}) {
  const tabs: Array<{ id: Tab; label: string; badge?: React.ReactNode }> = [
    { id: "truck", label: "1 · Your truck" },
    {
      id: "factoring",
      label: "2 · Factoring",
      badge: overpaying ? <Badge tone="stop">overpaying</Badge> : undefined,
    },
    { id: "load", label: "3 · Check a load" },
  ];
  return (
    <div className="mb-4 flex gap-1 rounded-xl border border-surface-line bg-surface p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => setTab(t.id)}
          className={cn(
            "flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition",
            tab === t.id
              ? "bg-brand text-white"
              : "text-ink-soft hover:bg-surface-sunken"
          )}
        >
          {t.label}
          {t.badge}
        </button>
      ))}
    </div>
  );
}

function TruckInputs({
  profile,
  setProfile,
}: {
  profile: CostProfile;
  setProfile: React.Dispatch<React.SetStateAction<CostProfile>>;
}) {
  const set = (k: keyof CostProfile) => (v: number) =>
    setProfile((p) => ({ ...p, [k]: v }));
  return (
    <Card className="p-5">
      <FieldGroup title="Revenue & miles">
        <NumberField label="Monthly gross revenue" prefix="$" value={profile.monthlyGrossRevenue} onChange={set("monthlyGrossRevenue")} />
        <NumberField label="Total miles / month" value={profile.monthlyMiles} onChange={set("monthlyMiles")} hint="Loaded + empty (deadhead)." />
        <NumberField label="Deadhead" suffix="%" value={profile.deadheadPercent} onChange={set("deadheadPercent")} hint="Share of miles run empty." />
      </FieldGroup>

      <FieldGroup title="Fuel">
        <NumberField label="Fuel economy" suffix="mpg" value={profile.mpg} onChange={set("mpg")} step="0.1" />
        <NumberField label="Diesel price" prefix="$" suffix="/gal" value={profile.dieselPrice} onChange={set("dieselPrice")} step="0.01" hint="Use today's real pump price." />
      </FieldGroup>

      <FieldGroup title="Fixed costs (per month)">
        <NumberField label="Truck payment" prefix="$" value={profile.truckPayment} onChange={set("truckPayment")} />
        <NumberField label="Trailer payment" prefix="$" value={profile.trailerPayment} onChange={set("trailerPayment")} />
        <NumberField label="Insurance" prefix="$" value={profile.insurance} onChange={set("insurance")} />
        <NumberField label="Permits / IFTA / plates" prefix="$" value={profile.permits} onChange={set("permits")} />
        <NumberField label="ELD" prefix="$" value={profile.eldMonthly} onChange={set("eldMonthly")} />
        <NumberField label="Load board(s)" prefix="$" value={profile.loadBoardMonthly} onChange={set("loadBoardMonthly")} />
        <NumberField label="Other fixed" prefix="$" value={profile.otherFixedMonthly} onChange={set("otherFixedMonthly")} />
      </FieldGroup>

      <FieldGroup title="Variable costs (per mile)">
        <NumberField label="Maintenance & repairs" prefix="$" suffix="/mi" value={profile.maintenancePerMile} onChange={set("maintenancePerMile")} step="0.01" />
        <NumberField label="Tires" prefix="$" suffix="/mi" value={profile.tiresPerMile} onChange={set("tiresPerMile")} step="0.01" />
        <NumberField label="Tolls (avg)" prefix="$" suffix="/mi" value={profile.tollsPerMile} onChange={set("tollsPerMile")} step="0.01" />
      </FieldGroup>

      <FieldGroup title="Deductions (% of revenue)">
        <NumberField label="Dispatch fee" suffix="%" value={profile.dispatchPercent} onChange={set("dispatchPercent")} step="0.1" hint="0 if you self-dispatch." />
        <NumberField label="Factoring (simple)" suffix="%" value={profile.factoringPercent} onChange={set("factoringPercent")} step="0.1" hint="Or fill the Factoring tab for the real all-in cost." />
      </FieldGroup>
    </Card>
  );
}

function FactoringInputsPanel({
  factoring,
  setFactoring,
  analysis,
  factCents,
}: {
  factoring: FactoringInputs;
  setFactoring: React.Dispatch<React.SetStateAction<FactoringInputs>>;
  analysis: ReturnType<typeof analyzeFactoring>;
  factCents: number;
}) {
  const set = (k: keyof FactoringInputs) => (v: number) =>
    setFactoring((f) => ({ ...f, [k]: v }));
  return (
    <Card className="p-5">
      <FieldGroup title="Your current factoring">
        <NumberField label="Monthly volume factored" prefix="$" value={factoring.monthlyVolume} onChange={set("monthlyVolume")} hint="Total invoice dollars you factor per month." />
        <NumberField label="Advertised rate" suffix="%" value={factoring.ratePercent} onChange={set("ratePercent")} step="0.05" />
        <NumberField label="Invoices / month" value={factoring.invoicesPerMonth} onChange={set("invoicesPerMonth")} />
        <NumberField label="ACH / funding fee" prefix="$" suffix="/inv" value={factoring.achFeePerInvoice} onChange={set("achFeePerInvoice")} step="0.5" hint="Charged per invoice by many factors." />
        <NumberField label="Other monthly fees" prefix="$" value={factoring.otherMonthlyFees} onChange={set("otherMonthlyFees")} />
        <NumberField label="Days broker takes to pay" suffix="days" value={factoring.daysToPay} onChange={set("daysToPay")} hint="Used to annualize the true cost (APR)." />
      </FieldGroup>
      <FieldGroup title="Compare against">
        <NumberField label="Benchmark rate" suffix="%" value={factoring.benchmarkRatePercent} onChange={set("benchmarkRatePercent")} step="0.05" hint={FACTORING_BENCHMARK_RATE.rationale.split(".")[0] + "."} />
      </FieldGroup>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stat label="All-in effective rate" value={pct(analysis.effectiveRatePercent, 2)} tone={analysis.isOverpaying ? "stop" : "default"} hint="Advertised rate + ACH + fees" />
        <Stat label="True APR of the cash" value={pct(analysis.effectiveApr, 1)} hint="Cost to get paid early, annualized" />
        <Stat label="Factoring cost / month" value={usd(analysis.monthlyFactoringCost)} />
        <Stat label="Adds to every mile" value={cents(factCents)} hint="Folded into your break-even" />
      </div>
    </Card>
  );
}

function LoadInputsPanel({
  load,
  setLoad,
  evaluation,
}: {
  load: LoadInputs;
  setLoad: React.Dispatch<React.SetStateAction<LoadInputs>>;
  evaluation: ReturnType<typeof evaluateLoad> | null;
}) {
  const set = (k: keyof LoadInputs) => (v: number) =>
    setLoad((l) => ({ ...l, [k]: v }));
  return (
    <Card className="p-5">
      <FieldGroup title="The load you're looking at">
        <NumberField label="Load pays (total)" prefix="$" value={load.payout} onChange={set("payout")} hint="Linehaul + fuel surcharge + accessorials." />
        <NumberField label="Loaded miles" value={load.loadedMiles} onChange={set("loadedMiles")} />
        <NumberField label="Deadhead to pickup" suffix="mi" value={load.deadheadMiles} onChange={set("deadheadMiles")} />
      </FieldGroup>

      {evaluation ? (
        <div className="mt-4">
          <VerdictBanner evaluation={evaluation} />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Net profit" value={usd(evaluation.netProfit)} tone={evaluation.netProfit > 0 ? "go" : "stop"} emphasize />
            <Stat label="Margin" value={pct(evaluation.marginPercent, 0)} />
            <Stat label="Real rate (all-in)" value={perMile(evaluation.allInRatePerMile)} hint={`Broker quotes ${perMile(evaluation.loadedRatePerMile)}`} />
            <Stat label="Break-even rate" value={perMile(evaluation.breakEvenAllInRate)} />
          </div>
          <ul className="mt-4 space-y-2">
            {evaluation.reasons.map((r, i) => (
              <li key={i} className="flex gap-2 text-sm text-ink-soft">
                <span aria-hidden className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-brand" />
                {r}
              </li>
            ))}
          </ul>
          {evaluation.verdict !== "GO" && evaluation.minPayoutForTarget > load.payout ? (
            <Callout tone="warn" title="Counter-offer target">
              Ask for at least{" "}
              <strong className="tabular">{usd(evaluation.minPayoutForTarget)}</strong>{" "}
              on this load to hit your margin target.
            </Callout>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink-muted">
          Enter a payout and loaded miles to see the verdict.
        </p>
      )}
    </Card>
  );
}

function VerdictBanner({
  evaluation,
}: {
  evaluation: ReturnType<typeof evaluateLoad>;
}) {
  const map = {
    GO: { tone: "go" as const, label: "TAKE IT", sub: "Clears your margin target." },
    BORDERLINE: { tone: "warn" as const, label: "NEGOTIATE", sub: "Thin — push the rate up." },
    NO_GO: { tone: "stop" as const, label: "SKIP IT", sub: "Loses money on your numbers." },
  }[evaluation.verdict];
  const bg = {
    go: "bg-go-soft border-go/30",
    warn: "bg-warn-soft border-warn/30",
    stop: "bg-stop-soft border-stop/30",
  }[map.tone];
  const text = { go: "text-go", warn: "text-warn", stop: "text-stop" }[map.tone];
  return (
    <div className={cn("flex items-center justify-between rounded-xl border p-4", bg)}>
      <div>
        <div className={cn("text-2xl font-extrabold tracking-tight", text)}>
          {map.label}
        </div>
        <div className="text-sm text-ink-soft">{map.sub}</div>
      </div>
      <div className={cn("tabular text-right text-3xl font-bold", text)}>
        {usd(evaluation.netProfit)}
      </div>
    </div>
  );
}

function ResultsRail({
  breakdown,
  breakdownAtBenchmark,
  analysis,
  factCents,
  hasFactoring,
}: {
  breakdown: ReturnType<typeof computeCostPerMile>;
  breakdownAtBenchmark: ReturnType<typeof computeCostPerMile>;
  analysis: ReturnType<typeof analyzeFactoring>;
  factCents: number;
  hasFactoring: boolean;
}) {
  const breakEvenSaving =
    breakdown.breakEvenLoadedRate - breakdownAtBenchmark.breakEvenLoadedRate;
  return (
    <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
      <Card className="p-5">
        <div className="text-sm font-semibold text-ink">Your numbers</div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Stat
            label="Break-even rate"
            value={perMile(breakdown.breakEvenLoadedRate)}
            tone="brand"
            emphasize
            hint="Per loaded mile, deadhead-adjusted"
          />
          <Stat
            label="Monthly profit"
            value={usd(breakdown.monthlyOperatingProfit)}
            tone={breakdown.monthlyOperatingProfit >= 0 ? "go" : "stop"}
            emphasize
          />
          <Stat label="True cost / mile" value={perMile(breakdown.totalCostPerMile)} />
          <Stat label="Annual profit" value={usd(breakdown.annualOperatingProfit)} />
        </div>
        {hasFactoring ? (
          <p className="mt-3 text-xs text-ink-muted">
            Includes factoring at {cents(factCents)} — your real all-in factoring
            cost, not just the advertised rate.
          </p>
        ) : null}
      </Card>

      {analysis.isOverpaying ? (
        <Card className="border-stop/30 p-5">
          <Badge tone="stop">Money found</Badge>
          <div className="mt-2 text-lg font-bold text-ink">
            You may be overpaying about{" "}
            <span className="tabular text-stop">{usd(analysis.annualOverpayment)}</span>{" "}
            a year on factoring.
          </div>
          <p className="mt-1 text-sm text-ink-soft">
            Your all-in rate works out to {pct(analysis.effectiveRatePercent, 2)}.
            {breakEvenSaving > 0.005 ? (
              <>
                {" "}
                Matching the benchmark would drop your break-even by about{" "}
                <strong>{perMile(breakEvenSaving)}</strong> on every loaded mile.
              </>
            ) : null}
          </p>
          <Link href="/factoring/compare" className="btn-primary mt-3 w-full">
            Compare factoring options →
          </Link>
          <p className="mt-2 text-center text-[11px] text-ink-muted">
            We show how we make money and mark every rate we haven&apos;t verified.
          </p>
        </Card>
      ) : (
        <Card className="p-5">
          <Badge tone="go">Looking lean</Badge>
          <p className="mt-2 text-sm text-ink-soft">
            Your factoring cost is close to our benchmark. Re-check whenever your
            rate, ACH fees, or volume change — small fee creep adds up fast.
          </p>
          <Link href="/factoring/compare" className="btn-ghost mt-3 w-full">
            See the factoring comparison
          </Link>
        </Card>
      )}

      <p className="px-1 text-[11px] leading-relaxed text-ink-muted">
        Estimates based on the numbers you enter, for information only — not
        financial advice. See{" "}
        <Link href="/methodology" className="underline">
          methodology
        </Link>
        .
      </p>
    </div>
  );
}

function FieldGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5 last:mb-0">
      <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
        {title}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">{children}</div>
    </div>
  );
}
