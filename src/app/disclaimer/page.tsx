import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "HaulWise provides informational estimates, not financial advice. Verify all rates and terms directly with providers.",
  alternates: { canonical: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust"
        title="Disclaimer"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Disclaimer", href: "/disclaimer" },
        ]}
      />
      <div className="container-page max-w-3xl space-y-4 py-8 text-sm text-ink-soft">
        <p>
          <strong>Informational only.</strong> HaulWise provides calculators and
          comparisons for general informational purposes. It is not financial,
          accounting, tax, legal, or investment advice, and it does not create any
          advisory relationship.
        </p>
        <p>
          <strong>Estimates.</strong> All results are estimates generated from the
          figures you enter and the assumptions described on our methodology page.
          Real costs, rates, fees, and profits will differ. Small input errors can
          change results significantly.
        </p>
        <p>
          <strong>Not a provider.</strong> HaulWise is not a factoring company,
          freight broker, lender, insurer, or dispatcher, and does not originate,
          underwrite, or guarantee any product or quote.
        </p>
        <p>
          <strong>Verify before you decide.</strong> Always request written quotes
          and read the full agreement directly with a provider before signing.
          Provider terms shown here may be incomplete, out of date, or marked
          UNKNOWN, and change without notice.
        </p>
        <p>
          <strong>Affiliate disclosure.</strong> We may earn referral or affiliate
          commissions from some providers once partnerships are active. This never
          affects rankings or calculator results. See &ldquo;How we make
          money.&rdquo;
        </p>
        <p>
          <strong>No warranty.</strong> The site is provided &ldquo;as is&rdquo;
          without warranties of any kind. To the fullest extent permitted by law,
          HaulWise is not liable for any loss arising from use of the site or
          reliance on its estimates.
        </p>
      </div>
    </>
  );
}
