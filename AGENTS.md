<!-- BEGIN:nextjs-agent-rules -->

# Next.js: ALWAYS read docs before coding

Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated - the docs are the source of truth.

<!-- END:nextjs-agent-rules -->

# fintwizwealth.com - project rules

## Compliance (non-negotiable, not style preferences)

1. **APRN 09563 is the only registration number that may appear on this domain.**
   The SEBI Research Analyst number `INH000026026` belongs to fintwiz.com and must
   never appear here. The two must never share a domain.
2. **No Research Analyst content.** No research notes, target prices, entry/SL/target
   levels, trade setups, buy/sell calls, or trade alerts.
3. **No Fintwiz-authored performance figures.** Every return, CAGR or AUM number shown
   must be the Portfolio Manager's own disclosed figure, carry the date it was disclosed,
   and link to the source document. Enforced in `lib/managers.ts`.
4. **Distributor, never manager.** Copy must never imply Fintwiz Wealth manages, holds,
   or has discretion over client money.

Run `npm run lint` and read `lib/compliance.ts` before changing any copy.

## House style

- No fully-rounded ("pill") buttons. Max radius on interactive elements is `--radius` (3px).
- No emoji used as iconography. Icons come from `lucide-react` only.
- No em dashes in user-facing copy. Use commas, colons or parenthetical phrasing.
- Hero and section copy must be concrete and specific, never vague brand filler.
- Motion is subtle: short fades and small translations. No parallax, no scroll-jacking,
  no scroll-driven horizontal takeovers. All motion respects `prefers-reduced-motion`.
- All site copy lives in `lib/site.ts` and `lib/content/*`, not inline in components.
