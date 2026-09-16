import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/shared/Section";
import { Reveal } from "@/components/shared/Reveal";
import { HeroAmbient } from "@/components/visuals/HeroAmbient";
import { hero, site } from "@/lib/site";
import { managers } from "@/lib/managers";

export function Hero() {
  const preview = managers.slice(0, 3);

  return (
    <section className="brand-rule relative isolate overflow-hidden bg-field text-field-foreground">
      <HeroAmbient />

      <div className="container-page relative grid items-center gap-14 pt-20 pb-24 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20 lg:pt-28 lg:pb-32">
        <div>
          <Reveal>
            <Eyebrow onField>{hero.eyebrow}</Eyebrow>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="mt-6 text-[clamp(2.1rem,4.7vw,3.4rem)] text-field-foreground">
              {hero.headline}{" "}
              <span className="text-gold-bright">{hero.headlineAccent}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="mt-7 text-[1.0125rem] leading-[1.75] text-field-muted md:text-[1.075rem]">
              {hero.lead}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild variant="field" size="lg">
                <Link href={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild variant="fieldOutline" size="lg">
                <Link href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                </Link>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-8 border-l-2 border-gold/50 pl-4 text-[0.8125rem] leading-[1.7] text-field-muted">
              {site.legalName} is registered with {site.registration.authority}{" "}
              as a distributor of Portfolio Management Services under{" "}
              <span className="font-mono text-field-foreground tnum">
                {site.registration.number}
              </span>
              . We are not a portfolio manager and we do not provide securities
              advice.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <ShortlistCard preview={preview} />
        </Reveal>
      </div>
    </section>
  );
}

function ShortlistCard({ preview }: { preview: typeof managers }) {
  return (
    <div className="rounded-md border border-field-border bg-field/70 shadow-lift backdrop-blur-[2px]">
      <header className="flex items-center justify-between gap-4 border-b border-field-border px-5 py-4">
        <div className="flex items-center gap-2.5">
          <FileText aria-hidden="true" className="size-4 text-gold-bright" />
          <p className="text-[0.8125rem] font-medium text-field-foreground">
            A shortlist, as you would receive it
          </p>
        </div>
        <span className="font-mono text-[0.65rem] tracking-[0.12em] text-field-muted uppercase">
          Sample
        </span>
      </header>

      <ul>
        {preview.map((m) => (
          <li
            key={m.id}
            className="flex items-start justify-between gap-5 border-b border-field-border px-5 py-4 last:border-b-0"
          >
            <div className="min-w-0">
              <p className="text-[0.9rem] font-medium [overflow-wrap:anywhere] text-field-foreground">
                {m.house}
              </p>
              <p className="mt-0.5 text-[0.78rem] [overflow-wrap:anywhere] text-field-muted">
                {m.strategy}
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-mono text-[0.7rem] text-gold-bright tnum">
                {m.category}
              </p>
              <p className="mt-0.5 font-mono text-[0.68rem] text-field-muted tnum">
                {m.sebiRegNo}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <footer className="border-t border-field-border px-5 py-4">
        <p className="text-[0.72rem] leading-[1.65] text-field-muted">
          Each manager is separately registered with SEBI. Performance figures,
          where shown, are the manager&apos;s own disclosed numbers.{" "}
          {site.brand} does not manage client funds.
        </p>
      </footer>
    </div>
  );
}
