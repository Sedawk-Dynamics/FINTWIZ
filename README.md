# fintwizwealth.com

The SEBI/APMI registered PMS distributor site for Fintwiz Pvt Ltd, trading as
Fintwiz Wealth (APRN 09563).

This is a separate property from **fintwiz.com**, which is the SEBI Research
Analyst site. The two registration numbers must never appear on the same domain.
That rule is enforced by a build-time check, not just by convention.

Next.js 16.2.7 (App Router, Turbopack) - React 19 - Tailwind v4 - Motion 13 -
Radix primitives - TypeScript.

---

## Getting started

```bash
npm install
npm run dev
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Runs the compliance check, then builds. The build fails if the check fails. |
| `npm start` | Serves the production build |
| `npm run lint` | ESLint, including the React compiler rules |
| `npm run check:compliance` | The regulatory and house-style guard, on its own |
| `npm run build:brand` | Regenerates logo assets and favicons from the supplied logo |
| `npm run build:media` | Regenerates the ambient hero loop from the source still |

Never run `next build` while the dev server is running: it corrupts `.next` and
styles silently disappear. Stop the dev server, `rm -rf .next`, then build.

---

## The rules this site is built around

These come from the developer brief and are compliance requirements, not
preferences. `scripts/check-compliance.mjs` enforces the mechanical ones and
runs as the first step of `npm run build`.

1. **APRN 09563 is the only registration number on this domain.** The Research
   Analyst number is not written anywhere in this repository, including in
   comments. The check fails the build if it ever appears.
2. **No Research Analyst content.** No research notes, target prices, entry,
   stop-loss or target levels, trade setups or alerts. The check greps for this
   language.
3. **No performance figure authored by Fintwiz.** A number can only reach the
   site through `disclosedFigures` in `lib/managers.ts`, and that type requires
   both the date the manager disclosed it and a link to the source document. It
   is impossible to publish an undated, unsourced figure without changing the
   type.
4. **Distributor, never manager.** No copy may imply Fintwiz Wealth manages,
   holds or has discretion over client money.

House style, also enforced: no pill-shaped buttons (max radius is the 3px
`--radius` token), no emoji as iconography (lucide only), no em dashes in copy.

A file can waive the research-language rule with a `compliance-allow:
research-language` pragma and a written reason. Only the two disclaimer files
use it, because naming a prohibited activity is how you disclaim it. Nothing can
waive the registration-number rule.

---

## Where things live

```
app/                     Routes. One folder per page, plus sitemap/robots/OG image.
  api/contact/route.ts   Enquiry handling, zod validated, rate limited
components/
  brand/                 Logo lockup and the motif system derived from the mark
  layout/                Header, Footer, TrustStrip, ThemeToggle
  home/                  Home page sections, including the mandate matcher
  managers/              Manager card, mandate glyph, roster explorer
  visuals/               The original SVG diagrams and the hero ambient layer
  shared/                Reveal, section headings, CTA band, legal document shell
  ui/                    Button and accordion primitives
lib/
  site.ts                All site-wide copy, identity and registration detail
  managers.ts            The empanelled roster and its compliance contract
  compliance.ts          Risk lines and the seven-section disclaimer
  media.ts               Every photo and video with its licence
  content/pms.ts         Copy for the What is PMS page
  content/legal.ts       Privacy policy and terms
public/brand/            Generated logo assets. Do not edit by hand.
public/media/            Photography, the generated loop, and CREDITS.md
scripts/                 Compliance guard, brand pipeline, media pipeline
```

**Copy does not live in components.** If you are changing words, you are
changing something in `lib/`. This is what makes the compliance check useful.

---

## Brand

The client supplied one raster lockup, `public/media/Logo-Final-scaled.png`:
an azure mark (a chamfered diamond holding two rising arrows over gold bars)
beside a gold-to-orange "Fintwiz" wordmark.

`npm run build:brand` derives everything else from it. The script finds the
natural gutter between the mark and the wordmark by scanning the alpha channel,
then splits and squares them, and renders the favicons on the brand navy:

```
public/brand/logo-lockup.png      header and footer
public/brand/logo-mark.png        icon only, transparent
public/brand/logo-wordmark.png    wordmark only
public/brand/logo-mark-plate.png  icon on navy, for the OG image
app/icon.png, app/apple-icon.png  favicons
```

The lockup reads "Fintwiz" only, so `components/brand/Logo.tsx` sets the
"Wealth" descriptor beside it behind a hairline. That is deliberate: this
domain has to be distinguishable from fintwiz.com at a glance.

`components/brand/Motif.tsx` abstracts the mark's geometry into a reusable
device set (`BrandDiamond`, `AscentMark`, `DiamondField`, `RuleDivider`), used
for section markers, list bullets and the background lattice on dark bands.
Together with the `.brand-rule` gradient hairline (the mark's azure running
into the wordmark's gold) across the top of every full-bleed dark section, it
is what stops the site reading as a template with a logo dropped in the corner.

To replace the logo: drop a new file at the same path, re-run
`npm run build:brand`. Nothing else references the mark directly.

---

## Design system

All colour comes from tokens in `app/globals.css`. Nothing is hardcoded in a
component.

Palette is sampled from the logo. The literal brand colours live in
`--azure-logo` (#28A6E4) and `--gold-logo` (#FEC21A) and are used only where
contrast does not apply: decorative strokes, the motif, the gradient rule.
Everything text-bearing uses deepened variants that pass WCAG AA against the
surface they actually sit on.

### Theming

Every token is declared once with CSS `light-dark()`, and the theme is selected
by the `color-scheme` property alone:

- The default follows the operating system, resolved by CSS **before first
  paint, with no JavaScript**, so there is no flash and no bootstrap script.
- An explicit choice sets one attribute, `data-theme` on `<html>`, which flips
  every token at once.

There is deliberately **no theme bootstrap script**. Rendering a `<script>` from
a React component breaks hydration under React 19, and the whole mechanism
becomes unnecessary once the tokens resolve in CSS. `ThemeToggle` reads the DOM
through `useSyncExternalStore`, so the button state can never drift from the
palette on screen.

Two token traps worth knowing about:

- `--ink` **inverts between themes.** Do not build a button out of it:
  `bg-ink text-white` becomes white on white in dark mode. Button surfaces have
  their own explicit `--btn-*` tokens.
- `--field-foreground` is light in **both** themes and `--ink-deep` is dark in
  both. Use that pair for anything on a dark field, since it cannot invert into
  an unreadable state.

Typography is Fraunces for display, IBM Plex Sans for body, IBM Plex Mono for
registration numbers and data, all self-hosted through `next/font`.

### Motion

One scroll-triggered effect (`components/shared/Reveal.tsx`): a short fade and a
14px lift, once, never repeated. One scroll-linked effect, the progress rail on
the How It Works timeline, which is there because it carries meaning. No
parallax, no pinned sections, no scroll hijacking. Everything respects
`prefers-reduced-motion`.

Three things to preserve if you touch this layer:

- **Never gate content on an animation completing.** `AnimatePresence` with
  `mode="wait"` strands content if an exit never resolves. The roster view
  toggle used to do this and silently stopped working.
- **Every animated element carries `data-reveal`.** Motion server-renders its
  `initial` values as inline styles, so without the `<noscript>` rule in
  `app/layout.tsx` the site would render blank with JavaScript unavailable.
- **No interleaved text and expressions inside SVG `<title>` or `<desc>`.**
  That produces a different number of text nodes on the server than the client
  and fails hydration. Build the string first, pass it as one expression.

---

## Signature features

### The mandate matcher (`components/home/MandateMatcher.tsx`)

The service made tangible. Three criteria narrow the empanelled roster live, and
every manager that drops out states which criterion it failed. The exclusions
are the point: the site promises written reasoning for every inclusion and
exclusion, so it is worth demonstrating rather than asserting.

It is a **filter, not advice**. It uses no performance data. The criteria
describe how each strategy is constructed, taken from the manager's own stated
approach, and the disclosure under it says exactly that.

### The mandate glyph (`components/managers/MandateGlyph.tsx`)

A compact signature on each manager card: three ticks inside the brand diamond
encoding market-cap breadth, concentration and volatility band. Every manager
produces a different silhouette. It encodes real stated attributes, not a hash,
and carries no performance information.

### The diagrams (`components/visuals/`)

`RoutingDiagram` draws the core regulatory point: the shortlist and paperwork
run through us, the capital goes straight to the manager. `FeeFlow` draws the
payment that does not exist, the one from you to us. `AccountStructure`
contrasts a pooled vehicle with a PMS. All original, all built from tokens.

---

## Media

No stock-photo subscription and nothing hotlinked. All photography is from
Wikimedia Commons under Creative Commons or public domain licences, served from
`/public/media`, and credited at `/terms-and-conditions#image-credits`, which is
what those licences require. That credits block is generated from `lib/media.ts`,
so an image cannot be used without its attribution going up with it.

The ambient hero loop is generated locally by `npm run build:media` from one of
those stills: a slow push-in, a brand colour grade, mirrored so it loops
seamlessly. It is silent, carries no information, and falls back to a poster
frame for reduced motion or if it fails to load.

`next.config.ts` sets `images.remotePatterns` to an empty array, so nothing on
this site can hotlink a third-party image host even by accident.

---

## Contact form

`app/api/contact/route.ts`. Validated with a zod schema shared by the browser
and the server, so the two cannot disagree. Rate limited to five submissions per
minute per IP. Has a honeypot field that validates permissively on purpose: if
the schema rejected a filled honeypot, the bot would get an error naming the
field and would stop filling it.

Delivery is SMTP, configured through the variables in `.env.example`. **When
SMTP is not configured the enquiry is logged server-side and the form tells the
visitor it was not emailed, showing the direct address instead.** It never
silently drops a lead. Grievance submissions route to `CONTACT_GRIEVANCE_TO`
when set.

---

## Still needed from the client

Also listed in code as `PENDING_CLIENT_DATA` in `lib/site.ts`.

1. **A vector logo.** The supplied file is a 2560px raster. It is sharp enough
   at every size the site uses, so this is not blocking, but an SVG would be
   better for print and for very large displays.
2. **Role email addresses.** The addresses in `lib/site.ts` are derived from the
   domain and are unverified. SEBI expects a published, monitored grievance
   address, so this cannot ship as is.
3. **Telephone number and registered office address.** Referenced on the contact
   page and in the governing-law clause of the terms.
4. **Principal Officer photograph and long-form bio.** The monogram plate is
   designed to look deliberate rather than broken, so this is not urgent.
5. **Signed empanelment and written display consent for every manager** in
   `lib/managers.ts`. Registration numbers and disclosure URLs were carried over
   from the supplied mockup, which sourced them from public SEBI records. Verify
   each against the signed agreement before launch.
6. **Actual commission bands per manager.** The Fees page currently says they are
   being finalised rather than inventing a number.
7. **Compliance sign-off on all risk and disclosure wording**, including the
   seven-section disclaimer and both legal pages.

---

## Deployment

Static by default. Every page prerenders; only `/api/contact` is server
rendered on demand. Security headers are set in `next.config.ts`.

Set the SMTP variables from `.env.example` in the hosting environment, and set
the canonical origin in `SITE_URL` (`lib/site.ts`) if it differs from
`https://www.fintwizwealth.com`.
