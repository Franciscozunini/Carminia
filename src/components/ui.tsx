import * as React from "react";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("card", className)}>{children}</div>;
}

export function Stat({
  label,
  value,
  hint,
  tone = "default",
  emphasize = false,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  tone?: "default" | "go" | "warn" | "stop" | "brand";
  emphasize?: boolean;
}) {
  const toneClass = {
    default: "text-ink",
    go: "text-go",
    warn: "text-warn",
    stop: "text-stop",
    brand: "text-brand",
  }[tone];
  return (
    <div className="rounded-xl border border-surface-line bg-surface-sunken/60 p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-ink-muted">
        {label}
      </div>
      <div
        className={cn(
          "tabular mt-1 font-semibold",
          emphasize ? "text-3xl" : "text-xl",
          toneClass
        )}
      >
        {value}
      </div>
      {hint ? <div className="mt-1 text-xs text-ink-muted">{hint}</div> : null}
    </div>
  );
}

export function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "go" | "warn" | "stop" | "brand" | "muted";
}) {
  const toneClass = {
    default: "bg-surface-sunken text-ink-soft",
    go: "bg-go-soft text-go",
    warn: "bg-warn-soft text-warn",
    stop: "bg-stop-soft text-stop",
    brand: "bg-brand-soft text-brand-dark",
    muted: "bg-surface-sunken text-ink-muted",
  }[tone];
  return <span className={cn("badge", toneClass)}>{children}</span>;
}

export function Callout({
  tone = "brand",
  title,
  children,
}: {
  tone?: "brand" | "go" | "warn" | "stop";
  title?: React.ReactNode;
  children: React.ReactNode;
}) {
  const toneClass = {
    brand: "border-brand/30 bg-brand-soft",
    go: "border-go/30 bg-go-soft",
    warn: "border-warn/30 bg-warn-soft",
    stop: "border-stop/30 bg-stop-soft",
  }[tone];
  return (
    <div className={cn("rounded-xl border p-4", toneClass)}>
      {title ? <div className="mb-1 font-semibold text-ink">{title}</div> : null}
      <div className="text-sm text-ink-soft">{children}</div>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <div className="text-sm font-semibold uppercase tracking-wide text-brand">
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-2 text-ink-soft">{description}</p>
      ) : null}
    </div>
  );
}

/** Literal "UNKNOWN" renderer — makes gaps in our data obvious and honest. */
export function DataValue({ value }: { value: string | number | undefined }) {
  if (value === undefined || value === "UNKNOWN" || value === "") {
    return (
      <span className="rounded bg-surface-sunken px-1.5 py-0.5 text-xs font-medium text-ink-muted">
        UNKNOWN
      </span>
    );
  }
  return <span className="text-ink">{value}</span>;
}
