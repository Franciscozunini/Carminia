import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { MiniProfit } from "@/components/tools/MiniProfit";
import { JsonLd, breadcrumb } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Owner-Operator Profit Calculator (true cost per mile)",
  description:
    "Free owner-operator profit calculator. Enter your revenue, miles, fuel, and costs to get your true cost per mile, deadhead-adjusted break-even rate, and monthly and annual operating profit.",
  alternates: { canonical: "/owner-operator-profit-calculator" },
};

export default function ProfitCalcPage() {
  return (
    <>
      <PageHeader
        eyebrow="Calculator"
        title="Owner-Operator Profit Calculator"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Profit calculator", href: "/owner-operator-profit-calculator" },
        ]}
        intro="See your true cost per mile and what you actually keep each month. Deadhead is spread onto your paid miles, so the break-even rate is the real number you must average to make money."
      />
      <div className="container-page py-8">
        <MiniProfit emphasis="profit" />
        <div className="mt-10 max-w-3xl space-y-4 text-ink-soft">
          <h2 className="text-xl font-bold text-ink">How this is calculated</h2>
          <p>
            Your total monthly cost is variable cost (fuel + maintenance + tires +
            tolls) across all miles, plus fixed monthly costs, plus dispatch and
            factoring taken as a percent of revenue. Cost per mile divides that by
            total miles; the <strong>break-even rate</strong> divides it by{" "}
            <em>loaded</em> miles, because empty miles still cost money but earn
            none.
          </p>
          <p>
            For your real all-in factoring cost and a take/skip verdict on specific
            loads,{" "}
            <Link href="/factoring/calculator" className="text-brand hover:underline">
              use the full Money Dashboard
            </Link>
            . Full formulas are on the{" "}
            <Link href="/methodology" className="text-brand hover:underline">
              methodology page
            </Link>
            .
          </p>
        </div>
      </div>
      <JsonLd
        data={breadcrumb(
          [
            { name: "Home", path: "/" },
            { name: "Profit calculator", path: "/owner-operator-profit-calculator" },
          ],
          SITE.url
        )}
      />
    </>
  );
}
