import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Card, Callout } from "@/components/ui";
import { JsonLd, breadcrumb } from "@/components/JsonLd";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Freight factoring for owner-operators — the real cost, explained",
  description:
    "Understand what freight factoring actually costs an owner-operator: advertised rate vs. all-in effective rate, ACH fees, and APR. Then run your own numbers.",
  alternates: { canonical: "/factoring" },
};

export default function FactoringHub() {
  return (
    <>
      <PageHeader
        eyebrow="Factoring"
        title="Freight factoring, without the sales pitch"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Factoring", href: "/factoring" },
        ]}
        intro="Factoring gets you paid in a day instead of waiting 30–45 days on a broker — for a fee. The trap is that the advertised rate is rarely what you actually pay. Here's how to see the real number."
      />
      <div className="container-page space-y-8 py-8">
        <div className="grid gap-5 md:grid-cols-3">
          <Card className="p-6">
            <h3 className="font-bold text-ink">Advertised vs. all-in rate</h3>
            <p className="mt-2 text-sm text-ink-soft">
              A &ldquo;2%&rdquo; rate plus a per-invoice ACH fee and a monthly
              minimum can land well above 3% once you total it up. Our analyzer
              shows the effective rate on your real volume.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold text-ink">The APR reality</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Paying 2% to get money ~40 days early is roughly an{" "}
              <strong>18% APR</strong>. It can be worth it for cash flow — but you
              should know the number before you sign.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="font-bold text-ink">Recourse vs. non-recourse</h3>
            <p className="mt-2 text-sm text-ink-soft">
              Non-recourse shifts broker-default risk off you, usually for a
              slightly higher rate. Which is right depends on your brokers and
              cash cushion.
            </p>
          </Card>
        </div>

        <Callout tone="brand" title="Do this next">
          Run your actual volume, rate, and fees through the analyzer to see your
          all-in rate, its APR, and whether you&apos;re overpaying.{" "}
          <Link href="/factoring/calculator" className="font-semibold underline">
            Open the Money Dashboard →
          </Link>
        </Callout>

        <div className="flex flex-wrap gap-3">
          <Link href="/factoring/calculator" className="btn-primary">
            Factoring analyzer
          </Link>
          <Link href="/factoring/compare" className="btn-ghost">
            Compare companies
          </Link>
        </div>
      </div>
      <JsonLd
        data={breadcrumb(
          [
            { name: "Home", path: "/" },
            { name: "Factoring", path: "/factoring" },
          ],
          SITE.url
        )}
      />
    </>
  );
}
