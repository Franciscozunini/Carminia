import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { MiniProfit } from "@/components/tools/MiniProfit";
import { JsonLd, breadcrumb } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Break-Even Rate Per Mile Calculator for Owner-Operators",
  description:
    "Find the minimum rate per mile you must average to break even — adjusted for deadhead. Free break-even calculator for owner-operator truckers.",
  alternates: { canonical: "/break-even-rate-calculator" },
};

export default function BreakEvenPage() {
  return (
    <>
      <PageHeader
        eyebrow="Calculator"
        title="Break-Even Rate Per Mile Calculator"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Break-even rate", href: "/break-even-rate-calculator" },
        ]}
        intro="Your break-even rate is the minimum you must average per loaded mile to cover every cost. Because deadhead miles earn nothing, the more you run empty, the higher this number climbs."
      />
      <div className="container-page py-8">
        <MiniProfit emphasis="breakeven" />
        <div className="mt-10 max-w-3xl space-y-4 text-ink-soft">
          <h2 className="text-xl font-bold text-ink">Why deadhead raises your break-even</h2>
          <p>
            If 12% of your miles are empty, every paid mile has to carry the cost
            of those empty miles too. That&apos;s why a truck with a{" "}
            <strong>$1.60 cost per mile</strong> might need to average well over{" "}
            <strong>$1.80 per loaded mile</strong> just to break even. Cutting
            deadhead is one of the fastest ways to lower the rate you can afford to
            accept.
          </p>
          <p>
            Ready to test real loads against this number?{" "}
            <Link href="/load-profit-calculator" className="text-brand hover:underline">
              Try the load profit check
            </Link>
            .
          </p>
        </div>
      </div>
      <JsonLd
        data={breadcrumb(
          [
            { name: "Home", path: "/" },
            { name: "Break-even rate", path: "/break-even-rate-calculator" },
          ],
          SITE.url
        )}
      />
    </>
  );
}
