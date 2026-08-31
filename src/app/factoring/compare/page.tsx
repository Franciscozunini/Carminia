import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { FactoringTable } from "@/components/compare/FactoringTable";
import { HowWeMakeMoneyNote } from "@/components/HowWeMakeMoneyNote";
import { Callout } from "@/components/ui";
import { JsonLd, breadcrumb } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Compare freight factoring companies for owner-operators",
  description:
    "A neutral, transparent comparison of freight factoring companies for owner-operators. Every unverified figure is marked UNKNOWN, and we disclose which links are paid.",
  alternates: { canonical: "/factoring/compare" },
};

export default function ComparePage() {
  return (
    <>
      <PageHeader
        eyebrow="Factoring"
        title="Compare freight factoring companies"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Factoring", href: "/factoring" },
          { label: "Compare", href: "/factoring/compare" },
        ]}
        intro={
          <>
            A neutral starting point — not a &ldquo;best of&rdquo; list written by a
            factoring company. We only publish figures we&apos;ve verified from a
            provider&apos;s own materials; everything else is marked{" "}
            <strong>UNKNOWN</strong> until we confirm it. Use the{" "}
            <Link href="/factoring/calculator" className="text-brand hover:underline">
              Money Dashboard
            </Link>{" "}
            to see what any rate means for <em>your</em> break-even.
          </>
        }
      />
      <div className="container-page space-y-5 py-8">
        <Callout tone="warn" title="Early data — verification in progress">
          This comparison is being built. Most term fields below currently read
          UNKNOWN on purpose: we would rather show a gap than invent a number.
          Figures are added only after a human confirms them from the source,
          with a date.
        </Callout>

        <FactoringTable />

        <HowWeMakeMoneyNote />

        <p className="text-sm text-ink-muted">
          Rates, fees, and terms change and vary by carrier, credit, and volume.
          Always request a written quote and read the agreement before signing.
          See our{" "}
          <Link href="/methodology" className="text-brand hover:underline">
            methodology
          </Link>{" "}
          and{" "}
          <Link href="/disclaimer" className="text-brand hover:underline">
            disclaimer
          </Link>
          .
        </p>
      </div>
      <JsonLd
        data={breadcrumb(
          [
            { name: "Home", path: "/" },
            { name: "Factoring", path: "/factoring" },
            { name: "Compare", path: "/factoring/compare" },
          ],
          SITE.url
        )}
      />
    </>
  );
}
