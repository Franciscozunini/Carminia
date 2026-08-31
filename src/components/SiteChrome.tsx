import Link from "next/link";
import { NAV, SITE } from "@/lib/site";

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2" aria-label={`${SITE.name} home`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand text-white">
        {/* simple road/arrow mark */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3v18M8 8l4-4 4 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight text-ink">{SITE.name}</span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-surface-line bg-surface/90 backdrop-blur">
      <div className="container-page flex h-14 items-center justify-between">
        <Logo />
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-soft transition hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/factoring/calculator" className="btn-primary text-sm">
          Open the tool
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-surface-line bg-surface">
      <div className="container-page py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="text-sm font-bold text-ink">{SITE.name}</div>
            <p className="mt-2 max-w-xs text-sm text-ink-muted">{SITE.tagline}</p>
          </div>
          <FooterCol
            title="Tools"
            links={[
              ["/factoring/calculator", "Money Dashboard"],
              ["/owner-operator-profit-calculator", "Profit calculator"],
              ["/break-even-rate-calculator", "Break-even rate"],
              ["/load-profit-calculator", "Load profit check"],
            ]}
          />
          <FooterCol
            title="Factoring"
            links={[
              ["/factoring", "Factoring guide"],
              ["/factoring/compare", "Compare companies"],
            ]}
          />
          <FooterCol
            title="Trust"
            links={[
              ["/methodology", "Methodology & formulas"],
              ["/how-we-make-money", "How we make money"],
              ["/about", "About & sources"],
              ["/disclaimer", "Disclaimer"],
            ]}
          />
        </div>
        <div className="mt-8 border-t border-surface-line pt-6 text-xs text-ink-muted">
          <p>
            {SITE.name} is an independent information tool for US owner-operators.
            It is not a factoring company, broker, lender, or financial advisor,
            and does not provide financial advice. Figures are estimates based on
            the numbers you enter. Always verify quotes and terms directly with a
            provider before deciding.{" "}
            <Link href="/disclaimer" className="underline hover:text-ink-soft">
              Full disclaimer
            </Link>
            .
          </p>
          <p className="mt-2">Last updated {SITE.updated}.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<[string, string]>;
}) {
  return (
    <div>
      <div className="text-sm font-semibold text-ink">{title}</div>
      <ul className="mt-2 space-y-2">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link
              href={href}
              className="text-sm text-ink-muted transition hover:text-ink"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
