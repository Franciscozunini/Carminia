/** Central site metadata. Domain is a placeholder — no domain purchased yet. */
export const SITE = {
  name: "HaulWise",
  tagline: "Know where your trucking business actually makes money.",
  description:
    "Free financial decision tools for US owner-operators: a factoring-aware cost-per-mile and break-even engine, an honest factoring overpayment analyzer, and a per-load take/skip check that uses your own numbers.",
  // Placeholder only. Do not treat as a live/purchased domain.
  url: "https://haulwise.example",
  updated: "2026-08-31",
} as const;

export const NAV = [
  { href: "/factoring/calculator", label: "Money Dashboard" },
  { href: "/factoring/compare", label: "Compare Factoring" },
  { href: "/owner-operator-profit-calculator", label: "Profit Calculator" },
  { href: "/methodology", label: "Methodology" },
] as const;
