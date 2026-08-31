import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui";
import {
  FACTORING_BENCHMARK_RATE,
  DEFAULT_DIESEL_PRICE,
  DEFAULT_TARGET_MARGIN,
} from "@/lib/data/benchmarks";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Methodology, formulas & assumptions",
  description:
    "Exactly how HaulWise calculates cost per mile, break-even rate, factoring cost and APR, and load verdicts — with the formulas and default assumptions written out.",
  alternates: { canonical: "/methodology" },
};

function Formula({ children }: { children: React.ReactNode }) {
  return (
    <pre className="tabular overflow-x-auto rounded-lg border border-surface-line bg-surface-sunken p-3 text-sm text-ink">
      {children}
    </pre>
  );
}

export default function MethodologyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust"
        title="Methodology & formulas"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Methodology", href: "/methodology" },
        ]}
        intro="Every number our tools show comes from the inputs you enter and the formulas below. No hidden factors, no black box. Last updated 2026-08-31."
      />
      <div className="container-page max-w-3xl space-y-8 py-8">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink">Cost per mile</h2>
          <Formula>{`fuelCostPerMile      = dieselPrice / mpg
variableCostPerMile  = fuelCostPerMile + maintenance/mi + tires/mi + tolls/mi
fixedMonthly         = truck + trailer + insurance + permits + ELD + loadBoard + other
dispatch$            = monthlyRevenue x dispatch%
factoring$           = monthlyRevenue x factoring%   (see "all-in factoring" below)
totalMonthlyCost     = variableCostPerMile x miles + fixedMonthly + dispatch$ + factoring$
costPerMile          = totalMonthlyCost / totalMiles`}</Formula>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink">Break-even rate (deadhead-adjusted)</h2>
          <p className="text-ink-soft">
            Empty miles cost money but earn none, so we divide total cost by{" "}
            <em>loaded</em> miles to get the rate you must average on paid miles.
          </p>
          <Formula>{`loadedMiles          = totalMiles x (1 - deadhead%)
breakEvenLoadedRate  = totalMonthlyCost / loadedMiles`}</Formula>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink">All-in factoring cost &amp; APR</h2>
          <p className="text-ink-soft">
            The key idea: the advertised rate is not what you pay. We add ACH and
            other fees, express it as a percent of the volume you factor, then
            annualize it using how long the broker would otherwise take to pay.
          </p>
          <Formula>{`monthlyFactoringCost = volume x rate% + invoices x achFee + otherFees
effectiveRate%       = monthlyFactoringCost / volume x 100
effectiveAPR         = effectiveRate% x (365 / daysToPay)
factoringCentsPerMile= monthlyFactoringCost / monthlyMiles x 100
overpayment/yr       = max(0, monthlyFactoringCost - volume x benchmark%) x 12`}</Formula>
          <p className="text-sm text-ink-muted">
            The dashboard folds <code>effectiveRate%</code> back into your cost
            profile, so your break-even reflects the factoring you actually pay.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink">Per-load verdict</h2>
          <Formula>{`totalMiles     = loadedMiles + deadheadMiles
loadCost       = fuel + (maint+tires+tolls) + allocatedFixed + dispatch$ + factoring$
netProfit      = payout - loadCost
allInRate/mi   = payout / totalMiles
margin%        = netProfit / payout
verdict:  netProfit <= 0            -> SKIP IT
          margin%  <  targetMargin  -> NEGOTIATE
          else                      -> TAKE IT`}</Formula>
          <p className="text-sm text-ink-muted">
            Fixed cost is allocated to a load by miles (fixedCostPerMile x
            totalMiles). Dispatch and factoring are charged as a percent of that
            load&apos;s payout.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-ink">Default assumptions</h2>
          <Card className="p-5">
            <ul className="space-y-3 text-sm text-ink-soft">
              <li>
                <strong>Target margin:</strong> {DEFAULT_TARGET_MARGIN * 100}% net
                is the line between NEGOTIATE and TAKE IT. You can change it in the
                load tools.
              </li>
              <li>
                <strong>Factoring benchmark:</strong>{" "}
                {FACTORING_BENCHMARK_RATE.value}% — {FACTORING_BENCHMARK_RATE.rationale}
              </li>
              <li>
                <strong>Default diesel price:</strong> $
                {DEFAULT_DIESEL_PRICE.value}/gal — {DEFAULT_DIESEL_PRICE.rationale}
              </li>
            </ul>
          </Card>
          <p className="text-sm text-ink-muted">
            These are editorial defaults you can override, not claims about any
            company. See{" "}
            <Link href="/about" className="text-brand hover:underline">
              about &amp; sources
            </Link>{" "}
            and our{" "}
            <Link href="/disclaimer" className="text-brand hover:underline">
              disclaimer
            </Link>
            .
          </p>
        </section>
      </div>
    </>
  );
}
