import Link from "next/link";

/** Reusable, honest disclosure block placed near any comparison/outbound links. */
export function HowWeMakeMoneyNote() {
  return (
    <div className="rounded-xl border border-surface-line bg-surface-sunken p-4 text-sm text-ink-soft">
      <span className="font-semibold text-ink">How we make money:</span> some links
      may become paid partnerships once we&apos;re accepted into a provider&apos;s
      program. Today, none of the links on this page are paid — they go to each
      company&apos;s own public page. Partnerships never change a provider&apos;s
      rank or the numbers our tools produce.{" "}
      <Link href="/how-we-make-money" className="text-brand hover:underline">
        Read the full policy
      </Link>
      .
    </div>
  );
}
