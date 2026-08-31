"use client";

import * as React from "react";

/**
 * Controlled numeric input that keeps an empty field usable (does not force a 0
 * while the user is mid-edit) but always reports a clean number upward.
 */
export function NumberField({
  label,
  value,
  onChange,
  prefix,
  suffix,
  step = "any",
  min = 0,
  hint,
  id,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
  step?: string | number;
  min?: number;
  hint?: string;
  id?: string;
}) {
  const inputId = id ?? label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  return (
    <div>
      <label htmlFor={inputId} className="field-label">
        {label}
      </label>
      <div className="relative mt-1">
        {prefix ? (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
            {prefix}
          </span>
        ) : null}
        <input
          id={inputId}
          type="number"
          inputMode="decimal"
          className="field-input"
          style={{
            paddingLeft: prefix ? "1.6rem" : undefined,
            paddingRight: suffix ? "2.6rem" : undefined,
          }}
          value={Number.isFinite(value) ? value : ""}
          min={min}
          step={step}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") {
              onChange(0);
              return;
            }
            const n = Number(raw);
            onChange(Number.isFinite(n) ? n : 0);
          }}
        />
        {suffix ? (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-muted">
            {suffix}
          </span>
        ) : null}
      </div>
      {hint ? <p className="mt-1 text-xs text-ink-muted">{hint}</p> : null}
    </div>
  );
}
