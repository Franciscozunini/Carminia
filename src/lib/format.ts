/** Display formatting helpers. Pure, no side effects. */

export function usd(value: number, opts: { decimals?: number } = {}): string {
  const decimals = opts.decimals ?? 0;
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Per-mile money, always 2 decimals, e.g. $1.87/mi. */
export function perMile(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return `$${value.toFixed(2)}/mi`;
}

export function pct(value: number, decimals = 1): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(decimals)}%`;
}

export function cents(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return `${value.toFixed(1)}¢/mi`;
}
