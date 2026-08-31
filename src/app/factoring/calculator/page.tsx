import type { Metadata } from "next";
import Link from "next/link";
import { MoneyDashboard } from "@/components/tools/MoneyDashboard";
import { PageHeader } from "@/components/PageHeader";
import { JsonLd, breadcrumb } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Owner-Operator Money Dashboard — factoring-aware profit & load tool",
  description:
    "Free factoring-aware money dashboard for owner-operators: true cost per mile, deadhead-adjusted break-even rate, factoring overpayment analysis, and a take/negotiate/skip verdict on any load — all from one saved profile.",
  alternates: { canonical: "/factoring/calculator" },
};

export default function CalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="The tool"
        title="Owner-Operator Money Dashboard"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Factoring", href: "/factoring" },
          { label: "Money Dashboard", href: "/factoring/calculator" },
        ]}
        intro={
          <>
            Fill in your truck once (tab 1), add your factoring (tab 2), then check
            any load (tab 3). Your break-even rate and monthly profit update live on
            the right and fold in your <strong>real</strong> factoring cost — ACH
            fees included, not just the advertised rate.{" "}
            <Link href="/methodology" className="text-brand hover:underline">
              See the formulas
            </Link>
            .
          </>
        }
      />
      <div className="container-page py-8">
        <MoneyDashboard />
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Owner-Operator Money Dashboard",
          applicationCategory: "FinanceApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          description: metadata.description,
          url: `${SITE.url}/factoring/calculator`,
        }}
      />
      <JsonLd
        data={breadcrumb(
          [
            { name: "Home", path: "/" },
            { name: "Factoring", path: "/factoring" },
            { name: "Money Dashboard", path: "/factoring/calculator" },
          ],
          SITE.url
        )}
      />
    </>
  );
}
