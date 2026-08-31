import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <div className="text-sm font-semibold uppercase tracking-wide text-brand">
        404
      </div>
      <h1 className="mt-2 text-3xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 max-w-md text-ink-soft">
        That page doesn&apos;t exist. Head back to the tools and keep your numbers
        moving.
      </p>
      <div className="mt-6 flex gap-3">
        <Link href="/" className="btn-ghost">
          Home
        </Link>
        <Link href="/factoring/calculator" className="btn-primary">
          Open the Money Dashboard
        </Link>
      </div>
    </div>
  );
}
