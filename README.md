# HaulWise — Owner-Operator Money Dashboard

Factoring-aware financial decision tools for US owner-operator truckers. Built
as a differentiated MVP: not another cost-per-mile calculator, but a
**factoring-aware, profile-persistent decision engine**.

Research and rationale live in the `niche-research` repo
(`owner-operator-trucking-hub/BLUEPRINT.md`).

## What it does

- **Money Dashboard** (`/factoring/calculator`) — the killer tool. Set your truck
  up once (saved in your browser), analyze your real all-in factoring cost, and
  get a take / negotiate / skip verdict on any load, net of your own factoring
  and dispatch.
- **Factoring comparison** (`/factoring/compare`, `/factoring/[provider]`) —
  neutral, structured, with every unverified figure shown as `UNKNOWN`.
- **Focused calculators** — `/owner-operator-profit-calculator`,
  `/break-even-rate-calculator`, `/load-profit-calculator`.
- **Trust pages** — `/methodology`, `/how-we-make-money`, `/about`, `/disclaimer`.

## Architecture (separation of concerns)

```
src/
  lib/
    calc/        Pure, deterministic calculation engine (+ unit tests)
    data/        Provider data + editorial benchmarks (easy to hand-edit)
    affiliate/   Link/monetization config — the ONLY place links are decided
    profile/     Browser persistence of the driver's saved profile
  components/    UI primitives + tools (client) + comparison table
  app/           Routes, SEO (sitemap/robots), metadata, JSON-LD
```

The calculation engine (`src/lib/calc`) has **no UI or storage dependencies**
and is fully unit-tested, so results are identical everywhere they appear.

## Run locally

Requires Node 18.18+ (Node 22 recommended).

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm test         # run the calculation-engine unit tests (vitest)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npm run typecheck
```

## Monetization status

No affiliate relationship is confirmed yet. Links point to providers' public
pages and earn nothing until a program is verified and set to `CONFIRMED` in
`src/lib/affiliate/config.ts`. Provider records show `CONFIRMED` / `PENDING` /
`UNKNOWN` honestly. See `/how-we-make-money`.

## Not done on purpose

No domain, no deploy, no bulk SEO articles. This is a focused, real-product MVP.
