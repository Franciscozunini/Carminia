import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { Card, Badge } from "@/components/ui";

export const metadata: Metadata = {
  title: "How we make money",
  description:
    "Our monetization is transparent: referral and affiliate partnerships with service providers. Partnerships never change rankings or the numbers our calculators produce.",
  alternates: { canonical: "/how-we-make-money" },
};

export default function HowWeMakeMoney() {
  return (
    <>
      <PageHeader
        eyebrow="Trust"
        title="How we make money"
        crumbs={[
          { label: "Home", href: "/" },
          { label: "How we make money", href: "/how-we-make-money" },
        ]}
        intro="HaulWise is free for drivers. We plan to earn through referral and affiliate partnerships with providers we list — the same companies you'd find on your own. Here's the honest version."
      />
      <div className="container-page max-w-3xl space-y-6 py-8">
        <Card className="p-6">
          <h2 className="text-lg font-bold text-ink">The rules we hold ourselves to</h2>
          <ul className="mt-3 space-y-3 text-sm text-ink-soft">
            <li>
              <strong>Money never moves the rankings.</strong> Our tools compute
              from your numbers and published formulas. A partnership can&apos;t buy
              a better break-even result or a higher spot in a comparison.
            </li>
            <li>
              <strong>We label paid links.</strong> A link is only marked as a paid
              partner link when a real, tracked relationship is live. Everything
              else points to the provider&apos;s own public page and earns us
              nothing.
            </li>
            <li>
              <strong>We show what we haven&apos;t verified.</strong> Unconfirmed
              figures read <Badge tone="muted">UNKNOWN</Badge> rather than being
              guessed or borrowed from a listicle.
            </li>
            <li>
              <strong>No fake reviews or testimonials.</strong> Ever.
            </li>
          </ul>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-bold text-ink">Current status (honest)</h2>
          <p className="mt-2 text-sm text-ink-soft">
            As of launch we are <strong>not yet</strong> an approved partner of any
            provider, so <strong>no link on this site is paid today</strong>. We are
            reviewing referral and affiliate programs — including whether they accept
            an independent, non-US publisher and how they track referrals. Provider
            pages show that status openly (CONFIRMED / PENDING / UNKNOWN).
          </p>
        </Card>

        <p className="text-sm text-ink-muted">
          Questions about a specific listing? See{" "}
          <Link href="/about" className="text-brand hover:underline">
            about &amp; sources
          </Link>
          .
        </p>
      </div>
    </>
  );
}
