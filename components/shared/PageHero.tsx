import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { DiamondField } from "@/components/brand/Motif";

/**
 * Inner-page masthead. Dark field so inner pages inherit the same weight as
 * the home hero without repeating its full-height treatment.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumb,
  aside,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  crumb: { name: string; path: string };
  aside?: React.ReactNode;
  className?: string;
}) {
  const trail = [{ name: "Home", path: "/" }, crumb];

  return (
    <section
      className={cn(
        "brand-rule relative isolate overflow-hidden bg-field text-field-foreground",
        className,
      )}
    >
      <DiamondField className="text-field-border opacity-70" scale={58} />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-24 size-[32rem] rounded-full bg-azure-bright/[0.07] blur-3xl"
      />

      <div className="container-page relative py-16 md:py-20 lg:py-24">
        <Reveal>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 font-mono text-[0.68rem] tracking-[0.1em] text-field-muted uppercase">
              <li>
                <Link href="/" className="link-underline hover:text-field-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3 opacity-50" />
              </li>
              <li className="text-gold-bright">{crumb.name}</li>
            </ol>
          </nav>
        </Reveal>

        <div
          className={cn(
            "mt-9 gap-12",
            aside ? "grid lg:grid-cols-[1.25fr_0.75fr] lg:gap-16" : "",
          )}
        >
          <div>
            <Reveal delay={0.06}>
              <p className="eyebrow rule-lead text-gold-bright">{eyebrow}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="mt-5 max-w-[24ch] text-[clamp(1.95rem,4.3vw,3rem)] text-field-foreground">
                {title}
              </h1>
            </Reveal>
            {lead ? (
              <Reveal delay={0.18}>
                <p className="mt-6 max-w-[58ch] text-[1.0125rem] leading-[1.75] text-field-muted">
                  {lead}
                </p>
              </Reveal>
            ) : null}
          </div>

          {aside ? <Reveal delay={0.24}>{aside}</Reveal> : null}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd(trail)) }}
      />
    </section>
  );
}
