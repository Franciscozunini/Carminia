import Link from "next/link";
import type { Metadata } from "next";
import { Card, SectionTitle, Badge, Stat } from "@/components/ui";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE.name} — Know where your trucking business makes money`,
  description: SITE.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-surface-line bg-surface">
        <div className="container-page grid gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="flex flex-col justify-center">
            <Badge tone="brand">For US owner-operators</Badge>
            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl">
              Know where your trucking business is{" "}
              <span className="text-brand">actually making or losing money.</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink-soft">
              Set your truck up once. Then see your true cost per mile, your
              deadhead-adjusted break-even rate, exactly how much factoring is
              costing you — and get a straight <strong>take / negotiate / skip</strong>{" "}
              call on any load, using your own numbers.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/factoring/calculator" className="btn-primary">
                Open the Money Dashboard →
              </Link>
              <Link href="/factoring/compare" className="btn-ghost">
                Compare factoring companies
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink-muted">
              Free. No sign-up. Your numbers stay in your browser.
            </p>
          </div>

          {/* Illustrative result preview (static, clearly a sample) */}
          <div className="flex items-center">
            <Card className="w-full p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-ink">Sample readout</div>
                <Badge tone="muted">example numbers</Badge>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Stat label="Break-even rate" value="$1.92/mi" tone="brand" emphasize hint="Per loaded mile" />
                <Stat label="Monthly profit" value="$4,120" tone="go" emphasize />
                <Stat label="True cost / mile" value="$1.69/mi" />
                <Stat label="Factoring adds" value="14.2¢/mi" tone="warn" />
              </div>
              <div className="mt-4 rounded-xl border border-stop/30 bg-stop-soft p-3 text-sm">
                <span className="font-semibold text-stop">Money found:</span>{" "}
                <span className="text-ink-soft">
                  ~$7,200/yr potentially overpaid on factoring at a 4.0% all-in rate.
                </span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* WHAT MAKES IT DIFFERENT */}
      <section className="container-page py-14">
        <SectionTitle
          eyebrow="Not another cost-per-mile calculator"
          title="Three tools that share one saved profile"
          description="Most trucking calculators are one-off and siloed. Ours remember your truck and connect the dots between your costs, your factoring, and the load in front of you."
        />
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <FeatureCard
            step="1"
            title="Your true cost per mile"
            body="Fixed, variable, dispatch and factoring — with deadhead spread onto the miles that actually pay, so your break-even rate is honest."
            href="/owner-operator-profit-calculator"
            cta="Profit calculator"
          />
          <FeatureCard
            step="2"
            title="Factoring overpayment analyzer"
            body="See your real all-in factoring rate (advertised rate + ACH + fees), its true APR, and roughly how much you may overpay per year versus a leaner program."
            href="/factoring/calculator"
            cta="Analyze factoring"
            highlight
          />
          <FeatureCard
            step="3"
            title="Take / negotiate / skip a load"
            body="Paste a load's pay, loaded miles and deadhead. Get a clear verdict net of your own factoring and dispatch — plus the minimum rate to counter with."
            href="/load-profit-calculator"
            cta="Check a load"
          />
        </div>
      </section>

      {/* GAP / POSITIONING */}
      <section className="border-y border-surface-line bg-surface">
        <div className="container-page py-14">
          <SectionTitle
            eyebrow="Why we built it"
            title="Factoring is the cost drivers argue about most — and see least clearly"
          />
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <Card className="p-6">
              <div className="text-sm font-semibold text-ink">What other tools miss</div>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li>• Load calculators ignore what factoring takes out of the load.</li>
                <li>• Factoring calculators ignore your costs and the load.</li>
                <li>• None remember your truck, so you re-enter everything each time.</li>
                <li>• Most &ldquo;best factoring&rdquo; lists are written by factoring companies.</li>
              </ul>
            </Card>
            <Card className="p-6">
              <div className="text-sm font-semibold text-ink">What we do instead</div>
              <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                <li>• Fold your real all-in factoring cost into your break-even, in ¢/mile.</li>
                <li>• Quantify the annual overpayment and point to concrete options.</li>
                <li>• Judge each load net of <em>your</em> factoring and dispatch.</li>
                <li>• Publish our formulas, sources, and how we make money.</li>
              </ul>
            </Card>
          </div>
          <div className="mt-6">
            <Link href="/methodology" className="text-sm font-semibold text-brand hover:underline">
              Read the methodology and formulas →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16">
        <Card className="flex flex-col items-center gap-4 p-10 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Set your truck up once. Decide every load in seconds.
          </h2>
          <p className="max-w-2xl text-ink-soft">
            Enter your numbers, save your profile, and the dashboard becomes your
            in-cab second opinion on rates and factoring.
          </p>
          <Link href="/factoring/calculator" className="btn-primary">
            Open the Money Dashboard →
          </Link>
        </Card>
      </section>
    </>
  );
}

function FeatureCard({
  step,
  title,
  body,
  href,
  cta,
  highlight,
}: {
  step: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  highlight?: boolean;
}) {
  return (
    <Card className={highlight ? "border-brand/40 p-6" : "p-6"}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-sm font-bold text-brand-dark">
        {step}
      </div>
      <h3 className="mt-3 text-lg font-bold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-soft">{body}</p>
      <Link href={href} className="mt-4 inline-block text-sm font-semibold text-brand hover:underline">
        {cta} →
      </Link>
    </Card>
  );
}
