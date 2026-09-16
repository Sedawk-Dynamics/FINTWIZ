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
  eyebrowTag,
  title,
  lead,
  crumb,
  aside,
  className,
}: {
  eyebrow: string;
  /** Short qualifier shown as a tag beside the eyebrow, e.g. "Sample". */
  eyebrowTag?: string;
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
            aside
              ? "grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:gap-16"
              : "",
          )}
        >
          <div>
            <Reveal delay={0.06}>
              <div className="flex flex-wrap items-center gap-3">
                <p className="eyebrow rule-lead text-gold-bright">{eyebrow}</p>
                {eyebrowTag ? (
                  <span className="rounded-sm border border-gold-bright/50 bg-gold-bright/10 px-2 py-0.5 font-mono text-[0.64rem] font-medium tracking-[0.16em] text-gold-bright uppercase">
                    {eyebrowTag}
                  </span>
                ) : null}
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <h1 className="mt-5 text-[clamp(1.95rem,4.3vw,3rem)] text-field-foreground">
                {title}
              </h1>
            </Reveal>
            {lead ? (
              <Reveal delay={0.18}>
                <p className="mt-6 text-[1.0125rem] leading-[1.75] text-field-muted">
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
