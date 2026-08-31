import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Card, DataValue, Badge, Callout } from "@/components/ui";
import { HowWeMakeMoneyNote } from "@/components/HowWeMakeMoneyNote";
import { JsonLd, breadcrumb } from "@/components/JsonLd";
import {
  getFactoringProvider,
  factoringProviderSlugs,
} from "@/lib/data/factoringProviders";
import { resolveOutboundUrl, linkRel, isMonetized } from "@/lib/affiliate/config";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return factoringProviderSlugs().map((provider) => ({ provider }));
}

export function generateMetadata({
  params,
}: {
  params: { provider: string };
}): Metadata {
  const p = getFactoringProvider(params.provider);
  if (!p) return { title: "Factoring provider" };
  return {
    title: `${p.name} freight factoring — terms, fees & referral info`,
    description: `What we know about ${p.name} freight factoring for owner-operators: terms, fees, funding, and referral/affiliate status. Unverified figures are marked UNKNOWN.`,
    alternates: { canonical: `/factoring/${p.slug}` },
  };
}

const TERM_FIELDS: Array<{ key: string; label: string }> = [
  { key: "advertisedRate", label: "Advertised rate" },
  { key: "advanceRate", label: "Advance rate" },
  { key: "recourse", label: "Recourse / non-recourse" },
  { key: "contractTerm", label: "Contract term" },
  { key: "terminationFee", label: "Termination fee" },
  { key: "achFee", label: "ACH / funding fee" },
  { key: "minimums", label: "Minimums" },
  { key: "otherFees", label: "Other fees" },
  { key: "fundingSpeed", label: "Funding speed" },
  { key: "newAuthorityFriendly", label: "New-authority friendly" },
  { key: "fuelCardOffered", label: "Fuel card offered" },
];

export default function ProviderPage({
  params,
}: {
  params: { provider: string };
}) {
  const p = getFactoringProvider(params.provider);
  if (!p) notFound();

  const url = resolveOutboundUrl(p.slug);
  const rec = p as unknown as Record<string, string>;

  return (
    <>
      <PageHeader
        eyebrow="Factoring provider"
        title={p.name}
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Factoring", href: "/factoring" },
          { label: "Compare", href: "/factoring/compare" },
          { label: p.name, href: `/factoring/${p.slug}` },
        ]}
        intro={p.summary}
      />

      <div className="container-page grid gap-6 py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink">Terms &amp; fees</h2>
            <p className="mt-1 text-sm text-ink-muted">
              Last verified {p.lastVerified}. Fields we haven&apos;t confirmed from
              the source read UNKNOWN — we don&apos;t guess.
            </p>
            <dl className="mt-4 divide-y divide-surface-line">
              {TERM_FIELDS.map((f) => (
                <div key={f.key} className="flex items-center justify-between py-2.5">
                  <dt className="text-sm text-ink-soft">{f.label}</dt>
                  <dd className="text-sm font-medium">
                    <DataValue value={rec[f.key]} />
                  </dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-ink">Sources</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {p.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="text-brand hover:underline"
                  >
                    {s.label} ↗
                  </a>
                  <span className="text-ink-muted"> — retrieved {s.retrieved}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Monetization / action rail */}
        <div className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-ink">Referral / affiliate</span>
              <Badge
                tone={
                  p.affiliate.status === "CONFIRMED"
                    ? "go"
                    : p.affiliate.status === "PENDING"
                      ? "warn"
                      : "muted"
                }
              >
                {p.affiliate.status}
              </Badge>
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              <Row label="Commission" value={p.affiliate.commission} />
              <Row label="Network" value={p.affiliate.network} />
              <Row label="Intl. publisher" value={p.affiliate.internationalPublisher} />
              <Row label="Payout" value={p.affiliate.payoutMethods} />
            </dl>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel={linkRel(p.slug)}
                className="btn-primary mt-4 w-full"
              >
                Visit {p.name} ↗
              </a>
            ) : null}
            <p className="mt-2 text-center text-[11px] text-ink-muted">
              {isMonetized(p.slug)
                ? "This is a paid partner link."
                : "Not a paid link — goes to the provider's public page."}
            </p>
          </Card>

          <Card className="p-5">
            <div className="text-sm font-semibold text-ink">See it on your numbers</div>
            <p className="mt-1 text-sm text-ink-soft">
              Put this provider&apos;s rate into the dashboard to see the effect on
              your break-even.
            </p>
            <Link href="/factoring/calculator" className="btn-ghost mt-3 w-full">
              Open Money Dashboard
            </Link>
          </Card>
        </div>
      </div>

      <div className="container-page pb-10">
        {p.affiliate.notes ? (
          <Callout tone="warn" title="Operator note (verification to-do)">
            {p.affiliate.notes}
          </Callout>
        ) : null}
        <div className="mt-4">
          <HowWeMakeMoneyNote />
        </div>
      </div>

      <JsonLd
        data={breadcrumb(
          [
            { name: "Home", path: "/" },
            { name: "Factoring", path: "/factoring" },
            { name: "Compare", path: "/factoring/compare" },
            { name: p.name, path: `/factoring/${p.slug}` },
          ],
          SITE.url
        )}
      />
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-ink-muted">{label}</dt>
      <dd className="max-w-[62%] text-right font-medium">
        <DataValue value={value} />
      </dd>
    </div>
  );
}
