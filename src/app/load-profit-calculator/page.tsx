import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { MiniLoad } from "@/components/tools/MiniLoad";
import { JsonLd, breadcrumb } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Load Profit Calculator — Take, Negotiate, or Skip",
  description:
    "Paste a load's pay, loaded miles, and deadhead to get net profit, real all-in rate per mile, break-even, and a clear take / negotiate / skip verdict with a counter-offer target.",
  alternates: { canonical: "/load-profit-calculator" },
};

export default function LoadCalcPage() {
  return (
    <>
      <PageHeader
        eyebrow="Calculator"
        title="Load Profit Calculator"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Load profit check", href: "/load-profit-calculator" },
        ]}
        intro="Brokers quote the loaded rate. What matters is the all-in rate after deadhead and your costs. Enter a load to get a straight take / negotiate / skip call — and the minimum you should counter with."
      />
      <div className="container-page py-8">
        <MiniLoad />
        <div className="mt-10 max-w-3xl space-y-4 text-ink-soft">
          <h2 className="text-xl font-bold text-ink">Loaded rate vs. real rate</h2>
          <p>
            A load paying <strong>$2.40/loaded mile</strong> over 500 miles with
            150 miles of deadhead is really paying{" "}
            <strong>$1.85/mile</strong> across the 650 miles your truck actually
            turns. That gap is where thin loads hide.
          </p>
          <p>
            This quick check uses one blended cost per mile. For verdicts that
            subtract your <em>real</em> factoring and dispatch and remember your
            truck,{" "}
            <Link href="/factoring/calculator" className="text-brand hover:underline">
              use the Money Dashboard
            </Link>
            .
          </p>
        </div>
      </div>
      <JsonLd
        data={breadcrumb(
          [
            { name: "Home", path: "/" },
            { name: "Load profit check", path: "/load-profit-calculator" },
          ],
          SITE.url
        )}
      />
    </>
  );
}
