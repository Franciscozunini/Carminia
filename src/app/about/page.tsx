import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "About & sources",
  description:
    "What HaulWise is, who it's for, and where our data comes from. An independent decision tool for US owner-operators.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Trust"
        title="About & sources"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "About", href: "/about" },
        ]}
        intro="HaulWise is an independent set of financial decision tools for US owner-operators. We are not a factoring company, broker, lender, dispatcher, or financial advisor."
      />
      <div className="container-page max-w-3xl space-y-6 py-8">
        <Card className="p-6">
          <h2 className="text-lg font-bold text-ink">What we&apos;re trying to do</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Give owner-operators a clear, honest read on where their business makes
            and loses money — especially around factoring, which is easy to
            overpay and hard to see clearly. We&apos;d rather show a gap in our data
            than fill it with a number we can&apos;t stand behind.
          </p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-bold text-ink">Where our data comes from</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink-soft">
            <li>
              <strong>Provider terms</strong> come from each company&apos;s own
              public materials, cited with a retrieval date on the provider page.
              Anything unconfirmed reads UNKNOWN.
            </li>
            <li>
              <strong>Benchmarks and defaults</strong> (diesel price, benchmark
              factoring rate, target margin) are editorial starting points,
              documented on the{" "}
              <Link href="/methodology" className="text-brand hover:underline">
                methodology page
              </Link>
              , and you can override them.
            </li>
            <li>
              <strong>Your inputs</strong> stay in your browser. We don&apos;t
              require an account and don&apos;t upload your numbers.
            </li>
          </ul>
        </Card>
        <p className="text-sm text-ink-muted">
          See also{" "}
          <Link href="/how-we-make-money" className="text-brand hover:underline">
            how we make money
          </Link>{" "}
          and our{" "}
          <Link href="/disclaimer" className="text-brand hover:underline">
            disclaimer
          </Link>
          .
        </p>
      </div>
    </>
  );
}
