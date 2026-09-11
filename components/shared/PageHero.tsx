import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "@/components/shared/Reveal";
import { jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

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
        "relative isolate overflow-hidden bg-field text-field-foreground",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="field-grid pointer-events-none absolute inset-0 opacity-60"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-24 size-[32rem] rounded-full bg-teal-bright/[0.07] blur-3xl"
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
              <li className="text-brass-bright">{crumb.name}</li>
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
              <p className="eyebrow rule-lead text-brass-bright">{eyebrow}</p>
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
