import Link from "next/link";
import { factoringProviders } from "@/lib/data/factoringProviders";
import { resolveOutboundUrl, linkRel, isMonetized } from "@/lib/affiliate/config";
import { DataValue, Badge } from "@/components/ui";
import type { AffiliateStatus } from "@/lib/data/providerTypes";

function AffiliateBadge({ status }: { status: AffiliateStatus }) {
  const map = {
    CONFIRMED: { tone: "go" as const, label: "Partner" },
    PENDING: { tone: "warn" as const, label: "Verifying" },
    UNKNOWN: { tone: "muted" as const, label: "No program yet" },
  }[status];
  return <Badge tone={map.tone}>{map.label}</Badge>;
}

const COLUMNS: Array<{ key: string; label: string }> = [
  { key: "advertisedRate", label: "Advertised rate" },
  { key: "advanceRate", label: "Advance" },
  { key: "recourse", label: "Recourse" },
  { key: "contractTerm", label: "Contract" },
  { key: "achFee", label: "ACH fee" },
  { key: "fundingSpeed", label: "Funding" },
];

export function FactoringTable() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-surface-line bg-surface shadow-card">
      <table className="w-full min-w-[860px] border-collapse text-sm">
        <thead>
          <tr className="border-b border-surface-line bg-surface-sunken text-left">
            <th className="px-4 py-3 font-semibold text-ink">Provider</th>
            {COLUMNS.map((c) => (
              <th key={c.key} className="px-4 py-3 font-semibold text-ink">
                {c.label}
              </th>
            ))}
            <th className="px-4 py-3 font-semibold text-ink">Monetization</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {factoringProviders.map((p) => {
            const url = resolveOutboundUrl(p.slug);
            return (
              <tr
                key={p.slug}
                className="border-b border-surface-line last:border-0 hover:bg-surface-sunken/50"
              >
                <td className="px-4 py-3">
                  <Link
                    href={`/factoring/${p.slug}`}
                    className="font-semibold text-ink hover:text-brand"
                  >
                    {p.name}
                  </Link>
                  <div className="text-xs text-ink-muted">{p.product}</div>
                </td>
                {COLUMNS.map((c) => (
                  <td key={c.key} className="px-4 py-3">
                    <DataValue value={(p as unknown as Record<string, string>)[c.key]} />
                  </td>
                ))}
                <td className="px-4 py-3">
                  <AffiliateBadge status={p.affiliate.status} />
                </td>
                <td className="px-4 py-3 text-right">
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel={linkRel(p.slug)}
                      className="btn-ghost whitespace-nowrap text-xs"
                    >
                      Visit site ↗
                    </a>
                  ) : null}
                  {isMonetized(p.slug) ? (
                    <div className="mt-1 text-[10px] text-ink-muted">paid link</div>
                  ) : null}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
