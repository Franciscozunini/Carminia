import Link from "next/link";

export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: React.ReactNode;
  crumbs?: Array<{ label: string; href: string }>;
}) {
  return (
    <div className="border-b border-surface-line bg-surface">
      <div className="container-page py-8">
        {crumbs ? (
          <nav className="mb-3 flex flex-wrap items-center gap-1 text-xs text-ink-muted">
            {crumbs.map((c, i) => (
              <span key={c.href} className="flex items-center gap-1">
                {i > 0 ? <span aria-hidden>/</span> : null}
                <Link href={c.href} className="hover:text-ink-soft">
                  {c.label}
                </Link>
              </span>
            ))}
          </nav>
        ) : null}
        {eyebrow ? (
          <div className="text-sm font-semibold uppercase tracking-wide text-brand">
            {eyebrow}
          </div>
        ) : null}
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        {intro ? (
          <div className="mt-3 max-w-3xl text-ink-soft">{intro}</div>
        ) : null}
      </div>
    </div>
  );
}
